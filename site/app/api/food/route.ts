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

    // Get user data from Redis
    const userData = await redis.get(`user:${userEmail}`);

    if (!userData) {
      return NextResponse.json({ success: false, error: "User not found" });
    }

    // Parse the user data (assuming it's stored as a string)
    let userObj;
    try {
      userObj = JSON.parse(userData);
    } catch (e) {
      // If userData is not valid JSON, initialize a new object
      userObj = {
        password: userData, // preserve the existing password if it's stored as string
        bookings: [],
      };
    }

    // Initialize bookings array if it doesn't exist
    if (!userObj.bookings) {
      userObj.bookings = [];
    }

    // Add the new booking
    userObj.bookings.push(id);

    // Save the updated user data back to Redis
    await redis.set(`user:${userEmail}`, JSON.stringify(userObj));


    //! update food data

    const foodData = await redis.lRange("food_data_test", 0, -1);
    const foodDataFiltered = foodData.filter((foodItem) => foodItem !== "");

    const updatedFoodData = foodDataFiltered.filter((foodItem) => {
      const parsedFoodItem = JSON.parse(foodItem);
      return parsedFoodItem.id !== id;
    });

    //! update food data end

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
