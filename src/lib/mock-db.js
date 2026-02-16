import bcrypt from 'bcryptjs';

// Mock database for development
const mockDatabase = {
  admins: [
    {
      _id: '507f1f77bcf86cd799439011',
      username: 'admin@avanta.com',
      email: 'admin@avanta.com',
      password: '$2b$12$4fw2pDbXfR7aVJGyHaLz1eIQ8eYB8G6rduzlh9bHm2FMeMJ.JIzW6', // Avanta@123
      isActive: true,
      role: 'admin',
      createdAt: new Date(),
      lastLogin: null
    }
  ],
  products: [],
  categories: [
    {
      _id: '507f1f77bcf86cd799439021',
      name: 'Ethnic Wear',
      slug: 'ethnic-wear',
      description: 'Traditional and contemporary ethnic clothing',
      image: '/images/categories/ethnic-wear.jpg',
      isActive: true,
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '507f1f77bcf86cd799439022',
      name: 'Western Wear',
      slug: 'western-wear',
      description: 'Modern western style clothing',
      image: '/images/categories/western-wear.jpg',
      isActive: true,
      sortOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  subcategories: [
    {
      _id: '507f1f77bcf86cd799439031',
      name: 'Anarkali Suits',
      slug: 'anarkali-suits',
      description: 'Beautiful Anarkali style suits',
      image: '/images/subcategories/anarkali-suits.jpg',
      categoryId: '507f1f77bcf86cd799439021',
      isActive: true,
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '507f1f77bcf86cd799439032',
      name: 'Kurti Sets',
      slug: 'kurti-sets',
      description: 'Stylish kurti with matching bottoms',
      image: '/images/subcategories/kurti-sets.jpg',
      categoryId: '507f1f77bcf86cd799439021',
      isActive: true,
      sortOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '507f1f77bcf86cd799439033',
      name: 'Straight Suits',
      slug: 'straight-suits',
      description: 'Classic straight cut suits',
      image: '/images/subcategories/straight-suits.jpg',
      categoryId: '507f1f77bcf86cd799439021',
      isActive: true,
      sortOrder: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '507f1f77bcf86cd799439034',
      name: 'Flared Suit Sets',
      slug: 'flared-suit-sets',
      description: 'Elegant flared suit sets with flowing silhouettes',
      image: '/images/subcategories/flared-suit-sets.jpg',
      categoryId: '507f1f77bcf86cd799439021',
      isActive: true,
      sortOrder: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '507f1f77bcf86cd799439035',
      name: 'Straight Dupatta Sets',
      slug: 'straight-dupatta-sets',
      description: 'Classic straight suits with matching dupatta',
      image: '/images/subcategories/straight-dupatta-sets.jpg',
      categoryId: '507f1f77bcf86cd799439021',
      isActive: true,
      sortOrder: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '507f1f77bcf86cd799439036',
      name: 'Straight Suit Sets',
      slug: 'straight-suit-sets',
      description: 'Complete straight suit sets with coordinated pieces',
      image: '/images/subcategories/straight-suit-sets.jpg',
      categoryId: '507f1f77bcf86cd799439021',
      isActive: true,
      sortOrder: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
};

export async function connectToDatabase() {
  console.log('Using mock database for development');
  return { 
    client: { close: () => {} }, 
    db: mockDatabase 
  };
}

export async function findAdmin(username) {
  try {
    console.log('Finding admin:', username);
    const admin = mockDatabase.admins.find(admin => 
      (admin.username === username || admin.email === username) && admin.isActive
    );
    console.log('Found admin:', admin ? 'Yes' : 'No');
    return admin || null;
  } catch (error) {
    console.error('Find admin error:', error);
    throw error;
  }
}

export async function findAdminById(adminId) {
  try {
    const admin = mockDatabase.admins.find(admin => 
      admin._id === adminId && admin.isActive
    );
    return admin || null;
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
    const admin = mockDatabase.admins.find(admin => admin._id === adminId);
    if (admin) {
      admin.lastLogin = new Date();
    }
  } catch (error) {
    console.error('Update last login error:', error);
    throw error;
  }
}

// Helper function to hash password (for creating new admins)
export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

// Generate unique ID
function generateId() {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

// CATEGORY FUNCTIONS
export async function getAllCategories() {
  try {
    // For admin, return all categories (active and inactive)
    return mockDatabase.categories.sort((a, b) => a.sortOrder - b.sortOrder);
  } catch (error) {
    console.error('Get categories error:', error);
    throw error;
  }
}

export async function getCategoryById(categoryId) {
  try {
    return mockDatabase.categories.find(cat => cat._id === categoryId);
  } catch (error) {
    console.error('Get category by ID error:', error);
    throw error;
  }
}

export async function createCategory(categoryData) {
  try {
    const newCategory = {
      _id: generateId(),
      ...categoryData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockDatabase.categories.push(newCategory);
    return newCategory;
  } catch (error) {
    console.error('Create category error:', error);
    throw error;
  }
}

export async function updateCategory(categoryId, updateData) {
  try {
    const categoryIndex = mockDatabase.categories.findIndex(cat => cat._id === categoryId);
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }
    
    mockDatabase.categories[categoryIndex] = {
      ...mockDatabase.categories[categoryIndex],
      ...updateData,
      updatedAt: new Date()
    };
    
    return mockDatabase.categories[categoryIndex];
  } catch (error) {
    console.error('Update category error:', error);
    throw error;
  }
}

export async function deleteCategory(categoryId) {
  try {
    const categoryIndex = mockDatabase.categories.findIndex(cat => cat._id === categoryId);
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }
    
    // Soft delete - set isActive to false
    mockDatabase.categories[categoryIndex].isActive = false;
    mockDatabase.categories[categoryIndex].updatedAt = new Date();
    
    return true;
  } catch (error) {
    console.error('Delete category error:', error);
    throw error;
  }
}

// SUBCATEGORY FUNCTIONS
export async function getAllSubcategories() {
  try {
    // For admin, return all subcategories (active and inactive)
    return mockDatabase.subcategories.sort((a, b) => a.sortOrder - b.sortOrder);
  } catch (error) {
    console.error('Get subcategories error:', error);
    throw error;
  }
}

export async function getSubcategoriesByCategory(categoryId) {
  try {
    return mockDatabase.subcategories
      .filter(sub => sub.categoryId === categoryId && sub.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch (error) {
    console.error('Get subcategories by category error:', error);
    throw error;
  }
}

export async function getSubcategoryById(subcategoryId) {
  try {
    return mockDatabase.subcategories.find(sub => sub._id === subcategoryId);
  } catch (error) {
    console.error('Get subcategory by ID error:', error);
    throw error;
  }
}

export async function createSubcategory(subcategoryData) {
  try {
    const newSubcategory = {
      _id: generateId(),
      ...subcategoryData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockDatabase.subcategories.push(newSubcategory);
    return newSubcategory;
  } catch (error) {
    console.error('Create subcategory error:', error);
    throw error;
  }
}

export async function updateSubcategory(subcategoryId, updateData) {
  try {
    const subcategoryIndex = mockDatabase.subcategories.findIndex(sub => sub._id === subcategoryId);
    if (subcategoryIndex === -1) {
      throw new Error('Subcategory not found');
    }
    
    mockDatabase.subcategories[subcategoryIndex] = {
      ...mockDatabase.subcategories[subcategoryIndex],
      ...updateData,
      updatedAt: new Date()
    };
    
    return mockDatabase.subcategories[subcategoryIndex];
  } catch (error) {
    console.error('Update subcategory error:', error);
    throw error;
  }
}

export async function deleteSubcategory(subcategoryId) {
  try {
    const subcategoryIndex = mockDatabase.subcategories.findIndex(sub => sub._id === subcategoryId);
    if (subcategoryIndex === -1) {
      throw new Error('Subcategory not found');
    }
    
    // Soft delete - set isActive to false
    mockDatabase.subcategories[subcategoryIndex].isActive = false;
    mockDatabase.subcategories[subcategoryIndex].updatedAt = new Date();
    
    return true;
  } catch (error) {
    console.error('Delete subcategory error:', error);
    throw error;
  }
}

// PRODUCT FUNCTIONS
export async function getAllProducts() {
  try {
    // For admin, return all products (active and inactive)
    return mockDatabase.products.sort((a, b) => a.sortOrder - b.sortOrder || new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('Get products error:', error);
    throw error;
  }
}

export async function getProductById(productId) {
  try {
    return mockDatabase.products.find(product => product._id === productId);
  } catch (error) {
    console.error('Get product by ID error:', error);
    throw error;
  }
}

export async function getProductsByCategory(categoryId) {
  try {
    return mockDatabase.products
      .filter(product => product.categoryId === categoryId && product.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder || new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('Get products by category error:', error);
    throw error;
  }
}

export async function getProductsBySubcategory(subcategoryId) {
  try {
    return mockDatabase.products
      .filter(product => product.subcategoryId === subcategoryId && product.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder || new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('Get products by subcategory error:', error);
    throw error;
  }
}

export async function createProduct(productData) {
  try {
    const newProduct = {
      _id: generateId(),
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockDatabase.products.push(newProduct);
    return newProduct;
  } catch (error) {
    console.error('Create product error:', error);
    throw error;
  }
}

export async function updateProduct(productId, updateData) {
  try {
    const productIndex = mockDatabase.products.findIndex(product => product._id === productId);
    if (productIndex === -1) {
      return null;
    }
    
    mockDatabase.products[productIndex] = {
      ...mockDatabase.products[productIndex],
      ...updateData,
      updatedAt: new Date()
    };
    
    return mockDatabase.products[productIndex];
  } catch (error) {
    console.error('Update product error:', error);
    throw error;
  }
}

export async function deleteProduct(productId) {
  try {
    const productIndex = mockDatabase.products.findIndex(product => product._id === productId);
    if (productIndex === -1) {
      return false;
    }
    
    // Soft delete - set isActive to false
    mockDatabase.products[productIndex].isActive = false;
    mockDatabase.products[productIndex].updatedAt = new Date();
    
    return true;
  } catch (error) {
    console.error('Delete product error:', error);
    throw error;
  }
}

export async function searchProducts(query, filters = {}) {
  try {
    let results = mockDatabase.products.filter(product => {
      if (!product.isActive) return false;
      
      // Text search
      const searchText = query.toLowerCase();
      const matchesText = 
        product.name.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText) ||
        product.styleCode.toLowerCase().includes(searchText) ||
        product.sku.toLowerCase().includes(searchText) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchText)));
      
      if (!matchesText) return false;
      
      // Apply filters
      if (filters.categoryId && product.categoryId !== filters.categoryId) return false;
      if (filters.subcategoryId && product.subcategoryId !== filters.subcategoryId) return false;
      if (filters.minPrice && product.priceRange.min < filters.minPrice) return false;
      if (filters.maxPrice && product.priceRange.max > filters.maxPrice) return false;
      if (filters.sizes && filters.sizes.length > 0) {
        const hasMatchingSize = product.sizes.some(size => filters.sizes.includes(size.size));
        if (!hasMatchingSize) return false;
      }
      
      return true;
    });
    
    return results.sort((a, b) => a.sortOrder - b.sortOrder || new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('Search products error:', error);
    throw error;
  }
}

// Initialize with default admin if needed
export async function initializeMockDatabase() {
  if (mockDatabase.admins.length === 0) {
    const hashedPassword = await hashPassword('Avanta@123');
    mockDatabase.admins.push({
      _id: '507f1f77bcf86cd799439011',
      username: 'admin@avanta.com',
      email: 'admin@avanta.com',
      password: hashedPassword,
      isActive: true,
      role: 'admin',
      createdAt: new Date(),
      lastLogin: null
    });
  }
}