"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  ChevronRight,
  ArrowRight,
  LayoutGrid,
  Landmark,
  Palmtree,
  UtensilsCrossed,
  Trees,
  Sparkles,
  X,
  Maximize2,
  CheckCircle2,
  Star,
  Users,
  Languages,
} from "lucide-react";
import { GuidesListingHeroData } from "@/lib/cms";

interface GuideCategoryTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const guideCategories: GuideCategoryTab[] = [
  { id: "all", label: "All Guides", icon: LayoutGrid },
  { id: "heritage", label: "Temples & Heritage", icon: Landmark },
  { id: "food", label: "Food & Culinary", icon: UtensilsCrossed },
  { id: "beaches", label: "Beaches & Coastal", icon: Palmtree },
  { id: "nature", label: "Nature & Wildlife", icon: Trees },
  { id: "culture", label: "Cultural & Arts", icon: Sparkles },
];

const defaultGalleryCards = [
  {
    id: "heritage-guide",
    title: "Temple & Heritage Walks",
    subtitle: "Kadri • Kudroli • Car Street",
    image: "/card-kadri.jpg",
    rotate: "rotate-[4deg]",
    hoverRotate: "hover:rotate-0",
  },
  {
    id: "coastal-guide",
    title: "Coastal & Estuary Trails",
    subtitle: "Panambur • Sasihithlu • Gurupura",
    image: "/card-panambur.jpg",
    rotate: "-rotate-[3deg]",
    hoverRotate: "hover:rotate-0",
  },
];

interface GuidesHeroSectionProps {
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
  heroData?: GuidesListingHeroData;
  showFloatingTabs?: boolean;
}

