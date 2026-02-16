import { MongoClient } from 'mongodb';

class MongoDBConnectionManager {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.connectionAttempts = 0;
    this.maxAttempts = 3;
  }

  // Different connection string variations to try
  getConnectionStrings() {
    const baseUri = process.env.MONGODB_URI;
    if (!baseUri) {
      throw new Error('MONGODB_URI environment variable is required');
    }

    // If it's a local connection, return as-is
    if (baseUri.includes('localhost') || baseUri.includes('127.0.0.1')) {
      return [baseUri];
    }

    // For Atlas connections, try different SSL configurations
    const baseUrl = baseUri.split('?')[0];
    const dbName = baseUri.includes('/avanta-web') ? '/avanta-web' : '';
    
    return [
      // Option 1: Disable SSL completely
      `${baseUrl}${dbName}?ssl=false&retryWrites=true&w=majority`,
      
      // Option 2: TLS with relaxed validation
      `${baseUrl}${dbName}?tls=true&tlsAllowInvalidCertificates=true&tlsAllowInvalidHostnames=true&retryWrites=true&w=majority`,
      
      // Option 3: Original connection string
      baseUri,
      
      // Option 4: Minimal connection
      `${baseUrl}${dbName}?retryWrites=false&w=1`,
    ];
  }

  async tryConnection(uri, options = {}) {
    const defaultOptions = {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 5000,
      maxPoolSize: 5,
      minPoolSize: 1,
    };

    const client = new MongoClient(uri, { ...defaultOptions, ...options });
    
    try {
      await client.connect();
      await client.db('avanta-web').admin().ping();
      console.log('✅ MongoDB connection successful with:', uri.split('?')[0] + '?[options-hidden]');
      return client;
    } catch (error) {
      await client.close().catch(() => {});
      throw error;
    }
  }

  async connect() {
    if (this.isConnected && this.client) {
      return this.client;
    }

    const connectionStrings = this.getConnectionStrings();
    console.log(`🔄 Trying ${connectionStrings.length} connection methods...`);

    for (let i = 0; i < connectionStrings.length; i++) {
      const uri = connectionStrings[i];
      console.log(`📡 Attempt ${i + 1}/${connectionStrings.length}...`);
      
      try {
        this.client = await this.tryConnection(uri);
        this.isConnected = true;
        return this.client;
      } catch (error) {
        console.log(`❌ Attempt ${i + 1} failed:`, error.message.split('\n')[0]);
        
        if (i === connectionStrings.length - 1) {
          console.log('\n🚨 All MongoDB connection attempts failed!');
          console.log('💡 Solutions:');
          console.log('1. Install MongoDB locally: https://www.mongodb.com/try/download/community');
          console.log('2. Use Docker: docker run -d -p 27017:27017 mongo:latest');
          console.log('3. Check MongoDB Atlas IP whitelist');
          console.log('4. Verify network/firewall settings');
          console.log('\n📝 For local MongoDB, update .env.local:');
          console.log('   MONGODB_URI=mongodb://localhost:27017/avanta-web');
          
          throw new Error('All MongoDB connection methods failed. Please install MongoDB locally or fix Atlas connection.');
        }
      }
    }
  }

  async getDatabase() {
    const client = await this.connect();
    return client.db('avanta-web');
  }

  async close() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.isConnected = false;
    }
  }
}

// Singleton instance
const connectionManager = new MongoDBConnectionManager();

export default connectionManager;