import { S3Client, ListBucketsCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env.local') });

console.log('🔍 Testing Cloudflare R2 Connection...\n');

// Check environment variables
const requiredEnvVars = [
  'CLOUDFLARE_R2_ACCOUNT_ID',
  'CLOUDFLARE_R2_ACCESS_KEY_ID',
  'CLOUDFLARE_R2_SECRET_ACCESS_KEY',
  'CLOUDFLARE_R2_BUCKET_NAME'
];

let missingVars = [];
for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    missingVars.push(varName);
  }
}

if (missingVars.length > 0) {
  console.error('❌ Missing environment variables:');
  missingVars.forEach(v => console.error(`   - ${v}`));
  console.error('\n📝 Please update your .env.local file with Cloudflare R2 credentials');
  process.exit(1);
}

console.log('✅ All environment variables found\n');

// Create R2 client
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

async function testConnection() {
  try {
    // Test 1: List buckets
    console.log('📋 Test 1: Listing buckets...');
    const listCommand = new ListBucketsCommand({});
    const buckets = await r2Client.send(listCommand);
    console.log('✅ Successfully connected to R2');
    console.log(`   Found ${buckets.Buckets?.length || 0} bucket(s)`);
    
    if (buckets.Buckets && buckets.Buckets.length > 0) {
      buckets.Buckets.forEach(bucket => {
        console.log(`   - ${bucket.Name}`);
      });
    }
    console.log();

    // Test 2: Upload a test file
    console.log('📤 Test 2: Uploading test file...');
    const testContent = `Test upload at ${new Date().toISOString()}`;
    const testKey = `test/connection-test-${Date.now()}.txt`;
    
    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: testKey,
      Body: Buffer.from(testContent),
      ContentType: 'text/plain',
    });

    await r2Client.send(uploadCommand);
    console.log('✅ Test file uploaded successfully');
    console.log(`   Key: ${testKey}`);
    console.log(`   URL: ${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${testKey}`);
    console.log();

    console.log('🎉 All tests passed! R2 is configured correctly.\n');
    console.log('📝 Next steps:');
    console.log('   1. Make sure your bucket has public access enabled');
    console.log('   2. Verify the public URL in your browser');
    console.log('   3. Start uploading products!\n');

  } catch (error) {
    console.error('❌ Connection test failed:');
    console.error(`   Error: ${error.message}`);
    console.error('\n🔧 Troubleshooting:');
    console.error('   1. Verify your Account ID is correct');
    console.error('   2. Check Access Key ID and Secret Access Key');
    console.error('   3. Ensure the bucket name exists');
    console.error('   4. Verify API token has correct permissions\n');
    process.exit(1);
  }
}

testConnection();
