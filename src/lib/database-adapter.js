// Database adapter that tries MongoDB first, falls back to mock database
import * as mongoDb from './mongodb-native.js';
import * as mockDb from './mock-db.js';
import { ObjectId } from 'mongodb';

let useMongoDb = true;
let dbInitialized = false;

// Test MongoDB connection on first use
async function initializeDatabase() {
  if (dbInitialized) return;
  
  try {
    console.log('Testing MongoDB connection...');
    await mongoDb.connectToDatabase();
    console.log('✅ MongoDB connection successful');
    useMongoDb = true;
  } catch (error) {
    console.log('❌ MongoDB connection failed, falling back to mock database');
    console.log('Error:', error.message);
    useMongoDb = false;
    await mockDb.initializeMockDatabase();
  }
  
  dbInitialized = true;
}

// Helper function to convert ID for MongoDB
function convertId(id) {
  if (useMongoDb && ObjectId.isValid(id)) {
    return new ObjectId(id);
  }
  return id;
}

// Database functions that route to appropriate implementation
export async function connectToDatabase() {
  await initializeDatabase();
  return useMongoDb ? mongoDb.connectToDatabase() : mockDb.connectToDatabase();
}

export async function findAdmin(username) {
  await initializeDatabase();
  return useMongoDb ? mongoDb.findAdmin(username) : mockDb.findAdmin(username);
}

export async function findAdminById(adminId) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    return await db.collection('admins').findOne({
      _id: convertId(adminId),
      isActive: true
    });
  } else {
    return mockDb.findAdminById(adminId);
  }
}

export async function comparePassword(plainPassword, hashedPassword) {
  await initializeDatabase();
  return useMongoDb ? mongoDb.comparePassword(plainPassword, hashedPassword) : mockDb.comparePassword(plainPassword, hashedPassword);
}

export async function updateLastLogin(adminId) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    await db.collection('admins').updateOne(
      { _id: convertId(adminId) },
      { $set: { lastLogin: new Date() } }
    );
  } else {
    return mockDb.updateLastLogin(adminId);
  }
}

// Category functions
export async function getAllCategories() {
  await initializeDatabase();
  if (useMongoDb) {
    // MongoDB implementation - show all categories for admin
    const { db } = await mongoDb.connectToDatabase();
    const categories = await db.collection('categories').find({}).sort({ sortOrder: 1, name: 1 }).toArray();
    console.log('MongoDB categories found:', categories.length);
    console.log('Category IDs:', categories.map(c => ({ id: c._id.toString(), name: c.name })));
    return categories;
  } else {
    // Mock database - show all categories for admin
    return mockDb.getAllCategories();
  }
}

export async function getCategoryById(categoryId) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    return await db.collection('categories').findOne({ _id: convertId(categoryId) });
  } else {
    return mockDb.getCategoryById(categoryId);
  }
}

export async function createCategory(categoryData) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    const result = await db.collection('categories').insertOne({
      ...categoryData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { _id: result.insertedId, ...categoryData };
  } else {
    return mockDb.createCategory(categoryData);
  }
}

export async function updateCategory(categoryId, updateData) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    
    console.log('Updating category - Original ID:', categoryId);
    const convertedId = convertId(categoryId);
    console.log('Converted ID:', convertedId);
    
    // First check if the category exists
    const existingCategory = await db.collection('categories').findOne({ _id: convertedId });
    console.log('Existing category found:', existingCategory ? 'YES' : 'NO');
    
    if (!existingCategory) {
      return null;
    }
    
    console.log('About to update with data:', updateData);
    
    try {
      const result = await db.collection('categories').findOneAndUpdate(
        { _id: convertedId },
        { $set: { ...updateData, updatedAt: new Date() } },
        { returnDocument: 'after' }
      );
      
      console.log('MongoDB findOneAndUpdate result type:', typeof result);
      console.log('MongoDB findOneAndUpdate result:', result);
      
      // Handle different MongoDB driver response formats
      let updatedDocument = null;
      
      if (result && result.value) {
        // Older driver format
        updatedDocument = result.value;
        console.log('Using result.value (older driver format)');
      } else if (result && result._id) {
        // Newer driver format - document returned directly
        updatedDocument = result;
        console.log('Using result directly (newer driver format)');
      } else {
        console.log('No valid document found in result');
      }
      
      console.log('Final updated document:', updatedDocument);
      return updatedDocument;
      
    } catch (mongoError) {
      console.error('MongoDB update error:', mongoError);
      throw mongoError;
    }
  } else {
    return mockDb.updateCategory(categoryId, updateData);
  }
}

export async function deleteCategory(categoryId) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    const result = await db.collection('categories').findOneAndUpdate(
      { _id: convertId(categoryId) },
      { $set: { isActive: false, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return result.value !== null;
  } else {
    return mockDb.deleteCategory(categoryId);
  }
}

// Subcategory functions
export async function getAllSubcategories() {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    return await db.collection('subcategories').find({}).sort({ sortOrder: 1, name: 1 }).toArray();
  } else {
    return mockDb.getAllSubcategories();
  }
}

