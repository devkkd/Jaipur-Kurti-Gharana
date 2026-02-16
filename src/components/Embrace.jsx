import React from 'react';
import Image from 'next/image';

const Embrace = () => {
  return (
    <section className="flex flex-col md:flex-row items-stretch min-h-[600px] max-w-[90rem] mx-auto bg-white font-sans">
      
      {/* Left Content Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-12">
        {/* Brand Tagline */}
        <div className="flex items-center justify-start gap-2 mb-3 md:mb-4">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold text-[#1a1a3d] uppercase tracking-widest">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-cinzel font-bold text-gray-900 leading-tight mb-8">
          EMBRACE EFFORTLESS <br /> ELEGANCE
        </h1>

        {/* Description */}
        <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed ">
          <p>
            Step into a world of understated luxury with Avanta India. Our collections bring 
            together classic refinement and contemporary design, each piece crafted with 
            meticulous attention to detail and uncompromising quality.
          </p>
          <p>
            Discover thoughtfully designed styles that elevate everyday dressing while offering 
            timeless appeal. Whether for personal wear or curated retail selections, Avanta India 
            delivers elegance that endures.
          </p>
        </div>

        {/* Bullet Points */}
        <ul className="mt-8 space-y-2">
          <li className="flex items-center text-sm font-semibold text-gray-800">
            <span className="mr-2">✦</span> Elevate your style. Elevate your business.
          </li>
          <li className="flex items-center text-sm font-semibold text-gray-800">
            <span className="mr-2">✦</span> Wholesale and bulk orders welcomed.
          </li>
        </ul>

        {/* CTA Button */}
        <button className="mt-10 w-fit bg-[#1e1b4b] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all flex items-center gap-2">
          SEE ALL PRODUCTS <span>→</span>
        </button>
      </div>

      {/* Right Image Side */}
      <div className="w-full md:w-1/2 relative flex">
        {/* Left Dress Image */}
        <div className="w-full relative sm:h-[500px] md:h-auto border-r border-white">
          <img 
            src="/images/group1.png" // Apni image ka path yahan dalein
            alt="Blue Dress"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </section>
  );
};

export default Embrace;