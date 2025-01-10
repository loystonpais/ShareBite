// app/api/food/route.ts
import { NextResponse } from 'next/server'
import redis from "@/lib/redis"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    //const result = await foodRepository.save(data)
    const result = await redis.lPush('food_data_test', JSON.stringify(data))
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save food item' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const foodData = await redis.lRange("food_data_test", 0, -1);
        const foodDataFiltered = foodData.filter((foodItem) => foodItem !== "");

        const updatedFoodData = foodDataFiltered.filter((foodItem) => {
            const parsedFoodItem = JSON.parse(foodItem);
            return parsedFoodItem.id !== id;
        });

        await redis.del("food_data_test");
        await redis.rPush("food_data_test", updatedFoodData);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete item' }, { status: 500 });
    }
}
