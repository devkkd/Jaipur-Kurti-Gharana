import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function createAdmin() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('❌ MONGODB_URI not found in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');
    
    const db = client.db('avanta-web');
    
    // Check if admin already exists
    const existingAdmin = await db.collection('admins').findOne({
      $or: [
        { email: 'admin@avanta.com' },
        { username: 'admin' }
      ]
    });
    
    if (existingAdmin) {
      console.log('⚠️  Admin already exists!');
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Username:', existingAdmin.username);
      console.log('🔄 Active:', existingAdmin.isActive);
      console.log('');
      console.log('🔄 Updating admin credentials...');
      
      // Update password
      const newPassword = 'Avanta@123';
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      
      await db.collection('admins').updateOne(
        { _id: existingAdmin._id },
        { 
          $set: { 
            password: hashedPassword,
            email: 'admin@avanta.com',
            updatedAt: new Date()
          } 
        }
      );
      
      console.log('✅ Admin credentials updated successfully!');
      console.log('📧 Email: admin@avanta.com');
      console.log('🔑 Password: Avanta@123');
      console.log('');
      console.log('✅ You can login at: http://localhost:3000/admin/login');
      return;
    }
    
    // Hash password
    const password = 'Avanta@123';
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create admin user
    const adminData = {
      username: 'admin',
      email: 'admin@avanta.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: null
    };
    
    const result = await db.collection('admins').insertOne(adminData);
    
    console.log('🎉 Admin user created successfully!');
    console.log('📧 Email: admin@avanta.com');
    console.log('👤 Username: admin');
    console.log('🔑 Password: Avanta@123');
    console.log('🆔 Admin ID:', result.insertedId);
    console.log('');
    console.log('✅ You can now login to admin panel at: http://localhost:3000/admin/login');
    console.log('⚠️  IMPORTANT: Keep these credentials secure!');
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

createAdmin();