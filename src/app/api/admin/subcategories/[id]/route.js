import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subcategory from '@/models/Subcategory';
import Category from '@/models/Category';
import Product from '@/models/Product';
import { generateSlug } from '@/models/Subcategory';

// GET - Get subcategory by ID
export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = await params;

    const subcategory = await Subcategory.findById(id)
      .populate('categoryId', 'name slug isActive')
      .lean();
    
    if (!subcategory) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: subcategory
    });
  } catch (error) {
    console.error('Get subcategory error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subcategory' },
      { status: 500 }
    );
  }
}

// PUT - Update subcategory
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = await params;
    const body = await request.json();
    const { name, description, categoryId, sortOrder, isActive, image } = body;

    const updateData = {};
    
    if (name !== undefined) {
      if (name.trim().length < 2) {
        return NextResponse.json(
          { error: 'Subcategory name must be at least 2 characters long' },
          { status: 400 }
        );
      }
      updateData.name = name.trim();
      updateData.slug = generateSlug(name);
    }
    
    if (description !== undefined) updateData.description = description.trim();
    if (sortOrder !== undefined) updateData.sortOrder = parseInt(sortOrder) || 0;
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);
    if (image !== undefined) updateData.image = image ? image.trim() : '';
    
    if (categoryId !== undefined) {
      // Check if category exists
      const category = await Category.findById(categoryId);
      if (!category) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 400 }
        );
      }
      updateData.categoryId = categoryId;
    }

    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('categoryId', 'name slug isActive').lean();

    if (!updatedSubcategory) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedSubcategory,
      message: 'Subcategory updated successfully'
    });

  } catch (error) {
    console.error('Update subcategory error:', error);
    return NextResponse.json(
      { error: 'Failed to update subcategory' },
      { status: 500 }
    );
  }
}

// DELETE - Delete subcategory (hard delete)
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = await params;

    // Check if subcategory exists
    const subcategory = await Subcategory.findById(id);
    if (!subcategory) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    // Check if there are products under this subcategory
    const productsCount = await Product.countDocuments({ subcategoryId: id });
    if (productsCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete subcategory. It has ${productsCount} products. Please delete them first.` },
        { status: 400 }
      );
    }

    // Hard delete the subcategory
    await Subcategory.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Subcategory deleted successfully'
    });

  } catch (error) {
    console.error('Delete subcategory error:', error);
    return NextResponse.json(
      { error: 'Failed to delete subcategory' },
      { status: 500 }
    );
  }
}