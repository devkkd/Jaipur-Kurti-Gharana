"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { LayoutGrid, Maximize2, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function CategoryPage() {
  const { category_slug } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const subFromURL = searchParams.get("sub");

  const [activeSub, setActiveSub] = useState(null);
  const [sortBy, setSortBy] = useState("default");
  const [gridView, setGridView] = useState("4"); // "4" for 4 columns, "3" for 3 columns
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch category data from API
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/store/${category_slug}`);
        const result = await response.json();
        
        if (result.success) {
          setCategoryData(result.data);
          
          // Set active subcategory from URL if exists
          if (subFromURL) {
            // Find subcategory by ID or slug
            const subExists = result.data.subcategories.find(
              sub => sub._id === subFromURL || sub.slug === subFromURL
            );
            if (subExists) {
              setActiveSub(subExists._id);
            }
          }
        } else {
          setError(result.error || 'Failed to load category');
        }
      } catch (err) {
        console.error('Error fetching category:', err);
        setError('Failed to load category');
      } finally {
        setLoading(false);
      }
    };

    if (category_slug) {
      fetchCategoryData();
    }
  }, [category_slug, subFromURL]);

  /* ================= FILTER + SORT PRODUCTS ================= */
  const filteredProducts = useMemo(() => {
    if (!categoryData) return [];

    let products = categoryData.products.filter((product) => {
      if (!activeSub) return true;
      
      // Filter by subcategory ID
      return product.subcategoryId === activeSub;
    });

    if (sortBy === "low-high") {
      products.sort(
        (a, b) => a.priceRange.min - b.priceRange.min
      );
    }

    if (sortBy === "high-low") {
      products.sort(
        (a, b) => b.priceRange.max - a.priceRange.max
      );
    }

    return products;
  }, [categoryData, activeSub, sortBy]);

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-white">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-500 text-sm">Loading category...</p>
          </div>
        </div>
      </div>
    );
  }

  /* ================= ERROR STATE ================= */
  if (error || !categoryData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-white">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-2">Error</p>
            <p className="text-gray-500 text-sm">{error || 'Category not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  /* ================= RENDER ================= */
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-white">
      {/* ================= TITLE ================= */}
      <h1 className="text-center text-3xl md:text-4xl font-playfair font-bold  text-gray-900 mb-10">
        {categoryData.category.name}
      </h1>

      {/* ================= SUBCATEGORY PILLS ================= */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
        {/* ALL */}
        <button
          onClick={() => {
            setActiveSub(null);
            router.push(`/store/${category_slug}`, { scroll: false });
          }}
          className={`px-4 py-2 rounded-full text-[11px] md:text-xs font-medium transition-all duration-300 border
            ${
              activeSub === null
                ? "bg-[#E13C6C] text-white border-[#E13C6C]"
                : "bg-gray-50 text-gray-500 border-transparent hover:border-gray-200"
            }`}
        >
          All
        </button>

        {categoryData.subcategories.map((sub) => (
          <button
            key={sub._id}
            onClick={() => {
              setActiveSub(sub._id);
              router.push(`/store/${category_slug}?sub=${sub.slug}`, { scroll: false });
            }}
            className={`px-4 py-2 rounded-full text-[11px] md:text-xs font-medium transition-all duration-300 border flex items-center gap-2
              ${
                activeSub === sub._id
                  ? "bg-[#E13C6C] text-white border-[#E13C6C]"
                  : "bg-gray-50 text-gray-500 border-transparent hover:border-gray-200"
              }`}
          >
            <span>{sub.name}</span>
            <span className="text-[10px] opacity-70">
              ({sub.productCount})
            </span>
          </button>
        ))}
      </div>

      {/* ================= TOOLBAR ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 border-b border-[#E13C6C]/20 pb-5 gap-4">
        {/* Sort */}
        <div className="relative w-full sm:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none border border-[#E13C6C]/30 rounded-lg px-4 py-2 pr-10 text-xs focus:outline-none focus:border-[#E13C6C] bg-white cursor-pointer w-full sm:w-48 text-gray-700 hover:border-[#E13C6C]/50 transition-colors"
          >
            <option value="default">Sort by: Default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E13C6C] pointer-events-none"
            size={14}
          />
        </div>

        {/* View Icons */}
        <div className="flex items-center gap-5 text-gray-400">
          <span className="text-[11px] uppercase tracking-wider font-medium text-gray-600">
            View
          </span>
          <button 
            onClick={() => setGridView("4")}
            className={`p-1.5 rounded-md transition-all ${
              gridView === "4" 
                ? "bg-[#E13C6C] text-white" 
                : "hover:text-[#E13C6C] hover:bg-[#E13C6C]/10"
            }`}
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setGridView("3")}
            className={`p-1.5 rounded-md transition-all ${
              gridView === "3" 
                ? "bg-[#E13C6C] text-white" 
                : "hover:text-[#E13C6C] hover:bg-[#E13C6C]/10"
            }`}
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* ================= PRODUCT GRID ================= */}
      <div className={`grid grid-cols-2 sm:grid-cols-2 gap-x-6 gap-y-12 ${
        gridView === "4" ? "lg:grid-cols-4" : "lg:grid-cols-3"
      }`}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 text-sm py-20">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
