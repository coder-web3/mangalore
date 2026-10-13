"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Heart,
  ChevronRight,
  MapPin,
  Palmtree,
  Waves,
  Mountain,
  Landmark,
  Trees,
  Castle,
  UtensilsCrossed,
  LayoutGrid,
  Binoculars,
  Sparkles,
} from "lucide-react";
import { PlaceItemData, ListingCatalogData } from "@/lib/cms";

export interface PlaceCardItem {
  id: string;
  name: string;
  slug?: string;
  category: string;
  categoryLabel: string;
  categoryIcon: "beach" | "temple" | "viewpoint" | "river" | "hill";
  description: string;
  image: string;
  location?: string;
  rating?: string;
  timings?: string;
}

export const initialPlaces: PlaceCardItem[] = [
  {
    id: "panambur",
    name: "Panambur Beach",
    category: "beaches",
    categoryLabel: "Beaches",
    categoryIcon: "beach",
    description: "Golden sands, stunning sunsets and a vibrant beach experience.",
    image: "/ref-card-panambur.jpg",
  },
  {
    id: "tannirbhavi",
    name: "Tannirbhavi Beach",
    category: "beaches",
    categoryLabel: "Beaches",
    categoryIcon: "beach",
    description: "A peaceful and scenic beach with clean shores and beautiful views.",
    image: "/ref-card-tannirbhavi.jpg",
  },
  {
    id: "kadri",
    name: "Kadri Manjunath Temple",
    category: "temples",
    categoryLabel: "Temples",
    categoryIcon: "temple",
    description: "A historic temple known for its rich heritage and beautiful architecture.",
    image: "/ref-card-kadri.jpg",
  },
  {
    id: "lighthouse",
    name: "Light House Hill",
    category: "hills",
    categoryLabel: "Viewpoints",
    categoryIcon: "viewpoint",
    description: "A scenic viewpoint offering panoramic views of the Arabian Sea.",
    image: "/ref-card-lighthouse.jpg",
  },
  {
    id: "netravati",
    name: "Netravati River",
    category: "rivers",
    categoryLabel: "Rivers",
    categoryIcon: "river",
    description: "Enjoy boat rides and serene views along the picturesque river.",
    image: "/ref-card-netravati.jpg",
  },
  {
    id: "sultan",
    name: "Sultan Battery",
    category: "cultural",
    categoryLabel: "Hills",
    categoryIcon: "hill",
    description: "A historic watchtower with beautiful nature trails and valley views.",
    image: "/ref-card-sultan.jpg",
  },
];

const sidebarCategoryDefinitions = [
  { id: "all", label: "All Places", icon: LayoutGrid },
  { id: "beaches", label: "Beaches", icon: Palmtree },
  { id: "rivers", label: "Rivers & Backwaters", icon: Waves },
  { id: "hills", label: "Hills & Viewpoints", icon: Mountain },
  { id: "temples", label: "Temples & Heritage", icon: Landmark },
  { id: "nature", label: "Nature & Wildlife", icon: Trees },
  { id: "cultural", label: "Cultural & Historic", icon: Castle },
  { id: "food", label: "Food & Markets", icon: UtensilsCrossed },
];

interface PopularPlacesSectionProps {
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
  placesList?: PlaceItemData[];
  catalogHeader?: ListingCatalogData;
  basePath?: string;
}

