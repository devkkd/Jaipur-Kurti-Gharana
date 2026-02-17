"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  // Pehla item (index 0) by default open rahega
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      question: "What types of fabrics do you use?",
      answer: "At Avanta India, we work exclusively with premium-quality fabrics such as 60s count cotton, flex cotton, maslin, rayon, and other breathable, skin-friendly blends. Each material is carefully selected to deliver superior comfort, durability, and refined elegance."
    },
    {
      question: "How should I care for my Avanta India garments?",
      answer: "We recommend gentle hand washing or dry cleaning to preserve the fabric quality, color depth, and intricate detailing."
    },
    {
      question: "Are the colors of your garments true to the images shown?",
      answer: "We make every effort to ensure accurate color representation. However, slight variations may occur due to lighting conditions."
    },
    {
      question: "Do you offer extended and plus sizes?",
      answer: "Yes, Avanta India offers an inclusive size range designed to flatter diverse body types."
    },
    {
      question: "Are Avanta India outfits suitable for different occasions?",
      answer: "Absolutely. Our collections are designed for versatility, transitioning from everyday elegance to festive celebrations."
    },
    {
      question: "What can I expect from the embroidery and embellishments?",
      answer: "Our embroidery is executed by skilled artisans using traditional techniques, ensuring refined craftsmanship."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 font-sans">
      <div className="flex flex-col md:flex-row gap-10">

        {/* Left Side: Title Section */}
        <div className="md:w-1/3">
         <h2 className="text-[10px] md:text-2xl py-4 font-playfair font-bold  text-[#E13C6C] ">
          Jaipur Kurti Gharana
          </h2>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-[40px] font-bold font-playfair text-[#0E0E0E] mb-6 ">
     Frequently Asked Questions
        </h2>
        </div>

        {/* Right Side: FAQ Accordion */}
        <div className="md:w-2/3">
          <div className="border-t border-gray-200">
            {faqData.map((item, index) => (
              <div key={index} className="border-b font-mona border-gray-200">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-6 flex justify-between items-center text-left group"
                >
                  <span className={`text-base md:text-lg font-semibold transition-colors duration-300 ${openIndex === index ? 'text-black' : 'text-gray-700'}`}>
                    {item.question}
                  </span>
                  <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${openIndex === index ? 'bg-gray-100' : 'bg-[#E8EAF6]'}`}>
                    <ChevronDown
                      className={`w-5 h-5 text-[#9FA8DA] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>

                {/* Accordion Content with Smooth Transition */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-60 opacity-100 mb-6' : 'max-h-0 opacity-0'
                    }`}
                >
                  <p className="text-gray-700 text-sm  font-medium leading-relaxed pr-10">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQ;