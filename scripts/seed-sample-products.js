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

async function seedSampleProducts() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    console.log('✅ Connected to MongoDB successfully');
    
    // Find the Suits Set category and subcategories
    const suitsCategory = await Category.findOne({ slug: 'suits-set' });
    if (!suitsCategory) {
      console.log('❌ Suits Set category not found');
      process.exit(1);
    }
    
    const subcategories = await Subcategory.find({ categoryId: suitsCategory._id });
    if (subcategories.length === 0) {
      console.log('❌ No subcategories found for Suits Set');
      process.exit(1);
    }
    
    console.log(`✅ Found category: ${suitsCategory.name}`);
    console.log(`✅ Found ${subcategories.length} subcategories`);
    
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
    
    console.log('\n📝 Creating sample products...');
    
    for (const productData of sampleProducts) {
      // Find the subcategory
      const subcategory = subcategories.find(sub => sub.slug === productData.subcategorySlug);
      if (!subcategory) {
        console.log(`❌ Subcategory ${productData.subcategorySlug} not found`);
        continue;
      }
      
      // Generate unique style code
      const styleCode = `AVT-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      
      // Check if product already exists
      const existingProduct = await Product.findOne({ name: productData.name });
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
        categoryId: suitsCategory._id,
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
    
    // Verify the products were created
    const createdProducts = await Product.find({ categoryId: suitsCategory._id }).populate('subcategoryId');
    
    console.log('\n🎉 Sample products setup completed!');
    console.log(`📊 Total products for Suits Set: ${createdProducts.length}`);
    
    // Group by subcategory
    const productsBySubcategory = {};
    createdProducts.forEach(product => {
      const subName = product.subcategoryId ? product.subcategoryId.name : 'No Subcategory';
      if (!productsBySubcategory[subName]) {
        productsBySubcategory[subName] = [];
      }
      productsBySubcategory[subName].push(product.name);
    });
    
    Object.keys(productsBySubcategory).forEach(subName => {
      console.log(`\n📂 ${subName}:`);
      productsBySubcategory[subName].forEach((productName, index) => {
        console.log(`   ${index + 1}. ${productName}`);
      });
    });
    
    console.log('\n🚀 You can now see these products on the suits-set page!');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Product seeding failed:', err);
    process.exit(1);
  }
}

seedSampleProducts();