import React from 'react';
import Image from 'next/image';

const commitments = [
  {
    title: "Exceptional Cotton",
    description: "We source only the finest cottons, chosen for their superior softness, breathability, and longevity ensuring every garment offers an elevated wearing experience.",
    image: "/images/about/Cotton.svg", // Replace with your image paths
  },
  {
    title: "Bespoke by Design",
    description: "For those seeking exclusivity, our bespoke customization service offers a personalized approach to luxury crafted with precision, discretion, and uncompromising attention to detail.",
    image: "/images/about/Design.svg",
  },
  {
    title: "Heritage, Reimagined",
    description: "At Jaipur Kurti Gharana, centuries-old Indian craftsmanship is thoughtfully reinterpreted through a contemporary lens, resulting in designs that are timeless, refined, and distinctly modern.",
    image: "/images/about/Heritage.svg",
  }
];

const CommitmentSection = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto bg-white">
      {/* Header Section */}
      <div className="text-center mb-12">
         <h2 className="text-[10px] md:text-2xl py-4 font-playfair font-bold  text-[#E13C6C] ">
          Jaipur Kurti Gharana
          </h2>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-[40px] font-bold font-playfair text-[#0E0E0E] mb-10 ">
 An Enduring Promise of Quality
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
              <h3 className="text-xl font-bold .font-mona text-gray-900 mb-4">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed font-medium .font-mona text-gray-600 font-light">
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