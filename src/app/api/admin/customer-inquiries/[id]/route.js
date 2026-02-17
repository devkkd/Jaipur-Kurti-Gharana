import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomerInquiry from '@/models/CustomerInquiry';
import Product from '@/models/Product';
import mongoose from 'mongoose';

// GET - Fetch single customer inquiry
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid inquiry ID'
      }, { status: 400 });
    }

    const inquiry = await CustomerInquiry.findById(id)
      .populate('productId', 'title slug images styleCode')
      .lean();

    if (!inquiry) {
      return NextResponse.json({
        success: false,
        error: 'Inquiry not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: inquiry
    });

  } catch (error) {
    console.error('Error fetching customer inquiry:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch inquiry'
    }, { status: 500 });
  }
}

// PUT - Update customer inquiry (status, admin notes)
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    console.log('PUT request for ID:', id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid ID format');
      return NextResponse.json({
        success: false,
        error: 'Invalid inquiry ID'
      }, { status: 400 });
    }

    const body = await request.json();
    console.log('Update body:', body);
    const { status, adminNotes } = body;

    const updateData = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    
    // Mark as viewed when status is changed
    if (status) {
      updateData.isViewed = true;
      // Set firstViewedAt only if it's not already set
      const existingInquiry = await CustomerInquiry.findById(id);
      if (existingInquiry && !existingInquiry.firstViewedAt) {
        updateData.firstViewedAt = new Date();
      }
    }

    console.log('Update data:', updateData);

    const inquiry = await CustomerInquiry.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('productId', 'title slug images styleCode');

    console.log('Updated inquiry:', inquiry);

    if (!inquiry) {
      return NextResponse.json({
        success: false,
        error: 'Inquiry not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry updated successfully',
      data: inquiry
    });

  } catch (error) {
    console.error('Error updating customer inquiry:', error);
    console.error('Error message:', error.message);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: errors
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to update inquiry',
      details: error.message
    }, { status: 500 });
  }
}

// DELETE - Delete customer inquiry
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid inquiry ID'
      }, { status: 400 });
    }

    const inquiry = await CustomerInquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return NextResponse.json({
        success: false,
        error: 'Inquiry not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting customer inquiry:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete inquiry'
    }, { status: 500 });
  }
}
