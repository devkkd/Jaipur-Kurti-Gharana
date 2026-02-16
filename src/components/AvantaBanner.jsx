import React from 'react';

const AvantaBanner = () => {
  return (
    <div className='w-full bg-[#A30B43]'>
      <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row overflow-hidden">

        {/* Left Image Section - Hidden on mobile or smaller for better focus */}
        <div className="hidden md:block w-1/5 relative">
          <img
            src="/images/manufacuring/image-44.svg"
            alt="Model Left"
            className=" object-cover object-center"
          />
        </div>

        {/* Center Text Section */}
        <div className="flex-1 flex flex-col justify-center -mt-3 items-center text-white  px-6 text-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <p className="tracking-[0.1em] text-xs  md:text-sm font-semibold uppercase">
              Avanta by Jaipur Kurti Gharana
            </p>
            <span className="w-2 h-2 bg-white rounded-full"></span>
          </div>

          <h1 className="text-2xl md:text-4xl font-cinzel pb-3 font-bold lg:text-4xl tracking-wide leading-tight uppercase">
            This Season's Most Coveted Avanta Pieces
          </h1>
        </div>

        {/* Right Image Section */}
        <div className="w-full md:w-1/5 relative hidden md:block">
          <img
            src="/images/manufacuring/image-43.svg"
            alt="Model Right"
            className="object-cover object-center"
          />
        </div>

      </div>
    </div>
  );
};

export default AvantaBanner;