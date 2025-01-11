import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        // Check if user exists in Redis
        const userData = await redis.get(`user:${email}`);
        
        if (!userData) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 401 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Verification error:', error);
        return NextResponse.json(
            { success: false, error: 'Verification failed' },
            { status: 500 }
        );
    }
}
