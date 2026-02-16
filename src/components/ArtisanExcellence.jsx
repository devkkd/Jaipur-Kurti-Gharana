import React from 'react';

const ArtisanExcellence = () => {
  const signatureSkills = [
    "HAND-EMBROIDERED KASHMIRI TILLA WORK.",
    "AUTHENTIC GOTA PATTI CRAFTSMANSHIP FROM RAJASTHAN.",
    "RESPONSIBLE, SUSTAINABLE PRODUCTION PRACTICES.",
    "HERITAGE BANDHANI AND AJRAKH PRINTS.",
    "HANDWOVEN BENARASI SILKS OF EXCEPTIONAL QUALITY.",
    "FAIR-TRADE CERTIFIED PARTNERSHIPS WITH ARTISAN."
  ];

  return (
    <section className="bg-white py-12 px-4">
      {/* Top Section: Text and Image Grid */}
      <div className="max-w-[1341px] mx-auto grid grid-cols-1 lg:grid-cols-2  items-center">
        
        {/* Left Side: Text Content */}
        <div className="space-y-6 ">
          <div className="flex items-center justify-start gap-2 mb-3 md:mb-4">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-pink-600 rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold font-mont  text-[#1a1a3d] uppercase">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-pink-600 rounded-full"></span>
        </div>
          
          <h2 className="text-2xl md:text-4xl sm:py-3 font-cinzel font-bold text-[#1a1a3d] mb-6 uppercase ">
            ARTISAN <br /> EXCELLENCE
          </h2>
          
          <div className="text-black text-sm md:text-base leading-relaxed space-y-4 px-2">
            <p>
              <span className="font-bold">At Avanta India,</span> we preserve and elevate the legacy of Indian craftsmanship. Each garment is an expression of heritage meticulously handcrafted by master artisans whose skills have been refined and passed down through generations.
            </p>
            <p>
              Our creations celebrate the artistry of handwork, from intricate embroidery to refined zardozi detailing, harmoniously paired with contemporary silhouettes. The result is timeless design crafted for the modern connoisseur of Indian fashion.
            </p>
          </div>
        </div>

        {/* Right Side: Image Grid */}
        <div className="grid grid-cols-2">
          {/* Large Vertical Image */}
          <div className="row-span-2">
            <img 
              src="/images/manufacuring/image-29.svg" 
              alt="Artisan at work" 
              className="w-full h-full rounded-l-xl object-cover"
            />
          </div>
          {/* Top Right */}
          <div>
            <img 
              src="/images/manufacuring/image-26.svg" 
              alt="Finished garments" 
              className="w-full h-48 md:h-64 rounded-tr-xl object-cover"
            />
          </div>
          {/* Bottom Right Grid */}
          <div className="grid grid-cols-2">
             <img src="/images/manufacuring/image-27.svg" alt="work" className="w-full h-24 md:h-32 object-cover" />
             <img src="/images/manufacuring/image-24.svg" alt="work" className="w-full h-24 md:h-32 rounded-br-xl object-cover" />
          </div>
        </div>
      </div>

      {/* Bottom Section: Signature Craftsmanship */}
      <div className="mt-24 max-w-5xl mx-auto">
        <h3 className="text-center text-xl md:text-2xl font-bold font-cinzel mb-12 uppercase text-gray-800">
          Signature Craftsmanship Includes
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {signatureSkills.map((skill, index) => (
            <div 
              key={index} 
              className={`p-6 text-center flex flex-col items-center justify-start border-r border-gray-200 
                ${index !== signatureSkills.length - 1 ? 'md:border-r' : ''} min-h-[160px]`}
            >
              <span className="text-xs mb-4">↗</span>
              <p className="text-[10px] font-mont md:text-xs leading-relaxed tracking-widest font-medium text-gray-700 uppercase">
                {skill}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtisanExcellence;