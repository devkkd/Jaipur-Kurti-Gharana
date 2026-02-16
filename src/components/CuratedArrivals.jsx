"use client";

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import productData from "@/data/productData.json";

const CuratedArrivals = () => {
  const [curatedProducts, setCuratedProducts] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!productData?.products) return;

    // Filter only active products
    const activeProducts = productData.products.filter(p => p.active);

    // Shuffle and pick 4
    const shuffled = [...activeProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    
    setCuratedProducts(shuffled);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white py-16 px-4 md:px-8 font-sans">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-1.5 w-1.5 bg-[#DE3163] rounded-full"></span>
            <h3 className="text-xs md:text-[13px] font-bold tracking-wider text-[#1a1a3d] uppercase">
              Avanta by Jaipur Kurti Gharana
            </h3>
            <span className="h-1.5 w-1.5 bg-[#DE3163] rounded-full"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-[#1a1a1a] mb-6 uppercase tracking-tight">
            Curated New Arrivals
          </h2>
          <p className="text-sm md:text-[15px] font-normal text-gray-700 leading-relaxed max-w-3xl mx-auto font-mont">
            Discover our latest arrivals introduced five days a week.<br className="hidden md:block" />
            From Monday through Friday, explore newly launched styles arriving on-site.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto min-h-[400px]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 px-4 md:px-8 font-sans">
      {/* Branding & Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-1.5 w-1.5 bg-[#DE3163] rounded-full"></span>
          <h3 className="text-xs md:text-[13px] font-bold tracking-wider text-[#1a1a3d] uppercase">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 bg-[#DE3163] rounded-full"></span>
        </div>

        <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-[#1a1a1a] mb-6 uppercase tracking-tight">
          Curated New Arrivals
        </h2>

        <p className="text-sm md:text-[15px] font-normal text-gray-700 leading-relaxed max-w-3xl mx-auto font-mont">
          Discover our latest arrivals introduced five days a week.<br className="hidden md:block" />
          From Monday through Friday, explore newly launched styles arriving on-site.
        </p>
      </div>

      {/* Grid rendering using real JSON data */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
        {curatedProducts.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
      
    </div>
  );
};

export default CuratedArrivals;