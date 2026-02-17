"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { useParams } from "next/navigation";
import EnquiryBtn from "@/components/EnquiryBtn";
import ProductCard from "@/components/ProductCard";
import FAQ from "@/components/FAQ";
import ContactUs from "@/components/ContactUs";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import ProductContact from "@/components/ProductContact";
import ProductEnquiry from "@/components/ProductEnquiry";

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/api/products/slug/${slug}`);
        const result = await response.json();
        
        if (result.success) {
          setProduct(result.data);
          
          // Fetch related products by category
          if (result.data.categoryId) {
            const categoryId = result.data.categoryId._id || result.data.categoryId;
            const relatedResponse = await fetch(
              `/api/products?categoryId=${categoryId}&limit=9`
            );
            const relatedResult = await relatedResponse.json();
            
            if (relatedResult.success) {
              // Filter out current product and take 8 products
              const filtered = relatedResult.data.filter(p => p._id !== result.data._id);
              setRelatedProducts(filtered.slice(0, 8));
            }
          }
        } else {
          setError(result.error || 'Product not found');
        }
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-[1441px] mx-auto px-4 py-20">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-500 text-sm">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="max-w-[1441px] mx-auto px-4 py-20">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-2">Error</p>
          <p className="text-gray-500 text-sm">{error || 'Product not found'}</p>
        </div>
      </div>
    );
  }

  const allImages = [
    product.images?.main,
    ...(product.images?.gallery || [])
  ].filter(Boolean);

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-[1441px] mx-auto px-4 py-12 font-sans overflow-hidden">
      {/* PRODUCT DETAIL SECTION */}
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* LEFT: Image Gallery */}
        <div className="lg:w-1/2">
          {/* Main Image */}
          <div className="relative aspect-[1] bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={allImages[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? "border-black"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Info */}
        <div className="lg:w-1/2 space-y-6">
          {/* Product Name */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {product.name}
          </h1>

          {/* Style Code & SKU */}
          <div className="flex gap-4 text-sm text-gray-600">
            <span>Style Code: <strong>{product.styleCode}</strong></span>
            <span>SKU: <strong>{product.sku}</strong></span>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-gray-900">
            ₹{product.priceRange.min} – ₹{product.priceRange.max}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color */}
          {product.color && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Color</h3>
              <div className="flex items-center gap-3">
                {product.color.code && (
                  <div
                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: product.color.code }}
                  ></div>
                )}
                <span className="text-sm text-gray-700">{product.color.name}</span>
              </div>
            </div>
          )}

          {/* Size Display */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Available Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sizeObj) => (
                  <span
                    key={sizeObj.size}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                      sizeObj.available
                        ? "border-gray-300 text-gray-700"
                        : "border-gray-200 text-gray-400"
                    }`}
                  >
                    {sizeObj.size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Product Details */}
          {product.productDetails && (
            <div className="space-y-4 border-t pt-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Material</h3>
                <p className="text-sm text-gray-600">{product.productDetails.material}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Product Care</h3>
                <p className="text-sm text-gray-600">{product.productDetails.productCare}</p>
              </div>
              {product.productDetails.additionalInfo && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Additional Info</h3>
                  <p className="text-sm text-gray-600">{product.productDetails.additionalInfo}</p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <EnquiryBtn product={product} className="flex-1" />
            
            <button className="w-12 h-12 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-sm hover:bg-[#20BA5A] transition-colors">
              <MessageCircle size={20} fill="white" stroke="none" />
            </button>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>


<div className="my-16">
<ProductEnquiry/>
</div>

      {/* RELATED PRODUCTS - Discover Similar Designs */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 mb-16 mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900 mb-12">
            Discover Similar Designs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct._id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
      {/* CRAFTSMANSHIP SECTION */}
      <div>
        <CraftsmanshipSection />
      </div>

      {/* FAQ SECTION */}
      <div>
        <FAQ />
      </div>

      {/* CONTACT US SECTION */}
      <div >
        <ContactUs />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
