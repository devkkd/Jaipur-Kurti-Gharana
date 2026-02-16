import React from 'react';
import Image from 'next/image';

const QualityCommitment = () => {
  const topFeatures = [
    {
      title: "Attention to Details",
      desc: "Every stitch, cut, and finish is intentionally refined.",
      icon: "/images/icon/aboutCom1.png"
    },
    {
      title: "Timeless Craftsmanship",
      desc: "Designs inspired by heritage, tailored for today.",
      icon: "/images/icon/aboutCom2.png"
    },
    {
      title: "Premium Fabrics",
      desc: "Only the finest cottons sourced for superior comfort and durability.",
      icon: "/images/icon/aboutCom3.png"
    }
  ];

  const bottomFeatures = [
    { 
      title: "Custom Manufacturing", 
      desc: "Private label and customization options available for bulk orders.", 
      icon: "/images/icon/Custom.svg" // Assumed path for consistency
    },
    { 
      title: "Flexible MOQ", 
      desc: "Minimum order quantities designed for businesses of all sizes.", 
      icon: "/images/icon/Flexible.svg" 
    },
    { 
      title: "1,000+ Retailers", 
      desc: "Trusted by boutiques & retailers across India & 15+ countries worldwide.", 
      icon: "/images/icon/Retailers.svg" 
    },
    { 
      title: "Global Shipping", 
      desc: "Reliable worldwide delivery with comprehensive export support.", 
      icon: "/images/icon/Global.svg" 
    }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto text-[#1a1a1a]">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-cinzel font-bold tracking-widest uppercase mb-8">
          Our Commitment to Quality
        </h2>
        <div className="max-w-4xl mx-auto space-y-6 text-sm md:text-base leading-relaxed text-black">
          <p>
            At <span className="font-bold">Avanta India</span>, quality is not an attribute—it is our foundation. From selecting premium-grade cottons to executing flawless stitching, every step of our process is guided by precision and purpose.
          </p>
          <p>
            Our skilled artisans and designers work closely in Jaipur to deliver garments that embody elegance, comfort, and longevity. Regardless of order size, our standards remain exacting.
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
            <h3 className="font-bold mb-2 uppercase tracking-tight">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom Features Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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
            <h3 className="font-bold mb-2 text-sm uppercase tracking-tight">{item.title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QualityCommitment;