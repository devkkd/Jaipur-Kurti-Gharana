import React from 'react';

const Wholesale = () => {
  return (
    <section className="py-16 px-4 bg-white font-serif">
      <div className="max-w-6xl mx-auto text-center">
        {/* Brand Name */}
         <h2 className="text-[10px] md:text-2xl py-4 font-playfair font-bold  text-[#E13C6C] ">
          Jaipur Kurti Gharana
          </h2>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-[40px] font-bold font-playfair text-[#0E0E0E] mb-10 ">
 Engineered for Wholesale Success
        </h2>

        {/* First Paragraph */}
        <p className="text-[#333] font-mona text-sm md:text-base leading-relaxed mb-4 max-w-5xl mx-auto ">
          <span className="font-semibold">At Jaipur Kurti Gharana</span>,  our strength lies in high-volume manufacturing executed with uncompromising quality standards.
        </p>

        {/* Second Paragraph */}
        <p className="text-[#333] font-mona text-sm md:text-base leading-relaxed mb-4 max-w-5xl mx-auto">
         Whether you are curating a seasonal collection, stocking a boutique, or fulfilling large-scale retail requirements, we deliver scalable solutions without compromising craftsmanship, fit consistency, or fabric integrity.
        </p>

        {/* Third Paragraph */}
        <p className="text-[#333] font-mona text-sm md:text-base leading-relaxed max-w-5xl mx-auto">
         Every design is subjected to rigorous quality controls—from fabric sourcing to final finishing—ensuring garments that present refined aesthetics, offer a luxurious hand feel, and maintain durability through repeated wear.
        </p>
      </div>

       <div className="bg-[#E13C6C] rounded-2xl py-8 md:py-12 mt-2 sm:mt-12">
        <h2 className="text-white text-center text-2xl md:text-4xl font-medium tracking-[0.2em] uppercase px-4">
          Made with Care, Crafted in Jaipur
        </h2>
      </div>
    </section>
  );
};

export default Wholesale;