export default function PopularPlacesSection({
  selectedCategory,
  onSelectCategory,
  placesList,
  catalogHeader,
  basePath = "/places-to-visit",
}: PopularPlacesSectionProps) {
  const [internalCategory, setInternalCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedCards, setLikedCards] = useState<Record<string, boolean>>({});

  const activePlaces: PlaceCardItem[] =
    placesList && placesList.length > 0 ? (placesList as PlaceCardItem[]) : initialPlaces;

  const activeCategory = selectedCategory !== undefined ? selectedCategory : internalCategory;
  const setActiveCategory = onSelectCategory || setInternalCategory;

  const getCategoryCount = (catId: string) => {
    if (catId === "all") return activePlaces.length;
    return activePlaces.filter((p) => p.category === catId).length;
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPlaces = activePlaces.filter((place) => {
    const matchesCategory =
      activeCategory === "all" || place.category === activeCategory;
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="places-catalog" className="relative w-full bg-[#f8fbff] py-10 sm:py-14 lg:py-16 overflow-hidden scroll-mt-24">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[2px] w-6 bg-[#ff5e15]" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#ff5e15] uppercase">
              {catalogHeader?.tag || "EXPLORE THE BEST"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0d1e38] leading-tight mb-2.5">
            {catalogHeader?.title || "Popular Tourist Places in"}{" "}
            <span className="text-[#ff5e15]">
              {catalogHeader?.titleHighlight || "Mangalore"}
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-normal">
            {catalogHeader?.description ||
              "From pristine beaches and scenic rivers to ancient temples and lush hills, explore the most beautiful places to visit in Mangalore."}
          </p>
        </div>

        {/* 2-Column Layout: Left Cards Grid (8 cols) & Right Filter Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* LEFT 6-CARDS GRID */}
          <div className="lg:col-span-8 xl:col-span-8.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
              {filteredPlaces.map((place) => {
                const isLiked = likedCards[place.id];

                return (
                  <div
                    key={place.id}
                    className="group relative h-[310px] sm:h-[330px] rounded-3xl overflow-hidden shadow-lg shadow-slate-900/10 border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-1.5 cursor-pointer bg-slate-900 select-none"
                  >
                    {/* Background Place Photo */}
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* Gradient Dark Shield for Bottom Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                    {/* Top Left Frosted Category Tag Pill */}
                    <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 shadow-md border border-white/80">
                      {place.categoryIcon === "beach" && (
                        <Palmtree className="h-3.5 w-3.5 text-[#ff5e15]" />
                      )}
                      {place.categoryIcon === "temple" && (
                        <Landmark className="h-3.5 w-3.5 text-[#ff5e15]" />
                      )}
                      {place.categoryIcon === "viewpoint" && (
                        <Binoculars className="h-3.5 w-3.5 text-[#ff5e15]" />
                      )}
                      {place.categoryIcon === "river" && (
                        <Waves className="h-3.5 w-3.5 text-[#3b82f6]" />
                      )}
                      {place.categoryIcon === "hill" && (
                        <Mountain className="h-3.5 w-3.5 text-[#10b981]" />
                      )}
                      <span className="text-[11px] font-bold text-slate-800">
                        {place.categoryLabel}
                      </span>
                    </div>

                    {/* Top Right Heart Favorite Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleLike(place.id, e)}
                      className="absolute top-3.5 right-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/25 backdrop-blur-md border border-white/40 text-white transition-all duration-300 hover:bg-white hover:text-red-500 hover:scale-110"
                      aria-label="Add to favorites"
                    >
                      <Heart
                        className={`h-4 w-4 transition-colors ${
                          isLiked
                            ? "fill-red-500 text-red-500"
                            : "stroke-white hover:stroke-red-500"
                        }`}
                      />
                    </button>

                    {/* Bottom Content Area with Subtle Wave Pattern Line */}
                    <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5">
                      {/* Place Title */}
                      {(() => {
                        const placeHref = `${basePath}/${place.slug || (place.id === "panambur" ? "panambur-beach" : place.id)}`;

                        return (
                          <>
                            <Link href={placeHref} className="inline-block">
                              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug drop-shadow-md group-hover:text-orange-400 transition-colors">
                                {place.name}
                              </h3>
                            </Link>

                            {/* Small Orange Underline Divider */}
                            <div className="mt-1.5 mb-2 h-[2px] w-8 rounded-full bg-[#ff5e15]" />

                            {/* Description */}
                            <p className="text-[11px] sm:text-xs text-white/90 leading-relaxed font-normal line-clamp-2">
                              {place.description}
                            </p>

                            {placeHref !== "#" && (
                              <div className="mt-2.5">
                                <Link
                                  href={placeHref}
                                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-400 hover:text-white transition-colors"
                                >
                                  <span>Explore Details</span>
                                  <ChevronRight className="h-3 w-3" />
                                </Link>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredPlaces.length === 0 && (
              <div className="p-12 text-center rounded-3xl bg-white border border-slate-200">
                <p className="text-sm font-semibold text-slate-700">
                  No tourist places found matching your filter.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-3 text-xs font-bold text-orange-600 hover:underline"
                >
                  View All Places
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR (SEARCH, CATEGORY LIST, MAP WIDGET) */}
          <div className="lg:col-span-4 xl:col-span-3.5 space-y-6">
            {/* 1. Search Bar with Orange Icon Button */}
            <div className="relative flex items-center rounded-2xl bg-white shadow-md shadow-slate-900/5 border border-slate-200/90 p-1.5 pl-3.5 focus-within:ring-2 focus-within:ring-orange-500/20">
              <Search className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search places in Mangalore..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-2.5 py-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff5411] text-white shadow-md shadow-orange-600/30 transition hover:bg-[#ea4908]"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>

            {/* 2. Explore by Category List Box */}
            <div className="rounded-3xl bg-white p-5 shadow-lg shadow-slate-900/5 border border-slate-200/80">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                <h3 className="text-sm font-extrabold text-[#0d1e38] tracking-tight">
                  Explore by Category
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#ff5e15] hover:underline cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>

              {/* Category Rows */}
              <div className="space-y-1">
                {sidebarCategoryDefinitions.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  const count = getCategoryCount(cat.id);

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 text-left cursor-pointer ${
                        isActive
                          ? "bg-orange-50 text-[#ff5411] font-bold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`h-4 w-4 ${
                            isActive ? "text-[#ff5411]" : "text-slate-500"
                          }`}
                        />
                        <span className="text-xs">{cat.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-full ${
                            isActive
                              ? "bg-orange-200/60 text-[#ff5411] font-bold"
                              : "bg-slate-100 text-slate-500 font-semibold"
                          }`}
                        >
                          {count}
                        </span>
                        <ChevronRight
                          className={`h-3 w-3 ${
                            isActive ? "text-[#ff5411]" : "text-slate-400"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Places Map Interactive Card */}
            <div className="rounded-3xl bg-white p-4 sm:p-5 shadow-lg shadow-slate-900/5 border border-slate-200/80">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-[#ff5e15]">
                    <MapPin className="h-4 w-4 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#0d1e38]">
                      Places Map
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      View all tourist places in Mangalore
                    </p>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Mangalore+Tourist+Places"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-[#0d1e38] hover:bg-slate-800 px-3 py-1.5 text-[10px] font-bold text-white transition shadow"
                >
                  View Full Map →
                </a>
              </div>

              {/* Map Illustration / Cropped Reference Map with Pin Spots */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-inner group cursor-pointer">
                <Image
                  src="/ref-places-map.jpg"
                  alt="Mangalore Places Map"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
