import React from 'react';

const ContactUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-12 font-sans text-[#333]">
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* Left Section: Contact Details */}
        <div className="w-full lg:w-1/3">
          <div className="flex items-center justify-start gap-2 mb-2">
             <h2 className="text-[10px] md:text-2xl font-playfair font-bold text-[#E13C6C]">   
             Jaipur Kurti Gharana
          </h2>
          </div>

          <h1 className="text-2xl md:text-4xl font-playfair font-bold mb-3 text-black">
            Contact Us
          </h1>

          <div className="space-y-4">
            {/* Address */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-bold text-sm mb-1">Address</h4>
              <p className="text-xs leading-relaxed text-gray-600 max-w-xs">
                Plot No-6, Aaykar Nagar-II, New Sanganer Rd, near Ricco Kanta Choraha, Mansarovar, Jaipur, Rajasthan 302020 - INDIA
              </p>
            </div>

            {/* Phone */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-bold text-sm mb-1">Phone No</h4>
              <p className="text-xs text-gray-600">+91-9784562130</p>
            </div>

            {/* Email */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-bold text-sm mb-1">Email</h4>
              <p className="text-xs text-gray-600">jaipurkurtigharana@gmail.com</p>
            </div>

            {/* Business Hours */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-bold text-sm mb-1">Business Hours</h4>
              <p className="text-xs text-gray-600">Weekdays - 11AM to 8PM</p>
            </div>
          </div>
        </div>

        {/* Right Section: Images & Map */}
        <div className="w-full lg:w-2/3 flex flex-col md:flex-row gap-4 h-[280px] md:h-[380px]">
          <div className="relative flex-1 h-full rounded-xl overflow-hidden shadow-md">
            <img
              src="/images/commitment/contact1.png"
              alt="Hawa Mahal Jaipur"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Functional Google Map */}
          <div className="relative flex-1 h-full rounded-xl overflow-hidden shadow-md border border-gray-100">
            <iframe
              src="https://maps.google.com/maps?q=Plot+No-6,+Aaykar+Nagar-II,+New+Sanganer+Rd,+near+Ricco+Kanta+Choraha,+Mansarovar,+Jaipur,+Rajasthan+302020&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute top-0 left-0 w-full h-full border-0 grayscale-[20%]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;