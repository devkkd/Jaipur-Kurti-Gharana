'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, LayoutGrid, Maximize2, Phone, Heart, IndianRupee } from 'lucide-react';
import FAQ from '@/components/FAQ';
import ContactUs from '@/components/ContactUs';
import CraftsmanshipSection from '@/components/CraftsmanshipSection';
import { useProduct } from '@/context/ProductContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const SuitListing = () => {
  const router = useRouter();
  const { addToCart, addToWishlist } = useProduct();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('default');
  const [viewMode, setViewMode] = useState('grid');

  // Fetch category-specific data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // First, get all categories to find "Suits Set" category
        const categoriesResponse = await fetch('/api/admin/categories');
        const categoriesData = await categoriesResponse.json();
        
        if (categoriesData.success) {
          // Find the category that matches "suits-set" slug specifically
          const suitsCategory = categoriesData.data.find(
            cat => cat.slug === 'suits-set' || 
                   cat.name.toLowerCase().includes('suit') ||
                   cat.slug === 'ethnic-wear' // fallback
          );
          
          if (suitsCategory) {
            setCategory(suitsCategory);
            
            // Get subcategories for this specific category using categoryId filter
            const subcategoriesResponse = await fetch(`/api/admin/subcategories?categoryId=${suitsCategory._id}`);
            const subcategoriesData = await subcategoriesResponse.json();
            
            if (subcategoriesData.success) {
              // Filter active subcategories only
              const activeSubcategories = subcategoriesData.data.filter(sub => sub.isActive !== false);
              setSubcategories(activeSubcategories);
            }
            
            // Fetch products for this category only
            const productsResponse = await fetch(`/api/products?categoryId=${suitsCategory._id}&limit=100`);
            const productsData = await productsResponse.json();
            
            if (productsData.success) {
              // Filter active products only
              const activeProducts = productsData.data.filter(product => product.isActive !== false);
              setProducts(activeProducts);
            }
          } else {
            console.warn('Suits Set category not found, showing all products');
            // If no specific category found, show all products
            const productsResponse = await fetch('/api/products?limit=100');
            const productsData = await productsResponse.json();
            
            if (productsData.success) {
              const activeProducts = productsData.data.filter(product => product.isActive !== false);
              setProducts(activeProducts);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];
    
    // Filter by subcategory if selected
    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(product => {
        // Handle both populated and non-populated subcategoryId
        const productSubcategoryId = typeof product.subcategoryId === 'object' 
          ? product.subcategoryId._id 
          : product.subcategoryId;
        return productSubcategoryId === selectedSubcategory;
      });
    }
    
    // Sort products
    switch(sortOption) {
      case 'price-low-high':
        return filtered.sort((a, b) => (a.priceRange?.min || 0) - (b.priceRange?.min || 0));
      case 'price-high-low':
        return filtered.sort((a, b) => (b.priceRange?.max || 0) - (a.priceRange?.max || 0));
      case 'newest':
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'featured':
        return filtered.filter(p => p.isFeatured).concat(filtered.filter(p => !p.isFeatured));
      case 'name':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [products, selectedSubcategory, sortOption]);

  const handleProductClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (e, product) => {
    e.stopPropagation();
    addToWishlist(product);
    alert(`${product.name} added to wishlist!`);
  };

  const handleQuickEnquiry = (e, productId) => {
    e.stopPropagation();
    router.push(`/products/${productId}#enquiry-form`);
  };

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-10">
        <div className="animate-pulse">
          <div className="text-center mb-10">
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-10 bg-white font-sans">
        {/* Header Section */}
        <div className="text-center mb-10">
          {/* <p className="text-sm font-semibold tracking-widest uppercase mb-1">
            {category ? category.name : 'Suits Set'}
          </p> */}
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-gray-900 uppercase">
            {category ? category.name : 'Suit Sets Collection'}
          </h1>
          {/* <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {category?.description || 'Discover our exclusive collection of premium suit sets, crafted with precision and style for every occasion.'}
          </p> */}
          {/* <p className="text-sm text-gray-500 mt-2">
            {filteredAndSortedProducts.length} Products Available
          </p> */}
        </div>



        {/* Subcategory Filter Pills */}
        {subcategories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedSubcategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedSubcategory === 'all' 
                  ? 'bg-black text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({products.length})
            </button>
            {subcategories.map((subcategory) => {
              // Count products in this subcategory
              const subcategoryProductCount = products.filter(product => {
                const productSubcategoryId = typeof product.subcategoryId === 'object' 
                  ? product.subcategoryId._id 
                  : product.subcategoryId;
                return productSubcategoryId === subcategory._id;
              }).length;
              
              return (
                <button
                  key={subcategory._id}
                  onClick={() => setSelectedSubcategory(subcategory._id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedSubcategory === subcategory._id 
                      ? 'bg-black text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {subcategory.name} ({subcategoryProductCount})
                </button>
              );
            })}
          </div>
        )}

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-gray-200 pt-6 mb-8 gap-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition appearance-none cursor-pointer bg-white min-w-[180px]"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="featured">Featured First</option>
                <option value="name">Name A-Z</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-gray-500">
            <span className="text-sm font-medium text-gray-700">View</span>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
            {filteredAndSortedProducts.map((product) => (
              <div 
                key={product._id} 
                className={`group cursor-pointer bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ${viewMode === 'list' ? 'flex gap-4 items-start p-4' : ''}`}
                onClick={() => handleProductClick(product._id)}
              >
                {/* Image Container */}
                <div className={`relative overflow-hidden bg-gray-100 ${viewMode === 'list' ? 'w-48 h-48 shrink-0 rounded-lg' : 'aspect-3/4'}`}>
                  {product.images && product.images.main ? (
                    <img
                      src={product.images.main}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  
                  {product.isFeatured && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                  
                  <button 
                    onClick={(e) => handleAddToWishlist(e, product)}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart size={16} className="text-gray-700" />
                  </button>
                </div>

                {/* Product Info */}
                <div className={`${viewMode === 'list' ? 'flex-1' : 'p-4'}`}>
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900 text-lg leading-tight">{product.name}</h3>
                    <div className="flex items-center gap-1">
                      <IndianRupee size={14} className="text-gray-600" />
                      <p className="text-lg font-semibold text-gray-900">
                        {product.priceRange?.min} to {product.priceRange?.max}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {product.description || 'Effortlessly elegant and endlessly versatile, perfect for any occasion.'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className={`flex items-center gap-2 ${viewMode === 'list' ? 'mt-4' : 'mt-4'}`}>
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={!product.isActive}
                      className="flex-1 bg-black text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      + Add to Cart
                    </button>
                    <button 
                      onClick={(e) => handleQuickEnquiry(e, product._id)}
                      className="flex-1 border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Enquiry
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-500 mb-4 text-lg">
              {selectedSubcategory !== 'all' 
                ? 'No products found in this subcategory' 
                : 'No products found in this category'
              }
            </div>
            <div className="space-y-3">
              {selectedSubcategory !== 'all' && (
                <button
                  onClick={() => setSelectedSubcategory('all')}
                  className="text-black hover:text-gray-700 font-medium block mx-auto bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  View All Products
                </button>
              )}
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-800 font-medium block"
              >
                Browse All Categories
              </Link>
            </div>
          </div>
        )}

        {/* Pagination - Only show if there are products */}
        {filteredAndSortedProducts.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button className="border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors">
              &lt;
            </button>
            {[1, 2, 3, 4, 5].map(num => (
              <button 
                key={num}
                className={`border rounded-lg w-10 h-10 flex items-center justify-center text-sm transition-colors ${num === 1 ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                {num}
              </button>
            ))}
            <button className="border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors">
              &gt;
            </button>
          </div>
        )}
      </div>
      <FAQ/>
      <ContactUs/>
      <CraftsmanshipSection/>
    </div>
  );
};

export default SuitListing;