import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    const category = await Category.findById(id).lean();
    if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    const body = await request.json();
    const category = await Category.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    const category = await Category.findByIdAndDelete(id);
    if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
