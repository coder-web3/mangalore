"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  MapPin,
  Clock,
  Star,
  Camera,
  CheckCircle2,
  Plus,
  Trash2,
  Images,
  Compass,
  FileText,
  Video,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import {
  PlacesData,
  GalleryImageItem,
  ThingToDoData,
  QuickFactData,
  PanamburDetailData,
  getDefaultPlaceDetail,
} from "@/lib/cms";
import ImageUploader from "@/components/admin/ImageUploader";

interface PlaceDetailAdminProps {
  data: PlacesData;
  onChange: (updated: PlacesData) => void;
  selectedSlug?: string;
  onSelectSlug?: (slug: string) => void;
}

export default function PlaceDetailAdmin({
  data,
  onChange,
  selectedSlug: externalSelectedSlug,
  onSelectSlug,
}: PlaceDetailAdminProps) {
  const placesList = data.listingCatalog?.places || [];

  // Determine current active place slug
  const defaultSlug =
    placesList.length > 0 ? placesList[0].slug || "panambur-beach" : "panambur-beach";

  const [activeSlug, setActiveSlug] = useState<string>(
    externalSelectedSlug || defaultSlug
  );

  useEffect(() => {
    if (externalSelectedSlug) {
      setActiveSlug(externalSelectedSlug);
    }
  }, [externalSelectedSlug]);

  const handleSlugChange = (newSlug: string) => {
    setActiveSlug(newSlug);
    if (onSelectSlug) {
      onSelectSlug(newSlug);
    }
  };

  // Sub-tabs for the detail editor
  const [subTab, setSubTab] = useState<
    "hero" | "overview" | "facts" | "gallery" | "thingsToDo"
  >("hero");

  // Get or initialize detail for activeSlug
  const matchedPlace = placesList.find(
    (p) => p.slug === activeSlug || p.id === activeSlug
  );

  const currentDetail: PanamburDetailData =
    data.placeDetails?.[activeSlug] ||
    (activeSlug === "panambur-beach" && data.panamburDetail
      ? data.panamburDetail
      : getDefaultPlaceDetail(
          matchedPlace || {
            name: activeSlug,
            category: "Beaches",
            description: "Coastal tourist destination in Mangalore",
          }
        ));

  const updateCurrentDetail = (updatedDetail: PanamburDetailData) => {
    const updatedDetailsMap = {
      ...(data.placeDetails || {}),
      [activeSlug]: updatedDetail,
    };

    const updatedData: PlacesData = {
      ...data,
      placeDetails: updatedDetailsMap,
    };

    if (activeSlug === "panambur-beach") {
      updatedData.panamburDetail = updatedDetail;
    }

    onChange(updatedData);
  };

  const updateHero = (field: string, val: any) => {
    updateCurrentDetail({
      ...currentDetail,
      hero: {
        ...currentDetail.hero,
        [field]: val,
      },
    });
  };

  const updateOverview = (field: string, val: any) => {
    updateCurrentDetail({
      ...currentDetail,
      overview: {
        ...currentDetail.overview,
        [field]: val,
      },
    });
  };

  const addHighlight = () => {
    updateCurrentDetail({
      ...currentDetail,
      overview: {
        ...currentDetail.overview,
        highlights: [
          ...(currentDetail.overview.highlights || []),
          "New Feature Highlight",
        ],
      },
    });
  };

  const updateHighlight = (idx: number, val: string) => {
    const updated = [...(currentDetail.overview.highlights || [])];
    updated[idx] = val;
    updateCurrentDetail({
      ...currentDetail,
      overview: {
        ...currentDetail.overview,
        highlights: updated,
      },
    });
  };

  const removeHighlight = (idx: number) => {
    const updated = (currentDetail.overview.highlights || []).filter(
      (_, i) => i !== idx
    );
    updateCurrentDetail({
      ...currentDetail,
      overview: {
        ...currentDetail.overview,
        highlights: updated,
      },
    });
  };

  const addQuickFact = () => {
    const newFact: QuickFactData = {
      label: "Custom Fact",
      value: "Details here",
    };
    updateCurrentDetail({
      ...currentDetail,
      quickFacts: [...(currentDetail.quickFacts || []), newFact],
    });
  };

  const updateQuickFact = (
    idx: number,
    field: keyof QuickFactData,
    val: string
  ) => {
    const updated = [...(currentDetail.quickFacts || [])];
    updated[idx] = { ...updated[idx], [field]: val };
    updateCurrentDetail({
      ...currentDetail,
      quickFacts: updated,
    });
  };

  const removeQuickFact = (idx: number) => {
    const updated = (currentDetail.quickFacts || []).filter((_, i) => i !== idx);
    updateCurrentDetail({
      ...currentDetail,
      quickFacts: updated,
    });
  };

  const addGalleryImage = () => {
    const newImg: GalleryImageItem = {
      id: "img-" + Date.now(),
      image: matchedPlace?.image || "/panambur.avif",
      caption: `${matchedPlace?.name || "Attraction"} Scenic Horizon`,
      tag: "Coastline",
    };
    updateCurrentDetail({
      ...currentDetail,
      gallery: [...(currentDetail.gallery || []), newImg],
    });
  };

  const updateGalleryImage = (
    idx: number,
    field: keyof GalleryImageItem,
    val: string
  ) => {
    const updated = [...(currentDetail.gallery || [])];
    updated[idx] = { ...updated[idx], [field]: val };
    updateCurrentDetail({
      ...currentDetail,
      gallery: updated,
    });
  };

  const removeGalleryImage = (idx: number) => {
    const updated = (currentDetail.gallery || []).filter((_, i) => i !== idx);
    updateCurrentDetail({
      ...currentDetail,
      gallery: updated,
    });
  };

  const addThingToDo = () => {
    const newThing: ThingToDoData = {
      id: "activity-" + Date.now(),
      title: "New Activity",
      description: "Enjoy leisure and recreation in coastal surroundings.",
      icon: "waves",
    };
    updateCurrentDetail({
      ...currentDetail,
      thingsToDo: [...(currentDetail.thingsToDo || []), newThing],
    });
  };

  const updateThingToDo = (
    idx: number,
    field: keyof ThingToDoData,
    val: string
  ) => {
    const updated = [...(currentDetail.thingsToDo || [])];
    updated[idx] = { ...updated[idx], [field]: val };
    updateCurrentDetail({
      ...currentDetail,
      thingsToDo: updated,
    });
  };

  const removeThingToDo = (idx: number) => {
    const updated = (currentDetail.thingsToDo || []).filter((_, i) => i !== idx);
    updateCurrentDetail({
      ...currentDetail,
      thingsToDo: updated,
    });
  };

  const currentDisplayName =
    matchedPlace?.name ||
    `${currentDetail.hero.title} ${currentDetail.hero.titleHighlight}`.trim();

  return (
    <div className="space-y-6">
      {/* 1. TOP ATTRACTION SELECTOR BAR */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏖️</span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Place Detail Page Editor
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Select which attraction detail page to customize. Every place uses the exact Panambur design layout.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <a
              href={`/places-to-visit/${activeSlug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition"
            >
              <ExternalLink className="h-3.5 w-3.5 text-orange-400" />
              <span>Preview Public Page</span>
            </a>
          </div>
        </div>

        {/* Place Selection Chips / Dropdown */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            Select Attraction to Edit ({placesList.length} Attractions Available):
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {placesList.map((place) => {
              const isSelected = (place.slug || place.id) === activeSlug;
              return (
                <button
                  key={place.id}
                  type="button"
                  onClick={() => handleSlugChange(place.slug || place.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                    isSelected
                      ? "bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-600/30"
                      : "bg-slate-950/70 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <span className="truncate max-w-[150px]">{place.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      isSelected
                        ? "bg-black/25 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {place.categoryLabel || place.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. SUB-TABS NAVIGATION */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
            Now Editing:
          </span>
          <span className="text-sm font-bold text-white bg-slate-900 border border-slate-800 px-3 py-1 rounded-xl">
            {currentDisplayName}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-900 border border-slate-800 p-1">
          <button
            type="button"
            onClick={() => setSubTab("hero")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              subTab === "hero"
                ? "bg-orange-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Hero & Pills
          </button>
          <button
            type="button"
            onClick={() => setSubTab("overview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              subTab === "overview"
                ? "bg-orange-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            About & Highlights
          </button>
          <button
            type="button"
            onClick={() => setSubTab("facts")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              subTab === "facts"
                ? "bg-orange-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Travel Facts ({(currentDetail.quickFacts || []).length})
          </button>
          <button
            type="button"
            onClick={() => setSubTab("gallery")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              subTab === "gallery"
                ? "bg-orange-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Photo Gallery ({(currentDetail.gallery || []).length})
          </button>
          <button
            type="button"
            onClick={() => setSubTab("thingsToDo")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              subTab === "thingsToDo"
                ? "bg-orange-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Things to Do ({(currentDetail.thingsToDo || []).length})
          </button>
        </div>
      </div>

      {/* 3. HERO & QUICK PILLS TAB */}
      {subTab === "hero" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-orange-400" />
              Panoramic Hero Banner Canvas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Title First Word(s)
                </label>
                <input
                  type="text"
                  value={currentDetail.hero.title}
                  onChange={(e) => updateHero("title", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Title Highlight (Orange Word)
                </label>
                <input
                  type="text"
                  value={currentDetail.hero.titleHighlight}
                  onChange={(e) => updateHero("titleHighlight", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-orange-400 font-bold focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Category Tag Badge
                </label>
                <input
                  type="text"
                  value={currentDetail.hero.category}
                  onChange={(e) => updateHero("category", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none uppercase font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Hero Subtitle Description
                </label>
                <textarea
                  rows={3}
                  value={currentDetail.hero.description}
                  onChange={(e) => updateHero("description", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <ImageUploader
                  label="Panoramic Sunset Hero Backdrop (Device Upload)"
                  currentImage={currentDetail.hero.backdropImage}
                  onImageSelected={(url: string) => updateHero("backdropImage", url)}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                <Video className="h-3.5 w-3.5 text-orange-400" />
                "Watch Video" Modal YouTube Embed URL
              </label>
              <input
                type="text"
                value={currentDetail.hero.videoUrl || ""}
                onChange={(e) => updateHero("videoUrl", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none font-mono"
                placeholder="https://www.youtube.com/embed/9No-FiEInLA?autoplay=1"
              />
            </div>
          </div>

          {/* 4 Metadata Quick Info Pills */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="h-4 w-4 text-orange-400" />
              4 Header Information Pills
            </h3>
            <p className="text-xs text-slate-400">
              The four icons and values displayed directly under the headline.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 text-xs font-bold">
                  <MapPin className="h-4 w-4" />
                  <span>Pill 1: Location</span>
                </div>
                <input
                  type="text"
                  value={currentDetail.hero.location}
                  onChange={(e) => updateHero("location", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 text-xs font-bold">
                  <Clock className="h-4 w-4" />
                  <span>Pill 2: Best Time</span>
                </div>
                <input
                  type="text"
                  value={currentDetail.hero.bestTime}
                  onChange={(e) => updateHero("bestTime", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 text-xs font-bold">
                  <Star className="h-4 w-4 fill-current" />
                  <span>Pill 3: Popular For</span>
                </div>
                <input
                  type="text"
                  value={currentDetail.hero.popularFor}
                  onChange={(e) => updateHero("popularFor", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 text-xs font-bold">
                  <Camera className="h-4 w-4" />
                  <span>Pill 4: Duration</span>
                </div>
                <input
                  type="text"
                  value={currentDetail.hero.idealDuration}
                  onChange={(e) => updateHero("idealDuration", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. OVERVIEW & HIGHLIGHTS TAB */}
      {subTab === "overview" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-orange-400" />
              About Section Copy
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Tag Badge
                </label>
                <input
                  type="text"
                  value={currentDetail.overview.badge}
                  onChange={(e) => updateOverview("badge", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={currentDetail.overview.title}
                  onChange={(e) => updateOverview("title", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Paragraph 1
              </label>
              <textarea
                rows={3}
                value={currentDetail.overview.p1}
                onChange={(e) => updateOverview("p1", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Paragraph 2
              </label>
              <textarea
                rows={3}
                value={currentDetail.overview.p2 || ""}
                onChange={(e) => updateOverview("p2", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Highlights Checklist */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Key Highlights Checklist
                </h3>
                <p className="text-xs text-slate-400">
                  Green tick points displayed on the overview section.
                </p>
              </div>

              <button
                type="button"
                onClick={addHighlight}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Highlight</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(currentDetail.overview.highlights || []).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-xl border border-slate-800 bg-slate-950/70"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateHighlight(idx, e.target.value)}
                    className="flex-1 bg-transparent text-xs text-white focus:outline-none font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(idx)}
                    className="p-1 rounded text-red-400 hover:bg-red-950/40 transition cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. QUICK FACTS TAB */}
      {subTab === "facts" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">
                Quick Travel Facts Card ({(currentDetail.quickFacts || []).length})
              </h3>
              <p className="text-xs text-slate-400">
                Key details like entry fees, timings, distance, and guidelines.
              </p>
            </div>

            <button
              type="button"
              onClick={addQuickFact}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Travel Fact</span>
            </button>
          </div>

          <div className="space-y-3">
            {(currentDetail.quickFacts || []).map((fact, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3 rounded-xl border border-slate-800 bg-slate-950/70"
              >
                <div className="sm:col-span-5">
                  <label className="text-[10px] text-slate-400 block mb-0.5">Label</label>
                  <input
                    type="text"
                    value={fact.label}
                    onChange={(e) => updateQuickFact(idx, "label", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                    placeholder="e.g. Entry Fee"
                  />
                </div>

                <div className="sm:col-span-6">
                  <label className="text-[10px] text-slate-400 block mb-0.5">Value</label>
                  <input
                    type="text"
                    value={fact.value}
                    onChange={(e) => updateQuickFact(idx, "value", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-emerald-400 font-semibold focus:border-orange-500 focus:outline-none"
                    placeholder="e.g. Free Entry"
                  />
                </div>

                <div className="sm:col-span-1 flex justify-end pt-3 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => removeQuickFact(idx)}
                    className="p-1.5 rounded-lg border border-red-900/60 bg-red-950/40 text-red-400 hover:bg-red-900/60 transition cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. PHOTO GALLERY TAB */}
      {subTab === "gallery" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Images className="h-4 w-4 text-orange-400" />
                Photo Gallery Showcase ({(currentDetail.gallery || []).length})
              </h3>
              <p className="text-xs text-slate-400">
                Upload photos from your device, add captions and categories.
              </p>
            </div>

            <button
              type="button"
              onClick={addGalleryImage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(currentDetail.gallery || []).map((item, idx) => (
              <div
                key={item.id || idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-orange-400">Photo #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    className="p-1 rounded text-red-400 hover:bg-red-950/40 transition cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <ImageUploader
                  label="Upload Device Image"
                  currentImage={item.image}
                  onImageSelected={(url: string) => updateGalleryImage(idx, "image", url)}
                />

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Photo Caption
                  </label>
                  <input
                    type="text"
                    value={item.caption}
                    onChange={(e) => updateGalleryImage(idx, "caption", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Tag / Category Label
                  </label>
                  <input
                    type="text"
                    value={item.tag || ""}
                    onChange={(e) => updateGalleryImage(idx, "tag", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                    placeholder="e.g. Sunset & Waves"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. THINGS TO DO TAB */}
      {subTab === "thingsToDo" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Compass className="h-4 w-4 text-orange-400" />
                Things to Do at {currentDisplayName} ({(currentDetail.thingsToDo || []).length})
              </h3>
              <p className="text-xs text-slate-400">
                Manage activity cards displayed in the Things to Do section.
              </p>
            </div>

            <button
              type="button"
              onClick={addThingToDo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Activity</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {(currentDetail.thingsToDo || []).map((item, idx) => (
              <div
                key={item.id || idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-orange-400">Activity #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeThingToDo(idx)}
                    className="p-1 rounded text-red-400 hover:bg-red-950/40 transition cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Activity Title
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateThingToDo(idx, "title", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Icon Theme
                  </label>
                  <select
                    value={item.icon || "waves"}
                    onChange={(e) => updateThingToDo(idx, "icon", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value="waves">Waves (Water Sports & Boats)</option>
                    <option value="sun">Sun (Sunset & Walks)</option>
                    <option value="car">Car (Rides & Travel)</option>
                    <option value="sparkles">Sparkles (Culture & Fun)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => updateThingToDo(idx, "description", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
