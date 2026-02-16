const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

// Admin Schema
const AdminSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true 
    },
    password: { 
      type: String, 
      required: true,
      minlength: 6 
    },
    role: { 
      type: String, 
      default: 'admin',
      enum: ['admin', 'super_admin'] 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    lastLogin: Date,
  },
  { timestamps: true }
);

// Hash password before saving
AdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Admin = mongoose.model('Admin', AdminSchema);

async function seed() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    console.log('✅ Connected to MongoDB successfully');
    
    // Create Admin User
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      const admin = new Admin({
        username: 'admin',
        email: 'admin@avanta.com',
        password: 'Avanta@123', // Will be hashed by pre-save hook
        role: 'super_admin'
      });
      
      await admin.save();
      console.log('✅ Admin user created successfully');
      console.log('📧 Email: admin@avanta.com');
      console.log('👤 Username: admin');
      console.log('🔑 Password: admin123');
      console.log('⚠️  IMPORTANT: Change password after first login!');
    } else {
      console.log('ℹ️  Admin user already exists');
    }
    
    console.log('\n🎉 Admin setup completed!');
    console.log('🚀 You can now login to admin panel');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Admin creation failed:', err);
    process.exit(1);
  }
}

seed();
