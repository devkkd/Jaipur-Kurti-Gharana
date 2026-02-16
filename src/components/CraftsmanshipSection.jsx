"use client"
import React from 'react';

const CraftsmanshipSection = () => {
  const features = [
    {
      title: "Handcrafted in Jaipur",
      description: "Tradition woven into every thread, meticulously made by hand.",
      // Referencing the path provided
      icon: "images/icon/crafticon1.png"
    },
    {
      title: "Ethical Craftsmanship",
      description: "Created with integrity, guided by values at every stage of the process.",
      icon: "images/icon/crafticon2.png"
    },
    {
      title: "Jaipur Handblock Textiles",
      description: "Pure Jaipur craft, rooted in heritage, luxurious to wear.",
      icon: "images/icon/crafticon3.png"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header Section */}
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold text-[#1a1a3d] uppercase tracking-widest">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
        </div>

        <h2 className="text-2xl md:text-4xl font-cinzel font-bold text-[#1A1A1A] mb-16 tracking-tight uppercase">
          The Art of Thoughtful Craftsmanship
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {features.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center px-8 md:px-12 ${
                index !== features.length - 1 ? 'md:border-r border-gray-200' : ''
              }`}
            >
              {/* Image Icon Implementation */}
              <div className="mb-6">
                <img 
                  src={item.icon} 
                  alt={item.title} 
                  className="w-12 h-12 md:w-24 md:h-24 object-contain"
                  // Error handling in case image doesn't load
                  onError={(e) => { e.target.style.display = 'none'; }} 
                />
              </div>
              
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-[250px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;