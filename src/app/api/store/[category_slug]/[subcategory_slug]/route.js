import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';
import Product from '@/models/Product';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const { category_slug, subcategory_slug } = await params;

    // Find category by slug
    const category = await Category.findOne({ 
      slug: category_slug, 
      isActive: true 
    }).lean();

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // Find subcategory by slug and category
    const subcategory = await Subcategory.findOne({ 
      slug: subcategory_slug,
      categoryId: category._id,
      isActive: true 
    }).lean();

    if (!subcategory) {
      return NextResponse.json(
        { success: false, error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    // Find all products for this subcategory
    const products = await Product.find({ 
      categoryId: category._id,
      subcategoryId: subcategory._id,
      isActive: true 
    })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: {
        category: {
          _id: category._id.toString(),
          name: category.name,
          slug: category.slug,
          description: category.description
        },
        subcategory: {
          _id: subcategory._id.toString(),
          name: subcategory.name,
          slug: subcategory.slug,
          description: subcategory.description,
          image: subcategory.image,
          categoryId: subcategory.categoryId.toString()
        },
        products: products.map(product => ({
          _id: product._id.toString(),
          name: product.name,
          slug: product.slug,
          styleCode: product.styleCode,
          sku: product.sku,
          description: product.description,
          categoryId: product.categoryId.toString(),
          subcategoryId: product.subcategoryId.toString(),
          images: product.images,
          priceRange: product.priceRange,
          sizes: product.sizes,
          colors: product.colors,
          fabric: product.fabric,
          tags: product.tags,
          isFeatured: product.isFeatured,
          isActive: product.isActive,
          sortOrder: product.sortOrder
        }))
      }
    });

  } catch (error) {
    console.error('Error fetching subcategory data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subcategory data' },
      { status: 500 }
    );
  }
}
