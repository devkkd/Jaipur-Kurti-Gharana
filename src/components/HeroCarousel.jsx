"use client";
import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const slides = [
  {
    image: "/images/banner/banner-1.svg",
    title: "THE LEGACY OF CRAFT UNITED WITH MODERN DISTINCTION",
    subtitle: "Premium B2B Wholesale Ethnic Wear"
  },
  {
    image: "/images/banner/banner-1.svg", // Replace with different imag
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
    <section className="relative overflow-hidden max-w-[1490px] mx-auto  md:h-[400px] lg:h-[500px] xl:h-[700px] 2xl:h-[800px] group" ref={emblaRef}>
      <div className="flex h-full">
        {slides.map((slide, index) => (
          <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
            {/* Background Image - Responsive Object Cover */}
            <img
              src={slide.image}
              alt="Avanta Hero Banner"
              className="w-full h-full object-cover object-bottom lg:object-bottom"
            />

            {/* Dark Overlay for better readability */}
            {/* <div className="absolute inset-0 bg-black/10" /> */}

            {/* Central Content Card - Responsive Implementation */}
            <div className="hidden absolute inset-0 sm:flex items-center justify-center p-4 pointer-events-none">
              <div className="bg-[#801830] text-white p-6 md:p-12 rounded-[30px] md:rounded-[40px] w-full max-w-[90%] sm:max-w-sm md:max-w-[400px] text-center shadow-2xl pointer-events-auto border border-white/10 relative z-10 transition-transform duration-500 hover:scale-[1.02]">

                {/* Decorative Flourish */}
                <div className="mb-4 md:mb-6 flex justify-center opacity-80">
                  <img
                    src='/images/banner/Group.svg'
                    alt="decoration"
                    className="w-16 sm:w-16 md:w-auto h-auto"
                  />
                </div>

                <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-cinzel font-semibold leading-tight mb-4 md:mb-6 px-2 tracking-wide">
                  {slide.title}
                </h2>

                <p className="text-[10px] sm:text-sm md:text-lg lg:text-xl font-light font-mont opacity-90 mb-6 md:mb-8 tracking-wider">
                  {slide.subtitle}
                </p>

                <button className="bg-white font-mont text-black px-6 py-2 md:px-8 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-bold hover:bg-gray-100 transition-all flex items-center gap-2 mx-auto active:scale-95 shadow-lg">
                  Explore Collections <span className="text-sm md:text-lg">↓</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Adjusted for accessibility and responsiveness */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-white/80 p-2 md:p-3 rounded-full shadow-lg hover:bg-white transition-all z-30 active:scale-90 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-white/80 p-2 md:p-3 rounded-full shadow-lg hover:bg-white transition-all z-30 active:scale-90 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${i === selectedIndex ? 'w-8 md:w-12 bg-white' : 'w-2 md:w-3 bg-white/40'
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}