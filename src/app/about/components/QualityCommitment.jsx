import React from 'react';
import Image from 'next/image';

const QualityCommitment = () => {
  const topFeatures = [
    {
      title: "Attention to Details",
      desc: "Every stitch, cut, and finish is intentionally refined.",
      icon: "/images/about/Group.svg"
    },
    {
      title: "Timeless Craftsmanship",
      desc: "Designs inspired by heritage, tailored for today.",
      icon: "/images/about/Vector.svg"
    },
    {
      title: "Premium Fabrics",
      desc: "Only the finest cottons sourced for superior comfort and durability.",
      icon: "/images/about/fabric.svg"
    }
  ];

  const bottomFeatures = [
    { 
      title: "Custom Manufacturing", 
      desc: "Private label and customization options available for bulk orders.", 
      icon: "/images/about/1.svg" // Assumed path for consistency
    },
    { 
      title: "Flexible MOQ", 
      desc: "Minimum order quantities designed for businesses of all sizes.", 
      icon: "/images/about/2.svg" 
    },
    { 
      title: "1,000+ Retailers", 
      desc: "Trusted by boutiques & retailers across India & 15+ countries worldwide.", 
      icon: "/images/about/3.svg" 
    },
    { 
      title: "Global Shipping", 
      desc: "Reliable worldwide delivery with comprehensive export support.", 
      icon: "/images/about/4.svg" 
    }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto text-[#1a1a1a]">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-[10px] md:text-2xl py-4 font-playfair font-bold  text-[#E13C6C] ">
          Jaipur Kurti Gharana
          </h2>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-[40px] font-bold font-playfair text-[#0E0E0E] mb-10 ">
   An Uncompromising Standard of Quality
        </h2>
        <div className="max-w-6xl mx-auto  space-y-6 text-sm  leading-relaxed text-black">
          <p>
           <span className="font-bold">At Jaipur Kurti Gharana</span>, quality is not merely a benchmark it is the cornerstone of everything we create. From the careful selection of premium-grade fabrics to precision-driven stitching and finishing, every stage of our process is executed with intention and rigor
          </p>
          <p>
           Our artisans and designers work in close collaboration in Jaipur to craft garments that reflect refined elegance, lasting comfort, and enduring performance. Irrespective of order volume, our standards remain consistently exacting.
          </p>
        </div>
      </div>

      {/* Top Features Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-b border-gray-100 pb-12">
        {topFeatures.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center px-4 md:border-r last:border-0 border-gray-200">
            <div className="relative w-12 h-12 mb-4">
              <Image 
                src={item.icon} 
                alt={item.title} 
                fill 
                className="object-contain" 
              />
            </div>
            <h3 className="font-bold  mb-2 font-mona ">{item.title}</h3>
            <p className="text-sm text-gray-700 font-mona font-medium mx-5">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom Features Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 ">
        {bottomFeatures.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center px-4 md:border-r last:border-0 border-gray-200">
            <div className="relative w-8 h-8 mb-4">
              <Image 
                src={item.icon} 
                alt={item.title} 
                fill 
                className="object-contain" 
              />
            </div>
            <h3 className="font-bold  mb-2 font-mona ">{item.title}</h3>
            <p className="text-sm text-gray-700 font-mona font-medium mx-5">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QualityCommitment;