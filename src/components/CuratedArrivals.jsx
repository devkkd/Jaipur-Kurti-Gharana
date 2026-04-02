"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useAppData } from "@/context/AppDataContext";

export default function CuratedArrivals() {
  const { products, loading, error } = useAppData();
  const [curatedProducts, setCuratedProducts] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const newArrivals = products.filter(p => p.isNewArrival && p.isActive);

    // Fisher-Yates shuffle — runs only on client
    const shuffled = [...newArrivals];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setCuratedProducts(shuffled.slice(0, 8));
  }, [products]);

  /* ================= LOADING/ERROR ================= */
  if (loading) return <div className="py-16 text-center text-gray-500 text-sm">Loading new arrivals...</div>;
  if (error) return <div className="py-16 text-center text-red-500 text-sm">{error}</div>;
  if (curatedProducts.length === 0) return null;

  /* ================= RENDER ================= */
  return (
    <div className="bg-white py-7 px-4 md:px-8 font-sans">
      {/* Refined Header - Removed dots and branding as per image_7b8961.png */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold font-playfair text-[#1F1951] mb-3 ">
          New In
        </h2>

        <div className="max-w-4xl mx-auto space-y-1">
          <p className="text-sm md:text-base font-medium text-gray-800 font-mont">
            Discover our latest arrivals introduced five days a week.
          </p>
          <p className="text-sm md:text-base font-medium text-gray-800 font-mont leading-relaxed">
            From Monday through Friday, explore newly launched styles arriving on-site,
            thoughtfully crafted to elevate your wardrobe with refined elegance.
          </p>
        </div>
      </div>

      {/* Grid rendering - Updated to match TheSeasons layout (grid-cols-2 base) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 max-w-[1400px] mx-auto">
        {curatedProducts.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
}