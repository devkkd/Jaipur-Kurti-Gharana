"use client";

import React from "react";
import Link from "next/link";
import mainCategories from "@/data/MainCategory.json";

const ExclusiveCollections = () => {
  // Only active categories & sort them
  const activeCategories = mainCategories
    .filter((item) => item.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // Categories mapping based on the image layout
  const categoriesTop = activeCategories.slice(0, 2);
  const categoriesBottom = activeCategories.slice(2, 6);

  return (
    <section className="relative w-full bg-white overflow-hidden py-12 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row items-start">
          
          {/* Left Side: Header and Category Grids */}
          <div className="w-full lg:w-[70%] z-10">
            
            {/* Top Row: Header + 2 Categories */}
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              
              {/* Header Info */}
              <div className="md:w-1/3 lg:w-2/5">
          <h3 className="text-[10px] md:text-3xl py-4 font-playfair font-bold  text-[#E13C6C] ">
                  Jaipur Kurti Gharana
                </h3>
        <h2 className="text-2xl md:text-5xl font-bold font-playfair text-[#1F1951] mb-6 ">
                  Exclusive<br />Collections
                </h2>
                <p className="text-gray-800 font-mont font-medium text-sm md:text-base mb-8 max-w-[280px] leading-relaxed">
                  Thoughtfully Designed Ethnic Wear for Select Retail Partners
                </p>

              </div>

              {/* Top 2 Category Cards */}
              <div className="md:w-2/3 lg:w-3/5 grid grid-cols-2 gap-4 md:gap-6">
                {categoriesTop.map((item) => (
                  <Link key={item._id} href={`/category/${item.slug}`} className="group">
                    <div className="overflow-hidden rounded-[2rem] mb-4 aspect-[3/4.2] shadow-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <h3 className="font-mont font-bold text-[11px] md:text-xs tracking-widest uppercase text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="font-mont font-bold text-[9px] md:text-[10px] text-gray-400 uppercase tracking-tighter group-hover:text-[#DE3163] transition-colors">
                      See All →
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Row: 4 Category Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
              {categoriesBottom.map((item) => (
                <Link key={item._id} href={`/category/${item.slug}`} className="group">
                  <div className="overflow-hidden rounded-[2rem] mb-4 aspect-[3/4.2] shadow-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="font-mont font-bold text-[11px] md:text-xs tracking-widest uppercase text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="font-mont font-bold text-[9px] md:text-[10px] text-gray-400 uppercase tracking-tighter group-hover:text-[#DE3163] transition-colors">
                    See All →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side: High-Resolution Overflow Model Background */}
          <div className="hidden lg:block lg:absolute right-0 top-0 h-full w-[45%] pointer-events-none">
            <img
              src="/images/exclusive/exlusive-bg.svg" // Use the high-res cutout of the model in the tiered dress
              alt="Exclusive Model"
              className="h-full w-full object-contain object-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveCollections;