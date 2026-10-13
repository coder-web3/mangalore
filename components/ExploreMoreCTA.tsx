"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Utensils,
  Calendar,
  ShoppingBag,
} from "lucide-react";

const quickLinks = [
  {
    id: "places",
    label: "Discover Places",
    icon: <MapPin className="h-4 w-4 text-orange-400" />,
    href: "#destinations",
  },
  {
    id: "food",
    label: "Try Local Food",
    icon: <Utensils className="h-4 w-4 text-orange-400" />,
    href: "#food",
  },
  {
    id: "events",
    label: "Find Events",
    icon: <Calendar className="h-4 w-4 text-orange-400" />,
    href: "#events",
  },
  {
    id: "businesses",
    label: "Support Local Businesses",
    icon: <ShoppingBag className="h-4 w-4 text-orange-400" />,
    href: "#businesses",
  },
];

export default function ExploreMoreCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="explore-more"
      className="relative bg-white py-6 sm:py-8 lg:py-10 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Main Floating Banner Card */}
        <div
          className={`relative rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl shadow-slate-900/15 border border-slate-100 min-h-[220px] sm:min-h-[240px] lg:min-h-[260px] flex flex-col justify-center items-center text-center px-4 py-7 sm:py-8 lg:py-9 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Background Aerial Coastal & Boat Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
              alt="Mangalore tropical coastline aerial view"
              fill
              unoptimized
              priority
              className="object-cover object-center"
              sizes="(max-width: 1600px) 100vw, 1600px"
            />
          </div>

          {/* Deep Coastal Gradient & Dark Vignette for Pristine Contrast */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-sky-950/75 via-[#0b2447]/85 to-blue-950/75 pointer-events-none" />
          <div className="absolute inset-0 z-10 bg-radial from-black/40 via-black/20 to-black/60 pointer-events-none" />

          {/* Center Content */}
          <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="text-orange-500 font-bold text-xs sm:text-sm">—</span>
              <span className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.25em] text-white/95 uppercase drop-shadow-sm">
                BE A PART OF MANGALORE
              </span>
              <span className="text-orange-500 font-bold text-xs sm:text-sm">—</span>
            </div>

            {/* Headline */}
            <h2 className="text-xl sm:text-2xl lg:text-[32px] font-extrabold tracking-tight text-white leading-tight drop-shadow-md mb-1.5 sm:mb-2">
              Explore More of <span className="text-[#ea580c]">Mangalore</span>
            </h2>

            {/* Subtitle */}
            <p className="text-white/85 text-xs sm:text-sm max-w-lg leading-relaxed font-normal drop-shadow-sm mb-4 sm:mb-5">
              Discover places, food, events, businesses and experiences that make
              Mangalore unique.
            </p>

            {/* Main CTA Button */}
            <Link
              href="#destinations"
              className="group btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-xl shadow-orange-500/35 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/55 hover:scale-[1.02] hover:-translate-y-0.5 active:translate-y-0 mb-5 sm:mb-6"
            >
              <span>Start Exploring</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Bottom 4 Quick Links Bar in One Single Row with Dividers */}
            <div className="flex items-center justify-center flex-nowrap overflow-x-auto max-w-full gap-2.5 sm:gap-4 lg:gap-6 px-3 py-1.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {quickLinks.map((link, idx) => (
                <React.Fragment key={link.id}>
                  <Link
                    href={link.href}
                    className="group/item flex items-center gap-1.5 sm:gap-2 text-white/90 hover:text-white transition-colors flex-shrink-0"
                  >
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white/10 group-hover/item:bg-orange-500 group-hover/item:scale-110 transition-all duration-300 flex-shrink-0">
                      {link.icon}
                    </div>
                    <span className="text-[11px] sm:text-xs lg:text-[13px] font-semibold tracking-tight whitespace-nowrap">
                      {link.label}
                    </span>
                  </Link>

                  {/* Divider line between items */}
                  {idx < quickLinks.length - 1 && (
                    <div className="h-4 w-[1px] bg-white/25 self-center flex-shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
