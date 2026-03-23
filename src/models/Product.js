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

// Indexes
ProductSchema.index({ categoryId: 1, isActive: 1 });
ProductSchema.index({ subcategoryId: 1, isActive: 1 });
ProductSchema.index({ isActive: 1, isFeatured: 1 });

// Generate slug + calculate totalStock on save
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

  if (this.sizes && this.sizes.length > 0) {
    this.totalStock = this.sizes.reduce((total, size) => total + (size.stock || 0), 0);
  }
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;
