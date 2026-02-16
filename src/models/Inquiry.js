import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  // Customer Details
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  company: {
    type: String,
    trim: true,
    maxlength: [200, 'Company name cannot exceed 200 characters']
  },
  location: {
    type: String,
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },

  // Products in Inquiry
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    styleCode: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    material: String,
    color: String,
    productCare: String
  }],

  // Inquiry Status
  status: {
    type: String,
    enum: ['pending', 'contacted', 'quoted', 'converted', 'rejected'],
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
    type: String
  },
  userAgent: {
    type: String
  },

  // Timestamps
  contactedAt: {
    type: Date
  },
  quotedAt: {
    type: Date
  },
  convertedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better performance
InquirySchema.index({ email: 1 });
InquirySchema.index({ phone: 1 });
InquirySchema.index({ status: 1, createdAt: -1 });
InquirySchema.index({ createdAt: -1 });

// Virtual for product count
InquirySchema.virtual('productCount').get(function() {
  return this.products.length;
});

// Method to update status with timestamp
InquirySchema.methods.updateStatus = function(newStatus) {
  this.status = newStatus;
  
  switch(newStatus) {
    case 'contacted':
      this.contactedAt = new Date();
      break;
    case 'quoted':
      this.quotedAt = new Date();
      break;
    case 'converted':
      this.convertedAt = new Date();
      break;
  }
  
  return this.save();
};

const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
export default Inquiry;
