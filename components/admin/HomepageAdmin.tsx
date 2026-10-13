"use client";

import React from "react";
import {
  Sparkles,
  MapPin,
  Layers,
  Utensils,
  PhoneCall,
  Plus,
  Trash2,
} from "lucide-react";
import { HomepageData } from "@/lib/cms";
import ImageUploader from "@/components/admin/ImageUploader";

export type HomepageTab =
  | "hero"
  | "destinations"
  | "whyChooseUs"
  | "tasteMangalore"
  | "cta";

interface HomepageAdminProps {
  data: HomepageData;
  onChange: (updated: HomepageData) => void;
  activeTab: HomepageTab;
  onTabChange: (tab: HomepageTab) => void;
}

export default function HomepageAdmin({
  data,
  onChange,
  activeTab,
  onTabChange,
}: HomepageAdminProps) {
  const tabs: { id: HomepageTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "hero", label: "Hero Banner", icon: Sparkles },
    { id: "destinations", label: "Popular Destinations", icon: MapPin },
    { id: "whyChooseUs", label: "Why Choose Us", icon: Layers },
    { id: "tasteMangalore", label: "Taste of Mangalore", icon: Utensils },
    { id: "cta", label: "Tour CTA & Contact", icon: PhoneCall },
  ];

  return (
    <div className="space-y-6">
      {/* Workspace Header & Subtab Bar */}
      <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <span>Homepage Content CMS</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your hero slides, featured destinations, local cuisine highlights, and booking CTA.
          </p>
        </div>

        {/* Sub-tab Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 overflow-x-auto max-w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-orange-600 text-white shadow-sm shadow-orange-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= 1. HERO SECTION FORM ================= */}
      {activeTab === "hero" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Hero Section Settings</h3>
            <p className="text-xs text-slate-400">
              Edit banner headlines, text, action links, and slide background images.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Top Eyebrow Badge
              </label>
              <input
                type="text"
                value={data.hero.badge}
                onChange={(e) =>
                  onChange({
                    ...data,
                    hero: { ...data.hero, badge: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Main Heading (Line 1)
              </label>
              <input
                type="text"
                value={data.hero.titleLine1}
                onChange={(e) =>
                  onChange({
                    ...data,
                    hero: { ...data.hero, titleLine1: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Heading Highlight (Underlined / Colored)
              </label>
              <input
                type="text"
                value={data.hero.titleHighlight}
                onChange={(e) =>
                  onChange({
                    ...data,
                    hero: { ...data.hero, titleHighlight: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Hero Description Paragraph
              </label>
              <textarea
                rows={3}
                value={data.hero.description}
                onChange={(e) =>
                  onChange({
                    ...data,
                    hero: { ...data.hero, description: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={data.hero.ctaText}
                onChange={(e) =>
                  onChange({
                    ...data,
                    hero: { ...data.hero, ctaText: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Button Link
              </label>
              <input
                type="text"
                value={data.hero.ctaLink}
                onChange={(e) =>
                  onChange({
                    ...data,
                    hero: { ...data.hero, ctaLink: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Slides Manager with Device Upload */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-white">Hero Background Slides</h4>
              <button
                type="button"
                onClick={() => {
                  const newSlide = {
                    image: "/kadri.avif",
                    badgeTitle: "New Location",
                    badgeLocation: "Mangalore",
                  };
                  onChange({
                    ...data,
                    hero: {
                      ...data.hero,
                      slides: [...data.hero.slides, newSlide],
                    },
                  });
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-orange-400 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Slide</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.hero.slides.map((slide, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-800/40 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-orange-400">
                      Slide #{idx + 1}
                    </span>
                    {data.hero.slides.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = data.hero.slides.filter((_, i) => i !== idx);
                          onChange({
                            ...data,
                            hero: { ...data.hero, slides: updated },
                          });
                        }}
                        className="text-slate-500 hover:text-red-400 transition cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Place Title
                      </label>
                      <input
                        type="text"
                        value={slide.badgeTitle}
                        onChange={(e) => {
                          const updated = [...data.hero.slides];
                          updated[idx].badgeTitle = e.target.value;
                          onChange({
                            ...data,
                            hero: { ...data.hero, slides: updated },
                          });
                        }}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Location Subtitle
                      </label>
                      <input
                        type="text"
                        value={slide.badgeLocation}
                        onChange={(e) => {
                          const updated = [...data.hero.slides];
                          updated[idx].badgeLocation = e.target.value;
                          onChange({
                            ...data,
                            hero: { ...data.hero, slides: updated },
                          });
                        }}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <ImageUploader
                    label="Slide Image (or Upload from Device)"
                    value={slide.image}
                    onChange={(newUrl) => {
                      const updated = [...data.hero.slides];
                      updated[idx].image = newUrl;
                      onChange({
                        ...data,
                        hero: { ...data.hero, slides: updated },
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. POPULAR DESTINATIONS FORM ================= */}
      {activeTab === "destinations" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              Popular Destinations Section
            </h3>
            <p className="text-xs text-slate-400">
              Edit titles, handwritten script flourish, and destination photo cards with device upload.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Section Tag
              </label>
              <input
                type="text"
                value={data.popularDestinations.tag}
                onChange={(e) =>
                  onChange({
                    ...data,
                    popularDestinations: {
                      ...data.popularDestinations,
                      tag: e.target.value,
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Heading Prefix
              </label>
              <input
                type="text"
                value={data.popularDestinations.title}
                onChange={(e) =>
                  onChange({
                    ...data,
                    popularDestinations: {
                      ...data.popularDestinations,
                      title: e.target.value,
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Heading Highlight
              </label>
              <input
                type="text"
                value={data.popularDestinations.titleHighlight}
                onChange={(e) =>
                  onChange({
                    ...data,
                    popularDestinations: {
                      ...data.popularDestinations,
                      titleHighlight: e.target.value,
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Script Line 1 (Handwritten)
              </label>
              <input
                type="text"
                value={data.popularDestinations.scriptTop}
                onChange={(e) =>
                  onChange({
                    ...data,
                    popularDestinations: {
                      ...data.popularDestinations,
                      scriptTop: e.target.value,
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={data.popularDestinations.description}
                onChange={(e) =>
                  onChange({
                    ...data,
                    popularDestinations: {
                      ...data.popularDestinations,
                      description: e.target.value,
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white"
              />
            </div>
          </div>

          {/* Destinations Cards Manager with Device Upload */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-white">
                Destination Cards ({data.popularDestinations.destinations.length})
              </h4>
              <button
                type="button"
                onClick={() => {
                  const nextNum = (
                    data.popularDestinations.destinations.length + 1
                  )
                    .toString()
                    .padStart(2, "0");
                  const newDest = {
                    id: Date.now().toString(),
                    number: nextNum,
                    name: "New Tourist Spot",
                    location: "Mangalore",
                    image: "/panambur.avif",
                  };
                  onChange({
                    ...data,
                    popularDestinations: {
                      ...data.popularDestinations,
                      destinations: [
                        ...data.popularDestinations.destinations,
                        newDest,
                      ],
                    },
                  });
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-orange-400 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Destination</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.popularDestinations.destinations.map((dest, idx) => (
                <div
                  key={dest.id || idx}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-800/40 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-orange-400">
                      Card #{idx + 1} ({dest.number})
                    </span>
                    {data.popularDestinations.destinations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated =
                            data.popularDestinations.destinations.filter(
                              (_, i) => i !== idx
                            );
                          onChange({
                            ...data,
                            popularDestinations: {
                              ...data.popularDestinations,
                              destinations: updated,
                            },
                          });
                        }}
                        className="text-slate-500 hover:text-red-400 transition cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Place Name
                      </label>
                      <input
                        type="text"
                        value={dest.name}
                        onChange={(e) => {
                          const updated = [
                            ...data.popularDestinations.destinations,
                          ];
                          updated[idx].name = e.target.value;
                          onChange({
                            ...data,
                            popularDestinations: {
                              ...data.popularDestinations,
                              destinations: updated,
                            },
                          });
                        }}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Location Subtitle
                      </label>
                      <input
                        type="text"
                        value={dest.location}
                        onChange={(e) => {
                          const updated = [
                            ...data.popularDestinations.destinations,
                          ];
                          updated[idx].location = e.target.value;
                          onChange({
                            ...data,
                            popularDestinations: {
                              ...data.popularDestinations,
                              destinations: updated,
                            },
                          });
                        }}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <ImageUploader
                    label="Destination Photo"
                    value={dest.image}
                    onChange={(newUrl) => {
                      const updated = [
                        ...data.popularDestinations.destinations,
                      ];
                      updated[idx].image = newUrl;
                      onChange({
                        ...data,
                        popularDestinations: {
                          ...data.popularDestinations,
                          destinations: updated,
                        },
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= 3. WHY CHOOSE US FORM ================= */}
      {activeTab === "whyChooseUs" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              Why Choose Us Points
            </h3>
            <p className="text-xs text-slate-400">
              Manage headline and individual feature cards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Section Tag
              </label>
              <input
                type="text"
                value={data.whyChooseUs.tag}
                onChange={(e) =>
                  onChange({
                    ...data,
                    whyChooseUs: { ...data.whyChooseUs, tag: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={data.whyChooseUs.title}
                onChange={(e) =>
                  onChange({
                    ...data,
                    whyChooseUs: { ...data.whyChooseUs, title: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Section Subtitle
              </label>
              <textarea
                rows={2}
                value={data.whyChooseUs.description}
                onChange={(e) =>
                  onChange({
                    ...data,
                    whyChooseUs: {
                      ...data.whyChooseUs,
                      description: e.target.value,
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-sm font-bold text-white mb-3">
              Feature Cards (4 Value Points)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.whyChooseUs.features.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-800/40 space-y-2.5"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                    Point #{idx + 1}
                  </span>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...data.whyChooseUs.features];
                        updated[idx].title = e.target.value;
                        onChange({
                          ...data,
                          whyChooseUs: {
                            ...data.whyChooseUs,
                            features: updated,
                          },
                        });
                      }}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...data.whyChooseUs.features];
                        updated[idx].description = e.target.value;
                        onChange({
                          ...data,
                          whyChooseUs: {
                            ...data.whyChooseUs,
                            features: updated,
                          },
                        });
                      }}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= 4. TASTE MANGALORE FORM ================= */}
      {activeTab === "tasteMangalore" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              Taste of Mangalore
            </h3>
            <p className="text-xs text-slate-400">
              Edit culinary section copy and upload device photos for each category.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Section Tag
              </label>
              <input
                type="text"
                value={data.tasteMangalore.tag}
                onChange={(e) =>
                  onChange({
                    ...data,
                    tasteMangalore: {
                      ...data.tasteMangalore,
                      tag: e.target.value,
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={data.tasteMangalore.title}
                onChange={(e) =>
                  onChange({
                    ...data,
                    tasteMangalore: {
                      ...data.tasteMangalore,
                      title: e.target.value,
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={data.tasteMangalore.description}
                onChange={(e) =>
                  onChange({
                    ...data,
                    tasteMangalore: {
                      ...data.tasteMangalore,
                      description: e.target.value,
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-sm font-bold text-white mb-3">
              Food Categories & Images
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.tasteMangalore.categories.map((cat, idx) => (
                <div
                  key={cat.id}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-800/40 space-y-3"
                >
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Category Name
                    </label>
                    <input
                      type="text"
                      value={cat.title}
                      onChange={(e) => {
                        const updated = [...data.tasteMangalore.categories];
                        updated[idx].title = e.target.value;
                        onChange({
                          ...data,
                          tasteMangalore: {
                            ...data.tasteMangalore,
                            categories: updated,
                          },
                        });
                      }}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <ImageUploader
                    label="Cuisine Photo"
                    value={cat.image}
                    onChange={(newUrl) => {
                      const updated = [...data.tasteMangalore.categories];
                      updated[idx].image = newUrl;
                      onChange({
                        ...data,
                        tasteMangalore: {
                          ...data.tasteMangalore,
                          categories: updated,
                        },
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= 5. CTA & CONTACT INFO ================= */}
      {activeTab === "cta" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              Call to Action & Contact Banners
            </h3>
            <p className="text-xs text-slate-400">
              Update enquiry phone numbers, email, and booking headlines.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-800/30 space-y-3">
            <h4 className="text-xs font-bold uppercase text-orange-400">
              Plan Trip Banner
            </h4>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Banner Title
              </label>
              <input
                type="text"
                value={data.planTripCTA.title}
                onChange={(e) =>
                  onChange({
                    ...data,
                    planTripCTA: { ...data.planTripCTA, title: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={data.planTripCTA.description}
                onChange={(e) =>
                  onChange({
                    ...data,
                    planTripCTA: {
                      ...data.planTripCTA,
                      description: e.target.value,
                    },
                  })
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Button Label
              </label>
              <input
                type="text"
                value={data.planTripCTA.buttonText}
                onChange={(e) =>
                  onChange({
                    ...data,
                    planTripCTA: {
                      ...data.planTripCTA,
                      buttonText: e.target.value,
                    },
                  })
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm text-white"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-800/30 space-y-3">
            <h4 className="text-xs font-bold uppercase text-orange-400">
              Tour Enquiry Contact Banner
            </h4>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Title
              </label>
              <input
                type="text"
                value={data.tourEnquiryCTA.title}
                onChange={(e) =>
                  onChange({
                    ...data,
                    tourEnquiryCTA: {
                      ...data.tourEnquiryCTA,
                      title: e.target.value,
                    },
                  })
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={data.tourEnquiryCTA.subtitle}
                onChange={(e) =>
                  onChange({
                    ...data,
                    tourEnquiryCTA: {
                      ...data.tourEnquiryCTA,
                      subtitle: e.target.value,
                    },
                  })
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm text-white"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={data.tourEnquiryCTA.phone}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      tourEnquiryCTA: {
                        ...data.tourEnquiryCTA,
                        phone: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Email Address
                </label>
                <input
                  type="text"
                  value={data.tourEnquiryCTA.email}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      tourEnquiryCTA: {
                        ...data.tourEnquiryCTA,
                        email: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
