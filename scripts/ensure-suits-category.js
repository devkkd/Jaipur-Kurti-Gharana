// Script to ensure Suits Set category exists in database
const { createCategory, getAllCategories, createSubcategory, getAllSubcategories } = require('../src/lib/database-adapter.js');

async function ensureSuitsCategory() {
  try {
    console.log('🔍 Checking for Suits Set category...');
    
    // Get all categories
    const categories = await getAllCategories();
    console.log('📋 Found categories:', categories.map(c => ({ name: c.name, slug: c.slug })));
    
    // Check if suits-set category exists
    let suitsCategory = categories.find(cat => 
      cat.slug === 'suits-set' || 
      cat.name.toLowerCase().includes('suit')
    );
    
    if (!suitsCategory) {
      console.log('➕ Creating Suits Set category...');
      suitsCategory = await createCategory({
        name: 'Suits Set',
        slug: 'suits-set',
        description: 'Premium collection of elegant suit sets for every occasion',
        sortOrder: 1,
        isActive: true
      });
      console.log('✅ Suits Set category created:', suitsCategory);
    } else {
      console.log('✅ Suits Set category already exists:', suitsCategory.name);
    }
    
    // Get subcategories for this category
    const subcategories = await getAllSubcategories();
    const suitsSubcategories = subcategories.filter(sub => {
      const subCategoryId = typeof sub.categoryId === 'object' ? sub.categoryId._id : sub.categoryId;
      return subCategoryId === suitsCategory._id;
    });
    
    console.log('📋 Found subcategories for Suits Set:', suitsSubcategories.map(s => s.name));
    
    // Create default subcategories if none exist
    const defaultSubcategories = [
      { name: 'Formal Suits', description: 'Professional and formal suit sets' },
      { name: 'Casual Suits', description: 'Comfortable casual suit sets' },
      { name: 'Party Wear Suits', description: 'Elegant party wear suit sets' },
      { name: 'Wedding Suits', description: 'Special occasion wedding suit sets' }
    ];
    
    for (const subcat of defaultSubcategories) {
      const exists = suitsSubcategories.find(s => s.name.toLowerCase() === subcat.name.toLowerCase());
      if (!exists) {
        console.log(`➕ Creating subcategory: ${subcat.name}`);
        const newSubcategory = await createSubcategory({
          name: subcat.name,
          slug: subcat.name.toLowerCase().replace(/\s+/g, '-'),
          description: subcat.description,
          categoryId: suitsCategory._id,
          sortOrder: defaultSubcategories.indexOf(subcat),
          isActive: true
        });
        console.log(`✅ Created subcategory: ${newSubcategory.name}`);
      }
    }
    
    console.log('🎉 Suits Set category setup complete!');
    
  } catch (error) {
    console.error('❌ Error ensuring Suits Set category:', error);
  }
}

// Run if called directly
if (require.main === module) {
  ensureSuitsCategory().then(() => {
    console.log('Script completed');
    process.exit(0);
  }).catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
  });
}

module.exports = { ensureSuitsCategory };