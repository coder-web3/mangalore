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
  Camera,
  Landmark,
  Flame,
  Compass,
  Calendar,
  ExternalLink,
  Video,
} from "lucide-react";
import {
  HomepageData,
  GalleryItemData,
  ArtAndHistoryItemData,
  EventCategoryItemData,
  ExploreMoreQuickLinkData,
} from "@/lib/cms";
import ImageUploader from "@/components/admin/ImageUploader";
import VideoUploader from "@/components/admin/VideoUploader";

export type HomepageTab =
  | "hero"
  | "destinations"
  | "whyChooseUs"
  | "tasteMangalore"
  | "planTripCTA"
  | "gallery"
  | "tourEnquiryCTA"
  | "artAndHistory"
  | "events"
  | "exploreMore"
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
    { id: "destinations", label: "Destinations", icon: MapPin },
    { id: "whyChooseUs", label: "Why Choose Us", icon: Layers },
    { id: "tasteMangalore", label: "Taste Cuisine", icon: Utensils },
    { id: "planTripCTA", label: "Plan Trip Banner", icon: Calendar },
    { id: "gallery", label: "Pictures Gallery", icon: Camera },
    { id: "tourEnquiryCTA", label: "Tour Enquiry", icon: PhoneCall },
    { id: "artAndHistory", label: "Art & History", icon: Landmark },
    { id: "events", label: "Events & Fests", icon: Flame },
    { id: "exploreMore", label: "Explore More", icon: Compass },
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

          {/* Hero Video Upload & Settings */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Video className="h-4 w-4 text-orange-400" />
                <span>Hero "Watch Video" Modal Settings</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload a video file from your device (MP4, WebM, MOV) or paste a YouTube / Vimeo embed URL for the homepage hero "Watch Video" button.
              </p>
            </div>

            <VideoUploader
              label="Hero Promotional Video (Device Upload or YouTube / Embed Link)"
              value={data.hero.videoUrl || ""}
              onChange={(newUrl) =>
                onChange({
                  ...data,
                  hero: { ...data.hero, videoUrl: newUrl },
                })
              }
              aspectHint="Supports MP4, WebM, MOV video files (up to 100MB) or paste any YouTube / Vimeo URL."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Video Modal Title
                </label>
                <input
                  type="text"
                  value={data.hero.videoTitle ?? "A Glimpse of Mangalore"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      hero: { ...data.hero, videoTitle: e.target.value },
                    })
                  }
                  placeholder="A Glimpse of Mangalore"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Video Modal Subtitle / Caption
                </label>
                <input
                  type="text"
                  value={
                    data.hero.videoSubtitle ??
                    "Coastal beaches, lighthouses, temple heritage & vibrant food culture"
                  }
                  onChange={(e) =>
                    onChange({
                      ...data,
                      hero: { ...data.hero, videoSubtitle: e.target.value },
                    })
                  }
                  placeholder="Coastal beaches, lighthouses, temple heritage & vibrant food culture"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>
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

      {/* ================= 5. PLAN TRIP BANNER ================= */}
      {(activeTab === "planTripCTA" || activeTab === "cta") && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              Plan Trip Banner Settings
            </h3>
            <p className="text-xs text-slate-400">
              Customize the itinerary planning invitation banner, title, background photo, and CTA button.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Eyebrow Tag
                </label>
                <input
                  type="text"
                  value={data.planTripCTA.tag || "PLAN YOUR TRIP"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      planTripCTA: { ...data.planTripCTA, tag: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
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
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description Text
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
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
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
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Button Target Link
                </label>
                <input
                  type="text"
                  value={data.planTripCTA.buttonLink}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      planTripCTA: {
                        ...data.planTripCTA,
                        buttonLink: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <ImageUploader
                label="Banner Background Image (Lighthouse Sunset Coast)"
                value={data.planTripCTA.backdropImage || "/nitk.avif"}
                onChange={(newUrl) =>
                  onChange({
                    ...data,
                    planTripCTA: {
                      ...data.planTripCTA,
                      backdropImage: newUrl,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= 6. PICTURES GALLERY ================= */}
      {activeTab === "gallery" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Mangalore in Pictures Gallery
              </h3>
              <p className="text-xs text-slate-400">
                Manage the photo carousel, category tags, captions, and device photo uploads.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newItem: GalleryItemData = {
                  id: Date.now().toString(),
                  title: "New Mangalore Moment",
                  category: "beaches",
                  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
                };
                onChange({
                  ...data,
                  gallery: {
                    ...data.gallery,
                    items: [...(data.gallery?.items || []), newItem],
                  },
                });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white transition self-start cursor-pointer shadow-sm shadow-orange-600/30"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Gallery Photo</span>
            </button>
          </div>

          {/* Section Header Settings */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
            <h4 className="text-xs font-bold uppercase text-orange-400">
              Section Header &amp; Description
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Eyebrow Tag
                </label>
                <input
                  type="text"
                  value={data.gallery?.tag || "GALLERY"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      gallery: { ...data.gallery, tag: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Main Title
                </label>
                <input
                  type="text"
                  value={data.gallery?.title || "Mangalore in"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      gallery: { ...data.gallery, title: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Title Highlight
                </label>
                <input
                  type="text"
                  value={data.gallery?.titleHighlight || "Pictures"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      gallery: { ...data.gallery, titleHighlight: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Subtitle Description
                </label>
                <textarea
                  rows={2}
                  value={data.gallery?.description || ""}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      gallery: { ...data.gallery, description: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Gallery Items Grid */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase text-slate-400">
              Gallery Photos List ({data.gallery?.items?.length || 0} items)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(data.gallery?.items || []).map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-orange-400">
                      Photo #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.gallery.items.filter((_, i) => i !== idx);
                        onChange({
                          ...data,
                          gallery: { ...data.gallery, items: updated },
                        });
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
                      title="Delete photo"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Photo Caption / Title
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...data.gallery.items];
                        updated[idx].title = e.target.value;
                        onChange({
                          ...data,
                          gallery: { ...data.gallery, items: updated },
                        });
                      }}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Filter Category
                    </label>
                    <select
                      value={item.category}
                      onChange={(e) => {
                        const updated = [...data.gallery.items];
                        updated[idx].category = e.target.value;
                        onChange({
                          ...data,
                          gallery: { ...data.gallery, items: updated },
                        });
                      }}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                    >
                      <option value="beaches">Beaches</option>
                      <option value="temples">Temples</option>
                      <option value="nature">Nature</option>
                      <option value="food">Food</option>
                      <option value="culture">Culture</option>
                      <option value="city">City Life</option>
                    </select>
                  </div>

                  <ImageUploader
                    label="Photo Image"
                    value={item.image}
                    onChange={(newUrl) => {
                      const updated = [...data.gallery.items];
                      updated[idx].image = newUrl;
                      onChange({
                        ...data,
                        gallery: { ...data.gallery, items: updated },
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= 7. TOUR ENQUIRY BANNER ================= */}
      {(activeTab === "tourEnquiryCTA" || activeTab === "cta") && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              Tour Enquiry Banner Settings
            </h3>
            <p className="text-xs text-slate-400">
              Update customer enquiry headlines, travel guidance steps, phone, email, and action link.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
            <h4 className="text-xs font-bold uppercase text-orange-400">
              Enquiry Banner Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Eyebrow Tag
                </label>
                <input
                  type="text"
                  value={data.tourEnquiryCTA.tag || "TOUR ENQUIRY"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      tourEnquiryCTA: {
                        ...data.tourEnquiryCTA,
                        tag: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Main Headline
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
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Subtitle Description
                </label>
                <textarea
                  rows={2}
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
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={data.tourEnquiryCTA.buttonText || "Send Enquiry"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      tourEnquiryCTA: {
                        ...data.tourEnquiryCTA,
                        buttonText: e.target.value,
                      },
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
                  value={data.tourEnquiryCTA.buttonLink || "/contact"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      tourEnquiryCTA: {
                        ...data.tourEnquiryCTA,
                        buttonLink: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Support Phone Number
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
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Support Email Address
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
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <ImageUploader
                label="Banner Twilight Lighthouse Background"
                value={data.tourEnquiryCTA.backdropImage || "/nitk.avif"}
                onChange={(newUrl) =>
                  onChange({
                    ...data,
                    tourEnquiryCTA: {
                      ...data.tourEnquiryCTA,
                      backdropImage: newUrl,
                    },
                  })
                }
              />
            </div>
          </div>

          {/* 3 Step Pillars */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase text-slate-400">
              Enquiry Process Steps (Right Side Pillars)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(data.tourEnquiryCTA.steps || []).map((step, idx) => (
                <div
                  key={step.id || idx}
                  className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3"
                >
                  <span className="text-xs font-bold text-orange-400">
                    Step {idx + 1}
                  </span>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const updated = [...(data.tourEnquiryCTA.steps || [])];
                        updated[idx].title = e.target.value;
                        onChange({
                          ...data,
                          tourEnquiryCTA: {
                            ...data.tourEnquiryCTA,
                            steps: updated,
                          },
                        });
                      }}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={step.subtitle}
                      onChange={(e) => {
                        const updated = [...(data.tourEnquiryCTA.steps || [])];
                        updated[idx].subtitle = e.target.value;
                        onChange({
                          ...data,
                          tourEnquiryCTA: {
                            ...data.tourEnquiryCTA,
                            steps: updated,
                          },
                        });
                      }}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Icon
                    </label>
                    <select
                      value={step.iconName}
                      onChange={(e) => {
                        const updated = [...(data.tourEnquiryCTA.steps || [])];
                        updated[idx].iconName = e.target.value;
                        onChange({
                          ...data,
                          tourEnquiryCTA: {
                            ...data.tourEnquiryCTA,
                            steps: updated,
                          },
                        });
                      }}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                    >
                      <option value="briefcase">Briefcase (Tour)</option>
                      <option value="calendar">Calendar (Dates)</option>
                      <option value="headphones">Headphones (Expert Help)</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= 8. ART & HISTORY ================= */}
      {activeTab === "artAndHistory" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Art, Heritage &amp; History
              </h3>
              <p className="text-xs text-slate-400">
                Manage cultural heritage showcases, landmarks, forts, and historic monuments.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newCard: ArtAndHistoryItemData = {
                  id: Date.now().toString(),
                  title: "New Heritage Spot",
                  iconName: "landmark",
                  image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
                  link: "/places-to-visit",
                };
                onChange({
                  ...data,
                  artAndHistory: {
                    ...data.artAndHistory,
                    items: [...(data.artAndHistory?.items || []), newCard],
                  },
                });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white transition self-start cursor-pointer shadow-sm shadow-orange-600/30"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Heritage Card</span>
            </button>
          </div>

          {/* Section Header Settings */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
            <h4 className="text-xs font-bold uppercase text-orange-400">
              Section Header &amp; Action Link
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Eyebrow Tag
                </label>
                <input
                  type="text"
                  value={data.artAndHistory?.tag || "ART & HISTORY"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      artAndHistory: { ...data.artAndHistory, tag: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Main Title Line
                </label>
                <input
                  type="text"
                  value={data.artAndHistory?.titleLine1 || "Mangalore's"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      artAndHistory: { ...data.artAndHistory, titleLine1: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Title Highlight
                </label>
                <input
                  type="text"
                  value={data.artAndHistory?.titleHighlight || "Art, Heritage and History"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      artAndHistory: { ...data.artAndHistory, titleHighlight: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description Paragraph
                </label>
                <textarea
                  rows={2}
                  value={data.artAndHistory?.description || ""}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      artAndHistory: { ...data.artAndHistory, description: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  View All Button Label
                </label>
                <input
                  type="text"
                  value={data.artAndHistory?.viewAllText || "View All"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      artAndHistory: { ...data.artAndHistory, viewAllText: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  View All Target Link
                </label>
                <input
                  type="text"
                  value={data.artAndHistory?.viewAllLink || "/places-to-visit"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      artAndHistory: { ...data.artAndHistory, viewAllLink: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase text-slate-400">
              Heritage Cards ({data.artAndHistory?.items?.length || 0} cards)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(data.artAndHistory?.items || []).map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-orange-400">
                      Card #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.artAndHistory.items.filter((_, i) => i !== idx);
                        onChange({
                          ...data,
                          artAndHistory: { ...data.artAndHistory, items: updated },
                        });
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
                      title="Delete card"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Card Title
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...data.artAndHistory.items];
                        updated[idx].title = e.target.value;
                        onChange({
                          ...data,
                          artAndHistory: { ...data.artAndHistory, items: updated },
                        });
                      }}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Icon
                    </label>
                    <select
                      value={item.iconName}
                      onChange={(e) => {
                        const updated = [...data.artAndHistory.items];
                        updated[idx].iconName = e.target.value;
                        onChange({
                          ...data,
                          artAndHistory: { ...data.artAndHistory, items: updated },
                        });
                      }}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                    >
                      <option value="landmark">Landmark / Pillar</option>
                      <option value="palette">Palette (Art & Culture)</option>
                      <option value="shield">Shield (Forts & History)</option>
                      <option value="church">Church / Sacred Architecture</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Link Destination
                    </label>
                    <input
                      type="text"
                      value={item.link || "/places-to-visit"}
                      onChange={(e) => {
                        const updated = [...data.artAndHistory.items];
                        updated[idx].link = e.target.value;
                        onChange({
                          ...data,
                          artAndHistory: { ...data.artAndHistory, items: updated },
                        });
                      }}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <ImageUploader
                    label="Cover Photo"
                    value={item.image}
                    onChange={(newUrl) => {
                      const updated = [...data.artAndHistory.items];
                      updated[idx].image = newUrl;
                      onChange({
                        ...data,
                        artAndHistory: { ...data.artAndHistory, items: updated },
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= 9. EVENTS & FESTIVALS ================= */}
      {activeTab === "events" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Events &amp; Festivals Section
              </h3>
              <p className="text-xs text-slate-400">
                Showcase cultural festivals, food fests, concerts, exhibitions, and religious celebrations.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newCat: EventCategoryItemData = {
                  id: Date.now().toString(),
                  title: "New Event Festival",
                  iconName: "sparkles",
                  image: "/cultural.avif",
                  link: "#events",
                };
                onChange({
                  ...data,
                  events: {
                    ...data.events,
                    categories: [...(data.events?.categories || []), newCat],
                  },
                });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white transition self-start cursor-pointer shadow-sm shadow-orange-600/30"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Event Category</span>
            </button>
          </div>

          {/* Section Header Settings */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
            <h4 className="text-xs font-bold uppercase text-orange-400">
              Section Header &amp; Action Link
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Eyebrow Tag
                </label>
                <input
                  type="text"
                  value={data.events?.tag || "WHAT'S HAPPENING"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      events: { ...data.events, tag: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={data.events?.title || "Events in"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      events: { ...data.events, title: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Title Highlight
                </label>
                <input
                  type="text"
                  value={data.events?.titleHighlight || "Mangalore"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      events: { ...data.events, titleHighlight: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Subtitle Description
                </label>
                <textarea
                  rows={2}
                  value={data.events?.description || ""}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      events: { ...data.events, description: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  View All Button Label
                </label>
                <input
                  type="text"
                  value={data.events?.viewAllText || "View All Events"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      events: { ...data.events, viewAllText: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  View All Target Link
                </label>
                <input
                  type="text"
                  value={data.events?.viewAllLink || "#events"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      events: { ...data.events, viewAllLink: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Event Categories List */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase text-slate-400">
              Event Categories ({data.events?.categories?.length || 0} categories)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(data.events?.categories || []).map((cat, idx) => (
                <div
                  key={cat.id || idx}
                  className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-orange-400">
                      Category #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.events.categories.filter((_, i) => i !== idx);
                        onChange({
                          ...data,
                          events: { ...data.events, categories: updated },
                        });
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
                      title="Delete category"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={cat.title}
                      onChange={(e) => {
                        const updated = [...data.events.categories];
                        updated[idx].title = e.target.value;
                        onChange({
                          ...data,
                          events: { ...data.events, categories: updated },
                        });
                      }}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Icon
                    </label>
                    <select
                      value={cat.iconName}
                      onChange={(e) => {
                        const updated = [...data.events.categories];
                        updated[idx].iconName = e.target.value;
                        onChange({
                          ...data,
                          events: { ...data.events, categories: updated },
                        });
                      }}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                    >
                      <option value="sparkles">Sparkles (Cultural Programs)</option>
                      <option value="utensils">Utensils (Food Festivals)</option>
                      <option value="music">Music (Concerts &amp; Gigs)</option>
                      <option value="palette">Palette (Art Exhibitions)</option>
                      <option value="flame">Flame (Religious Fests)</option>
                      <option value="users">Users (Community Gatherings)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Link Destination
                    </label>
                    <input
                      type="text"
                      value={cat.link || "#events"}
                      onChange={(e) => {
                        const updated = [...data.events.categories];
                        updated[idx].link = e.target.value;
                        onChange({
                          ...data,
                          events: { ...data.events, categories: updated },
                        });
                      }}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <ImageUploader
                    label="Category Photo"
                    value={cat.image}
                    onChange={(newUrl) => {
                      const updated = [...data.events.categories];
                      updated[idx].image = newUrl;
                      onChange({
                        ...data,
                        events: { ...data.events, categories: updated },
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= 10. EXPLORE MORE CTA ================= */}
      {activeTab === "exploreMore" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Explore More of Mangalore CTA Banner
              </h3>
              <p className="text-xs text-slate-400">
                Manage the floating coastal banner, background photo, action buttons, and quick navigation links.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newLink: ExploreMoreQuickLinkData = {
                  id: Date.now().toString(),
                  label: "New Experience",
                  iconName: "pin",
                  href: "/places-to-visit",
                };
                onChange({
                  ...data,
                  exploreMore: {
                    ...data.exploreMore,
                    quickLinks: [...(data.exploreMore?.quickLinks || []), newLink],
                  },
                });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white transition self-start cursor-pointer shadow-sm shadow-orange-600/30"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Quick Link</span>
            </button>
          </div>

          {/* Section Header Settings */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
            <h4 className="text-xs font-bold uppercase text-orange-400">
              Banner Content &amp; Button
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Eyebrow Tag
                </label>
                <input
                  type="text"
                  value={data.exploreMore?.tag || "BE A PART OF MANGALORE"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      exploreMore: { ...data.exploreMore, tag: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={data.exploreMore?.title || "Explore More of"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      exploreMore: { ...data.exploreMore, title: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Title Highlight
                </label>
                <input
                  type="text"
                  value={data.exploreMore?.titleHighlight || "Mangalore"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      exploreMore: {
                        ...data.exploreMore,
                        titleHighlight: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Subtitle Description
                </label>
                <textarea
                  rows={2}
                  value={data.exploreMore?.description || ""}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      exploreMore: {
                        ...data.exploreMore,
                        description: e.target.value,
                      },
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
                  value={data.exploreMore?.buttonText || "Start Exploring"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      exploreMore: {
                        ...data.exploreMore,
                        buttonText: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Button Link Destination
                </label>
                <input
                  type="text"
                  value={data.exploreMore?.buttonLink || "/places-to-visit"}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      exploreMore: {
                        ...data.exploreMore,
                        buttonLink: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <ImageUploader
                label="Banner Coastal Aerial Background Image"
                value={
                  data.exploreMore?.backdropImage ||
                  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
                }
                onChange={(newUrl) =>
                  onChange({
                    ...data,
                    exploreMore: {
                      ...data.exploreMore,
                      backdropImage: newUrl,
                    },
                  })
                }
              />
            </div>
          </div>

          {/* Quick Links List */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase text-slate-400">
              Quick Navigation Links ({data.exploreMore?.quickLinks?.length || 0} links)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(data.exploreMore?.quickLinks || []).map((link, idx) => (
                <div
                  key={link.id || idx}
                  className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-orange-400">
                      Link #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.exploreMore.quickLinks.filter((_, i) => i !== idx);
                        onChange({
                          ...data,
                          exploreMore: { ...data.exploreMore, quickLinks: updated },
                        });
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
                      title="Delete link"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Label Text
                    </label>
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => {
                        const updated = [...data.exploreMore.quickLinks];
                        updated[idx].label = e.target.value;
                        onChange({
                          ...data,
                          exploreMore: { ...data.exploreMore, quickLinks: updated },
                        });
                      }}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Icon
                    </label>
                    <select
                      value={link.iconName}
                      onChange={(e) => {
                        const updated = [...data.exploreMore.quickLinks];
                        updated[idx].iconName = e.target.value;
                        onChange({
                          ...data,
                          exploreMore: { ...data.exploreMore, quickLinks: updated },
                        });
                      }}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                    >
                      <option value="pin">Pin (Places)</option>
                      <option value="utensils">Utensils (Food)</option>
                      <option value="calendar">Calendar (Events)</option>
                      <option value="shopping">Shopping Bag (Businesses)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Target URL
                    </label>
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) => {
                        const updated = [...data.exploreMore.quickLinks];
                        updated[idx].href = e.target.value;
                        onChange({
                          ...data,
                          exploreMore: { ...data.exploreMore, quickLinks: updated },
                        });
                      }}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
