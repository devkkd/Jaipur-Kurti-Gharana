"use client";
import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: "/images/banner/banner-1.png",
    title: "Rooted in Tradition Designed for Today",
    subtitle: "Premium Ethnic Wear for Wholesale Partners"
  },
  {
    image: "/images/banner/banner-1.png", 
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
    <section className="relative overflow-hidden max-w-[1490px] mx-auto h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px] group" ref={emblaRef}>
      <div className="flex h-full">
        {slides.map((slide, index) => (
          <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
            <img
              src={slide.image}
              alt="Hero Banner"
              className="w-full h-full object-cover object-top"
            />

            {/* Central Content Card */}
            <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
              <div className="bg-[#801830] text-white p-8 md:p-14 rounded-[40px] md:rounded-[60px] w-full max-w-[90%] sm:max-w-md md:max-w-[480px] text-center shadow-2xl pointer-events-auto relative z-10 border border-white/5">
                
                {/* Victor Top Decoration */}
                <div className="mb-6 flex justify-center">
                  <img
                    src='/images/icon/VictorTop.png'
                    alt="decoration top"
                    className="w-48 md:w-64 h-auto opacity-90"
                  />
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold leading-tight mb-4 tracking-tight">
                  {slide.title}
                </h2>

                {/* Elephant Icon */}
                <div className="my-6 flex justify-center">
                  <img
                    src='/images/icon/Elephent.png'
                    alt="Elephant Icon"
                    className="w-24 md:w-32 h-auto"
                  />
                </div>

                {/* Subtitle */}
                <p className="text-sm sm:text-base md:text-xl font-mont font-bold mb-8 tracking-wide max-w-[280px] mx-auto">
                  {slide.subtitle}
                </p>

                {/* CTA Button */}
                <button className="bg-white text-black px-8 py-3 md:px-10 md:py-4 rounded-full text-xs md:text-base font-bold font-mont hover:bg-gray-100 transition-all flex items-center gap-2 mx-auto active:scale-95 shadow-xl">
                  Explore Collections <span className="text-lg">↓</span>
                </button>

                {/* Victor Bottom Decoration */}
                <div className="mt-8 flex justify-center">
                  <img
                    src='/images/icon/VictorBottom.png'
                    alt="decoration bottom"
                    className="w-48 md:w-64 h-auto opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all z-30 active:scale-90 hidden md:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all z-30 active:scale-90 hidden md:block"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === selectedIndex ? 'w-10 bg-white' : 'w-2 bg-white/40'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}