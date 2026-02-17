import React from 'react';

const partnersData = [
  {
    id: '01.',
    title: 'Competitive Wholesale Pricing',
    description: 'Attractive margins for retailers with transparent tiered pricing structures and seasonal discounts',
  },
  {
    id: '02.',
    title: 'Quality Assurance',
    description: 'Rigorous quality checks at every stage, ensuring only the finest pieces reach your customers',
  },
  {
    id: '03.',
    title: 'Marketing Support',
    description: 'Professional product photography, lookbooks, and marketing materials to support your sales',
  },
  {
    id: '04.',
    title: 'Fast Turnaround',
    description: 'Efficient production and delivery timelines to keep your inventory fresh and your customers satisfied',
  },
  {
    id: '05.',
    title: 'Seasonal Collections',
    description: 'Regular new designs aligned with festivals, weddings, and fashion trends to drive repeat sales',
  },
];

export default function PartnerSection() {
  return (
    <section className="max-w-7xl mx-auto bg-white py-12 px-6 md:px-12 ">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-[40px] font-playfair font-bold  mb-4 text-black">
         Why Partner With Jaipur Kurti Gharana
        </h2>
        <p className="text-black text-sm md:text-lg font-semibold font-sans">
          Building successful partnerships through quality, reliability, and innovation
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {partnersData.map((item) => (
          <div key={item.id} className="p-6 flex flex-col items-center text-center">
            <span className="text-black font-bold text-sm mb-4">{item.id}</span>
            <h3 className="text-black font-bold text-base leading-tight mb-4 min-h-[3rem] flex items-center justify-center">
              {item.title}
            </h3>
            <p className="text-black text-xs md:text-[13px] leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}