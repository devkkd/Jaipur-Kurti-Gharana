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

const Category = mongoose.model('Category', CategorySchema);
const Subcategory = mongoose.model('Subcategory', SubcategorySchema);

async function checkCategories() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    console.log('✅ Connected to MongoDB successfully');
    
    // Find all categories
    const categories = await Category.find({}).sort({ name: 1 });
    
    console.log('\n📋 All Categories:');
    categories.forEach((cat, index) => {
      console.log(`   ${index + 1}. ${cat.name} (${cat._id}) - Slug: ${cat.slug} - Active: ${cat.isActive}`);
    });
    
    // Find suit-related categories
    const suitCategories = await Category.find({ 
      $or: [
        { slug: 'suits-set' },
        { name: { $regex: /suits?\s*set/i } },
        { name: { $regex: /suit/i } }
      ]
    });
    
    console.log('\n👔 Suit-related Categories:');
    suitCategories.forEach((cat, index) => {
      console.log(`   ${index + 1}. ${cat.name} (${cat._id}) - Slug: ${cat.slug}`);
    });
    
    // Check subcategories for each suit category
    for (const category of suitCategories) {
      const subcategories = await Subcategory.find({ categoryId: category._id }).sort({ sortOrder: 1 });
      console.log(`\n📂 Subcategories for "${category.name}" (${category._id}):`);
      if (subcategories.length === 0) {
        console.log('   No subcategories found');
      } else {
        subcategories.forEach((sub, index) => {
          console.log(`   ${index + 1}. ${sub.name} (${sub._id}) - Slug: ${sub.slug} - Active: ${sub.isActive}`);
        });
      }
    }
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Check failed:', err);
    process.exit(1);
  }
}

checkCategories();