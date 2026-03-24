"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, ChevronRight, Loader2, CheckCircle, Minus } from "lucide-react";

const DELAY_MS = 2500;

const inputCls =
  "w-full border border-gray-200 rounded-xl px-3 py-2 text-xs font-mont focus:outline-none focus:ring-2 focus:ring-[#1F1951]/20 focus:border-[#1F1951] bg-white placeholder:text-gray-400 transition";

const selectCls =
  "w-full border border-gray-200 rounded-xl px-3 py-2 text-xs font-mont focus:outline-none focus:ring-2 focus:ring-[#1F1951]/20 focus:border-[#1F1951] bg-white transition";

const labelCls = "text-[10px] font-bold font-mont text-gray-400 uppercase tracking-widest";

export default function InquiryPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [minimizing, setMinimizing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    contactPersonName: "",
    phoneNumber: "",
    email: "",
    city: "",
    country: "India",
    businessType: "Retailer",
    quantityRequired: "50-100 pieces",
    customisationRequirement: "No customization needed",
  });

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => setVisible(false), 300);
  };

  const handleMinimize = () => {
    setMinimizing(true);
    setTimeout(() => {
      setMinimized(true);
      setMinimizing(false);
    }, 280);
  };

  const handleExpand = () => {
    setMinimized(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/customer-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => handleClose(), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-5 right-4 z-[999] flex flex-col items-end gap-2">
      {minimized ? (
        /* Minimized pill */
        <button
          onClick={handleExpand}
          className="inquiry-pill-enter flex items-center gap-2 bg-[#1F1951] text-white px-5 py-3 rounded-full shadow-2xl text-[11px] font-bold font-mont uppercase tracking-widest hover:bg-[#2d2852] transition-colors"
        >
          <img src="/images/icon/whatsapp.svg" alt="" className="w-4 h-4" />
          Quick Inquiry
          <ChevronRight size={13} />
        </button>
      ) : (
        /* Full popup */
        <div className={`w-[320px] sm:w-[360px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden ${minimizing ? 'inquiry-popup-exit' : 'inquiry-popup-enter'} ${closing ? 'inquiry-popup-exit' : ''}`}>

          {/* Header */}
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{
              background: "linear-gradient(135deg, #1F1951 0%, #801830 100%)",
            }}
          >
            <div>
              <p className="text-white font-bold font-playfair text-sm tracking-wide">
                Wholesale Inquiry
              </p>
              <p className="text-white/60 font-mont text-[10px] mt-0.5 tracking-wider uppercase">
                Get pricing & MOQ details
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleMinimize}
                className="text-white/50 hover:text-white transition p-1.5 rounded-lg hover:bg-white/10"
                aria-label="Minimize"
              >
                <Minus size={14} />
              </button>
              <button
                onClick={handleClose}
                className="text-white/50 hover:text-white transition p-1.5 rounded-lg hover:bg-white/10"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Decorative line */}
          <div className="h-[2px] bg-gradient-to-r from-[#E13C6C] via-[#801830] to-[#1F1951]" />

          {/* Body */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 px-6 gap-3">
              <CheckCircle size={40} className="text-[#E13C6C]" />
              <p className="text-sm font-bold font-playfair text-[#1F1951] text-center">
                Thank you for your inquiry!
              </p>
              <p className="text-[11px] font-mont text-gray-400 text-center">
                Our team will reach out within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="px-5 py-4 space-y-3 max-h-[420px] overflow-y-auto scrollbar-hide"
            >
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className={labelCls}>Company</label>
                  <input name="companyName" required value={form.companyName} onChange={handleChange} placeholder="Company name" className={inputCls} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelCls}>Contact</label>
                  <input name="contactPersonName" required value={form.contactPersonName} onChange={handleChange} placeholder="Your name" className={inputCls} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className={labelCls}>Phone</label>
                  <input name="phoneNumber" required value={form.phoneNumber} onChange={handleChange} placeholder="+91 XXXXX" className={inputCls} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelCls}>Email</label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@email.com" className={inputCls} />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className={labelCls}>City</label>
                  <input name="city" required value={form.city} onChange={handleChange} placeholder="City" className={inputCls} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelCls}>Country</label>
                  <input name="country" required value={form.country} onChange={handleChange} placeholder="Country" className={inputCls} />
                </div>
              </div>

              {/* Business Type */}
              <div className="flex flex-col gap-1">
                <label className={labelCls}>Business Type</label>
                <select name="businessType" value={form.businessType} onChange={handleChange} className={selectCls}>
                  <option>Retailer</option>
                  <option>Wholesaler</option>
                  <option>Distributor</option>
                  <option>Online Store</option>
                  <option>Boutique</option>
                  <option>Export House</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-1">
                <label className={labelCls}>Quantity Required</label>
                <select name="quantityRequired" value={form.quantityRequired} onChange={handleChange} className={selectCls}>
                  <option>50-100 pieces</option>
                  <option>100-500 pieces</option>
                  <option>500-1000 pieces</option>
                  <option>1000-5000 pieces</option>
                  <option>5000+ pieces</option>
                </select>
              </div>

              {/* Customisation */}
              <div className="flex flex-col gap-1">
                <label className={labelCls}>Customisation</label>
                <select name="customisationRequirement" value={form.customisationRequirement} onChange={handleChange} className={selectCls}>
                  <option>No customization needed</option>
                  <option>Minor alterations</option>
                  <option>Custom designs</option>
                  <option>Private labeling</option>
                  <option>Full customization</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white py-2.5 rounded-xl text-xs font-bold font-mont uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-1"
                style={{ background: "linear-gradient(135deg, #1F1951 0%, #801830 100%)" }}
              >
                {loading ? (
                  <><Loader2 size={13} className="animate-spin" /> Submitting...</>
                ) : (
                  <>Send Inquiry <ChevronRight size={13} /></>
                )}
              </button>

              <p className="text-[10px] font-mont text-gray-400 text-center pb-1">
                We respond within 24 hours · No spam
              </p>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
