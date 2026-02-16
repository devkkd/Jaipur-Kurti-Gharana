import dotenv from 'dotenv';
import { connectToDatabase, findAdmin, isUsingMongoDB } from '../src/lib/database-adapter.js';

dotenv.config({ path: '.env.local' });

async function testConnection() {
  try {
    console.log('Testing database adapter...');
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    console.log('JWT Secret:', process.env.JWT_SECRET ? 'Set' : 'Not set');
    
    // Test connection
    await connectToDatabase();
    console.log('Database type:', isUsingMongoDB() ? 'MongoDB' : 'Mock Database');
    
    // Test admin lookup
    const admin = await findAdmin('admin@avanta.com');
    console.log('Test admin found:', admin ? 'Yes' : 'No');
    
    if (admin) {
      console.log('Admin details:', {
        username: admin.username,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive
      });
    }
    
    console.log('✅ Database adapter test successful!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database adapter test failed:', error);
    process.exit(1);
  }
}

testConnection();