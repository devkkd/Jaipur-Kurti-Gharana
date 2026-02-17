import React from 'react';
import { Upload } from 'lucide-react';

const WholesaleForm = () => {
  return (
    <div className="flex flex-col max-w-[90rem] justify-center mx-auto lg:flex-row bg-gradient-to-b from-[#FFECF2] to-[#FFD3E1]">
      {/* Left Side: Image Section */}
      {/* <div className="w-full lg:w-3/7 relative  m-6">
        <img
          src="/images/about/Wholesale-form.svg"
          alt="Fashion Model"
          className="absolute inset-0 w-full rounded-3xl object-cover"
        />
      </div> */}

      {/* Right Side: Form Section */}
      <div className="w-3/4  p-6  flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-bold font-playfair text-center mb-6">
        Wholesale Collaborations
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
          {/* Company Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              placeholder="Enter Company Name"
              className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white"
            />
          </div>

          {/* Business Type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Business Type</label>
            <select className="p-2 border border-gray-200 rounded-md focus:outline-none bg-white">
              <option>Select Business Type</option>
              <option>Retailer</option>
              <option>Distributor</option>
            </select>
          </div>

          {/* Contact Person Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Contact Person Name</label>
            <input
              type="text"
              placeholder="Enter Contact Person Name"
              className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter Email Address"
              className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white"
            />
          </div>

          {/* Phone/WhatsApp */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Phone / WhatsApp Number</label>
            <input
              type="text"
              placeholder="Enter Phone / WhatsApp Number"
              className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white"
            />
          </div>

          {/* Country */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Country</label>
            <select className="p-2 border border-gray-200 rounded-md focus:outline-none bg-white">
              <option>Select Country</option>
              <option>India</option>
              <option>USA</option>
            </select>
          </div>

          {/* City */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              placeholder="Enter City Name"
              className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white"
            />
          </div>

          {/* Approximate Quantity */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Approximate Quantity</label>
            <select className="p-2 border border-gray-200 rounded-md focus:outline-none bg-white">
              <option>Select Approximate Quantity</option>
              <option>10-50</option>
              <option>50-200</option>
              <option>200+</option>
            </select>
          </div>

          {/* Business Verification Proof Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Business Verification Proof</label>
            <select className="p-2 border border-gray-200 rounded-md focus:outline-none bg-white">
              <option>Select your business verification proof</option>
              <option>GST Certificate</option>
              <option>Trade License</option>
            </select>
          </div>

          {/* Upload Section */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Upload Image Business Verification Proof</label>
            <div className="relative">
              <input
                type="file"
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="flex items-center justify-between p-2 border border-gray-200 rounded-md cursor-pointer bg-white text-gray-400 text-sm"
              >
                <span>Upload Image Business Verification Proof</span>
                <Upload size={18} />
              </label>
            </div>
          </div>

          {/* Special Instructions - Full Width */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Special Instructions for Your Requirement</label>
            <textarea
              rows={4}
              placeholder="Write Special Instructions for Your Requirement here..."
              className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-[#E13C6C] text-white px-10 py-3 rounded-full flex items-center gap-2 hover:bg-opacity-90 transition-all font-medium"
            >
              Submit Enquiry <span className="text-lg">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WholesaleForm;