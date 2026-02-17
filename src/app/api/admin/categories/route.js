import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import { generateSlug } from '@/models/Category';

// GET - Get all categories
export async function GET() {
  try {
    await dbConnect();
    
    const categories = await Category.find({}).sort({ sortOrder: 1, name: 1 }).lean();
    
    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST - Create new category
export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { name, description = '', image = '', sortOrder = 0 } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Category name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = generateSlug(name);

    // Check if slug already exists
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return NextResponse.json(
        { error: 'A category with this name already exists' },
        { status: 400 }
      );
    }

    const categoryData = {
      name: name.trim(),
      slug,
      description: description.trim(),
      image: image || null,
      sortOrder: parseInt(sortOrder) || 0,
      isActive: true
    };

    const newCategory = await Category.create(categoryData);

    return NextResponse.json({
      success: true,
      data: newCategory,
      message: 'Category created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Create category error:', error);
    
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}