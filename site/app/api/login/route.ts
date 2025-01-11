import { NextResponse } from 'next/server';
import redis from '@/lib/redis';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
      const { email, password } = await request.json();
  
      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user data object
      const userData = {
        password: hashedPassword,
        bookings: [],
        lastLogin: new Date().toISOString()
      };
  
      // Store in Redis as JSON string
      await redis.set(
        `user:${email}`, 
        JSON.stringify(userData)
      );
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Login error:', error);
      return NextResponse.json(
        { error: 'Login failed' },
        { status: 500 }
      );
    }
  }