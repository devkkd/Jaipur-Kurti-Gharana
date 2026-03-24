/**
 * One-time migration script to drop the stale `styleCode_1` unique index
 * from the MongoDB `products` collection.
 *
 * Run once:
 *   node scripts/drop-stylecode-index.js
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

async function main() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('products');

    // List current indexes
    const indexes = await collection.indexes();
    console.log('\nCurrent indexes on products collection:');
    indexes.forEach(idx => console.log(' -', idx.name, JSON.stringify(idx.key)));

    const staleIndex = indexes.find(idx => idx.name === 'styleCode_1');

    if (!staleIndex) {
      console.log('\n✅ No stale styleCode_1 index found — nothing to do.');
      return;
    }

    await collection.dropIndex('styleCode_1');
    console.log('\n✅ Successfully dropped styleCode_1 index.');

    // Verify
    const updatedIndexes = await collection.indexes();
    console.log('\nIndexes after cleanup:');
    updatedIndexes.forEach(idx => console.log(' -', idx.name, JSON.stringify(idx.key)));

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\nDone.');
  }
}

main();
