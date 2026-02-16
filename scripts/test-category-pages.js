const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

// Category page mappings
const categoryPages = [
  { slug: 'suits-set', name: 'Suits Set', path: '/suits-set' },
  { slug: 'kurti-pant-dupatta', name: 'Kurti Set', path: '/kurti-pant-dupatta' },
  { slug: 'anarkali-suit', name: 'Anarkali Suit', path: '/anarkali-suit' },
  { slug: 'top-tunics', name: 'Top Tunics', path: '/top-tunics' },
  { slug: 'gown', name: 'Gown', path: '/gown' },
  { slug: 'co-ord-set', name: 'Co-Ord Set', path: '/co-ord-set' }
];

async function testCategoryPages() {
  console.log('🧪 Testing Category Pages...\n');

  try {
    // First, get all categories from API
    console.log('📋 Fetching categories from API...');
    const categoriesResponse = await fetch(`${BASE_URL}/api/admin/categories`);
    const categoriesData = await categoriesResponse.json();
    
    if (categoriesData.success) {
      console.log(`✅ Found ${categoriesData.data.length} categories in database:`);
      categoriesData.data.forEach(cat => {
        console.log(`   - ${cat.name} (slug: ${cat.slug})`);
      });
    } else {
      console.log('❌ Failed to fetch categories');
      return;
    }

    console.log('\n📋 Fetching subcategories from API...');
    const subcategoriesResponse = await fetch(`${BASE_URL}/api/admin/subcategories`);
    const subcategoriesData = await subcategoriesResponse.json();
    
    if (subcategoriesData.success) {
      console.log(`✅ Found ${subcategoriesData.data.length} subcategories in database`);
    }

    console.log('\n📋 Fetching products from API...');
    const productsResponse = await fetch(`${BASE_URL}/api/products?limit=100`);
    const productsData = await productsResponse.json();
    
    if (productsData.success) {
      console.log(`✅ Found ${productsData.data.length} products in database`);
    }

    console.log('\n🔍 Testing category page mappings...');
    
    for (const page of categoryPages) {
      console.log(`\n📄 Testing ${page.name} (${page.path}):`);
      
      // Find matching category in database
      const matchingCategory = categoriesData.data.find(cat => 
        cat.slug === page.slug || 
        cat.name.toLowerCase().includes(page.slug.split('-')[0]) ||
        cat.slug === 'ethnic-wear'
      );
      
      if (matchingCategory) {
        console.log(`   ✅ Category found: ${matchingCategory.name} (ID: ${matchingCategory._id})`);
        
        // Check subcategories for this category
        const categorySubcategories = subcategoriesData.data.filter(sub => {
          const subCategoryId = typeof sub.categoryId === 'object' ? sub.categoryId._id : sub.categoryId;
          return subCategoryId === matchingCategory._id;
        });
        
        console.log(`   📂 Subcategories: ${categorySubcategories.length}`);
        categorySubcategories.forEach(sub => {
          console.log(`      - ${sub.name}`);
        });
        
        // Check products for this category
        const categoryProducts = productsData.data.filter(product => {
          const productCategoryId = typeof product.categoryId === 'object' ? product.categoryId._id : product.categoryId;
          return productCategoryId === matchingCategory._id;
        });
        
        console.log(`   📦 Products: ${categoryProducts.length}`);
        
      } else {
        console.log(`   ⚠️  No matching category found - will show all products`);
      }
    }

    console.log('\n✅ Category page testing completed!');
    
  } catch (error) {
    console.error('❌ Error testing category pages:', error.message);
  }
}

// Run the test
testCategoryPages();