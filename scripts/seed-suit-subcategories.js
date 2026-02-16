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

// Helper function to generate slug
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

async function seedSuitSubcategories() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    console.log('✅ Connected to MongoDB successfully');
    
    // Find the "Suits Set" category
    const suitsCategory = await Category.findOne({ 
      $or: [
        { slug: 'suits-set' },
        { name: { $regex: /suits?\s*set/i } },
        { name: { $regex: /suit/i } }
      ]
    });
    
    if (!suitsCategory) {
      console.log('❌ Suits Set category not found. Creating it first...');
      
      // Create the Suits Set category
      const newSuitsCategory = new Category({
        name: 'Suits Set',
        slug: 'suits-set',
        description: 'Premium collection of suit sets for every occasion',
        image: '/images/categories/suits-set.jpg',
        isActive: true,
        sortOrder: 1
      });
      
      await newSuitsCategory.save();
      console.log('✅ Created Suits Set category');
      
      // Use the newly created category
      var categoryId = newSuitsCategory._id;
    } else {
      console.log(`✅ Found Suits Set category: ${suitsCategory.name} (${suitsCategory._id})`);
      var categoryId = suitsCategory._id;
    }
    
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
    
    for (const subcategoryData of subcategoriesToCreate) {
      // Check if subcategory already exists
      const existingSubcategory = await Subcategory.findOne({ 
        slug: subcategoryData.slug 
      });
      
      if (existingSubcategory) {
        console.log(`ℹ️  Subcategory "${subcategoryData.name}" already exists`);
        continue;
      }
      
      // Create new subcategory
      const newSubcategory = new Subcategory({
        ...subcategoryData,
        categoryId: categoryId,
        isActive: true
      });
      
      await newSubcategory.save();
      console.log(`✅ Created subcategory: ${subcategoryData.name}`);
    }
    
    // Verify the subcategories were created
    const createdSubcategories = await Subcategory.find({ categoryId }).sort({ sortOrder: 1 });
    
    console.log('\n🎉 Suit subcategories setup completed!');
    console.log(`📊 Total subcategories for Suits Set: ${createdSubcategories.length}`);
    
    createdSubcategories.forEach((sub, index) => {
      console.log(`   ${index + 1}. ${sub.name} (${sub.slug})`);
    });
    
    console.log('\n🚀 You can now see these subcategories on the suits-set page!');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Subcategory seeding failed:', err);
    process.exit(1);
  }
}

seedSuitSubcategories();