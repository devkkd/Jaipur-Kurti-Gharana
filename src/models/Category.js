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

// Category Schema for MongoDB Atlas
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    minlength: [2, 'Category name must be at least 2 characters long'],
    maxlength: [100, 'Category name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: [true, 'Category slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [2, 'Category slug must be at least 2 characters long']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  image: {
    type: String,
    trim: true,
    default: null
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

// Index for better performance (slug index is automatic due to unique: true)
CategorySchema.index({ isActive: 1, sortOrder: 1 });

// Pre-save middleware to generate slug if not provided
CategorySchema.pre('save', function() {
  if (!this.slug && this.name) {
    this.slug = generateSlug(this.name);
  }
});

// Export the model
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
export default Category;

// Category validation rules
export const validateCategory = (category) => {
  const errors = [];
  
  if (!category.name || category.name.trim().length < 2) {
    errors.push('Category name must be at least 2 characters long');
  }
  
  if (!category.slug || category.slug.trim().length < 2) {
    errors.push('Category slug must be at least 2 characters long');
  }
  
  if (category.sortOrder && (isNaN(category.sortOrder) || category.sortOrder < 0)) {
    errors.push('Sort order must be a positive number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};