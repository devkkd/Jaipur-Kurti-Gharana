"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Menu, X, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEnquiry } from "@/context/CartContext";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const { Enquiries } = useEnquiry();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const result = await response.json();
        if (result.success) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const staticLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" }
  ];

  const categoryLinks = categories.map(cat => ({
    name: cat.name.toUpperCase(),
    href: `/store/${cat.slug}`,
    subcategories: cat.subcategories || []
  }));

  const footerLinks = [
    { name: "CONTACT US", href: "/contact" },
    { name: "DOWNLOAD CATALOG ↓", href: "#" }
  ];

  const navigation = [
    ...staticLinks,
    ...categoryLinks,
    ...footerLinks
  ];

  const MAX_VISIBLE_CATEGORIES = 6;
  const visibleCategories = categoryLinks.slice(0, MAX_VISIBLE_CATEGORIES);
  const overflowCategories = categoryLinks.slice(MAX_VISIBLE_CATEGORIES);

  return (
    <header className="sticky top-0 w-full z-50 font-sans">
      {/* Top Announcement Bar - Dynamic transition */}
      <div
        className={`bg-[#1F1951] text-white flex items-center justify-center relative transition-all duration-500 ease-in-out overflow-hidden ${isScrolled ? "max-h-0 py-0 opacity-0" : "max-h-20 py-1 opacity-100"
          }`}
      >
        <button className="absolute left-4 lg:left-10 text-white/70 hover:text-white">
          <ChevronDown className="rotate-90 w-5 h-5" />
        </button>
        <p className="text-[10px] md:text-xs tracking-wide text-center px-8 font-light italic">
          Welcome To Avanta India By Jaipur Kurti Gharana Thoughtfully Crafted To Celebrate Heritage, Purpose-built For Discerning Resellers.
        </p>
        <button className="absolute right-4 lg:right-10 text-white/70 hover:text-white">
          <ChevronDown className="-rotate-90 w-5 h-5" />
        </button>
      </div>

      {/* Glassmorphism Header Content - Stays Exactly the Same */}
      <div className="bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-4 py-2 lg:py-3">
          <div className="flex items-center justify-between gap-4 relative">

            {/* Left: Shipping & Search */}
            <div className="hidden lg:flex items-center gap-4 flex-1">
              <div className="flex items-center gap-2 border border-indigo-100/50 rounded-full px-4 py-2.5 bg-white/50 hover:bg-white transition-colors">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Ship To</span>
                <div className="flex items-center gap-1.5">
                  <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-4 h-3 object-cover" />
                  <span className="text-xs font-bold text-gray-800 uppercase">India</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              </div>

              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search product or categories & more..."
                  className="w-full bg-white/40 border border-indigo-50/50 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-50/30 transition-all"
                />
              </div>
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 z-10">
              <Link href="/">
                <img src='/images/Avanta-Logo.svg' alt="Avanta India" className="w-20 md:w-24 h-auto" />
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 flex-1 justify-end">

              {/* Desktop Cart Section */}
              <Link href="/cart" className="relative group hidden lg:flex items-center mr-2">
                <ShoppingCart className="w-6 h-6 text-[#1F1951] group-hover:scale-110 transition-transform" />
                {Enquiries.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#E12B5E] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                    {Enquiries.length}
                  </span>
                )}
              </Link>

              <div className="hidden lg:flex items-center gap-3">

                <button className="bg-[#1F1951] text-white flex items-center gap-2 px-5 py-3 rounded-full text-[11px] font-bold tracking-tight hover:scale-105 transition-all shadow-md">
                  <img src="/images/icon/call-calling.svg" alt="Call" className="w-3.5 h-3.5" />
                  Call Now →
                </button>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/918619242626"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00C349] text-white flex items-center gap-2 px-5 py-3 rounded-full text-[11px] font-bold tracking-tight hover:scale-105 transition-all shadow-md"
                >
                  <img src="/images/icon/whatsapp.svg" alt="WA" className="w-3.5 h-3.5" />
                  Enquiry Now →
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/__avanta__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white flex items-center gap-2 px-5 py-3 rounded-full text-[11px] font-bold tracking-tight hover:bg-zinc-800 transition-all shadow-md"
                >
                  <img src="/images/icon/instagram.svg" alt="Instagram" className="w-3.5 h-3.5" />
                  Instagram
                </a>

              </div>


              {/* Mobile Right Section (Cart + Menu) */}
              <div className="flex items-center gap-3 lg:hidden">
                <Link href="/cart" className="relative">
                  <ShoppingCart className="w-6 h-6 text-[#1F1951]" />
                  {Enquiries.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#E12B5E] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                      {Enquiries.length}
                    </span>
                  )}
                </Link>
                <button className="p-2 text-[#1F1951]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Bar */}
          <nav className="hidden lg:flex items-center justify-center mt-3 gap-10 pb-1">
            {loading ? (
              // Skeleton Loader for 10 menu items
              <>
                {[...Array(10)].map((_, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-0.5 w-0 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {staticLinks.map(item => (
                  <NavLink key={item.name} item={item} pathname={pathname} />
                ))}

            {visibleCategories.map(item => {
              const category = categories.find(cat =>
                cat.slug === item.href.split("/").pop()
              );

              const relatedSubCategories = category?.subcategories || [];
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className="text-[11px] font-bold tracking-[0.15em] text-gray-800 hover:text-[#1F1951] transition-colors relative uppercase"
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#1F1951] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>

                  {relatedSubCategories.length > 0 && (
                    <div className="absolute top-full left-0 mt-4 w-[550px] bg-white border border-[#E5E2D6]/50 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex overflow-hidden">

                      {/* LEFT SIDE - SUBCATEGORY LIST */}
                      <div className="w-[240px] p-8 flex flex-col gap-1 bg-white">
                        {/* <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-4 font-bold">
                          Shop by Style
                        </p> */}
                        {relatedSubCategories.map((sub) => (
                          <Link
                            key={sub._id}
                            href={`/store/${category.slug}?sub=${sub.slug}`}
                            className="group/link flex items-center justify-between text-[11px] font-bold tracking-widest text-gray-700 hover:text-[#1F1951] py-3 border-b border-gray-50 last:border-0 transition-all uppercase"
                            onMouseEnter={() => setHoveredImage(sub.image)}
                          >
                            <span>{sub.name}</span>
                            <div className="w-0 group-hover/link:w-4 h-[1px] bg-[#1F1951] transition-all duration-300"></div>
                          </Link>
                        ))}
                      </div>

                      {/* RIGHT SIDE - IMAGE PREVIEW */}
                      <div className="flex-1 relative bg-[#F9F8F3] overflow-hidden">
                        <div className="absolute inset-0 p-4">
                          <div className="relative h-full w-full rounded-lg overflow-hidden">
                            {(hoveredImage || relatedSubCategories[0]?.image) && (
                              <img
                                src={hoveredImage || relatedSubCategories[0]?.image}
                                alt="Category Preview"
                                className="w-full h-full object-cover transition-all duration-700 ease-out scale-100 group-hover:scale-105"
                                key={hoveredImage}
                              />
                            )}
                            {/* Subtle Overlay for the "Fashion Look" */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                            {/* Optional: Text overlay like the image you shared */}
                            <div className="absolute bottom-6 left-6 text-white">
                              <p className="text-xs uppercase tracking-[0.3em] font-light mb-1">New Collection</p>
                              <h4 className="text-xl font-serif italic">{category.name}</h4>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}


            {overflowCategories.length > 0 && (
              <div className="relative group">
                {/* TRIGGER BUTTON */}
                <button className="flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-gray-800 hover:text-[#1F1951] uppercase transition-all duration-300 ease-in-out">
                  <span>All Categories</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>

                {/* FIRST LEVEL DROPDOWN (Positioned relative to button) */}
                <div className="absolute top-full left-0 mt-3 w-[280px] bg-white/95 backdrop-blur-sm border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 py-2">

                  {overflowCategories.map((item) => {
                    const category = categories.find((cat) => cat.slug === item.href.split("/").pop());
                    const relatedSubCategories = category?.subcategories || [];
                    console.log("sub", relatedSubCategories);
                    const hasSubs = relatedSubCategories.length > 0;

                    return (
                      <div key={item.name} className="relative group/item px-2">
                        {/* MAIN CATEGORY ITEM */}
                        <Link
                          href={item.href}
                          className="flex items-center justify-between px-4 py-3 text-[11px] font-bold tracking-widest text-gray-600 hover:bg-[#1F1951] hover:text-white rounded-lg transition-all duration-200 uppercase"
                        >
                          <div className="flex items-center gap-2">
                            {hasSubs && <ChevronDown className="w-3 h-3 rotate-90 opacity-50 group-hover/item:opacity-100" />}
                            {item.name}
                          </div>
                        </Link>

                        {/* SECOND LEVEL MEGA-DROPDOWN (Flyout to the LEFT) */}
                        {hasSubs && (
                          <div className="absolute right-full top-0 mr-4 w-[550px] opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 z-50">

                            <div className="bg-white border border-[#E5E2D6]/50 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex">

                              {/* LEFT SIDE - SUBCATEGORY LIST */}
                              <div className="w-[240px] p-8 flex flex-col gap-1 bg-white">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-4 font-bold">
                                  Shop by Style
                                </p>

                                {relatedSubCategories.map((sub) => (
                                  <Link
                                    key={sub._id}
                                    href={`/store/${category.slug}?sub=${sub.slug}`}
                                    className="group/link flex items-center justify-between text-[11px] font-bold tracking-widest text-gray-700 hover:text-[#1F1951] py-3 border-b border-gray-50 last:border-0 transition-all uppercase"
                                    onMouseEnter={() => setHoveredImage(sub.image)}
                                  >
                                    <span>{sub.name}</span>
                                    <div className="w-0 group-hover/link:w-4 h-[1px] bg-[#1F1951] transition-all duration-300"></div>
                                  </Link>
                                ))}
                              </div>

                              {/* RIGHT SIDE - IMAGE PREVIEW */}
                              <div className="flex-1 relative bg-[#F9F8F3] overflow-hidden">
                                <div className="absolute inset-0 p-4">
                                  <div className="relative h-full w-full rounded-lg overflow-hidden">
                                    {(hoveredImage || relatedSubCategories[0]?.image) && (
                                      <img
                                        src={hoveredImage || relatedSubCategories[0]?.image}
                                        alt="Category Preview"
                                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                                        key={hoveredImage}
                                      />
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                                    <div className="absolute bottom-6 left-6 text-white">
                                      <p className="text-xs uppercase tracking-[0.3em] font-light mb-1">
                                        New Collection
                                      </p>
                                      <h4 className="text-xl font-serif italic">
                                        {category.name}
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {footerLinks.map(item => (
              <NavLink key={item.name} item={item} pathname={pathname} />
            ))}
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-50 bg-[#1F1951]/20 backdrop-blur-sm transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute left-0 top-0 h-full w-[85%] bg-white p-8 transition-transform duration-500 ease-out shadow-2xl ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center mb-10">
            <img src='/images/Avanta-Logo.svg' alt="Avanta India" className="w-28 md:w-32 h-auto" />
            <X className="text-gray-400 cursor-pointer" onClick={() => setIsMenuOpen(false)} />
          </div>
          <div className="flex flex-col gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-xs font-bold tracking-[0.2em] border-b border-gray-50 pb-4 text-gray-700 uppercase"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ item, pathname }) => {
  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

  return (
    <Link
      href={item.href}
      className="text-[11px] font-bold tracking-[0.15em] text-gray-800 hover:text-[#1F1951] transition-colors relative group uppercase"
    >
      {item.name}
      <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#1F1951] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
    </Link>
  );
};

export default Header;
