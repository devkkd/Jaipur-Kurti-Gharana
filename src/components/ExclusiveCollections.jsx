"use client";

import React from "react";
import Link from "next/link";
import { useAppData } from "@/context/AppDataContext";

const ExclusiveCollections = () => {
  const { categories, loading } = useAppData();

  const categoriesTop = categories.slice(0, 2);
  const categoriesBottom = categories.slice(2, 6);
  const allCategories = categories.slice(0, 6);

  if (loading && categories.length === 0) {
    return <div className="py-20 text-center font-mont">Loading Collections...</div>;
  }

  return (
    <section
      className="relative w-full overflow-hidden py-8 lg:py-12 bg-white lg:bg-cover lg:bg-center lg:bg-no-repeat exclusive-section"
      style={{
        backgroundImage: 'url("/images/banner/ExclusiveBanner.png")',
      }}
    >
      <div className="absolute inset-0 bg-white/10 pointer-events-none hidden lg:block" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header — always visible */}
        <div className="mb-6 lg:hidden">
          <h3 className="text-[12px] font-bold font-playfair text-[#E13C6C] tracking-[0.2em] mb-2">
            Jaipur Kurti Gharana
          </h3>
          <h2 className="text-3xl font-bold font-playfair text-[#1F1951] mb-3 leading-tight">
            Exclusive Collections
          </h2>
          <p className="text-gray-900 font-mont font-medium text-sm leading-relaxed">
            Thoughtfully Designed Ethnic Wear for Select Retail Partners
          </p>
        </div>

        {/* Mobile: 2-col grid for all categories */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {allCategories.map((item) => (
            <Link key={item._id} href={`/store/${item.slug}`} className="group">
              <div className="overflow-hidden rounded-[2rem] mb-3 aspect-[3/3.6] shadow-xl border border-white/20">
                <img
                  src={item.subcategories?.[0]?.image || "/images/placeholder.png"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h3 className="font-mont font-bold text-[12px] tracking-widest uppercase text-[#1F1951] mb-1 text-center">
                {item.name}
              </h3>
            </Link>
          ))}
        </div>

        {/* Desktop: original layout */}
        <div className="hidden lg:flex flex-row items-start">

          {/* Left Side: Header and Category Grids */}
          <div className="w-[75%]">

            {/* Top Row: Header + 2 Categories */}
            <div className="flex flex-row gap-5 mb-6">

              {/* Header Info */}
              <div className="w-2/5">
                <h3 className="text-[10px] md:text-2xl font-bold font-playfair text-[#E13C6C]  mb-4">
                  Jaipur Kurti Gharana
                </h3>
                <h2 className="text-5xl font-bold font-playfair text-[#1F1951] mb-6 leading-tight">
                  Exclusive<br />Collections
                </h2>
                <p className="text-gray-900 font-mont font-medium text-base mb-8 max-w-[320px] leading-relaxed">
                  Thoughtfully Designed Ethnic Wear for Select Retail Partners
                </p>
              </div>

              {/* Top 2 Category Cards */}
              <div className="w-3/5 grid grid-cols-2 gap-5 mx-10">
                {categoriesTop.map((item) => (
                  <Link key={item._id} href={`/store/${item.slug}`} className="group">
                    <div className="overflow-hidden rounded-[2rem] mb-3 aspect-[3/3.6] shadow-xl border border-white/20">
                      <img
                        src={item.subcategories?.[0]?.image || "/images/placeholder.png"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <h3 className="font-mont font-bold text-sm tracking-widest uppercase text-[#1F1951] mb-1 text-center">
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
            <div className="grid grid-cols-4 gap-5">
              {categoriesBottom.map((item) => (
                <Link key={item._id} href={`/store/${item.slug}`} className="group">
                  <div className="overflow-hidden rounded-[2rem] mb-3 aspect-[3/3.6] shadow-xl border border-white/20">
                    <img
                      src={item.subcategories?.[0]?.image || "/images/placeholder.png"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="font-mont font-bold text-sm tracking-widest uppercase text-[#1F1951] mb-1 text-center">
                    {item.name}
                  </h3>
                  <p className="font-mont font-bold text-[10px] text-[#E13C6C] uppercase text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Spacer for Right Side */}
          <div className="w-[25%]"></div>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveCollections;