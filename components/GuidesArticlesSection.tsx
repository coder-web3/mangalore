"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutGrid,
  Palmtree,
  Landmark,
  UtensilsCrossed,
  Sparkles,
  BookOpen,
  Calendar,
  Search,
  ChevronRight,
  Flame,
  Mail,
  Bookmark,
  ArrowRight,
  Leaf,
  CheckCircle2,
  X,
} from "lucide-react";
import { GuideArticleItem, GuideSidebarCategory, GuidePopularPost } from "@/lib/cms";

interface GuidesArticlesSectionProps {
  articles?: GuideArticleItem[];
  categories?: GuideSidebarCategory[];
  popularPosts?: GuidePopularPost[];
}

const defaultFilterTabs = [
  { id: "all", label: "All Articles", icon: LayoutGrid, color: "text-[#ff5e15]" },
  { id: "beaches", label: "Beaches", icon: Palmtree, color: "text-emerald-500" },
  { id: "temples", label: "Temples", icon: Landmark, color: "text-orange-500" },
  { id: "food", label: "Food", icon: UtensilsCrossed, color: "text-rose-500" },
  { id: "culture", label: "Culture", icon: Sparkles, color: "text-purple-500" },
  { id: "tips", label: "Travel Tips", icon: BookOpen, color: "text-blue-500" },
  { id: "festivals", label: "Festivals", icon: Calendar, color: "text-amber-500" },
];

