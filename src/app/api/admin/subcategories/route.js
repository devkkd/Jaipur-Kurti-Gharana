import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subcategory from '@/models/Subcategory';
import Category from '@/models/Category';
import { generateSlug } from '@/models/Subcategory';

// GET - Get all subcategories
export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    
    let query = {};
    if (categoryId) {
      query.categoryId = categoryId;
    }
    
    const subcategories = await Subcategory.find(query)
      .sort({ sortOrder: 1, name: 1 })
      .populate('categoryId', 'name slug isActive')
      .lean();
    
    return NextResponse.json({
      success: true,
      data: subcategories
    });
  } catch (error) {
    console.error('Get subcategories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subcategories' },
      { status: 500 }
    );
  }
}

// POST - Create new subcategory
export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { name, description = '', categoryId, sortOrder = 0, image = '' } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Subcategory name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    if (!categoryId) {
      return NextResponse.json(
        { error: 'Category ID is required' },
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

    // Generate slug from name
    const slug = generateSlug(name);

    // Check if slug already exists
    const existingSubcategory = await Subcategory.findOne({ slug });
    if (existingSubcategory) {
      return NextResponse.json(
        { error: 'A subcategory with this name already exists' },
        { status: 400 }
      );
    }

    const subcategoryData = {
      name: name.trim(),
      slug,
      description: description.trim(),
      image: image ? image.trim() : '',
      categoryId,
      sortOrder: parseInt(sortOrder) || 0,
      isActive: true
    };

    const newSubcategory = await Subcategory.create(subcategoryData);
    
    // Populate category info for response
    await newSubcategory.populate('categoryId', 'name slug isActive');

    return NextResponse.json({
      success: true,
      data: newSubcategory,
      message: 'Subcategory created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Create subcategory error:', error);
    
    return NextResponse.json(
      { error: 'Failed to create subcategory' },
      { status: 500 }
    );
  }
}