export async function getSubcategoriesByCategory(categoryId) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    return await db.collection('subcategories').find({ categoryId: convertId(categoryId) }).sort({ sortOrder: 1, name: 1 }).toArray();
  } else {
    return mockDb.getSubcategoriesByCategory(categoryId);
  }
}

export async function getSubcategoryById(subcategoryId) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    return await db.collection('subcategories').findOne({ _id: convertId(subcategoryId) });
  } else {
    return mockDb.getSubcategoryById(subcategoryId);
  }
}

export async function createSubcategory(subcategoryData) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    // Convert categoryId to ObjectId for MongoDB
    const dataWithObjectId = {
      ...subcategoryData,
      categoryId: convertId(subcategoryData.categoryId),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await db.collection('subcategories').insertOne(dataWithObjectId);
    return { _id: result.insertedId, ...dataWithObjectId };
  } else {
    return mockDb.createSubcategory(subcategoryData);
  }
}

export async function updateSubcategory(subcategoryId, updateData) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    
    console.log('Updating subcategory - Original ID:', subcategoryId);
    const convertedId = convertId(subcategoryId);
    console.log('Converted ID:', convertedId);
    
    // First check if the subcategory exists
    const existingSubcategory = await db.collection('subcategories').findOne({ _id: convertedId });
    console.log('Existing subcategory found:', existingSubcategory ? 'YES' : 'NO');
    
    if (!existingSubcategory) {
      return null;
    }
    
    // Convert categoryId to ObjectId if it exists in updateData
    const dataWithObjectId = { ...updateData };
    if (dataWithObjectId.categoryId) {
      dataWithObjectId.categoryId = convertId(dataWithObjectId.categoryId);
    }
    
    console.log('About to update subcategory with data:', dataWithObjectId);
    
    try {
      const result = await db.collection('subcategories').findOneAndUpdate(
        { _id: convertedId },
        { $set: { ...dataWithObjectId, updatedAt: new Date() } },
        { returnDocument: 'after' }
      );
      
      console.log('MongoDB findOneAndUpdate result type:', typeof result);
      console.log('MongoDB findOneAndUpdate result:', result);
      
      // Handle different MongoDB driver response formats
      let updatedDocument = null;
      
      if (result && result.value) {
        // Older driver format
        updatedDocument = result.value;
        console.log('Using result.value (older driver format)');
      } else if (result && result._id) {
        // Newer driver format - document returned directly
        updatedDocument = result;
        console.log('Using result directly (newer driver format)');
      } else {
        console.log('No valid document found in result');
      }
      
      console.log('Final updated subcategory document:', updatedDocument);
      return updatedDocument;
      
    } catch (mongoError) {
      console.error('MongoDB update error:', mongoError);
      throw mongoError;
    }
  } else {
    return mockDb.updateSubcategory(subcategoryId, updateData);
  }
}

export async function deleteSubcategory(subcategoryId) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    
    console.log('Deleting subcategory - Original ID:', subcategoryId);
    const convertedId = convertId(subcategoryId);
    console.log('Converted ID:', convertedId);
    
    try {
      const result = await db.collection('subcategories').findOneAndUpdate(
        { _id: convertedId },
        { $set: { isActive: false, updatedAt: new Date() } },
        { returnDocument: 'after' }
      );
      
      console.log('MongoDB findOneAndUpdate result for delete:', result);
      
      // Handle different MongoDB driver response formats
      let updatedDocument = null;
      
      if (result && result.value) {
        // Older driver format
        updatedDocument = result.value;
      } else if (result && result._id) {
        // Newer driver format - document returned directly
        updatedDocument = result;
      }
      
      return updatedDocument !== null;
      
    } catch (mongoError) {
      console.error('MongoDB delete error:', mongoError);
      throw mongoError;
    }
  } else {
    return mockDb.deleteSubcategory(subcategoryId);
  }
}

// Product functions
export async function getAllProducts() {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    return await db.collection('products').find({}).sort({ sortOrder: 1, createdAt: -1 }).toArray();
  } else {
    return mockDb.getAllProducts();
  }
}

export async function getProductById(productId) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    return await db.collection('products').findOne({ _id: convertId(productId) });
  } else {
    return mockDb.getProductById(productId);
  }
}

export async function getProductsByCategory(categoryId) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    return await db.collection('products').find({ 
      categoryId: convertId(categoryId),
      isActive: true 
    }).sort({ sortOrder: 1, createdAt: -1 }).toArray();
  } else {
    return mockDb.getProductsByCategory(categoryId);
  }
}

