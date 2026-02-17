import React from 'react';

const AvantaLanding = () => {
  return (
    <div 
      className="relative mx-auto text-gray-800 overflow-hidden"
      style={{
        // Layering: Pattern on top, then the solid color gradient, then the 180deg gradient
        backgroundImage: `
          url("/images/pattern.png"),
          linear-gradient(0deg, #F9F8FF, #F9F8FF),
          linear-gradient(180deg, #FFECF2 0%, #FFD3E1 100%)
        `,
        backgroundRepeat: 'repeat, no-repeat, no-repeat',
        backgroundSize: 'auto, cover, cover',
        backgroundBlendMode: 'multiply' // This helps the pattern blend naturally with the pink/white gradients
      }}
    >
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 py-16 md:py-24">
        
        {/* Top Centered Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-[10px] md:text-3xl py-4 font-playfair font-bold  text-[#E13C6C] ">
            Jaipur Kurti Gharana
          </h3>
        <h2 className="text-2xl md:text-5xl font-bold font-playfair text-[#1F1951] mb-6 ">
            Crafted Heritage Elevated Luxury
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Left Content */}
          <div className="space-y-6 max-w-xl">
            <div className="space-y-5 text-black text-sm md:text-base leading-relaxed">
              <p className="font-mont">
                <span className="font-bold">Jaipur Kurti Gharana</span> is a celebration of refined Indian fashion deeply rooted in heritage and elevated through thoughtful design.
              </p>
              <p className="font-mont">
                Born from a profound respect for artisanal excellence, our story draws inspiration from Jaipur's rich textile legacy and its timeless dialogue with modern aesthetics.
              </p>
              <p className="font-mont">
                Each creation is meticulously curated, from graceful kurtis and elegant Anarkalis to impeccably crafted co-ord sets.
              </p>
              <p className="font-mont italic">
                Every piece reflects the artistry, precision, and cultural depth that define Indian craftsmanship at its finest.
              </p>
              <p className="font-mont">
                Designed with intention, our collections seamlessly balance aesthetic sophistication with comfort, confidence, and effortless wearability crafted for today, yet timeless in appeal.
              </p>
            </div>

            <ul className="space-y-3 text-sm font-bold pt-4">
              <li className="flex items-center gap-2 font-mont">
                <span className="text-lg">→</span> Clothing that empowers through elegance
              </li>
              <li className="flex items-center gap-2 font-mont">
                <span className="text-lg">→</span> Exquisite Indian fashion, thoughtfully crafted
              </li>
              <li className="flex items-center gap-2 font-mont">
                <span className="text-lg">→</span> Wholesale and bulk orders available
              </li>
            </ul>
          </div>

          {/* Right Image Card */}
          <div className="relative h-[400px] md:h-[550px] w-full bg-[#fdf8f1] rounded-[40px] overflow-hidden shadow-xl border-4 border-white/50">
            <img 
              src="/images/landing.svg" 
              alt="Jaipur Kurti Gharana Collection" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Features Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative border-t border-gray-200/50 pt-12">
          
          {/* Feature 1 */}
          <div className="text-center flex flex-col items-center px-4">
            <div className="mb-4">
               <img src='/images/icon/Custom.png' alt="Custom" className='w-10 h-10'/>
            </div>
            <h3 className="font-bold font-mont text-sm mb-2">Custom Manufacturing</h3>
            <p className="text-[11px] font-mont text-gray-700 leading-normal">
              Private label and customization options available for bulk orders.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center flex flex-col items-center px-4 border-l border-gray-300/50">
            <div className="mb-4">
              <img src='/images/icon/Flexible.png' alt="Flexible" className='w-10 h-10'/>
            </div>
            <h3 className="font-bold font-mont text-sm mb-2">Flexible MOQ</h3>
            <p className="text-[11px] font-mont text-gray-700 leading-normal">
              Minimum order quantities designed for businesses of all sizes.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center flex flex-col items-center px-4 border-l border-gray-300/50">
            <div className="mb-4">
              <img src='/images/icon/Retailers.png' alt="Retailers" className='w-10 h-10'/>
            </div>
            <h3 className="font-bold font-mont text-sm mb-2">1,000+ Retailers</h3>
            <p className="text-[11px] font-mont text-gray-700 leading-normal">
              Trusted by boutiques & retailers across <span className="font-bold">India & 15+ countries</span> worldwide.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="text-center flex flex-col items-center px-4 border-l border-gray-300/50">
            <div className="mb-4">
              <img src='/images/icon/Global.png' alt="Global" className='w-10 h-10'/>
            </div>
            <h3 className="font-bold font-mont text-sm mb-2">Global Shipping</h3>
            <p className="text-[11px] font-mont text-gray-700 leading-normal">
              Reliable worldwide delivery with comprehensive export support.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AvantaLanding;