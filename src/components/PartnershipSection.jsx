import React from 'react';

const PartnershipSection = () => {
  const features = [
    {
      title: "7 Years",
      subtitle: "Brand Excellence",
      description: "Established, compliant, and brand-led. Avanta operates as a fully registered entity with a proven track record in manufacturing and product innovation."
    },
    {
      title: "5,000+",
      subtitle: "Trusted Customers",
      description: "Businesses of all sizes rely on Avanta for consistent quality, reliable supply, and transparent service. Our customer base spans distributors, retailers, brands, and global sourcing partners."
    },
    {
      title: "200+",
      subtitle: "Designs Every Month",
      description: "Stay competitive with a constant pipeline of fresh and trend-driven product designs. Our design studio continuously launches updated SKUs to meet market demand and seasonal shifts."
    },
    {
      title: "Why Partner with Jaipur Kurti Gharana?",
      subtitle: "",
      description: "From product innovation to reliable delivery, Avanta combines speed, capacity, and experience to strengthen your business. Connect with a manufacturing partner built for scale and long-term growth."
    },
    {
      title: "Easy to Reach, Fast to Respond",
      subtitle: "",
      description: "Our team prioritizes rapid communication and seamless coordination. Whether it's inquiries, sampling, or production updates, you get responsive support without delays."
    },
    {
      title: "White Label Manufacturing",
      subtitle: "",
      description: "Produce your designs under your own brand with complete confidentiality and scalable manufacturing support. Avanta ensures quality, consistency, and end-to-end fulfillment tailored to your private labeling needs."
    }
  ];

  return (
    <section 
      className="relative text-white py-20 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{
        // Using the specific pink from the image and layering the pattern
        backgroundColor: '#E13C6C',
        backgroundImage: 'url("/images/pattern.png")',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundBlendMode: 'soft-light'
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section - Updated to match image_05aaa8.png */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6 tracking-tight">
            Why Partner With Jaipur Kurti Gharana
          </h2>
          <p className="text-base md:text-lg font-mont font-medium opacity-90 tracking-wide">
            Building successful partnerships through quality, reliability, and innovation
          </p>
        </div>

        {/* Grid Section with dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 relative">
          
          {/* Horizontal Divider Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/30 -translate-y-1/2"></div>

          {features.map((item, index) => (
            <div
              key={index}
              className={`px-10 py-12 flex flex-col items-start relative
                ${index % 3 !== 2 ? 'md:border-r border-white/30' : ''}
              `}
            >
              {/* Star Icon - Rotated as seen in design */}
              <div className="mb-8">
                <div className="w-8 h-8 flex items-center justify-center">
                   {/* Custom Star SVG to match the sharp 4-point design */}
                   <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
                     <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                   </svg>
                </div>
              </div>

              {/* Text Content - font-mont for all supporting text */}
              <h3 className="text-2xl font-bold font-mont mb-1 leading-tight">{item.title}</h3>
              {item.subtitle && (
                <h4 className="text-xl font-bold font-mont mb-6 text-white/90">{item.subtitle}</h4>
              )}

              <p className="text-sm md:text-base leading-relaxed font-mont font-medium opacity-80 text-left">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;