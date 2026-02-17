"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Menu, X, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEnquiry } from "@/context/CartContext";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const { Enquiries } = useEnquiry();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const result = await response.json();
        if (result.success) setCategories(result.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
    { name: "DOWNLOAD CATALOG ↓", href: "/catalog" }
  ];

  const MAX_VISIBLE_CATEGORIES = 6;
  const visibleCategories = categoryLinks.slice(0, MAX_VISIBLE_CATEGORIES);
  const overflowCategories = categoryLinks.slice(MAX_VISIBLE_CATEGORIES);

  return (
    <header
      className={`w-full z-50 font-sans ${pathname === "/"
          ? "absolute top-0 left-0"
          : "relative"
        }`}
    >
      {/* Top Announcement Bar */}
      <div
        className={`bg-[#E12B5E] text-white flex items-center justify-center relative transition-all duration-500 overflow-hidden ${isScrolled ? "max-h-0 opacity-0" : "max-h-12 py-1.5 opacity-100"
          }`}
      >
        <ChevronLeft className="absolute left-4 lg:left-10 w-4 h-4 cursor-pointer opacity-70 hover:opacity-100" />
        <p className="text-[9px] md:text-[11px] tracking-tight text-center px-12 font-light">
          Welcome To Jaipur Kurti Gharana Thoughtfully Crafted To Celebrate Heritage, Purpose-built For Discerning Resellers.
        </p>
        <ChevronRight className="absolute right-4 lg:right-10 w-4 h-4 cursor-pointer opacity-70 hover:opacity-100" />
      </div>

      {/* Main Header Content */}
      <div className={`transition-all duration-300 ${isScrolled ? "bg-[#FFFAFB]/90 shadow-md py-2" : "bg-white/10 backdrop-blur-md py-3"
        }`}>
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between gap-4">

            {/* --- 3-Part Logo Integration --- */}
            <Link href="/" className="flex items-center gap-2 lg:gap-3 flex-shrink-0 group">
              <img src="/images/avantalogo.png" alt="Avanta" className="h-6 md:h-8 lg:h-10 w-auto object-contain" />
              <img src="/images/line.png" alt="separator" className="h-5 md:h-7 lg:h-9 w-auto object-contain" />
              <img src="/images/jkg.png" alt="Jaipur Kurti Gharana" className="h-6 md:h-8 lg:h-6 w-auto object-contain" />
            </Link>

            {/* Right Side Tools */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative hidden sm:block w-40 md:w-48 lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-white/80 border border-white/30 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:bg-white transition-all"
                />
              </div>

              <button className="bg-[#E12B5E] text-white flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold hover:bg-[#C91F4E] transition-all">
                <img src="/images/icon/call-calling.svg" alt="Call" className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Call Now →</span>
              </button>

              <div className="hidden xl:flex items-center gap-2 border border-white/40 rounded-full px-4 py-2 bg-white/70">
                <span className="text-[9px] font-bold text-gray-600 uppercase">Ship To</span>
                <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-4 h-3 object-cover" />
                <span className="text-xs font-bold text-gray-800 uppercase">India</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>

              <button className="hidden md:flex bg-[#E12B5E] text-white items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold hover:bg-gray-800 transition-all whitespace-nowrap">
                <img src="/images/icon/instagram.svg" alt="Instagram" className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </button>

              <Link href="/cart" className="relative group p-1.5 hidden md:block">
                <ShoppingCart className="w-5 h-5 text-[#1F1951]" />
                {Enquiries.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#E12B5E] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                    {Enquiries.length}
                  </span>
                )}
              </Link>

              <div className="flex md:hidden items-center gap-2">
                <button className="p-1 text-[#1F1951]" onClick={() => setIsMenuOpen(true)}>
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Bar with Full Dropdown Functionality */}
          <nav className="hidden lg:flex items-center justify-center mt-3 gap-10 pb-2">
            {staticLinks.map(item => (
              <NavLink key={item.name} item={item} pathname={pathname} />
            ))}

            {visibleCategories.map(item => {
              const category = categories.find(cat => cat.slug === item.href.split("/").pop());
              const relatedSubCategories = category?.subcategories || [];
              const isActive = pathname.startsWith(item.href);

              return (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className="text-[11px] font-bold tracking-[0.15em] text-gray-800 hover:text-[#E12B5E] transition-colors relative uppercase"
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#E12B5E] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>

                  {/* MEGA MENU DROPDOWN */}
                  {relatedSubCategories.length > 0 && (
                    <div className="absolute top-full left-0 mt-4 w-[550px] bg-white border border-[#E5E2D6]/50 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex overflow-hidden">
                      <div className="w-[240px] p-8 flex flex-col gap-1 bg-white">
                        {relatedSubCategories.map((sub) => (
                          <Link
                            key={sub._id}
                            href={`/store/${category.slug}?sub=${sub.slug}`}
                            className="group/link flex items-center justify-between text-[11px] font-bold tracking-widest text-gray-700 hover:text-[#E12B5E] py-3 border-b border-gray-50 last:border-0 transition-all uppercase"
                            onMouseEnter={() => setHoveredImage(sub.image)}
                          >
                            <span>{sub.name}</span>
                            <div className="w-0 group-hover/link:w-4 h-[1px] bg-[#E12B5E] transition-all duration-300"></div>
                          </Link>
                        ))}
                      </div>
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white text-left">
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

            {/* ALL CATEGORIES OVERFLOW DROPDOWN */}
            {overflowCategories.length > 0 && (
              <div className="relative group">
                <button className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] text-gray-800 hover:text-[#E12B5E] uppercase transition-all">
                  <span>All Categories</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-3 w-[280px] bg-white/95 backdrop-blur-sm border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 py-2">
                  {overflowCategories.map((item) => {
                    const category = categories.find((cat) => cat.slug === item.href.split("/").pop());
                    const relatedSubCategories = category?.subcategories || [];
                    const hasSubs = relatedSubCategories.length > 0;

                    return (
                      <div key={item.name} className="relative group/item px-2">
                        <Link
                          href={item.href}
                          className="flex items-center justify-between px-4 py-3 text-[11px] font-bold tracking-widest text-gray-600 hover:bg-[#E12B5E] hover:text-white rounded-lg transition-all duration-200 uppercase"
                        >
                          <div className="flex items-center gap-2">
                            {hasSubs && <ChevronDown className="w-3 h-3 rotate-90 opacity-50 group-hover/item:opacity-100" />}
                            {item.name}
                          </div>
                        </Link>
                        {hasSubs && (
                          <div className="absolute right-full top-0 mr-4 w-[550px] opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 z-50">
                            <div className="bg-white border border-[#E5E2D6]/50 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex">
                              <div className="w-[240px] p-8 flex flex-col gap-1 bg-white">
                                {relatedSubCategories.map((sub) => (
                                  <Link
                                    key={sub._id}
                                    href={`/store/${category.slug}?sub=${sub.slug}`}
                                    className="group/link flex items-center justify-between text-[11px] font-bold tracking-widest text-gray-700 hover:text-[#E12B5E] py-3 border-b border-gray-50 last:border-0 transition-all uppercase"
                                    onMouseEnter={() => setHoveredImage(sub.image)}
                                  >
                                    <span>{sub.name}</span>
                                    <div className="w-0 group-hover/link:w-4 h-[1px] bg-[#E12B5E] transition-all duration-300"></div>
                                  </Link>
                                ))}
                              </div>
                              <div className="flex-1 relative bg-[#F9F8F3] overflow-hidden">
                                <div className="absolute inset-0 p-4">
                                  <div className="relative h-full w-full rounded-lg overflow-hidden">
                                    <img
                                      src={hoveredImage || relatedSubCategories[0]?.image}
                                      alt="Preview"
                                      className="w-full h-full object-cover group-hover:scale-105 transition-all"
                                    />
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
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-50 bg-[#1F1951]/20 backdrop-blur-sm transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute left-0 top-0 h-full w-[85%] bg-white p-8 transition-transform duration-500 ease-out shadow-2xl ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center mb-10">
             <Link href="/" className="flex items-center gap-1 group">
              <img src="/images/mainlogo.png" alt="Avanta" className="h-6 w-auto object-contain" />
              <img src="/images/line.png" alt="separator" className="h-5 w-auto object-contain" />
              <img src="/images/jkg.png" alt="Jaipur Kurti Gharana" className="h-5 w-auto object-contain" />
            </Link>
            <X className="text-gray-400 cursor-pointer" onClick={() => setIsMenuOpen(false)} />
          </div>
          <div className="flex flex-col gap-6">
            {staticLinks.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-xs font-bold tracking-[0.2em] border-b border-gray-50 pb-4 text-gray-700 uppercase">
                {item.name}
              </Link>
            ))}
            {/* Simple Mobile Categories */}
            {categoryLinks.slice(0, 10).map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-xs font-bold tracking-[0.2em] border-b border-gray-50 pb-4 text-gray-700 uppercase">
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
  const isActive = pathname === item.href;
  return (
    <Link
      href={item.href}
      className={`text-[11px] font-bold tracking-[0.15em] transition-colors relative group uppercase ${isActive ? 'text-[#E12B5E]' : 'text-gray-800'
        }`}
    >
      {item.name}
      <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#E12B5E] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
    </Link>
  );
};

export default Header; 