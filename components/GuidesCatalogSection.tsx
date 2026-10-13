"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Star,
  MapPin,
  CheckCircle2,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  Languages,
  Award,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  X,
  Send,
  UserCheck,
  Compass,
} from "lucide-react";
import { GuideItemData, GuidesListingCatalogData } from "@/lib/cms";
import { guideCategories } from "@/components/GuidesHeroSection";

interface GuidesCatalogSectionProps {
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
  guidesList?: GuideItemData[];
  catalogHeader?: GuidesListingCatalogData;
}

const languagesList = [
  "All Languages",
  "Tulu",
  "Kannada",
  "English",
  "Hindi",
  "Konkani",
  "Sanskrit",
];

export default function GuidesCatalogSection({
  selectedCategory = "all",
  onSelectCategory,
  guidesList = [],
  catalogHeader,
}: GuidesCatalogSectionProps) {
  const [internalCategory, setInternalCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages");
  const [activeGuideForModal, setActiveGuideForModal] = useState<GuideItemData | null>(null);

  // Form states for booking enquiry modal
  const [tourDate, setTourDate] = useState("");
  const [travelerCount, setTravelerCount] = useState("2");
  const [userNote, setUserNote] = useState("");

  const activeCategory = onSelectCategory ? selectedCategory : internalCategory;
  const setActiveCategory = onSelectCategory || setInternalCategory;

  const filteredGuides = guidesList.filter((guide) => {
    // 1. Category Filter
    const matchesCategory =
      activeCategory === "all" || guide.category === activeCategory;

    // 2. Language Filter
    const matchesLanguage =
      selectedLanguage === "All Languages" ||
      guide.languages.some(
        (l) => l.toLowerCase() === selectedLanguage.toLowerCase()
      );

    // 3. Search Query
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      guide.name.toLowerCase().includes(query) ||
      guide.title.toLowerCase().includes(query) ||
      guide.location.toLowerCase().includes(query) ||
      guide.languages.some((l) => l.toLowerCase().includes(query)) ||
      guide.specialties.some((s) => s.toLowerCase().includes(query)) ||
      guide.bio.toLowerCase().includes(query);

    return matchesCategory && matchesLanguage && matchesSearch;
  });

  const getCategoryCount = (catId: string) => {
    if (catId === "all") return guidesList.length;
    return guidesList.filter((g) => g.category === catId).length;
  };

  const handleOpenWhatsApp = (guide: GuideItemData) => {
    const rawPhone = (guide.whatsapp || guide.phone || "919876543210").replace(/[^0-9]/g, "");
    let text = `Hello ${guide.name}, I found your profile on Mangalore Tours. I would like to enquire about booking a guided tour with you.`;
    if (tourDate) {
      text += ` Planned Date: ${tourDate}.`;
    }
    if (travelerCount) {
      text += ` Group Size: ${travelerCount} people.`;
    }
    if (userNote) {
      text += ` Notes: ${userNote}`;
    }
    const url = `https://wa.me/${rawPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setActiveGuideForModal(null);
  };

  return (
    <section
      id="guides-catalog"
      className="relative w-full bg-[#f8fbff] py-10 sm:py-14 lg:py-16 overflow-hidden scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[2px] w-6 bg-[#ff5e15]" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#ff5e15] uppercase">
              {catalogHeader?.tag || "MEET OUR VERIFIED NATIVES"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0d1e38] leading-tight mb-2.5">
            {catalogHeader?.title || "Certified Mangalore"}{" "}
            <span className="text-[#ff5e15]">
              {catalogHeader?.titleHighlight || "Tour & Experience Guides"}
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-normal">
            {catalogHeader?.description ||
              "Choose from certified local historians, coastal watersports skippers, food trail creators and naturalist guides. Every guide is background verified with transparent rates and direct WhatsApp booking."}
          </p>
        </div>

        {/* Language Filter Chips Bar */}
        <div className="mb-8 flex flex-wrap items-center gap-2 pt-1 pb-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Languages className="h-3.5 w-3.5 text-[#ff5e15]" /> Language:
          </span>
          {languagesList.map((lang) => {
            const isSelected = selectedLanguage === lang;
            return (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#ff5e15] text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>

        {/* 2-Column Layout: Left Cards (8 cols) & Right Filter Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* LEFT GUIDES CATALOG CARDS */}
          <div className="lg:col-span-8 xl:col-span-8.5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
              {filteredGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="group relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 shadow-md shadow-slate-900/5 hover:shadow-2xl hover:shadow-slate-900/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Top Header Card Info */}
                  <div>
                    {/* Headshot Photo & Badges */}
                    <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-900">
                      <Image
                        src={guide.image}
                        alt={guide.name}
                        fill
                        unoptimized
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Gradient Dark Shield */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                      {/* Top Left Badge */}
                      <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 shadow-md border border-white/80">
                        <Award className="h-3.5 w-3.5 text-[#ff5e15]" />
                        <span className="text-[11px] font-bold text-slate-800">
                          {guide.badge || "Verified Guide"}
                        </span>
                      </div>

                      {/* Top Right Rating Pill */}
                      <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-md px-2.5 py-1 text-white text-xs font-bold border border-white/20">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span>{guide.rating}</span>
                        <span className="text-white/70 text-[10px]">
                          ({guide.reviewCount})
                        </span>
                      </div>

                      {/* Bottom Image Overlay Details: Name & Title */}
                      <div className="absolute inset-x-0 bottom-0 p-4 z-10 text-white">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-white drop-shadow">
                            {guide.name}
                          </h3>
                          <span
                            title="Identity & Police Verified Local Guide"
                            className="inline-flex items-center text-cyan-400"
                          >
                            <ShieldCheck className="h-4 w-4 fill-cyan-400/20" />
                          </span>
                        </div>

                        <p className="text-xs text-white/90 line-clamp-1 font-medium mt-0.5">
                          {guide.title}
                        </p>
                      </div>
                    </div>

                    {/* Middle Details Body */}
                    <div className="p-5 space-y-3.5">
                      {/* Location & Experience Row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-1 text-slate-700 font-medium">
                          <MapPin className="h-3.5 w-3.5 text-[#ff5e15] shrink-0" />
                          <span className="line-clamp-1">{guide.location}</span>
                        </div>

                        <div className="flex items-center gap-1 font-semibold text-slate-700 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">
                          <Clock className="h-3 w-3 text-[#ff5e15]" />
                          <span>{guide.experienceYears} Yrs Exp</span>
                        </div>
                      </div>

                      {/* Languages Spoken Chips */}
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                          <Languages className="h-3 w-3 text-slate-400" /> Spoken Languages
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {guide.languages.map((lang) => (
                            <span
                              key={lang}
                              className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-orange-50 text-[#ff5e15] border border-orange-100"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Guide Biography */}
                      <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">
                        {guide.bio}
                      </p>

                      {/* Specialties Tags */}
                      {guide.specialties && guide.specialties.length > 0 && (
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                            <Sparkles className="h-3 w-3 text-amber-500" /> Key Expertise
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {guide.specialties.slice(0, 3).map((spec, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700"
                              >
                                {spec}
                              </span>
                            ))}
                            {guide.specialties.length > 3 && (
                              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
                                +{guide.specialties.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Footer Action Bar */}
                  <div className="p-4 sm:p-5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
                    {/* Rate Display */}
                    <div>
                      <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                        Day Tour Rate
                      </div>
                      <div className="text-base sm:text-lg font-extrabold text-[#0d1e38]">
                        {guide.pricePerDay}
                        <span className="text-xs font-medium text-slate-500"> /day</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenWhatsApp(guide)}
                        className="p-2 sm:p-2.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition shadow-sm hover:scale-105"
                        title="Chat directly on WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveGuideForModal(guide)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#ff5e15] px-3.5 sm:px-4 py-2 text-xs font-bold text-white shadow-md shadow-orange-950/20 hover:bg-[#ea4908] transition hover:-translate-y-0.5"
                      >
                        <span>Book Guide</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredGuides.length === 0 && (
              <div className="p-12 text-center rounded-3xl bg-white border border-slate-200">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-[#ff5e15]">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800">
                  No local guides match your criteria
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Try clearing your search query or selecting another language.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSelectedLanguage("All Languages");
                    setSearchQuery("");
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#ff5e15] px-4 py-2 text-xs font-bold text-white hover:bg-[#ea4908] transition"
                >
                  View All Guides
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR (SEARCH, CATEGORIES, BENEFITS) */}
          <div className="lg:col-span-4 xl:col-span-3.5 space-y-6">
            {/* Search Box */}
            <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-md shadow-slate-900/5 border border-slate-200/90">
              <h3 className="text-sm font-bold text-[#0d1e38] uppercase tracking-wider mb-3">
                Search Local Guides
              </h3>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Guide name, Kadri, Tulu, surf..."
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#ff5e15] focus:ring-2 focus:ring-orange-500/20"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Sidebar List */}
            <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-md shadow-slate-900/5 border border-slate-200/90">
              <h3 className="text-sm font-bold text-[#0d1e38] uppercase tracking-wider mb-4">
                Guide Specialization
              </h3>

              <div className="space-y-1.5">
                {guideCategories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  const count = getCategoryCount(cat.id);

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? "bg-orange-50 text-[#ff5e15] font-bold border border-orange-200 shadow-sm"
                          : "text-slate-700 hover:bg-slate-50 hover:text-[#ff5e15]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{cat.label}</span>
                      </div>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? "bg-[#ff5e15] text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Benefits of Booking a Local Native Box */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0d1e38] to-[#122849] p-5 sm:p-6 text-white shadow-xl shadow-slate-900/15">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-5 w-5 text-[#ff5e15]" />
                <h4 className="text-sm font-bold tracking-tight">
                  Why Book With Our Guides?
                </h4>
              </div>

              <ul className="space-y-3 text-xs text-white/85">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e15] mt-1.5 shrink-0" />
                  <span>
                    <strong>100% Native Locals:</strong> Born and raised in Mangalore with authentic cultural stories.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e15] mt-1.5 shrink-0" />
                  <span>
                    <strong>Multi-Lingual Ease:</strong> Seamless communication in Tulu, Kannada, English & Hindi.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e15] mt-1.5 shrink-0" />
                  <span>
                    <strong>Background Verified:</strong> Government ID and police verification checked for high safety.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e15] mt-1.5 shrink-0" />
                  <span>
                    <strong>Transparent Fixed Rates:</strong> Direct hourly or full-day rates with no hidden middleman fees.
                  </span>
                </li>
              </ul>
            </div>

            {/* Become a Guide Callout */}
            <div className="rounded-3xl bg-orange-50/80 border border-orange-200/80 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-2 text-[#ff5e15]">
                <UserCheck className="h-5 w-5" />
                <h4 className="text-sm font-bold text-[#0d1e38]">
                  Are You a Local Guide?
                </h4>
              </div>
              <p className="text-xs text-slate-600 mb-3.5 leading-relaxed">
                Join our certified directory and connect with travelers visiting Mangalore from around the world.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff5e15] hover:underline"
              >
                <span>Register as a Guide</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Booking Enquiry Modal */}
      {activeGuideForModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setActiveGuideForModal(null)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveGuideForModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header with Guide Snapshot */}
            <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-100">
              <div className="relative h-14 w-14 rounded-2xl overflow-hidden bg-slate-900 shrink-0">
                <Image
                  src={activeGuideForModal.image}
                  alt={activeGuideForModal.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff5e15]">
                  BOOK LOCAL GUIDE
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#0d1e38]">
                  {activeGuideForModal.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {activeGuideForModal.pricePerDay} / day • {activeGuideForModal.rating} ★ Rating
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Preferred Tour Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="date"
                    value={tourDate}
                    onChange={(e) => setTourDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Number of Travelers
                </label>
                <select
                  value={travelerCount}
                  onChange={(e) => setTravelerCount(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                >
                  <option value="1">Solo Traveler (1 person)</option>
                  <option value="2">Couple (2 people)</option>
                  <option value="3-5">Small Family / Friends (3 - 5 people)</option>
                  <option value="6-10">Group Tour (6 - 10 people)</option>
                  <option value="10+">Large Group (10+ people)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Special Interests / Places to Visit
                </label>
                <textarea
                  rows={3}
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  placeholder="e.g. Kadri temple heritage walk, sunset photos, local street food lunch..."
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => handleOpenWhatsApp(activeGuideForModal)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-4 py-3 font-bold text-white shadow-md transition"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Send Enquiry via WhatsApp</span>
                </button>

                <a
                  href={`tel:${(activeGuideForModal.phone || "").replace(/[^0-9+]/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-3 font-bold text-slate-700 transition"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Directly</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
