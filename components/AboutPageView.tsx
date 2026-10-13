"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  MapPin,
  Star,
  Compass,
  Heart,
  BookOpen,
  Sparkles,
  Camera,
  Landmark,
  Palmtree,
  Quote,
} from "lucide-react";
import Header from "@/components/Header";
import TourEnquiryCTA from "@/components/TourEnquiryCTA";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { AboutData } from "@/lib/cms";

interface AboutPageViewProps {
  aboutData?: AboutData;
}

export default function AboutPageView({ aboutData }: AboutPageViewProps) {
  const hero = aboutData?.hero || {
    badge: "ABOUT US",
    titleLine1: "Discover the",
    titleLine2: "Real",
    titleHighlight: "Mangalore",
    description:
      "We are passionate about showcasing the beauty, culture and unique experiences of Mangalore — from pristine beaches and historic temples to local food, nature and hidden gems.",
    backdropImage: "/about-hero-lighthouse.jpg",
    stats: {
      travelers: { count: "10K+", label: "Happy Travelers" },
      places: { count: "50+", label: "Places Covered" },
      rating: { count: "4.8", label: "Traveler Rating" },
    },
  };

  const story = aboutData?.story || {
    badge: "OUR STORY",
    title: "Our Journey to Showcase",
    titleHighlight: "Mangalore",
    description:
      "Mangalore Tours was created with a simple vision — to bring together all the amazing places, experiences and local stories of Mangalore in one place. Whether you are a traveler, a local or someone planning a visit, we help you discover the real essence of this beautiful coastal city.",
    beachPhoto: "/about-beach-curve.jpg",
    beachBadgeTitle: "Mangalore",
    beachBadgeSubtitle: "A city of beaches, temples and vibrant culture.",
    templePhoto: "/about-temple.jpg",
    templeBadge: "Heritage & Culture",
    sunsetPhoto: "/about-sunset-beach.jpg",
    sunsetBadge: "Beaches & Nature",
    features: [
      {
        id: "1",
        title: "Local Expertise",
        description: "Authentic and up-to-date information from local insights.",
      },
      {
        id: "2",
        title: "Passion for Travel",
        description: "We love Mangalore and want to share its beauty with everyone.",
      },
      {
        id: "3",
        title: "Helpful Travel Guides",
        description:
          "Detailed guides, tips and recommendations for a memorable trip.",
      },
    ],
  };

  const whatMakesUsDifferent = aboutData?.whatMakesUsDifferent || {
    badge: "WHAT MAKES US DIFFERENT",
    titleLine1: "More Than Just a",
    titleHighlight: "Travel Guide",
    description:
      "We focus on real experiences, local insights and carefully curated information to help you explore Mangalore like a local.",
    cards: [
      {
        id: "1",
        title: "Curated Places",
        description:
          "Handpicked destinations across beaches, temples, nature and more.",
        icon: "map",
      },
      {
        id: "2",
        title: "Detailed Guides",
        description: "Useful information, tips and travel recommendations.",
        icon: "book",
      },
      {
        id: "3",
        title: "Local Experiences",
        description: "Discover local food, culture, festivals and hidden gems.",
        icon: "sparkles",
      },
      {
        id: "4",
        title: "Updated Content",
        description:
          "Always up-to-date with the latest places, events and travel tips.",
        icon: "camera",
      },
    ],
  };

  const vision = aboutData?.vision || {
    badge: "OUR VISION",
    title: "To Make Mangalore",
    titleHighlight: "a Must-Visit Destination",
    description:
      "We aim to inspire more people to explore Mangalore by showcasing its natural beauty, rich heritage, delicious food and unforgettable experiences.",
    backdropImage: "/about-vision-panorama.jpg",
    quoteText:
      "“Mangalore is more than a place — it's an experience of nature, culture and warm people.”",
  };

  const team = aboutData?.team || {
    badge: "MEET THE TEAM",
    title: "People Behind",
    titleHighlight: "Mangalore Tours",
    description:
      "A small team with a big passion for travel, exploration and our beautiful city.",
    teamPhoto: "/about-team-road.jpg",
    pillars: [
      {
        id: "1",
        title: "Travel Enthusiasts",
        description: "We love exploring new places and sharing our experiences.",
      },
      {
        id: "2",
        title: "Local Knowledge",
        description: "Born and raised in Mangalore, we bring authentic insights.",
      },
      {
        id: "3",
        title: "Committed to You",
        description: "Your trusted travel guide for Mangalore.",
      },
    ],
  };

  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case "book":
        return <BookOpen className="h-5 w-5" />;
      case "sparkles":
        return <Sparkles className="h-5 w-5" />;
      case "camera":
        return <Camera className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 overflow-x-clip bg-gradient-to-b from-[#f8faff] via-white to-[#f8faff]">
        {/* ================= 1. HERO SECTION ================= */}
        <section className="relative w-full overflow-hidden bg-white pt-4 sm:pt-6 pb-6">
          <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="relative min-h-[380px] sm:min-h-[420px] md:min-h-[460px] rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm flex flex-col justify-between p-6 sm:p-10 md:p-12">
              {/* Scenic Coastal Lighthouse Backdrop on Right */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={hero.backdropImage || "/about-hero-lighthouse.jpg"}
                  alt="Mangalore Coastal Lighthouse"
                  fill
                  priority
                  unoptimized
                  className="object-cover object-right md:object-right"
                  sizes="(max-width: 1600px) 100vw, 1600px"
                />
              </div>

              {/* Frosted Soft Gradient Shield (Left solid white, fading into scenic right) */}
              <div
                className="absolute inset-y-0 left-0 w-full sm:w-[84%] md:w-[70%] lg:w-[58%] z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.98) 55%, rgba(255, 255, 255, 0.85) 75%, rgba(255, 255, 255, 0) 100%)",
                }}
              />

              {/* Decorative "Explore Mangalore" Calligraphy in Top-Right */}
              <div className="absolute right-1/4 top-10 z-10 pointer-events-none hidden md:block">
                <span className="font-serif italic text-2xl lg:text-3xl text-amber-900/60 drop-shadow-xs rotate-[-8deg] select-none block">
                  Explore Mangalore
                </span>
              </div>

              {/* Hero Content (Left) */}
              <div className="relative z-20 max-w-xl md:max-w-2xl py-2 sm:py-4">
                {/* Section Tag */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-[3px] w-6 rounded-full bg-[#ff5e15]" />
                  <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#0d1e38]">
                    {hero.badge || "ABOUT US"}
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#0d1e38] leading-[1.08] mb-4">
                  {hero.titleLine1 || "Discover the"} <br />
                  {hero.titleLine2 || "Real"}{" "}
                  <span className="text-[#ff5e15]">
                    {hero.titleHighlight || "Mangalore"}
                  </span>
                </h1>

                {/* Subtitle Description */}
                <p className="text-xs sm:text-sm md:text-[14px] text-slate-600 leading-relaxed font-normal max-w-lg mb-6">
                  {hero.description}
                </p>

                {/* 3 Trust Metrics / Stat Badges Row */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                  {/* Metric 1 */}
                  <div className="flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md px-3.5 py-2.5 shadow-sm border border-slate-100">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff5e15] to-[#ff7a3d] text-white shadow-sm">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-[#0d1e38]">
                        {hero.stats.travelers.count}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {hero.stats.travelers.label}
                      </div>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md px-3.5 py-2.5 shadow-sm border border-slate-100">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff5e15] to-[#ff7a3d] text-white shadow-sm">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-[#0d1e38]">
                        {hero.stats.places.count}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {hero.stats.places.label}
                      </div>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md px-3.5 py-2.5 shadow-sm border border-slate-100">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff5e15] to-[#ff7a3d] text-white shadow-sm">
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-[#0d1e38]">
                        {hero.stats.rating.count}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {hero.stats.rating.label}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 2. OUR STORY SECTION ================= */}
        <section className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Mosaic Photo Collage (5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
              {/* Vertical Card 1: Curved Beach */}
              <div className="col-span-6 relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-slate-100 group">
                <Image
                  src={story.beachPhoto || "/about-beach-curve.jpg"}
                  alt="Mangalore Curved Coastline"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 300px"
                />
                {/* Floating Bottom Badge */}
                <div className="absolute inset-x-3 bottom-3 z-10 flex items-start gap-2.5 rounded-2xl bg-white/95 backdrop-blur-md p-3 shadow-md border border-slate-100">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-[#ff5e15]">
                    <MapPin className="h-4 w-4 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#0d1e38]">
                      {story.beachBadgeTitle || "Mangalore"}
                    </h4>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      {story.beachBadgeSubtitle ||
                        "A city of beaches, temples and vibrant culture."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Stack: Temple & Sunset Beach (6 cols) */}
              <div className="col-span-6 flex flex-col justify-between gap-3.5 sm:gap-4">
                {/* Top Photo: Temple */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-100 group">
                  <Image
                    src={story.templePhoto || "/about-temple.jpg"}
                    alt="Heritage Temple Architecture"
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 250px"
                  />
                  {/* Floating Pill */}
                  <div className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-1 shadow-sm border border-slate-100">
                    <Landmark className="h-3 w-3 text-[#ff5e15]" />
                    <span className="text-[10px] font-bold text-[#0d1e38]">
                      {story.templeBadge || "Heritage & Culture"}
                    </span>
                  </div>
                </div>

                {/* Bottom Photo: Sunset Beach */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-100 group">
                  <Image
                    src={story.sunsetPhoto || "/about-sunset-beach.jpg"}
                    alt="Beaches and Nature Sunset"
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 250px"
                  />
                  {/* Floating Pill */}
                  <div className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-1 shadow-sm border border-slate-100">
                    <Palmtree className="h-3 w-3 text-[#ff5e15]" />
                    <span className="text-[10px] font-bold text-[#0d1e38]">
                      {story.sunsetBadge || "Beaches & Nature"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Story Copy & 3 Feature Bullets (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="flex items-center gap-2">
                <span className="h-[3px] w-6 rounded-full bg-[#ff5e15]" />
                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#0d1e38]">
                  {story.badge || "OUR STORY"}
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0d1e38] leading-tight">
                {story.title}{" "}
                <span className="text-[#ff5e15]">{story.titleHighlight}</span>
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-[15px] text-slate-600 leading-relaxed font-normal">
                {story.description}
              </p>

              {/* 3 Feature Bullets */}
              <div className="space-y-4 pt-2">
                {story.features.map((feat, idx) => {
                  const icons = [Compass, Heart, Users];
                  const Icon = icons[idx % icons.length];
                  return (
                    <div key={feat.id || idx} className="flex items-start gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 border border-orange-100 text-[#ff5e15] shadow-xs">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-[#0d1e38]">
                          {feat.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. WHAT MAKES US DIFFERENT SECTION ================= */}
        <section className="w-full bg-slate-50/70 border-y border-slate-100 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Headline (4 cols) */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-[3px] w-6 rounded-full bg-[#ff5e15]" />
                  <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#0d1e38]">
                    {whatMakesUsDifferent.badge}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0d1e38] leading-tight">
                  {whatMakesUsDifferent.titleLine1} <br />
                  <span className="text-[#ff5e15]">
                    {whatMakesUsDifferent.titleHighlight}
                  </span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {whatMakesUsDifferent.description}
                </p>
              </div>

              {/* Right: 4 Value Cards (8 cols) */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {whatMakesUsDifferent.cards.map((card, idx) => (
                  <div
                    key={card.id || idx}
                    className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm hover:border-orange-200 hover:shadow-md transition-all"
                  >
                    <div className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 text-[#ff5e15]">
                      {getCardIcon(card.icon)}
                    </div>
                    <h3 className="text-sm font-extrabold text-[#0d1e38] mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4. OUR VISION PANORAMIC BANNER ================= */}
        <section className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-16">
          <div className="relative min-h-[300px] sm:min-h-[340px] md:min-h-[380px] rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex items-center p-6 sm:p-10 md:p-12">
            {/* Background Panorama Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={vision.backdropImage || "/about-vision-panorama.jpg"}
                alt="Mangalore Coastal Vista Sunset"
                fill
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 1600px) 100vw, 1600px"
              />
            </div>

            {/* Left Soft White Frosted Mask for clear readability */}
            <div
              className="absolute inset-y-0 left-0 w-full sm:w-[80%] md:w-[65%] lg:w-[55%] z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.92) 55%, rgba(255, 255, 255, 0.75) 75%, rgba(255, 255, 255, 0) 100%)",
              }}
            />

            <div className="relative z-20 w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Left Vision Text */}
              <div className="max-w-xl space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-[3px] w-6 rounded-full bg-[#ff5e15]" />
                  <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#0d1e38]">
                    {vision.badge}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0d1e38] leading-tight">
                  {vision.title} <br />
                  <span className="text-[#ff5e15]">{vision.titleHighlight}</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal max-w-md">
                  {vision.description}
                </p>
              </div>

              {/* Right Testimonial Quote Box */}
              <div className="w-full max-w-sm rounded-3xl bg-white/95 backdrop-blur-md p-6 shadow-xl border border-white/80 self-end lg:self-center">
                <div className="flex items-start gap-2.5">
                  <Quote className="h-5 w-5 text-[#ff5e15] shrink-0 fill-current mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed italic">
                      {vision.quoteText}
                    </p>
                    <div className="mt-2.5 h-[2px] w-8 rounded-full bg-[#ff5e15]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 5. PEOPLE BEHIND MANGALORE TOURS ================= */}
        <section className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12 pb-16 sm:pb-24">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[3px] w-6 rounded-full bg-[#ff5e15]" />
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#0d1e38]">
                {team.badge}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0d1e38] leading-tight">
              {team.title}{" "}
              <span className="text-[#ff5e15]">{team.titleHighlight}</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
              {team.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: 3 Value Pills (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {team.pillars.map((pill, idx) => {
                const icons = [Users, MapPin, Heart];
                const Icon = icons[idx % icons.length];
                return (
                  <div
                    key={pill.id || idx}
                    className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm hover:border-orange-200 transition-all"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 text-[#ff5e15]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-extrabold text-[#0d1e38] mb-1">
                      {pill.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {pill.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right: Coastal Scenic Image with Explore Mangalore cursive (5 cols) */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end gap-4">
              <div className="relative aspect-[16/11] w-full max-w-sm rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-slate-100 group">
                <Image
                  src={team.teamPhoto || "/about-team-road.jpg"}
                  alt="Explore Mangalore Coastal Roads"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>

              {/* Handwritten Script */}
              <div className="hidden sm:block select-none rotate-[-10deg]">
                <span className="font-serif italic text-2xl lg:text-3xl text-[#0d1e38]/70 block leading-tight">
                  Explore <br />
                  Mangalore
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Global Tour Enquiry CTA */}
        <TourEnquiryCTA />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
