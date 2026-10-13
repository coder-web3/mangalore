"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ArrowRight, Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", active: pathname === "/" },
    { name: "Places to Visit", href: "/places-to-visit", active: pathname === "/places-to-visit" },
    { name: "Famous Places", href: "/famous-tourist-places", active: pathname === "/famous-tourist-places" },
    { name: "Local Guides", href: "/local-guides", active: pathname === "/local-guides" },
    { name: "Tours", href: "/#tour-enquiry", active: false },
    { name: "About", href: "/about", active: pathname === "/about" },
    { name: "Contact", href: "/contact", active: pathname === "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 pt-2.5 pb-2 transition-colors duration-200">
      <div className="mx-auto max-w-[1600px]">
        <nav
          className={`relative flex items-center justify-between rounded-full border bg-white/95 px-5 backdrop-blur-md transition-shadow duration-300 sm:px-7 py-2 sm:py-2.5 ${
            isScrolled
              ? "shadow-xl shadow-slate-900/10 border-slate-300/80 bg-white/98"
              : "shadow-lg shadow-slate-900/5 border-slate-200/80"
          }`}
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center py-0.5">
            <Image
              src="/mangalore-logo.png"
              alt="Mangalore Tours - Explore Mangalore"
              width={220}
              height={45}
              priority
              className="h-8 sm:h-9 lg:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-xs font-semibold transition-colors xl:text-sm ${
                  link.active
                    ? "text-[#0d1e38] font-bold"
                    : "text-slate-600 hover:text-orange-600"
                }`}
              >
                {link.name}
                {link.active && (
                  <span className="absolute -bottom-1.5 left-0 right-0 mx-auto h-[2px] w-5 rounded-full bg-orange-500" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Toggle Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100/90 text-slate-700 transition-all duration-300 hover:bg-orange-50 hover:text-orange-600 hover:scale-105 hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                aria-label="Search"
              >
                <Search className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl sm:w-80">
                  <div className="relative flex items-center">
                    <Search className="absolute left-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search beaches, temples, food..."
                      className="w-full rounded-xl bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-orange-500"
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button with shimmer & lift */}
            <Link
              href="#plan"
              className="group btn-shimmer hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-orange-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 hover:scale-[1.03] active:translate-y-0"
            >
              <span>Plan Your Trip</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mt-2 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-2xl backdrop-blur-md lg:hidden">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    link.active
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-orange-500"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.active && (
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                  )}
                </Link>
              ))}

              <div className="pt-2">
                <Link
                  href="#plan"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 py-3 text-sm font-semibold text-white shadow-md shadow-orange-500/25"
                >
                  <span>Plan Your Trip</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
