"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Compass,
} from "lucide-react";
import { ContactData } from "@/lib/cms";
import ImageUploader from "@/components/admin/ImageUploader";

interface ContactAdminProps {
  data: ContactData;
  onChange: (updated: ContactData) => void;
  activeSubTab?: "hero" | "quickInfo" | "form" | "widgets";
  onSubTabChange?: (tab: "hero" | "quickInfo" | "form" | "widgets") => void;
}

export default function ContactAdmin({
  data,
  onChange,
  activeSubTab,
  onSubTabChange,
}: ContactAdminProps) {
  const [internalSubTab, setInternalSubTab] = useState<
    "hero" | "quickInfo" | "form" | "widgets"
  >("hero");

  const subTab = activeSubTab || internalSubTab;
  const setSubTab = (tab: "hero" | "quickInfo" | "form" | "widgets") => {
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

  const updateQuickInfo = (
    key: "location" | "phone" | "email" | "workingHours",
    field: string,
    val: string
  ) => {
    onChange({
      ...data,
      quickInfo: {
        ...data.quickInfo,
        [key]: {
          ...data.quickInfo[key],
          [field]: val,
        },
      },
    });
  };

  const updateFormSection = (field: string, val: any) => {
    onChange({
      ...data,
      formSection: {
        ...data.formSection,
        [field]: val,
      },
    });
  };

  const updateMapWidget = (field: string, val: any) => {
    onChange({
      ...data,
      mapWidget: {
        ...data.mapWidget,
        [field]: val,
      },
    });
  };

  const updateCustomTour = (field: string, val: any) => {
    onChange({
      ...data,
      customTourBanner: {
        ...data.customTourBanner,
        [field]: val,
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
            <span>Contact Page CMS</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage contact details, phone, email, working hours, inquiry form text, map, and promo banner.
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
            Hero Banner
          </button>
          <button
            type="button"
            onClick={() => setSubTab("quickInfo")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              subTab === "quickInfo"
                ? "bg-orange-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            4 Info Cards
          </button>
          <button
            type="button"
            onClick={() => setSubTab("form")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              subTab === "form"
                ? "bg-orange-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Form Section
          </button>
          <button
            type="button"
            onClick={() => setSubTab("widgets")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              subTab === "widgets"
                ? "bg-orange-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Map &amp; Tour Promo
          </button>
        </div>
      </div>

      {/* ================= SUBTAB: HERO BANNER ================= */}
      {subTab === "hero" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                Title Prefix
              </label>
              <input
                type="text"
                value={data.hero.titlePrefix}
                onChange={(e) => updateHero("titlePrefix", e.target.value)}
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
              label="Contact Hero Lighthouse Backdrop (Device Upload)"
              currentImage={data.hero.backdropImage}
              onImageSelected={(url: string) => updateHero("backdropImage", url)}
            />
          </div>
        </div>
      )}

      {/* ================= SUBTAB: 4 INFO CARDS ================= */}
      {subTab === "quickInfo" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Location */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-400" />
                <h3 className="text-xs font-bold text-white">1. Our Location Card</h3>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Title</label>
                <input
                  type="text"
                  value={data.quickInfo.location.title}
                  onChange={(e) => updateQuickInfo("location", "title", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Line 1 (City/State)</label>
                <input
                  type="text"
                  value={data.quickInfo.location.line1}
                  onChange={(e) => updateQuickInfo("location", "line1", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Line 2 (Country)</label>
                <input
                  type="text"
                  value={data.quickInfo.location.line2}
                  onChange={(e) => updateQuickInfo("location", "line2", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Card 2: Phone */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-400" />
                <h3 className="text-xs font-bold text-white">2. Call Us Card</h3>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Title</label>
                <input
                  type="text"
                  value={data.quickInfo.phone.title}
                  onChange={(e) => updateQuickInfo("phone", "title", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={data.quickInfo.phone.number}
                  onChange={(e) => updateQuickInfo("phone", "number", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-orange-400 font-bold focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Timing / Days</label>
                <input
                  type="text"
                  value={data.quickInfo.phone.hours}
                  onChange={(e) => updateQuickInfo("phone", "hours", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Card 3: Email */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-400" />
                <h3 className="text-xs font-bold text-white">3. Email Us Card</h3>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Title</label>
                <input
                  type="text"
                  value={data.quickInfo.email.title}
                  onChange={(e) => updateQuickInfo("email", "title", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Email Address</label>
                <input
                  type="text"
                  value={data.quickInfo.email.address}
                  onChange={(e) => updateQuickInfo("email", "address", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-orange-400 font-bold focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Reply Note</label>
                <input
                  type="text"
                  value={data.quickInfo.email.note}
                  onChange={(e) => updateQuickInfo("email", "note", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Card 4: Working Hours */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-400" />
                <h3 className="text-xs font-bold text-white">4. Working Hours Card</h3>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Title</label>
                <input
                  type="text"
                  value={data.quickInfo.workingHours.title}
                  onChange={(e) => updateQuickInfo("workingHours", "title", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Days</label>
                <input
                  type="text"
                  value={data.quickInfo.workingHours.days}
                  onChange={(e) => updateQuickInfo("workingHours", "days", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Hours</label>
                <input
                  type="text"
                  value={data.quickInfo.workingHours.hours}
                  onChange={(e) => updateQuickInfo("workingHours", "hours", e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUBTAB: FORM SECTION ================= */}
      {subTab === "form" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Badge
              </label>
              <input
                type="text"
                value={data.formSection.badge}
                onChange={(e) => updateFormSection("badge", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Title Prefix
              </label>
              <input
                type="text"
                value={data.formSection.titlePrefix}
                onChange={(e) => updateFormSection("titlePrefix", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Title Highlight (Orange)
              </label>
              <input
                type="text"
                value={data.formSection.titleHighlight}
                onChange={(e) => updateFormSection("titleHighlight", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-orange-400 font-bold focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Description Copy
            </label>
            <textarea
              rows={2}
              value={data.formSection.description}
              onChange={(e) => updateFormSection("description", e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-xs text-white focus:border-orange-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* ================= SUBTAB: MAP & PROMO WIDGETS ================= */}
      {subTab === "widgets" && (
        <div className="space-y-6">
          {/* Map Card Settings */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-4">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-400" />
              <span>Map Widget Settings</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Badge Title
                </label>
                <input
                  type="text"
                  value={data.mapWidget.badgeTitle}
                  onChange={(e) => updateMapWidget("badgeTitle", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Badge Subtitle
                </label>
                <input
                  type="text"
                  value={data.mapWidget.badgeSubtitle}
                  onChange={(e) => updateMapWidget("badgeSubtitle", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Google Maps External URL
                </label>
                <input
                  type="text"
                  value={data.mapWidget.googleMapsUrl}
                  onChange={(e) => updateMapWidget("googleMapsUrl", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <ImageUploader
                label="Map Illustration / Graphic (Device Upload)"
                currentImage={data.mapWidget.mapImage}
                onImageSelected={(url: string) => updateMapWidget("mapImage", url)}
              />
            </div>
          </div>

          {/* Custom Tour Package Promo Banner Settings */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-4">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <Compass className="h-4 w-4 text-orange-400" />
              <span>Custom Tour Package Banner</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Title Prefix
                </label>
                <input
                  type="text"
                  value={data.customTourBanner.titlePrefix}
                  onChange={(e) =>
                    updateCustomTour("titlePrefix", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Title Highlight (Orange)
                </label>
                <input
                  type="text"
                  value={data.customTourBanner.titleHighlight}
                  onChange={(e) =>
                    updateCustomTour("titleHighlight", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-orange-400 font-bold focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={data.customTourBanner.description}
                onChange={(e) =>
                  updateCustomTour("description", e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-xs text-white focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={data.customTourBanner.buttonText}
                  onChange={(e) =>
                    updateCustomTour("buttonText", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Button Link Target
                </label>
                <input
                  type="text"
                  value={data.customTourBanner.buttonLink}
                  onChange={(e) =>
                    updateCustomTour("buttonLink", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <ImageUploader
                label="Houseboat Graphic / Photo (Device Upload)"
                currentImage={data.customTourBanner.houseboatImage}
                onImageSelected={(url: string) =>
                  updateCustomTour("houseboatImage", url)
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
