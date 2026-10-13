"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowRight, Heart } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  const exploreLinks = [
    { name: "Places to Visit", href: "/places-to-visit" },
    { name: "Famous Tourist Places", href: "/famous-tourist-places" },
    { name: "Local Guides", href: "/local-guides" },
    { name: "Food & Dining", href: "/#food" },
    { name: "Things to Do", href: "/places-to-visit" },
    { name: "Events", href: "/#events" },
    { name: "Gallery", href: "/#gallery" },
  ];

  const popularLinks = [
    { name: "Beaches", href: "#places" },
    { name: "Temples", href: "#places" },
    { name: "Nature & Outdoors", href: "#places" },
    { name: "Art & Culture", href: "#art-history" },
    { name: "Shopping", href: "#places" },
    { name: "City Life", href: "#places" },
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Submit a Business", href: "#submit-business" },
    { name: "Blog", href: "#blog" },
    { name: "Advertise With Us", href: "#advertise" },
    { name: "Privacy Policy", href: "#privacy" },
  ];

  return (
    <footer className="relative bg-white pt-8 sm:pt-12 pb-6 overflow-hidden">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Main Footer Rounded Card */}
        <div className="relative rounded-t-[32px] sm:rounded-t-[44px] rounded-b-[20px] sm:rounded-b-[28px] border border-slate-200/90 bg-[#fafcff] shadow-xl shadow-slate-900/5 overflow-hidden pt-10 sm:pt-14 pb-6 px-6 sm:px-10 lg:px-14">
          {/* Left Background Palm Sketch Illustration */}
          <div className="absolute left-0 top-0 bottom-0 w-[240px] sm:w-[320px] lg:w-[380px] pointer-events-none overflow-hidden opacity-35 mix-blend-multiply select-none">
            <Image
              src="/footer-palm-sketch.jpg"
              alt="Coastal Palm Sketch"
              fill
              className="object-cover object-left-bottom"
              sizes="(max-width: 768px) 240px, 380px"
            />
          </div>

          {/* Right Background Sunset Kaup Lighthouse Photograph */}
          <div className="absolute right-0 top-0 bottom-0 w-[42%] lg:w-[36%] xl:w-[32%] pointer-events-none overflow-hidden hidden md:block select-none">
            <Image
              src="/footer-lighthouse.jpg"
              alt="Kaup Lighthouse Coastal Sunset"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1200px) 36vw, 32vw"
            />
            {/* Smooth Left Gradient Shield to feather naturally into footer background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, rgba(250,252,255,1) 0%, rgba(250,252,255,0.92) 22%, rgba(250,252,255,0.55) 55%, rgba(250,252,255,0.1) 85%, transparent 100%)",
              }}
            />
          </div>

          {/* Soft Flowing Wavy Lines Across Footer */}
          <div className="absolute inset-x-0 bottom-16 pointer-events-none overflow-hidden h-28 opacity-40 select-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 1400 100"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0,80 C200,92 350,45 550,68 C750,92 900,48 1100,72 C1250,88 1350,58 1400,62"
                stroke="#f97316"
                strokeWidth="1.2"
                opacity="0.35"
              />
              <path
                d="M0,86 C220,72 380,98 580,58 C780,78 940,38 1140,68 C1280,82 1360,52 1400,58"
                stroke="#38bdf8"
                strokeWidth="1"
                opacity="0.45"
              />
              <path
                d="M0,90 C250,85 420,62 620,82 C820,62 980,82 1180,52 C1300,72 1380,62 1400,66"
                stroke="#60a5fa"
                strokeWidth="0.8"
                opacity="0.3"
              />
            </svg>
          </div>

          {/* Content Columns Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 pb-10">
            {/* Column 1: Brand Info & Socials */}
            <div className="sm:col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-3 flex flex-col justify-start">
              {/* Logo */}
              <Link href="/" className="inline-block mb-3.5 group">
                <Image
                  src="/mangalore-logo.png"
                  alt="Mangalore Tours - Explore Mangalore"
                  width={210}
                  height={44}
                  className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-[270px] mb-5 font-normal">
                Your guide to exploring the best places, food, events, businesses
                and experiences in Mangalore.
              </p>

              {/* Social Media Circular Buttons */}
              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/90 text-slate-600 border border-slate-200/70 shadow-sm transition-all duration-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 hover:scale-110 focus:outline-none"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/90 text-slate-600 border border-slate-200/70 shadow-sm transition-all duration-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 hover:scale-110 focus:outline-none"
                  aria-label="Facebook"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/90 text-slate-600 border border-slate-200/70 shadow-sm transition-all duration-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 hover:scale-110 focus:outline-none"
                  aria-label="YouTube"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* X (formerly Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/90 text-slate-600 border border-slate-200/70 shadow-sm transition-all duration-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 hover:scale-110 focus:outline-none"
                  aria-label="X"
                >
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Pinterest */}
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/90 text-slate-600 border border-slate-200/70 shadow-sm transition-all duration-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 hover:scale-110 focus:outline-none"
                  aria-label="Pinterest"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.372 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Explore */}
            <div className="lg:col-span-2">
              <h4 className="text-sm sm:text-base font-extrabold text-[#0d1e38]">
                Explore
              </h4>
              <div className="w-6 h-[2.5px] bg-[#ea580c] rounded-full mt-1.5 mb-4" />
              <ul className="space-y-2 sm:space-y-2.5">
                {exploreLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-[13px] text-slate-600 hover:text-orange-600 transition-colors font-medium inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Popular */}
            <div className="lg:col-span-2">
              <h4 className="text-sm sm:text-base font-extrabold text-[#0d1e38]">
                Popular
              </h4>
              <div className="w-6 h-[2.5px] bg-[#ea580c] rounded-full mt-1.5 mb-4" />
              <ul className="space-y-2 sm:space-y-2.5">
                {popularLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-[13px] text-slate-600 hover:text-orange-600 transition-colors font-medium inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="text-sm sm:text-base font-extrabold text-[#0d1e38]">
                Quick Links
              </h4>
              <div className="w-6 h-[2.5px] bg-[#ea580c] rounded-full mt-1.5 mb-4" />
              <ul className="space-y-2 sm:space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-[13px] text-slate-600 hover:text-orange-600 transition-colors font-medium inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Stay Updated (Newsletter) */}
            <div className="sm:col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-3 flex flex-col">
              <h4 className="text-sm sm:text-base font-extrabold text-[#0d1e38]">
                Stay Updated
              </h4>
              <div className="w-6 h-[2.5px] bg-[#ea580c] rounded-full mt-1.5 mb-4" />
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4 font-normal max-w-xs">
                Get the latest places, events and local updates from Mangalore.
              </p>

              {/* Newsletter Input Form */}
              <form onSubmit={handleSubscribe} className="relative w-full max-w-sm">
                <div className="flex items-center rounded-full bg-white border border-slate-200/90 shadow-md shadow-slate-900/5 p-1 pl-3.5 pr-1 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                  <Mail className="h-4 w-4 text-slate-400 flex-shrink-0 mr-2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent outline-none py-1.5"
                  />
                  <button
                    type="submit"
                    className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/40 active:scale-95"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {subscribed && (
                  <p className="absolute -bottom-6 left-3 text-[11px] font-semibold text-emerald-600">
                    Thank you for subscribing!
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Sub-footer Row */}
          <div className="relative z-10 border-t border-slate-200/80 pt-6 mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            {/* Copyright */}
            <p className="text-center sm:text-left font-normal text-slate-500">
              © 2025 Mangalore Tours. All rights reserved.
            </p>

            {/* Made with love */}
            <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 font-medium sm:pr-16">
              <span>Made with</span>
              <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500 inline-block" />
              <span>for Mangalore</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
