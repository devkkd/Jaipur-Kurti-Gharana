// "use client";
// import React, { useEffect, useState } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";

// const announcements = [
//   "Welcome To Avanta India By Jaipur Kurti Gharana Thoughtfully Crafted To Celebrate Heritage, Purpose-built For Discerning Resellers.",
//   "New Collection Arriving Soon - Stay Tuned!",
//   "Free Shipping on Bulk Orders Above ₹10,000"
// ];

// export default function AnnouncementBar({ onVisibilityChange }) {
//   const [visible, setVisible] = useState(true);

//   const [emblaRef] = useEmblaCarousel(
//     { loop: true },
//     [Autoplay({ delay: 5000, stopOnInteraction: false })]
//   );

//   useEffect(() => {
//     const isMobile = () => window.innerWidth < 768;

//     const onScroll = () => {
//       if (!isMobile()) {
//         setVisible(true);
//         onVisibilityChange?.(true);
//         return;
//       }

//       const atTop = window.scrollY < 10;
//       setVisible(atTop);
//       onVisibilityChange?.(atTop);
//     };

//     onScroll();
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [onVisibilityChange]);

//   return (
//     <div
//       className={`bg-[#1F1951] text-white px-4 transition-all duration-300
//       ${visible ? "h-auto py-2" : "h-0 py-0 overflow-hidden"}`}
//     >
//       <div className="max-w-[1920px] mx-auto flex justify-center">
//         <div className="w-full md:w-[90%] overflow-hidden" ref={emblaRef}>
//           <div className="flex">
//             {announcements.map((text, i) => (
//               <div key={i} className="flex-[0_0_100%] text-center px-4">
//                 <p className="text-[10px] lg:text-xs tracking-wide font-mont">
//                   {text}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
