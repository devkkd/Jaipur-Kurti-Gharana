// Migration script to add isViewed field to existing inquiries
// Run: node scripts/migrate-add-isviewed.js

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment variables');
  process.exit(1);
}

async function migrate() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;

    // Update CustomerInquiry collection
    console.log('📝 Updating CustomerInquiry collection...');
    const customerResult = await db.collection('customerinquiries').updateMany(
      { isViewed: { $exists: false } },
      { 
        $set: { 
          isViewed: false,
          firstViewedAt: null
        } 
      }
    );
    console.log(`✅ Updated ${customerResult.modifiedCount} customer inquiries\n`);

    // Update Inquiry collection
    console.log('📝 Updating Inquiry collection...');
    const inquiryResult = await db.collection('inquiries').updateMany(
      { isViewed: { $exists: false } },
      { 
        $set: { 
          isViewed: false,
          firstViewedAt: null
        } 
      }
    );
    console.log(`✅ Updated ${inquiryResult.modifiedCount} product inquiries\n`);

    console.log('🎉 Migration completed successfully!');
    console.log('\nSummary:');
    console.log(`- Customer Inquiries: ${customerResult.modifiedCount} updated`);
    console.log(`- Product Inquiries: ${inquiryResult.modifiedCount} updated`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
  }
}

migrate();
