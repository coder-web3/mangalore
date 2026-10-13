"use client";

import React, { useState, useEffect } from "react";
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
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sliders,
  Check,
  FileText,
  Clock,
  Laptop,
  Users,
} from "lucide-react";
import { HomepageData, PlacesData, AboutData, ContactData, GuidesData } from "@/lib/cms";
import HomepageAdmin, { HomepageTab } from "@/components/admin/HomepageAdmin";
import PlacesListingAdmin from "@/components/admin/PlacesListingAdmin";
import PlaceDetailAdmin from "@/components/admin/PlaceDetailAdmin";
import AboutAdmin from "@/components/admin/AboutAdmin";
import ContactAdmin from "@/components/admin/ContactAdmin";
import GuidesAdmin from "@/components/admin/GuidesAdmin";

interface AdminClientProps {
  initialHomepageData: HomepageData;
  initialPlacesData: PlacesData;
  initialFamousPlacesData: PlacesData;
  initialAboutData: AboutData;
  initialContactData: ContactData;
  initialGuidesData: GuidesData;
}

export type AdminSection =
  | "homepage"
  | "places"
  | "famousPlaces"
  | "guides"
  | "detail"
  | "famousDetail"
  | "about"
  | "contact";

export default function AdminClient({
  initialHomepageData,
  initialPlacesData,
  initialFamousPlacesData,
  initialAboutData,
  initialContactData,
  initialGuidesData,
}: AdminClientProps) {
  // CMS Data States
  const [data, setData] = useState<HomepageData>(initialHomepageData);
  const [placesData, setPlacesData] = useState<PlacesData>(initialPlacesData);
  const [famousPlacesData, setFamousPlacesData] = useState<PlacesData>(initialFamousPlacesData);
  const [guidesData, setGuidesData] = useState<GuidesData>(initialGuidesData);
  const [aboutData, setAboutData] = useState<AboutData>(initialAboutData);
  const [contactData, setContactData] = useState<ContactData>(initialContactData);

  // Status & Notifications
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>("Ready");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Theme Mode: "lite" | "dark"
  const [theme, setTheme] = useState<"lite" | "dark">("lite");

  // Navigation State
  const [activeSection, setActiveSection] = useState<AdminSection>("homepage");
  const [selectedDetailSlug, setSelectedDetailSlug] = useState<string>("panambur-beach");
  const [selectedFamousDetailSlug, setSelectedFamousDetailSlug] = useState<string>("panambur-beach");

  // Subtab synchronization
  const [homepageTab, setHomepageTab] = useState<HomepageTab>("hero");
  const [placesTab, setPlacesTab] = useState<"hero" | "cards">("hero");
  const [famousPlacesTab, setFamousPlacesTab] = useState<"hero" | "cards">("hero");
  const [guidesTab, setGuidesTab] = useState<"hero" | "guides">("guides");
  const [aboutSubTab, setAboutSubTab] = useState<
    "hero" | "story" | "different" | "vision" | "team"
  >("hero");
  const [contactSubTab, setContactSubTab] = useState<
    "hero" | "quickInfo" | "form" | "widgets"
  >("hero");

  // Sidebar Layout States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Expanded submenu state in sidebar
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    homepage: true,
    places: true,
    famousPlaces: true,
    guides: true,
    detail: false,
    famousDetail: false,
    about: true,
    contact: true,
  });

  const toggleSubmenu = (section: string) => {
    setExpandedMenus((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Load theme preference on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("mangalore_admin_theme");
      if (savedTheme === "dark" || savedTheme === "lite") {
        setTheme(savedTheme);
      }
    } catch {
      // Local storage not available
    }
  }, []);

  const handleThemeChange = (newTheme: "lite" | "dark") => {
    setTheme(newTheme);
    try {
      localStorage.setItem("mangalore_admin_theme", newTheme);
    } catch {
      // Ignore
    }
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshLatestData = async () => {
    setIsRefreshing(true);
    try {
      const [homeRes, placesRes, famousRes, aboutRes, contactRes] = await Promise.all([
        fetch("/api/admin/homepage", { cache: "no-store" }),
        fetch("/api/admin/places", { cache: "no-store" }),
        fetch("/api/admin/famous-places", { cache: "no-store" }),
        fetch("/api/admin/about", { cache: "no-store" }),
        fetch("/api/admin/contact", { cache: "no-store" }),
      ]);

      if (homeRes.ok) setData(await homeRes.json());
      if (placesRes.ok) setPlacesData(await placesRes.json());
      if (famousRes.ok) setFamousPlacesData(await famousRes.json());
      if (aboutRes.ok) setAboutData(await aboutRes.json());
      if (contactRes.ok) setContactData(await contactRes.json());

      const now = new Date();
      setLastSaved(
        `Synced at ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
      );
      setMessage({
        type: "success",
        text: "Refreshed live data successfully! You now have the newest changes from all co-workers.",
      });
      setTimeout(() => setMessage(null), 4000);
    } catch {
      setMessage({
        type: "error",
        text: "Failed to reload latest data. Please check your internet connection.",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Keyboard shortcut: Ctrl+S or Cmd+S to Save & Publish
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, data, placesData, famousPlacesData, aboutData, contactData]);

  const placesList = placesData.listingCatalog?.places || [];
  const famousPlacesList = famousPlacesData.listingCatalog?.places || [];

  const getPublicLink = () => {
    switch (activeSection) {
      case "places":
        return "/places-to-visit";
      case "famousPlaces":
        return "/famous-tourist-places";
      case "guides":
        return "/local-guides";
      case "detail":
        return `/places-to-visit/${selectedDetailSlug}`;
      case "famousDetail":
        return `/famous-tourist-places/${selectedFamousDetailSlug}`;
      case "about":
        return "/about";
      case "contact":
        return "/contact";
      default:
        return "/";
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "places":
        return "Places to Visit Listing";
      case "famousPlaces":
        return "Famous Tourist Places";
      case "guides":
        return "Local Guides Directory";
      case "detail": {
        const place = placesList.find((p) => p.slug === selectedDetailSlug);
        return place ? `${place.name} Detail Page` : "Place Detail Pages";
      }
      case "famousDetail": {
        const place = famousPlacesList.find((p) => p.slug === selectedFamousDetailSlug);
        return place ? `${place.name} (Famous Place) Detail Page` : "Famous Place Detail Pages";
      }
      case "about":
        return "About Us Page";
      case "contact":
        return "Contact Page";
      default:
        return "Homepage Editor";
    }
  };

  const getSectionDescription = () => {
    switch (activeSection) {
      case "places":
        return "Manage page hero, polaroid photos, badges, search tags and destination cards.";
      case "famousPlaces":
        return "Manage hero banner, polaroid showcase, and famous tourist destination catalog cards.";
      case "guides":
        return "Manage hero banner, polaroids, verified guide headshots, specialties, rates, and direct WhatsApp contacts (/local-guides).";
      case "detail":
        return "Customize overview story, facts, gallery photos and things to do for this destination (/places-to-visit).";
      case "famousDetail":
        return "Customize dedicated overview story, facts, gallery photos and tips for this famous tourist destination (/famous-tourist-places).";
      case "about":
        return "Edit hero metrics, story collage, difference pillars, vision statement, and team.";
      case "contact":
        return "Update location cards, contact numbers, email, interactive map, and promo banner.";
      default:
        return "Configure hero banners, destinations, value points, food guide, and tour inquiry info.";
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
          text: "Homepage section changes saved & published live!",
        });
      } else if (activeSection === "famousPlaces") {
        const res = await fetch("/api/admin/famous-places", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "listing",
            listingHero: famousPlacesData.listingHero,
            listingCatalog: famousPlacesData.listingCatalog,
          }),
        });
        if (!res.ok) throw new Error("Failed to save famous places listing");
        setMessage({
          type: "success",
          text: "Famous Tourist Places listing page saved without touching detail pages!",
        });
      } else if (activeSection === "famousDetail") {
        const detailPayload =
          famousPlacesData.placeDetails?.[selectedFamousDetailSlug] ||
          (selectedFamousDetailSlug === "panambur-beach"
            ? famousPlacesData.panamburDetail
            : null);
        const res = await fetch("/api/admin/famous-places", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "detail",
            slug: selectedFamousDetailSlug,
            detail: detailPayload,
          }),
        });
        if (!res.ok) throw new Error("Failed to save famous place detail");
        setMessage({
          type: "success",
          text: `"${selectedFamousDetailSlug}" detail page saved independently without conflict!`,
        });
      } else if (activeSection === "places") {
        const res = await fetch("/api/admin/places", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "listing",
            listingHero: placesData.listingHero,
            listingCatalog: placesData.listingCatalog,
          }),
        });
        if (!res.ok) throw new Error("Failed to save places listing");
        setMessage({
          type: "success",
          text: "Places to Visit listing page saved without touching detail pages!",
        });
      } else if (activeSection === "detail") {
        const detailPayload =
          placesData.placeDetails?.[selectedDetailSlug] ||
          (selectedDetailSlug === "panambur-beach" ? placesData.panamburDetail : null);
        const res = await fetch("/api/admin/places", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "detail",
            slug: selectedDetailSlug,
            detail: detailPayload,
          }),
        });
        if (!res.ok) throw new Error("Failed to save place detail");
        setMessage({
          type: "success",
          text: `"${selectedDetailSlug}" detail page saved independently without conflict!`,
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
          text: "About Us page changes saved & published live!",
        });
      } else if (activeSection === "guides") {
        const res = await fetch("/api/admin/guides", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "listing",
            listingHero: guidesData.listingHero,
            listingCatalog: guidesData.listingCatalog,
          }),
        });
        if (!res.ok) throw new Error("Failed to save local guides directory");
        setMessage({
          type: "success",
          text: "Local Guides directory saved & published live!",
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
          text: "Contact page details saved & published live!",
        });
      }

      const now = new Date();
      setLastSaved(
        `${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
      );
      setTimeout(() => setMessage(null), 5000);
    } catch {
      setMessage({ type: "error", text: "Failed to save changes. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        theme === "lite" ? "admin-lite bg-slate-50 text-slate-800" : "bg-[#090d16] text-slate-100"
      }`}
    >
      {/* ================= TOP NAVIGATION BAR ================= */}
      <header
        className={`sticky top-0 z-40 h-16 border-b transition-colors px-4 sm:px-6 flex items-center justify-between gap-4 backdrop-blur-md ${
          theme === "lite"
            ? "bg-white/95 border-slate-200/90 shadow-xs"
            : "bg-[#0c121e]/90 border-slate-800/80"
        }`}
      >
        {/* Left: Mobile Toggle & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-orange-500 cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden md:flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-orange-500 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition cursor-pointer"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>

          {/* Breadcrumb Trail */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-400 hidden sm:inline">Mangalore CMS</span>
            <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">/</span>
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>{getSectionTitle()}</span>
              <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
          </div>
        </div>

        {/* Right: Theme Switcher, Preview, Save Action */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Mode Toggle Pill */}
          <div
            className={`flex items-center p-1 rounded-xl border transition-all ${
              theme === "lite"
                ? "bg-slate-100 border-slate-200"
                : "bg-slate-900 border-slate-800"
            }`}
          >
            <button
              type="button"
              onClick={() => handleThemeChange("lite")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                theme === "lite"
                  ? "bg-white text-orange-600 shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Switch to Lite Version"
            >
              <Sun className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Lite</span>
            </button>
            <button
              type="button"
              onClick={() => handleThemeChange("dark")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                theme === "dark"
                  ? "bg-slate-800 text-orange-400 shadow-xs"
                  : "text-slate-500 hover:text-slate-700"
              }`}
              title="Switch to Dark Version"
            >
              <Moon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Dark</span>
            </button>
          </div>

          {/* Sync Latest Co-worker Updates Button */}
          <button
            type="button"
            onClick={refreshLatestData}
            disabled={isRefreshing}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              theme === "lite"
                ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-orange-600 shadow-xs"
                : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
            title="Reload latest updates published by other co-workers"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-orange-500" : ""}`} />
            <span className="hidden sm:inline">Sync Latest</span>
          </button>

          {/* Public Preview Button */}
          <Link
            href={getPublicLink()}
            target="_blank"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
              theme === "lite"
                ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-orange-600 shadow-xs"
                : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">View Public</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </Link>

          {/* Save Active Page Button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-500 px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-600/25 hover:shadow-orange-600/35 transition-all disabled:opacity-50 cursor-pointer text-white-force"
            title={`Publish changes for ${getSectionTitle()}`}
          >
            {saving ? (
              <RefreshCw className="h-4 w-4 animate-spin text-white-force" />
            ) : (
              <Save className="h-4 w-4 text-white-force" />
            )}
            <span className="text-white-force">
              {saving ? "Publishing..." : "Save Active Page"}
            </span>
          </button>
        </div>
      </header>

      {/* ================= STATUS NOTIFICATION BANNER ================= */}
      {message && (
        <div
          className={`px-4 sm:px-8 py-2.5 text-xs sm:text-sm flex items-center justify-between border-b transition-all ${
            message.type === "success"
              ? theme === "lite"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-emerald-950/80 border-emerald-800 text-emerald-200"
              : theme === "lite"
              ? "bg-red-50 border-red-200 text-red-800"
              : "bg-red-950/80 border-red-800 text-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 shrink-0" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setMessage(null)}
            className="text-xs opacity-70 hover:opacity-100 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ================= MAIN DASHBOARD BODY ================= */}
      <div className="flex-1 flex">
        {/* ================= LEFT MASTER SIDEBAR ================= */}
        {/* Mobile backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <aside
          className={`fixed md:sticky top-16 z-40 md:z-30 h-[calc(100vh-4rem)] shrink-0 border-r transition-all duration-200 flex flex-col justify-between overflow-y-auto ${
            theme === "lite"
              ? "bg-white border-slate-200/90 shadow-xs"
              : "bg-[#0b101a] border-slate-800/80"
          } ${isSidebarCollapsed ? "md:w-18" : "md:w-72"} ${
            isMobileMenuOpen
              ? "translate-x-0 w-72 left-0 shadow-2xl"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          {/* Sidebar Top: Logo & Navigation */}
          <div className="p-3.5 space-y-4">
            {/* Brand Card */}
            <div
              className={`p-3 rounded-2xl border flex items-center gap-3 ${
                theme === "lite"
                  ? "bg-gradient-to-br from-orange-50 to-slate-50 border-orange-100"
                  : "bg-slate-900/60 border-slate-800"
              } ${isSidebarCollapsed ? "justify-center p-2" : ""}`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black text-lg shadow-md shadow-orange-500/30 text-white-force">
                M
              </div>
              {!isSidebarCollapsed && (
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-xs font-black tracking-tight text-slate-900 dark:text-white truncate">
                      MANGALORE CMS
                    </h2>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                      LIVE
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    Enterprise Visual CMS
                  </p>
                </div>
              )}
            </div>

            {/* Menu List */}
            <nav className="space-y-1.5">
              {!isSidebarCollapsed && (
                <span className="block px-2 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                  Website Pages
                </span>
              )}

              {/* 1. HOMEPAGE */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("homepage");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeSection === "homepage"
                      ? "bg-orange-600 text-white shadow-sm shadow-orange-600/30 text-white-force"
                      : theme === "lite"
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  } ${isSidebarCollapsed ? "justify-center px-2" : ""}`}
                  title="Homepage"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Home className="h-4 w-4 shrink-0" />
                    {!isSidebarCollapsed && <span className="truncate">Homepage</span>}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {!isSidebarCollapsed && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        10 Sections
                      </span>
                    )}
                    {!isSidebarCollapsed && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSubmenu("homepage");
                        }}
                        className="p-1 rounded-md opacity-70 hover:opacity-100"
                      >
                        {expandedMenus.homepage ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </button>

                {/* Homepage Submenu */}
                {!isSidebarCollapsed && expandedMenus.homepage && (
                  <div className="ml-5 pl-2 border-l border-slate-200 dark:border-slate-800 space-y-0.5 pt-0.5">
                    {[
                      { id: "hero", label: "Hero Banner" },
                      { id: "destinations", label: "Top Destinations" },
                      { id: "whyChooseUs", label: "Why Choose Us" },
                      { id: "tasteMangalore", label: "Taste of Mangalore" },
                      { id: "planTripCTA", label: "Plan Trip Banner" },
                      { id: "gallery", label: "Pictures Gallery" },
                      { id: "tourEnquiryCTA", label: "Tour Enquiry Banner" },
                      { id: "artAndHistory", label: "Art & History" },
                      { id: "events", label: "Events & Festivals" },
                      { id: "exploreMore", label: "Explore More CTA" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveSection("homepage");
                          setHomepageTab(item.id as HomepageTab);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                          activeSection === "homepage" && homepageTab === item.id
                            ? "text-orange-600 dark:text-orange-400 font-bold bg-orange-500/10"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

                {/* 2. PLACES LISTING */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("places");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeSection === "places"
                      ? "bg-orange-600 text-white shadow-sm shadow-orange-600/30 text-white-force"
                      : theme === "lite"
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  } ${isSidebarCollapsed ? "justify-center px-2" : ""}`}
                  title="Places to Visit Listing"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Compass className="h-4 w-4 shrink-0" />
                    {!isSidebarCollapsed && (
                      <span className="truncate">Places Listing</span>
                    )}
                  </div>
                  {!isSidebarCollapsed && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {placesData?.listingCatalog?.places?.length || 8} Cards
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSubmenu("places");
                        }}
                        className="p-0.5 rounded hover:bg-black/10 dark:hover:bg-white/10"
                      >
                        {expandedMenus.places ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  )}
                </button>

                {!isSidebarCollapsed && expandedMenus.places && (
                  <div className="ml-5 pl-2 border-l border-slate-200 dark:border-slate-800 space-y-0.5 pt-0.5">
                    {[
                      { id: "hero", label: "Hero & Polaroids" },
                      { id: "cards", label: "Places Catalog Cards" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveSection("places");
                          setPlacesTab(item.id as "hero" | "cards");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                          activeSection === "places" && placesTab === item.id
                            ? "text-orange-600 dark:text-orange-400 font-bold bg-orange-500/10"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. FAMOUS TOURIST PLACES LISTING */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("famousPlaces");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeSection === "famousPlaces"
                      ? "bg-orange-600 text-white shadow-sm shadow-orange-600/30 text-white-force"
                      : theme === "lite"
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  } ${isSidebarCollapsed ? "justify-center px-2" : ""}`}
                  title="Famous Tourist Places Listing"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
                    {!isSidebarCollapsed && (
                      <span className="truncate">Famous Tourist Places</span>
                    )}
                  </div>
                  {!isSidebarCollapsed && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold">
                        {famousPlacesData?.listingCatalog?.places?.length || 8} Cards
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSubmenu("famousPlaces");
                        }}
                        className="p-0.5 rounded hover:bg-black/10 dark:hover:bg-white/10"
                      >
                        {expandedMenus.famousPlaces ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  )}
                </button>

                {!isSidebarCollapsed && expandedMenus.famousPlaces && (
                  <div className="ml-5 pl-2 border-l border-slate-200 dark:border-slate-800 space-y-0.5 pt-0.5">
                    {[
                      { id: "hero", label: "Hero & Polaroids" },
                      { id: "cards", label: "Famous Places Cards" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveSection("famousPlaces");
                          setFamousPlacesTab(item.id as "hero" | "cards");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                          activeSection === "famousPlaces" && famousPlacesTab === item.id
                            ? "text-orange-600 dark:text-orange-400 font-bold bg-orange-500/10"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. LOCAL GUIDES DIRECTORY */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("guides");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeSection === "guides"
                      ? "bg-orange-600 text-white shadow-sm shadow-orange-600/30 text-white-force"
                      : theme === "lite"
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  } ${isSidebarCollapsed ? "justify-center px-2" : ""}`}
                  title="Local Guides Directory"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Users className="h-4 w-4 shrink-0 text-cyan-500" />
                    {!isSidebarCollapsed && (
                      <span className="truncate">Local Guides</span>
                    )}
                  </div>
                  {!isSidebarCollapsed && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-bold">
                        {guidesData?.listingCatalog?.guides?.length || 6} Guides
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSubmenu("guides");
                        }}
                        className="p-0.5 rounded hover:bg-black/10 dark:hover:bg-white/10"
                      >
                        {expandedMenus.guides ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  )}
                </button>

                {!isSidebarCollapsed && expandedMenus.guides && (
                  <div className="ml-5 pl-2 border-l border-slate-200 dark:border-slate-800 space-y-0.5 pt-0.5">
                    {[
                      { id: "guides", label: "Guide Profiles" },
                      { id: "hero", label: "Hero & Polaroids" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveSection("guides");
                          setGuidesTab(item.id as "hero" | "guides");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                          activeSection === "guides" && guidesTab === item.id
                            ? "text-orange-600 dark:text-orange-400 font-bold bg-orange-500/10"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. PLACE DETAIL PAGES */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("detail");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeSection === "detail"
                      ? "bg-orange-600 text-white shadow-sm shadow-orange-600/30 text-white-force"
                      : theme === "lite"
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  } ${isSidebarCollapsed ? "justify-center px-2" : ""}`}
                  title="Places to Visit Detail Pages"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Palmtree className="h-4 w-4 shrink-0" />
                    {!isSidebarCollapsed && (
                      <span className="truncate">Places Detail Pages</span>
                    )}
                  </div>
                  {!isSidebarCollapsed && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubmenu("detail");
                      }}
                      className="p-1 rounded-md opacity-70 hover:opacity-100"
                    >
                      {expandedMenus.detail ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                      )}
                    </button>
                  )}
                </button>

                {/* Place Detail Submenu with places */}
                {!isSidebarCollapsed && (expandedMenus.detail || activeSection === "detail") && (
                  <div className="ml-5 pl-2 border-l border-slate-200 dark:border-slate-800 space-y-0.5 pt-0.5 max-h-44 overflow-y-auto">
                    {placesList.map((place) => (
                      <button
                        key={place.id}
                        type="button"
                        onClick={() => {
                          setActiveSection("detail");
                          setSelectedDetailSlug(place.slug || "panambur-beach");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer truncate ${
                          activeSection === "detail" && selectedDetailSlug === place.slug
                            ? "text-orange-600 dark:text-orange-400 font-bold bg-orange-500/10"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {place.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. FAMOUS PLACES DETAIL PAGES */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("famousDetail");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeSection === "famousDetail"
                      ? "bg-orange-600 text-white shadow-sm shadow-orange-600/30 text-white-force"
                      : theme === "lite"
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  } ${isSidebarCollapsed ? "justify-center px-2" : ""}`}
                  title="Famous Tourist Places Detail Pages"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
                    {!isSidebarCollapsed && (
                      <span className="truncate">Famous Detail Pages</span>
                    )}
                  </div>
                  {!isSidebarCollapsed && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubmenu("famousDetail");
                      }}
                      className="p-1 rounded-md opacity-70 hover:opacity-100"
                    >
                      {expandedMenus.famousDetail ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                      )}
                    </button>
                  )}
                </button>

                {/* Famous Place Detail Submenu with famous places */}
                {!isSidebarCollapsed && (expandedMenus.famousDetail || activeSection === "famousDetail") && (
                  <div className="ml-5 pl-2 border-l border-slate-200 dark:border-slate-800 space-y-0.5 pt-0.5 max-h-44 overflow-y-auto">
                    {famousPlacesList.map((place) => (
                      <button
                        key={place.id}
                        type="button"
                        onClick={() => {
                          setActiveSection("famousDetail");
                          setSelectedFamousDetailSlug(place.slug || "panambur-beach");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer truncate ${
                          activeSection === "famousDetail" && selectedFamousDetailSlug === place.slug
                            ? "text-orange-600 dark:text-orange-400 font-bold bg-orange-500/10"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {place.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. ABOUT US PAGE */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("about");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeSection === "about"
                      ? "bg-orange-600 text-white shadow-sm shadow-orange-600/30 text-white-force"
                      : theme === "lite"
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  } ${isSidebarCollapsed ? "justify-center px-2" : ""}`}
                  title="About Us Page"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Info className="h-4 w-4 shrink-0" />
                    {!isSidebarCollapsed && <span className="truncate">About Page</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubmenu("about");
                      }}
                      className="p-1 rounded-md opacity-70 hover:opacity-100"
                    >
                      {expandedMenus.about ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                      )}
                    </button>
                  )}
                </button>

                {!isSidebarCollapsed && expandedMenus.about && (
                  <div className="ml-5 pl-2 border-l border-slate-200 dark:border-slate-800 space-y-0.5 pt-0.5">
                    {[
                      { id: "hero", label: "Hero & Stats" },
                      { id: "story", label: "Our Story & Collage" },
                      { id: "different", label: "What Makes Us Different" },
                      { id: "vision", label: "Our Vision Statement" },
                      { id: "team", label: "Team & Mission Pillars" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveSection("about");
                          setAboutSubTab(
                            item.id as "hero" | "story" | "different" | "vision" | "team"
                          );
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                          activeSection === "about" && aboutSubTab === item.id
                            ? "text-orange-600 dark:text-orange-400 font-bold bg-orange-500/10"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. CONTACT PAGE */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("contact");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeSection === "contact"
                      ? "bg-orange-600 text-white shadow-sm shadow-orange-600/30 text-white-force"
                      : theme === "lite"
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  } ${isSidebarCollapsed ? "justify-center px-2" : ""}`}
                  title="Contact Page"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <MessageSquare className="h-4 w-4 shrink-0" />
                    {!isSidebarCollapsed && (
                      <span className="truncate">Contact Page</span>
                    )}
                  </div>
                  {!isSidebarCollapsed && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubmenu("contact");
                      }}
                      className="p-1 rounded-md opacity-70 hover:opacity-100"
                    >
                      {expandedMenus.contact ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                      )}
                    </button>
                  )}
                </button>

                {!isSidebarCollapsed && expandedMenus.contact && (
                  <div className="ml-5 pl-2 border-l border-slate-200 dark:border-slate-800 space-y-0.5 pt-0.5">
                    {[
                      { id: "hero", label: "Hero Banner" },
                      { id: "quickInfo", label: "4 Quick Info Cards" },
                      { id: "form", label: "Form Section Copy" },
                      { id: "widgets", label: "Map & Custom Tour Banner" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveSection("contact");
                          setContactSubTab(
                            item.id as "hero" | "quickInfo" | "form" | "widgets"
                          );
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                          activeSection === "contact" && contactSubTab === item.id
                            ? "text-orange-600 dark:text-orange-400 font-bold bg-orange-500/10"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Sidebar Footer: Status & Shortcuts */}
          <div
            className={`p-3.5 border-t space-y-2.5 ${
              theme === "lite" ? "border-slate-200/80 bg-slate-50/50" : "border-slate-800/80 bg-slate-950/40"
            }`}
          >
            {!isSidebarCollapsed && (
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>System Sync</span>
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {lastSaved}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-between">
                  <span>Shortcut</span>
                  <kbd className="px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-[10px] font-mono">
                    Ctrl + S
                  </kbd>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs font-bold transition cursor-pointer ${
                theme === "lite"
                  ? "bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200"
                  : "bg-slate-900 hover:bg-slate-800 text-orange-400 border border-slate-800"
              }`}
            >
              <Save className="h-3.5 w-3.5" />
              {!isSidebarCollapsed && (
                <span>{saving ? "Publishing..." : "Quick Save"}</span>
              )}
            </button>
          </div>
        </aside>

        {/* ================= WORKSPACE CONTENT ================= */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Top Page Overview Card */}
          <div
            className={`p-5 sm:p-6 rounded-2xl border transition-all ${
              theme === "lite"
                ? "bg-white border-slate-200/90 shadow-xs"
                : "bg-slate-900/60 border-slate-800/80 shadow-xl"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
                    ACTIVE EDITOR
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {getSectionTitle()}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                  {getSectionDescription()}
                </p>
              </div>

              {/* Status, Route Link Pill, and Dedicated Page Save Action */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <Link
                  href={getPublicLink()}
                  target="_blank"
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition ${
                    theme === "lite"
                      ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                      : "bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700"
                  }`}
                  title="View live public page"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span className="truncate max-w-[170px] sm:max-w-xs">{getPublicLink()}</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>

                {/* Conflict-Free Single Page Save Button */}
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-600/30 transition-all disabled:opacity-50 cursor-pointer"
                  title={`Save only ${getSectionTitle()} without overwriting other pages`}
                >
                  {saving ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}
                  <span>
                    {saving
                      ? "Publishing..."
                      : `Save ${
                          activeSection === "detail"
                            ? "This Attraction"
                            : activeSection === "famousDetail"
                            ? "This Famous Attraction"
                            : activeSection === "places"
                            ? "Places Listing"
                            : activeSection === "famousPlaces"
                            ? "Famous Listing"
                            : activeSection === "guides"
                            ? "Guides Directory"
                            : activeSection === "about"
                            ? "About Page"
                            : activeSection === "contact"
                            ? "Contact Page"
                            : "Homepage"
                        }`}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Component Workspace Container */}
          <div
            className={`rounded-2xl border p-5 sm:p-7 transition-all ${
              theme === "lite"
                ? "bg-white border-slate-200/90 shadow-xs"
                : "bg-slate-900/60 border-slate-800/80 shadow-xl"
            }`}
          >
            {activeSection === "homepage" && (
              <HomepageAdmin
                data={data}
                onChange={setData}
                activeTab={homepageTab}
                onTabChange={setHomepageTab}
              />
            )}

            {activeSection === "places" && (
              <PlacesListingAdmin
                data={placesData}
                onChange={setPlacesData}
                activeSubTab={placesTab}
                onSubTabChange={setPlacesTab}
                title="Places to Visit — Listing Page"
                description="Manage the hero banner, polaroid tilt cards, and places catalog cards for /places-to-visit."
                onEditDetailPage={(slug) => {
                  setSelectedDetailSlug(slug);
                  setActiveSection("detail");
                }}
              />
            )}

            {activeSection === "famousPlaces" && (
              <PlacesListingAdmin
                data={famousPlacesData}
                onChange={setFamousPlacesData}
                activeSubTab={famousPlacesTab}
                onSubTabChange={setFamousPlacesTab}
                title="Famous Tourist Places — Listing Page"
                description="Manage the hero banner, polaroid tilt cards, and famous tourist destination catalog cards for /famous-tourist-places."
                basePath="/famous-tourist-places"
                onEditDetailPage={(slug) => {
                  setSelectedFamousDetailSlug(slug);
                  setActiveSection("famousDetail");
                }}
              />
            )}

            {activeSection === "guides" && (
              <GuidesAdmin
                data={guidesData}
                onChange={setGuidesData}
                activeSubTab={guidesTab}
                onSubTabChange={setGuidesTab}
              />
            )}

            {activeSection === "detail" && (
              <PlaceDetailAdmin
                data={placesData}
                onChange={setPlacesData}
                selectedSlug={selectedDetailSlug}
                onSelectSlug={setSelectedDetailSlug}
                title="Places to Visit — Detail Page Editor"
                description="Customize overview story, facts, gallery photos and things to do for this destination (/places-to-visit)."
                basePath="/places-to-visit"
              />
            )}

            {activeSection === "famousDetail" && (
              <PlaceDetailAdmin
                data={famousPlacesData}
                onChange={setFamousPlacesData}
                selectedSlug={selectedFamousDetailSlug}
                onSelectSlug={setSelectedFamousDetailSlug}
                title="Famous Tourist Places — Detail Page Editor"
                description="Customize dedicated overview story, facts, gallery photos and things to do for this famous destination (/famous-tourist-places)."
                basePath="/famous-tourist-places"
              />
            )}

            {activeSection === "about" && (
              <AboutAdmin
                data={aboutData}
                onChange={setAboutData}
                activeSubTab={aboutSubTab}
                onSubTabChange={setAboutSubTab}
              />
            )}

            {activeSection === "contact" && (
              <ContactAdmin
                data={contactData}
                onChange={setContactData}
                activeSubTab={contactSubTab}
                onSubTabChange={setContactSubTab}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
