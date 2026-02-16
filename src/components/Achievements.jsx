import React from 'react';

const Achievements = () => {
  const stats = [
    {
      value: "200+",
      label: "New Designs Launched Every Month"
    },
    {
      value: "5,000+",
      label: "Trusted Customers Worldwide"
    },
    {
      value: "20+",
      label: "Countries Served Across the World (Domestic + International)"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-white font-sans">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold text-[#1a1a3d] uppercase tracking-widest">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-gray-900 mb-4">
          OUR ACHIEVEMENTS
        </h2>
        
        <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600 leading-relaxed">
          Each Milestone Reflects Our Commitment To Quality, Craftsmanship, And The Trust Placed In Us By A Growing Community Of Discerning Customers.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Statistics Column */}
        <div className="space-y-12 md:pl-8">
          {stats.map((item, index) => (
            <div key={index} className="border-b border-gray-100 pb-8 last:border-0">
              <h3 className="text-4xl font-bold text-gray-900 mb-2">
                {item.value}
              </h3>
              <p className="text-lg text-gray-600 leading-snug max-w-xs">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Image Column */}
        <div className="relative h-[400px] md:h-[600px] w-full">
          {/* Aap yahan apni actual image path use karein */}
          <img 
            src="/images/collection/archi.png" 
            alt="Fashion Models"
            className="w-full h-full object-cover rounded-sm shadow-sm"
          />
        </div>

      </div>
    </section>
  );
};

export default Achievements;