"use client";

import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ProductEnquiry = ({ productId = null, productName = null }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPersonName: '',
    phoneNumber: '',
    email: '',
    city: '',
    country: '',
    businessType: '',
    quantityRequired: '',
    expectedOrderFrequency: '',
    targetDeliveryTimeline: '',
    customisationRequirement: '',
    specialInstructions: '',
    productId: productId,
    productName: productName
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/customer-inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Inquiry submitted successfully! We will contact you soon.');
        // Reset form
        setFormData({
          companyName: '',
          contactPersonName: '',
          phoneNumber: '',
          email: '',
          city: '',
          country: '',
          businessType: '',
          quantityRequired: '',
          expectedOrderFrequency: '',
          targetDeliveryTimeline: '',
          customisationRequirement: '',
          specialInstructions: '',
          productId: productId,
          productName: productName
        });
      } else {
        toast.error(result.error || 'Failed to submit inquiry');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#F9F8FF] py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto rounded-3xl p-8 md:p-12">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-center text-gray-900 mb-10 tracking-widest uppercase">
          Product Enquiry
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
              <input 
                type="text" 
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter Company Name" 
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person Name *</label>
              <input 
                type="text" 
                name="contactPersonName"
                value={formData.contactPersonName}
                onChange={handleChange}
                placeholder="Enter Contact Person Name" 
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone / WhatsApp Number *</label>
              <input 
                type="text" 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter Phone / WhatsApp Number" 
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
              <input 
                type="text" 
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter City Name" 
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Order Frequency *</label>
              <select 
                name="expectedOrderFrequency"
                value={formData.expectedOrderFrequency}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm text-gray-700"
              >
                <option value="">Select Expected Order Frequency</option>
                <option value="One-time order">One-time order</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Bi-annually">Bi-annually</option>
                <option value="Annually">Annually</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Business Type *</label>
              <select 
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm text-gray-700"
              >
                <option value="">Select Business Type</option>
                <option value="Retailer">Retailer</option>
                <option value="Wholesaler">Wholesaler</option>
                <option value="Distributor">Distributor</option>
                <option value="Online Store">Online Store</option>
                <option value="Boutique">Boutique</option>
                <option value="Export House">Export House</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email Address" 
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Country *</label>
              <input 
                type="text" 
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter Country" 
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity Required *</label>
              <select 
                name="quantityRequired"
                value={formData.quantityRequired}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm text-gray-700"
              >
                <option value="">Select Quantity Required</option>
                <option value="50-100 pieces">50-100 pieces</option>
                <option value="100-500 pieces">100-500 pieces</option>
                <option value="500-1000 pieces">500-1000 pieces</option>
                <option value="1000-5000 pieces">1000-5000 pieces</option>
                <option value="5000+ pieces">5000+ pieces</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Target Delivery Timeline *</label>
              <select 
                name="targetDeliveryTimeline"
                value={formData.targetDeliveryTimeline}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm text-gray-700"
              >
                <option value="">Select Target Delivery Timeline</option>
                <option value="Within 1 week">Within 1 week</option>
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="2-4 weeks">2-4 weeks</option>
                <option value="1-2 months">1-2 months</option>
                <option value="2-3 months">2-3 months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>

          {/* Full Width Fields */}
          <div className="md:col-span-2 space-y-6 mt-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Customisation Requirement *</label>
              <select 
                name="customisationRequirement"
                value={formData.customisationRequirement}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm text-gray-700"
              >
                <option value="">Select Customisation Requirement</option>
                <option value="No customization needed">No customization needed</option>
                <option value="Minor alterations">Minor alterations</option>
                <option value="Custom designs">Custom designs</option>
                <option value="Private labeling">Private labeling</option>
                <option value="Full customization">Full customization</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Special Instructions</label>
              <textarea 
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                rows="4" 
                placeholder="Write Special Instructions here..." 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="bg-[#1e1b4b] text-white px-10 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-[#2e2a6e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Enquiry'} <span>→</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProductEnquiry;