import mongoose from 'mongoose';

const CustomerInquirySchema = new mongoose.Schema({
  // Company Information
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [200, 'Company name cannot exceed 200 characters']
  },
  
  // Contact Information
  contactPersonName: {
    type: String,
    required: [true, 'Contact person name is required'],
    trim: true,
    maxlength: [100, 'Contact person name cannot exceed 100 characters']
  },
  
  phoneNumber: {
    type: String,
    required: [true, 'Phone/WhatsApp number is required'],
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  
  // Location Information
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    maxlength: [100, 'City name cannot exceed 100 characters']
  },
  
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
    maxlength: [100, 'Country name cannot exceed 100 characters']
  },
  
  // Business Information
  businessType: {
    type: String,
    required: [true, 'Business type is required'],
    enum: [
      'Retailer',
      'Wholesaler',
      'Distributor',
      'Online Store',
      'Boutique',
      'Export House',
      'Other'
    ]
  },
  
  // Order Details
  quantityRequired: {
    type: String,
    required: [true, 'Quantity required is required'],
    enum: [
      '50-100 pieces',
      '100-500 pieces',
      '500-1000 pieces',
      '1000-5000 pieces',
      '5000+ pieces'
    ]
  },
  
  expectedOrderFrequency: {
    type: String,
    required: [true, 'Expected order frequency is required'],
    enum: [
      'One-time order',
      'Monthly',
      'Quarterly',
      'Bi-annually',
      'Annually'
    ]
  },
  
  targetDeliveryTimeline: {
    type: String,
    required: [true, 'Target delivery timeline is required'],
    enum: [
      'Within 1 week',
      '1-2 weeks',
      '2-4 weeks',
      '1-2 months',
      '2-3 months',
      'Flexible'
    ]
  },
  
  // Customization
  customisationRequirement: {
    type: String,
    required: [true, 'Customisation requirement is required'],
    enum: [
      'No customization needed',
      'Minor alterations',
      'Custom designs',
      'Private labeling',
      'Full customization'
    ]
  },
  
  specialInstructions: {
    type: String,
    trim: true,
    maxlength: [1000, 'Special instructions cannot exceed 1000 characters']
  },
  
  // Product Reference (optional - if inquiry is from a specific product page)
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: null
  },
  
  productName: {
    type: String,
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  
  // Status Management
  status: {
    type: String,
    enum: ['pending', 'contacted', 'quoted', 'negotiating', 'converted', 'rejected'],
    default: 'pending'
  },
  
  // Admin Notes
  adminNotes: {
    type: String,
    trim: true,
    maxlength: [2000, 'Admin notes cannot exceed 2000 characters']
  },
  
  // Tracking
  ipAddress: {
    type: String,
    trim: true
  },
  
  userAgent: {
    type: String,
    trim: true
  },
  
  // Status History
  statusHistory: [{
    status: {
      type: String,
      enum: ['pending', 'contacted', 'quoted', 'negotiating', 'converted', 'rejected']
    },
    changedAt: {
      type: Date,
      default: Date.now
    },
    changedBy: {
      type: String,
      default: 'system'
    },
    notes: String
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
CustomerInquirySchema.index({ status: 1, createdAt: -1 });
CustomerInquirySchema.index({ email: 1 });
CustomerInquirySchema.index({ phoneNumber: 1 });
CustomerInquirySchema.index({ companyName: 1 });

const CustomerInquiry = mongoose.models.CustomerInquiry || mongoose.model('CustomerInquiry', CustomerInquirySchema);
export default CustomerInquiry;
