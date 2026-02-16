
"use client";

import React from 'react';
import Link from 'next/link';

const ExclusiveCollections = () => {
  const categoriesTop = [
    { title: "SUITS SETS", img: "/images/exclusive/1.svg" },
    { title: "KURTI SET", img: "/images/exclusive/2.svg" },
  ];

  const categoriesBottom = [
    { title: "ANARKALI SETS", img: "/images/exclusive/3.svg" },
    { title: "TUNICS SET", img: "/images/exclusive/4.svg" },
    { title: "GOWN", img: "/images/exclusive/5.svg" },
    { title: "CO-ORD SETS", img: "/images/exclusive/6.svg" },
  ];

  return (
    <section className="relative w-full bg-white">
      {/* Main Container - Matches your image dimensions */}
      <div className="relative w-full max-w-[1920px] mx-auto min-h-[800px] lg:min-h-[900px] xl:min-h-[1000px] 2xl:min-h-[1080px]">
        
        {/* Background Image - Desktop */}
        <div className="hidden lg:block absolute top-0 right-0 w-full h-full z-0">
          <div className="relative w-full h-full">
            <img 
              src="/images/exclusive/exlusive-bg.svg" 
              alt="Main Model Background" 
              className="absolute right-0 top-0 h-full w-auto max-w-none"
              style={{ 
                objectFit: 'contain',
                objectPosition: 'right center',
                minWidth: '60%',
              }}
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full h-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 sm:py-10 lg:py-12 xl:py-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 h-full">
            
            {/* Left Content */}
            <div className="w-full lg:w-[60%] xl:w-[55%] 2xl:w-7/8 flex flex-col justify-between">
              
              {/* Top Row - Header + 2 Cards */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12 mb-8 lg:mb-12">
                
                {/* Header Section */}
                <div className="w-full lg:w-2/5 xl:w-1/2">
                  <h4 className="text-[#D14D72] font-semibold text-sm sm:text-base lg:text-lg mb-2 tracking-wide">
                    Jaipur Kurti Gharana
                  </h4>
                  <h1 className="font-serif font-bold text-[#1a1a1a] leading-tight mb-4 sm:mb-6 text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
                    Exclusive<br />Collections
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-6 lg:mb-8 max-w-[280px] leading-relaxed">
                    Thoughtfully Designed Ethnic Wear for Select Retail Partners
                  </p>
                  <Link href="/store">
                    <button className="bg-black text-white px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-3.5 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-all font-medium text-sm sm:text-base group">
                      See All <span className="group-hover:translate-x-1 transition-transform text-lg sm:text-xl">→</span>
                    </button>
                  </Link>
                </div>

                {/* 2 Big Cards */}
                <div className="w-full lg:w-3/5 xl:w-1/2">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                    {categoriesTop.map((item, i) => (
                      <div key={i} className="group cursor-pointer">
                        <div className="overflow-hidden rounded-xl sm:rounded-2xl mb-2 sm:mb-3 aspect-[3.5/5] shadow-lg hover:shadow-xl transition-shadow">
                          <img 
                            src={item.img} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          />
                        </div>
                        <h3 className="font-bold text-[10px] sm:text-xs tracking-wide text-gray-900">{item.title}</h3>
                        <p className="text-[8px] sm:text-[10px] font-bold text-gray-500 mt-0.5 sm:mt-1 uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                          See All <span className="text-[10px] sm:text-xs">→</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom 4 Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mt-auto">
                {categoriesBottom.map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="overflow-hidden rounded-xl sm:rounded-2xl mb-2 sm:mb-3 aspect-[3.5/5] shadow-lg hover:shadow-xl transition-shadow">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                    </div>
                    <h3 className="font-bold text-[10px] sm:text-xs tracking-wide text-gray-900">{item.title}</h3>
                    <p className="text-[8px] sm:text-[10px] font-bold text-gray-500 mt-0.5 sm:mt-1 uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                      See All <span className="text-[10px] sm:text-xs">→</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Spacer - Only on Desktop */}
            <div className="hidden lg:block lg:w-[40%] xl:w-[45%] 2xl:w-[50%]"></div>
          </div>
        </div>

        {/* Mobile Background Image */}
        <div className="lg:hidden w-full mt-8 px-4 sm:px-6">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden">
            <img 
              src="/images/exclusive/exlusive-bg.svg" 
              alt="Main Model" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveCollections;