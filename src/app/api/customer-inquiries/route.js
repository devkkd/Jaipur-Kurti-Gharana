import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomerInquiry from '@/models/CustomerInquiry';

// POST - Create new customer inquiry
export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    
    // Get IP address and user agent for tracking
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Create inquiry with tracking data
    const inquiryData = {
      ...body,
      ipAddress,
      userAgent,
      status: 'pending'
    };

    const inquiry = await CustomerInquiry.create(inquiryData);

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: inquiry
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating customer inquiry:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);

    // Handle validation errors
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
      error: 'Failed to submit inquiry',
      details: error.message
    }, { status: 500 });
  }
}
