"use client";

import React, { useState } from "react";
import {
  Sparkles,
  MapPin,
  Image as ImageIcon,
  Plus,
  Trash2,
  ExternalLink,
  Layers,
  Compass,
  Star,
  Clock,
  FileText,
} from "lucide-react";
import { PlacesData, PlaceItemData } from "@/lib/cms";
import ImageUploader from "@/components/admin/ImageUploader";

interface PlacesListingAdminProps {
  data: PlacesData;
  onChange: (updated: PlacesData) => void;
  onEditDetailPage?: (slug: string) => void;
  activeSubTab?: "hero" | "cards";
  onSubTabChange?: (tab: "hero" | "cards") => void;
}

export default function PlacesListingAdmin({
  data,
  onChange,
  onEditDetailPage,
  activeSubTab,
  onSubTabChange,
}: PlacesListingAdminProps) {
  const [internalSubTab, setInternalSubTab] = useState<"hero" | "cards">("hero");

  const subTab = activeSubTab || internalSubTab;
  const setSubTab = (tab: "hero" | "cards") => {
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

  const updatePlace = (index: number, field: keyof PlaceItemData, val: any) => {
    const updatedPlaces = [...data.listingCatalog.places];
    updatedPlaces[index] = {
      ...updatedPlaces[index],
      [field]: val,
    };
    // Auto-update categoryLabel and categoryIcon if category changes
    if (field === "category") {
      const catMap: Record<string, { label: string; icon: PlaceItemData["categoryIcon"] }> = {
        beaches: { label: "Beaches", icon: "beach" },
        temples: { label: "Temples", icon: "temple" },
        rivers: { label: "Rivers", icon: "river" },
        hills: { label: "Viewpoints", icon: "viewpoint" },
        nature: { label: "Nature", icon: "hill" },
        cultural: { label: "Cultural", icon: "temple" },
        food: { label: "Food", icon: "beach" },
      };
      if (catMap[val]) {
        updatedPlaces[index].categoryLabel = catMap[val].label;
        updatedPlaces[index].categoryIcon = catMap[val].icon;
      }
    }
    onChange({
      ...data,
      listingCatalog: {
        ...data.listingCatalog,
        places: updatedPlaces,
      },
    });
  };

  const addPlace = () => {
    const newPlace: PlaceItemData = {
      id: "place-" + Date.now(),
      name: "New Tourist Attraction",
      slug: "new-tourist-attraction",
      category: "beaches",
      categoryLabel: "Beaches",
      categoryIcon: "beach",
      description: "Discover scenic natural surroundings, rich cultural sights, and local coastal heritage.",
      image: "/panambur.avif",
      location: "Mangalore, Karnataka",
      rating: "4.8",
      timings: "Open daily 6:00 AM - 7:00 PM",
    };
    onChange({
      ...data,
      listingCatalog: {
        ...data.listingCatalog,
        places: [...data.listingCatalog.places, newPlace],
      },
    });
  };

  const removePlace = (index: number) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${data.listingCatalog.places[index].name}"?`
    );
    if (!confirmed) return;
    const updated = data.listingCatalog.places.filter((_, i) => i !== index);
    onChange({
      ...data,
      listingCatalog: {
        ...data.listingCatalog,
        places: updated,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Sub-nav header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Compass className="h-5 w-5 text-orange-500" />
            Places to Visit — Listing Page
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage the hero banner, polaroid tilt cards, and tourist destination catalog cards.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 p-1">
          <button
            type="button"
            onClick={() => setSubTab("hero")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              subTab === "hero"
                ? "bg-orange-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Hero & Polaroid Cards
          </button>
          <button
            type="button"
            onClick={() => setSubTab("cards")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              subTab === "cards"
                ? "bg-orange-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Tourist Places Cards ({data.listingCatalog.places.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Hero & Polaroid Cards */}
      {subTab === "hero" && (
        <div className="space-y-6">
          {/* Main Hero Banner Text & Backdrop */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-orange-400" />
                Hero Banner Settings
              </h3>
              <span className="text-[11px] text-slate-400">Public route: /places-to-visit</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Tagline / Small Badge
                </label>
                <input
                  type="text"
                  value={data.listingHero.badge}
                  onChange={(e) => updateHero("badge", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                  placeholder="e.g. DISCOVER MANGALORE"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Main Title Line
                </label>
                <input
                  type="text"
                  value={data.listingHero.titleLine1}
                  onChange={(e) => updateHero("titleLine1", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                  placeholder="e.g. Must-Visit Attractions &"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Title Highlight (Orange Font)
                </label>
                <input
                  type="text"
                  value={data.listingHero.titleHighlight}
                  onChange={(e) => updateHero("titleHighlight", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs text-orange-400 font-bold focus:border-orange-500 focus:outline-none"
                  placeholder="e.g. Coastal Wonders"
                />
              </div>

              <div>
                <ImageUploader
                  label="Hero Canvas Backdrop Image"
                  currentImage={data.listingHero.backdropImage}
                  onImageSelected={(url: string) => updateHero("backdropImage", url)}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Hero Description
              </label>
              <textarea
                rows={2}
                value={data.listingHero.description}
                onChange={(e) => updateHero("description", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                placeholder="Overview text displayed below the hero title"
              />
            </div>
          </div>

          {/* 2 Polaroid Tilt Cards */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-orange-400" />
                2 Polaroid Tilt Cards (Gallery Showcase)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                These are the 2 polaroid cards floating on the right side of the hero section.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {data.listingHero.galleryCards.map((card, idx) => (
                <div
                  key={card.id || idx}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-orange-400">
                      Polaroid Card #{idx + 1}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {idx === 0 ? "Left Card (Tilted +5°)" : "Right Card (Tilted -3°)"}
                    </span>
                  </div>

                  <ImageUploader
                    label="Card Photo (Device Upload)"
                    currentImage={card.image}
                    onImageSelected={(url: string) => updatePolaroid(idx, "image", url)}
                  />

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Card Title
                    </label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => updatePolaroid(idx, "title", e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                      placeholder="e.g. Panambur Beach Coast"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Card Subtitle / Location
                    </label>
                    <input
                      type="text"
                      value={card.subtitle}
                      onChange={(e) => updatePolaroid(idx, "subtitle", e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                      placeholder="e.g. Arabian Sea • Mangalore"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Destination Link
                    </label>
                    <input
                      type="text"
                      value={card.link || ""}
                      onChange={(e) => updatePolaroid(idx, "link", e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                      placeholder="e.g. /places-to-visit/panambur-beach"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Tourist Places Cards */}
      {subTab === "cards" && (
        <div className="space-y-6">
          {/* Catalog Section Header Controls */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-orange-400" />
              Catalog Section Header
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Tag Badge
                </label>
                <input
                  type="text"
                  value={data.listingCatalog.tag}
                  onChange={(e) => updateCatalog("tag", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Title Prefix
                </label>
                <input
                  type="text"
                  value={data.listingCatalog.title}
                  onChange={(e) => updateCatalog("title", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Title Highlight
                </label>
                <input
                  type="text"
                  value={data.listingCatalog.titleHighlight}
                  onChange={(e) => updateCatalog("titleHighlight", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs text-orange-400 font-bold focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Description
              </label>
              <input
                type="text"
                value={data.listingCatalog.description}
                onChange={(e) => updateCatalog("description", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Places Cards List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Tourist Place Cards ({data.listingCatalog.places.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Add, edit, change category or upload device photos for each attraction card.
                </p>
              </div>

              <button
                type="button"
                onClick={addPlace}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition shadow cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Place Card</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {data.listingCatalog.places.map((place, idx) => (
                <div
                  key={place.id || idx}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-600/20 text-orange-400 font-bold text-xs">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-bold text-white truncate max-w-[180px]">
                        {place.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEditDetailPage?.(place.slug || place.id)}
                        className="px-2.5 py-1.5 rounded-lg border border-orange-500/50 bg-orange-600/20 text-orange-400 hover:bg-orange-600 hover:text-white transition text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer"
                        title="Customize this attraction's detail page"
                      >
                        <FileText className="h-3 w-3" />
                        <span>Edit Detail Page</span>
                      </button>

                      {place.slug && (
                        <a
                          href={`/places-to-visit/${place.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition text-[11px] inline-flex items-center gap-1"
                          title="Open place detail page"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>View Detail</span>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => removePlace(idx)}
                        className="p-1.5 rounded-lg border border-red-900/60 bg-red-950/40 text-red-400 hover:bg-red-900/60 transition cursor-pointer"
                        title="Delete place"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Device Image Uploader */}
                  <ImageUploader
                    label="Place Card Photo"
                    currentImage={place.image}
                    onImageSelected={(url: string) => updatePlace(idx, "image", url)}
                  />

                  {/* Place Name and Slug */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Place Name
                      </label>
                      <input
                        type="text"
                        value={place.name}
                        onChange={(e) => updatePlace(idx, "name", e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        URL Slug / Detail Link
                      </label>
                      <input
                        type="text"
                        value={place.slug || ""}
                        onChange={(e) => updatePlace(idx, "slug", e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none font-mono"
                        placeholder="e.g. panambur-beach"
                      />
                    </div>
                  </div>

                  {/* Category and Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Category
                      </label>
                      <select
                        value={place.category}
                        onChange={(e) => updatePlace(idx, "category", e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                      >
                        <option value="beaches">Beaches</option>
                        <option value="temples">Temples & Heritage</option>
                        <option value="rivers">Rivers & Backwaters</option>
                        <option value="hills">Hills & Viewpoints</option>
                        <option value="nature">Nature & Wildlife</option>
                        <option value="cultural">Cultural & Historic</option>
                        <option value="food">Food & Markets</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Location / Distance
                      </label>
                      <input
                        type="text"
                        value={place.location || ""}
                        onChange={(e) => updatePlace(idx, "location", e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                        placeholder="e.g. 10 km from Mangalore City"
                      />
                    </div>
                  </div>

                  {/* Rating and Timings */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Rating Score
                      </label>
                      <input
                        type="text"
                        value={place.rating || "4.8"}
                        onChange={(e) => updatePlace(idx, "rating", e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                        placeholder="e.g. 4.8"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Visit Timings
                      </label>
                      <input
                        type="text"
                        value={place.timings || ""}
                        onChange={(e) => updatePlace(idx, "timings", e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                        placeholder="e.g. Open 24 Hours"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Short Description
                    </label>
                    <textarea
                      rows={2}
                      value={place.description}
                      onChange={(e) => updatePlace(idx, "description", e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
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
