import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    const product = await Product.findById(id).populate('categoryId', 'name slug').populate('subcategoryId', 'name slug').lean();
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: product });
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    const body = await request.json();
    const product = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true }).populate('categoryId', 'name slug').populate('subcategoryId', 'name slug');
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: product });
  } catch (e) {
    if (e.code === 11000) { const field = Object.keys(e.keyPattern)[0]; return NextResponse.json({ error: `A product with this ${field} already exists` }, { status: 400 }); }
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    const product = await Product.findByIdAndDelete(id);
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
