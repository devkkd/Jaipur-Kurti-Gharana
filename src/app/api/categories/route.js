import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';

export async function GET() {
  try {
    await dbConnect();

    // Fetch all active categories sorted by creation date (oldest first)
    // This ensures the first 6 created categories always show in the main menu
    const categories = await Category.find({ isActive: true })
      .sort({ createdAt: 1 })
      .lean();

    // Fetch all active subcategories
    const subcategories = await Subcategory.find({ isActive: true })
      .sort({ sortOrder: 1 })
      .lean();

    // Group subcategories by categoryId
    const categoriesWithSubcategories = categories.map(category => ({
      _id: category._id.toString(),
      name: category.name,
      slug: category.slug,
      description: category.description,
      sortOrder: category.sortOrder,
      subcategories: subcategories
        .filter(sub => sub.categoryId.toString() === category._id.toString())
        .map(sub => ({
          _id: sub._id.toString(),
          name: sub.name,
          slug: sub.slug,
          description: sub.description,
          image: sub.image,
          sortOrder: sub.sortOrder
        }))
    }));

    return NextResponse.json({
      success: true,
      data: categoriesWithSubcategories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
