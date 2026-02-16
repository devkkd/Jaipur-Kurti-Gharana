import React from 'react';
import Image from 'next/image';
import AboutAchievements from './components/AboutAchievements';
import CraftedHeritage from './components/CraftedHeritage';
import PartnerSection from './components/PartnerSection';
import AboutAvantaLanding from './components/AboutAvantaLanding';
import FounderSection from './components/FounderSection';
import QualityCommitment from './components/QualityCommitment';
import FAQ from '@/components/FAQ';
import InstagramSection from '@/components/InstagramSection';
import ContactUs from '@/components/ContactUs';
import CraftsmanshipSection from '@/components/CraftsmanshipSection';

const AvantaHero = () => {
  return (
    <div>
      <section className="max-w-[1440px] mx-auto flex flex-col md:flex-row bg-white font-sans">
        {/* Left Content Side */}
        <div className="flex-1 flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-pink-600 rounded-full"></span>
            <p className="text-xs font-bold tracking-widest text-indigo-900 uppercase">
              Avanta by Jaipur Kurti Gharana
            </p>
            <span className="w-2 h-2 bg-pink-600 rounded-full"></span>
          </div>

          <h1 className="text-3xl md:text-4xl font-cinzel font-bold leading-tight text-gray-900 mb-8">
            AVANTA INDIA <br />
            BY JAIPUR KURTI GHARANA
          </h1>

          <div className="space-y-6 text-gray-700 max-w-xl leading-relaxed">
            <p>
              <span className="font-bold text-black">Welcome to Avanta India</span>, a distinguished wholesale label by
              <span className="font-bold text-black"> Jaipur Kurti Gharana</span>, where heritage craftsmanship meets refined contemporary design.
              Rooted in the rich textile legacy of Jaipur, Avanta India is dedicated to creating premium ethnic wear exclusively for
              resellers, boutiques, and fashion businesses across India.
            </p>

            <p>
              We are a trusted manufacturing partner for retailers who value consistency, quality, and timeless appeal.
            </p>

            <p>
              Every collection is thoughtfully developed to balance cultural authenticity with modern sensibilities crafted to perform
              beautifully in both everyday wardrobes and elevated festive assortments.
            </p>
          </div>
        </div>

        {/* Right Image Side */}
        <div className="flex-1 p-4 md:p-8">
          <div className="relative h-full w-full bg-[#fdfaf5] rounded-[40px] overflow-hidden flex">
            {/* Image 1 */}
            <div className="relative flex-1 h-full border-r border-white/20">
              <img
                src="/images/about/about1.png"
                alt="Model in cream kurti"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>


      </section>
      <AboutAchievements />
      <div id="crafted-heritage">
        <CraftedHeritage />
      </div>
      <PartnerSection />
      <div id="resellers">
        <AboutAvantaLanding />
      </div>
      <div id="founder-messages">
        <FounderSection />
      </div>
      <QualityCommitment />
      <FAQ />
      <InstagramSection />
      <ContactUs />
      <CraftsmanshipSection />
    </div>
  );
};

export default AvantaHero;