import React from 'react';

const CraftedHeritage = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6 md:py-8 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-12 items-center">

        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
          <img src="/images/about/about2.png" alt="aboutus" className="w-full h-full object-cover rounded-2xl" loading="lazy" />
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col justify-center text-center lg:text-right space-y-8">
          <header className="space-y-2">
            <h3 className="text-[10px] md:text-2xl py-4 font-playfair font-bold  text-[#E13C6C] ">
              A Legacy of Artisanal
            </h3>
            <h2 className="text-2xl md:text-4xl font-bold font-playfair text-[#1F1951] mb-6 ">
              Mastery
            </h2>
          </header>

          <div className="space-y-6 text-black leading-relaxed max-w-xl ml-auto">
            <p className="text-sm md:text-base">
              At <span className="font-bold">At Jaipur Kurti Gharana,</span>,  we honor and elevate the enduring legacy of Indian craftsmanship. Every garment is a tribute to heritage meticulously handcrafted by master artisans whose expertise has been cultivated and passed down through generations.<br></br>



              Our creations celebrate the finesse of handwork, from intricate embroidery to exquisite zardozi detailing, thoughtfully reimagined through contemporary silhouettes. The result is a timeless aesthetic that seamlessly bridges tradition and modernity, designed for the discerning connoisseur of Indian fashion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftedHeritage;