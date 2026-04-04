import { NextResponse } from 'next/server';
import { uploadToR2 } from '@/lib/cloudflare-r2';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const CONTENT_TYPES = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg',
  png: 'image/png', webp: 'image/webp', gif: 'image/gif'
};

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

// GET — list all previously uploaded product images from R2
export async function GET() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Prefix: 'products/',
      MaxKeys: 1000,
    });

    const response = await r2Client.send(command);
    const r2Base = process.env.CLOUDFLARE_R2_PUBLIC_URL;

    const images = (response.Contents || [])
      .filter(obj => obj.Key !== 'products/')
      .map(obj => {
        const filename = obj.Key.replace('products/', '');
        return {
          filename,
          url: `${r2Base}/${obj.Key}`,
          size: obj.Size,
          lastModified: obj.LastModified,
        };
      })
      .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error('R2 list error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST — upload new images to R2, returns { filename -> url } map
export async function POST(request) {
  try {
    const formData = await request.formData();
    const results = {};

    for (const [, file] of formData.entries()) {
      if (!(file instanceof Blob)) continue;
      const name = file.name;
      const ext = name.split('.').pop().toLowerCase();
      const contentType = CONTENT_TYPES[ext] || 'image/jpeg';
      const buffer = Buffer.from(await file.arrayBuffer());
      const url = await uploadToR2(buffer, name, contentType);
      results[name] = url;
    }

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
