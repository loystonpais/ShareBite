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
