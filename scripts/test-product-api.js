import fetch from 'node-fetch';

async function testProductAPI() {
  try {
    console.log('Testing Store API...\n');
    
    // Test 1: Get products from a category
    const response = await fetch('http://localhost:3000/api/store/suits-set');
    const result = await response.json();
    
    if (result.success && result.data.products.length > 0) {
      console.log('✅ Store API working');
      console.log(`📦 Found ${result.data.products.length} products\n`);
      
      const firstProduct = result.data.products[0];
      console.log('First Product:');
      console.log('  Name:', firstProduct.name);
      console.log('  Slug:', firstProduct.slug);
      console.log('  ID:', firstProduct._id);
      console.log('  Has images:', !!firstProduct.images);
      console.log('  Has priceRange:', !!firstProduct.priceRange);
      
      // Test 2: Try to fetch this product by slug
      if (firstProduct.slug) {
        console.log(`\n🔍 Testing product detail API with slug: ${firstProduct.slug}`);
        const productResponse = await fetch(`http://localhost:3000/api/products/slug/${firstProduct.slug}`);
        const productResult = await productResponse.json();
        
        if (productResult.success) {
          console.log('✅ Product detail API working');
          console.log('  Product found:', productResult.data.name);
        } else {
          console.log('❌ Product detail API failed:', productResult.error);
        }
      }
    } else {
      console.log('❌ No products found or API error');
      console.log('Response:', result);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n⚠️  Make sure dev server is running: npm run dev');
  }
}

testProductAPI();
