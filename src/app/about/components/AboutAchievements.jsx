import React from 'react';

const AboutAchievements = () => {
  const stats = [
    {
      value: "200+",
      label: "New Designs Launched Every Month",
    },
    {
      value: "5,000+",
      label: "Trusted Customers Worldwide",
    },
    {
      value: "20+",
      label: "Countries Served Across the World (Domestic + International)",
    },
    {
      value: "SINCE 2016",
      label: "Dedicated to Elevating Jaipur's Textile Heritage",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header Section */}
         <h2 className="text-[10px] md:text-2xl py-4 font-playfair font-bold  text-[#E13C6C] ">
          Jaipur Kurti Gharana
          </h2>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-[40px] font-bold font-playfair text-[#0E0E0E] mb-6 ">
   Our Achievements
        </h2>
        
        <p className="max-w-2xl mx-auto  text-black leading-relaxed mb-16 tracking-tight">
        Each Milestone Reflects Our Commitment To Quality, 
Craftsmanship, And The Trust Placed In Us By A Growing Community Of Discerning Customers.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center px-4 lg:border-gray-200 ${
                // Laptop/Desktop par dividers dikhane ke liye logic
                index !== stats.length - 1 ? 'lg:border-r' : ''
              }`}
            >
              <h3 className="text-3xl md:text-4xl font-playfair font-bold text-black mb-3">
                {stat.value}
              </h3>
              <p className="text-[13px] md:text-[14px] text-black leading-snug max-w-[200px] font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutAchievements;