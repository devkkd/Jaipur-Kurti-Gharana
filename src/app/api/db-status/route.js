import { NextResponse } from 'next/server';
import { isDatabaseConnected, isUsingMongoDB, findAdmin } from '@/lib/database-adapter';

export async function GET() {
  try {
    // Test database connection
    const admin = await findAdmin('admin@avanta.com');
    
    return NextResponse.json({
      success: true,
      database: {
        connected: isDatabaseConnected(),
        type: isUsingMongoDB() ? 'MongoDB' : 'Mock Database',
        adminExists: !!admin
      },
      credentials: isUsingMongoDB() ? null : {
        username: 'admin@avanta.com',
        password: 'Avanta@123',
        note: 'Using mock database for development'
      },
      message: isUsingMongoDB() 
        ? 'Connected to MongoDB Atlas' 
        : 'Using mock database - MongoDB connection failed'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      database: {
        connected: false,
        type: 'Unknown'
      }
    }, { status: 500 });
  }
}