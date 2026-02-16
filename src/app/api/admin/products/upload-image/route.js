import { NextResponse } from 'next/server';
import { uploadToR2, uploadMultipleToR2 } from '@/lib/cloudflare-r2';

/**
 * POST /api/admin/products/upload-image
 * Upload single or multiple images to Cloudflare R2
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images');
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No images uploaded' },
        { status: 400 }
      );
    }

    // Prepare files for upload
    const filesToUpload = [];
    
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      filesToUpload.push({
        buffer,
        fileName: file.name,
        contentType: file.type || 'image/jpeg'
      });
    }

    // Upload to R2
    let urls;
    if (filesToUpload.length === 1) {
      const url = await uploadToR2(
        filesToUpload[0].buffer,
        filesToUpload[0].fileName,
        filesToUpload[0].contentType
      );
      urls = [url];
    } else {
      urls = await uploadMultipleToR2(filesToUpload);
    }

    return NextResponse.json({
      success: true,
      urls,
      message: `Successfully uploaded ${urls.length} image(s)`
    });

  } catch (error) {
    console.error('Image Upload Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
