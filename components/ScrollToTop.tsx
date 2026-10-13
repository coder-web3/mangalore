"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after user scrolls down 280px
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-900/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-500/15 hover:scale-110 hover:-translate-y-1 active:translate-y-0 active:scale-95 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-5 w-5 text-slate-700 transition-all duration-300 group-hover:text-orange-600 group-hover:-translate-y-0.5" />
    </button>
  );
}
