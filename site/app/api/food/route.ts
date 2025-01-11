// app/api/food/route.ts
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    //const result = await foodRepository.save(data)
    const result = await redis.lPush("food_data_test", JSON.stringify(data));
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save food item" },
      { status: 500 }
    );
  }
}

// app/api/food/route.ts
export async function DELETE(request: Request) {
    try {
      const { id, userEmail } = await request.json();
  
      // First, find the food item being booked
      const foodData = await redis.lRange("food_data_test", 0, -1);
      const foodItem = foodData
        .map(item => JSON.parse(item))
        .find(item => item.id === id);
  
      // Check if food item exists
      if (!foodItem) {
        return NextResponse.json({ 
          success: false, 
          error: "Food item not found" 
        }, { status: 404 });
      }
  
      // Check if user is trying to book their own food item
      if (foodItem.email === userEmail) {
        return NextResponse.json({ 
          success: false, 
          error: "You cannot book your own shared food item" 
        }, { status: 400 });
      }
  
      // Get user data from Redis
      const userData = await redis.get(`user:${userEmail}`);
  
      if (!userData) {
        return NextResponse.json({ success: false, error: "User not found" });
      }
  
      // Rest of your existing code...
      let userObj;
      try {
        userObj = JSON.parse(userData);
      } catch (e) {
        userObj = {
          password: userData,
          bookings: [],
        };
      }
  
      if (!userObj.bookings) {
        userObj.bookings = [];
      }
  
      userObj.bookings.push(id);
  
      await redis.set(`user:${userEmail}`, JSON.stringify(userObj));
  
      // Update food data
      const foodDataFiltered = foodData.filter((foodItem) => foodItem !== "");
  
      const updatedFoodData = foodDataFiltered.filter((foodItem) => {
        const parsedFoodItem = JSON.parse(foodItem);
        return parsedFoodItem.id !== id;
      });
  
      await redis.del("food_data_test");
      await redis.rPush("food_data_test", updatedFoodData);
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error in DELETE /api/food:", error);
      return NextResponse.json({
        success: false,
        error: "Failed to book food item",
      });
    }
  }
  