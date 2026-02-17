// Test script for notification system
// Run: node scripts/test-notifications.js

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

async function testNotifications() {
  console.log('🔔 Testing Notification System...\n');

  try {
    // Test 1: Fetch notifications
    console.log('1️⃣ Testing GET /api/admin/notifications');
    const response = await fetch(`${BASE_URL}/api/admin/notifications`);
    const result = await response.json();

    if (result.success) {
      console.log('✅ Notifications fetched successfully');
      console.log(`   Total: ${result.counts.total}`);
      console.log(`   Customer Inquiries: ${result.counts.customerInquiries}`);
      console.log(`   Product Inquiries: ${result.counts.productInquiries}`);
      console.log(`   Notifications: ${result.data.length}`);
      
      if (result.data.length > 0) {
        console.log('\n📋 Sample Notification:');
        const sample = result.data[0];
        console.log(`   Type: ${sample.type}`);
        console.log(`   Title: ${sample.title}`);
        console.log(`   Message: ${sample.message}`);
        console.log(`   Link: ${sample.link}`);
      }
    } else {
      console.log('❌ Failed to fetch notifications');
      console.log(`   Error: ${result.error}`);
    }

    console.log('\n✅ All tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run tests
testNotifications();
