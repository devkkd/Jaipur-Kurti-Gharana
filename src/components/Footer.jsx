"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone } from 'lucide-react';

export default function Footer() {
  const [shopLinks, setShopLinks] = useState([]);

  // Fetch categories like header
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const result = await response.json();

        if (result.success) {
          const formatted = result.data.map((cat) => ({
            name: cat.name,
            href: `/store/${cat.slug}`,
          }));

          setShopLinks(formatted);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const aboutLinks = [
    { name: "About Us", href: "/about" },
    { name: "Crafted Heritage", href: "/about#crafted-heritage" },
    { name: "Designed For Resellers", href: "/about#resellers" },
    { name: "Founder Messages", href: "/about#founder-messages" },
  ];

  const customerCareLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ's", href: "/faqs" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/termsNcon" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: "/images/icon/instagram.svg", href: "#" },
    { name: "Facebook", icon: "/images/icon/facebook.png", href: "#" },
    { name: "Youtube", icon: "/images/icon/youtube.png", href: "#" },
    { name: "Linkedin", icon: "/images/icon/linkedIn.png", href: "#" },
  ];

  return (
    <footer className="bg-[#f8f9fc] pt-12 pb-8 px-6 md:px-16 text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">

        {/* --- Logo Section --- */}
        <div className="flex flex-col items-center mb-5">
          <Link href="/">
            <Image
              src="/images/mainlogo.png"
              alt="Avanta Logo"
              width={150}
              height={50}
              className="object-contain"
            />
          </Link>
          <div className="w-40 h-[1px] bg-gray-300 mt-4 mb-1"></div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
            Jaipur Kurti Gharana
          </p>
        </div>

        {/* --- Main Links Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-5">

          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-[13px] uppercase tracking-wider">
              Avanta India By Jaipur Kurti Gharana
            </h3>
            <p className="text-xs leading-relaxed text-black text-justify">
              Avanta India is a celebration of refined Indian fashion where heritage craftsmanship meets contemporary design.
              Rooted in Jaipur's rich textile legacy, each creation reflects timeless elegance, thoughtful detailing, and uncompromising quality.
            </p>
            <p className="text-xs font-bold italic text-gray-800">
              Exquisite Indian fashion, crafted with purpose.
            </p>
          </div>

          {/* Shop */}
          <div className="lg:pl-8">
            <h3 className="font-bold text-[13px] uppercase tracking-wider mb-5">
              Shop
            </h3>
            <ul className="text-xs space-y-3 text-black">
              {shopLinks.map((link) => (
                <li
                  key={link.name}
                  className="hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold text-[13px] uppercase tracking-wider mb-5">
              About
            </h3>
            <ul className="text-xs space-y-3 text-black">
              {aboutLinks.map((link) => (
                <li
                  key={link.name}
                  className="hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-bold text-[13px] uppercase tracking-wider mb-5">
              Customer Care
            </h3>
            <ul className="text-xs space-y-3 text-black">
              {customerCareLinks.map((link) => (
                <li
                  key={link.name}
                  className="hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-bold text-[13px] uppercase tracking-wider mb-5">
              Follow Us
            </h3>
            <div className="space-y-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs text-black hover:opacity-70 transition-opacity"
                >
                  <Image src={social.icon} alt={social.name} width={18} height={18} />
                  <span>@jaipur_kurti_gharana</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Everything below untouched */}

        <hr className="border-gray-200 mb-5" />

        {/* --- Mid Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-5">
          <div className="max-w-md">
            <h3 className="font-bold text-sm mb-2">Stay Connected</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Be the first to discover new collections, exclusive launches, and curated style inspiration.
              Follow us on Instagram and stay connected to the world of Avanta.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full md:w-auto">
            <div className="max-w-[200px]">
              <h3 className="font-bold text-sm mb-1">Download</h3>
              <p className="text-xs text-gray-500">
                Explore our complete range and latest collections.
              </p>
            </div>
            <button className="bg-[#1e1b3a] text-white rounded-full px-8 py-4 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-black transition-all shadow-lg whitespace-nowrap">
              Download Catalog +
            </button>
          </div>
        </div>

        {/* Bottom Bar untouched */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-gray-100 gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-[11px] text-gray-400">
              © Avanta India. All rights reserved.
            </p>
            <Link
              href="/admin/login"
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              Admin Login
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-[#1e1b3a] text-white flex items-center gap-3 px-6 py-2.5 rounded-full text-[11px] font-semibold hover:opacity-90 transition-opacity shadow-md">
              <Phone size={14} /> Call Now →
            </button>

            <Link
              href="https://wa.me/919784562130"
              target="_blank"
              className="bg-[#00c853] text-white flex items-center gap-3 px-6 py-2.5 rounded-full text-[11px] font-semibold hover:opacity-90 transition-opacity shadow-md"
            >
              <Image
                src="/images/icon/whatsapp.svg"
                alt="WhatsApp Enquiry"
                width={20}
                height={20}
                className="brightness-0 invert"
              />
              Enquiry Now →
            </Link>
          </div>
        </div>

        <div className="text-left mt-16 select-none pointer-events-none">
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-cinzel font-bold text-[#CECCE0] tracking-tight uppercase">
            Designed with Tradition. Crafted for today.
          </h1>
        </div>
      </div>
    </footer>
  );
}
