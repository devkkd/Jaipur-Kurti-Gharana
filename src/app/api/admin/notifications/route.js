import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomerInquiry from '@/models/CustomerInquiry';
import Inquiry from '@/models/Inquiry';

// GET - Fetch pending notifications
export async function GET(request) {
  try {
    await dbConnect();

    // Get pending customer inquiries (wholesale) that haven't been viewed
    const pendingCustomerInquiries = await CustomerInquiry.find({ 
      status: 'pending',
      isViewed: false  // Only show unviewed inquiries
    })
      .populate('productId', 'title slug')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Get pending product inquiries that haven't been viewed
    const pendingProductInquiries = await Inquiry.find({ 
      status: 'pending',
      isViewed: false  // Only show unviewed inquiries
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Format notifications
    const notifications = [
      ...pendingCustomerInquiries.map(inquiry => ({
        id: inquiry._id,
        type: 'customer_inquiry',
        title: 'New Wholesale Inquiry',
        message: `${inquiry.companyName} - ${inquiry.contactPersonName}`,
        timestamp: inquiry.createdAt,
        link: '/admin/customer-inquiries',
        data: {
          companyName: inquiry.companyName,
          contactPerson: inquiry.contactPersonName,
          email: inquiry.email,
          productName: inquiry.productId?.title
        }
      })),
      ...pendingProductInquiries.map(inquiry => ({
        id: inquiry._id,
        type: 'product_inquiry',
        title: 'New Product Inquiry',
        message: `${inquiry.fullName} - ${inquiry.email}`,
        timestamp: inquiry.createdAt,
        link: '/admin/inquiries',
        data: {
          fullName: inquiry.fullName,
          email: inquiry.email,
          phone: inquiry.phone,
          company: inquiry.company
        }
      }))
    ];

    // Sort by timestamp (newest first)
    notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Get counts
    const counts = {
      total: notifications.length,
      customerInquiries: pendingCustomerInquiries.length,
      productInquiries: pendingProductInquiries.length
    };

    return NextResponse.json({
      success: true,
      data: notifications,
      counts
    });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch notifications',
      details: error.message
    }, { status: 500 });
  }
}
