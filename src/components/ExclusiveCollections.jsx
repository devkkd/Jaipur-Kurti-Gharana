"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const ExclusiveCollections = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from the same API used in the Header
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const result = await response.json();
        if (result.success) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Split categories for the specific grid layout
  const categoriesTop = categories.slice(0, 2);
  const categoriesBottom = categories.slice(2, 6);

  if (loading && categories.length === 0) {
    return <div className="py-20 text-center font-mont">Loading Collections...</div>;
  }

  return (
    <section 
      className="relative w-screen overflow-hidden py-12 lg:py-24 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/images/banner/ExclusiveBanner.png")', // Updated path
      }}
    >
      {/* Optional: Add a light overlay if the background makes text hard to read */}
      <div className="absolute inset-0 bg-white/10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row items-start">
          
          {/* Left Side: Header and Category Grids */}
          <div className="w-full lg:w-[75%]">
            
            {/* Top Row: Header + 2 Categories */}
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              
              {/* Header Info */}
              <div className="md:w-1/3 lg:w-2/5">
                <h3 className="text-[12px] md:text-sm font-bold font-mont text-[#E13C6C] uppercase tracking-[0.2em] mb-4">
                  Jaipur Kurti Gharana
                </h3>
                <h2 className="text-3xl md:text-6xl font-bold font-playfair text-[#1F1951] mb-6 leading-tight">
                  Exclusive<br />Collections
                </h2>
                <p className="text-gray-900 font-mont font-medium text-sm md:text-base mb-8 max-w-[320px] leading-relaxed">
                  Thoughtfully Designed Ethnic Wear for Select Retail Partners
                </p>
                <Link href="/store">
                  <button className="bg-[#1F1951] text-white font-mont font-bold text-xs uppercase tracking-widest px-10 py-4 rounded-full hover:bg-[#E13C6C] transition-all shadow-lg">
                    See All Collections →
                  </button>
                </Link>
              </div>

              {/* Top 2 Category Cards */}
              <div className="md:w-2/3 lg:w-3/5 grid grid-cols-2 gap-4 md:gap-8">
                {categoriesTop.map((item) => (
                  <Link key={item._id} href={`/store/${item.slug}`} className="group">
                    <div className="overflow-hidden rounded-[2.5rem] mb-5 aspect-[3/4.2] shadow-xl border border-white/20">
                      <img
                        src={item.subcategories?.[0]?.image || "/images/placeholder.png"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <h3 className="font-mont font-bold text-[12px] md:text-sm tracking-widest uppercase text-[#1F1951] mb-1 text-center">
                      {item.name}
                    </h3>
                    <p className="font-mont font-bold text-[10px] text-[#E13C6C] uppercase text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore →
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Row: 4 Category Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8">
              {categoriesBottom.map((item) => (
                <Link key={item._id} href={`/store/${item.slug}`} className="group">
                  <div className="overflow-hidden rounded-[2.5rem] mb-5 aspect-[3/4.2] shadow-xl border border-white/20">
                    <img
                      src={item.subcategories?.[0]?.image || "/images/placeholder.png"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="font-mont font-bold text-[12px] md:text-sm tracking-widest uppercase text-[#1F1951] mb-1 text-center">
                    {item.name}
                  </h3>
                  <p className="font-mont font-bold text-[10px] text-[#E13C6C] uppercase text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Spacer for Right Side where background focal point usually sits */}
          <div className="hidden lg:block lg:w-[25%]"></div>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveCollections;