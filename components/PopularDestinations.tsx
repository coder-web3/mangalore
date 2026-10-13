"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, ArrowLeft } from "lucide-react";

interface Destination {
  id: string;
  number: string;
  name: string;
  location: string;
  image: string;
}

interface PopularDestinationsProps {
  initialData?: {
    tag?: string;
    title?: string;
    titleHighlight?: string;
    description?: string;
    scriptTop?: string;
    scriptBottom?: string;
    destinations?: Destination[];
  };
}

export default function PopularDestinations({ initialData }: PopularDestinationsProps) {
  const [activeCategory, setActiveCategory] = useState("beaches");
  const [selectedCardId, setSelectedCardId] = useState("1");
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    {
      id: "beaches",
      label: "Beaches",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 8c0-2.76-2.24-5-5-5-1.2 0-2.3.42-3.16 1.13C4.26 4.6 4 5.27 4 6c0 1.66 1.34 3 3 3" />
          <path d="M11 9c2.76 0 5-2.24 5-5 0-1.2-.42-2.3-1.13-3.16C14.4 1.26 13.73 1 13 1c-1.66 0-3 1.34-3 3" />
          <path d="M12 9c0 7-3 12-3 12" />
          <path d="M12 9c2.5 1.5 5 1.5 7.5-.5" />
          <path d="M12 13c3 1.5 6 1 8.5-1.5" />
          <path d="M7 21h10" />
        </svg>
      ),
    },
    {
      id: "rivers",
      label: "Rivers & Backwaters",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 20a4 4 0 0 0 4-2 4 4 0 0 1 4-2 4 4 0 0 0 4 2 4 4 0 0 1 4 2 4 4 0 0 0 4-2" />
          <path d="M4 14l1.5-6h13L20 14" />
          <path d="M9 8V4h6v4" />
        </svg>
      ),
    },
    {
      id: "hills",
      label: "Hills & Viewpoints",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m8 3 4 8 5-5 5 10H2L8 3z" />
          <path d="M4 16h8" />
        </svg>
      ),
    },
    {
      id: "temples",
      label: "Temples & Heritage",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v3M9 5h6M7 8h10M5 11h14M4 14h16M3 17h18M2 21h20" />
          <path d="M10 21v-4h4v4" />
        </svg>
      ),
    },
    {
      id: "adventure",
      label: "Adventure & Activities",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="13" cy="4" r="2" />
          <path d="m9 20 3-6 3 1 2 5" />
          <path d="m6 16 3-3 2 1" />
          <path d="M14 9l-2 3-3-1-2 4" />
          <path d="M17 10v10" />
        </svg>
      ),
    },
    {
      id: "food",
      label: "Food & Culture",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2v20M15 2v5a3 3 0 0 0 6 0V2" />
          <path d="M6 2v20M3 2v6a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V2" />
        </svg>
      ),
    },
    {
      id: "tours",
      label: "Tour Packages",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
  ];

  // 6 destinations matching Image 1
  const defaultDestinations: Destination[] = [
    {
      id: "1",
      number: "01",
      name: "Panambur Beach",
      location: "Mangalore",
      image: "/panambur.avif",
    },
    {
      id: "2",
      number: "02",
      name: "Tannirbhavi Beach",
      location: "Mangalore",
      image: "/tannirbhavi.avif",
    },
    {
      id: "3",
      number: "03",
      name: "Someshwar Beach",
      location: "Mangalore",
      image: "/someshwar.avif",
    },
    {
      id: "4",
      number: "04",
      name: "Sultan Battery",
      location: "Bantwal",
      image: "/sulthan.avif",
    },
    {
      id: "5",
      number: "05",
      name: "Pilikula Nisargadhama",
      location: "Moodushedde",
      image: "/pilikula.avif",
    },
    {
      id: "6",
      number: "06",
      name: "Kadri Manjunath Temple",
      location: "Mangalore",
      image: "/kadri.avif",
    },
  ];

  const destinations =
    initialData?.destinations && initialData.destinations.length > 0
      ? initialData.destinations
      : defaultDestinations;

  const scrollLeft = () => {
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="destinations"
      className="relative bg-white pt-6 pb-16 sm:pt-10 sm:pb-20 lg:pt-10 lg:pb-24 overflow-hidden"
    >
      {/* Background Image: places-bg.avif watermark on sides */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/places-bg.avif"
          alt="Popular destinations background"
          fill
          unoptimized
          priority
          className="object-cover object-top opacity-90"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* 1. Top Category Filter Tabs Bar (Cohesive segmented row matching Image 1) */}
        <div
          className={`mb-12 sm:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-2 pt-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-1 sm:gap-2 lg:gap-3">
            {categories.map((cat, idx) => {
              const isActive = activeCategory === cat.id;

              return (
                <React.Fragment key={cat.id}>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`group relative flex flex-col items-center flex-shrink-0 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-2xl sm:rounded-3xl transition-all duration-300 focus:outline-none ${
                      isActive
                        ? "bg-[#FFF3EB] border border-orange-200/90 shadow-sm"
                        : "bg-transparent hover:bg-slate-50/70"
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center transition-all duration-300 mb-1.5 ${
                        isActive
                          ? "text-orange-500 scale-105"
                          : "text-[#122846] group-hover:text-orange-500 group-hover:scale-110"
                      }`}
                    >
                      {cat.icon}
                    </div>

                    {/* Category Label */}
                    <span
                      className={`text-xs sm:text-[13px] font-bold tracking-tight transition-colors whitespace-nowrap ${
                        isActive
                          ? "text-[#ea580c]"
                          : "text-[#122846] group-hover:text-orange-600"
                      }`}
                    >
                      {cat.label}
                    </span>

                    {/* Active Underline Pill */}
                    {isActive ? (
                      <span className="w-8 h-[3px] bg-[#ea580c] rounded-full mt-1.5 transition-all duration-300" />
                    ) : (
                      <span className="w-8 h-[3px] bg-transparent mt-1.5" />
                    )}
                  </button>

                  {/* Thin vertical divider between items */}
                  {idx < categories.length - 1 && (
                    <div className="hidden lg:block h-8 w-[1px] bg-slate-200/70 self-center" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* 2. Section Header Area */}
        <div
          className={`flex flex-col lg:flex-row items-start lg:items-end justify-between mb-8 sm:mb-10 gap-6 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-orange-500 font-extrabold text-sm">—</span>
              <span className="text-[11px] sm:text-xs font-extrabold tracking-widest text-[#ea580c] uppercase">
                {initialData?.tag || "TOP PLACES"}
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0c1c36] leading-tight">
              {initialData?.title || "Popular Destinations in"}{" "}
              <span className="text-[#ea580c]">
                {initialData?.titleHighlight || "Mangalore"}
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-xl font-normal">
              {initialData?.description ||
                "Explore the most beautiful and must-visit places in and around Mangalore."}
            </p>
          </div>

          {/* Script Text & View All Button on Right */}
          <div className="flex items-center gap-6 sm:gap-8 self-end lg:self-auto">
            {/* Handwritten Script Flourish in exactly 2 lines */}
            <div className="hidden sm:block text-right select-none">
              <div className="font-script text-xl lg:text-2xl text-slate-700 font-bold leading-tight whitespace-nowrap">
                <span>{initialData?.scriptTop || "Beaches, Culture, Nature"}</span>
                <br />
                <span className="italic font-normal text-slate-600">
                  {initialData?.scriptBottom || "and 'More..."}
                </span>
              </div>
              <svg
                className="w-24 text-orange-500 ml-auto mt-0.5"
                viewBox="0 0 100 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M5 10C35 5 70 18 95 8M80 5L95 8L85 15" />
              </svg>
            </div>

            {/* View All Destinations Button */}
            <Link
              href="#destinations"
              className="group btn-shimmer inline-flex items-center gap-2 rounded-full border-2 border-orange-400 bg-white px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-[#ea580c] shadow-sm transition-all duration-300 hover:bg-[#ea580c] hover:text-white hover:border-[#ea580c] hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5"
            >
              <span>View All Destinations</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 3. The 6 Destination Cards Row: Exactly Straight/Upright (rotate-0), No Bend, Uniform Height */}
        <div className="relative">
          {/* Floating Left Arrow Button */}
          <button
            type="button"
            onClick={scrollLeft}
            className="absolute -left-3 sm:-left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white shadow-xl shadow-slate-900/15 border border-slate-100 flex items-center justify-center text-slate-700 hover:text-orange-600 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none"
            aria-label="Previous destinations"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
          </button>

          {/* Cards Scroll / Flex Container: 5 Cards visible in one row on desktop */}
          <div
            ref={cardsContainerRef}
            className="flex items-center gap-3.5 sm:gap-4 lg:gap-4 xl:gap-5 overflow-x-auto pb-4 pt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
          >
            {destinations.map((place, index) => {
              const isSelected = selectedCardId === place.id;

              return (
                <div
                  key={place.id}
                  onClick={() => setSelectedCardId(place.id)}
                  className={`group relative flex-shrink-0 w-[240px] sm:w-[260px] lg:w-[calc((100%-4*16px)/5)] xl:w-[calc((100%-4*20px)/5)] h-[280px] sm:h-[300px] lg:h-[310px] rounded-[22px] sm:rounded-[24px] overflow-hidden transition-all duration-500 cursor-pointer select-none rotate-0 ${
                    isSelected
                      ? "ring-2 ring-orange-500 shadow-xl shadow-orange-500/20 scale-[1.01]"
                      : "hover:-translate-y-1.5 hover:shadow-xl shadow-md shadow-slate-900/10"
                  } ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{
                    transitionDelay: `${index * 60 + 100}ms`,
                  }}
                >
                  {/* Full Card Background Image */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 250px, (max-width: 1200px) 220px, 16vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Gradient Overlay: Deep at bottom, subtle at top for frosted badge */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300" />
                  </div>

                  {/* Frosted Glass Number Badge at Top Left */}
                  <div className="absolute top-3.5 left-3.5 z-10 rounded-full bg-white/25 backdrop-blur-md border border-white/30 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                    {place.number}
                  </div>

                  {/* Card Bottom Content Area */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-4.5 flex items-end justify-between gap-2">
                    <div className="flex-1 min-w-0 pr-1">
                      {/* Place Name */}
                      <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug tracking-tight drop-shadow-md">
                        {place.name}
                      </h3>

                      {/* Location with Pin */}
                      <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-white/90 drop-shadow-sm">
                        <MapPin className="h-3.5 w-3.5 text-orange-400 flex-shrink-0" />
                        <span className="truncate">{place.location}</span>
                      </div>
                    </div>

                    {/* Bottom Right Arrow Button (Orange for active/selected, Dark Glass for others) */}
                    <div className="flex-shrink-0">
                      {isSelected || index === 0 ? (
                        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/40 transition-transform duration-300 group-hover:scale-110">
                          <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-slate-900/60 backdrop-blur-sm border border-white/10 text-white transition-all duration-300 group-hover:bg-orange-500 group-hover:scale-110">
                          <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Right Arrow Button */}
          <button
            type="button"
            onClick={scrollRight}
            className="absolute -right-3 sm:-right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white shadow-xl shadow-slate-900/15 border border-slate-100 flex items-center justify-center text-slate-700 hover:text-orange-600 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none"
            aria-label="Next destinations"
          >
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
