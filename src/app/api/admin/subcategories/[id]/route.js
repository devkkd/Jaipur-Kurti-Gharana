import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subcategory from '@/models/Subcategory';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    const sub = await Subcategory.findById(id).lean();
    if (!sub) return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: sub });
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
    const sub = await Subcategory.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!sub) return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: sub });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    const sub = await Subcategory.findByIdAndDelete(id);
    if (!sub) return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Subcategory deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
