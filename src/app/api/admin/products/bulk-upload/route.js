import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';
import { uploadToR2 } from '@/lib/cloudflare-r2';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { readFile } from 'fs/promises';
import { join } from 'path';

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
 * Check if a string is a local file path
 */
function isLocalPath(str) {
  if (!str || typeof str !== 'string') return false;
  
  const localPathPatterns = [
    /^\.\//, // ./images/file.jpg
    /^\.\.\//, // ../images/file.jpg
    /^[A-Za-z]:\\/, // C:\images\file.jpg (Windows absolute)
    /^\/[^/]/, // /images/file.jpg (Unix absolute)
    /^images\//, // images/file.jpg (relative without ./)
  ];
  
  return localPathPatterns.some(pattern => pattern.test(str));
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
 * Upload local image file to R2
 */
async function uploadLocalImageToR2(imagePath, baseDir) {
  try {
    let fullPath = imagePath;
    
    // Handle relative paths
    if (imagePath.startsWith('./') || imagePath.startsWith('../')) {
      fullPath = join(baseDir, imagePath);
    } else if (!imagePath.match(/^[A-Za-z]:\\/)) {
      fullPath = join(baseDir, imagePath);
    }
    
    // Read file
    const fileBuffer = await readFile(fullPath);
    
    // Get file extension and name
    const fileName = imagePath.split(/[/\\]/).pop();
    const ext = fileName.split('.').pop().toLowerCase();
    
    // Determine content type
    const contentTypes = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'webp': 'image/webp',
      'gif': 'image/gif'
    };
    const contentType = contentTypes[ext] || 'image/jpeg';
    
    // Upload to R2
    const r2Url = await uploadToR2(fileBuffer, fileName, contentType);
    
    return { success: true, url: r2Url, originalPath: imagePath };
  } catch (error) {
    return { success: false, error: error.message, originalPath: imagePath };
  }
}

/**
 * Process image field - upload if local path, return if URL
 */
async function processImageField(imageField, baseDir) {
  if (!imageField) return '';
  
  if (isValidUrl(imageField)) {
    return imageField;
  }
  
  if (isLocalPath(imageField)) {
    const result = await uploadLocalImageToR2(imageField, baseDir);
    if (result.success) {
      return result.url;
    } else {
      throw new Error(`Failed to upload ${imageField}: ${result.error}`);
    }
  }
  
  return imageField;
}

/**
 * Process gallery images (comma-separated)
 */
async function processGalleryImages(galleryField, baseDir) {
  if (!galleryField) return [];
  
  const imagePaths = galleryField.split(',').map(path => path.trim()).filter(Boolean);
  const uploadedUrls = [];
  
  for (const imagePath of imagePaths) {
    try {
      const url = await processImageField(imagePath, baseDir);
      if (url) uploadedUrls.push(url);
    } catch (error) {
      console.error(`Error processing gallery image ${imagePath}:`, error);
    }
  }
  
  return uploadedUrls;
}

/**
 * POST /api/admin/products/bulk-upload
 * Bulk upload products from CSV or Excel file
 * Supports automatic image upload from local paths
 */
export async function POST(request) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const file = formData.get('file');
    const baseDir = formData.get('baseDir') || process.cwd();
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Read file content
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    let products = [];
    const fileName = file.name.toLowerCase();

    // Parse CSV
    if (fileName.endsWith('.csv')) {
      const text = buffer.toString('utf-8');
      const parsed = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
      });
      products = parsed.data;
    }
    // Parse Excel
    else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      products = XLSX.utils.sheet_to_json(worksheet);
    }
    else {
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

        // Find category by slug
        const category = await Category.findOne({ slug: row.categorySlug });
        if (!category) {
          throw new Error(`Category not found: ${row.categorySlug}`);
        }

        // Find subcategory by slug (if provided)
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
          results.imageUploads.total++;
          try {
            mainImageUrl = await processImageField(row.mainImage, baseDir);
            if (mainImageUrl) results.imageUploads.success++;
          } catch (error) {
            results.imageUploads.failed++;
            console.error(`Main image upload failed for row ${i + 1}:`, error);
          }
        }

        // Process gallery images
        let galleryUrls = [];
        if (row.galleryImages) {
          const galleryPaths = row.galleryImages.split(',').map(p => p.trim()).filter(Boolean);
          results.imageUploads.total += galleryPaths.length;
          
          try {
            galleryUrls = await processGalleryImages(row.galleryImages, baseDir);
            results.imageUploads.success += galleryUrls.length;
            results.imageUploads.failed += (galleryPaths.length - galleryUrls.length);
          } catch (error) {
            console.error(`Gallery images upload failed for row ${i + 1}:`, error);
          }
        }

        // Parse sizes (format: "S:10,M:20,L:15")
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

        // Generate style code if not provided
        const styleCode = row.styleCode || `AVT${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;
        
        // Generate SKU if not provided
        const colorCode = row.colorName ? row.colorName.substring(0, 3).toUpperCase() : 'DEF';
        const sku = row.sku || `${styleCode}-${colorCode}`;

        // Generate slug from product name if not provided
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

        // Create product object with ALL Product model fields
        const productData = {
          // Basic Info
          name: row.name.trim(),
          description: row.description.trim(),
          styleCode: styleCode.toUpperCase(),
          sku: sku.toUpperCase(),
          slug: productSlug,
          
          // Price
          priceRange: {
            min: parseFloat(row.priceMin) || 0,
            max: parseFloat(row.priceMax) || 0
          },
          
          // Images
          images: {
            main: mainImageUrl || row.mainImage || '',
            gallery: galleryUrls.length > 0 ? galleryUrls : []
          },
          
          // Sizes
          sizes: sizes,
          
          // Product Details
          productDetails: {
            material: row.material || 'Not specified',
            productCare: row.productCare || 'Dry clean recommended',
            additionalInfo: row.additionalInfo || ''
          },
          
          // Color
          color: {
            name: row.colorName || 'Default',
            code: row.colorCode || '#000000'
          },
          
          // Category & Subcategory
          categoryId: category._id,
          subcategoryId: subcategory ? subcategory._id : null,
          
          // Status Flags
          isActive: parseBoolean(row.isActive !== undefined ? row.isActive : true),
          isFeatured: parseBoolean(row.isFeatured),
          isNewArrival: parseBoolean(row.isNewArrival),
          
          // Tags
          tags: row.tags ? row.tags.split(',').map(tag => tag.trim()) : [],
          
          // Sort Order
          sortOrder: parseInt(row.sortOrder) || 0,
          
          // Total Stock (will be calculated by pre-save hook)
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
