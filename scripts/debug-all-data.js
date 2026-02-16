const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

// Category Schema
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    image: String,
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Subcategory Schema
const SubcategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    image: String,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Product Schema
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    styleCode: { type: String, required: true, unique: true },
    sku: String,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
    images: {
      main: String,
      gallery: [String]
    },
    priceRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true }
    },
    sizes: [{
      size: String,
      stock: { type: Number, default: 0 }
    }],
    color: {
      name: String,
      code: String
    },
    productDetails: {
      material: String,
      productCare: String,
      occasion: String
    },
    tags: [String],
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', CategorySchema);
const Subcategory = mongoose.model('Subcategory', SubcategorySchema);
const Product = mongoose.model('Product', ProductSchema);

async function debugAllData() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    console.log('✅ Connected to MongoDB successfully');
    
    // Get all categories
    const allCategories = await Category.find({}).sort({ createdAt: 1 });
    console.log(`\n📋 All Categories (${allCategories.length}):`);
    allCategories.forEach((cat, index) => {
      console.log(`   ${index + 1}. ${cat.name} (${cat._id}) - Slug: ${cat.slug} - Active: ${cat.isActive}`);
    });
    
    // Get all subcategories
    const allSubcategories = await Subcategory.find({}).sort({ createdAt: 1 });
    console.log(`\n📂 All Subcategories (${allSubcategories.length}):`);
    allSubcategories.forEach((sub, index) => {
      console.log(`   ${index + 1}. ${sub.name} (${sub._id}) - CategoryId: ${sub.categoryId} - Active: ${sub.isActive}`);
    });
    
    // Get all products
    const allProducts = await Product.find({}).sort({ createdAt: 1 });
    console.log(`\n📦 All Products (${allProducts.length}):`);
    allProducts.forEach((prod, index) => {
      console.log(`   ${index + 1}. ${prod.name} (${prod._id})`);
      console.log(`      CategoryId: ${prod.categoryId}`);
      console.log(`      SubcategoryId: ${prod.subcategoryId}`);
      console.log(`      Active: ${prod.isActive}`);
      console.log('');
    });
    
    // Test the specific category ID that the suits-set page is looking for
    const specificCategoryId = '69809bce3ed5f9f1296aaf3b';
    console.log(`\n🔍 Looking for category with ID: ${specificCategoryId}`);
    
    const specificCategory = await Category.findById(specificCategoryId);
    if (specificCategory) {
      console.log(`✅ Found: ${specificCategory.name} - Active: ${specificCategory.isActive}`);
      
      const subcategoriesForSpecific = await Subcategory.find({ categoryId: specificCategoryId });
      const productsForSpecific = await Product.find({ categoryId: specificCategoryId });
      
      console.log(`   📂 Subcategories: ${subcategoriesForSpecific.length}`);
      console.log(`   📦 Products: ${productsForSpecific.length}`);
    } else {
      console.log(`❌ Category ${specificCategoryId} not found`);
    }
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Debug failed:', err);
    process.exit(1);
  }
}

debugAllData();