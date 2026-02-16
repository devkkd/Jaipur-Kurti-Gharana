import { NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct, getAllCategories, getAllSubcategories } from '@/lib/database-adapter';
import { generateStyleCode } from '@/models/Product';

// Helper function to validate ID (for mock database compatibility)
function isValidId(id) {
  return id && typeof id === 'string' && id.length > 0;
}

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

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Get product using database adapter
    const product = await getProductById(id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get categories and subcategories for population
    const categories = await getAllCategories();
    const subcategories = await getAllSubcategories();

    // Populate category info
    if (product.categoryId) {
      const category = categories.find(cat => cat._id.toString() === product.categoryId.toString());
      if (category) {
        product.categoryId = {
          _id: category._id,
          name: category.name,
          slug: category.slug
        };
      }
    }

    // Populate subcategory info
    if (product.subcategoryId) {
      const subcategory = subcategories.find(sub => sub._id.toString() === product.subcategoryId.toString());
      if (subcategory) {
        product.subcategoryId = {
          _id: subcategory._id,
          name: subcategory.name,
          slug: subcategory.slug
        };
      }
    }

    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
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
      isFeatured,
      isActive,
      sortOrder
    } = body;

    console.log('PUT request received for product:', id);
    console.log('Request body:', JSON.stringify(body, null, 2));

    if (!isValidId(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const updateData = {};
    
    if (name !== undefined) {
      if (name.trim().length < 2) {
        return NextResponse.json(
          { error: 'Product name must be at least 2 characters long' },
          { status: 400 }
        );
      }
      updateData.name = name.trim();
      updateData.slug = generateSlug(name);
    }
    
    if (description !== undefined) {
      if (description.trim().length < 10) {
        return NextResponse.json(
          { error: 'Product description must be at least 10 characters long' },
          { status: 400 }
        );
      }
      updateData.description = description.trim();
    }
    
    if (styleCode !== undefined) updateData.styleCode = styleCode.trim().toUpperCase();
    if (sku !== undefined) updateData.sku = sku.trim().toUpperCase();
    if (sortOrder !== undefined) updateData.sortOrder = parseInt(sortOrder) || 0;
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);
    if (isFeatured !== undefined) updateData.isFeatured = Boolean(isFeatured);
    if (tags !== undefined) updateData.tags = tags;
    
    if (priceRange !== undefined) {
      if (!priceRange.min || !priceRange.max || priceRange.min < 0 || priceRange.max < priceRange.min) {
        return NextResponse.json(
          { error: 'Valid price range is required (min and max, with max >= min)' },
          { status: 400 }
        );
      }
      updateData.priceRange = {
        min: Number(priceRange.min),
        max: Number(priceRange.max)
      };
    }
    
    if (images !== undefined) {
      if (!images.main) {
        return NextResponse.json(
          { error: 'Main product image is required' },
          { status: 400 }
        );
      }
      updateData.images = {
        main: images.main.trim(),
        gallery: images.gallery || []
      };
    }
    
    if (sizes !== undefined) {
      if (!Array.isArray(sizes) || sizes.length === 0) {
        return NextResponse.json(
          { error: 'At least one size is required' },
          { status: 400 }
        );
      }
      updateData.sizes = sizes.map(size => ({
        size: size.size,
        available: size.available !== false,
        stock: Number(size.stock) || 0
      }));
    }
    
    if (productDetails !== undefined) {
      if (!productDetails.material || !productDetails.productCare) {
        return NextResponse.json(
          { error: 'Product details (material and product care) are required' },
          { status: 400 }
        );
      }
      updateData.productDetails = {
        material: productDetails.material.trim(),
        productCare: productDetails.productCare.trim(),
        additionalInfo: productDetails.additionalInfo ? productDetails.additionalInfo.trim() : ''
      };
    }
    
    if (color !== undefined) {
      if (!color.name) {
        return NextResponse.json(
          { error: 'Color name is required' },
          { status: 400 }
        );
      }
      updateData.color = {
        name: color.name.trim(),
        code: color.code ? color.code.trim() : ''
      };
    }
    
    if (categoryId !== undefined) {
      if (!isValidId(categoryId)) {
        console.log('Invalid category ID received:', categoryId);
        return NextResponse.json(
          { error: 'Invalid category ID' },
          { status: 400 }
        );
      }
      
      // Check if category exists
      const categories = await getAllCategories();
      console.log('Available categories for validation:', categories.map(c => ({ id: c._id.toString(), name: c.name })));
      console.log('Looking for categoryId:', categoryId);
      console.log('CategoryId type:', typeof categoryId);
      
      const category = categories.find(cat => cat._id.toString() === categoryId.toString());
      console.log('Category found:', category ? 'YES' : 'NO');
      
      if (!category) {
        console.log('Category not found. Available IDs:', categories.map(c => c._id.toString()));
        console.log('Requested ID:', categoryId);
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 400 }
        );
      }
      
      updateData.categoryId = categoryId;
    }
    
    if (subcategoryId !== undefined) {
      if (subcategoryId && !isValidId(subcategoryId)) {
        return NextResponse.json(
          { error: 'Invalid subcategory ID' },
          { status: 400 }
        );
      }
      
      if (subcategoryId) {
        // Check if subcategory exists
        const subcategories = await getAllSubcategories();
        const subcategory = subcategories.find(sub => sub._id.toString() === subcategoryId.toString());
        if (!subcategory) {
          return NextResponse.json(
            { error: 'Subcategory not found' },
            { status: 400 }
          );
        }
      }
      
      updateData.subcategoryId = subcategoryId || null;
    }

    // Update product using database adapter
    const updatedProduct = await updateProduct(id, updateData);

    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get categories and subcategories for population
    const categories = await getAllCategories();
    const subcategories = await getAllSubcategories();

    // Populate category info for response
    if (updatedProduct.categoryId) {
      const category = categories.find(cat => cat._id.toString() === updatedProduct.categoryId.toString());
      if (category) {
        updatedProduct.categoryId = {
          _id: category._id,
          name: category.name,
          slug: category.slug
        };
      }
    }

    // Populate subcategory info for response
    if (updatedProduct.subcategoryId) {
      const subcategory = subcategories.find(sub => sub._id.toString() === updatedProduct.subcategoryId.toString());
      if (subcategory) {
        updatedProduct.subcategoryId = {
          _id: subcategory._id,
          name: subcategory.name,
          slug: subcategory.slug
        };
      }
    }

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Delete product using database adapter (soft delete)
    const result = await deleteProduct(id);

    if (!result) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
