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
  Plane,
  Train,
  Bus,
  ChevronDown,
  ChevronUp,
  Thermometer,
  CloudSun,
  ArrowRight,
  ShieldCheck,
  Navigation,
} from "lucide-react";
import Header from "@/components/Header";
import TourEnquiryCTA from "@/components/TourEnquiryCTA";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { PanamburDetailData, getDefaultPlaceDetail } from "@/lib/cms";

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
  const [openFaqId, setOpenFaqId] = useState<string | null>("1");

  const fullPlaceName = `${detail.hero.title} ${detail.hero.titleHighlight}`.trim();

  // Resolve defaults for the 5 new sections if not yet provided in CMS data
  const fallbackDetail = getDefaultPlaceDetail({ name: fullPlaceName });
  const howToReach = detail.howToReach || fallbackDetail.howToReach!;
  const bestTimeSection = detail.bestTimeSection || fallbackDetail.bestTimeSection!;
  const nearbyPlaces = detail.nearbyPlaces || fallbackDetail.nearbyPlaces!;
  const travelTips = detail.travelTips || fallbackDetail.travelTips!;
  const faqs = detail.faqs || fallbackDetail.faqs!;

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    const targetElement = document.getElementById(tabId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
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

  const getReachIcon = (iconName: string) => {
    switch (iconName) {
      case "plane":
        return <Plane className="h-6 w-6 text-sky-600" />;
      case "train":
        return <Train className="h-6 w-6 text-indigo-600" />;
      case "bus":
        return <Bus className="h-6 w-6 text-amber-600" />;
      default:
        return <Car className="h-6 w-6 text-[#ff5e15]" />;
    }
  };

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

          {/* 4. How to Reach */}
          <section id="how-to-reach" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3.5 py-1 text-xs font-bold text-[#ff5e15]">
                <span>{howToReach.badge || "CONNECTIVITY & COMMUTE"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1e38] tracking-tight">
                {howToReach.title || `How to Reach ${fullPlaceName}`}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                {howToReach.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {howToReach.modes.map((mode, idx) => (
                <div
                  key={mode.id || idx}
                  className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-orange-200 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 shadow-xs">
                        {getReachIcon(mode.icon)}
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {mode.distance}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-[#0d1e38] leading-snug">
                      {mode.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {mode.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Map Directions CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-orange-50 via-amber-50/50 to-orange-50/20 border border-orange-200/70 p-5 sm:p-6">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff5e15] text-white shadow-md shadow-orange-500/20">
                  <Navigation className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#0d1e38]">
                    Looking for Turn-by-Turn GPS Directions?
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Navigate directly to {fullPlaceName} using Google Maps with real-time coastal traffic updates.
                  </p>
                </div>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${fullPlaceName} Mangalore`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0d1e38] hover:bg-slate-800 px-4 py-2.5 text-xs font-bold text-white transition shadow-sm whitespace-nowrap cursor-pointer"
              >
                <span>Open in Google Maps</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </section>

          {/* 5. Best Time to Visit */}
          <section id="best-time" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3.5 py-1 text-xs font-bold text-[#ff5e15]">
                <span>{bestTimeSection.badge || "SEASONS & TIMINGS"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1e38] tracking-tight">
                {bestTimeSection.title || `Best Time to Visit ${fullPlaceName}`}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                {bestTimeSection.description}
              </p>
            </div>

            {/* Timing Highlight Cards Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <div className="flex items-center gap-4 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0d1e38] to-[#152a48] p-5 sm:p-6 text-white shadow-md shadow-slate-900/10">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-orange-400 border border-white/10">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-300">
                    Recommended Season
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                    {bestTimeSection.recommendedSeason}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-200/80 p-5 sm:p-6 shadow-xs">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ff5e15] text-white shadow-md shadow-orange-500/25">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff5e15]">
                    Ideal Time of Day
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#0d1e38] mt-0.5">
                    {bestTimeSection.idealTimeOfDay}
                  </h3>
                </div>
              </div>
            </div>

            {/* 3 Seasons Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {bestTimeSection.seasons.map((season, idx) => (
                <div
                  key={season.id || idx}
                  className={`rounded-2xl sm:rounded-3xl border p-5 sm:p-6 transition-all flex flex-col justify-between space-y-4 ${
                    season.highlight
                      ? "border-orange-300 bg-white shadow-md ring-2 ring-orange-500/10"
                      : "border-slate-200/90 bg-white shadow-xs"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">{season.months}</span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                          season.highlight
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {season.status}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-[#0d1e38]">
                      {season.name}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                      <Thermometer className="h-4 w-4" />
                      <span>{season.temp}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {season.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Nearby Places */}
          <section id="nearby-places" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3.5 py-1 text-xs font-bold text-[#ff5e15]">
                <span>{nearbyPlaces.badge || "EXPLORE MORE"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1e38] tracking-tight">
                {nearbyPlaces.title || `Nearby Attractions Around ${fullPlaceName}`}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                {nearbyPlaces.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {nearbyPlaces.places.map((place, idx) => (
                <div
                  key={place.id || idx}
                  className="group rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white overflow-hidden shadow-xs hover:shadow-lg hover:border-orange-200 transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={place.image || "/panambur.avif"}
                      alt={place.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="rounded-full bg-[#0d1e38]/85 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold text-white shadow-xs">
                        {place.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#ff5e15] mb-1">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span>{place.distance} • {place.travelTime}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-extrabold text-[#0d1e38] group-hover:text-[#ff5e15] transition-colors leading-snug">
                        {place.name}
                      </h4>
                    </div>

                    <Link
                      href={place.link || "/places-to-visit"}
                      className="inline-flex items-center justify-between w-full pt-3 border-t border-slate-100 text-xs font-bold text-slate-700 hover:text-[#ff5e15] transition-colors"
                    >
                      <span>View Destination</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Travel Tips */}
          <section id="travel-tips" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3.5 py-1 text-xs font-bold text-[#ff5e15]">
                <span>{travelTips.badge || "LOCAL ADVICE"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1e38] tracking-tight">
                {travelTips.title || `Practical Travel Tips for ${fullPlaceName}`}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                {travelTips.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {travelTips.tips.map((tip, idx) => (
                <div
                  key={tip.id || idx}
                  className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:border-orange-200 transition-colors space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#ff5e15]">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    {tip.category && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider">
                        {tip.category}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[#0d1e38] leading-snug">
                    {tip.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 8. Frequently Asked Questions */}
          <section id="faqs" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3.5 py-1 text-xs font-bold text-[#ff5e15]">
                <span>{faqs.badge || "COMMON QUESTIONS"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1e38] tracking-tight">
                {faqs.title || `Frequently Asked Questions About ${fullPlaceName}`}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                {faqs.description}
              </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white divide-y divide-slate-100 overflow-hidden shadow-xs">
              {faqs.items.map((faq, idx) => {
                const isOpen = openFaqId === (faq.id || String(idx + 1));
                return (
                  <div key={faq.id || idx} className="transition-colors">
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id || String(idx + 1))}
                      className="w-full flex items-center justify-between p-4 sm:p-6 text-left gap-4 hover:bg-slate-50/60 transition cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[#ff5e15] text-[11px] font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#0d1e38]">
                          {faq.question}
                        </span>
                      </div>
                      <div className="shrink-0 text-slate-400">
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 text-[#ff5e15]" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50/30">
                        <p className="pl-9">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
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
