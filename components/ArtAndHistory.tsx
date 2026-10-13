"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Landmark, Palette, Shield, Church } from "lucide-react";

interface HeritageItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  image: string;
}

const heritageItems: HeritageItem[] = [
  {
    id: "landmarks",
    title: "Historic Landmarks",
    icon: <Landmark className="h-4 w-4 text-orange-400" />,
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "art-culture",
    title: "Art & Culture",
    icon: <Palette className="h-4 w-4 text-orange-400" />,
    image:
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "forts",
    title: "Forts & Monuments",
    icon: <Shield className="h-4 w-4 text-orange-400" />,
    image:
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "churches",
    title: "Churches & Heritage",
    icon: <Church className="h-4 w-4 text-orange-400" />,
    image: "/milagrees.avif",
  },
];

export default function ArtAndHistory() {
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
      id="art-history"
      className="relative bg-white py-12 sm:py-14 lg:py-16 overflow-hidden"
    >
      {/* Top Right Warm Historic Temple & Gopuram Sketch Illustration */}
      <div className="absolute top-0 right-0 w-[420px] sm:w-[540px] lg:w-[680px] h-[200px] sm:h-[240px] pointer-events-none select-none z-0 overflow-hidden opacity-25">
        <svg
          viewBox="0 0 600 220"
          className="w-full h-full text-orange-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Ancient Temple Gopuram & Pillars Sketch */}
          <path d="M480 200 L495 140 L515 90 L535 50 L545 30 L555 50 L575 90 L595 140 L610 200" />
          <path d="M510 140 H580 M525 90 H565 M538 50 H552" />
          {/* Main Pagoda Tiered Shrine */}
          <path d="M360 200 L380 150 L400 110 L420 70 L430 45 L440 70 L460 110 L480 150 L500 200" />
          <path d="M375 170 H485 M395 130 H465 M415 90 H445" />
          {/* Palm trees silhouettes & coastline backdrop */}
          <path d="M260 200 Q270 140 280 100 M280 100 Q250 90 230 105 M280 100 Q300 80 325 90 M280 100 Q310 110 330 125 M280 100 Q265 75 250 80" />
          <path d="M310 200 Q318 160 325 130 M325 130 Q305 120 290 135 M325 130 Q345 115 365 122 M325 130 Q350 140 368 150" />
          {/* Distant flying birds */}
          <path d="M410 40 Q415 35 420 40 Q425 35 430 40" />
          <path d="M470 30 Q475 25 480 30 Q485 25 490 30" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-9 gap-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-orange-500 font-extrabold text-sm">—</span>
              <span className="text-[11px] sm:text-xs font-extrabold tracking-widest text-[#0d1e38] uppercase">
                ART &amp; HISTORY
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0d1e38] leading-[1.15]">
              Mangalore&apos;s
              <br />
              Art, <span className="text-[#ea580c]">Heritage and History</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-xl font-normal leading-relaxed">
              Explore the rich culture, historic landmarks and artistic
              traditions that have shaped Mangalore over the years.
            </p>
          </div>

          {/* View All Link */}
          <Link
            href="#places"
            className="group self-start sm:self-end inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#ea580c] hover:text-orange-600 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Cards in a Row */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 xl:gap-5 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {heritageItems.map((item, idx) => (
            <div
              key={item.id}
              className="group relative h-[250px] sm:h-[270px] lg:h-[285px] rounded-[22px] sm:rounded-[24px] overflow-hidden cursor-pointer shadow-md shadow-slate-900/10 border border-slate-100/60 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/15 hover:-translate-y-1.5 select-none"
              style={{
                transitionDelay: `${idx * 70 + 80}ms`,
              }}
            >
              {/* Card Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Gradient Overlay for Crisp Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300 group-hover:opacity-95" />
              </div>

              {/* Card Bottom Content Area */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-4.5 flex items-end justify-between gap-2">
                {/* Left: Icon Pill + Title */}
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-orange-500/80">
                    {item.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight drop-shadow-md tracking-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Right: Circular Arrow Button */}
                <div className="flex-shrink-0">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:scale-110">
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
