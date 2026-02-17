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
import SignatureCraft from './components/SignatureCraft';
import Wholesale from './components/Wholesale';
import CommitmentSection from '@/components/CommitmentSection';
import WholesaleForm from '@/components/WholesaleForm';

const AvantaHero = () => {
  return (
    <div>
      <section className="max-w-[1440px] mx-auto flex flex-col md:flex-row bg-white font-sans">
        {/* Left Content Side */}
        <div className="flex-1 flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24">
          <p className='uppercase  text-2xl leading-tight font-bold'>
              About us
            </p>
          <div className="flex items-center gap-2 ">
            
            <h2 className="text-[10px] md:text-2xl py-4 font-playfair font-bold  text-[#E13C6C] ">
          Jaipur Kurti Gharana
          </h2>
         
        </div>

        <h2 className="text-2xl md:text-5xl font-bold font-playfair text-[#1F1951] mb-6 my-3 ">
      A Heritage of Excellence
        </h2>

          <div className="space-y-6 text-gray-700 max-w-xl leading-relaxed ">
            <p>
              <span className="font-bold text-black">Welcome to Jaipur Kurti Gharana</span>,  a distinguished wholesale fashion house where heritage craftsmanship meets refined contemporary design.</p>
              <p>
             Rooted in Jaipur’s rich textile legacy, we create premium ethnic wear exclusively for resellers, boutiques, and fashion businesses across India.
            </p>

            <p>
            We are a trusted manufacturing and sourcing partner for retailers who value consistency, uncompromising quality, and enduring style.
            </p>

            <h6 className=''>
             Each collection is thoughtfully developed to harmonize cultural authenticity with modern sensibilities—designed to perform seamlessly across everyday wardrobes and elevated festive assortments.
            </h6>
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
      <SignatureCraft/>
       <div id="crafted-heritage">
        <CraftedHeritage />
      </div>
      <AboutAchievements />
     
      <PartnerSection />

      <div className='w-full justify-center my-5'>
        <img src='/images/about/about-banner.svg' className='w-full'/>
      </div>
      <div id="wholesale">
       <Wholesale/>
      </div>
      <div id="founder-messages">
        <FounderSection />
      </div>
      <QualityCommitment />
       <InstagramSection />
       <CommitmentSection/>
       <WholesaleForm/>
      <FAQ />
     
      <ContactUs />
      <CraftsmanshipSection />
    </div>
  );
};

export default AvantaHero;