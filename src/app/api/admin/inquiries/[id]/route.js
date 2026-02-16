import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';

// GET - Fetch single inquiry
export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = await params;

    const inquiry = await Inquiry.findById(id)
      .populate('products.productId', 'name slug styleCode')
      .lean();

    if (!inquiry) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: inquiry
    });

  } catch (error) {
    console.error('Error fetching inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiry' },
      { status: 500 }
    );
  }
}

// PUT - Update inquiry (status, admin notes)
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = await params;
    const body = await request.json();
    const { status, adminNotes } = body;

    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    // Update status with timestamp
    if (status && status !== inquiry.status) {
      await inquiry.updateStatus(status);
    }

    // Update admin notes
    if (adminNotes !== undefined) {
      inquiry.adminNotes = adminNotes;
      await inquiry.save();
    }

    return NextResponse.json({
      success: true,
      data: inquiry,
      message: 'Inquiry updated successfully'
    });

  } catch (error) {
    console.error('Error updating inquiry:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}

// DELETE - Delete inquiry
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = await params;

    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}
