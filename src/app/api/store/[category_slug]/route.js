import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';
import Product from '@/models/Product';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const { category_slug } = await params;

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

    // Find all subcategories for this category
    const subcategories = await Subcategory.find({ 
      categoryId: category._id,
      isActive: true 
    })
      .sort({ sortOrder: 1, name: 1 })
      .lean();

    // Find all products for this category
    const products = await Product.find({ 
      categoryId: category._id,
      isActive: true 
    })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    // Count products per subcategory
    const productCountBySubcategory = {};
    products.forEach(product => {
      if (product.subcategoryId) {
        const subId = product.subcategoryId.toString();
        productCountBySubcategory[subId] = (productCountBySubcategory[subId] || 0) + 1;
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        category: {
          _id: category._id.toString(),
          name: category.name,
          slug: category.slug,
          description: category.description,
          sortOrder: category.sortOrder
        },
        subcategories: subcategories.map(sub => ({
          _id: sub._id.toString(),
          name: sub.name,
          slug: sub.slug,
          description: sub.description,
          image: sub.image,
          categoryId: sub.categoryId.toString(),
          sortOrder: sub.sortOrder,
          productCount: productCountBySubcategory[sub._id.toString()] || 0
        })),
        products: products.map(product => ({
          _id: product._id.toString(),
          name: product.name,
          slug: product.slug,
          styleCode: product.styleCode,
          sku: product.sku,
          description: product.description,
          categoryId: product.categoryId.toString(),
          subcategoryId: product.subcategoryId ? product.subcategoryId.toString() : null,
          images: product.images,
          priceRange: product.priceRange,
          sizes: product.sizes,
          colors: product.colors,
          fabric: product.fabric,
          tags: product.tags,
          isFeatured: product.isFeatured,
          isNewArrival: product.isNewArrival,
          isActive: product.isActive,
          sortOrder: product.sortOrder
        }))
      }
    });

  } catch (error) {
    console.error('Error fetching category data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch category data' },
      { status: 500 }
    );
  }
}