export async function getProductsBySubcategory(subcategoryId) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    return await db.collection('products').find({ 
      subcategoryId: convertId(subcategoryId),
      isActive: true 
    }).sort({ sortOrder: 1, createdAt: -1 }).toArray();
  } else {
    return mockDb.getProductsBySubcategory(subcategoryId);
  }
}

export async function createProduct(productData) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    
    // Convert categoryId and subcategoryId to ObjectId for MongoDB
    const dataWithObjectId = {
      ...productData,
      categoryId: convertId(productData.categoryId),
      subcategoryId: productData.subcategoryId ? convertId(productData.subcategoryId) : null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('products').insertOne(dataWithObjectId);
    return { _id: result.insertedId, ...dataWithObjectId };
  } else {
    return mockDb.createProduct(productData);
  }
}

export async function updateProduct(productId, updateData) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    
    console.log('Updating product - Original ID:', productId);
    const convertedId = convertId(productId);
    console.log('Converted ID:', convertedId);
    
    // First check if the product exists
    const existingProduct = await db.collection('products').findOne({ _id: convertedId });
    console.log('Existing product found:', existingProduct ? 'YES' : 'NO');
    
    if (!existingProduct) {
      return null;
    }
    
    // Convert categoryId and subcategoryId to ObjectId if they exist in updateData
    const dataWithObjectId = { ...updateData };
    if (dataWithObjectId.categoryId) {
      dataWithObjectId.categoryId = convertId(dataWithObjectId.categoryId);
    }
    if (dataWithObjectId.subcategoryId) {
      dataWithObjectId.subcategoryId = convertId(dataWithObjectId.subcategoryId);
    }
    
    console.log('About to update product with data:', dataWithObjectId);
    
    try {
      const result = await db.collection('products').findOneAndUpdate(
        { _id: convertedId },
        { $set: { ...dataWithObjectId, updatedAt: new Date() } },
        { returnDocument: 'after' }
      );
      
      console.log('MongoDB findOneAndUpdate result type:', typeof result);
      console.log('MongoDB findOneAndUpdate result:', result);
      
      // Handle different MongoDB driver response formats
      let updatedDocument = null;
      
      if (result && result.value) {
        // Older driver format
        updatedDocument = result.value;
        console.log('Using result.value (older driver format)');
      } else if (result && result._id) {
        // Newer driver format - document returned directly
        updatedDocument = result;
        console.log('Using result directly (newer driver format)');
      } else {
        console.log('No valid document found in result');
      }
      
      console.log('Final updated product document:', updatedDocument);
      return updatedDocument;
      
    } catch (mongoError) {
      console.error('MongoDB update error:', mongoError);
      throw mongoError;
    }
  } else {
    return mockDb.updateProduct(productId, updateData);
  }
}

export async function deleteProduct(productId) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    
    console.log('Deleting product - Original ID:', productId);
    const convertedId = convertId(productId);
    console.log('Converted ID:', convertedId);
    
    try {
      const result = await db.collection('products').findOneAndUpdate(
        { _id: convertedId },
        { $set: { isActive: false, updatedAt: new Date() } },
        { returnDocument: 'after' }
      );
      
      console.log('MongoDB findOneAndUpdate result for delete:', result);
      
      // Handle different MongoDB driver response formats
      let updatedDocument = null;
      
      if (result && result.value) {
        // Older driver format
        updatedDocument = result.value;
      } else if (result && result._id) {
        // Newer driver format - document returned directly
        updatedDocument = result;
      }
      
      return updatedDocument !== null;
      
    } catch (mongoError) {
      console.error('MongoDB delete error:', mongoError);
      throw mongoError;
    }
  } else {
    return mockDb.deleteProduct(productId);
  }
}

export async function searchProducts(query, filters = {}) {
  await initializeDatabase();
  if (useMongoDb) {
    const { db } = await mongoDb.connectToDatabase();
    
    const searchQuery = {
      isActive: true,
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { styleCode: { $regex: query, $options: 'i' } },
        { sku: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    };
    
    // Apply filters
    if (filters.categoryId) {
      searchQuery.categoryId = convertId(filters.categoryId);
    }
    if (filters.subcategoryId) {
      searchQuery.subcategoryId = convertId(filters.subcategoryId);
    }
    if (filters.minPrice || filters.maxPrice) {
      searchQuery['priceRange.min'] = {};
      if (filters.minPrice) searchQuery['priceRange.min'].$gte = filters.minPrice;
      if (filters.maxPrice) searchQuery['priceRange.max'] = { $lte: filters.maxPrice };
    }
    if (filters.sizes && filters.sizes.length > 0) {
      searchQuery['sizes.size'] = { $in: filters.sizes };
    }
    
    return await db.collection('products').find(searchQuery).sort({ sortOrder: 1, createdAt: -1 }).toArray();
  } else {
    return mockDb.searchProducts(query, filters);
  }
}
export function isDatabaseConnected() {
  return dbInitialized;
}

export function isUsingMongoDB() {
  return useMongoDb;
}