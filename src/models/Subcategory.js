import mongoose from 'mongoose';

// Generate slug from name
export const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

// Subcategory Schema for MongoDB Atlas
const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subcategory name is required'],
    trim: true,
    minlength: [2, 'Subcategory name must be at least 2 characters long'],
    maxlength: [100, 'Subcategory name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: [true, 'Subcategory slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [2, 'Subcategory slug must be at least 2 characters long']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  // Optional image URL for the subcategory
  image: {
    type: String,
    trim: true,
    default: ''
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0,
    min: [0, 'Sort order must be a positive number']
  }
}, {
  timestamps: true // This automatically adds createdAt and updatedAt
});

// Indexes for better performance (slug index is automatic due to unique: true)
SubcategorySchema.index({ categoryId: 1, isActive: 1, sortOrder: 1 });
SubcategorySchema.index({ isActive: 1, sortOrder: 1 });

// Pre-save middleware to generate slug if not provided
SubcategorySchema.pre('save', function() {
  if (!this.slug && this.name) {
    this.slug = generateSlug(this.name);
  }
});

// Export the model
const Subcategory = mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema);
export default Subcategory;

// Subcategory validation rules
export const validateSubcategory = (subcategory) => {
  const errors = [];
  
  if (!subcategory.name || subcategory.name.trim().length < 2) {
    errors.push('Subcategory name must be at least 2 characters long');
  }
  
  if (!subcategory.slug || subcategory.slug.trim().length < 2) {
    errors.push('Subcategory slug must be at least 2 characters long');
  }
  
  if (!subcategory.categoryId) {
    errors.push('Category is required');
  }
  
  if (subcategory.sortOrder && (isNaN(subcategory.sortOrder) || subcategory.sortOrder < 0)) {
    errors.push('Sort order must be a positive number');
  }

  if (subcategory.image !== undefined && subcategory.image !== null && typeof subcategory.image !== 'string') {
    errors.push('Invalid image URL');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};