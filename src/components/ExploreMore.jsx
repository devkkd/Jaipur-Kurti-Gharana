"use client";

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard'; 

const ExploreMore = () => {
  const [discoverProducts, setDiscoverProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const result = await response.json();

        if (!result.success) return;

        // ✅ Only active products
        const activeProducts = result.data.filter(
          (p) => p.isActive === true
        );

        // ✅ Fisher-Yates shuffle
        const shuffled = [...activeProducts];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        setDiscoverProducts(shuffled.slice(0, 8));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white py-16 px-4 md:px-8 max-w-[1440px] mx-auto font-sans">
      
      {/* --- Header Section Updated to match Image_f9e882 --- */}
      <div className="text-center mb-12">
            <h3 className="text-[10px] md:text-3xl py-4 font-playfair font-bold  text-[#E13C6C] ">
          Jaipur Kurti Gharana
          </h3>
        
        {/* Playfair Display font for main heading as requested */}
        <h2 className="text-2xl md:text-5xl font-bold font-playfair text-[#1F1951] mb-6 ">
          Explore More Products
        </h2>
        
        {/* Montserrat font for description text */}
        <p className="text-sm md:text-base text-gray-800 max-w-4xl mx-auto leading-relaxed font-mont font-medium">
          Explore thoughtfully curated styles crafted to elevate every occasion; uncover what inspires you next.
        </p>
      </div>

      {/* --- Products Grid (Max 8 Products) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
        {discoverProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;