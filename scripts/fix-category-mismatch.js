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

async function fixCategoryMismatch() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    console.log('✅ Connected to MongoDB successfully');
    
    // Find all "Suits Set" categories
    const suitsCategories = await Category.find({ 
      $or: [
        { slug: 'suits-set' },
        { name: { $regex: /suits?\s*set/i } }
      ]
    }).sort({ createdAt: 1 });
    
    console.log(`\n📋 Found ${suitsCategories.length} Suits Set categories:`);
    suitsCategories.forEach((cat, index) => {
      console.log(`   ${index + 1}. ${cat.name} (${cat._id}) - Created: ${cat.createdAt}`);
    });
    
    if (suitsCategories.length < 2) {
      console.log('✅ No duplicate categories found');
      process.exit(0);
    }
    
    // Use the first (older) category as the main one
    const mainCategory = suitsCategories[0];
    const duplicateCategories = suitsCategories.slice(1);
    
    console.log(`\n🎯 Using main category: ${mainCategory.name} (${mainCategory._id})`);
    console.log(`🗑️  Will merge from: ${duplicateCategories.map(c => c._id).join(', ')}`);
    
    // Move all subcategories to the main category
    for (const dupCategory of duplicateCategories) {
      console.log(`\n📂 Moving subcategories from ${dupCategory._id} to ${mainCategory._id}...`);
      
      const subcategories = await Subcategory.find({ categoryId: dupCategory._id });
      console.log(`   Found ${subcategories.length} subcategories to move`);
      
      for (const subcategory of subcategories) {
        await Subcategory.updateOne(
          { _id: subcategory._id },
          { categoryId: mainCategory._id }
        );
        console.log(`   ✅ Moved: ${subcategory.name}`);
      }
      
      // Move all products to the main category
      console.log(`\n📦 Moving products from ${dupCategory._id} to ${mainCategory._id}...`);
      
      const products = await Product.find({ categoryId: dupCategory._id });
      console.log(`   Found ${products.length} products to move`);
      
      for (const product of products) {
        await Product.updateOne(
          { _id: product._id },
          { categoryId: mainCategory._id }
        );
        console.log(`   ✅ Moved: ${product.name}`);
      }
      
      // Deactivate the duplicate category
      await Category.updateOne(
        { _id: dupCategory._id },
        { isActive: false, name: `${dupCategory.name} (Merged)` }
      );
      console.log(`   🗑️  Deactivated duplicate category: ${dupCategory._id}`);
    }
    
    // Verify the final state
    console.log('\n🔍 Final verification...');
    
    const finalSubcategories = await Subcategory.find({ categoryId: mainCategory._id });
    const finalProducts = await Product.find({ categoryId: mainCategory._id });
    
    console.log(`✅ Main category (${mainCategory._id}) now has:`);
    console.log(`   📂 ${finalSubcategories.length} subcategories`);
    console.log(`   📦 ${finalProducts.length} products`);
    
    finalSubcategories.forEach((sub, index) => {
      console.log(`      ${index + 1}. ${sub.name} (${sub._id})`);
    });
    
    console.log('\n🎉 Category mismatch fixed successfully!');
    console.log('🚀 The suits-set page should now show subcategories and products!');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Fix failed:', err);
    process.exit(1);
  }
}

fixCategoryMismatch();