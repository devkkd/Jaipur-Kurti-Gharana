"use client";
import React from 'react';

const TrustedNetwork = () => {
  const indiaCities = [
    { name: "Jaipur", img: "/images/cities/jaipur.svg" },
    { name: "Mumbai", img: "/images/cities/mumbai.svg" },
    { name: "Delhi / NCR", img: "/images/cities/delhi.svg" },
    { name: "Bengaluru", img: "/images/cities/Bengaluru.svg" },
    { name: "Chennai", img: "/images/cities/Chennai.svg" },
    { name: "Hyderabad", img: "/images/cities/Hyderabad.svg" },
    { name: "Kolkata", img: "/images/cities/Kolkata.svg" },
    { name: "Pune", img: "/images/cities/Pune.svg" },
    { name: "Ahmedabad", img: "/images/cities/Ahmedabad.svg" },
    { name: "Surat", img: "/images/cities/Surat.svg" },
  ];

  const worldCities = [
    { name: "London", country: "(UK)", img: "/images/cities/London.svg" },
    { name: "Dubai", country: "(UAE)", img: "/images/cities/Dubai.svg" },
    { name: "New York", country: "(USA)", img: "/images/cities/New-York.svg" },
    { name: "Toronto", country: "(Canada)", img: "/images/cities/Toronto.svg" },
    { name: "Singapore", country: "(Singapore)", img: "/images/cities/Singapore.svg" },
    { name: "Sydney", country: "(Australia)", img: "/images/cities/Sydney.svg" },
    { name: "Melbourne", country: "(Australia)", img: "/images/cities/Melbourne.svg" },
    { name: "Los Angeles", country: "(USA)", img: "/images/cities/Los-Angeles.svg" },
    { name: "Chicago", country: "(USA)", img: "/images/cities/Chicago.svg" },
    { name: "Abu Dhabi", country: "(UAE)", img: "/images/cities/Abu-Dhabi.svg" },
  ];

  const CityCard = ({ city, isWorld = false }) => (
    <div className="flex flex-col items-center min-w-[100px] md:min-w-0 flex-shrink-0">
      <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 overflow-hidden rounded-2xl shadow-md transition-transform hover:scale-105 duration-300">
        <img
          src={city.img}
          alt={city.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-3 text-center">
        <p className="text-[11px] md:text-xs font-bold text-[#1a1a3d]  tracking-tighter">
          {city.name}
        </p>
        {isWorld && (
          <p className="text-[10px] md:text-[12px] text-gray-500 font-medium">
            {city.country}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-16 px-4 max-w-[1440px] mx-auto font-mont">
      {/* Header Section */}
      <div className="text-center max-w-6xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
         
          <h3 className="text-[10px] md:text-3xl py-4 font-playfair font-bold  text-[#E13C6C] ">
          Jaipur Kurti Gharana
          </h3>
         
        </div>

        <h2 className="text-2xl md:text-5xl font-bold font-playfair text-[#1F1951] mb-6 ">
       Trusted Across India and the World
        </h2>

        <p className="text-[11px] font-mont md:text-sm font-semibold text-[#0E0E0E] leading-relaxed px-4">
          Our kurtis and ethnic collections are worn in leading cities across India and in major global fashion hubs.<br></br>
          From domestic markets to international demand, our reach reflects the growing appreciation for modern Indian style everywhere.
        </p>
      </div>

      {/* India Top Cities */}
      <div className="mb-16">
        <h3 className="text-center text-xl md:text-2xl font-cinzel font-bold text-[#0E0E0E] mb-10 uppercase ">
          India Top Cities
        </h3>
        <div className="flex md:grid md:grid-cols-5 lg:grid-cols-10 gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x px-2">
          {indiaCities.map((city, idx) => (
            <div key={idx} className="snap-center">
              <CityCard city={city} />
            </div>
          ))}
        </div>
      </div>

      {/* Worldwide Top Cities */}
      <div>
        <h3 className="text-center text-xl md:text-2xl font-cinzel font-bold text-[#0E0E0E] mb-10 uppercase">
          Worldwide Top Cities
        </h3>
        <div className="flex md:grid md:grid-cols-5 lg:grid-cols-10 gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x px-2">
          {worldCities.map((city, idx) => (
            <div key={idx} className="snap-center">
              <CityCard city={city} isWorld={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedNetwork;