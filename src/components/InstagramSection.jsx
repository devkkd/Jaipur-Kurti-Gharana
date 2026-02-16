import React from 'react';

const InstagramSection = () => {
  const cards = [
    { id: 1, image: 'images/collection/collection1.jpg', title: "NEW YEAR'S COLLECTION", type: 'video' },
    { id: 2, image: 'images/collection/collection2.jpg', title: "NEW YEAR'S COLLECTION", type: 'video' },
    { id: 3, image: 'images/collection/collection3.jpg', title: "COLLECTION", type: 'video' },
    { id: 4, image: 'images/collection/collection4.jpg', title: "NEW COLLECTION", type: 'post' },
  ];

  return (
    <section className="bg-white py-12 px-4">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold text-[#1a1a3d] uppercase tracking-widest">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-6 text-gray-900 tracking-tight">
          Stay Inspired
        </h2>
        
        <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto mb-4">
          Stay connected with Avanta India and be the first to discover our latest collections and trend-forward designs. 
          Follow us on Instagram for exclusive previews, new launches, and refined style inspiration.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-800">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="h-5 w-5" alt="IG" />
          <span>@jaipur_kurti_gharana | JAIPUR KURTI GHARANA</span>
        </div>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {cards.map((card) => (
          <div key={card.id} className="relative group overflow-hidden bg-gray-50 rounded-sm shadow-sm transition-all duration-300 hover:shadow-lg">
            {/* Top Icon */}
            <div className="absolute top-4 right-4 z-10 text-white drop-shadow-md">
              {card.type === 'video' ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>
              )}
            </div>

            {/* Image Container */}
            <div className="aspect-[3/4] overflow-hidden relative">
              <img 
                src={card.image} 
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 "></div>
            </div>

            {/* Card Content */}
            {/* <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <p className="text-[10px] tracking-widest text-gray-500 mb-1">NEW YEAR'S</p>
              <h3 className="text-xl font-bold tracking-tight text-black mb-2">{card.title}</h3>
              
              {card.id === 4 ? (
                <div className="space-y-4">
                   <p className="text-[10px] leading-tight text-gray-500 px-4">
                    Starting the year with comfort, confidence and Avanta craftsmanship
                  </p>
                  <button className="bg-black text-white w-full py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                    Shop Now
                  </button>
                  <p className="text-[10px] text-gray-400">www.avantaindia.com</p>
                </div>
              ) : (
                <p className="text-[9px] leading-tight text-gray-400 px-2 line-clamp-2 italic">
                  Inspired by Jaipur's rich traditions, Avanta creates garments that reflect skilled craftsmanship...
                </p>
              )}
            </div> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramSection;