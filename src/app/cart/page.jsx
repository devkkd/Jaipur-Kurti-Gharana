"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag, MessageCircle } from "lucide-react";
import { useEnquiry } from "@/context/CartContext";
import toast, { Toaster } from "react-hot-toast";

const CartPage = () => {
  const { Enquiries, removeEnquiry, clearEnquiries } = useEnquiry();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    notes: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (Enquiries.length === 0) {
      toast.error("Please add products to inquiry first");
      return;
    }

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          products: Enquiries
        })
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Inquiry submitted successfully! We'll contact you soon.");
        
        // Clear form and enquiries after successful submission
        setFormData({  
          fullName: "",
          email: "",
          phone: "",
          company: "",
          location: "",
          notes: ""
        });
        clearEnquiries();
      } else {
        toast.error(result.error || "Failed to submit inquiry");
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error("Failed to submit inquiry. Please try again.");
    }
  };

  const handleWhatsAppInquiry = () => {
    if (Enquiries.length === 0) {
      toast.error("Please add products to inquiry first");
      return;
    }

    // Build detailed product list with all information
    const productList = Enquiries.map((item, index) => {
      const productName = item.name || item.title;
      const styleCode = item.styleCode || item._id.slice(-6);
      
      // Get actual material and color from database
      const material = item.material || item.productDetails?.material || "Premium Fabric";
      const color = item.primaryColor || item.color || "As Shown";
      
      return `${index + 1}. *${productName}*
   Style Code: ${styleCode}
   Material: ${material}
   Color: ${color}`;
    }).join("\n\n");

    // Build customer details if filled
    let customerDetails = "";
    if (formData.fullName || formData.email || formData.phone || formData.company || formData.location) {
      customerDetails = "\n\n*Customer Details:*\n";
      if (formData.fullName) customerDetails += `Name: ${formData.fullName}\n`;
      if (formData.email) customerDetails += `Email: ${formData.email}\n`;
      if (formData.phone) customerDetails += `Phone: ${formData.phone}\n`;
      if (formData.company) customerDetails += `Company: ${formData.company}\n`;
      if (formData.location) customerDetails += `Location: ${formData.location}\n`;
    }

    // Add notes if provided
    let notesSection = "";
    if (formData.notes) {
      notesSection = `\n\n*Additional Requirements:*\n${formData.notes}`;
    }

    // Complete message
    const message = `Hello! I'm interested in wholesale inquiry for the following products:

*Selected Products (${Enquiries.length}):*

${productList}${customerDetails}${notesSection}

Please provide wholesale pricing, MOQ, and delivery details.

Thank you!`;

    // Use api.whatsapp.com instead of wa.me for better compatibility
    // This works even if number is not on WhatsApp
    const whatsappNumber = "919119127346"; // Update this with actual number
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success("Opening WhatsApp...");
  };

  // --- EMPTY STATE ---
  if (Enquiries.length === 0) {
    return (
      <section className="w-full bg-white py-24 px-4 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 text-[#1F1951]">
          <ShoppingBag size={40} strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-[#1F1951] mb-4 text-center">
          Your Inquiry List is Empty
        </h2>
        <p className="text-gray-500 max-w-sm text-center text-sm md:text-base mb-10">
          Explore our latest collections to request a customized wholesale quote.
        </p>
        <Link
          href="/store/suits-set"
          className="bg-[#1F1951] text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-[#2a2f6b] transition-all"
        >
          Go to Store
        </Link>
      </section>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <section className="w-full bg-white py-12 md:py-20 px-4">
        <div className="max-w-[1300px] mx-auto">
          {/* Page Header */}
          <div className="mb-12 border-b border-gray-100 pb-8 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif text-[#1F1951] mb-3">
              Request a Quote
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl">
              Review your selected manufacturing items. Submit your details below, and our team will provide a tailored wholesale price consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* ================= LEFT: INQUIRY ITEMS LIST ================= */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4">
                {Enquiries.map((item) => (
                  <div
                    key={item._id}
                    className="group relative flex flex-col sm:flex-row gap-6 p-5 bg-white border border-gray-100 rounded-[2rem] hover:shadow-xl hover:shadow-gray-100 transition-all duration-500"
                  >
                    {/* Product Image */}
                    <div className="relative w-full sm:w-36 h-44 shrink-0 bg-gray-50 rounded-2xl overflow-hidden shadow-sm">
                      <img
                        src={item.images?.main || "/placeholder.png"}
                        alt={item.name || item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col py-2">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <h3 className="text-[#1F1951] font-serif text-xl leading-tight mb-2">
                            {item.name || item.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="text-[10px] font-bold text-[#E12B5E] uppercase tracking-widest bg-pink-50 px-2 py-1 rounded">
                              ID: {item.styleCode || item._id.slice(-6)}
                            </span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => {
                            removeEnquiry(item._id);
                            toast.error("Item removed");
                          }}
                          className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {/* Specifications */}
                      <div className="mt-auto grid grid-cols-2 gap-y-2 text-sm">
                        <p className="text-gray-500">
                          <span className="font-bold text-gray-800">Material:</span>{" "}
                          {item.productDetails?.material || "Premium Fabric"}
                        </p>
                        <p className="text-gray-500">
                          <span className="font-bold text-gray-800">Color:</span>{" "}
                          {item.color?.name || "As Shown"}
                        </p>
                        <p className="text-gray-500">
                          <span className="font-bold text-gray-800">Care:</span>{" "}
                          {item.productDetails?.productCare || "Dry Clean"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= RIGHT: CONSULTATION FORM ================= */}
            <div className="lg:col-span-5">
              <div className="bg-[#1F1951]/[0.02] p-8 md:p-10 rounded-[3rem] border border-gray-100 sticky top-32 shadow-sm">
                <div className="mb-8">
                  <h2 className="text-3xl font-serif text-[#1F1951] mb-2">Consultation</h2>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
                    Reseller Details
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-1 tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                      className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1F1951]/10 text-gray-800 placeholder-gray-300 transition-all text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-1 tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="business@email.com"
                      required
                      className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1F1951]/10 text-gray-800 placeholder-gray-300 transition-all text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-1 tracking-wider">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 00000 00000"
                      required
                      className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1F1951]/10 text-gray-800 placeholder-gray-300 transition-all text-sm"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-1 tracking-wider">
                      Company / Store Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Optional"
                      className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1F1951]/10 text-gray-800 placeholder-gray-300 transition-all text-sm"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-1 tracking-wider">
                      City & Country
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Jaipur, India"
                      className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1F1951]/10 text-gray-800 placeholder-gray-300 transition-all text-sm"
                    />
                  </div>

                  {/* Notes */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-1 tracking-wider">
                      Additional Requirements
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Sizes needed, quantity per style, etc..."
                      className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1F1951]/10 text-gray-800 placeholder-gray-300 text-sm resize-none"
                    />
                  </div>

                  {/* Summary & Action */}
                  <div className="pt-6 mt-4 border-t border-gray-200/50">
                    <div className="flex justify-between items-center mb-6 px-1">
                      <span className="text-gray-500 text-sm font-medium">Selected Styles:</span>
                      <span className="text-2xl font-bold text-[#1F1951]">{Enquiries.length}</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#1F1951] text-white py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#2a2f6b] transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-95"
                    >
                      Submit Inquiry
                      <ArrowRight size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppInquiry}
                      className="w-full mt-3 bg-[#00D95F] text-white py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95"
                    >
                      WhatsApp Inquiry
                      <MessageCircle size={18} fill="white" />
                    </button>

                    <p className="text-[10px] text-center text-gray-400 mt-5 italic">
                      Our team usually responds within 2-4 business hours.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
