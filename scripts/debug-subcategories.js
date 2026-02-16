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

async function debugSubcategories() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    console.log('✅ Connected to MongoDB successfully');
    
    // Find the Suits Set category
    const suitsCategory = await Category.findOne({ slug: 'suits-set' });
    
    if (!suitsCategory) {
      console.log('❌ Suits Set category not found');
      process.exit(1);
    }
    
    console.log(`✅ Found Suits Set category: ${suitsCategory.name} (${suitsCategory._id})`);
    
    // Test the subcategories query that the API uses
    console.log('\n🔍 Testing subcategories query...');
    console.log(`Query: { categoryId: ObjectId("${suitsCategory._id}") }`);
    
    const subcategories = await Subcategory.find({ categoryId: suitsCategory._id }).sort({ sortOrder: 1, name: 1 });
    
    console.log(`\n📊 Found ${subcategories.length} subcategories:`);
    subcategories.forEach((sub, index) => {
      console.log(`   ${index + 1}. ${sub.name}`);
      console.log(`      - ID: ${sub._id}`);
      console.log(`      - Slug: ${sub.slug}`);
      console.log(`      - CategoryId: ${sub.categoryId}`);
      console.log(`      - Active: ${sub.isActive}`);
      console.log(`      - SortOrder: ${sub.sortOrder}`);
      console.log('');
    });
    
    // Test the exact query that the API route uses
    console.log('🔍 Testing API route logic...');
    
    // Simulate the API route logic
    let allSubcategories = await Subcategory.find({}).sort({ sortOrder: 1, name: 1 });
    console.log(`Total subcategories in database: ${allSubcategories.length}`);
    
    // Filter by categoryId (as string comparison like the API does)
    const categoryIdString = suitsCategory._id.toString();
    console.log(`Filtering by categoryId: ${categoryIdString}`);
    
    const filteredSubcategories = allSubcategories.filter(sub => {
      const subCategoryId = sub.categoryId.toString();
      console.log(`  Comparing: ${subCategoryId} === ${categoryIdString} ? ${subCategoryId === categoryIdString}`);
      return subCategoryId === categoryIdString;
    });
    
    console.log(`\n📊 Filtered subcategories: ${filteredSubcategories.length}`);
    filteredSubcategories.forEach((sub, index) => {
      console.log(`   ${index + 1}. ${sub.name} (${sub._id})`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Debug failed:', err);
    process.exit(1);
  }
}

debugSubcategories();