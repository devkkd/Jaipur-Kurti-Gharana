// import React from 'react';
// import Image from 'next/image';

// const collections = [
//   {
//     title: "SUITS SETS",
//     description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
//     bgColor: "bg-[#FFF4D9]", // Light Yellow
//     btnColor: "bg-[#E91E63]", // Pink/Magenta
//     textColor: "text-white",
//     img: "/images/collection/suit.svg", // Replace with your image paths
//   },
//   {
//     title: "KURTI SETS",
//     description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
//     bgColor: "bg-[#F3E5F5]", // Light Purple
//     btnColor: "border border-gray-400 hover:bg-[#E91E63] hover:text-white hover:border-transparent",
//     textColor: "text-gray-800",
//     img: "/images/collection/kurti.svg",
//   },
//   {
//     title: "ANARKALI SETS",
//     description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
//     bgColor: "bg-[#E3F2FD]", // Light Blue
//     btnColor: "border border-gray-400 hover:bg-[#E91E63] hover:text-white hover:border-transparent",
//     textColor: "text-gray-800",
//     img: "/anarkali.jpg",
//   },
//   {
//     title: "TOP & TUNICS",
//     description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
//     bgColor: "bg-[#FCE4EC]", // Light Pink
//     btnColor: "border border-gray-400 hover:bg-[#E91E63] hover:text-white hover:border-transparent",
//     textColor: "text-gray-800",
//     img: "/top.jpg",
//   },
//   {
//     title: "GOWN",
//     description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
//     bgColor: "bg-[#FFF3E0]", // Light Orange
//     btnColor: "border border-gray-400 hover:bg-[#E91E63] hover:text-white hover:border-transparent",
//     textColor: "text-gray-800",
//     img: "/gown.jpg",
//   },
//   {
//     title: "CO-ORD SETS",
//     description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
//     bgColor: "bg-[#F9FBE7]", // Light Greenish/Cream
//     btnColor: "border border-gray-400 hover:bg-[#E91E63] hover:text-white hover:border-transparent",
//     textColor: "text-gray-800",
//     img: "/coord.jpg",
//   },
// ];

// const PremiumCollections = () => {
//   return (
//     <section className="py-12 px-4 max-w-7xl mx-auto font-sans">
//       {/* Header Section */}
//       <div className="text-center mb-12">
//         <p className="text-[10px] uppercase tracking-widest text-pink-600 font-bold mb-2">
//           ◆ AVANTA BY JAIPUR KURTI CHABRA ◆
//         </p>
//         <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 tracking-wide">
//           PREMIUM COLLECTIONS
//         </h2>
//       </div>

//       {/* Responsive Grid */}
      // <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
      //   {collections.map((item, index) => (
      //     <div
      //       key={index}
      //       className={`flex flex-col ${
      //         index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      //       } min-h-[350px] overflow-hidden`}
      //     >
//             {/* Image Section - Replacing the border arch */}
//             <div className={`relative w-full md:w-1/2 h-auto border ${item.bgColor} flex items-end justify-center`}>
//               <div className="relative w-full h-full overflow-hidden">
//                 {/* Using Next.js Image component for optimized images */}
                // <div className="relative w-full h-full">
                //   {/* This is a placeholder for the image. In your actual implementation, use: */}
                //   <Image 
                //     src={item.img} 
                //     alt={item.title}
                //     fill
                //     className="object-cover border"
                //     sizes="(max-width: 768px) 100vw, 50vw"
                //   />
                  
//                   {/* Placeholder div with background color and hover effect */}
//                   <div 
//                     className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center transition-transform duration-500 hover:scale-110"
//                   >
//                     <span className="text-gray-500 font-medium">Image: {item.title}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Text Content Section */}
//             <div className={`w-full md:w-1/2 ${item.bgColor} p-8 flex flex-col justify-center items-start text-left`}>
//               <h3 className="text-xl font-bold text-gray-800 mb-3 tracking-tight">
//                 {item.title}
//               </h3>
//               <p className="text-sm text-gray-600 mb-6 leading-relaxed max-w-[250px]">
//                 {item.description}
//               </p>
//               <button
//                 className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${item.btnColor} ${item.textColor} hover:bg-[#E91E63] hover:text-white hover:border-transparent`}
//               >
//                 Explore Collections +
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default PremiumCollections;

