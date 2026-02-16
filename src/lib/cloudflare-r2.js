import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

// Cloudflare R2 client configuration
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

/**
 * Upload image to Cloudflare R2
 * @param {Buffer} fileBuffer - Image buffer
 * @param {string} fileName - File name
 * @param {string} contentType - MIME type
 * @returns {Promise<string>} - Public URL of uploaded image
 */
export async function uploadToR2(fileBuffer, fileName, contentType = 'image/jpeg') {
  try {
    const key = `products/${Date.now()}-${fileName}`;
    
    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: contentType,
    });

    await r2Client.send(command);
    
    // Return public URL
    const publicUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`;
    return publicUrl;
  } catch (error) {
    console.error('R2 Upload Error:', error);
    throw new Error(`Failed to upload to R2: ${error.message}`);
  }
}

/**
 * Delete image from Cloudflare R2
 * @param {string} imageUrl - Full URL of the image
 * @returns {Promise<boolean>}
 */
export async function deleteFromR2(imageUrl) {
  try {
    // Extract key from URL
    const key = imageUrl.replace(`${process.env.CLOUDFLARE_R2_PUBLIC_URL}/`, '');
    
    const command = new DeleteObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: key,
    });

    await r2Client.send(command);
    return true;
  } catch (error) {
    console.error('R2 Delete Error:', error);
    return false;
  }
}

/**
 * Upload multiple images to R2
 * @param {Array<{buffer: Buffer, fileName: string, contentType: string}>} files
 * @returns {Promise<Array<string>>} - Array of public URLs
 */
export async function uploadMultipleToR2(files) {
  try {
    const uploadPromises = files.map(file => 
      uploadToR2(file.buffer, file.fileName, file.contentType)
    );
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Multiple R2 Upload Error:', error);
    throw new Error(`Failed to upload multiple files: ${error.message}`);
  }
}
