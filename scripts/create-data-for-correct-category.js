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

// Helper function to generate slug
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

async function createDataForCorrectCategory() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, { dbName: 'avanta-web' });
    
    console.log('✅ Connected to MongoDB successfully');
    
    // Use the category ID that the API is finding
    const correctCategoryId = '69809bce3ed5f9f1296aaf3b';
    
    console.log(`🎯 Using category ID: ${correctCategoryId}`);
    
    // Verify the category exists
    const category = await Category.findById(correctCategoryId);
    if (!category) {
      console.log('❌ Category not found');
      process.exit(1);
    }
    
    console.log(`✅ Found category: ${category.name}`);
    
    // Define the subcategories to create
    const subcategoriesToCreate = [
      {
        name: 'Flared Suit Sets',
        slug: 'flared-suit-sets',
        description: 'Elegant flared suit sets with flowing silhouettes',
        image: '/images/subcategories/flared-suit-sets.jpg',
        sortOrder: 1
      },
      {
        name: 'Straight Dupatta Sets',
        slug: 'straight-dupatta-sets',
        description: 'Classic straight suits with matching dupatta',
        image: '/images/subcategories/straight-dupatta-sets.jpg',
        sortOrder: 2
      },
      {
        name: 'Straight Suit Sets',
        slug: 'straight-suit-sets',
        description: 'Complete straight suit sets with coordinated pieces',
        image: '/images/subcategories/straight-suit-sets.jpg',
        sortOrder: 3
      }
    ];
    
    console.log('\n📝 Creating subcategories...');
    
    const createdSubcategories = [];
    
    for (const subcategoryData of subcategoriesToCreate) {
      // Check if subcategory already exists
      let existingSubcategory = await Subcategory.findOne({ 
        slug: subcategoryData.slug,
        categoryId: correctCategoryId
      });
      
      if (existingSubcategory) {
        console.log(`ℹ️  Subcategory "${subcategoryData.name}" already exists`);
        createdSubcategories.push(existingSubcategory);
        continue;
      }
      
      // Create new subcategory
      const newSubcategory = new Subcategory({
        ...subcategoryData,
        categoryId: correctCategoryId,
        isActive: true
      });
      
      await newSubcategory.save();
      createdSubcategories.push(newSubcategory);
      console.log(`✅ Created subcategory: ${subcategoryData.name}`);
    }
    
    // Sample products data
    const sampleProducts = [
      {
        name: 'Elegant Flared Anarkali Set',
        description: 'Beautiful flared anarkali suit with intricate embroidery and matching dupatta',
        subcategorySlug: 'flared-suit-sets',
        priceRange: { min: 2500, max: 3500 },
        color: { name: 'Royal Blue', code: '#1e40af' },
        material: 'Georgette with Embroidery',
        occasion: 'Wedding, Party'
      },
      {
        name: 'Classic Straight Dupatta Ensemble',
        description: 'Traditional straight suit with beautiful dupatta and palazzo pants',
        subcategorySlug: 'straight-dupatta-sets',
        priceRange: { min: 1800, max: 2800 },
        color: { name: 'Maroon', code: '#7f1d1d' },
        material: 'Cotton Silk',
        occasion: 'Festival, Casual'
      },
      {
        name: 'Premium Straight Suit Collection',
        description: 'Complete straight suit set with coordinated pieces for elegant look',
        subcategorySlug: 'straight-suit-sets',
        priceRange: { min: 2200, max: 3200 },
        color: { name: 'Emerald Green', code: '#047857' },
        material: 'Pure Cotton',
        occasion: 'Office, Casual'
      },
      {
        name: 'Designer Flared Gown Style Set',
        description: 'Modern flared gown style suit with contemporary design elements',
        subcategorySlug: 'flared-suit-sets',
        priceRange: { min: 3000, max: 4000 },
        color: { name: 'Pink', code: '#ec4899' },
        material: 'Crepe with Sequins',
        occasion: 'Party, Wedding'
      },
      {
        name: 'Traditional Straight Dupatta Set',
        description: 'Authentic traditional straight suit with handwoven dupatta',
        subcategorySlug: 'straight-dupatta-sets',
        priceRange: { min: 2000, max: 3000 },
        color: { name: 'Golden Yellow', code: '#f59e0b' },
        material: 'Handloom Cotton',
        occasion: 'Festival, Religious'
      }
    ];
    
    console.log('\n📦 Creating sample products...');
    
    for (const productData of sampleProducts) {
      // Find the subcategory
      const subcategory = createdSubcategories.find(sub => sub.slug === productData.subcategorySlug);
      if (!subcategory) {
        console.log(`❌ Subcategory ${productData.subcategorySlug} not found`);
        continue;
      }
      
      // Generate unique style code
      const styleCode = `AVT-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      
      // Check if product already exists
      const existingProduct = await Product.findOne({ 
        name: productData.name,
        categoryId: correctCategoryId
      });
      if (existingProduct) {
        console.log(`ℹ️  Product "${productData.name}" already exists`);
        continue;
      }
      
      // Create new product
      const newProduct = new Product({
        name: productData.name,
        slug: generateSlug(productData.name),
        description: productData.description,
        styleCode: styleCode,
        sku: styleCode,
        categoryId: correctCategoryId,
        subcategoryId: subcategory._id,
        images: {
          main: '/images/products/sample-suit.jpg',
          gallery: ['/images/products/sample-suit-1.jpg', '/images/products/sample-suit-2.jpg']
        },
        priceRange: productData.priceRange,
        sizes: [
          { size: 'S', stock: 10 },
          { size: 'M', stock: 15 },
          { size: 'L', stock: 12 },
          { size: 'XL', stock: 8 }
        ],
        color: productData.color,
        productDetails: {
          material: productData.material,
          productCare: 'Dry Clean Only',
          occasion: productData.occasion
        },
        tags: ['suits', 'ethnic', 'women', productData.color.name.toLowerCase()],
        isActive: true,
        isFeatured: Math.random() > 0.5, // Randomly make some featured
        sortOrder: 0
      });
      
      await newProduct.save();
      console.log(`✅ Created product: ${productData.name} (${subcategory.name})`);
    }
    
    // Verify the final state
    const finalSubcategories = await Subcategory.find({ categoryId: correctCategoryId });
    const finalProducts = await Product.find({ categoryId: correctCategoryId });
    
    console.log('\n🎉 Data creation completed!');
    console.log(`📊 Category ${correctCategoryId} now has:`);
    console.log(`   📂 ${finalSubcategories.length} subcategories`);
    console.log(`   📦 ${finalProducts.length} products`);
    
    finalSubcategories.forEach((sub, index) => {
      const subProducts = finalProducts.filter(p => p.subcategoryId && p.subcategoryId.toString() === sub._id.toString());
      console.log(`      ${index + 1}. ${sub.name} (${subProducts.length} products)`);
    });
    
    console.log('\n🚀 The suits-set page should now show subcategories and products!');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Data creation failed:', err);
    process.exit(1);
  }
}

createDataForCorrectCategory();