// import React from 'react';
// import Image from 'next/image';

// const collections = [
//   {
//     title: "SUITS SETS",
//     description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
//     bgColor: "bg-[#FFF4D9]", // Light Yellow
//     btnColor: "border border-gray-400 hover:bg-[#E91E63] hover:text-white hover:border-transparent", // Pink/Magenta
//     textColor: "text-gray-800",
//     img: "/images/collection/suit.svg",
//     imgBgColor: "bg-[#FFF4D9]", // Amber gradient for Suits
//   },
//   {
//     title: "KURTI SETS",
//     description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
//     bgColor: "bg-[#F3E5F5]", // Light Purple
//     btnColor: "border border-gray-400 hover:bg-[#E91E63] hover:text-white hover:border-transparent",
//     textColor: "text-gray-800",
//     img: "/images/collection/kurti.svg",
//     imgBgColor: "bg-[#F3E5F5]", // Purple gradient for Kurti
//   },
//   {
//     title: "ANARKALI SETS",
//     description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
//     bgColor: "bg-[#E3F2FD]", // Light Blue
//     btnColor: "border border-gray-400 hover:bg-[#E91E63] hover:text-white hover:border-transparent",
//     textColor: "text-gray-800",
//     img: "/images/collection/anarkali.svg", // Updated path
//     imgBgColor: "bg-gradient-to-br from-blue-100 to-blue-200", // Blue gradient for Anarkali
//   },
//   {
//     title: "TOP & TUNICS",
//     description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
//     bgColor: "bg-[#FCE4EC]", // Light Pink
//     btnColor: "border border-gray-400 hover:bg-[#E91E63] hover:text-white hover:border-transparent",
//     textColor: "text-gray-800",
//     img: "/images/collection/top.svg", // Updated path
//     imgBgColor: "bg-gradient-to-br from-pink-100 to-pink-200", // Pink gradient for Top & Tunics
//   },
//   {
//     title: "GOWN",
//     description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
//     bgColor: "bg-[#FFF3E0]", // Light Orange
//     btnColor: "border border-gray-400 hover:bg-[#E91E63] hover:text-white hover:border-transparent",
//     textColor: "text-gray-800",
//     img: "/images/collection/gown.svg", // Updated path
//     imgBgColor: "bg-gradient-to-br from-orange-100 to-orange-200", // Orange gradient for Gown
//   },
//   {
//     title: "CO-ORD SETS",
//     description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
//     bgColor: "bg-[#F9FBE7]", // Light Greenish/Cream
//     btnColor: "border border-gray-400 hover:bg-[#E91E63] hover:text-white hover:border-transparent",
//     textColor: "text-gray-800",
//     img: "/images/collection/co.svg", // Updated path
//     imgBgColor: "bg-gradient-to-br from-green-100 to-green-200", // Green gradient for Co-ord Sets
//   },
// ];

// const PremiumCollections = () => {
//   return (
//     <section className="py-12 px-4 w-full font-sans">
//       {/* Header Section */}
//      <div className="text-center mb-8 md:mb-12">
//         <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
//           <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-pink-600 rounded-full"></span>
//           <h3 className="text-[10px] md:text-sm font-bold font-mont text-[#1a1a3d] uppercase">
//             Avanta by Jaipur Kurti Gharana
//           </h3>
//           <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-pink-600 rounded-full"></span>
//         </div>
        
//         <h2 className="text-2xl md:text-4xl sm:py-3 font-bold font-cinzel text-[#1a1a3d] mb-6 uppercase ">
//          Premium Collections
//         </h2>
        
//       </div>

