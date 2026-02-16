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
          setProducts(result.data); // IMPORTANT: data array yahan hai
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

    // ✅ Only isNewArrival + isActive
    const newProducts = products.filter(
      (p) => p.isNewArrival === true && p.isActive === true
    );

    // ✅ Fisher-Yates Shuffle
    const shuffled = [...newProducts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, 4);
  }, [products]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500 text-sm">Loading new arrivals...</p>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  /* ================= RENDER ================= */
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
}
