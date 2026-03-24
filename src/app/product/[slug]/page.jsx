"use client";

import React, { useState, useEffect } from "react";
import { Plus, Minus, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import EnquiryBtn from "@/components/EnquiryBtn";
import ProductCard from "@/components/ProductCard";
import FAQ from "@/components/FAQ";
import ContactUs from "@/components/ContactUs";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-t border-gray-200 transition-colors ${open ? "bg-gray-50/60" : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-1 py-4 text-left group"
      >
        <span className={`text-sm font-semibold transition-colors ${open ? "text-[#1F1951]" : "text-gray-800"}`}>
          {title}
        </span>
        <span className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${open ? "bg-[#1F1951] text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"}`}>
          {open ? <Minus size={12} /> : <Plus size={12} />}
        </span>
      </button>
      {open && (
        <div className="px-1 pb-5 text-sm text-gray-500 leading-relaxed space-y-1.5">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/slug/${slug}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.data);
          const subId = data.data.subcategoryId?._id || data.data.subcategoryId;
          if (subId) {
            const rel = await fetch(`/api/products?subcategoryId=${subId}&limit=5`);
            const relData = await rel.json();
            if (relData.success)
              setRelated(relData.data.filter(p => p._id !== data.data._id).slice(0, 4));
          }
        } else {
          setError(data.error || "Product not found");
        }
      } catch {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr] gap-4 animate-pulse">
          <div className="hidden lg:flex flex-col gap-2">
            {[1,2,3,4,5].map(i => <div key={i} className="w-16 h-20 bg-gray-100 rounded" />)}
          </div>
          <div className="aspect-[2/3] bg-gray-100 rounded-lg" />
          <div className="space-y-4 pt-2">
            <div className="h-4 bg-gray-100 rounded w-1/3" />
            <div className="h-7 bg-gray-100 rounded w-2/3" />
            <div className="h-4 bg-gray-100 rounded w-1/4" />
            <div className="h-10 bg-gray-100 rounded mt-6" />
            <div className="h-10 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 text-sm mb-4">{error || "Product not found"}</p>
        <Link href="/" className="text-[#1F1951] text-sm underline">← Back to home</Link>
      </div>
    );
  }

  const images = [product.images?.main, ...(product.images?.gallery || [])].filter(Boolean);
  const categoryName = typeof product.categoryId === "object" ? product.categoryId?.name : null;
  const subcategoryName = typeof product.subcategoryId === "object" ? product.subcategoryId?.name : null;

  const handleWhatsApp = () => {
    const msg = `Hello! I'm interested in:\n\n*${product.name}*\nSKU: ${product.sku || "N/A"}\nMaterial: ${product.productDetails?.material || "N/A"}\nColor: ${product.color?.name || "N/A"}\n\nPlease share wholesale pricing and MOQ.`;
    window.open(`https://api.whatsapp.com/send?phone=919119127346&text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-8 flex-wrap">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          {categoryName && <><ChevronRight size={10} /><span>{categoryName}</span></>}
          {subcategoryName && <><ChevronRight size={10} /><span>{subcategoryName}</span></>}
          <ChevronRight size={10} />
          <span className="text-gray-600 truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[64px_1fr_420px] gap-4 lg:gap-8 items-start">

          {/* Thumbnail Strip — desktop only */}
          <div className="hidden lg:flex flex-col gap-2 pt-0">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-16 h-20 rounded overflow-hidden border-2 transition-all duration-200 ${
                  activeImg === i ? "border-[#1F1951]" : "border-transparent hover:border-gray-300"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative bg-[#f7f5f2] rounded-xl overflow-hidden w-full" style={{ height: '520px' }}>
            <img
              src={images[activeImg]}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-opacity duration-300"
            />
            {product.isNewArrival && (
              <span className="absolute top-4 left-4 bg-[#1F1951] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                New
              </span>
            )}
            {product.isFeatured && !product.isNewArrival && (
              <span className="absolute top-4 left-4 bg-[#DE3163] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Featured
              </span>
            )}
          </div>

          {/* Mobile thumbnails */}
          {images.length > 1 && (
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-1 col-span-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`shrink-0 w-14 h-16 rounded overflow-hidden border-2 transition-all ${
                    activeImg === i ? "border-[#1F1951]" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Info Panel */}
          <div className="flex flex-col gap-4 lg:pt-0">

            {/* Category label */}
            {subcategoryName && (
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#DE3163]">
                {subcategoryName}
              </p>
            )}

            {/* Name */}
            <h1 className="text-2xl font-semibold text-gray-900 leading-snug">
              {product.name}
            </h1>

            {/* SKU */}
            <p className="text-xs text-gray-400">SKU: {product.sku || "—"}</p>

            {/* Color */}
            {product.color?.name && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium text-gray-700">Color:</span>
                {product.color.code && (
                  <span
                    className="w-4 h-4 rounded-full border border-gray-300 inline-block"
                    style={{ backgroundColor: product.color.code }}
                  />
                )}
                <span>{product.color.name}</span>
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-700 mb-2">Size:</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(s => (
                    <span
                      key={s.size}
                      className={`min-w-[40px] text-center px-3 py-1.5 text-xs border rounded transition-colors ${
                        s.available
                          ? "border-gray-300 text-gray-800 hover:border-[#1F1951] cursor-default"
                          : "border-gray-100 text-gray-300 bg-gray-50 line-through cursor-not-allowed"
                      }`}
                    >
                      {s.size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-500 text-[11px] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-2.5 mt-1">
              <EnquiryBtn product={product} fullWidth />
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-[11px] md:text-[12px] font-bold uppercase tracking-wide py-3.5 rounded-full transition-all duration-300 active:scale-95"
              >
                <img src="/images/icon/whatsapp.svg" alt="" className="w-4 h-4" />
                WhatsApp
              </button>
            </div>

            {/* Accordions */}
            <div className="mt-2">
              <Accordion title="Details">
                <p>{product.description}</p>
              </Accordion>

              {product.productDetails && (
                <Accordion title="Material & Fabric">
                  <p><span className="text-gray-700 font-medium">Material:</span> {product.productDetails.material}</p>
                  <p><span className="text-gray-700 font-medium">Care:</span> {product.productDetails.productCare}</p>
                  {product.productDetails.additionalInfo && (
                    <p><span className="text-gray-700 font-medium">Note:</span> {product.productDetails.additionalInfo}</p>
                  )}
                </Accordion>
              )}

              <Accordion title="Shipping & Delivery">
                <p>Orders are processed within 2–3 business days. Pan-India delivery in 5–7 days. International shipping available on request.</p>
              </Accordion>

              <Accordion title="Wholesale Inquiry">
                <p>Available for bulk/wholesale orders. Minimum order quantities apply. Contact us via WhatsApp or the enquiry form for pricing and availability.</p>
              </Accordion>

              <div className="border-t border-gray-200" />
            </div>

          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      <div className="mt-16">
        <CraftsmanshipSection />
      </div>
      <FAQ />
      <ContactUs />
    </div>
  );
}