//       {/* Responsive Grid */}
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
//         {collections.map((item, index) => (
//           <div
//             key={index}
//             className={`flex flex-col ${
//               index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
//             } min-h-[300px] overflow-hidden`}
//           >
//             {/* Image Section - Replacing the border arch */}
//             <div className={`relative w-full md:w-9/12 h-auto ${item.bgColor} flex items-end justify-center`}>
//               <div className="relative w-full h-full overflow-hidden">
//                 {/* Image Container with unique background color */}
//                 <div className="relative w-full h-full flex items-center justify-center">
//                   {/* Placeholder div with unique background color for each image */}
//                   <div 
//                     className={`w-full h-full flex items-center justify-center${item.imgBgColor}`}
//                   >
//                     {/* This will show when image is not found */}
//                     <div className="relative w-full h-full">
//                   {/* This is a placeholder for the image. In your actual implementation, use: */}
//                   <Image 
//                     src={item.img} 
//                     alt={item.title}
//                     fill
//                     className="object-contain w-full h-full border"
//                     // sizes="(max-width: 768px) 100vw, 50vw"
//                   />
                      
//                       {/* Temporary placeholder with text */}
//                       {/* <div className="text-center">
//                         <div className="text-gray-700 font-medium mb-2">{item.title}</div>
//                         <div className="text-gray-500 text-sm">Image Placeholder</div>
//                       </div> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Text Content Section */}
//             <div className={`w-full md:w-1/2 ${item.bgColor} p-8 flex flex-col justify-center items-start text-left`}>
//               <h3 className="text-xl font-bold text-gray-800 mb-3 tracking-tight">
//                 {item.title}
//               </h3>
//               <p className="text-sm text-gray-600 mb-6 leading-relaxed max-w-[250px]">
//                 {item.description}
//               </p>
//               <button
//                 className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${item.btnColor} ${item.textColor} hover:bg-[#E91E63] hover:text-white hover:border-transparent`}
//               >
//                 Explore Collections +
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default PremiumCollections;
import React from 'react';
import Image from 'next/image';

const collections = [
  {
    title: "SUITS SETS",
    description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
    bgColor: "bg-[#FFF4D9]",
    img: "/images/collection/suit.svg",
    reverse: false,
  },
  {
    title: "KURTI SETS",
    description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
    bgColor: "bg-[#F3E5F5]",
    img: "/images/collection/kurti.svg",
    reverse: true,
  },
  {
    title: "ANARKALI SETS",
    description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
    bgColor: "bg-[#F2F9FF]",
    img: "/images/collection/anarkali.svg",
    reverse: false,
  },
  {
    title: "TOP & TUNICS",
    description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
    bgColor: "bg-[#FCE4EC]",
    img: "/images/collection/top.svg",
    reverse: true,
  },
  {
    title: "GOWN",
    description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
    bgColor: "bg-[#FFF3E0]",
    img: "/images/collection/gown.svg",
    reverse: false,
  },
  {
    title: "CO-ORD SETS",
    description: "500+ suit designs. Extensive color options ranging from 250 to 500+ options.",
    bgColor: "bg-[#F9FBE7]",
    img: "/images/collection/co.svg",
    reverse: true,
  },
];

const PremiumCollections = () => {
  return (
    <section className="py-12 w-full bg-white">
      
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-pink-600 rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold font-mont text-[#1a1a3d] uppercase">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-pink-600 rounded-full"></span>
        </div>

        <h2 className="text-2xl md:text-4xl sm:py-3 font-bold font-cinzel text-[#1a1a3d] mb-6 uppercase">
          Premium Collections
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {collections.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-col md:flex-row h-auto md:h-[350px] ${item.bgColor} ${
              item.reverse ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Pattern Background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'url("/images/pattern.png")',
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center',
                backgroundSize: 'auto',
              }}
            ></div>

            {/* Image Side */}
            <div className="relative w-full md:w-2/3 h-[300px] md:h-full flex items-center justify-center overflow-hidden z-10">
              <div className="relative w-full h-full">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="relative z-10 w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-end items-start">
              <h3 className="text-xl md:text-2xl font-cinzel font-bold text-gray-800 mb-4 tracking-tight">
                {item.title}
              </h3>
              <p className="text-[13px] text-black mb-3 font-mont leading-relaxed max-w-[250px]">
                {item.description}
              </p>
              <button className="px-8 py-3 rounded-full border border-gray-400 text-[10px] font-bold uppercase text-gray-700 transition-all duration-300 hover:bg-[#DA295D] hover:text-white hover:border-transparent">
                Explore Collections +
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PremiumCollections;
