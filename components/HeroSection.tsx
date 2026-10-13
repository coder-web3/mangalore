"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Play, MapPin, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import SearchFilterBar from "./SearchFilterBar";
import VideoModal from "./VideoModal";

const heroSlides = [
  {
    image: "/kadri.avif",
    badgeTitle: "Kadri Temple",
    badgeLocation: "Mangalore",
  },
  {
    image: "/nitk.avif",
    badgeTitle: "NITK Beach",
    badgeLocation: "Mangalore",
  },
  {
    image: "/milagrees.avif",
    badgeTitle: "Milagres Church",
    badgeLocation: "Mangalore",
  },
  {
    image: "/kudroli.avif",
    badgeTitle: "Kudroli Temple",
    badgeLocation: "Mangalore",
  },
];

interface HeroSectionProps {
  initialData?: {
    badge?: string;
    titleLine1?: string;
    titleHighlight?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
    videoUrl?: string;
    videoTitle?: string;
    videoSubtitle?: string;
    slides?: Array<{
      image: string;
      badgeTitle: string;
      badgeLocation: string;
    }>;
  };
}

export default function HeroSection({ initialData }: HeroSectionProps) {
  const slides =
    initialData?.slides && initialData.slides.length > 0
      ? initialData.slides
      : heroSlides;

  const [videoOpen, setVideoOpen] = useState(false);
  const [underlineDrawn, setUnderlineDrawn] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds using functional state update with active slides.length
  useEffect(() => {
    if (slides.length <= 1) return;
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [slides.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    // Smooth entrance draw trigger shortly after mount
    const timer = setTimeout(() => {
      setUnderlineDrawn(true);
    }, 280);
    return () => clearTimeout(timer);
  }, []);

  const handleReplayUnderline = () => {
    setUnderlineDrawn(false);
    setTimeout(() => setUnderlineDrawn(true), 50);
  };

  // Safe active slide
  const activeSlide = slides[currentSlide % slides.length] || slides[0];

  return (
    <section className="relative -mt-20 min-h-[580px] lg:min-h-[660px] flex flex-col justify-between overflow-hidden pt-28 sm:pt-32 lg:pt-34 pb-0">
      {/* Background Carousel Slides with smooth crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = currentSlide % slides.length === index;
          return (
            <div
              key={`${slide.image}-${index}`}
              className="absolute inset-0 bg-cover bg-[position:75%_center] lg:bg-[position:center_right] transition-all duration-1000 ease-in-out"
              style={{
                backgroundImage: `url(${slide.image})`,
                opacity: isActive ? 1 : 0,
                transform: isActive ? "scale(1)" : "scale(1.03)",
                transition: "opacity 1.2s ease-in-out, transform 6s ease-out",
              }}
            />
          );
        })}

        {/* Enhanced Left White Gradient Shield:
            Ensures text content is 100% crisp and readable while keeping right side vivid */}
        <div
          className="absolute inset-y-0 left-0 w-full sm:w-[85%] md:w-[75%] lg:w-[64%] xl:w-[56%] pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 45%, rgba(255,255,255,0.85) 72%, rgba(255,255,255,0) 100%)",
          }}
        />
        {/* Soft radial fill behind headline */}
        <div className="absolute top-0 left-0 w-[500px] h-[450px] bg-white/60 blur-3xl pointer-events-none z-10" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12 my-auto pb-6 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[340px] lg:min-h-[380px]">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center pt-2 lg:pt-0">
            {/* Eyebrow / Tagline */}
            <div className="mb-2.5 flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-slate-500 uppercase">
                {initialData?.badge || "DISCOVER • EXPLORE • EXPERIENCE"}
              </span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0d1e38] leading-[1.15] mb-3">
              {initialData?.titleLine1 || "Explore the Real"}{" "}
              <span
                onMouseEnter={handleReplayUnderline}
                className="group/title relative inline-block text-orange-500 cursor-pointer select-none"
              >
                {initialData?.titleHighlight || "Mangalore"}
                {/* Organic curved underline accent with smooth entrance drawing animation */}
                <svg
                  className="absolute -bottom-2 left-0 w-full text-orange-500 overflow-visible pointer-events-none"
                  viewBox="0 0 250 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(249, 115, 22, 0.25))",
                  }}
                >
                  <path
                    d="M3 13C60 4 180 3 247 11"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    pathLength="100"
                    style={{
                      strokeDasharray: 100,
                      strokeDashoffset: underlineDrawn ? 0 : 100,
                      opacity: underlineDrawn ? 1 : 0,
                      transition:
                        "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease-out",
                    }}
                  />
                </svg>
              </span>
            </h1>

            {/* Description Paragraph */}
            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-slate-600 mb-5 font-normal">
              {initialData?.description ||
                "From serene beaches and scenic hills to rich culture, history and delicious coastal cuisine — explore the best of Mangalore with curated guides and local experiences."}
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              {/* Primary CTA */}
              <Link
                href={initialData?.ctaLink || "/places-to-visit"}
                className="group btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0"
              >
                <span>{initialData?.ctaText || "Start Exploring"}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Watch Video Button */}
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="group flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 sm:px-4.5 sm:py-2.5 shadow-md border border-slate-100/80 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white">
                  <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current ml-0.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold text-[#0d1e38] transition-colors group-hover:text-orange-600">
                    Watch Video
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-slate-500">
                    A glimpse of Mangalore
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Hero Column: Location Badge with Slider Controls */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex flex-col items-end justify-center min-h-[140px] lg:min-h-[220px]">
            {/* Dynamic Location Badge changing per slide with clean floating card */}
            <div className="pointer-events-auto self-end mt-auto mb-2 mr-2 sm:mr-4 flex flex-col items-end gap-2.5">
              <div className="group flex items-center gap-2.5 rounded-2xl bg-white/95 backdrop-blur-md px-3.5 py-1.5 shadow-xl border border-white/80 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-orange-200">
                <div className="flex h-6 w-6 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-sm transition-transform duration-300 group-hover:rotate-12">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <div className="transition-all duration-500">
                  <div className="text-xs font-bold text-[#0d1e38] transition-colors group-hover:text-orange-600">
                    {activeSlide.badgeTitle}
                  </div>
                  <div className="text-[10px] font-medium text-slate-500">
                    {activeSlide.badgeLocation}
                  </div>
                </div>
                <div className="ml-1 pl-2 border-l border-slate-200">
                  <Camera className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-orange-500" />
                </div>
              </div>

              {/* Slider Dots & Arrow Controls */}
              {slides.length > 1 && (
                <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/80 shadow-md">
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    className="p-1 rounded-full text-slate-600 hover:text-orange-600 hover:bg-slate-100 transition cursor-pointer"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5 px-1">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentSlide(idx)}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          currentSlide % slides.length === idx
                            ? "w-5 h-1.5 bg-orange-500"
                            : "w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextSlide}
                    className="p-1 rounded-full text-slate-600 hover:text-orange-600 hover:bg-slate-100 transition cursor-pointer"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Organic Bottom Wave Shape Transition with Golden-Orange Accent Ribbon & Centered Search Bar */}
      <div className="relative w-full leading-none z-20">
        <svg
          className="relative block w-full h-24 sm:h-32 lg:h-40"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="heroOrangeRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="40%" stopColor="#ea580c" />
              <stop offset="75%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          {/* Layer 1: Vibrant orange accent ribbon along wave */}
          <path
            d="M0,65 C320,135 560,20 900,105 C1140,155 1320,80 1440,65 L1440,160 L0,160 Z"
            fill="url(#heroOrangeRibbon)"
          />
          {/* Layer 2: Main white fluid wave layer overlapping slightly above orange ribbon */}
          <path
            d="M0,45 C300,115 540,5 880,85 C1120,135 1320,55 1440,40 L1440,160 L0,160 Z"
            fill="#ffffff"
          />
        </svg>

        {/* Floating Search Bar centered right on the wave boundary */}
        <div className="absolute inset-x-0 bottom-3 sm:bottom-5 lg:bottom-6 z-30">
          <SearchFilterBar />
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl={initialData?.videoUrl}
        videoTitle={initialData?.videoTitle}
        videoSubtitle={initialData?.videoSubtitle}
      />
    </section>
  );
}
