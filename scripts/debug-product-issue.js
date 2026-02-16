import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function debugProductIssue() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');
    
    const db = client.db('avanta-web');
    
    // Get all products
    const products = await db.collection('products').find({}).toArray();
    
    console.log(`📦 Total Products: ${products.length}\n`);
    
    // Check for "product-name" slug
    const productNameSlug = products.filter(p => p.slug === 'product-name');
    
    if (productNameSlug.length > 0) {
      console.log('⚠️  Found products with slug "product-name":');
      productNameSlug.forEach(p => {
        console.log(`   - Name: "${p.name}"`);
        console.log(`     Slug: "${p.slug}"`);
        console.log(`     ID: ${p._id}\n`);
      });
    }
    
    // Check for products with name "Product Name"
    const productNameProducts = products.filter(p => 
      p.name.toLowerCase().includes('product name') || 
      p.name.toLowerCase() === 'product name'
    );
    
    if (productNameProducts.length > 0) {
      console.log('⚠️  Found products with name containing "Product Name":');
      productNameProducts.forEach(p => {
        console.log(`   - Name: "${p.name}"`);
        console.log(`     Slug: "${p.slug}"`);
        console.log(`     ID: ${p._id}\n`);
      });
    }
    
    // Show all products
    console.log('📋 All Products:');
    products.forEach((p, index) => {
      console.log(`${index + 1}. "${p.name}"`);
      console.log(`   Slug: "${p.slug}"`);
      console.log(`   Active: ${p.isActive}`);
      console.log(`   Category: ${p.categoryId}`);
      console.log('');
    });
    
    // Test slug lookup
    console.log('🔍 Testing slug lookup for "product-name":');
    const testProduct = await db.collection('products').findOne({ 
      slug: 'product-name',
      isActive: true 
    });
    
    if (testProduct) {
      console.log('✅ Found product:');
      console.log(`   Name: ${testProduct.name}`);
      console.log(`   Slug: ${testProduct.slug}`);
    } else {
      console.log('❌ No product found with slug "product-name"');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

debugProductIssue();
