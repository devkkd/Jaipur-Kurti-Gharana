require('dotenv').config({ path: '.env.local' });
const { createCategory, getAllCategories, isUsingMongoDB } = require('../src/lib/database-adapter');

async function seedCategories() {
  try {
    console.log('🌱 Seeding categories...');
    
    // Check current categories
    const existingCategories = await getAllCategories();
    console.log('Existing categories:', existingCategories.length);
    
    if (existingCategories.length > 0) {
      console.log('Categories already exist:');
      existingCategories.forEach(cat => {
        console.log(`- ${cat.name} (ID: ${cat._id})`);
      });
      return;
    }
    
    // Sample categories to create
    const categories = [
      {
        name: 'Ethnic Wear',
        description: 'Traditional and contemporary ethnic clothing',
        sortOrder: 1,
        isActive: true
      },
      {
        name: 'Western Wear', 
        description: 'Modern western style clothing',
        sortOrder: 2,
        isActive: true
      },
      {
        name: 'Fusion Wear',
        description: 'Indo-western fusion clothing',
        sortOrder: 3,
        isActive: true
      }
    ];
    
    console.log('Creating categories...');
    for (const categoryData of categories) {
      const newCategory = await createCategory(categoryData);
      console.log(`✅ Created: ${newCategory.name} (ID: ${newCategory._id})`);
    }
    
    console.log('🎉 Categories seeded successfully!');
    console.log('Database type:', isUsingMongoDB() ? 'MongoDB' : 'Mock Database');
    
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
  }
}

seedCategories();