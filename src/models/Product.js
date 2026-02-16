import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [2, 'Product name must be at least 2 characters long'],
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  styleCode: {
    type: String,
    required: [true, 'Style code is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  priceRange: {
    min: {
      type: Number,
      required: [true, 'Minimum price is required'],
      min: [0, 'Price must be a positive number']
    },
    max: {
      type: Number,
      required: [true, 'Maximum price is required'],
      min: [0, 'Price must be a positive number']
    }
  },
  images: {
    main: {
      type: String,
      required: [true, 'Main product image is required'],
      trim: true
    },
    gallery: [{
      type: String,
      trim: true
    }]
  },
  sizes: [{
    size: {
      type: String,
      required: true,
      enum: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
      trim: true
    },
    available: {
      type: Boolean,
      default: true
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock cannot be negative']
    }
  }],
  productDetails: {
    material: {
      type: String,
      required: [true, 'Material information is required'],
      trim: true
    },
    productCare: {
      type: String,
      required: [true, 'Product care information is required'],
      trim: true
    },
    additionalInfo: {
      type: String,
      trim: true
    }
  },
  color: {
    name: {
      type: String,
      required: [true, 'Color name is required'],
      trim: true
    },
    code: {
      type: String,
      trim: true
    }
  },
  slug: {
    type: String,
    required: [true, 'Product slug is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isNewArrival: {
    type: Boolean,
    default: false
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  totalStock: {
    type: Number,
    default: 0,
    min: [0, 'Total stock cannot be negative']
  }
}, {
  timestamps: true
});

// Indexes for better performance (removed duplicates that are already created by unique: true)
ProductSchema.index({ categoryId: 1, isActive: 1 });
ProductSchema.index({ subcategoryId: 1, isActive: 1 });
ProductSchema.index({ isActive: 1, isFeatured: 1 });
ProductSchema.index({ 'priceRange.min': 1, 'priceRange.max': 1 });

// Generate slug from name if not provided
ProductSchema.pre('save', function() {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  
  // Calculate total stock from sizes
  if (this.sizes && this.sizes.length > 0) {
    this.totalStock = this.sizes.reduce((total, size) => total + (size.stock || 0), 0);
  }
});

// Generate SKU if not provided
ProductSchema.pre('save', function() {
  if (!this.sku && this.styleCode && this.color && this.color.name) {
    const colorCode = this.color.name.substring(0, 3).toUpperCase();
    this.sku = `${this.styleCode}-${colorCode}`;
  }
});

// Helper method to generate style code
export function generateStyleCode(prefix = 'AVT') {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
}

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;
