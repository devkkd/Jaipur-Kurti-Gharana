"use client";

import Image from "next/image";

const items = [
  {
    img: "/images/slider/1.jpg",
    text: "Crafted in Tradition"
  },
  {
    img: "/images/slider/2.jpg",
    text: "Heritage, Refined"
  },
  {
    img: "/images/slider/3.jpg",
    text: "Timeless Indian Craft"
  },
  {
    img: "/images/slider/4.jpg",
    text: "Rooted in Heritage"
  },
  {
    img: "/images/slider/5.jpg",
    text: "Where Craft Endures"
  },
  {
    img: "/images/slider/6.jpg",
    text: "Elegant Traditions"
  },
];

export default function ContinuousSlider() {
  return (
    <div className="w-full overflow-hidden bg-white py-6 md:py-8">
      <div className="relative">
        {/* Continuous Scrolling Container */}
        <div className="flex w-max animate-scroll items-center">
          {/* Duplicate items for seamless loop */}
          {[...items, ...items, ...items].map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center gap-3 md:gap-8 px-3 md:px-4"
            >
              {/* Small Product Card with Border */}
              <div className="relative w-12 h-20 sm:w-14 sm:h-24 md:w-16 md:h-28 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <Image
                  src={item.img}
                  alt={item.text}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Text */}
              <h3 className="text-gray-800 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">
                {item.text}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
