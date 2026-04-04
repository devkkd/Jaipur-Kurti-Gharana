import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';
import Product from '@/models/Product';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { category_slug, subcategory_slug } = await params;

    const category = await Category.findOne({ slug: category_slug, isActive: true }).lean();
    if (!category) return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });

    const subcategory = await Subcategory.findOne({ slug: subcategory_slug, categoryId: category._id, isActive: true }).lean();
    if (!subcategory) return NextResponse.json({ success: false, error: 'Subcategory not found' }, { status: 404 });

    const products = await Product.find({ categoryId: category._id, subcategoryId: subcategory._id, isActive: true })
      .sort({ sortOrder: 1, createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: { category, subcategory, products } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
