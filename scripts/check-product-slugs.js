import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function checkProductSlugs() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('avanta-web');
    const products = await db.collection('products').find({}).limit(5).toArray();
    
    console.log('\n📦 Sample Products:');
    products.forEach((product, index) => {
      console.log(`\n${index + 1}. ${product.name}`);
      console.log(`   Slug: ${product.slug || 'NO SLUG'}`);
      console.log(`   ID: ${product._id}`);
    });
    
    const productsWithoutSlug = await db.collection('products').countDocuments({ slug: { $exists: false } });
    console.log(`\n⚠️  Products without slug: ${productsWithoutSlug}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

checkProductSlugs();
