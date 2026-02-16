import React from 'react';
import Image from 'next/image';

const commitments = [
  {
    title: "Exceptional Cotton",
    description: "We source only the finest cottons, chosen for their superior softness, breathability, and longevity ensuring every garment offers an elevated wearing experience.",
    image: "/images/commitment/commitment1.png", // Replace with your image paths
  },
  {
    title: "Heritage, Reimagined",
    description: "At Avanta India, centuries-old Indian craftsmanship is thoughtfully reinterpreted through a contemporary lens, resulting in designs that are timeless, refined, and distinctly modern.",
    image: "/images/commitment/commitment2.png",
  },
  {
    title: "Bespoke by Design",
    description: "For those seeking exclusivity, our bespoke customization service offers a personalized approach to luxury crafted with precision, discretion, and uncompromising attention to detail.",
    image: "/images/commitment/commitment3.png",
  }
];

const CommitmentSection = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto bg-white">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold text-[#1a1a3d] uppercase tracking-widest">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-gray-900 uppercase tracking-tight">
          Our Commitment To You
        </h2>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {commitments.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Image Container with Rounded Corners */}
            <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden rounded-xl">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="text-center px-2">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 font-light">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommitmentSection;