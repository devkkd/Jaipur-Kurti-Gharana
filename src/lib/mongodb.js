import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    // Check if connection is still alive
    if (cached.conn.connection?.readyState === 1) {
      return cached.conn;
    }
    // Connection dropped, reset cache
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 2,
      minPoolSize: 1,
      maxIdleTimeMS: 10000,
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      compressors: 'zlib',
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(async (mongoose) => {
      console.log('✅ MongoDB connected successfully');
      // Drop stale styleCode_1 index if it still exists
      try {
        const db = mongoose.connection.db;
        const indexes = await db.collection('products').indexes();
        const stale = indexes.find(idx => idx.name === 'styleCode_1');
        if (stale) {
          await db.collection('products').dropIndex('styleCode_1');
          console.log('✅ Dropped stale styleCode_1 index');
        }
      } catch (e) {
        // Non-fatal — log and continue
        console.warn('⚠️ Could not check/drop styleCode_1 index:', e.message);
      }
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    console.error('❌ MongoDB connection error:', e);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
