import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const product = await Product.findOne({ slug, isActive: true })
      .populate('categoryId', 'name slug')
      .populate('subcategoryId', 'name slug')
      .lean();
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
