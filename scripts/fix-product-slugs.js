import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function fixProductSlugs() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('avanta-web');
    const products = await db.collection('products').find({}).toArray();
    
    console.log(`\n📦 Found ${products.length} products`);
    
    let updated = 0;
    let skipped = 0;
    
    for (const product of products) {
      const currentSlug = product.slug;
      const expectedSlug = generateSlug(product.name);
      
      // Check if slug needs update
      if (!currentSlug || currentSlug === 'product-name' || currentSlug !== expectedSlug) {
        console.log(`\n🔄 Updating: ${product.name}`);
        console.log(`   Old slug: ${currentSlug || 'NONE'}`);
        console.log(`   New slug: ${expectedSlug}`);
        
        await db.collection('products').updateOne(
          { _id: product._id },
          { $set: { slug: expectedSlug } }
        );
        
        updated++;
      } else {
        skipped++;
      }
    }
    
    console.log(`\n✅ Updated: ${updated} products`);
    console.log(`⏭️  Skipped: ${skipped} products (already correct)`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

fixProductSlugs();
