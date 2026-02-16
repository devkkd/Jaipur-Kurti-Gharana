import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import connectionManager from './mongodb-connection-manager.js';

export async function connectToDatabase() {
  try {
    const client = await connectionManager.connect();
    const db = await connectionManager.getDatabase();
    
    console.log('MongoDB connected successfully');
    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
}

export async function findAdmin(username) {
  try {
    const { db } = await connectToDatabase();
    const admin = await db.collection('admins').findOne({
      $or: [{ username }, { email: username }],
      isActive: true
    });
    return admin;
  } catch (error) {
    console.error('Find admin error:', error);
    throw error;
  }
}

export async function findAdminById(adminId) {
  try {
    const { db } = await connectToDatabase();
    const admin = await db.collection('admins').findOne({
      _id: new ObjectId(adminId),
      isActive: true
    });
    return admin;
  } catch (error) {
    console.error('Find admin by ID error:', error);
    throw error;
  }
}

export async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export async function updateLastLogin(adminId) {
  try {
    const { db } = await connectToDatabase();
    await db.collection('admins').updateOne(
      { _id: new ObjectId(adminId) },
      { $set: { lastLogin: new Date() } }
    );
  } catch (error) {
    console.error('Update last login error:', error);
    throw error;
  }
}