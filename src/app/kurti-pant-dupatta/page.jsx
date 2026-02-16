'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, LayoutGrid, Maximize2, Phone, Heart, IndianRupee } from 'lucide-react';
import FAQ from '@/components/FAQ';
import ContactUs from '@/components/ContactUs';
import CraftsmanshipSection from '@/components/CraftsmanshipSection';
import { useProduct } from '@/context/ProductContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const KurtiListing = () => {
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
        
        // First, get all categories to find "Kurti" category
        const categoriesResponse = await fetch('/api/admin/categories');
        const categoriesData = await categoriesResponse.json();
        
        if (categoriesData.success) {
          // Find the category that matches "kurti"
          const kurtiCategory = categoriesData.data.find(
            cat => cat.slug === 'kurti-pant-dupatta' || 
                   cat.name.toLowerCase().includes('kurti') ||
                   cat.slug === 'ethnic-wear' // fallback
          );
          
          if (kurtiCategory) {
            setCategory(kurtiCategory);
            
            // Get subcategories for this category
            const subcategoriesResponse = await fetch('/api/admin/subcategories');
            const subcategoriesData = await subcategoriesResponse.json();
            
            if (subcategoriesData.success) {
              const categorySubcategories = subcategoriesData.data.filter(sub => {
                const subCategoryId = typeof sub.categoryId === 'object' ? sub.categoryId._id : sub.categoryId;
                return subCategoryId === kurtiCategory._id;
              });
              setSubcategories(categorySubcategories);
            }
            
            // Fetch products for this category
            const productsResponse = await fetch(`/api/products?categoryId=${kurtiCategory._id}&limit=50`);
            const productsData = await productsResponse.json();
            
            if (productsData.success) {
              setProducts(productsData.data);
            }
          } else {
            // If no specific category found, show all products
            const productsResponse = await fetch('/api/products?limit=50');
            const productsData = await productsResponse.json();
            
            if (productsData.success) {
              setProducts(productsData.data);
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

  // Calculate total stock for a product
  const getTotalStock = (sizes) => {
    if (!sizes || !Array.isArray(sizes)) return 0;
    return sizes.reduce((total, size) => total + (size.stock || 0), 0);
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
                <div className="aspect-[3/4] bg-gray-200 rounded"></div>
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
          <p className="text-sm font-semibold tracking-widest uppercase mb-1">
            {category ? category.name : 'Ethnic Wear'}
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-gray-900 uppercase">
            {category ? category.name : 'Kurti Pant Dupatta Sets'}
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {category?.description || 'Discover our exclusive collection of elegant kurti-pant-dupatta sets, crafted with tradition and modern style for every celebration.'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {filteredAndSortedProducts.length} Products Available
          </p>
        </div>

        {/* Subcategory Filter Pills */}
        {subcategories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setSelectedSubcategory('all')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition ${
                selectedSubcategory === 'all' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All {category?.name || 'Products'}
            </button>
            {subcategories.map((subcategory) => (
              <button
                key={subcategory._id}
                onClick={() => setSelectedSubcategory(subcategory._id)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition ${
                  selectedSubcategory === subcategory._id 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {subcategory.name}
              </button>
            ))}
          </div>
        )}

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-gray-100 pt-6 mb-8 gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative group">
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="flex items-center gap-2 border border-gray-300 rounded-full px-5 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition appearance-none cursor-pointer"
              >
                <option value="default">SORT BY: Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="featured">Featured First</option>
                <option value="name">Name A-Z</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            
            {/* Filter buttons - removed for now, can be added later */}
          </div>
          
          <div className="flex items-center gap-4 text-gray-400">
            <span className="text-[10px] uppercase font-bold text-gray-800">View</span>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1 ${viewMode === 'grid' ? 'text-blue-900' : 'text-gray-400'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <div className="h-5 w-[1px] bg-gray-300"></div>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1 ${viewMode === 'list' ? 'text-blue-900' : 'text-gray-400'}`}
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} gap-x-6 gap-y-12`}>
            {filteredAndSortedProducts.map((product) => (
              <div 
                key={product._id} 
                className={`group cursor-pointer ${viewMode === 'list' ? 'flex gap-6 items-start' : ''}`}
                onClick={() => handleProductClick(product._id)}
              >
                {/* Image Container */}
                <div className={`relative overflow-hidden bg-gray-100 mb-4 ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'aspect-[3/4]'}`}>
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
                    <span className="absolute top-3 left-3 bg-[#e91e63] text-white text-[10px] font-bold px-2.5 py-1 rounded-sm">
                      FEATURED
                    </span>
                  )}
                  
                  {!product.isActive && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-bold">OUT OF STOCK</span>
                    </div>
                  )}
                  
                  <button 
                    onClick={(e) => handleAddToWishlist(e, product)}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart size={16} className="text-gray-700" />
                  </button>
                </div>

                {/* Product Info */}
                <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="space-y-2">
                    <h3 className="font-bold text-sm text-gray-900">{product.name}</h3>
                    <div className="flex items-center gap-1">
                      <IndianRupee size={12} className="text-gray-600" />
                      <p className="text-sm font-semibold text-gray-800">
                        {product.priceRange?.min} to {product.priceRange?.max}
                      </p>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
                      {product.description || 'Elegant and comfortable kurti pant dupatta set perfect for traditional and casual occasions.'}
                    </p>
                    
                    {/* Style Code and Stock */}
                    <div className="text-[10px] text-gray-400 space-y-1">
                      <div>Style Code: {product.styleCode}</div>
                      <div>Stock: {getTotalStock(product.sizes)} pieces</div>
                      {product.color && <div>Color: {product.color.name}</div>}
                    </div>
                    
                    {/* Subcategory Info */}
                    {product.subcategoryId && typeof product.subcategoryId === 'object' && (
                      <div className="text-[10px] text-blue-600">
                        {product.subcategoryId.name}
                      </div>
                    )}
                    
                    {/* Additional info for list view */}
                    {viewMode === 'list' && (
                      <div className="mt-4 text-xs text-gray-600">
                        <div className="flex gap-4">
                          <span>Material: {product.productDetails?.material || 'Cotton Blend'}</span>
                          <span>Care: {product.productDetails?.productCare || 'Hand Wash'}</span>
                          <span>Delivery: 5-7 Days</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className={`flex items-center gap-2 ${viewMode === 'list' ? 'mt-6' : 'mt-4'}`}>
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={!product.isActive}
                      className="flex-1 border border-gray-300 rounded-full py-2 text-[10px] font-bold uppercase hover:bg-black hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      + Add to Cart
                    </button>
                    <button 
                      onClick={(e) => handleQuickEnquiry(e, product._id)}
                      className="flex-1 border border-gray-300 rounded-full py-2 text-[10px] font-bold uppercase hover:bg-gray-100 transition"
                    >
                      Enquiry
                    </button>
                    <button className="p-2 border border-gray-300 rounded-full hover:bg-green-50 transition text-green-600">
                      <Phone size={14} fill="currentColor" />
                    </button>
                    {viewMode === 'list' && (
                      <Link
                        href={`/products/${product._id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="border border-gray-300 rounded-full px-4 py-2 text-[10px] font-bold uppercase hover:bg-blue-50 hover:text-blue-700 transition"
                      >
                        View Details
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-500 mb-4">
              {selectedSubcategory !== 'all' 
                ? 'No products found in this subcategory' 
                : 'No products found in this category'
              }
            </div>
            <div className="space-y-2">
              {selectedSubcategory !== 'all' && (
                <button
                  onClick={() => setSelectedSubcategory('all')}
                  className="text-blue-600 hover:text-blue-800 font-medium block mx-auto"
                >
                  View All Products in {category?.name}
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
          <div className="flex justify-center items-center gap-2 mt-16">
            <button className="border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-50">
              &lt;
            </button>
            {[1, 2, 3, 4, 5].map(num => (
              <button 
                key={num}
                className={`border rounded-full w-8 h-8 flex items-center justify-center text-sm ${num === 1 ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                {num}
              </button>
            ))}
            <button className="border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-50">
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

export default KurtiListing;
