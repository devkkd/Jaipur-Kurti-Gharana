import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product, { generateStyleCode } from '@/models/Product';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';

// Helper function to generate slug
function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const subcategoryId = searchParams.get('subcategoryId');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit')) || 20;
    const page = parseInt(searchParams.get('page')) || 1;
    
    // Build query
    let query = { isActive: true };
    
    if (categoryId) query.categoryId = categoryId;
    if (subcategoryId) query.subcategoryId = subcategoryId;
    if (featured === 'true') query.isFeatured = true;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { styleCode: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Get total count
    const total = await Product.countDocuments(query);
    
    // Get products with pagination
    const products = await Product.find(query)
      .populate('categoryId', 'name slug')
      .populate('subcategoryId', 'name slug')
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    
    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { 
      name, 
      description, 
      styleCode, 
      sku,
      priceRange, 
      images, 
      sizes, 
      productDetails, 
      color,
      categoryId, 
      subcategoryId,
      tags,
      isFeatured = false,
      isNewArrival = false,
      sortOrder = 0
    } = body;

    // Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Product name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    if (!description || description.trim().length < 10) {
      return NextResponse.json(
        { error: 'Product description must be at least 10 characters long' },
        { status: 400 }
      );
    }

    if (!categoryId) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    if (!priceRange || !priceRange.min || !priceRange.max || priceRange.min < 0 || priceRange.max < priceRange.min) {
      return NextResponse.json(
        { error: 'Valid price range is required (min and max, with max >= min)' },
        { status: 400 }
      );
    }

    if (!images || !images.main) {
      return NextResponse.json(
        { error: 'Main product image is required' },
        { status: 400 }
      );
    }

    if (!sizes || !Array.isArray(sizes) || sizes.length === 0) {
      return NextResponse.json(
        { error: 'At least one size is required' },
        { status: 400 }
      );
    }

    if (!productDetails || !productDetails.material || !productDetails.productCare) {
      return NextResponse.json(
        { error: 'Product details (material and product care) are required' },
        { status: 400 }
      );
    }

    if (!color || !color.name) {
      return NextResponse.json(
        { error: 'Color information is required' },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 400 }
      );
    }

    // Check if subcategory exists (if provided)
    if (subcategoryId) {
      const subcategory = await Subcategory.findById(subcategoryId);
      if (!subcategory) {
        return NextResponse.json(
          { error: 'Subcategory not found' },
          { status: 400 }
        );
      }
    }

    // Generate slug from name
    const slug = generateSlug(name);

    // Generate style code if not provided
    const finalStyleCode = styleCode || generateStyleCode();

    // Generate SKU if not provided
    const colorCode = color.name.substring(0, 3).toUpperCase();
    const finalSku = sku || `${finalStyleCode}-${colorCode}`;

    const productData = {
      name: name.trim(),
      description: description.trim(),
      styleCode: finalStyleCode,
      sku: finalSku,
      priceRange: {
        min: Number(priceRange.min),
        max: Number(priceRange.max)
      },
      images: {
        main: images.main.trim(),
        gallery: images.gallery || []
      },
      sizes: sizes.map(size => ({
        size: size.size,
        available: size.available !== false,
        stock: Number(size.stock) || 0
      })),
      productDetails: {
        material: productDetails.material.trim(),
        productCare: productDetails.productCare.trim(),
        additionalInfo: productDetails.additionalInfo ? productDetails.additionalInfo.trim() : ''
      },
      color: {
        name: color.name.trim(),
        code: color.code ? color.code.trim() : ''
      },
      slug,
      categoryId,
      subcategoryId: subcategoryId || null,
      tags: tags || [],
      isFeatured: Boolean(isFeatured),
      isNewArrival: Boolean(isNewArrival),
      sortOrder: Number(sortOrder) || 0,
      isActive: true
    };

    // Create product
    const newProduct = await Product.create(productData);
    
    // Populate category and subcategory
    await newProduct.populate('categoryId', 'name slug');
    if (newProduct.subcategoryId) {
      await newProduct.populate('subcategoryId', 'name slug');
    }

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: 'Product created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Create product error:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { error: `A product with this ${field} already exists` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
