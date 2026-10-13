"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Palmtree,
  Landmark,
  UtensilsCrossed,
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  Check,
  Search,
  Flame,
  Mail,
  ArrowRight,
  Lightbulb,
  HelpCircle,
  CheckCircle2,
  Leaf,
  X,
  Compass,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import TourEnquiryCTA from "@/components/TourEnquiryCTA";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { BlogDetailData, GuideArticleItem, GuideSidebarCategory, GuidePopularPost } from "@/lib/cms";

interface BlogDetailPageViewProps {
  article: BlogDetailData;
  allArticles?: GuideArticleItem[];
  categories?: GuideSidebarCategory[];
  popularPosts?: GuidePopularPost[];
}

export default function BlogDetailPageView({
  article,
  allArticles = [],
  categories = [],
  popularPosts = [],
}: BlogDetailPageViewProps) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== "undefined") {
      const text = encodeURIComponent(`${article.title} - ${window.location.href}`);
      window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== "undefined") {
      const text = encodeURIComponent(`Check out this travel guide: ${article.title}`);
      const url = encodeURIComponent(window.location.href);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 4000);
      setNewsletterEmail("");
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "beach":
      case "beaches":
        return <Palmtree className="h-4 w-4 text-emerald-500" />;
      case "food":
        return <UtensilsCrossed className="h-4 w-4 text-rose-500" />;
      case "temple":
      case "temples":
        return <Landmark className="h-4 w-4 text-orange-500" />;
      case "culture":
        return <Sparkles className="h-4 w-4 text-purple-500" />;
      case "tips":
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case "nature":
        return <Leaf className="h-4 w-4 text-emerald-600" />;
      default:
        return <Sparkles className="h-4 w-4 text-[#ff5411]" />;
    }
  };

  // Find next and previous articles
  const currentIndex = allArticles.findIndex(
    (a) => a.slug === article.slug || a.id === article.slug
  );
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < allArticles.length - 1
      ? allArticles[currentIndex + 1]
      : null;

  // Filter related articles
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug && a.id !== article.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 antialiased selection:bg-orange-500 selection:text-white">
      {/* 1. Header */}
      <Header />

      {/* 2. Breadcrumbs Bar */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-200/80 bg-white py-3 sm:py-3.5">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-xs font-semibold text-slate-500 overflow-x-auto whitespace-nowrap">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 text-slate-500 hover:text-[#ff5411] transition-colors"
              >
                <Home className="h-3.5 w-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0" />
            </li>
            <li>
              <Link
                href="/local-guides#guides-articles"
                className="hover:text-[#ff5411] transition-colors"
              >
                Travel Articles & Guides
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0" />
            </li>
            <li className="font-bold text-[#ff5411] truncate max-w-[280px] sm:max-w-[450px]">
              {article.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* 3. Main Container */}
      <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Article Headline Header */}
        <header className="max-w-4xl mb-8 sm:mb-10">
          {/* Category Tag */}
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-200/70 px-3.5 py-1.5 mb-4 shadow-sm">
            {getCategoryIcon(article.categoryIcon || article.category)}
            <span className="text-xs font-bold uppercase tracking-wider text-[#ea4908]">
              {article.categoryLabel}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0d1e38] tracking-tight leading-[1.18] mb-4">
            {article.title}
          </h1>

          {/* Subtitle / Excerpt */}
          {article.subtitle && (
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mb-6">
              {article.subtitle}
            </p>
          )}

          {/* Meta Bar: Author, Date, Reading Time, Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 rounded-full overflow-hidden ring-2 ring-orange-500/20 shadow-sm shrink-0">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0d1e38] leading-tight">
                  {article.author.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-slate-400" />
                    {article.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    {article.readingTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Bookmark & Share */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setBookmarked(!bookmarked)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
                  bookmarked
                    ? "bg-[#ff5411] text-white shadow-orange-950/20"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
                aria-label="Bookmark article"
              >
                <Bookmark className={`h-3.5 w-3.5 ${bookmarked ? "fill-white" : ""}`} />
                <span>{bookmarked ? "Saved" : "Save"}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                title="Copy article link"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5 text-slate-500" />
                    <span>Share</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-all cursor-pointer"
                title="Share on WhatsApp"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Featured Photo */}
        <div className="relative mb-10 sm:mb-14 overflow-hidden rounded-3xl sm:rounded-[32px] bg-slate-900 shadow-xl shadow-slate-900/10">
          <div className="relative h-[280px] sm:h-[440px] lg:h-[540px] w-full">
            <Image
              src={article.heroImage}
              alt={article.title}
              fill
              priority
              unoptimized
              className="object-cover"
              sizes="(max-width: 1400px) 100vw, 1400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
          </div>
          {article.heroImageCaption && (
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-5 z-10 rounded-xl bg-black/60 backdrop-blur-md px-3.5 py-1.5 border border-white/10 text-[11px] sm:text-xs font-medium text-white/90">
              {article.heroImageCaption}
            </div>
          )}
        </div>

        {/* 2-COLUMN EDITORIAL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* LEFT: MAIN ARTICLE CONTENT (8 COLS) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Intro Lead Paragraph */}
            <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
                {article.intro}
              </p>
            </div>

            {/* Quick Key Facts Bar */}
            {article.keyFacts && article.keyFacts.length > 0 && (
              <div className="rounded-3xl bg-gradient-to-br from-orange-50/70 via-white to-amber-50/40 border border-orange-200/70 p-6 sm:p-7 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ff5411] text-white shadow-md shadow-orange-950/20">
                    <Compass className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#0d1e38]">
                    Trip Overview & Fast Facts
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {article.keyFacts.map((fact, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white/90 border border-orange-100 p-3.5 shadow-xs"
                    >
                      <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                        {fact.label}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-[#0d1e38]">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Table of Contents Box */}
            {article.sections && article.sections.length > 1 && (
              <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-[#ff5411]" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    In This Guide:
                  </h3>
                </div>
                <ul className="space-y-2">
                  {article.sections.map((section, idx) => (
                    <li key={section.id || idx}>
                      <a
                        href={`#${section.id}`}
                        className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#ff5411] transition-colors"
                      >
                        <ChevronRight className="h-3.5 w-3.5 text-[#ff5411] shrink-0" />
                        <span>{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Editorial Story Sections */}
            <div className="space-y-12">
              {article.sections.map((section, idx) => (
                <section
                  key={section.id || idx}
                  id={section.id}
                  className="scroll-mt-24 space-y-5"
                >
                  {/* Section Title */}
                  <h2 className="text-xl sm:text-2xl font-black text-[#0d1e38] tracking-tight leading-snug flex items-start gap-2.5">
                    <span className="text-[#ff5411] font-mono text-lg sm:text-xl">
                      #{idx + 1}
                    </span>
                    <span>{section.title}</span>
                  </h2>

                  {/* Section Image if available */}
                  {section.image && (
                    <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-3xl bg-slate-900 shadow-md">
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 1000px) 100vw, 800px"
                      />
                      {section.imageCaption && (
                        <div className="absolute bottom-2.5 left-3 rounded-lg bg-black/60 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
                          {section.imageCaption}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Paragraphs */}
                  <div className="space-y-4">
                    {section.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal"
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Pro Tip Callout Box */}
                  {section.proTip && (
                    <div className="rounded-2xl bg-amber-50/80 border border-amber-200/90 p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm">
                        <Lightbulb className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                          Local Insider Tip
                        </h4>
                        <p className="text-xs sm:text-sm font-medium text-amber-950 leading-relaxed">
                          {section.proTip}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bullet Highlights Checklist */}
                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 sm:p-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                        Key Highlights
                      </h4>
                      <ul className="space-y-2">
                        {section.bulletPoints.map((point, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium"
                          >
                            <CheckCircle2 className="h-4 w-4 text-[#ff5411] shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Travel FAQs Section */}
            {article.faqs && article.faqs.length > 0 && (
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-[#ff5411]">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#0d1e38]">
                    Frequently Asked Traveler Questions
                  </h3>
                </div>

                <div className="divide-y divide-slate-100">
                  {article.faqs.map((faq, fIdx) => {
                    const isOpen = openFaqIndex === fIdx;
                    return (
                      <div key={fIdx} className="py-3.5">
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                          className="flex w-full items-center justify-between text-left font-bold text-xs sm:text-sm text-[#0d1e38] hover:text-[#ff5411] transition-colors cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          <span
                            className={`ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 transition-transform ${
                              isOpen ? "rotate-180 bg-orange-100 text-[#ff5411]" : "text-slate-500"
                            }`}
                          >
                            ↓
                          </span>
                        </button>
                        {isOpen && (
                          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pr-4">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Article Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-bold text-slate-400 mr-1">Tags:</span>
                {article.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="rounded-xl bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 shadow-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Bio Card */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden ring-4 ring-orange-50 shrink-0">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-extrabold text-[#0d1e38]">
                    {article.author.name}
                  </h4>
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-[#ff5411]">
                    Verified Writer
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500">
                  {article.author.role}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {article.author.bio}
                </p>
              </div>
            </div>

            {/* Next / Prev Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {prevArticle ? (
                <Link
                  href={`/blog/${prevArticle.slug || prevArticle.id}`}
                  className="group rounded-2xl bg-white border border-slate-200 p-4 hover:border-orange-300 hover:shadow-md transition-all flex items-center gap-3"
                >
                  <ArrowLeft className="h-4 w-4 text-slate-400 group-hover:text-[#ff5411] transition-transform group-hover:-translate-x-1" />
                  <div className="truncate">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">
                      Previous Article
                    </span>
                    <span className="text-xs font-bold text-[#0d1e38] group-hover:text-[#ff5411] transition-colors truncate block">
                      {prevArticle.title}
                    </span>
                  </div>
                </Link>
              ) : <div />}

              {nextArticle && (
                <Link
                  href={`/blog/${nextArticle.slug || nextArticle.id}`}
                  className="group rounded-2xl bg-white border border-slate-200 p-4 hover:border-orange-300 hover:shadow-md transition-all flex items-center justify-end text-right gap-3"
                >
                  <div className="truncate">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">
                      Next Article
                    </span>
                    <span className="text-xs font-bold text-[#0d1e38] group-hover:text-[#ff5411] transition-colors truncate block">
                      {nextArticle.title}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#ff5411] transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>

          {/* RIGHT: STICKY SIDEBAR (4 COLS - Matching user's exact design) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* 1. SEARCH BLOG WIDGET */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#0a1e38] via-[#0d2444] to-[#122e54] p-5 sm:p-6 text-white shadow-xl shadow-slate-900/10 overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white tracking-tight leading-tight">
                    Search Blog
                  </h3>
                  <p className="text-[11px] text-white/70">
                    Find travel guides & stories...
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center rounded-2xl bg-white p-1 shadow-md">
                <input
                  type="text"
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full bg-transparent px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
                <Link
                  href={`/local-guides#guides-articles`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ff5411] text-white hover:bg-[#ea4908] transition shadow-md shadow-orange-950/30"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* 2. CATEGORIES WIDGET */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <h3 className="text-sm font-extrabold text-[#0d1e38] uppercase tracking-wider">
                  Categories
                </h3>
                <span className="text-xs text-slate-400 font-semibold">
                  {categories.length} Topics
                </span>
              </div>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/local-guides#guides-articles`}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-orange-50 hover:text-[#ff5411] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {getCategoryIcon(cat.icon)}
                      <span>{cat.label}</span>
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500 font-bold">
                      {cat.articleCount}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. POPULAR POSTS WIDGET */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                <Flame className="h-4 w-4 text-[#ff5411]" />
                <h3 className="text-sm font-extrabold text-[#0d1e38] uppercase tracking-wider">
                  Popular Posts
                </h3>
              </div>
              <div className="space-y-3.5">
                {popularPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={post.link || `/local-guides#guides-articles`}
                    className="group flex items-center gap-3"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 shadow-xs">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-[#0d1e38] group-hover:text-[#ff5411] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                        {post.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 4. NEWSLETTER UPDATES CARD */}
            <div className="relative rounded-3xl bg-gradient-to-br from-orange-500 to-amber-600 p-5 sm:p-6 text-white shadow-xl shadow-orange-500/20 overflow-hidden">
              <div className="flex items-center gap-2.5 mb-2">
                <Mail className="h-5 w-5 text-amber-200" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
                  Get Travel Updates
                </h3>
              </div>
              <p className="text-xs text-white/90 leading-relaxed mb-4">
                Subscribe to receive new Mangalore travel stories, foodie spots and festival alerts directly in your inbox.
              </p>
              {newsletterSubscribed ? (
                <div className="rounded-xl bg-white/20 p-2.5 text-center text-xs font-bold text-white">
                  ✓ Thanks for subscribing!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl bg-white/95 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#0d1e38] py-2 text-xs font-bold text-white hover:bg-slate-900 transition shadow-md cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* 5. PLAN TRIP PROMO BANNER */}
            <div className="rounded-3xl bg-slate-900 p-5 sm:p-6 text-white shadow-xl shadow-slate-950/20 text-center">
              <Compass className="h-8 w-8 text-[#ff5411] mx-auto mb-2" />
              <h4 className="text-sm font-black text-white mb-1">
                Need Help Planning Your Trip?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Let our certified native guides craft a tailored itinerary just for you.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#ff5411] px-5 py-2 text-xs font-bold text-white hover:bg-[#ea4908] transition shadow-md cursor-pointer"
              >
                <span>Plan My Trip</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* RELATED ARTICLES SECTION (BOTTOM 3 CARDS) */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-12 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#ff5411]">
                  DISCOVER MORE
                </span>
                <h3 className="text-xl sm:text-3xl font-black text-[#0d1e38] tracking-tight">
                  Related Travel Articles & Stories
                </h3>
              </div>
              <Link
                href="/local-guides#guides-articles"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff5411] hover:underline"
              >
                <span>View All Articles</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <article
                  key={rel.id}
                  className="group flex flex-col justify-between rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-900/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 shadow-sm">
                        {getCategoryIcon(rel.categoryIcon || rel.category)}
                        <span className="text-[11px] font-bold text-slate-800">
                          {rel.categoryLabel}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                        {rel.date}
                      </span>
                      <Link href={`/blog/${rel.slug || rel.id}`}>
                        <h4 className="text-sm sm:text-base font-extrabold text-[#0d1e38] group-hover:text-[#ff5411] transition-colors line-clamp-2 leading-snug mb-2">
                          {rel.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/blog/${rel.slug || rel.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#ff5411] hover:underline"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Tour Enquiry CTA banner */}
      <TourEnquiryCTA />

      {/* Footer */}
      <Footer />

      {/* Scroll to Top helper */}
      <ScrollToTop />
    </div>
  );
}
