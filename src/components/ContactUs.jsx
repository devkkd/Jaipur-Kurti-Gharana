import React from 'react';
import Image from 'next/image';

const ContactUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-20  font-sans text-[#333]">
      <div className="flex flex-col lg:flex-row gap-10 items-start">

        {/* Left Section: Contact Details */}
        <div className="w-full lg:w-1/3">
          <div className="flex items-center justify-start gap-2 mb-3 md:mb-4">
            <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
            <h3 className="text-[10px] md:text-sm font-bold text-[#1a1a3d] uppercase tracking-widest">
              Avanta by Jaipur Kurti Gharana
            </h3>
            <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
          </div>

          <h1 className="text-3xl md:text-4xl font-cinzel font-bold mb-12 text-black">
            Contact Us
          </h1>

          <div className="space-y-8">
            {/* Address */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-bold text-lg mb-2">Address</h4>
              <p className="text-sm leading-relaxed text-gray-600 max-w-xs">
                Plot No-6, Aaykar Nagar-II, New Sanganer Rd, near Ricco Kanta Choraha, Mansarovar, Jaipur, Rajasthan 302020 - INDIA
              </p>
            </div>

            {/* Phone */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-bold text-lg mb-2">Phone No</h4>
              <p className="text-sm text-gray-600">+91-9784562130</p>
            </div>

            {/* Email */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-bold text-lg mb-2">Email</h4>
              <p className="text-sm text-gray-600">jaipurkurtigharana@gmail.com</p>
            </div>

            {/* Business Hours */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-bold text-lg mb-2">Business Hours</h4>
              <p className="text-sm text-gray-600">Weekdays - 11AM to 8PM</p>
            </div>
          </div>
        </div>

        {/* Right Section: Images */}
        <div className="w-full lg:w-2/3 flex flex-col md:flex-row gap-6 h-[500px] md:h-[600px]">
          {/* Hawa Mahal Image */}
          <div className="relative flex-1 h-full rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/images/commitment/contact1.png"
              alt="Hawa Mahal Jaipur"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Map Image */}
          <div className="relative flex-1 h-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            {/* Note: In a real app, replace this img with an iframe for Google Maps */}
            <img
              src="/images/commitment/contact2.png"
              alt="Location Map"
              className="w-full h-full object-cover grayscale-[20%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;