import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomerInquiry from '@/models/CustomerInquiry';
import { sendInquiryEmail } from '@/lib/mailer';
import { rateLimit, getIP } from '@/lib/rate-limit';

const limiter = rateLimit({ limit: 5, windowMs: 60 * 1000 }); // 5 per minute per IP

// POST - Create new customer inquiry
export async function POST(request) {
  const ip = getIP(request);
  const { allowed, retryAfter } = limiter(ip);
  if (!allowed) {
    return NextResponse.json({ success: false, error: 'Too many requests. Please try again later.' }, {
      status: 429,
      headers: { 'Retry-After': String(retryAfter) }
    });
  }

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
