"use client";

import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";

export default function CuratedArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products");
        const result = await response.json();

        if (result.success) {
          setProducts(result.data);
        } else {
          setError(result.error || "Failed to load products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ================= FILTER + SHUFFLE ================= */
  const curatedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    // Filter by New and Active
    const newProducts = products.filter(
      (p) => p.isNew === true && p.isActive === true
    );

    // Fisher-Yates Shuffle
    const shuffled = [...newProducts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Slice 8 products to match the image grid (2 rows of 4)
    return shuffled.slice(0, 8);
  }, [products]);

  /* ================= LOADING/ERROR ================= */
  if (loading) return <div className="py-16 text-center text-gray-500 text-sm">Loading new arrivals...</div>;
  if (error) return <div className="py-16 text-center text-red-500 text-sm">{error}</div>;

  /* ================= RENDER ================= */
  return (
    <div className="bg-white py-16 px-4 md:px-8 font-sans">
      {/* Refined Header - Removed dots and branding as per image_7b8961.png */}
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-5xl font-bold font-playfair text-[#1F1951] mb-6 ">
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

      {/* Grid rendering - Responsive 2x4 grid to show max 8 products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 max-w-[1400px] mx-auto">
        {curatedProducts.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
}