import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomerInquiry from '@/models/CustomerInquiry';
import { sendInquiryEmail } from '@/lib/mailer';

// POST - Create new customer inquiry
export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    const inquiry = await CustomerInquiry.create({
      ...body,
      ipAddress,
      userAgent,
      status: 'pending'
    });

    // Send email notification (non-blocking — don't fail the request if email fails)
    sendInquiryEmail(inquiry).catch(err =>
      console.error('Email notification failed:', err.message)
    );

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: inquiry
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating customer inquiry:', error.message);

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
