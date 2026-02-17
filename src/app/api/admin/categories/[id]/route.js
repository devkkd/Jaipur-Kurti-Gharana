import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';
import Product from '@/models/Product';
import { generateSlug } from '@/models/Category';

// GET - Get category by ID
export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = await params;

    const category = await Category.findById(id).lean();
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Get category error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// PUT - Update category
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = await params;
    const body = await request.json();
    const { name, description, image, sortOrder, isActive } = body;

    const updateData = {};
    
    if (name !== undefined) {
      if (name.trim().length < 2) {
        return NextResponse.json(
          { error: 'Category name must be at least 2 characters long' },
          { status: 400 }
        );
      }
      updateData.name = name.trim();
      updateData.slug = generateSlug(name);
    }
    
    if (description !== undefined) updateData.description = description.trim();
    if (image !== undefined) updateData.image = image || null;
    if (sortOrder !== undefined) updateData.sortOrder = parseInt(sortOrder) || 0;
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedCategory,
      message: 'Category updated successfully'
    });

  } catch (error) {
    console.error('Update category error:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE - Delete category (hard delete)
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = await params;

    // Check if category exists
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check if there are subcategories under this category
    const subcategoriesCount = await Subcategory.countDocuments({ categoryId: id });
    if (subcategoriesCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete category. It has ${subcategoriesCount} subcategories. Please delete them first.` },
        { status: 400 }
      );
    }

    // Check if there are products under this category
    const productsCount = await Product.countDocuments({ categoryId: id });
    if (productsCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete category. It has ${productsCount} products. Please delete them first.` },
        { status: 400 }
      );
    }

    // Hard delete the category
    await Category.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error('Delete category error:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}