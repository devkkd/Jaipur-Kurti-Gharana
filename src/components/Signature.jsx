import React from 'react';

const Embrace = () => {
  return (
    <section className="bg-white py-16 px-6 md:py-24 font-sans">
      <div className="max-w-[90rem] mx-auto">
        
        {/* Header Content Section - Centered per image */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          {/* Brand Tagline - font-mont */}
          <h3 className="text-[10px] md:text-3xl py-4 font-playfair font-bold  text-[#E13C6C] ">
            Jaipur Kurti Gharana
          </h3>

          {/* Main Heading - font-playfair */}
        <h2 className="text-2xl md:text-5xl font-bold font-playfair text-[#1F1951] mb-6 ">
            A Signature of Timeless Style
          </h2>

          {/* Description - font-mont */}
          <div className="space-y-6 text-gray-800 text-sm md:text-base font-mont font-medium leading-relaxed max-w-4xl mx-auto">
            <p>
              Enter a world of understated luxury with <span className="font-bold">Jaipur Kurti Gharana</span>, 
              where timeless refinement meets contemporary sensibility. Each collection is thoughtfully crafted with 
              meticulous attention to detail, uncompromising quality, and an enduring respect for Indian craftsmanship.
            </p>
            <p>
              Discover elevated designs that redefine everyday dressing while retaining lasting appeal. 
              Whether curated for personal wardrobes or discerning retail assortments, 
              <span className="font-bold"> Jaipur Kurti Gharana</span> offers elegance designed to endure.
            </p>
          </div>
        </div>

        {/* Full-Width Image Gallery Section */}
        <div className="grid grid-cols-1 gap-4 md:gap-0">
          <div className="relative h-[400px] md:h-[650px] overflow-hidden">
            <img 
              src="/images/group1.png" 
              alt="Blue floral dress"
              className="w-full h-full object-cover object-center"
            />
          </div>
          
        </div>
        
      </div>
    </section>
  );
};

export default Embrace;