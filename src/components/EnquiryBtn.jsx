"use client";

import { useEnquiry } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function EnquiryBtn({ product }) {
  const { Enquiries, addEnquiry, removeEnquiry } = useEnquiry();

  // Using _id to match your product data structure
  const isAdded = Enquiries.some(
    (item) => item._id === product._id
  );

  const handleClick = (e) => {
    e.preventDefault();
    if (isAdded) {
      removeEnquiry(product._id);
      toast.error("Removed from Enquiry list");
      console.log("remove", product._id);
    } else {
        addEnquiry(product);
        toast.success("Added to Enquiry list");
        console.log("added", product._id);
    }
  }; 

  return (
    <button
      onClick={handleClick}
      className={`flex-[1.5] border  py-4.5 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-wide transition-all duration-300 active:scale-95
        ${
          isAdded
            ? "bg-red-600 border-red-600 text-white"
            : "bg-[#DE3163] border-[#DE3163] text-white hover:bg-[#DE3133]"
        }`}
    >
      {isAdded ? "Remove from Enquiry" : "+ Add to Enquiry"}
    </button>
  );
}