'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, X, Upload, IndianRupee } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import MultipleImageUpload from '@/components/admin/MultipleImageUpload';

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    styleCode: '',
    sku: '',
    priceRange: {
      min: '',
      max: ''
    },
    images: {
      main: '',
      gallery: []
    },
    sizes: [
      { size: 'S', available: true, stock: 0 },
      { size: 'M', available: true, stock: 0 },
      { size: 'L', available: true, stock: 0 }
    ],
    productDetails: {
      material: '',
      productCare: '',
      additionalInfo: ''
    },
    color: {
      name: '',
      code: ''
    },
    categoryId: '',
    subcategoryId: '',
    tags: [],
    isFeatured: false,
    isNewArrival: false,
    sortOrder: 0
  });

  const [newTag, setNewTag] = useState('');

  // Fetch categories and subcategories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, subcategoriesRes] = await Promise.all([
          fetch('/api/admin/categories'),
          fetch('/api/admin/subcategories')
        ]);

        const categoriesData = await categoriesRes.json();
        const subcategoriesData = await subcategoriesRes.json();

        if (categoriesData.success) setCategories(categoriesData.data);
        if (subcategoriesData.success) setSubcategories(subcategoriesData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter subcategories based on selected category
  useEffect(() => {
    if (formData.categoryId) {
      const filtered = subcategories.filter(sub => 
        (typeof sub.categoryId === 'object' ? sub.categoryId._id : sub.categoryId) === formData.categoryId
      );
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [formData.categoryId, subcategories]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (!formData.name.trim()) {
        alert('Product name is required');
        return;
      }

      if (!formData.description.trim()) {
        alert('Product description is required');
        return;
      }

      if (!formData.categoryId) {
        alert('Category is required');
        return;
      }

      if (!formData.priceRange.min || !formData.priceRange.max) {
        alert('Price range is required');
        return;
      }

      if (parseFloat(formData.priceRange.min) >= parseFloat(formData.priceRange.max)) {
        alert('Maximum price must be greater than minimum price');
        return;
      }

      if (!formData.images.main) {
        alert('Main product image is required');
        return;
      }

      if (!formData.productDetails.material.trim()) {
        alert('Material information is required');
        return;
      }

      if (!formData.productDetails.productCare.trim()) {
        alert('Product care information is required');
        return;
      }

      if (!formData.color.name.trim()) {
        alert('Color name is required');
        return;
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Product created successfully!');
        router.push('/admin/products');
      } else {
        alert(data.error || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    } finally {
      setLoading(false);
    }
  };

  // Handle size changes
  const handleSizeChange = (index, field, value) => {
    const newSizes = [...formData.sizes];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setFormData({ ...formData, sizes: newSizes });
  };

  // Add size
  const addSize = (size) => {
    if (!formData.sizes.find(s => s.size === size)) {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, { size, available: true, stock: 0 }]
      });
    }
  };

  // Remove size
  const removeSize = (index) => {
    const newSizes = formData.sizes.filter((_, i) => i !== index);
    setFormData({ ...formData, sizes: newSizes });
  };

  // Handle tags
  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Add gallery image
  const addGalleryImage = (url) => {
    setFormData({
      ...formData,
      images: {
        ...formData.images,
        gallery: [...formData.images.gallery, url]
      }
    });
  };

  // Remove gallery image
  const removeGalleryImage = (index) => {
    const newGallery = formData.images.gallery.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: {
        ...formData.images,
        gallery: newGallery
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/products"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Products
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
          <p className="text-gray-600 mt-1">Add a new product to your catalog</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">1</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style Code
              </label>
              <input
                type="text"
                value={formData.styleCode}
                onChange={(e) => setFormData({ ...formData, styleCode: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Auto-generated if empty"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Auto-generated if empty"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter detailed product description"
                required
              />
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">2</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Price Range</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Price *
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="number"
                  value={formData.priceRange.min}
                  onChange={(e) => setFormData({
                    ...formData,
                    priceRange: { ...formData.priceRange, min: e.target.value }
                  })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Price *
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="number"
                  value={formData.priceRange.max}
                  onChange={(e) => setFormData({
                    ...formData,
                    priceRange: { ...formData.priceRange, max: e.target.value }
                  })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">3</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Product Images</h2>
          </div>
          
          <div className="space-y-6">
            {/* Main Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Image *
              </label>
              <CloudinaryUpload
                value={formData.images.main}
                onChange={(url) => setFormData({
                  ...formData,
                  images: { ...formData.images, main: url }
                })}
                folder="avanta/products"
                placeholder="Upload main product image"
              />
            </div>

            {/* Gallery Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gallery Images
              </label>
              <MultipleImageUpload
                images={formData.images.gallery}
                onChange={(images) => setFormData({
                  ...formData,
                  images: { ...formData.images, gallery: images }
                })}
                folder="avanta/products"
                maxImages={8}
                placeholder="Upload gallery images"
              />
            </div>
          </div>
        </div>

        {/* Sizes & Stock */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">4</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Sizes & Stock</h2>
          </div>
          
          <div className="space-y-4">
            {/* Available Sizes to Add */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Sizes
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SIZES.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => addSize(size)}
                    disabled={formData.sizes.find(s => s.size === size)}
                    className={`px-3 py-1 text-sm rounded-lg border ${
                      formData.sizes.find(s => s.size === size)
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Sizes */}
            <div className="space-y-3">
              {formData.sizes.map((sizeData, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                  <div className="w-12 text-center font-medium">{sizeData.size}</div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={sizeData.available}
                      onChange={(e) => handleSizeChange(index, 'available', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="text-sm text-gray-700">Available</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Stock:</label>
                    <input
                      type="number"
                      value={sizeData.stock}
                      onChange={(e) => handleSizeChange(index, 'stock', parseInt(e.target.value) || 0)}
                      className="w-20 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeSize(index)}
                    className="text-red-600 hover:text-red-800 ml-auto"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">5</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material *
              </label>
              <input
                type="text"
                value={formData.productDetails.material}
                onChange={(e) => setFormData({
                  ...formData,
                  productDetails: { ...formData.productDetails, material: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Viscose Chinnon(100% Viscose)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Care *
              </label>
              <input
                type="text"
                value={formData.productDetails.productCare}
                onChange={(e) => setFormData({
                  ...formData,
                  productDetails: { ...formData.productDetails, productCare: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Professional Dry Clean Only"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                value={formData.productDetails.additionalInfo}
                onChange={(e) => setFormData({
                  ...formData,
                  productDetails: { ...formData.productDetails, additionalInfo: e.target.value }
                })}
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any additional product information"
              />
            </div>
          </div>
        </div>

        {/* Color */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">6</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Color Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Name *
              </label>
              <input
                type="text"
                value={formData.color.name}
                onChange={(e) => setFormData({
                  ...formData,
                  color: { ...formData.color, name: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., LIME GREEN"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Code
              </label>
              <input
                type="text"
                value={formData.color.code}
                onChange={(e) => setFormData({
                  ...formData,
                  color: { ...formData.color, code: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., #32CD32"
              />
            </div>
          </div>
        </div>

        {/* Category & Classification */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">7</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Category & Classification</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value, subcategoryId: '' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory
              </label>
              <select
                value={formData.subcategoryId}
                onChange={(e) => setFormData({ ...formData, subcategoryId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!formData.categoryId}
              >
                <option value="">Select Subcategory</option>
                {filteredSubcategories.map((subcategory) => (
                  <option key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">8</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Tags</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus size={16} />
              </button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Additional Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">9</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Additional Settings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort Order
              </label>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
              />
            </div>

            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Featured Product</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isNewArrival}
                  onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">New Product (Show "NEW" Badge)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? 'Creating Product...' : 'Create Product'}
            </button>
            <Link
              href="/admin/products"
              className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 text-center font-semibold text-lg transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}