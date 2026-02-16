"use client";
import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: "/images/banner/banner-1.svg",
    title: "Rooted in Tradition Designed for Today",
    subtitle: "Premium B2B Wholesale Ethnic Wear"
  },
  {
    image: "/images/banner/banner-1.svg",
    title: "TRADITION REIMAGINED FOR THE MODERN WOMAN",
    subtitle: "Exquisite Collections for Discerning Resellers"
  }
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  return (
    <div className="relative overflow-hidden w-full h-[80vh]  group" ref={emblaRef}>
      <div className="flex h-full">
        {slides.map((slide, index) => (
          <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
            <img 
              src={slide.image} 
              alt="Hero Banner" 
              className="w-full h-full object-cover object-center"
            />
            
            <div className="absolute inset-0 bg-black/10" />

            {/* Central Content Card */}
            <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
              <div className="bg-[#801830] text-white p-6 md:p-12 rounded-[30px] md:rounded-[40px] w-full max-w-[85%] sm:max-w-sm text-center shadow-2xl pointer-events-auto border border-white/10 relative z-10">
                
                <div className="mb-4 md:mb-6 flex justify-center opacity-80">
                  <img 
                    src='/images/icon/banner-card.svg' 
                    alt="decoration" 
                    className="w-12 md:w-52 h-auto"
                  />
                </div>

                <h2 className="text-lg sm:text-2xl md:text-2xl font-cinzel font-semibold   mb-4px-2">
                  {slide.title}
                </h2>
          <div  className='w-28 mx-auto'>
                <img src='/images/banner/card-image.svg'/>
                </div>
                <p className="text-[10px] sm:text-sm md:text-lg font-light font-mont opacity-90 mb-6 my-2">
                  {slide.subtitle}
                </p>

                <button className="bg-white font-mont text-black px-6 py-2 md:px-8 md:py-3 rounded-full text-xs md:text-base font-bold hover:bg-gray-100 transition-all flex items-center gap-2 mx-auto active:scale-95">
                  Explore Collections <span className="text-sm md:text-lg">↓</span>
                </button>

                <div className="mb-4 my-2 flex justify-center opacity-80 py-4">
                  <img 
                    src='/images/banner/card-bottom.svg' 
                    alt="decoration" 
                    className="w-12 md:w-52 h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Visible on Mobile & Desktop */}
      <button 
        onClick={scrollPrev}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-white/80 p-2 md:p-3 rounded-full shadow-lg hover:bg-white transition-all z-30 active:scale-90"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
      </button>

      <button 
        onClick={scrollNext}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-white/80 p-2 md:p-3 rounded-full shadow-lg hover:bg-white transition-all z-30 active:scale-90"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 md:h-1.5 rounded-full transition-all duration-300 ${
              i === selectedIndex ? 'w-6 md:w-8 bg-white' : 'w-2 bg-white/50'
            }`} 
          />
        ))}
      </div>
    </div>
  );
}