export default function GuidesHeroSection({
  activeTab = "all",
  onSelectTab,
  heroData,
  showFloatingTabs = false,
}: GuidesHeroSectionProps) {
  const [internalTab, setInternalTab] = useState("all");
  const [selectedImage, setSelectedImage] = useState<{
    title: string;
    subtitle: string;
    image: string;
  } | null>(null);

  const displayCards =
    heroData?.galleryCards && heroData.galleryCards.length > 0
      ? heroData.galleryCards.map((c, i) => ({
          ...c,
          rotate: i === 0 ? "rotate-[4deg]" : "-rotate-[3deg]",
          hoverRotate: "hover:rotate-0",
        }))
      : defaultGalleryCards;

  const currentTab = onSelectTab ? activeTab : internalTab;

  const handleTabClick = (tabId: string) => {
    if (onSelectTab) {
      onSelectTab(tabId);
    } else {
      setInternalTab(tabId);
    }

    const el = document.getElementById("guides-articles");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = heroData?.stats || {
    guidesCount: "25+",
    toursCompleted: "1,400+",
    rating: "4.95 ★",
    languagesCount: "5 Languages",
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* 1. Main Hero Canvas */}
      <div className="relative w-full min-h-[460px] sm:min-h-[500px] md:min-h-[530px] lg:min-h-[560px] flex flex-col justify-between overflow-hidden bg-[#0a1e38]">
        {/* Background Clean Landscape */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroData?.backdropImage || "/places-backdrop-clean-right.jpg"}
            alt="Mangalore Local Guides - Coastal Scenery"
            fill
            priority
            unoptimized
            className="object-cover object-right md:object-center"
            sizes="100vw"
          />
        </div>

        {/* Crisp Left Dark Blue Mask Overlay */}
        <div
          className="absolute inset-y-0 left-0 w-full sm:w-[75%] md:w-[62%] lg:w-[50%] z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(9, 29, 56, 0.98) 0%, rgba(9, 29, 56, 0.96) 72%, rgba(9, 29, 56, 0.8) 88%, rgba(9, 29, 56, 0) 100%)",
          }}
        />

        {/* Content Container */}
        <div className="relative z-20 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12 pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading & Text */}
            <div className="lg:col-span-7 xl:col-span-7 max-w-xl lg:max-w-2xl">
              {/* Breadcrumb Navigation: Home > Local Guides */}
              <nav
                aria-label="Breadcrumb"
                className="mb-4 sm:mb-5 flex items-center gap-2 text-xs sm:text-sm font-medium text-white/80"
              >
                <MapPin className="h-4 w-4 text-[#ff5e15] shrink-0 fill-[#ff5e15]" />
                <Link
                  href="/"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-white/50" />
                <span className="text-white font-semibold">Local Guides</span>
              </nav>

              {/* Eyebrow / Tagline */}
              <div className="mb-2 sm:mb-2.5 flex items-center gap-2.5">
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-white/80 uppercase">
                  {heroData?.badge || "VERIFIED LOCAL STORYTELLERS"}
                </span>
                <span className="h-[2px] w-8 rounded-full bg-[#ff5e15]" />
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[50px] font-extrabold tracking-tight text-white leading-[1.1] mb-3 sm:mb-4">
                {heroData?.titleLine1 || "Explore With Mangalore's"}{" "}
                <span className="block text-[#ff5e15] mt-0.5 sm:mt-1">
                  {heroData?.titleHighlight || "Expert Local Guides"}
                </span>
              </h1>

              {/* Description Paragraph */}
              <p className="text-xs sm:text-sm md:text-[14px] text-white/85 leading-relaxed mb-6 sm:mb-7 font-normal max-w-lg">
                {heroData?.description ||
                  "Discover sacred temple legends, coastal estuaries, authentic Ghee Roast trails, and Kambala folklore with verified, multi-lingual native storytellers fluent in Tulu, Kannada, English, and Hindi."}
              </p>

              {/* Stats Bar Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6 sm:mb-7 max-w-xl">
                <div className="flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 px-3 py-2 text-white">
                  <Users className="h-4 w-4 text-[#ff5e15] shrink-0" />
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold leading-tight">
                      {stats.guidesCount}
                    </div>
                    <div className="text-[10px] text-white/70">Verified Guides</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 px-3 py-2 text-white">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400 shrink-0" />
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold leading-tight">
                      {stats.rating}
                    </div>
                    <div className="text-[10px] text-white/70">Avg Rating</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 px-3 py-2 text-white">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold leading-tight">
                      {stats.toursCompleted}
                    </div>
                    <div className="text-[10px] text-white/70">Tours Hosted</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 px-3 py-2 text-white">
                  <Languages className="h-4 w-4 text-cyan-300 shrink-0" />
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold leading-tight">
                      {stats.languagesCount}
                    </div>
                    <div className="text-[10px] text-white/70">Languages</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href="#guides-articles"
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#ff5411] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-orange-950/40 transition-all duration-300 hover:bg-[#ea4908] hover:shadow-orange-900/50 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>Explore Stories</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-all backdrop-blur-sm"
                >
                  Custom Tour Enquiry
                </Link>
              </div>
            </div>

            {/* Right Column: 2 Functional Interactive Polaroid Cards */}
            <div className="hidden md:flex lg:col-span-5 xl:col-span-5 justify-end items-center pr-2 lg:pr-4">
              <div className="flex flex-col gap-4 items-end select-none">
                {displayCards.map((card, idx) => (
                  <div
                    key={card.id || idx}
                    onClick={() =>
                      setSelectedImage({
                        title: card.title,
                        subtitle: card.subtitle,
                        image: card.image,
                      })
                    }
                    className={`group relative w-48 sm:w-56 lg:w-60 bg-white p-2.5 rounded-2xl shadow-2xl shadow-slate-950/50 border border-white/90 cursor-pointer transform transition-all duration-300 ${card.rotate} ${card.hoverRotate} hover:scale-105 hover:z-30 hover:shadow-orange-500/20`}
                    title="Click to view full photo"
                  >
                    {/* Polaroid Photo Frame */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl bg-slate-900">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="240px"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="p-2 rounded-full bg-white/90 text-orange-600 shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                          <Maximize2 className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    {/* Polaroid Bottom Caption */}
                    <div className="pt-2 px-1 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-extrabold text-[#0d1e38] tracking-tight group-hover:text-orange-600 transition-colors">
                          {card.title}
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">
                          {card.subtitle}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-600">
                        Top Exp
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Floating Filter Tabs Bar (Optional) */}
      {showFloatingTabs && (
        <>
          <div className="relative z-30 mx-auto w-full max-w-[1600px] px-3 sm:px-6 lg:px-8 xl:px-12 -mt-7 sm:-mt-8 md:-mt-9">
            <div className="rounded-2xl sm:rounded-[24px] bg-white shadow-2xl shadow-slate-900/15 border border-slate-100 p-1.5 sm:p-2">
              <div className="flex items-center justify-between overflow-x-auto scrollbar-none divide-x divide-slate-100 min-w-[720px] lg:min-w-0">
                {guideCategories.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = currentTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleTabClick(tab.id)}
                      className={`relative flex-1 flex flex-col items-center justify-center py-2.5 sm:py-3.5 px-2 sm:px-3 rounded-xl transition-all duration-200 group text-center cursor-pointer ${
                        isActive
                          ? "bg-orange-50/70 text-[#ff5411] font-bold shadow-sm"
                          : "text-slate-700 hover:text-[#ff5411] hover:bg-slate-50/80 font-medium"
                      }`}
                      title={`Filter by ${tab.label}`}
                    >
                      <div
                        className={`mb-1.5 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center transition-transform duration-200 group-hover:scale-110 ${
                          isActive
                            ? "text-[#ff5411]"
                            : "text-slate-700 group-hover:text-[#ff5411]"
                        }`}
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 stroke-[1.9]" />
                      </div>

                      <span className="text-[11px] sm:text-xs tracking-tight whitespace-nowrap">
                        {tab.label}
                      </span>

                      {isActive && (
                        <span className="absolute bottom-1 left-3 right-3 h-[3px] rounded-full bg-[#ff5411]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Spacer to give room for the floating tab bar overlap */}
          <div className="h-6 sm:h-8 md:h-10 bg-white" />
        </>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-3 sm:p-4 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div className="pt-3 pb-1 px-2 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0d1e38]">
                  {selectedImage.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  {selectedImage.subtitle}
                </p>
              </div>

              <a
                href="#guides-articles"
                onClick={() => setSelectedImage(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 px-3 py-1.5 rounded-xl transition"
              >
                <span>View Articles</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
