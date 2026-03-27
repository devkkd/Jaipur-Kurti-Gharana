import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';
import { rateLimit, getIP } from '@/lib/rate-limit';

const limiter = rateLimit({ limit: 10, windowMs: 60 * 1000 }); // 10 per minute per IP

// GET - Fetch all inquiries (for frontend - limited data)
export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');

    let query = {};
    
    if (email) {
      query.email = email;
    }
    
    if (phone) {
      query.phone = phone;
    }

    const inquiries = await Inquiry.find(query)
      .select('fullName email phone status createdAt products')
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json({
      success: true,
      data: inquiries
    });

  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

// POST - Create new inquiry
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
    const {
      fullName,
      email,
      phone,
      company,
      location,
      notes,
      products
    } = body;

    // Validation
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and phone are required' },
        { status: 400 }
      );
    }

    if (!products || products.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one product is required' },
        { status: 400 }
      );
    }

    // Get IP and User Agent
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Format products data
    const formattedProducts = products.map(product => ({
      productId: product._id,
      name: product.name || product.title,
      image: product.images?.main || '/placeholder.png',
      material: product.productDetails?.material || 'N/A',
      color: product.color?.name || 'N/A',
      productCare: product.productDetails?.productCare || 'N/A'
    }));

    // Create inquiry
    const inquiry = await Inquiry.create({
      fullName,
      email,
      phone,
      company,
      location,
      notes,
      products: formattedProducts,
      ipAddress,
      userAgent,
      status: 'pending'
    });

    return NextResponse.json({
      success: true,
      data: inquiry,
      message: 'Inquiry submitted successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating inquiry:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create inquiry' },
      { status: 500 }
    );
  }
}
