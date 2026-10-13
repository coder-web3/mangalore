"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Palmtree,
  MapPin,
  Clock,
  Star,
  Camera,
  Play,
  Images,
  Compass,
  Car,
  Calendar,
  Sparkles,
  HelpCircle,
  Lightbulb,
  X,
  CheckCircle2,
  Waves,
  Sun,
} from "lucide-react";
import Header from "@/components/Header";
import TourEnquiryCTA from "@/components/TourEnquiryCTA";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { PanamburDetailData } from "@/lib/cms";

interface DetailNavTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const detailTabs: DetailNavTab[] = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "photos", label: "Photos", icon: Images },
  { id: "things-to-do", label: "Things to Do", icon: Compass },
  { id: "how-to-reach", label: "How to Reach", icon: Car },
  { id: "best-time", label: "Best Time", icon: Calendar },
  { id: "nearby-places", label: "Nearby Places", icon: MapPin },
  { id: "travel-tips", label: "Travel Tips", icon: Lightbulb },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
];

interface PlaceDetailPageViewProps {
  detail: PanamburDetailData;
  slug?: string;
}

export default function PlaceDetailPageView({
  detail,
  slug,
}: PlaceDetailPageViewProps) {
  const [currentTab, setCurrentTab] = useState("overview");
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    const targetElement = document.getElementById(tabId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getThingIcon = (iconName?: string) => {
    switch (iconName) {
      case "sun":
        return <Sun className="h-6 w-6 text-[#ff5e15] mb-2" />;
      case "car":
        return <Car className="h-6 w-6 text-[#ff5e15] mb-2" />;
      case "sparkles":
        return <Sparkles className="h-6 w-6 text-[#ff5e15] mb-2" />;
      default:
        return <Waves className="h-6 w-6 text-[#ff5e15] mb-2" />;
    }
  };

  const fullPlaceName = `${detail.hero.title} ${detail.hero.titleHighlight}`.trim();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 overflow-x-clip">
        {/* HERO SECTION */}
        <section className="relative w-full bg-slate-50">
          <div className="relative w-full min-h-[460px] sm:min-h-[500px] md:min-h-[520px] lg:min-h-[540px] flex flex-col justify-between overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={detail.hero.backdropImage || "/panambur-hero-backdrop.jpg"}
                alt={`${fullPlaceName} Mangalore`}
                fill
                priority
                unoptimized
                className="object-cover object-right md:object-center"
                sizes="100vw"
              />
            </div>

            {/* Left White Frosted Soft Gradient Shield */}
            <div
              className="absolute inset-y-0 left-0 w-full sm:w-[80%] md:w-[65%] lg:w-[54%] xl:w-[50%] z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.98) 60%, rgba(255, 255, 255, 0.85) 82%, rgba(255, 255, 255, 0) 100%)",
              }}
            />

            {/* Content Container */}
            <div className="relative z-20 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12 pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-20 md:pb-24">
              <div className="max-w-xl lg:max-w-2xl">
                {/* Breadcrumb Navigation */}
                <nav
                  aria-label="Breadcrumb"
                  className="mb-4 sm:mb-5 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-[13px] font-medium text-slate-600"
                >
                  <Link
                    href="/"
                    className="flex items-center gap-1 hover:text-[#ff5e15] transition-colors"
                  >
                    <Home className="h-3.5 w-3.5 text-slate-500" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />

                  <Link
                    href="/places-to-visit"
                    className="hover:text-[#ff5e15] transition-colors"
                  >
                    Places to Visit
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />

                  <span className="text-slate-600 capitalize">
                    {detail.hero.category || "Sightseeing"}
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />

                  <span className="text-[#ff5e15] font-bold">
                    {fullPlaceName}
                  </span>
                </nav>

                {/* Category Tag Pill */}
                <div className="mb-3 sm:mb-3.5 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 border border-orange-200/80 shadow-xs">
                  <Palmtree className="h-3.5 w-3.5 text-[#ff5e15]" />
                  <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#0d1e38]">
                    {detail.hero.category || "BEACHES"}
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-[50px] lg:text-[58px] font-extrabold tracking-tight text-[#0d1e38] leading-[1.08] mb-3 sm:mb-4">
                  {detail.hero.title}{" "}
                  {detail.hero.titleHighlight && (
                    <span className="block text-[#ff5e15] relative inline-block mt-0.5 sm:mt-1">
                      {detail.hero.titleHighlight}
                      {/* Orange Wave Accent Swash */}
                      <svg
                        className="absolute -bottom-2 sm:-bottom-3 left-full ml-2 w-14 sm:w-18 text-[#ff5e15] overflow-visible hidden sm:block"
                        viewBox="0 0 80 18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      >
                        <path d="M4 12 C 22 2, 45 20, 76 8" />
                      </svg>
                    </span>
                  )}
                </h1>

                {/* Description Copy */}
                <p className="text-xs sm:text-sm md:text-[14px] text-slate-600 leading-relaxed mb-6 sm:mb-8 font-normal max-w-xl">
                  {detail.hero.description}
                </p>

                {/* 4 Metadata Quick Info Pills Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 mb-2">
                  {/* Pill 1: Location */}
                  <div className="flex items-center gap-2.5 rounded-2xl bg-white/95 p-2 sm:p-2.5 shadow-sm border border-slate-100">
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#ff5e15]">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0d1e38] truncate max-w-[90px]">
                        {detail.hero.location?.split(",")[0] || "Mangalore"}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[90px]">
                        {detail.hero.location?.split(",").slice(1).join(",") || "Karnataka"}
                      </div>
                    </div>
                  </div>

                  {/* Pill 2: Best Time */}
                  <div className="flex items-center gap-2.5 rounded-2xl bg-white/95 p-2 sm:p-2.5 shadow-sm border border-slate-100">
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#ff5e15]">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0d1e38]">Best Time</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[90px]">
                        {detail.hero.bestTime || "Oct to March"}
                      </div>
                    </div>
                  </div>

                  {/* Pill 3: Popular For */}
                  <div className="flex items-center gap-2.5 rounded-2xl bg-white/95 p-2 sm:p-2.5 shadow-sm border border-slate-100">
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#ff5e15]">
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0d1e38]">Popular For</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[90px]">
                        {detail.hero.popularFor || "Sightseeing"}
                      </div>
                    </div>
                  </div>

                  {/* Pill 4: Ideal Duration */}
                  <div className="flex items-center gap-2.5 rounded-2xl bg-white/95 p-2 sm:p-2.5 shadow-sm border border-slate-100">
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#ff5e15]">
                      <Camera className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0d1e38]">Duration</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[90px]">
                        {detail.hero.idealDuration || "1 - 2 Hours"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Floating "Watch Video" Circular Button Overlay */}
              <div
                onClick={() => setVideoModalOpen(true)}
                className="hidden lg:flex absolute right-16 xl:right-28 top-[55%] -translate-y-1/2 z-20 items-center gap-3 bg-white/95 backdrop-blur-md p-2.5 pr-5 rounded-full shadow-2xl border border-white/80 transition hover:scale-105 cursor-pointer"
              >
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff5e15] text-white shadow-lg shadow-orange-500/40 transition hover:bg-[#ea4908]"
                  aria-label={`Watch video of ${fullPlaceName}`}
                >
                  <Play className="h-5 w-5 fill-current ml-0.5" />
                </button>
                <div className="text-left select-none">
                  <div className="text-xs font-extrabold text-[#0d1e38]">Watch Video</div>
                  <div className="text-[10px] text-slate-500 truncate max-w-[120px]">
                    of {fullPlaceName}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. FLOATING BOTTOM NAVIGATION BAR (UNCLIPPED, PROPER PADDING & OVERHANG) */}
        <div className="relative z-30 mx-auto w-full max-w-[1600px] px-3 sm:px-6 lg:px-8 xl:px-12 -mt-7 sm:-mt-9 md:-mt-11">
          <div className="rounded-2xl sm:rounded-[26px] bg-white shadow-xl shadow-slate-900/10 border border-slate-200/90 p-1.5 sm:p-2">
            <div className="flex items-center justify-between overflow-x-auto scrollbar-none divide-x divide-slate-100 min-w-[840px] lg:min-w-0">
              {detailTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = currentTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabClick(tab.id)}
                    className={`relative flex-1 flex flex-col items-center justify-center py-2.5 sm:py-3.5 px-2 sm:px-3 rounded-xl transition-all duration-200 group text-center cursor-pointer min-h-[68px] sm:min-h-[74px] ${
                      isActive
                        ? "bg-[#ff5e15] text-white font-bold shadow-md shadow-orange-500/25"
                        : "text-slate-700 hover:text-[#ff5e15] hover:bg-slate-50 font-medium"
                    }`}
                  >
                    <div
                      className={`mb-1.5 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center transition-transform duration-200 group-hover:scale-110 ${
                        isActive ? "text-white" : "text-slate-700 group-hover:text-[#ff5e15]"
                      }`}
                    >
                      <Icon className="h-5 w-5 sm:h-5.5 sm:w-5.5 stroke-[2]" />
                    </div>
                    <span className="text-[11px] sm:text-xs tracking-tight whitespace-nowrap block leading-tight">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* CONTENT SECTIONS */}
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-14 space-y-16">
          {/* 1. Overview Section */}
          <section id="overview" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3.5 py-1 text-xs font-bold text-[#ff5e15]">
                <span>{detail.overview.badge || "DISCOVER MANGALORE"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1e38] tracking-tight">
                {detail.overview.title || `About ${fullPlaceName}`}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {detail.overview.p1}
              </p>
              {detail.overview.p2 && (
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {detail.overview.p2}
                </p>
              )}

              {/* Highlights Bullet List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
                {detail.overview.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Travel Facts Card */}
            <div className="lg:col-span-4 rounded-3xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-[#0d1e38]">Quick Travel Facts</h3>
              <div className="divide-y divide-slate-200/70 text-xs sm:text-sm space-y-3 pt-1">
                {detail.quickFacts.map((fact, idx) => (
                  <div key={idx} className="flex justify-between pt-2">
                    <span className="text-slate-500">{fact.label}:</span>
                    <span className="font-bold text-slate-900">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 2. Photos Gallery Grid */}
          <section id="photos" className="scroll-mt-28 space-y-5">
            <h2 className="text-2xl font-extrabold text-[#0d1e38]">Photo Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {detail.gallery.map((photo, idx) => (
                <div
                  key={photo.id || idx}
                  className="group relative aspect-[16/11] rounded-2xl overflow-hidden shadow-md bg-slate-100"
                >
                  <Image
                    src={photo.image}
                    alt={photo.caption || `${fullPlaceName} Photo`}
                    fill
                    unoptimized
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {photo.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-3 pt-6 text-white text-xs font-medium">
                      <span>{photo.caption}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 3. Things to Do */}
          <section id="things-to-do" className="scroll-mt-28 space-y-5">
            <h2 className="text-2xl font-extrabold text-[#0d1e38]">
              Things to Do at {fullPlaceName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {detail.thingsToDo.map((thing, idx) => (
                <div
                  key={thing.id || idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-orange-200 transition-colors"
                >
                  {getThingIcon(thing.icon)}
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{thing.title}</h4>
                  <p className="text-xs text-slate-500">{thing.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <TourEnquiryCTA />
      </main>
      <Footer />
      <ScrollToTop />

      {/* Video Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full bg-black rounded-3xl overflow-hidden shadow-2xl p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full rounded-2xl overflow-hidden">
              <iframe
                src={detail.hero.videoUrl || "https://www.youtube.com/embed/9No-FiEInLA?autoplay=1"}
                title={`${fullPlaceName} Video Tour`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
