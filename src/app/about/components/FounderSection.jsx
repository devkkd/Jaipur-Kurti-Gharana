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
          <div className="flex items-center justify-center md:justify-end gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-rose-600 rounded-full"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-gray-800 uppercase">
              Avanta by Jaipur Kurti Gharana
            </span>
            <span className="w-1.5 h-1.5 bg-rose-600 rounded-full"></span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-cinzel font-bold text-gray-900 mb-2">
            About the Founder
          </h2>
          <h3 className="text-3xl md:text-4xl font-cinzel font-bold text-gray-900 mb-8">
            Mr. Rishabh Agarwal
          </h3>

          {/* Body Text */}
          <div className="space-y-6 text-black leading-relaxed text-sm md:text-base">
            <p>
              <span className="font-bold">Founded in 2016, Avanta India</span> was envisioned by 
              <span className="font-bold"> Mr. Rishabh Agarwal</span> with a clear mission to elevate 
              Jaipur's textile artistry through reliable, high-quality apparel for modern markets. 
              Under his leadership, the brand has grown into a trusted wholesale partner for 
              retailers and boutiques nationwide.
            </p>

            <p>
              With a deep understanding of both craftsmanship and commerce, Avanta India 
              seamlessly serves retail clients and bulk buyers alike, offering competitive pricing, 
              dependable production, and enduring design value.
            </p>

            <p className="font-bold">
              Avanta India is more than a manufacturer it is a long-term partner in 
              building profitable, premium ethnic fashion businesses.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FounderSection;