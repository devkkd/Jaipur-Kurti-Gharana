import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';
import { uploadToR2 } from '@/lib/cloudflare-r2';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

/**
 * Generate slug from product name
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Check if string is a valid URL
 */
function isValidUrl(str) {
  if (!str || typeof str !== 'string') return false;
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * POST /api/admin/products/bulk-upload-with-images
 * Bulk upload products with images from form data
 */
export async function POST(request) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Get all uploaded images from form data
    const uploadedImages = {};
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('image_')) {
        uploadedImages[key] = value;
      }
    }

    // Read CSV/Excel file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    let products = [];
    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.csv')) {
      const text = buffer.toString('utf-8');
      const parsed = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
      });
      products = parsed.data;
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      products = XLSX.utils.sheet_to_json(worksheet);
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid file format. Only CSV and Excel files are supported.' },
        { status: 400 }
      );
    }

    if (!products || products.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No products found in file' },
        { status: 400 }
      );
    }

    const results = {
      total: products.length,
      success: 0,
      failed: 0,
      errors: [],
      imageUploads: {
        total: 0,
        success: 0,
        failed: 0
      }
    };

    // Process each product
    for (let i = 0; i < products.length; i++) {
      const row = products[i];
      
      try {
        // Validate required fields
        if (!row.name || !row.description || !row.categorySlug) {
          throw new Error('Missing required fields: name, description, or categorySlug');
        }

        // Find category
        const category = await Category.findOne({ slug: row.categorySlug });
        if (!category) {
          throw new Error(`Category not found: ${row.categorySlug}`);
        }

        // Find subcategory (if provided)
        let subcategory = null;
        if (row.subcategorySlug) {
          subcategory = await Subcategory.findOne({ 
            slug: row.subcategorySlug,
            categoryId: category._id 
          });
          if (!subcategory) {
            throw new Error(`Subcategory not found: ${row.subcategorySlug}`);
          }
        }

        // Process main image
        let mainImageUrl = '';
        if (row.mainImage) {
          if (isValidUrl(row.mainImage)) {
            mainImageUrl = row.mainImage;
          } else {
            // Check if image was uploaded in form data
            const imageKey = `image_${i}_main`;
            if (uploadedImages[imageKey]) {
              results.imageUploads.total++;
              try {
                const imageFile = uploadedImages[imageKey];
                const imageBytes = await imageFile.arrayBuffer();
                const imageBuffer = Buffer.from(imageBytes);
                mainImageUrl = await uploadToR2(imageBuffer, imageFile.name, imageFile.type);
                results.imageUploads.success++;
              } catch (error) {
                results.imageUploads.failed++;
                console.error(`Main image upload failed for row ${i + 1}:`, error);
              }
            }
          }
        }

        // Process gallery images
        let galleryUrls = [];
        if (row.galleryImages) {
          const galleryPaths = row.galleryImages.split(',').map(p => p.trim()).filter(Boolean);
          
          for (let j = 0; j < galleryPaths.length; j++) {
            const galleryPath = galleryPaths[j];
            
            if (isValidUrl(galleryPath)) {
              galleryUrls.push(galleryPath);
            } else {
              const imageKey = `image_${i}_gallery_${j}`;
              if (uploadedImages[imageKey]) {
                results.imageUploads.total++;
                try {
                  const imageFile = uploadedImages[imageKey];
                  const imageBytes = await imageFile.arrayBuffer();
                  const imageBuffer = Buffer.from(imageBytes);
                  const url = await uploadToR2(imageBuffer, imageFile.name, imageFile.type);
                  galleryUrls.push(url);
                  results.imageUploads.success++;
                } catch (error) {
                  results.imageUploads.failed++;
                  console.error(`Gallery image upload failed for row ${i + 1}:`, error);
                }
              }
            }
          }
        }

        // Parse sizes
        let sizes = [];
        if (row.sizes) {
          if (typeof row.sizes === 'string') {
            const sizePairs = row.sizes.split(',');
            sizes = sizePairs.map(pair => {
              const [size, stock] = pair.split(':');
              return {
                size: size.trim().toUpperCase(),
                stock: parseInt(stock) || 0,
                available: true
              };
            });
          }
        }

        // Generate codes
        const styleCode = row.styleCode || `AVT${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;
        const colorCode = row.colorName ? row.colorName.substring(0, 3).toUpperCase() : 'DEF';
        const sku = row.sku || `${styleCode}-${colorCode}`;
        const productSlug = row.slug || generateSlug(row.name);

        // Parse boolean values
        const parseBoolean = (value) => {
          if (typeof value === 'boolean') return value;
          if (typeof value === 'string') {
            const lower = value.toLowerCase().trim();
            return lower === 'true' || lower === '1' || lower === 'yes';
          }
          return false;
        };

        // Create product object
        const productData = {
          name: row.name.trim(),
          description: row.description.trim(),
          styleCode: styleCode.toUpperCase(),
          sku: sku.toUpperCase(),
          slug: productSlug,
          priceRange: {
            min: parseFloat(row.priceMin) || 0,
            max: parseFloat(row.priceMax) || 0
          },
          images: {
            main: mainImageUrl || '',
            gallery: galleryUrls
          },
          sizes: sizes,
          productDetails: {
            material: row.material || 'Not specified',
            productCare: row.productCare || 'Dry clean recommended',
            additionalInfo: row.additionalInfo || ''
          },
          color: {
            name: row.colorName || 'Default',
            code: row.colorCode || '#000000'
          },
          categoryId: category._id,
          subcategoryId: subcategory ? subcategory._id : null,
          isActive: parseBoolean(row.isActive !== undefined ? row.isActive : true),
          isFeatured: parseBoolean(row.isFeatured),
          isNewArrival: parseBoolean(row.isNewArrival),
          tags: row.tags ? row.tags.split(',').map(tag => tag.trim()) : [],
          sortOrder: parseInt(row.sortOrder) || 0,
          totalStock: 0
        };

        // Create or update product
        const existingProduct = await Product.findOne({ sku: productData.sku });
        
        if (existingProduct) {
          await Product.findByIdAndUpdate(existingProduct._id, productData);
        } else {
          await Product.create(productData);
        }

        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push({
          row: i + 1,
          data: row.name || 'Unknown',
          error: error.message
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Bulk upload completed. Products: ${results.success} success, ${results.failed} failed. Images: ${results.imageUploads.success}/${results.imageUploads.total} uploaded.`,
      results
    });

  } catch (error) {
    console.error('Bulk Upload Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
