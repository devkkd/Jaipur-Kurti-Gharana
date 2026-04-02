"use client";
import React from "react";
import { Upload } from "lucide-react";

const WholesaleForm = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
      <div className="flex flex-col lg:flex-row bg-gradient-to-b from-[#FFECF2] to-[#FFD3E1] rounded-3xl overflow-hidden shadow-sm">

        {/* LEFT IMAGE */}
        <div className="w-full lg:w-[40%] h-[250px] md:h-[350px] lg:h-auto">
          <img
            src="/images/about/Wholesale-form.svg"
            alt="Fashion Model"
            className="w-full h-full object-top object-cover"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="w-full lg:w-[60%] p-6 md:p-10 bg-transparent">

          <h2 className="text-2xl md:text-3xl font-bold font-playfair text-center mb-8 text-[#1F1951]">
            Wholesale Collaborations
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* INPUT STYLE */}
            {[
              "Company Name",
              "Contact Person Name",
              "Email Address",
              "Phone / WhatsApp Number",
              "City"
            ].map((label, i) => (
              <div key={i} className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {label}
                </label>
                <input
                  type="text"
                  placeholder={`Enter ${label}`}
                  className="px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E13C6C]/20 focus:border-[#E13C6C]"
                />
              </div>
            ))}

            {/* SELECTS */}
            {[
              { label: "Business Type", options: ["Retailer", "Distributor"] },
              { label: "Country", options: ["India", "USA"] },
              { label: "Approximate Quantity", options: ["10-50", "50-200", "200+"] },
              { label: "Business Verification Proof", options: ["GST Certificate", "Trade License"] }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {item.label}
                </label>
                <select className="px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E13C6C]/20">
                  <option>Select {item.label}</option>
                  {item.options.map((opt, idx) => (
                    <option key={idx}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}

            {/* FILE UPLOAD */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Upload Proof
              </label>
              <label
                htmlFor="fileUpload"
                className="flex items-center justify-between px-4 py-3 border border-dashed border-gray-300 rounded-lg cursor-pointer bg-white text-gray-500 text-sm hover:border-[#E13C6C] transition"
              >
                <span>Upload file</span>
                <Upload size={18} />
              </label>
              <input type="file" id="fileUpload" className="hidden" />
            </div>

            {/* TEXTAREA */}
            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Special Instructions
              </label>
              <textarea
                rows={4}
                placeholder="Write your requirements..."
                className="px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E13C6C]/20"
              />
            </div>

            {/* BUTTON */}
            <div className="md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="bg-[#E13C6C] text-white px-10 py-3 rounded-full text-sm font-semibold hover:bg-[#c92c58] transition shadow-md"
              >
                Submit Enquiry →
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default WholesaleForm;