"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  Sparkles,
  MapPin,
  Layers,
  Utensils,
  PhoneCall,
  Plus,
  Trash2,
  ShieldCheck,
  Compass,
  Palmtree,
  Home,
  Info,
  MessageSquare,
} from "lucide-react";
import { HomepageData, PlacesData, AboutData, ContactData } from "@/lib/cms";
import ImageUploader from "@/components/admin/ImageUploader";
import PlacesListingAdmin from "@/components/admin/PlacesListingAdmin";
import PlaceDetailAdmin from "@/components/admin/PlaceDetailAdmin";
import AboutAdmin from "@/components/admin/AboutAdmin";
import ContactAdmin from "@/components/admin/ContactAdmin";

interface AdminClientProps {
  initialHomepageData: HomepageData;
  initialPlacesData: PlacesData;
  initialAboutData: AboutData;
  initialContactData: ContactData;
}

export default function AdminClient({
  initialHomepageData,
  initialPlacesData,
  initialAboutData,
  initialContactData,
}: AdminClientProps) {
  const [data, setData] = useState<HomepageData>(initialHomepageData);
  const [placesData, setPlacesData] = useState<PlacesData>(initialPlacesData);
  const [aboutData, setAboutData] = useState<AboutData>(initialAboutData);
  const [contactData, setContactData] = useState<ContactData>(initialContactData);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Top Section: "homepage" | "places" | "detail" | "about" | "contact"
  const [activeSection, setActiveSection] = useState<
    "homepage" | "places" | "detail" | "about" | "contact"
  >("homepage");

  // Which place detail page is currently being edited
  const [selectedDetailSlug, setSelectedDetailSlug] = useState<string>("panambur-beach");

  // Homepage internal sub-tabs
  const [activeTab, setActiveTab] = useState<
    "hero" | "destinations" | "whyChooseUs" | "tasteMangalore" | "cta"
  >("hero");

  const getPublicLink = () => {
    switch (activeSection) {
      case "places":
        return "/places-to-visit";
      case "detail":
        return `/places-to-visit/${selectedDetailSlug}`;
      case "about":
        return "/about";
      case "contact":
        return "/contact";
      default:
        return "/";
    }
  };

  const getSectionLabel = () => {
    switch (activeSection) {
      case "places":
        return "Places to Visit Listing";
      case "detail":
        return "Place Detail Pages";
      case "about":
        return "About Us Page";
      case "contact":
        return "Contact Page";
      default:
        return "Homepage";
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      if (activeSection === "homepage") {
        const res = await fetch("/api/admin/homepage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to save homepage");
        setMessage({
          type: "success",
          text: "Homepage changes & device images saved and published live!",
        });
      } else if (activeSection === "about") {
        const res = await fetch("/api/admin/about", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(aboutData),
        });
        if (!res.ok) throw new Error("Failed to save about page");
        setMessage({
          type: "success",
          text: "About Us page changes & images saved and published live!",
        });
      } else if (activeSection === "contact") {
        const res = await fetch("/api/admin/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData),
        });
        if (!res.ok) throw new Error("Failed to save contact page");
        setMessage({
          type: "success",
          text: "Contact page details & images saved and published live!",
        });
      } else {
        const res = await fetch("/api/admin/places", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(placesData),
        });
        if (!res.ok) throw new Error("Failed to save places");
        setMessage({
          type: "success",
          text:
            activeSection === "places"
              ? "Places to Visit listing page & polaroid cards saved and published live!"
              : "Place detail page changes & gallery saved and published live!",
        });
      }
      setTimeout(() => setMessage(null), 5000);
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save changes. Try again." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-8 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 text-white shadow-md shadow-orange-600/30 font-bold">
            M
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              Mangalore Tours CMS
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                {getSectionLabel()}
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              Live Content Editor & Device Media Uploader
            </p>
          </div>
        </div>

        {/* Section Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 self-center sm:self-auto overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveSection("homepage")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              activeSection === "homepage"
                ? "bg-orange-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Home className="h-3.5 w-3.5" />
            <span>Homepage</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("places")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              activeSection === "places"
                ? "bg-orange-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Places Listing</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("detail")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              activeSection === "detail"
                ? "bg-orange-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Palmtree className="h-3.5 w-3.5" />
            <span>Detail Pages</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("about")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              activeSection === "about"
                ? "bg-orange-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Info className="h-3.5 w-3.5" />
            <span>About Page</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("contact")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              activeSection === "contact"
                ? "bg-orange-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Contact Page</span>
          </button>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <Link
            href={getPublicLink()}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>View Public Page</span>
          </Link>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-500 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-orange-600/25 transition disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{saving ? "Publishing..." : "Save & Publish"}</span>
          </button>
        </div>
      </header>

      {/* Status Alert Banner */}
      {message && (
        <div
          className={`px-4 sm:px-8 py-3 text-xs sm:text-sm flex items-center gap-2 border-b ${
            message.type === "success"
              ? "bg-emerald-950/80 border-emerald-800 text-emerald-200"
              : "bg-red-950/80 border-red-800 text-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-400" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Main Workspace */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeSection === "places" ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-7 shadow-xl">
            <PlacesListingAdmin
              data={placesData}
              onChange={setPlacesData}
              onEditDetailPage={(slug) => {
                setSelectedDetailSlug(slug);
                setActiveSection("detail");
              }}
            />
          </div>
        ) : activeSection === "detail" ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-7 shadow-xl">
            <PlaceDetailAdmin
              data={placesData}
              onChange={setPlacesData}
              selectedSlug={selectedDetailSlug}
              onSelectSlug={setSelectedDetailSlug}
            />
          </div>
        ) : activeSection === "about" ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-7 shadow-xl">
            <AboutAdmin data={aboutData} onChange={setAboutData} />
          </div>
        ) : activeSection === "contact" ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-7 shadow-xl">
            <ContactAdmin data={contactData} onChange={setContactData} />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Sidebar Navigation */}
            <aside className="w-full md:w-64 shrink-0">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-2 space-y-1">
            <button
              onClick={() => setActiveTab("hero")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer text-left ${
                activeTab === "hero"
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>Hero Banner</span>
            </button>

            <button
              onClick={() => setActiveTab("destinations")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer text-left ${
                activeTab === "destinations"
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span>Popular Destinations</span>
            </button>

            <button
              onClick={() => setActiveTab("whyChooseUs")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer text-left ${
                activeTab === "whyChooseUs"
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>Why Choose Us</span>
            </button>

            <button
              onClick={() => setActiveTab("tasteMangalore")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer text-left ${
                activeTab === "tasteMangalore"
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Utensils className="h-4 w-4" />
              <span>Taste of Mangalore</span>
            </button>

            <button
              onClick={() => setActiveTab("cta")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer text-left ${
                activeTab === "cta"
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <PhoneCall className="h-4 w-4" />
              <span>CTA & Contact Info</span>
            </button>
          </div>

          <div className="mt-4 p-4 rounded-2xl border border-slate-800/80 bg-slate-900/30 text-[11px] text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Instant Server Preloaded</span>
            </div>
            <p>
              Pre-rendered instantly without client fetch delay. Click <b>Upload Device</b> next to any image to change visuals on the fly.
            </p>
          </div>
        </aside>

        {/* Right Form Editor Panel */}
        <main className="flex-1 min-w-0">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-7 shadow-xl">
            {/* 1. HERO SECTION FORM */}
            {activeTab === "hero" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">Hero Section Settings</h2>
                  <p className="text-xs text-slate-400">Edit banner headlines, text, action links, and slide background images.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Top Eyebrow Badge</label>
                    <input
                      type="text"
                      value={data.hero.badge}
                      onChange={(e) =>
                        setData({
                          ...data,
                          hero: { ...data.hero, badge: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Main Heading (Line 1)</label>
                    <input
                      type="text"
                      value={data.hero.titleLine1}
                      onChange={(e) =>
                        setData({
                          ...data,
                          hero: { ...data.hero, titleLine1: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Heading Highlight (Underlined / Colored)</label>
                    <input
                      type="text"
                      value={data.hero.titleHighlight}
                      onChange={(e) =>
                        setData({
                          ...data,
                          hero: { ...data.hero, titleHighlight: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Description Paragraph</label>
                    <textarea
                      rows={3}
                      value={data.hero.description}
                      onChange={(e) =>
                        setData({
                          ...data,
                          hero: { ...data.hero, description: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Button Text</label>
                    <input
                      type="text"
                      value={data.hero.ctaText}
                      onChange={(e) =>
                        setData({
                          ...data,
                          hero: { ...data.hero, ctaText: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Button Link</label>
                    <input
                      type="text"
                      value={data.hero.ctaLink}
                      onChange={(e) =>
                        setData({
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
                    <h3 className="text-sm font-bold text-white">Hero Background Slides</h3>
                    <button
                      type="button"
                      onClick={() => {
                        const newSlide = {
                          image: "/kadri.avif",
                          badgeTitle: "New Location",
                          badgeLocation: "Mangalore",
                        };
                        setData({
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
                          <span className="text-xs font-bold text-orange-400">Slide #{idx + 1}</span>
                          {data.hero.slides.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = data.hero.slides.filter((_, i) => i !== idx);
                                setData({
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
                            <label className="block text-[11px] text-slate-400 mb-1">Place Title</label>
                            <input
                              type="text"
                              value={slide.badgeTitle}
                              onChange={(e) => {
                                const updated = [...data.hero.slides];
                                updated[idx].badgeTitle = e.target.value;
                                setData({
                                  ...data,
                                  hero: { ...data.hero, slides: updated },
                                });
                              }}
                              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Location Subtitle</label>
                            <input
                              type="text"
                              value={slide.badgeLocation}
                              onChange={(e) => {
                                const updated = [...data.hero.slides];
                                updated[idx].badgeLocation = e.target.value;
                                setData({
                                  ...data,
                                  hero: { ...data.hero, slides: updated },
                                });
                              }}
                              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                            />
                          </div>
                        </div>

                        {/* Image Device Uploader */}
                        <ImageUploader
                          label="Slide Image (or Upload from Device)"
                          value={slide.image}
                          onChange={(newUrl) => {
                            const updated = [...data.hero.slides];
                            updated[idx].image = newUrl;
                            setData({
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

            {/* 2. POPULAR DESTINATIONS FORM */}
            {activeTab === "destinations" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">Popular Destinations Section</h2>
                  <p className="text-xs text-slate-400">Edit titles, handwritten script flourish, and destination photo cards with device upload.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Section Tag</label>
                    <input
                      type="text"
                      value={data.popularDestinations.tag}
                      onChange={(e) =>
                        setData({
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
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Heading Prefix</label>
                    <input
                      type="text"
                      value={data.popularDestinations.title}
                      onChange={(e) =>
                        setData({
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
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Heading Highlight</label>
                    <input
                      type="text"
                      value={data.popularDestinations.titleHighlight}
                      onChange={(e) =>
                        setData({
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
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Script Line 1 (Handwritten)</label>
                    <input
                      type="text"
                      value={data.popularDestinations.scriptTop}
                      onChange={(e) =>
                        setData({
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
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={data.popularDestinations.description}
                      onChange={(e) =>
                        setData({
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
                    <h3 className="text-sm font-bold text-white">Destination Cards ({data.popularDestinations.destinations.length})</h3>
                    <button
                      type="button"
                      onClick={() => {
                        const nextNum = (data.popularDestinations.destinations.length + 1).toString().padStart(2, "0");
                        const newDest = {
                          id: Date.now().toString(),
                          number: nextNum,
                          name: "New Tourist Spot",
                          location: "Mangalore",
                          image: "/panambur.avif",
                        };
                        setData({
                          ...data,
                          popularDestinations: {
                            ...data.popularDestinations,
                            destinations: [...data.popularDestinations.destinations, newDest],
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
                          <span className="text-xs font-bold text-orange-400">Card #{idx + 1} ({dest.number})</span>
                          {data.popularDestinations.destinations.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = data.popularDestinations.destinations.filter((_, i) => i !== idx);
                                setData({
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
                            <label className="block text-[11px] text-slate-400 mb-1">Place Name</label>
                            <input
                              type="text"
                              value={dest.name}
                              onChange={(e) => {
                                const updated = [...data.popularDestinations.destinations];
                                updated[idx].name = e.target.value;
                                setData({
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
                            <label className="block text-[11px] text-slate-400 mb-1">Location Subtitle</label>
                            <input
                              type="text"
                              value={dest.location}
                              onChange={(e) => {
                                const updated = [...data.popularDestinations.destinations];
                                updated[idx].location = e.target.value;
                                setData({
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

                        {/* Image Device Uploader */}
                        <ImageUploader
                          label="Destination Photo"
                          value={dest.image}
                          onChange={(newUrl) => {
                            const updated = [...data.popularDestinations.destinations];
                            updated[idx].image = newUrl;
                            setData({
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

            {/* 3. WHY CHOOSE US FORM */}
            {activeTab === "whyChooseUs" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">Why Choose Us Points</h2>
                  <p className="text-xs text-slate-400">Manage headline and individual feature cards.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Section Tag</label>
                    <input
                      type="text"
                      value={data.whyChooseUs.tag}
                      onChange={(e) =>
                        setData({
                          ...data,
                          whyChooseUs: { ...data.whyChooseUs, tag: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Section Heading</label>
                    <input
                      type="text"
                      value={data.whyChooseUs.title}
                      onChange={(e) =>
                        setData({
                          ...data,
                          whyChooseUs: { ...data.whyChooseUs, title: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={data.whyChooseUs.description}
                      onChange={(e) =>
                        setData({
                          ...data,
                          whyChooseUs: { ...data.whyChooseUs, description: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <h3 className="text-sm font-bold text-white mb-3">Feature Cards (4 Value Points)</h3>
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
                          <label className="block text-[11px] text-slate-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...data.whyChooseUs.features];
                              updated[idx].title = e.target.value;
                              setData({
                                ...data,
                                whyChooseUs: { ...data.whyChooseUs, features: updated },
                              });
                            }}
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={item.description}
                            onChange={(e) => {
                              const updated = [...data.whyChooseUs.features];
                              updated[idx].description = e.target.value;
                              setData({
                                ...data,
                                whyChooseUs: { ...data.whyChooseUs, features: updated },
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

            {/* 4. TASTE MANGALORE FORM */}
            {activeTab === "tasteMangalore" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">Taste of Mangalore</h2>
                  <p className="text-xs text-slate-400">Edit culinary section copy and upload device photos for each category.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Section Tag</label>
                    <input
                      type="text"
                      value={data.tasteMangalore.tag}
                      onChange={(e) =>
                        setData({
                          ...data,
                          tasteMangalore: { ...data.tasteMangalore, tag: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Section Heading</label>
                    <input
                      type="text"
                      value={data.tasteMangalore.title}
                      onChange={(e) =>
                        setData({
                          ...data,
                          tasteMangalore: { ...data.tasteMangalore, title: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={data.tasteMangalore.description}
                      onChange={(e) =>
                        setData({
                          ...data,
                          tasteMangalore: { ...data.tasteMangalore, description: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-2.5 text-xs sm:text-sm text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <h3 className="text-sm font-bold text-white mb-3">Food Categories & Images</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.tasteMangalore.categories.map((cat, idx) => (
                      <div
                        key={cat.id}
                        className="p-4 rounded-xl border border-slate-800 bg-slate-800/40 space-y-3"
                      >
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Category Name</label>
                          <input
                            type="text"
                            value={cat.title}
                            onChange={(e) => {
                              const updated = [...data.tasteMangalore.categories];
                              updated[idx].title = e.target.value;
                              setData({
                                ...data,
                                tasteMangalore: { ...data.tasteMangalore, categories: updated },
                              });
                            }}
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                          />
                        </div>

                        {/* Image Device Uploader */}
                        <ImageUploader
                          label="Cuisine Photo"
                          value={cat.image}
                          onChange={(newUrl) => {
                            const updated = [...data.tasteMangalore.categories];
                            updated[idx].image = newUrl;
                            setData({
                              ...data,
                              tasteMangalore: { ...data.tasteMangalore, categories: updated },
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. CTA & CONTACT INFO */}
            {activeTab === "cta" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">Call to Action & Contact Banners</h2>
                  <p className="text-xs text-slate-400">Update enquiry phone numbers, email, and booking headlines.</p>
                </div>

                <div className="p-4 rounded-xl border border-slate-800 bg-slate-800/30 space-y-3">
                  <h3 className="text-xs font-bold uppercase text-orange-400">Plan Trip Banner</h3>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Banner Title</label>
                    <input
                      type="text"
                      value={data.planTripCTA.title}
                      onChange={(e) =>
                        setData({
                          ...data,
                          planTripCTA: { ...data.planTripCTA, title: e.target.value },
                        })
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={data.planTripCTA.description}
                      onChange={(e) =>
                        setData({
                          ...data,
                          planTripCTA: { ...data.planTripCTA, description: e.target.value },
                        })
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Button Label</label>
                    <input
                      type="text"
                      value={data.planTripCTA.buttonText}
                      onChange={(e) =>
                        setData({
                          ...data,
                          planTripCTA: { ...data.planTripCTA, buttonText: e.target.value },
                        })
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm text-white"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-800 bg-slate-800/30 space-y-3">
                  <h3 className="text-xs font-bold uppercase text-orange-400">Tour Enquiry Contact Banner</h3>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Title</label>
                    <input
                      type="text"
                      value={data.tourEnquiryCTA.title}
                      onChange={(e) =>
                        setData({
                          ...data,
                          tourEnquiryCTA: { ...data.tourEnquiryCTA, title: e.target.value },
                        })
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={data.tourEnquiryCTA.subtitle}
                      onChange={(e) =>
                        setData({
                          ...data,
                          tourEnquiryCTA: { ...data.tourEnquiryCTA, subtitle: e.target.value },
                        })
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm text-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={data.tourEnquiryCTA.phone}
                        onChange={(e) =>
                          setData({
                            ...data,
                            tourEnquiryCTA: { ...data.tourEnquiryCTA, phone: e.target.value },
                          })
                        }
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Email Address</label>
                      <input
                        type="text"
                        value={data.tourEnquiryCTA.email}
                        onChange={(e) =>
                          setData({
                            ...data,
                            tourEnquiryCTA: { ...data.tourEnquiryCTA, email: e.target.value },
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
        </main>
      </div>
    )}
  </div>
</div>
  );
}
