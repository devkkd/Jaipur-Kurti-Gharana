// Test script to check suits category data
const { getAllCategories, getAllSubcategories, getAllProducts } = require('../src/lib/database-adapter.js');

async function testSuitsData() {
  try {
    console.log('🔍 Testing Suits Set data...\n');
    
    // Get all categories
    const categories = await getAllCategories();
    const suitsCategory = categories.find(cat => cat.slug === 'suits-set');
    
    if (suitsCategory) {
      console.log('✅ Suits Set Category Found:');
      console.log(`   ID: ${suitsCategory._id}`);
      console.log(`   Name: ${suitsCategory.name}`);
      console.log(`   Slug: ${suitsCategory.slug}\n`);
      
      // Get subcategories for this category
      const allSubcategories = await getAllSubcategories();
      const suitsSubcategories = allSubcategories.filter(sub => {
        const subCategoryId = typeof sub.categoryId === 'object' ? sub.categoryId._id : sub.categoryId;
        return subCategoryId.toString() === suitsCategory._id.toString();
      });
      
      console.log(`📋 Subcategories (${suitsSubcategories.length}):`);
      suitsSubcategories.forEach(sub => {
        console.log(`   - ${sub.name} (${sub._id})`);
      });
      console.log('');
      
      // Get products for this category
      const allProducts = await getAllProducts();
      const suitsProducts = allProducts.filter(product => {
        const productCategoryId = typeof product.categoryId === 'object' ? product.categoryId._id : product.categoryId;
        return productCategoryId.toString() === suitsCategory._id.toString();
      });
      
      console.log(`🛍️ Products (${suitsProducts.length}):`);
      suitsProducts.forEach(product => {
        const subcategoryName = suitsSubcategories.find(sub => {
          const productSubcategoryId = typeof product.subcategoryId === 'object' ? product.subcategoryId._id : product.subcategoryId;
          return sub._id.toString() === productSubcategoryId?.toString();
        })?.name || 'No Subcategory';
        
        console.log(`   - ${product.name} (${subcategoryName})`);
      });
      
      if (suitsSubcategories.length === 0) {
        console.log('⚠️  No subcategories found. Create some subcategories in admin panel.');
      }
      
      if (suitsProducts.length === 0) {
        console.log('⚠️  No products found. Create some products in admin panel.');
      }
      
    } else {
      console.log('❌ Suits Set category not found!');
    }
    
  } catch (error) {
    console.error('❌ Error testing suits data:', error);
  }
}

// Run if called directly
if (require.main === module) {
  testSuitsData().then(() => {
    console.log('\n✅ Test completed');
    process.exit(0);
  }).catch(error => {
    console.error('❌ Test failed:', error);
    process.exit(1);
  });
}

module.exports = { testSuitsData };