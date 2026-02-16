import { NextResponse } from 'next/server';
import { uploadToCloudinary, uploadMultipleToCloudinary } from '@/lib/cloudinary';

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type');

    // Handle FormData (from CloudinaryUpload component)
    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file');
      const folder = formData.get('folder') || 'avanta-products';

      if (!file) {
        return NextResponse.json(
          { success: false, error: 'No file provided' },
          { status: 400 }
        );
      }

      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Convert to base64
      const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

      // Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(base64, folder);

      return NextResponse.json({
        success: true,
        url: imageUrl
      });
    }

    // Handle JSON (for programmatic uploads)
    const body = await request.json();
    const { image, images, folder } = body;

    // Single image upload
    if (image) {
      const imageUrl = await uploadToCloudinary(image, folder);
      return NextResponse.json({
        success: true,
        data: { url: imageUrl }
      });
    }

    // Multiple images upload
    if (images && Array.isArray(images)) {
      const imageUrls = await uploadMultipleToCloudinary(images, folder);
      return NextResponse.json({
        success: true,
        data: { urls: imageUrls }
      });
    }

    return NextResponse.json(
      { success: false, error: 'No image data provided' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}
