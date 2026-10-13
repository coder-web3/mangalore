"use client";

import React, { useState } from "react";
import {
  Sparkles,
  MapPin,
  Image as ImageIcon,
  Plus,
  Trash2,
  Layers,
  Star,
  Clock,
  Award,
  Languages,
  Phone,
  MessageCircle,
  ShieldCheck,
  Check,
  User,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { GuidesData, GuideItemData, GuideArticleItem } from "@/lib/cms";
import ImageUploader from "@/components/admin/ImageUploader";
import { BookOpen } from "lucide-react";

interface GuidesAdminProps {
  data: GuidesData;
  onChange: (updated: GuidesData) => void;
  activeSubTab?: "hero" | "guides" | "articles";
  onSubTabChange?: (tab: "hero" | "guides" | "articles") => void;
  onEditBlogDetail?: (slug: string) => void;
}

export default function GuidesAdmin({
  data,
  onChange,
  activeSubTab = "guides",
  onSubTabChange,
  onEditBlogDetail,
}: GuidesAdminProps) {
  const [internalSubTab, setInternalSubTab] = useState<"hero" | "guides" | "articles">("guides");
  const [expandedGuideIndex, setExpandedGuideIndex] = useState<number | null>(0);
  const [expandedArticleIndex, setExpandedArticleIndex] = useState<number | null>(0);

  const subTab = activeSubTab || internalSubTab;
  const setSubTab = (tab: "hero" | "guides" | "articles") => {
    if (onSubTabChange) onSubTabChange(tab);
    setInternalSubTab(tab);
  };

  const updateHero = (field: string, val: any) => {
    onChange({
      ...data,
      listingHero: {
        ...data.listingHero,
        [field]: val,
      },
    });
  };

  const updateStats = (field: string, val: string) => {
    onChange({
      ...data,
      listingHero: {
        ...data.listingHero,
        stats: {
          ...(data.listingHero.stats || {
            guidesCount: "25+",
            toursCompleted: "1,400+",
            rating: "4.95 ★",
            languagesCount: "5 Languages",
          }),
          [field]: val,
        },
      },
    });
  };

  const updatePolaroid = (index: number, field: string, val: string) => {
    const updatedCards = [...data.listingHero.galleryCards];
    updatedCards[index] = {
      ...updatedCards[index],
      [field]: val,
    };
    onChange({
      ...data,
      listingHero: {
        ...data.listingHero,
        galleryCards: updatedCards,
      },
    });
  };

  const updateCatalog = (field: string, val: any) => {
    onChange({
      ...data,
      listingCatalog: {
        ...data.listingCatalog,
        [field]: val,
      },
    });
  };

  const updateGuide = (index: number, field: keyof GuideItemData, val: any) => {
    const updatedGuides = [...data.listingCatalog.guides];
    updatedGuides[index] = {
      ...updatedGuides[index],
      [field]: val,
    };

    // Auto set categoryLabel if category changes
    if (field === "category") {
      const catMap: Record<string, string> = {
        heritage: "Temples & Heritage",
        beaches: "Beaches & Watersports",
        food: "Food & Culinary",
        nature: "Nature & Wildlife",
        culture: "Cultural & Arts",
      };
      if (catMap[val]) {
        updatedGuides[index].categoryLabel = catMap[val];
      }
    }

    onChange({
      ...data,
      listingCatalog: {
        ...data.listingCatalog,
        guides: updatedGuides,
      },
    });
  };

  const addGuide = () => {
    const newId = `guide-${Date.now()}`;
    const newGuide: GuideItemData = {
      id: newId,
      name: "New Local Guide",
      title: "Mangalore Tour Guide",
      category: "heritage",
      categoryLabel: "Temples & Heritage",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80",
      languages: ["Kannada", "Tulu", "English"],
      experienceYears: 5,
      rating: "4.90",
      reviewCount: 25,
      pricePerDay: "₹1,800",
      pricePerHour: "₹350/hr",
      location: "Mangalore, Karnataka",
      badge: "Verified Guide",
      phone: "+91 98765 43210",
      whatsapp: "+919876543210",
      bio: "Passionate local resident guiding visitors through Mangalore's scenic coastal sights, culture and traditions.",
      specialties: ["Local Heritage", "Photo Spots", "Food Stops"],
      available: true,
    };

    onChange({
      ...data,
      listingCatalog: {
        ...data.listingCatalog,
        guides: [newGuide, ...data.listingCatalog.guides],
      },
    });
    setExpandedGuideIndex(0);
  };

  const deleteGuide = (index: number) => {
    if (data.listingCatalog.guides.length <= 1) {
      alert("You must keep at least 1 guide profile.");
      return;
    }
    const guideName = data.listingCatalog.guides[index].name;
    if (confirm(`Are you sure you want to delete guide "${guideName}"?`)) {
      const updated = [...data.listingCatalog.guides];
      updated.splice(index, 1);
      onChange({
        ...data,
        listingCatalog: {
          ...data.listingCatalog,
          guides: updated,
        },
      });
      if (expandedGuideIndex === index) {
        setExpandedGuideIndex(null);
      }
    }
  };

  const updateArticle = (index: number, field: keyof GuideArticleItem, val: any) => {
    const currentArticles = data.articlesSection?.articles || [];
    const updated = [...currentArticles];
    updated[index] = {
      ...updated[index],
      [field]: val,
    };
    onChange({
      ...data,
      articlesSection: {
        ...(data.articlesSection || {
          articles: [],
          categories: [],
          popularPosts: [],
        }),
        articles: updated,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Subtabs Switcher */}
      <div className="flex border-b border-slate-200">
        <button
          type="button"
          onClick={() => setSubTab("articles")}
          className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
            subTab === "articles"
              ? "border-[#ff5e15] text-[#ff5e15]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Travel Articles & Stories ({data.articlesSection?.articles?.length || 6})</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab("guides")}
          className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
            subTab === "guides"
              ? "border-[#ff5e15] text-[#ff5e15]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <User className="h-4 w-4" />
          <span>Local Guides Catalog ({data.listingCatalog.guides.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab("hero")}
          className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
            subTab === "hero"
              ? "border-[#ff5e15] text-[#ff5e15]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Hero Banner & Polaroids</span>
        </button>
      </div>

      {/* SUBTAB 1: HERO BANNER & STATS */}
      {subTab === "hero" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#ff5e15]" />
              <span>Hero Header Banner Configuration</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tag / Badge
                </label>
                <input
                  type="text"
                  value={data.listingHero.badge || ""}
                  onChange={(e) => updateHero("badge", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Title Line 1
                </label>
                <input
                  type="text"
                  value={data.listingHero.titleLine1 || ""}
                  onChange={(e) => updateHero("titleLine1", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Title Highlight (Orange)
                </label>
                <input
                  type="text"
                  value={data.listingHero.titleHighlight || ""}
                  onChange={(e) => updateHero("titleHighlight", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Backdrop Image Path
                </label>
                <ImageUploader
                  currentImage={data.listingHero.backdropImage || "/places-backdrop-clean-right.jpg"}
                  onImageSelected={(url) => updateHero("backdropImage", url)}
                  label="Hero Backdrop Wallpaper"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hero Description
                </label>
                <textarea
                  rows={2}
                  value={data.listingHero.description || ""}
                  onChange={(e) => updateHero("description", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                />
              </div>
            </div>
          </div>

          {/* Quick Metrics / Stats Bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Award className="h-4 w-4 text-[#ff5e15]" />
              <span>Hero Quick Stats Pills</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Guides Count
                </label>
                <input
                  type="text"
                  value={data.listingHero.stats?.guidesCount || "25+"}
                  onChange={(e) => updateStats("guidesCount", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tours Hosted
                </label>
                <input
                  type="text"
                  value={data.listingHero.stats?.toursCompleted || "1,400+"}
                  onChange={(e) => updateStats("toursCompleted", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Average Rating
                </label>
                <input
                  type="text"
                  value={data.listingHero.stats?.rating || "4.95 ★"}
                  onChange={(e) => updateStats("rating", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Languages Spoken
                </label>
                <input
                  type="text"
                  value={data.listingHero.stats?.languagesCount || "5 Languages"}
                  onChange={(e) => updateStats("languagesCount", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                />
              </div>
            </div>
          </div>

          {/* Polaroid Cards */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-[#ff5e15]" />
              <span>Right Polaroid Showcase Cards (2 cards)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {data.listingHero.galleryCards.map((card, i) => (
                <div
                  key={card.id || i}
                  className="rounded-xl border border-slate-200 p-4 space-y-3 bg-slate-50/50"
                >
                  <div className="font-bold text-xs text-slate-700">
                    Polaroid #{i + 1}
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => updatePolaroid(i, "title", e.target.value)}
                      className="w-full rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={card.subtitle}
                      onChange={(e) => updatePolaroid(i, "subtitle", e.target.value)}
                      className="w-full rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Card Photo
                    </label>
                    <ImageUploader
                      currentImage={card.image}
                      onImageSelected={(url) => updatePolaroid(i, "image", url)}
                      label={`Polaroid #${i + 1} Photo`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: GUIDES CATALOG */}
      {subTab === "guides" && (
        <div className="space-y-6">
          {/* Catalog Header Meta */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#ff5e15]" />
              <span>Section Heading & Tagline</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tag
                </label>
                <input
                  type="text"
                  value={data.listingCatalog.tag}
                  onChange={(e) => updateCatalog("tag", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={data.listingCatalog.title}
                  onChange={(e) => updateCatalog("title", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Title Highlight (Orange)
                </label>
                <input
                  type="text"
                  value={data.listingCatalog.titleHighlight}
                  onChange={(e) => updateCatalog("titleHighlight", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={data.listingCatalog.description}
                  onChange={(e) => updateCatalog("description", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                />
              </div>
            </div>
          </div>

          {/* Guide Cards Manager Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <User className="h-5 w-5 text-[#ff5e15]" />
              <span>Guide Profiles ({data.listingCatalog.guides.length})</span>
            </h3>

            <button
              type="button"
              onClick={addGuide}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#ff5e15] px-4 py-2 text-xs font-bold text-white shadow-md shadow-orange-950/20 hover:bg-[#ea4908] transition"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Guide</span>
            </button>
          </div>

          {/* Guide Profiles Accordion List */}
          <div className="space-y-4">
            {data.listingCatalog.guides.map((guide, index) => {
              const isExpanded = expandedGuideIndex === index;

              return (
                <div
                  key={guide.id || index}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all"
                >
                  {/* Summary Header */}
                  <div
                    onClick={() => setExpandedGuideIndex(isExpanded ? null : index)}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors select-none"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={guide.image}
                          alt={guide.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">
                            {guide.name}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-[#ff5e15]">
                            {guide.badge || guide.categoryLabel}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {guide.title} • {guide.pricePerDay} • {guide.rating} ★
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteGuide(index);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                        title="Delete guide"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="p-1 text-slate-400">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Form Fields */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 border-t border-slate-200 bg-slate-50/50 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Guide Full Name
                          </label>
                          <input
                            type="text"
                            value={guide.name}
                            onChange={(e) => updateGuide(index, "name", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Professional Title / Role
                          </label>
                          <input
                            type="text"
                            value={guide.title}
                            onChange={(e) => updateGuide(index, "title", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Category / Specialization
                          </label>
                          <select
                            value={guide.category}
                            onChange={(e) => updateGuide(index, "category", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          >
                            <option value="heritage">Temples & Heritage</option>
                            <option value="food">Food & Culinary</option>
                            <option value="beaches">Beaches & Watersports</option>
                            <option value="nature">Nature & Wildlife</option>
                            <option value="culture">Cultural & Arts</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Badge Label
                          </label>
                          <input
                            type="text"
                            value={guide.badge}
                            onChange={(e) => updateGuide(index, "badge", e.target.value)}
                            placeholder="e.g. Master Historian"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Day Tour Rate
                          </label>
                          <input
                            type="text"
                            value={guide.pricePerDay}
                            onChange={(e) => updateGuide(index, "pricePerDay", e.target.value)}
                            placeholder="e.g. ₹1,800"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Hourly Rate (optional)
                          </label>
                          <input
                            type="text"
                            value={guide.pricePerHour || ""}
                            onChange={(e) => updateGuide(index, "pricePerHour", e.target.value)}
                            placeholder="e.g. ₹350/hr"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Years of Experience
                          </label>
                          <input
                            type="number"
                            value={guide.experienceYears}
                            onChange={(e) =>
                              updateGuide(index, "experienceYears", parseInt(e.target.value) || 1)
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Rating Score
                          </label>
                          <input
                            type="text"
                            value={guide.rating}
                            onChange={(e) => updateGuide(index, "rating", e.target.value)}
                            placeholder="e.g. 4.95"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Total Reviews Count
                          </label>
                          <input
                            type="number"
                            value={guide.reviewCount}
                            onChange={(e) =>
                              updateGuide(index, "reviewCount", parseInt(e.target.value) || 0)
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Location Expertise
                          </label>
                          <input
                            type="text"
                            value={guide.location}
                            onChange={(e) => updateGuide(index, "location", e.target.value)}
                            placeholder="e.g. Kadri, Kudroli & Car Street"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            value={guide.phone}
                            onChange={(e) => updateGuide(index, "phone", e.target.value)}
                            placeholder="+91 98451 23456"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            WhatsApp Number
                          </label>
                          <input
                            type="text"
                            value={guide.whatsapp || ""}
                            onChange={(e) => updateGuide(index, "whatsapp", e.target.value)}
                            placeholder="+919845123456"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>

                        <div className="sm:col-span-2 lg:col-span-3">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Languages Spoken (comma-separated)
                          </label>
                          <input
                            type="text"
                            value={guide.languages.join(", ")}
                            onChange={(e) =>
                              updateGuide(
                                index,
                                "languages",
                                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                              )
                            }
                            placeholder="Kannada, Tulu, English, Hindi"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>

                        <div className="sm:col-span-2 lg:col-span-3">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Guide Photo
                          </label>
                          <ImageUploader
                            currentImage={guide.image}
                            onImageSelected={(url) => updateGuide(index, "image", url)}
                            label={`${guide.name} Portrait Photo`}
                          />
                        </div>

                        <div className="sm:col-span-2 lg:col-span-3">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Guide Bio / Story
                          </label>
                          <textarea
                            rows={3}
                            value={guide.bio}
                            onChange={(e) => updateGuide(index, "bio", e.target.value)}
                            placeholder="Share an engaging 2-3 sentence biography of this local expert..."
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>

                        <div className="sm:col-span-2 lg:col-span-3">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Key Specialties (comma-separated)
                          </label>
                          <input
                            type="text"
                            value={guide.specialties.join(", ")}
                            onChange={(e) =>
                              updateGuide(
                                index,
                                "specialties",
                                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                              )
                            }
                            placeholder="Kadri Temple Chronicles, Ghee Roast Trails, Estuary Kayaking"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 3: TRAVEL ARTICLES & STORIES */}
      {subTab === "articles" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#ff5e15]" />
              <span>Travel Articles & Local Guides Stories</span>
            </h3>
            <p className="text-xs text-slate-500">
              Manage the 6 featured travel guides and stories displayed in the 2-column catalog section on /local-guides.
            </p>
          </div>

          {/* Articles Accordion List */}
          <div className="space-y-4">
            {(data.articlesSection?.articles || []).map((article, index) => {
              const isExpanded = expandedArticleIndex === index;

              return (
                <div
                  key={article.id || index}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all"
                >
                  <div
                    onClick={() => setExpandedArticleIndex(isExpanded ? null : index)}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors select-none"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-12 w-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">
                            {article.title}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-[#ff5e15]">
                            {article.categoryLabel}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {article.date} • {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-1 text-slate-400">
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-5 sm:p-6 border-t border-slate-200 bg-slate-50/50 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Article Title
                          </label>
                          <input
                            type="text"
                            value={article.title}
                            onChange={(e) => updateArticle(index, "title", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Category
                          </label>
                          <select
                            value={article.category}
                            onChange={(e) => {
                              const val = e.target.value;
                              const catMap: Record<string, string> = {
                                beaches: "Beaches",
                                food: "Food",
                                temples: "Temples",
                                tips: "Travel Tips",
                                culture: "Culture",
                                festivals: "Festivals",
                                nature: "Nature",
                              };
                              updateArticle(index, "category", val);
                              if (catMap[val]) {
                                updateArticle(index, "categoryLabel", catMap[val]);
                              }
                            }}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          >
                            <option value="beaches">Beaches</option>
                            <option value="food">Food</option>
                            <option value="temples">Temples</option>
                            <option value="tips">Travel Tips</option>
                            <option value="culture">Culture</option>
                            <option value="festivals">Festivals</option>
                            <option value="nature">Nature</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Published Date
                          </label>
                          <input
                            type="text"
                            value={article.date}
                            onChange={(e) => updateArticle(index, "date", e.target.value)}
                            placeholder="e.g. October 12, 2025"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Target Read Link
                          </label>
                          <input
                            type="text"
                            value={article.readLink || ""}
                            onChange={(e) => updateArticle(index, "readLink", e.target.value)}
                            placeholder="/places-to-visit/panambur-beach"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>

                        <div className="sm:col-span-2 lg:col-span-3">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Article Image
                          </label>
                          <ImageUploader
                            currentImage={article.image}
                            onImageSelected={(url) => updateArticle(index, "image", url)}
                            label={`${article.title} Image`}
                          />
                        </div>

                        <div className="sm:col-span-2 lg:col-span-3">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Summary / Excerpt
                          </label>
                          <textarea
                            rows={2}
                            value={article.excerpt}
                            onChange={(e) => updateArticle(index, "excerpt", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>

                        <div className="sm:col-span-2 lg:col-span-3 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
                          <span className="text-[11px] font-mono text-slate-500">
                            Live URL: /blog/{article.slug || article.id}
                          </span>

                          <div className="flex items-center gap-3">
                            <a
                              href={`/blog/${article.slug || article.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#ff5e15] hover:underline"
                            >
                              <span>Open Public Page</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>

                            {onEditBlogDetail && (
                              <button
                                type="button"
                                onClick={() =>
                                  onEditBlogDetail(article.slug || article.id)
                                }
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ff5e15] text-white text-xs font-bold hover:bg-[#ea4908] transition shadow-xs cursor-pointer"
                              >
                                <span>Edit Full Blog Post</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
