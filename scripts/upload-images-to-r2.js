import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readdir, readFile } from 'fs/promises';
import { join, extname, basename } from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env.local') });

// Cloudflare R2 client
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

// Supported image formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// MIME type mapping
const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif'
};

/**
 * Upload single image to R2
 */
async function uploadImage(filePath, fileName) {
  try {
    const fileBuffer = await readFile(filePath);
    const ext = extname(fileName).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'image/jpeg';
    
    const key = `products/${Date.now()}-${fileName}`;
    
    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: contentType,
    });

    await r2Client.send(command);
    
    const publicUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`;
    return { success: true, url: publicUrl, fileName };
  } catch (error) {
    return { success: false, error: error.message, fileName };
  }
}

/**
 * Get all image files from directory
 */
async function getImageFiles(dirPath) {
  try {
    const files = await readdir(dirPath);
    return files.filter(file => {
      const ext = extname(file).toLowerCase();
      return SUPPORTED_FORMATS.includes(ext);
    });
  } catch (error) {
    console.error(`Error reading directory: ${error.message}`);
    return [];
  }
}

/**
 * Main upload function
 */
async function uploadImagesFromFolder(folderPath) {
  console.log('🚀 Starting Image Upload to Cloudflare R2...\n');
  
  // Validate environment variables
  if (!process.env.CLOUDFLARE_R2_ACCOUNT_ID || 
      !process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || 
      !process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ||
      !process.env.CLOUDFLARE_R2_BUCKET_NAME ||
      !process.env.CLOUDFLARE_R2_PUBLIC_URL) {
    console.error('❌ Missing Cloudflare R2 credentials in .env.local');
    console.error('Please check CLOUDFLARE_R2_SETUP.md for setup instructions\n');
    process.exit(1);
  }

  console.log(`📁 Scanning folder: ${folderPath}\n`);
  
  // Get all image files
  const imageFiles = await getImageFiles(folderPath);
  
  if (imageFiles.length === 0) {
    console.log('⚠️  No image files found in the specified folder');
    console.log(`Supported formats: ${SUPPORTED_FORMATS.join(', ')}\n`);
    return;
  }

  console.log(`📸 Found ${imageFiles.length} image(s)\n`);
  
  const results = {
    total: imageFiles.length,
    success: 0,
    failed: 0,
    urls: []
  };

  // Upload each image
  for (let i = 0; i < imageFiles.length; i++) {
    const fileName = imageFiles[i];
    const filePath = join(folderPath, fileName);
    
    process.stdout.write(`[${i + 1}/${imageFiles.length}] Uploading ${fileName}... `);
    
    const result = await uploadImage(filePath, fileName);
    
    if (result.success) {
      console.log('✅');
      results.success++;
      results.urls.push({
        fileName: result.fileName,
        url: result.url
      });
    } else {
      console.log(`❌ (${result.error})`);
      results.failed++;
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Upload Summary');
  console.log('='.repeat(60));
  console.log(`Total Images: ${results.total}`);
  console.log(`✅ Successful: ${results.success}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log('='.repeat(60) + '\n');

  // Print URLs
  if (results.urls.length > 0) {
    console.log('🔗 Uploaded Image URLs:\n');
    results.urls.forEach((item, index) => {
      console.log(`${index + 1}. ${item.fileName}`);
      console.log(`   ${item.url}\n`);
    });

    // Generate CSV content
    console.log('📝 CSV Format (copy-paste ready):\n');
    console.log('fileName,imageUrl');
    results.urls.forEach(item => {
      console.log(`"${item.fileName}","${item.url}"`);
    });
    console.log();
  }

  console.log('✨ Upload complete!\n');
}

// Get folder path from command line argument
const folderPath = process.argv[2];

if (!folderPath) {
  console.log('Usage: node upload-images-to-r2.js <folder-path>');
  console.log('\nExample:');
  console.log('  node scripts/upload-images-to-r2.js ./product-images');
  console.log('  node scripts/upload-images-to-r2.js D:\\Images\\Products\n');
  process.exit(1);
}

// Run upload
uploadImagesFromFolder(folderPath);