export default function GuidesArticlesSection({
  articles = [],
  categories = [],
  popularPosts = [],
}: GuidesArticlesSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail("");
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesTab = activeTab === "all" || article.category === activeTab;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.categoryLabel.toLowerCase().includes(query);
    return matchesTab && matchesSearch;
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "beach":
        return <Palmtree className="h-4 w-4 text-emerald-500" />;
      case "culture":
        return <Sparkles className="h-4 w-4 text-purple-500" />;
      case "temple":
        return <Landmark className="h-4 w-4 text-orange-500" />;
      case "tips":
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case "food":
        return <UtensilsCrossed className="h-4 w-4 text-rose-500" />;
      case "festivals":
        return <Calendar className="h-4 w-4 text-amber-500" />;
      case "nature":
        return <Leaf className="h-4 w-4 text-emerald-600" />;
      default:
        return <Sparkles className="h-4 w-4 text-[#ff5e15]" />;
    }
  };

  return (
    <section id="guides-articles" className="relative w-full bg-[#f8fbff] py-8 sm:py-12 lg:py-14 scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* TOP FILTER TABS BAR (Matches exact screenshot styling) */}
        <div className="mb-8 sm:mb-10 flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
          {defaultFilterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#ff5411] text-white shadow-lg shadow-orange-600/25 scale-[1.02]"
                    : "bg-white text-slate-700 hover:text-[#ff5411] hover:bg-slate-50 border border-slate-200/90 shadow-xs"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isActive ? "text-white" : tab.color
                  }`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 2-COLUMN MAIN LAYOUT: Left Articles Grid & Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* LEFT: ARTICLES GRID (8 COLS) */}
          <div className="lg:col-span-8 xl:col-span-8.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
              {filteredArticles.map((article) => {
                const isSaved = bookmarkedIds[article.id];
                const href =
                  article.readLink && article.readLink.startsWith("/blog/")
                    ? article.readLink
                    : `/blog/${article.slug || article.id}`;

                return (
                  <article
                    key={article.id}
                    className="group flex flex-col justify-between rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-900/5 hover:shadow-2xl hover:shadow-slate-900/10 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                  >
                    <div>
                      {/* Article Photo with Category Pill Badge */}
                      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        {/* Subtle Top-to-Bottom Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

                        {/* Floating Category Tag */}
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 shadow-md border border-white/80">
                          {getCategoryIcon(article.categoryIcon || article.category)}
                          <span className="text-[11px] font-bold text-slate-800">
                            {article.categoryLabel}
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 sm:p-5">
                        {/* Date Row */}
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 mb-2">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          <span>{article.date}</span>
                        </div>

                        {/* Title */}
                        <Link href={href}>
                          <h3 className="text-sm sm:text-base font-extrabold text-[#0d1e38] tracking-tight leading-snug line-clamp-2 mb-2 group-hover:text-[#ff5411] transition-colors">
                            {article.title}
                          </h3>
                        </Link>

                        {/* Excerpt */}
                        <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Footer Row: Read Article Link & Bookmark Button */}
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 flex items-center justify-between border-t border-slate-100">
                      <Link
                        href={href}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#ff5411] hover:text-[#ea4908] transition-colors"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={(e) => toggleBookmark(article.id, e)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isSaved
                            ? "text-[#ff5411] bg-orange-50"
                            : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                        }`}
                        title={isSaved ? "Saved to reading list" : "Bookmark article"}
                        aria-label="Bookmark article"
                      >
                        <Bookmark
                          className={`h-4 w-4 ${
                            isSaved ? "fill-[#ff5411]" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredArticles.length === 0 && (
              <div className="p-12 text-center rounded-3xl bg-white border border-slate-200">
                <p className="text-sm font-semibold text-slate-700">
                  No articles found matching &ldquo;{searchQuery || activeTab}&rdquo;.
                </p>
                <button
                  onClick={() => {
                    setActiveTab("all");
                    setSearchQuery("");
                  }}
                  className="mt-3 text-xs font-bold text-[#ff5411] hover:underline cursor-pointer"
                >
                  View All Articles
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: SIDEBAR (4 COLS - Matches exact screenshot cards) */}
          <div className="lg:col-span-4 xl:col-span-3.5 space-y-5 sm:space-y-6">
            {/* 1. SEARCH BLOG CARD */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#0a1e38] via-[#0d2444] to-[#122e54] p-5 sm:p-6 text-white shadow-xl shadow-slate-900/10 overflow-hidden">
              {/* Subtle Palm Silhouette Background */}
              <div className="absolute right-0 top-0 bottom-0 w-36 pointer-events-none opacity-20 overflow-hidden select-none">
                <Image
                  src="/footer-palm-sketch.jpg"
                  alt="Palm Background"
                  fill
                  className="object-cover object-right"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300">
                    <Search className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white tracking-tight leading-tight">
                      Search Blog
                    </h3>
                    <p className="text-[11px] text-white/70">
                      Find travel guides, food stories, tips and more...
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center rounded-2xl bg-white p-1 shadow-md">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles, destinations..."
                    className="w-full bg-transparent px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  />
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("guides-articles");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ff5411] text-white hover:bg-[#ea4908] transition shadow-md shadow-orange-950/30 cursor-pointer"
                    aria-label="Search"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. CATEGORIES CARD */}
            <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-md shadow-slate-900/5 border border-slate-200/90">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4 text-[#ff5411]" />
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0d1e38]">
                      Categories
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Explore articles by topic.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className="text-xs font-bold text-[#ff5411] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>

              {/* 2-Column Categories Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveTab(cat.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      activeTab === cat.id
                        ? "bg-orange-50 border-orange-200 shadow-xs"
                        : "bg-slate-50/70 border-slate-100 hover:bg-orange-50/50 hover:border-orange-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="shrink-0">
                        {getCategoryIcon(cat.icon || cat.id)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">
                          {cat.label}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {cat.articleCount}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* 3. POPULAR POSTS CARD */}
            <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-md shadow-slate-900/5 border border-slate-200/90">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-[#ff5411]" />
                  <h3 className="text-sm font-extrabold text-[#0d1e38]">
                    Popular Posts
                  </h3>
                </div>

                <Link
                  href="/places-to-visit"
                  className="text-xs font-bold text-[#ff5411] hover:underline inline-flex items-center gap-0.5"
                >
                  <span>View All</span>
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="space-y-3">
                {popularPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={post.link || "/places-to-visit"}
                    className="group flex items-center justify-between gap-3 p-2 rounded-2xl hover:bg-slate-50 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-extrabold text-[#0d1e38] truncate group-hover:text-[#ff5411] transition-colors">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-[#ff5411] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* 4. GET TRAVEL UPDATES NEWSLETTER CARD */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#091a32] via-[#0d223f] to-[#122c4e] p-5 sm:p-6 text-white shadow-xl shadow-slate-900/10 overflow-hidden">
              {/* Subtle Sunset Palm Horizon Graphic */}
              <div className="absolute right-0 top-0 bottom-0 w-36 pointer-events-none opacity-25 overflow-hidden select-none">
                <Image
                  src="/footer-lighthouse.jpg"
                  alt="Sunset Coast"
                  fill
                  className="object-cover object-right"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff5411]/20 border border-orange-500/30 text-[#ff5411]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white">
                      Get Travel Updates
                    </h3>
                  </div>
                </div>

                <p className="text-[11px] text-white/75 leading-relaxed mb-3.5">
                  Subscribe to our blog for the latest travel guides, tips and stories.
                </p>

                {subscribed ? (
                  <div className="flex items-center gap-2 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 p-3 text-xs text-emerald-300">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Thank you! You are now subscribed to travel updates.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="flex-1 rounded-xl bg-white px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#ff5411] hover:bg-[#ea4908] px-4 py-2 text-xs font-bold text-white transition shadow-md shadow-orange-950/30 cursor-pointer shrink-0"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
