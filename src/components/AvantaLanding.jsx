import React from 'react';
import { Layers, Box, Star, Globe } from 'lucide-react';

const AvantaLanding = () => {
  return (
    <div className="mx-auto  bg-white  text-gray-800">
      {/* Top Section */}
      <div className="max-w-[90rem] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-7 items-center">
        
        {/* Left Content */}
        <div className="space-y-6">
            <div className="flex items-center justify-start gap-2 mb-3 md:mb-4">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-pink-600 rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold font-mont text-[#1a1a3d] uppercase">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-pink-600 rounded-full"></span>
        </div>
        <h2 className="text-2xl md:text-4xl sm:py-3 font-cinzel font-bold text-[#1a1a3d] mb-6 uppercase ">
          ABOUT AVANTA INDIA <br />
          BY JAIPUR KURTI GHARANA
        </h2>  
          <div className="space-y-4 text-black text-sm md:text-base leading-relaxed max-w-xl">
            <p className='font-mont'>
              <span className="font-bold font-mont text-black">Avanta India</span> represents refined Indian fashion, inspired by tradition and improved through modern design. Built on a love for fine craftsmanship, our story draws from Jaipur's rich textile history and how it continues to shape today's style.
            </p>
            <p className='font-mont'>
              Each <span className="font-bold text-black">Avanta</span> piece is carefully selected, from graceful Kurtis and stylish Anarkalis to well-made co-ord sets that show the skill, detail, and spirit of Indian artisans. Every garment is created to look beautiful while offering comfort, confidence, and easy everyday wear.
            </p>
          </div>

          <ul className="space-y-2 text-sm font-bold">
            <li className="flex items-start gap-2 font-mont">
              <span className="mt-1">→</span> At Avanta India, we make clothing that adds confidence through elegance.
            </li>
            <li className="flex items-start gap-2 font-mont">
              <span className="mt-1">→</span> Beautiful Indian fashion, made with care.
            </li>
            <li className="flex items-start gap-2 font-mont">
              <span className="mt-1">→</span> Wholesale and bulk orders available.
            </li>
          </ul>
        </div>

        {/* Right Images */}
        <div className="relative  h-[300px] sm:h-[500px] w-full bg-[#fdf8f1] rounded-2xl overflow-hidden flex">
          <div className="w-full h-full relative">
            {/* Replace with your image paths */}
            <img 
              src="/images/landing.svg" 
              alt="Model in yellow" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* <div className="w-1/2 h-full relative p-4">
            <img 
              src="/path-to-blue-dress.jpg" 
              alt="Model in blue" 
              className="w-full h-full object-cover"
            />
          </div> */}
        </div>
      </div>

      {/* Bottom Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 ">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Feature 1 */}
          <div className="text-center flex flex-col items-center space-y-3">
           
              <img src='/images/icon/Custom.svg' className='w-9 h-9'/>
            
            <h3 className="font-bold font-mont pt-2">Custom Manufacturing</h3>
            <p className="text-xs font-mont  text-black leading-relaxed">
              Private label and customization options available for bulk orders.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center flex flex-col items-center space-y-3">
              <img src='/images/icon/Flexible.svg' className='w-9 h-9'/>
            <h3 className="font-bold font-mont  pt-2">Flexible MOQ</h3>
            <p className="text-xs font-mont  text-black leading-relaxed">
              Minimum order quantities designed for businesses of all sizes.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center flex flex-col items-center space-y-3">
              <img src='/images/icon/Retailers.svg' className='w-9 h-9'/>
            <h3 className="font-bold font-mont ">1,000+ Retailers</h3>
            <p className="text-xs font-mont  text-black leading-relaxed">
              Trusted by boutiques & retailers across <span className="font-bold">India & 15+ countries</span> worldwide.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="text-center flex flex-col items-center space-y-3">
               <img src='/images/icon/Global.svg' className='w-9 h-9'/>
            <h3 className="font-bold font-mont ">Global Shipping</h3>
            <p className="text-xs font-mont  text-black leading-relaxed">
              Reliable worldwide delivery with comprehensive export support.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AvantaLanding;