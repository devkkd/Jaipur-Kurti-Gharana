import React from 'react';

const AvantaLanding = () => {
  return (
    <div 
      className="relative mx-auto text-gray-800 overflow-hidden"
      style={{
        backgroundImage: `
          url("/images/pattern.png"),
          linear-gradient(0deg, #F9F8FF, #F9F8FF),
          linear-gradient(180deg, #FFECF2 0%, #FFD3E1 100%)
        `,
        backgroundRepeat: 'repeat, no-repeat, no-repeat',
        backgroundSize: 'auto, cover, cover',
        backgroundBlendMode: 'multiply'
      }}
    >
      <div className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 py-8">
        
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h3 className="text-sm md:text-2xl font-playfair font-bold text-[#E13C6C] mb-1">
            Jaipur Kurti Gharana
          </h3>
          <h2 className="text-2xl md:text-4xl font-bold font-playfair text-[#1F1951]">
            Crafted Heritage Elevated Luxury
          </h2>
        </div>

        {/* Content + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-8 md:mb-10">
          
          {/* Left Content */}
          <div className="space-y-4">
            <div className="space-y-3 text-black text-sm md:text-base leading-relaxed">
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

            <ul className="space-y-2 text-sm font-bold pt-2">
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

          {/* Right Image */}
          <div className="w-full aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3] bg-[#fdf8f1] rounded-[2rem] overflow-hidden shadow-xl border-4 border-white/50">
            <img 
              src="/images/landing.svg" 
              alt="Jaipur Kurti Gharana Collection" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 border-t border-gray-200/50 pt-6">
          
          {[
            { img: '/images/icon/Custom.png', alt: 'Custom', title: 'Custom Manufacturing', desc: 'Private label and customization options available for bulk orders.' },
            { img: '/images/icon/Flexible.png', alt: 'Flexible', title: 'Flexible MOQ', desc: 'Minimum order quantities designed for businesses of all sizes.' },
            { img: '/images/icon/Retailers.png', alt: 'Retailers', title: '1,000+ Retailers', desc: 'Trusted by boutiques & retailers across India & 15+ countries worldwide.' },
            { img: '/images/icon/Global.png', alt: 'Global', title: 'Global Shipping', desc: 'Reliable worldwide delivery with comprehensive export support.' },
          ].map((feature, i) => (
            <div key={i} className={`text-center flex flex-col items-center px-2 md:px-4 ${i > 0 ? 'lg:border-l border-gray-300/50' : ''}`}>
              <div className="mb-3">
                <img src={feature.img} alt={feature.alt} className="w-9 h-9 md:w-10 md:h-10" />
              </div>
              <h3 className="font-bold font-mont text-xs md:text-sm mb-1">{feature.title}</h3>
              <p className="text-[10px] md:text-[11px] font-mont text-gray-700 leading-normal">{feature.desc}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default AvantaLanding;
