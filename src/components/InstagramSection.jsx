import React from 'react';

const InstagramSection = () => {
  const cards = [
    { id: 1, image: 'images/collection/collection1.jpg', type: 'video' },
    { id: 2, image: 'images/collection/collection2.jpg', type: 'video' },
    { id: 3, image: 'images/collection/collection3.jpg', type: 'video' },
    { id: 4, image: 'images/collection/collection4.jpg', type: 'post' },
  ];

  return (
    <section className="bg-white py-16 px-4 md:py-24">
      {/* Header Section - Matches image_faba1b.png */}
      <div className="max-w-5xl mx-auto text-center mb-16">
          <h3 className="text-[10px] md:text-3xl py-4 font-playfair font-bold  text-[#E13C6C] ">
          Jaipur Kurti Gharana
        </h3>
        
        <h2 className="text-2xl md:text-5xl font-bold font-playfair text-[#1F1951] mb-6 ">
          Follow the Craft
        </h2>
        
        <p className="text-sm md:text-base font-mont font-medium text-gray-800 leading-relaxed max-w-4xl mx-auto mb-6">
          Stay connected with Jaipur Kurti Gharana and be among the first to experience our latest collections and thoughtfully curated designs. 
          Follow us on Instagram for exclusive previews, new launches, and elevated style inspiration rooted in timeless Indian craftsmanship.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm font-bold text-gray-900 font-mont uppercase tracking-wider">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="h-5 w-5" alt="Instagram" />
          <span>@jaipur_kurti_gharana | JAIPUR KURTI GHARANA</span>
        </div>
      </div>

      {/* Grid rendering - Responsive 4-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto px-4">
        {cards.map((card) => (
          <div key={card.id} className="relative group overflow-hidden rounded-sm transition-all duration-300">
            {/* Top Right Media Icon - Matches image overlay */}
            <div className="absolute top-4 right-4 z-20 text-white drop-shadow-md opacity-90">
              {card.type === 'video' ? (
                // Play Icon for Reels
                <div className="bg-black/20 p-1.5 rounded-md backdrop-blur-sm">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                </div>
              ) : (
                // Layers Icon for Carousel Posts
                <div className="bg-black/20 p-1.5 rounded-md backdrop-blur-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 5h-7V2H1v16h7v3h13V5zM3 16V4h9v12H3zm16 3H10v-1h9V7h2v12h-2z"/></svg>
                </div>
              )}
            </div>

            {/* Image Container - Aspect ratio to match Instagram posts */}
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={card.image} 
                alt="Instagram Content"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramSection;