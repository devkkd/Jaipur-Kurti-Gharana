"use client";

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const TheSeasons = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const result = await response.json();

        if (!result.success) return;

        // Only active products
        const activeProducts = result.data.filter(
          (p) => p.isActive === true
        );

        // Fisher-Yates shuffle
        const shuffled = [...activeProducts];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Updated to 8 products as per requirements
        setFeaturedProducts(shuffled.slice(0, 8));
        setMounted(true);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-w-[1440px] mx-auto bg-white py-16 px-4 md:px-10 font-sans ">
      {/* --- Header Section Updated to match Image_7c6ea0 --- */}
      <div className="text-center mb-12">
        <h3 className="text-[10px] md:text-3xl py-4 font-playfair font-bold  text-[#E13C6C] ">
          Jaipur Kurti Gharana
        </h3>

        <h2 className="text-2xl md:text-5xl font-bold font-playfair text-[#1F1951] mb-6 ">
          This Seasons Most Coveted Jaipur Kurti Gharana Pieces
        </h2>

        <p className="text-sm md:text-base font-medium text-gray-800 font-mont leading-relaxed mx-auto">
          A refined selection of our most sought-after designs, defined by craftsmanship, elegance, and contemporary appeal.
        </p>
      </div>

      {/* --- Products Grid (Max 8 Products) --- */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
        {featuredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TheSeasons;