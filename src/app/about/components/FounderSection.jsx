import Image from 'next/image';

const FounderSection = () => {
  return (
    <section className="bg-white py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        
        {/* Left Side: Image Container */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full md:aspect-[5/4] overflow-hidden rounded-sm shadow-sm">
            <Image
              src="/images/about/about4.png" // Replace with your image
              alt="Mr. Rishabh Agarwal"
              fill
              className="object-cover object-top w-full h-full"
              priority
            />
          </div>
        </div>

        {/* Right Side: Content Container */}
        <div className="w-full md:w-1/2 text-center md:text-right">
          {/* Subheading with Dots */}
          <div className="flex items-center justify-center md:justify-end gap-2">
           <h2 className="text-[10px] md:text-2xl py-4 font-playfair font-bold  text-[#E13C6C] ">
          Jaipur Kurti Gharana
          </h2>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-playfair font-bold text-gray-900 mb-3">
            About the Founder
          </h2>
          <h3 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
            Mr. Rishabh Agarwal
          </h3>

          {/* Body Text */}
          <div className="space-y-6 text-black font-mont  leading-relaxed text-sm">
            <p>
              <span className="font-bold">Founded in 2016,  Jaipur Kurti Gharana</span> was envisioned by 
              <span className="font-bold"> Mr. Rishabh Agarwal</span>  with a clear mission: to elevate Jaipur’s textile artistry through reliable, high-quality apparel tailored for modern markets. Under his leadership, the brand has evolved into a trusted wholesale partner for retailers and boutiques across India.
            </p>

            <p>
             With a nuanced understanding of both craftsmanship and commerce, Jaipur Kurti Gharana seamlessly serves retail clients and bulk buyers alike—delivering competitive pricing, dependable production, and enduring design value.
            </p>

            <p className="font-bold">
              More than a manufacturer, Jaipur Kurti Gharana is a long-term partner committed to building profitable, premium ethnic fashion businesses grounded in quality, trust, and tradition.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FounderSection;