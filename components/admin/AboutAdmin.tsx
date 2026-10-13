"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Users,
  MapPin,
  Heart,
  Eye,
  Camera,
  BookOpen,
  Landmark,
  Palmtree,
  Quote,
  Layers,
} from "lucide-react";
import { AboutData } from "@/lib/cms";
import ImageUploader from "@/components/admin/ImageUploader";

interface AboutAdminProps {
  data: AboutData;
  onChange: (updated: AboutData) => void;
  activeSubTab?: "hero" | "story" | "different" | "vision" | "team";
  onSubTabChange?: (tab: "hero" | "story" | "different" | "vision" | "team") => void;
}

export default function AboutAdmin({
  data,
  onChange,
  activeSubTab,
  onSubTabChange,
}: AboutAdminProps) {
  const [internalSubTab, setInternalSubTab] = useState<
    "hero" | "story" | "different" | "vision" | "team"
  >("hero");

  const subTab = activeSubTab || internalSubTab;
  const setSubTab = (tab: "hero" | "story" | "different" | "vision" | "team") => {
    if (onSubTabChange) onSubTabChange(tab);
    setInternalSubTab(tab);
  };

  const updateHero = (field: string, val: any) => {
    onChange({
      ...data,
      hero: {
        ...data.hero,
        [field]: val,
      },
    });
  };

  const updateHeroStat = (
    statKey: "travelers" | "places" | "rating",
    field: "count" | "label",
    val: string
  ) => {
    onChange({
      ...data,
      hero: {
        ...data.hero,
        stats: {
          ...data.hero.stats,
          [statKey]: {
            ...data.hero.stats[statKey],
            [field]: val,
          },
        },
      },
    });
  };

  const updateStory = (field: string, val: any) => {
    onChange({
      ...data,
      story: {
        ...data.story,
        [field]: val,
      },
    });
  };

  const updateStoryFeature = (index: number, field: string, val: string) => {
    const updated = [...data.story.features];
    updated[index] = { ...updated[index], [field]: val };
    onChange({
      ...data,
      story: {
        ...data.story,
        features: updated,
      },
    });
  };

  const updateDifferent = (field: string, val: any) => {
    onChange({
      ...data,
      whatMakesUsDifferent: {
        ...data.whatMakesUsDifferent,
        [field]: val,
      },
    });
  };

  const updateDifferentCard = (index: number, field: string, val: any) => {
    const updated = [...data.whatMakesUsDifferent.cards];
    updated[index] = { ...updated[index], [field]: val };
    onChange({
      ...data,
      whatMakesUsDifferent: {
        ...data.whatMakesUsDifferent,
        cards: updated,
      },
    });
  };

  const updateVision = (field: string, val: any) => {
    onChange({
      ...data,
      vision: {
        ...data.vision,
        [field]: val,
      },
    });
  };

  const updateTeam = (field: string, val: any) => {
    onChange({
      ...data,
      team: {
        ...data.team,
        [field]: val,
      },
    });
  };

  const updateTeamPillar = (index: number, field: string, val: string) => {
    const updated = [...data.team.pillars];
    updated[index] = { ...updated[index], [field]: val };
    onChange({
      ...data,
      team: {
        ...data.team,
        pillars: updated,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-tabs */}
      <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-orange-400" />
            <span>About Us Page CMS</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage the hero banner, trust metrics, story collage, vision banner, and team values.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setSubTab("hero")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              subTab === "hero"
                ? "bg-orange-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Hero &amp; Stats
          </button>
          <button
            type="button"
            onClick={() => setSubTab("story")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              subTab === "story"
                ? "bg-orange-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Our Story &amp; Collage
          </button>
          <button
            type="button"
            onClick={() => setSubTab("different")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              subTab === "different"
                ? "bg-orange-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            What Makes Us Different
          </button>
          <button
            type="button"
            onClick={() => setSubTab("vision")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              subTab === "vision"
                ? "bg-orange-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Our Vision
          </button>
          <button
            type="button"
            onClick={() => setSubTab("team")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              subTab === "team"
                ? "bg-orange-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Team &amp; Mission
          </button>
        </div>
      </div>

      {/* ================= SUBTAB: HERO & STATS ================= */}
      {subTab === "hero" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Badge Tag
              </label>
              <input
                type="text"
                value={data.hero.badge}
                onChange={(e) => updateHero("badge", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Title Line 1
              </label>
              <input
                type="text"
                value={data.hero.titleLine1}
                onChange={(e) => updateHero("titleLine1", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Title Line 2
              </label>
              <input
                type="text"
                value={data.hero.titleLine2}
                onChange={(e) => updateHero("titleLine2", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Title Highlight (Orange)
              </label>
              <input
                type="text"
                value={data.hero.titleHighlight}
                onChange={(e) => updateHero("titleHighlight", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-orange-400 font-bold focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Description Paragraph
            </label>
            <textarea
              rows={3}
              value={data.hero.description}
              onChange={(e) => updateHero("description", e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-xs text-white focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <ImageUploader
              label="Hero Lighthouse Coastal Backdrop (Device Upload)"
              currentImage={data.hero.backdropImage}
              onImageSelected={(url: string) => updateHero("backdropImage", url)}
            />
          </div>

          {/* 3 Trust Stat Badges */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-200">
              Trust &amp; Experience Metrics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Stat 1 */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 space-y-2">
                <label className="text-[11px] font-semibold text-slate-400 block">
                  Metric 1: Travelers
                </label>
                <input
                  type="text"
                  placeholder="e.g. 10K+"
                  value={data.hero.stats.travelers.count}
                  onChange={(e) =>
                    updateHeroStat("travelers", "count", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Label: Happy Travelers"
                  value={data.hero.stats.travelers.label}
                  onChange={(e) =>
                    updateHeroStat("travelers", "label", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300 focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Stat 2 */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 space-y-2">
                <label className="text-[11px] font-semibold text-slate-400 block">
                  Metric 2: Places
                </label>
                <input
                  type="text"
                  placeholder="e.g. 50+"
                  value={data.hero.stats.places.count}
                  onChange={(e) =>
                    updateHeroStat("places", "count", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Label: Places Covered"
                  value={data.hero.stats.places.label}
                  onChange={(e) =>
                    updateHeroStat("places", "label", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300 focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Stat 3 */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 space-y-2">
                <label className="text-[11px] font-semibold text-slate-400 block">
                  Metric 3: Rating
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4.8"
                  value={data.hero.stats.rating.count}
                  onChange={(e) =>
                    updateHeroStat("rating", "count", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Label: Traveler Rating"
                  value={data.hero.stats.rating.label}
                  onChange={(e) =>
                    updateHeroStat("rating", "label", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300 focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUBTAB: OUR STORY & COLLAGE ================= */}
      {subTab === "story" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Section Badge
              </label>
              <input
                type="text"
                value={data.story.badge}
                onChange={(e) => updateStory("badge", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Title Prefix
              </label>
              <input
                type="text"
                value={data.story.title}
                onChange={(e) => updateStory("title", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Title Highlight (Orange)
              </label>
              <input
                type="text"
                value={data.story.titleHighlight}
                onChange={(e) => updateStory("titleHighlight", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-orange-400 font-bold focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Story Paragraph
            </label>
            <textarea
              rows={3}
              value={data.story.description}
              onChange={(e) => updateStory("description", e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-xs text-white focus:border-orange-500 focus:outline-none"
            />
          </div>

          {/* Mosaic Photos Setup */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-4">
            <h3 className="text-xs font-bold text-slate-200">
              Mosaic Photo Collage (3 Images)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Photo 1: Beach Curve */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 space-y-3">
                <span className="text-[11px] font-bold text-orange-400">
                  1. Left Vertical Beach Photo
                </span>
                <ImageUploader
                  currentImage={data.story.beachPhoto}
                  onImageSelected={(url: string) => updateStory("beachPhoto", url)}
                />
                <input
                  type="text"
                  placeholder="Badge Title: Mangalore"
                  value={data.story.beachBadgeTitle}
                  onChange={(e) => updateStory("beachBadgeTitle", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Badge Subtitle"
                  value={data.story.beachBadgeSubtitle}
                  onChange={(e) => updateStory("beachBadgeSubtitle", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300 focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Photo 2: Temple */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 space-y-3">
                <span className="text-[11px] font-bold text-orange-400">
                  2. Top-Right Temple Photo
                </span>
                <ImageUploader
                  currentImage={data.story.templePhoto}
                  onImageSelected={(url: string) => updateStory("templePhoto", url)}
                />
                <input
                  type="text"
                  placeholder="Pill Tag: Heritage & Culture"
                  value={data.story.templeBadge}
                  onChange={(e) => updateStory("templeBadge", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Photo 3: Sunset Beach */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 space-y-3">
                <span className="text-[11px] font-bold text-orange-400">
                  3. Bottom-Right Sunset Photo
                </span>
                <ImageUploader
                  currentImage={data.story.sunsetPhoto}
                  onImageSelected={(url: string) => updateStory("sunsetPhoto", url)}
                />
                <input
                  type="text"
                  placeholder="Pill Tag: Beaches & Nature"
                  value={data.story.sunsetBadge}
                  onChange={(e) => updateStory("sunsetBadge", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 3 Story Features */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-200">
              3 Feature Bullets
            </h3>
            <div className="space-y-3">
              {data.story.features.map((feat, idx) => (
                <div
                  key={feat.id || idx}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-3 grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">
                      Feature Title
                    </label>
                    <input
                      type="text"
                      value={feat.title}
                      onChange={(e) =>
                        updateStoryFeature(idx, "title", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-slate-400 block mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={feat.description}
                      onChange={(e) =>
                        updateStoryFeature(idx, "description", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= SUBTAB: WHAT MAKES US DIFFERENT ================= */}
      {subTab === "different" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Section Badge
              </label>
              <input
                type="text"
                value={data.whatMakesUsDifferent.badge}
                onChange={(e) => updateDifferent("badge", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Title Prefix
              </label>
              <input
                type="text"
                value={data.whatMakesUsDifferent.titleLine1}
                onChange={(e) => updateDifferent("titleLine1", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Title Highlight (Orange)
              </label>
              <input
                type="text"
                value={data.whatMakesUsDifferent.titleHighlight}
                onChange={(e) => updateDifferent("titleHighlight", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-orange-400 font-bold focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Description Paragraph
            </label>
            <textarea
              rows={2}
              value={data.whatMakesUsDifferent.description}
              onChange={(e) => updateDifferent("description", e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-xs text-white focus:border-orange-500 focus:outline-none"
            />
          </div>

          {/* 4 Value Cards */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-200">
              4 Value Cards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.whatMakesUsDifferent.cards.map((card, idx) => (
                <div
                  key={card.id || idx}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-3.5 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-orange-400">
                      Card #{idx + 1}
                    </span>
                    <select
                      value={card.icon}
                      onChange={(e) =>
                        updateDifferentCard(idx, "icon", e.target.value)
                      }
                      className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-[11px] text-slate-200 focus:outline-none"
                    >
                      <option value="map">Map Pin (Places)</option>
                      <option value="book">Book (Guides)</option>
                      <option value="sparkles">Sparkles (Experiences)</option>
                      <option value="camera">Camera (Updates)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">
                      Card Title
                    </label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) =>
                        updateDifferentCard(idx, "title", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">
                      Card Description
                    </label>
                    <textarea
                      rows={2}
                      value={card.description}
                      onChange={(e) =>
                        updateDifferentCard(idx, "description", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-slate-300 focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= SUBTAB: OUR VISION ================= */}
      {subTab === "vision" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Badge
              </label>
              <input
                type="text"
                value={data.vision.badge}
                onChange={(e) => updateVision("badge", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Title Prefix
              </label>
              <input
                type="text"
                value={data.vision.title}
                onChange={(e) => updateVision("title", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Title Highlight (Orange)
              </label>
              <input
                type="text"
                value={data.vision.titleHighlight}
                onChange={(e) => updateVision("titleHighlight", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-orange-400 font-bold focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Vision Description
            </label>
            <textarea
              rows={3}
              value={data.vision.description}
              onChange={(e) => updateVision("description", e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-xs text-white focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <ImageUploader
              label="Vision Panorama Backdrop Image (Device Upload)"
              currentImage={data.vision.backdropImage}
              onImageSelected={(url: string) => updateVision("backdropImage", url)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Floating Quote Box Text
            </label>
            <textarea
              rows={2}
              value={data.vision.quoteText}
              onChange={(e) => updateVision("quoteText", e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-xs text-white focus:border-orange-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* ================= SUBTAB: TEAM & MISSION ================= */}
      {subTab === "team" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Badge
              </label>
              <input
                type="text"
                value={data.team.badge}
                onChange={(e) => updateTeam("badge", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Title Prefix
              </label>
              <input
                type="text"
                value={data.team.title}
                onChange={(e) => updateTeam("title", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Title Highlight (Orange)
              </label>
              <input
                type="text"
                value={data.team.titleHighlight}
                onChange={(e) => updateTeam("titleHighlight", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-orange-400 font-bold focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Team Subtitle
            </label>
            <input
              type="text"
              value={data.team.description}
              onChange={(e) => updateTeam("description", e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <ImageUploader
              label="Team / Coastal Road Photo (Device Upload)"
              currentImage={data.team.teamPhoto}
              onImageSelected={(url: string) => updateTeam("teamPhoto", url)}
            />
          </div>

          {/* 3 Pillars */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-200">
              3 Team Pillars
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {data.team.pillars.map((pill, idx) => (
                <div
                  key={pill.id || idx}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-3 space-y-2"
                >
                  <label className="text-[11px] font-bold text-orange-400 block">
                    Pillar #{idx + 1}
                  </label>
                  <input
                    type="text"
                    value={pill.title}
                    onChange={(e) =>
                      updateTeamPillar(idx, "title", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={pill.description}
                    onChange={(e) =>
                      updateTeamPillar(idx, "description", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-slate-300 focus:border-orange-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
