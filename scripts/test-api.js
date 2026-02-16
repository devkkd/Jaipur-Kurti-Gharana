const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('🔍 Testing subcategories API...');
    
    // First get categories to find the Suits Set category ID
    console.log('1. Fetching categories...');
    const categoriesResponse = await fetch('http://localhost:3000/api/admin/categories');
    const categoriesData = await categoriesResponse.json();
    
    if (!categoriesData.success) {
      console.log('❌ Failed to fetch categories:', categoriesData.error);
      return;
    }
    
    console.log(`✅ Found ${categoriesData.data.length} categories`);
    
    const suitsCategory = categoriesData.data.find(cat => cat.slug === 'suits-set');
    if (!suitsCategory) {
      console.log('❌ Suits Set category not found');
      return;
    }
    
    console.log(`✅ Found Suits Set category: ${suitsCategory.name} (${suitsCategory._id})`);
    
    // Now test subcategories API with categoryId filter
    console.log('\n2. Fetching subcategories for Suits Set...');
    const subcategoriesResponse = await fetch(`http://localhost:3000/api/admin/subcategories?categoryId=${suitsCategory._id}`);
    const subcategoriesData = await subcategoriesResponse.json();
    
    if (!subcategoriesData.success) {
      console.log('❌ Failed to fetch subcategories:', subcategoriesData.error);
      return;
    }
    
    console.log(`✅ Found ${subcategoriesData.data.length} subcategories:`);
    subcategoriesData.data.forEach((sub, index) => {
      console.log(`   ${index + 1}. ${sub.name} (${sub._id})`);
      console.log(`      - Slug: ${sub.slug}`);
      console.log(`      - Active: ${sub.isActive}`);
      console.log(`      - Category: ${sub.categoryId ? sub.categoryId.name : 'Unknown'}`);
    });
    
    // Test all subcategories (no filter)
    console.log('\n3. Fetching all subcategories...');
    const allSubcategoriesResponse = await fetch('http://localhost:3000/api/admin/subcategories');
    const allSubcategoriesData = await allSubcategoriesResponse.json();
    
    if (allSubcategoriesData.success) {
      console.log(`✅ Total subcategories in database: ${allSubcategoriesData.data.length}`);
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('Make sure your Next.js development server is running on http://localhost:3000');
  }
}

testAPI();