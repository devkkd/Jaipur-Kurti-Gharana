import React from 'react';

const SignatureCraft = () => {
  return (
    <section className="py-16 px-4 bg-white font-serif">
      <div className="max-w-6xl mx-auto text-center">
        {/* Brand Name */}
        <h2 className="text-[10px] md:text-2xl py-4 font-playfair font-bold  text-[#E13C6C] ">
          Jaipur Kurti Gharana
          </h2>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-[40px] font-bold font-playfair text-[#0E0E0E] mb-6 ">
      Defining Our Signature Craft
        </h2>
        {/* Features Container */}
        <div className="flex  flex-col md:flex-row items-stretch justify-center gap-1 my-10">
          
          {/* Left Card */}
          <div className="flex-1 bg-[#FFF9FA]  px-8 py-5  flex items-center justify-center rounded-2xl  hover:bg-[#E13C6C] transition-all duration-500 ease-in-out group hover:shadow-xl">
            <p className="text-[#333]  group-hover:text-white text-sm md:text-base leading-relaxed max-w-[370px] transition-colors duration-500">
              Hand-embroidered Kashmiri Tilla Work And Authentic Rajasthani Gota Patti Craftsmanship.
            </p>
          </div>

          {/* Center Card (Highlighted) */}
          <div className="flex-1 bg-[#FFF9FA] px-8 py-5  flex items-center justify-center rounded-2xl  hover:bg-[#E13C6C] transition-all duration-500 ease-in-out group  hover:shadow-xl">
            <p className="text-[#333]  group-hover:text-white text-sm md:text-base leading-relaxed max-w-[370px] transition-colors duration-500">
              Heritage Bandhani And Ajrakh Prints Created Through Responsible, Sustainable Production Practices.
            </p>
          </div>

          {/* Right Card */}
          <div className="flex-1 bg-[#FFF9FA]  px-8 py-5 flex items-center justify-center rounded-2xl  hover:bg-[#E13C6C] transition-all duration-500 ease-in-out group hover:shadow-xl">
            <p className="text-[#333] group-hover:text-white text-sm md:text-base leading-relaxed max-w-[370px] transition-colors duration-500">
              Exceptional Handwoven Benarasi Silks, Crafted Through Fair-trade Partnerships With Master Artisans.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SignatureCraft;