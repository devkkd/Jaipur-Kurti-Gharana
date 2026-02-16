"use client";

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const RefinedSelection = () => {
  const [refinedProducts, setRefinedProducts] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setMounted(true);

        const response = await fetch("/api/products");
        const result = await response.json();

        if (!result.success) return;

        // ✅ Only active products
        const activeProducts = result.data.filter(
          (p) => p.isActive === true
        );

        // ✅ Proper Fisher-Yates shuffle
        const shuffled = [...activeProducts];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        setRefinedProducts(shuffled.slice(0, 8));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

if (!mounted) {
  return (
    <div className="bg-white py-16 px-4 md:px-8 max-w-[1440px] mx-auto font-sans">
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <p className="text-sm md:text-base font-medium text-gray-800 leading-relaxed font-mont">
          A refined selection of our most sought-after designs, defined by craftsmanship, elegance, and contemporary appeal.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 min-h-[400px]"></div>
    </div>
  );
}

return (
  <div className="bg-white py-16 px-4 md:px-8 max-w-[1440px] mx-auto font-sans">
    <div className="text-center mb-12 max-w-4xl mx-auto">
      <p className="text-sm md:text-base font-medium text-gray-800 leading-relaxed font-mont">
        A refined selection of our most sought-after designs, defined by craftsmanship, elegance, and contemporary appeal.
      </p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
      {refinedProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  </div>
);
};

export default RefinedSelection;
