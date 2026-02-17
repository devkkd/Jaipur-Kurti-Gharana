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
    },
    {
      value: "Since 2016",
      label: "Dedicated to Elevating Jaipur's Textile Heritage"
    }
  ];

  return (
    <section className="bg-white py-16 px-6 md:py-24 font-sans border-t border-gray-100">
      <div className="max-w-[90rem] mx-auto">
        
        {/* Header Section - Matches image_faaf53.png */}
        <div className="text-center mb-16 md:mb-24">
          <h3 className="text-[10px] md:text-3xl py-4 font-playfair font-bold  text-[#E13C6C] ">
            Jaipur Kurti Gharana
          </h3>
          
        <h2 className="text-2xl md:text-5xl font-bold font-playfair text-[#1F1951] mb-6 ">
            Our Achievements
          </h2>
          
          <p className="max-w-3xl mx-auto text-sm md:text-base font-mont font-medium text-gray-800 leading-relaxed px-4">
            Each Milestone Reflects Our Commitment To Quality, Craftsmanship, And The Trust Placed In Us By A Growing Community Of Discerning Customers.
          </p>
        </div>

        {/* Horizontal Statistics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 items-start">
          {stats.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center text-center px-6 ${
                index !== stats.length - 1 ? 'lg:border-r lg:border-gray-200' : ''
              }`}
            >
              <h3 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
                {item.value}
              </h3>
              <p className="text-xs md:text-sm font-mont font-bold text-gray-800 leading-relaxed max-w-[200px] uppercase tracking-wide">
                {item.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;