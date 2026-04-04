"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, Menu, X, ShoppingCart, ChevronLeft, ChevronRight, Loader2, Home, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEnquiry } from "@/context/CartContext";
import { useAppData } from "@/context/AppDataContext";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const { Enquiries } = useEnquiry();
  const { categories, loading: categoriesLoading } = useAppData();

  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }
    setIsSearching(true);
    setShowSearchDropdown(true);
    try {
      const response = await fetch(`/api/products?search=${encodeURIComponent(query)}&limit=8`);
      const result = await response.json();
      if (result.success) setSearchResults(result.data);
      else setSearchResults([]);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => handleSearch(query), 300);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProductClick = (slug) => {
    setShowSearchDropdown(false);
    setIsMobileSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    router.push(`/product/${slug}`);
  };

  const staticLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" }
  ];

  const categoryLinks = categories.map(cat => ({
    name: cat.name.toUpperCase(),
    href: `/store/${cat.slug}`,
    slug: cat.slug,
    subcategories: cat.subcategories || []
  }));

  const footerLinks = [
    { name: "CONTACT US", href: "/contact" },
  ];

  const MAX_VISIBLE_CATEGORIES = 7;
  const visibleCategories = categoryLinks.slice(0, MAX_VISIBLE_CATEGORIES);
  const overflowCategories = categoryLinks.slice(MAX_VISIBLE_CATEGORIES);

  return (
    <header className={`w-full z-50 font-sans ${pathname === "/" ? "absolute top-0 left-0" : "relative"}`}>
      {/* Top Announcement Bar */}
      <div className={`bg-[#E12B5E] text-white flex items-center justify-center relative transition-all duration-500 overflow-hidden ${isScrolled ? "max-h-0 opacity-0" : "max-h-12 py-1.5 opacity-100"}`}>
        <ChevronLeft className="absolute left-4 lg:left-10 w-4 h-4 cursor-pointer opacity-70 hover:opacity-100" />
        <p className="text-[9px] md:text-[11px] tracking-tight text-center px-12 font-light">
          Welcome To Jaipur Kurti Gharana — Thoughtfully Crafted To Celebrate Heritage, Purpose-built For Discerning Resellers.
        </p>
        <ChevronRight className="absolute right-4 lg:right-10 w-4 h-4 cursor-pointer opacity-70 hover:opacity-100" />
      </div>

      {/* Main Header */}
      <div className={`transition-all duration-300 ${isScrolled ? "bg-[#FFFAFB]/90 shadow-md py-2 backdrop-blur-md" : "bg-white/10 backdrop-blur-md py-3"}`}>
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between gap-4">

            {/* Logo - Sizes slightly adjusted for better mobile fit */}
            <Link href="/" className="flex items-center gap-1.5 md:gap-2 lg:gap-3 shrink-0">
              <img src="/images/avantalogo.png" alt="Avanta" className="h-5 md:h-8 lg:h-10 w-auto object-contain" />
              <img src="/images/line.png" alt="separator" className="h-4 md:h-7 lg:h-9 w-auto object-contain" />
              <img src="/images/JKG.png" alt="Jaipur Kurti Gharana" className="h-5 md:h-8 lg:h-6 w-auto object-contain" />
            </Link>

            {/* Right Side Tools */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Search (Desktop) */}
              <div ref={searchRef} className="relative hidden sm:block w-40 md:w-56 lg:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                {isSearching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E12B5E] animate-spin z-10" />}
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchInput}
                  onFocus={() => searchQuery.length >= 2 && setShowSearchDropdown(true)}
                  className="w-full bg-white/80 border border-white/30 rounded-full py-2 pl-10 pr-10 text-xs focus:outline-none focus:bg-white focus:border-[#E12B5E]/30 focus:ring-2 focus:ring-[#E12B5E]/20 transition-all"
                />
                {showSearchDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-[600px] overflow-y-auto">
                    {isSearching ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 text-[#E12B5E] animate-spin" />
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="py-2">
                        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
                          <p className="text-sm font-semibold text-gray-700">{searchResults.length} {searchResults.length === 1 ? 'Product' : 'Products'} Found</p>
                        </div>
                        {searchResults.map((product) => (
                          <button key={product._id} onClick={() => handleProductClick(product.slug)}
                            className="w-full flex items-center gap-4 px-5 py-4 hover:bg-pink-50 transition-all group border-b border-gray-50 last:border-0">
                            <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 group-hover:border-[#E12B5E]/40 transition-all shadow-sm">
                              {product.images?.main ? (
                                <img src={product.images.main} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400"><Search size={24} /></div>
                              )}
                            </div>
                            <div className="flex-1 text-left min-w-0">
                              <h4 className="text-base font-semibold text-gray-900 truncate group-hover:text-[#E12B5E] transition-colors mb-1">{product.name}</h4>
                              {product.categoryId && (
                                <span className="inline-block text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full group-hover:bg-[#E12B5E]/10 group-hover:text-[#E12B5E] transition-all">
                                  {product.categoryId.name}
                                </span>
                              )}
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#E12B5E] group-hover:translate-x-1 transition-all shrink-0" />
                          </button>
                        ))}
                        {searchResults.length >= 8 && (
                          <div className="px-5 py-4 border-t border-gray-100">
                            <button onClick={() => { setShowSearchDropdown(false); router.push(`/store?search=${encodeURIComponent(searchQuery)}`); }}
                              className="w-full text-center text-sm font-bold text-[#E12B5E] hover:text-[#C91F4E] py-2 hover:bg-[#E12B5E]/5 rounded-lg transition-all">
                              View All Results →
                            </button>
                          </div>
                        )}
                      </div>
                    ) : searchQuery.length >= 2 ? (
                      <div className="flex flex-col items-center justify-center py-12 px-4">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                          <Search className="w-10 h-10 text-gray-300" />
                        </div>
                        <p className="text-base font-semibold text-gray-900 mb-2">No products found</p>
                        <p className="text-sm text-gray-500 text-center">Try searching with different keywords</p>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              <a href="tel:+919784562130" className="bg-[#E12B5E] text-white flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-bold hover:bg-[#C91F4E] transition-all">
                <img src="/images/icon/call-calling.svg" alt="Call" className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Call Now →</span>
                <span className="lg:hidden">Call</span>
              </a>
    {/* WhatsApp */}
                <a
                  href="https://wa.me/919784562130"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00C349] text-white flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-tight transition-all shadow-md"
                >
                  <img src="/images/icon/whatsapp.svg" alt="WA" className="w-3.5 h-3.5" />
                  Enquiry Now →
                </a>
              <a href='https://www.instagram.com/__avanta__?igsh=OGN1enJndDhsMmJv' className="hidden md:flex bg-[#E12B5E] text-white items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#941136] transition-all whitespace-nowrap">
                <img src="/images/icon/instagram.svg" alt="Instagram" className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>

              <Link href="/cart" className="relative group p-1.5 hidden md:block">
                <ShoppingCart className="w-5 h-5 text-[#1F1951]" />
                {Enquiries.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#E12B5E] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                    {Enquiries.length}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <div className="flex md:hidden items-center gap-2">
                <button className="p-1 text-[#1F1951]" onClick={() => setIsMenuOpen(true)}>
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center mt-3 gap-5 xl:gap-7 pb-2">
            {/* Full nav skeleton while loading */}
            {categoriesLoading ? (
              <>
                {[48, 72, 95, 80, 86, 100, 68, 90, 58, 76, 88].map((w, i) => (
                  <div
                    key={i}
                    className="h-[3px] rounded-full bg-gray-300 animate-pulse"
                    style={{ width: `${w}px`, animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </>
            ) : (
              <>
                {staticLinks.map(item => <NavLink key={item.name} item={item} pathname={pathname} />)}

                {/* Visible categories */}
                {visibleCategories.map(item => {
                  const category = categories.find(cat => cat.slug === item.href.split("/").pop());
                  const subs = category?.subcategories || [];
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <div key={item.name} className="relative group">
                      <Link href={item.href}
                        className={`text-[11px] font-bold tracking-[0.06em] transition-colors relative uppercase whitespace-nowrap ${isActive ? 'text-[#E12B5E]' : 'text-gray-800 hover:text-[#E12B5E]'}`}>
                        {item.name}
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#E12B5E] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                      </Link>
                      {subs.length > 0 && (
                        <div className="absolute top-full left-0 mt-4 w-[520px] bg-white border border-gray-100 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex overflow-hidden">
                          <div className="w-[230px] p-6 flex flex-col bg-white">
                            <p className="text-[9px] font-semibold tracking-[0.25em] text-gray-400 uppercase mb-3">Shop By Style</p>
                            {subs.map((sub) => (
                              <Link key={sub._id} href={`/store/${category.slug}?sub=${sub.slug}`}
                                className="group/link flex items-center justify-between text-[11px] font-bold tracking-wider text-gray-700 hover:text-[#E12B5E] py-2.5 border-b border-gray-50 last:border-0 transition-all uppercase"
                                onMouseEnter={() => setHoveredImage(sub.image)}>
                                <span>{sub.name}</span>
                                <div className="w-0 group-hover/link:w-4 h-px bg-[#E12B5E] transition-all duration-300" />
                              </Link>
                            ))}
                          </div>
                          <div className="flex-1 relative bg-[#F9F8F3] overflow-hidden">
                            <div className="absolute inset-0 p-4">
                              <div className="relative h-full w-full rounded-lg overflow-hidden">
                                {(hoveredImage || subs[0]?.image) && (
                                  <img src={hoveredImage || subs[0]?.image} alt="Preview"
                                    className="w-full h-full object-cover transition-all duration-700" key={hoveredImage} />
                                )}
                                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                                <div className="absolute bottom-5 left-5 text-white">
                                  <p className="text-[9px] uppercase tracking-[0.3em] font-light mb-1">New Collection</p>
                                  <h4 className="text-lg font-serif italic">{category.name}</h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* ALL CATEGORIES — overflow dropdown with right-side submenu */}
                {overflowCategories.length > 0 && (
                  <div className="relative group">
                    <button className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.06em] text-gray-800 hover:text-[#E12B5E] uppercase transition-all whitespace-nowrap">
                      ALL CATEGORIES
                      <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                    </button>

                    <div className="absolute top-full right-0 mt-3 flex opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
                      {/* Left: category list */}
                      <div className="w-[240px] bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] py-1.5 overflow-hidden">
                        {overflowCategories.map((item) => {
                          const category = categories.find((cat) => cat.slug === item.href.split("/").pop());
                          const subs = category?.subcategories || [];
                          const isItemActive = pathname.startsWith(item.href);
                          return (
                            <div key={item.name} className="relative group/item">
                              <Link href={item.href}
                                className={`flex items-center justify-between px-5 py-3 text-[11px] font-bold tracking-wider uppercase transition-all duration-150 ${isItemActive ? 'bg-[#1F1951] text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-[#E12B5E]'}`}>
                                <span>{item.name}</span>
                                {subs.length > 0 && <ChevronRight className="w-3.5 h-3.5 opacity-40" />}
                              </Link>

                              {/* Right: subcategory panel */}
                              {subs.length > 0 && (
                                <div className="absolute left-full top-0 ml-1 w-[500px] opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 z-50">
                                  <div className="bg-white border border-gray-100 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden flex">
                                    <div className="w-[220px] p-6 flex flex-col bg-white">
                                      <p className="text-[9px] font-semibold tracking-[0.25em] text-gray-400 uppercase mb-3">Shop By Style</p>
                                      {subs.map((sub) => (
                                        <Link key={sub._id} href={`/store/${category.slug}?sub=${sub.slug}`}
                                          className="group/link flex items-center justify-between text-[11px] font-bold tracking-wider text-gray-700 hover:text-[#E12B5E] py-2.5 border-b border-gray-50 last:border-0 transition-all uppercase"
                                          onMouseEnter={() => setHoveredImage(sub.image)}>
                                          <span>{sub.name}</span>
                                          <div className="w-0 group-hover/link:w-4 h-px bg-[#E12B5E] transition-all duration-300" />
                                        </Link>
                                      ))}
                                    </div>
                                    <div className="flex-1 relative bg-[#F9F8F3] overflow-hidden">
                                      <div className="absolute inset-0 p-4">
                                        <div className="relative h-full w-full rounded-lg overflow-hidden">
                                          {(hoveredImage || subs[0]?.image) ? (
                                            <img src={hoveredImage || subs[0]?.image} alt="Preview"
                                              className="w-full h-full object-cover transition-all duration-500" />
                                          ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                                              <span className="text-gray-300 text-xs">No image</span>
                                            </div>
                                          )}
                                          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                                          <div className="absolute bottom-5 left-5 text-white">
                                            <p className="text-[9px] uppercase tracking-[0.3em] font-light mb-1">New Collection</p>
                                            <h4 className="text-lg font-serif italic">{category?.name}</h4>
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
                  </div>
                )}

                {footerLinks.map(item => <NavLink key={item.name} item={item} pathname={pathname} />)}
              </>
            )}
          </nav>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-[60] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <Link href="/" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/' ? 'text-[#E12B5E]' : 'text-gray-400 hover:text-gray-600'}`}>
          <Home size={20} />
          <span className="text-[10px] font-bold">HOME</span>
        </Link>
        {/* <Link href="/store" className={`flex flex-col items-center gap-1 transition-colors ${pathname.includes('/store') ? 'text-[#E12B5E]' : 'text-gray-400 hover:text-gray-600'}`}>
          <LayoutGrid size={20} />
          <span className="text-[10px] font-bold">SHOP</span>
        </Link> */}
        <button onClick={() => setIsMobileSearchOpen(true)} className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
          <Search size={20} />
          <span className="text-[10px] font-bold">SEARCH</span>
        </button>
        <Link href="/cart" className={`flex flex-col items-center gap-1 relative transition-colors ${pathname === '/cart' ? 'text-[#E12B5E]' : 'text-gray-400 hover:text-gray-600'}`}>
          <ShoppingCart size={20} />
          {Enquiries.length > 0 && (
            <span className="absolute -top-1.5 -right-1 bg-[#E12B5E] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
              {Enquiries.length}
            </span>
          )}
          <span className="text-[10px] font-bold">CART</span>
        </Link>
      </div>

      {/* MOBILE FULL-SCREEN SEARCH OVERLAY */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-white z-[100] p-4 flex flex-col lg:hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setIsMobileSearchOpen(false)} className="p-2 -ml-2 text-gray-500">
              <ChevronLeft size={24} />
            </button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                autoFocus
                type="text"
                placeholder="Search Kurti, Sets..."
                className="w-full bg-gray-100 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#E12B5E]/20"
                value={searchQuery}
                onChange={handleSearchInput}
              />
              {isSearching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E12B5E] animate-spin" />}
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {isSearching ? (
              <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#E12B5E]" /></div>
            ) : searchResults.length > 0 ? (
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold text-gray-400 mb-2 px-1 tracking-wider uppercase">Results</p>
                {searchResults.map(product => (
                  <button key={product._id} onClick={() => handleProductClick(product.slug)} className="flex items-center gap-4 py-3 border-b border-gray-50 text-left">
                    <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                       {product.images?.main && <img src={product.images.main} className="w-full h-full object-cover" alt={product.name} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                      {product.categoryId && <p className="text-xs text-gray-500 mt-0.5">{product.categoryId.name}</p>}
                    </div>
                  </button>
                ))}
              </div>
            ) : searchQuery.length >= 2 ? (
              <div className="flex flex-col items-center justify-center h-40 text-gray-500 text-sm">
                No products found for "{searchQuery}"
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-sm">
                Type at least 2 characters to search
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE SIDEBAR (Grouped & Premium Layout) */}
      <div className={`lg:hidden fixed inset-0 z-[70] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#1F1951]/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        
        {/* Sidebar Panel */}
        <div className={`absolute left-0 top-0 h-full w-[85%] max-w-[320px] bg-white transition-transform duration-300 shadow-2xl flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <Link href="/" className="flex items-center gap-1.5" onClick={() => setIsMenuOpen(false)}>
              <img src="/images/mainlogo.png" alt="Avanta" className="h-5 w-auto object-contain" />
              <img src="/images/line.png" alt="separator" className="h-4 w-auto object-contain" />
              <img src="/images/jkg.png" alt="JKG" className="h-4 w-auto object-contain" />
            </Link>
            <button onClick={() => setIsMenuOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-6">
            <div className="px-6 mb-8">
               <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mb-4">PAGES</p>
               <div className="flex flex-col gap-5">
                  {staticLinks.map(link => (
                    <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-gray-800">
                      {link.name}
                    </Link>
                  ))}
               </div>
            </div>

            <div className="px-6 mb-8">
               <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mb-3">SHOP BY CATEGORY</p>
               <div className="flex flex-col">
                  {categoriesLoading ? (
                    <div className="space-y-4 mt-2">
                       {[1,2,3,4,5].map(i => <div key={i} className="h-3 w-3/4 bg-gray-100 animate-pulse rounded" />)}
                    </div>
                  ) : categoryLinks.map(item => (
                    <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} 
                      className="flex items-center justify-between py-3 border-b border-gray-50 text-sm font-medium text-gray-700 last:border-0">
                      {item.name}
                      <ChevronRight size={14} className="text-gray-300" />
                    </Link>
                  ))}
               </div>
            </div>

            <div className="px-6">
               <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mb-4">MORE</p>
               <div className="flex flex-col gap-5">
                  {footerLinks.map(link => (
                    <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-gray-800">
                      {link.name}
                    </Link>
                  ))}
               </div>
            </div>
          </div>

          <div className="p-6 bg-pink-50/50 border-t border-pink-100/50">
            <p className="text-[10px] font-bold text-[#E12B5E] mb-1.5 uppercase tracking-wider">Need Help?</p>
            <p className="text-xs text-gray-600 mb-4">Contact our support for reseller enquiries & bulk orders.</p>
            <button className="w-full flex justify-center items-center gap-2 bg-[#E12B5E] text-white py-3 rounded-xl text-xs font-bold shadow-md shadow-pink-200 hover:bg-[#C91F4E] transition-colors">
              <img src="/images/icon/call-calling.svg" alt="Call" className="w-3.5 h-3.5 brightness-0 invert" />
              CONTACT SUPPORT
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ item, pathname }) => {
  const isActive = pathname === item.href;
  return (
    <Link href={item.href}
      className={`text-[11px] font-bold tracking-[0.06em] transition-colors relative group uppercase whitespace-nowrap ${isActive ? 'text-[#E12B5E]' : 'text-gray-800 hover:text-[#E12B5E]'}`}>
      {item.name}
      <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#E12B5E] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
    </Link>
  );
};

export default Header;