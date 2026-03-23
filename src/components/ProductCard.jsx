import React from "react";
import Link from "next/link";
import EnquiryBtn from "./EnquiryBtn";

const ProductCard = ({ product }) => {
  // Get main image from product.images.main or fallback
  const mainImage = product?.images?.main || product?.image || "/placeholder.jpg";

  // Get product name
  const productName = product?.name || product?.title || "Untitled Product";

  // Get product description
  const productDescription = product?.description || "";

  // Get product slug for URL
  const productSlug = product?.slug || product?._id;

  // WhatsApp inquiry handler
  const handleWhatsAppInquiry = () => {
    const material = product?.material || product?.productDetails?.material || "Premium Fabric";
    const color = product?.primaryColor || product?.color?.name || "As Shown";

    const message = `Hello! I'm interested in this product:

*${productName}*
SKU: ${product?.sku || 'N/A'}
Material: ${material}
Color: ${color}

Please provide wholesale pricing, MOQ, and delivery details.

Thank you!`;

    const whatsappNumber = "919119127346"; // Update with actual number
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-col justify-between group">
      {/* Image */}
      <Link href={`/product/${productSlug}`} className="block">
        <div className="relative aspect-[8/9] max-h-80 mb-2.5 overflow-hidden rounded-md bg-gray-100">
          <img
            src={mainImage}
            alt={productName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.isNewArrival && (
            <span className="absolute top-3 left-3 bg-[#00C349] text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
              New
            </span>
          )}
          {product.isFeatured && !product.isNewArrival && (
            <span className="absolute top-3 left-3 bg-[#DE3163] text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
              Featured
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="space-y-1">
        <Link href={`/product/${productSlug}`}>
          <h3 className="font-semibold text-[#1a1a1a] text-sm leading-snug hover:underline line-clamp-1">
            {productName}
          </h3>
        </Link>

        <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2">
          {productDescription}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-3 mr-5 pt-1.5">
          <EnquiryBtn product={product} />
          <button
            onClick={handleWhatsAppInquiry}
            className="w-11 h-11 shrink-0 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-sm hover:bg-[#20BA5A] transition-colors"
            title="WhatsApp Inquiry"
          >
            <img src="/images/icon/whatsapp.svg" alt="WA" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
