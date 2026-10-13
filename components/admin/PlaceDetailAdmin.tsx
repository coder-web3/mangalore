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
  Car,
  Calendar,
  Lightbulb,
  HelpCircle,
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
    | "hero"
    | "overview"
    | "facts"
    | "gallery"
    | "thingsToDo"
    | "howToReach"
    | "bestTime"
    | "nearby"
    | "tips"
    | "faqs"
  >("hero");

  // Get or initialize detail for activeSlug
  const matchedPlace = placesList.find(
    (p) => p.slug === activeSlug || p.id === activeSlug
  );

  const defaultPlaceFallback = getDefaultPlaceDetail(
    matchedPlace || {
      name: activeSlug,
      category: "Beaches",
      description: "Coastal tourist destination in Mangalore",
    }
  );

  const currentDetail: PanamburDetailData =
    data.placeDetails?.[activeSlug] ||
    (activeSlug === "panambur-beach" && data.panamburDetail
      ? data.panamburDetail
      : defaultPlaceFallback);

  const howToReachData = currentDetail.howToReach || defaultPlaceFallback.howToReach!;
  const bestTimeData = currentDetail.bestTimeSection || defaultPlaceFallback.bestTimeSection!;
  const nearbyPlacesData = currentDetail.nearbyPlaces || defaultPlaceFallback.nearbyPlaces!;
  const travelTipsData = currentDetail.travelTips || defaultPlaceFallback.travelTips!;
  const faqsData = currentDetail.faqs || defaultPlaceFallback.faqs!;

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

  // Updaters for 5 New Sections
  const updateHowToReach = (field: string, val: any) => {
    updateCurrentDetail({
      ...currentDetail,
      howToReach: {
        ...howToReachData,
        [field]: val,
      },
    });
  };

  const updateReachMode = (idx: number, field: string, val: string) => {
    const updatedModes = [...howToReachData.modes];
    updatedModes[idx] = { ...updatedModes[idx], [field]: val };
    updateHowToReach("modes", updatedModes);
  };

  const updateBestTime = (field: string, val: any) => {
    updateCurrentDetail({
      ...currentDetail,
      bestTimeSection: {
        ...bestTimeData,
        [field]: val,
      },
    });
  };

  const updateSeason = (idx: number, field: string, val: any) => {
    const updatedSeasons = [...bestTimeData.seasons];
    updatedSeasons[idx] = { ...updatedSeasons[idx], [field]: val };
    updateBestTime("seasons", updatedSeasons);
  };

  const updateNearby = (field: string, val: any) => {
    updateCurrentDetail({
      ...currentDetail,
      nearbyPlaces: {
        ...nearbyPlacesData,
        [field]: val,
      },
    });
  };

  const updateNearbyPlace = (idx: number, field: string, val: string) => {
    const updatedPlaces = [...nearbyPlacesData.places];
    updatedPlaces[idx] = { ...updatedPlaces[idx], [field]: val };
    updateNearby("places", updatedPlaces);
  };

  const addNearbyPlace = () => {
    const newPlace = {
      id: Date.now().toString(),
      name: "New Nearby Attraction",
      distance: "5 km away",
      travelTime: "10 mins drive",
      category: "Sightseeing",
      image: "/panambur.avif",
      link: "/places-to-visit",
    };
    updateNearby("places", [...nearbyPlacesData.places, newPlace]);
  };

  const removeNearbyPlace = (idx: number) => {
    const updatedPlaces = nearbyPlacesData.places.filter((_, i) => i !== idx);
    updateNearby("places", updatedPlaces);
  };

  const updateTravelTips = (field: string, val: any) => {
    updateCurrentDetail({
      ...currentDetail,
      travelTips: {
        ...travelTipsData,
        [field]: val,
      },
    });
  };

  const updateTip = (idx: number, field: string, val: string) => {
    const updatedTips = [...travelTipsData.tips];
    updatedTips[idx] = { ...updatedTips[idx], [field]: val };
    updateTravelTips("tips", updatedTips);
  };

  const addTip = () => {
    const newTip = {
      id: Date.now().toString(),
      title: "New Practical Travel Advice",
      description: "Helpful suggestion for travelers visiting this attraction.",
      category: "General",
    };
    updateTravelTips("tips", [...travelTipsData.tips, newTip]);
  };

  const removeTip = (idx: number) => {
    const updatedTips = travelTipsData.tips.filter((_, i) => i !== idx);
    updateTravelTips("tips", updatedTips);
  };

  const updateFaqs = (field: string, val: any) => {
    updateCurrentDetail({
      ...currentDetail,
      faqs: {
        ...faqsData,
        [field]: val,
      },
    });
  };

  const updateFaq = (idx: number, field: string, val: string) => {
    const updatedItems = [...faqsData.items];
    updatedItems[idx] = { ...updatedItems[idx], [field]: val };
    updateFaqs("items", updatedItems);
  };

  const addFaq = () => {
    const newFaq = {
      id: Date.now().toString(),
      question: `Is parking available at ${matchedPlace?.name || "this place"}?`,
      answer: "Yes, designated vehicle parking spaces are available on site with nominal charges.",
    };
    updateFaqs("items", [...faqsData.items, newFaq]);
  };

  const removeFaq = (idx: number) => {
    const updatedItems = faqsData.items.filter((_, i) => i !== idx);
    updateFaqs("items", updatedItems);
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
          <button
            type="button"
            onClick={() => setSubTab("howToReach")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              subTab === "howToReach"
                ? "bg-orange-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            How to Reach
          </button>
          <button
            type="button"
            onClick={() => setSubTab("bestTime")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              subTab === "bestTime"
                ? "bg-orange-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Best Time
          </button>
          <button
            type="button"
            onClick={() => setSubTab("nearby")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              subTab === "nearby"
                ? "bg-orange-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Nearby ({nearbyPlacesData.places.length})
          </button>
          <button
            type="button"
            onClick={() => setSubTab("tips")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              subTab === "tips"
                ? "bg-orange-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Travel Tips ({travelTipsData.tips.length})
          </button>
          <button
            type="button"
            onClick={() => setSubTab("faqs")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              subTab === "faqs"
                ? "bg-orange-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            FAQs ({faqsData.items.length})
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

      {/* 8. HOW TO REACH TAB */}
      {subTab === "howToReach" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Car className="h-4 w-4 text-orange-400" />
              How to Reach Settings
            </h3>
            <p className="text-xs text-slate-400">
              Customize airport, railway, city bus, and road connectivity guidelines.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Section Badge
                </label>
                <input
                  type="text"
                  value={howToReachData.badge}
                  onChange={(e) => updateHowToReach("badge", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={howToReachData.title}
                  onChange={(e) => updateHowToReach("title", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Intro Description
                </label>
                <textarea
                  rows={2}
                  value={howToReachData.description}
                  onChange={(e) => updateHowToReach("description", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 4 Transit Mode Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {howToReachData.modes.map((mode, idx) => (
              <div
                key={mode.id || idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-orange-400">
                    Mode #{idx + 1} ({mode.icon.toUpperCase()})
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
                    {mode.distance}
                  </span>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Mode Title
                  </label>
                  <input
                    type="text"
                    value={mode.title}
                    onChange={(e) => updateReachMode(idx, "title", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Distance / Travel Time Tag
                  </label>
                  <input
                    type="text"
                    value={mode.distance}
                    onChange={(e) => updateReachMode(idx, "distance", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Transit Details & Tips
                  </label>
                  <textarea
                    rows={2}
                    value={mode.description}
                    onChange={(e) => updateReachMode(idx, "description", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. BEST TIME TO VISIT TAB */}
      {subTab === "bestTime" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-400" />
              Best Time to Visit Settings
            </h3>
            <p className="text-xs text-slate-400">
              Manage recommended seasons, peak climate timings, and seasonal breakdowns.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Section Badge
                </label>
                <input
                  type="text"
                  value={bestTimeData.badge}
                  onChange={(e) => updateBestTime("badge", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={bestTimeData.title}
                  onChange={(e) => updateBestTime("title", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Intro Description
                </label>
                <textarea
                  rows={2}
                  value={bestTimeData.description}
                  onChange={(e) => updateBestTime("description", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Recommended Season Banner
                </label>
                <input
                  type="text"
                  value={bestTimeData.recommendedSeason}
                  onChange={(e) => updateBestTime("recommendedSeason", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Ideal Time of Day Banner
                </label>
                <input
                  type="text"
                  value={bestTimeData.idealTimeOfDay}
                  onChange={(e) => updateBestTime("idealTimeOfDay", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 3 Seasons Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bestTimeData.seasons.map((season, idx) => (
              <div
                key={season.id || idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-orange-400">
                    {season.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
                    {season.temp}
                  </span>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Months Active
                  </label>
                  <input
                    type="text"
                    value={season.months}
                    onChange={(e) => updateSeason(idx, "months", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Temperature Range
                  </label>
                  <input
                    type="text"
                    value={season.temp}
                    onChange={(e) => updateSeason(idx, "temp", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Status Tag
                  </label>
                  <input
                    type="text"
                    value={season.status}
                    onChange={(e) => updateSeason(idx, "status", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Season Description
                  </label>
                  <textarea
                    rows={2}
                    value={season.description}
                    onChange={(e) => updateSeason(idx, "description", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 10. NEARBY PLACES TAB */}
      {subTab === "nearby" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange-400" />
                  Nearby Attractions Settings
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage attractions travelers can combine with this visit.
                </p>
              </div>

              <button
                type="button"
                onClick={addNearbyPlace}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white shadow-sm transition cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Attraction</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Section Badge
                </label>
                <input
                  type="text"
                  value={nearbyPlacesData.badge}
                  onChange={(e) => updateNearby("badge", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={nearbyPlacesData.title}
                  onChange={(e) => updateNearby("title", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Intro Description
                </label>
                <textarea
                  rows={2}
                  value={nearbyPlacesData.description}
                  onChange={(e) => updateNearby("description", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Nearby Places Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nearbyPlacesData.places.map((place, idx) => (
              <div
                key={place.id || idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-orange-400">
                    Place #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeNearbyPlace(idx)}
                    className="p-1 rounded text-red-400 hover:bg-red-950/40 transition cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Attraction Name
                  </label>
                  <input
                    type="text"
                    value={place.name}
                    onChange={(e) => updateNearbyPlace(idx, "name", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Distance
                    </label>
                    <input
                      type="text"
                      value={place.distance}
                      onChange={(e) => updateNearbyPlace(idx, "distance", e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Travel Time
                    </label>
                    <input
                      type="text"
                      value={place.travelTime}
                      onChange={(e) => updateNearbyPlace(idx, "travelTime", e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={place.category}
                    onChange={(e) => updateNearbyPlace(idx, "category", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Page Route Link
                  </label>
                  <input
                    type="text"
                    value={place.link || ""}
                    onChange={(e) => updateNearbyPlace(idx, "link", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <ImageUploader
                  label="Thumbnail Photo"
                  value={place.image}
                  onChange={(newUrl) => updateNearbyPlace(idx, "image", newUrl)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 11. TRAVEL TIPS TAB */}
      {subTab === "tips" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-orange-400" />
                  Travel Tips Settings
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage practical guidelines, attire, and safety advice.
                </p>
              </div>

              <button
                type="button"
                onClick={addTip}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white shadow-sm transition cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Tip</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Section Badge
                </label>
                <input
                  type="text"
                  value={travelTipsData.badge}
                  onChange={(e) => updateTravelTips("badge", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={travelTipsData.title}
                  onChange={(e) => updateTravelTips("title", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Intro Description
                </label>
                <textarea
                  rows={2}
                  value={travelTipsData.description}
                  onChange={(e) => updateTravelTips("description", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Travel Tips Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {travelTipsData.tips.map((tip, idx) => (
              <div
                key={tip.id || idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-orange-400">Tip #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeTip(idx)}
                    className="p-1 rounded text-red-400 hover:bg-red-950/40 transition cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Tip Title
                  </label>
                  <input
                    type="text"
                    value={tip.title}
                    onChange={(e) => updateTip(idx, "title", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={tip.category || "General"}
                    onChange={(e) => updateTip(idx, "category", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Advice Details
                  </label>
                  <textarea
                    rows={3}
                    value={tip.description}
                    onChange={(e) => updateTip(idx, "description", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 12. FREQUENTLY ASKED QUESTIONS TAB */}
      {subTab === "faqs" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-orange-400" />
                  Frequently Asked Questions (FAQs)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Add and modify common questions travelers ask about this place.
                </p>
              </div>

              <button
                type="button"
                onClick={addFaq}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white shadow-sm transition cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add FAQ</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Section Badge
                </label>
                <input
                  type="text"
                  value={faqsData.badge}
                  onChange={(e) => updateFaqs("badge", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={faqsData.title}
                  onChange={(e) => updateFaqs("title", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Intro Description
                </label>
                <textarea
                  rows={2}
                  value={faqsData.description}
                  onChange={(e) => updateFaqs("description", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* FAQ Items List */}
          <div className="space-y-3">
            {faqsData.items.map((faq, idx) => (
              <div
                key={faq.id || idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-orange-400">
                    Question #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFaq(idx)}
                    className="p-1 rounded text-red-400 hover:bg-red-950/40 transition cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Question Text
                  </label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFaq(idx, "question", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Answer Details
                  </label>
                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => updateFaq(idx, "answer", e.target.value)}
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
