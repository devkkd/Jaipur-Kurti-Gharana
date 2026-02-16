"use client"
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import CraftsmanshipSection from '@/components/CraftsmanshipSection';

const FAQSection = () => {
  // State to track which FAQ is open (optional but recommended for UX)
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What types of fabrics do you use?",
      answer: "At Avanta India, we work exclusively with premium-quality fabrics such as 60s count cotton, flex cotton, maslin, rayon, and other breathable, skin-friendly blends. Each material is carefully selected to deliver superior comfort, durability, and refined elegance."
    },
    {
      question: "How should I care for my Avanta India garments?",
      answer: "We recommend gentle hand washing or dry cleaning to preserve the fabric quality, color depth, and intricate detailing. Detailed care instructions are provided with each garment to ensure lasting beauty."
    },
    {
      question: "Are the colors of your garments true to the images shown?",
      answer: "We make every effort to ensure accurate color representation. However, slight variations may occur due to lighting conditions and individual screen settings each piece remains true to the Avanta aesthetic."
    },
    {
      question: "Do you offer extended and plus sizes?",
      answer: "Yes. Avanta India offers an inclusive size range designed to flatter diverse body types. Please refer to our detailed size guide to select your ideal fit."
    },
    {
      question: "Are Avanta India outfits suitable for different occasions?",
      answer: "Absolutely. Our collections are designed for versatility, seamlessly transitioning from everyday elegance to festive celebrations and special occasions."
    },
    {
      question: "What can I expect from the embroidery and embellishments?",
      answer: "Our embroidery and embellishments are executed by skilled artisans using traditional techniques, ensuring refined craftsmanship, durability, and an unmistakable sense of luxury in every detail."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-16 font-sans">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-bold tracking-widest uppercase text-gray-900">FAQ's</span>
          <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-gray-900 mt-2 tracking-wide uppercase">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
              >
                <span className="text-base md:text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <div className={`p-2 rounded-full bg-[#D9D9E3] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ChevronDown size={20} className="text-white" strokeWidth={3} />
                </div>
              </button>

              {/* Animated Answer Section */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
              >
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CraftsmanshipSection />
    </>
  );
};

export default FAQSection;