"use client";

import React, { useState } from "react";
import {
  FileText,
  Sparkles,
  User,
  Compass,
  HelpCircle,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BookOpen,
  Image as ImageIcon,
  Lightbulb,
  CheckCircle2,
  Layers,
  ArrowRight,
  Calendar,
  Clock,
  Tag,
} from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import {
  BlogDetailData,
  BlogSectionItem,
  BlogKeyFact,
  BlogFaqItem,
  getDefaultBlogDetail,
} from "@/lib/cms";

interface BlogDetailAdminProps {
  blogDetails: Record<string, BlogDetailData>;
  selectedSlug: string;
  onSelectSlug: (slug: string) => void;
  onChangeArticle: (slug: string, updated: BlogDetailData) => void;
  onAddNewArticle?: (newArticle: BlogDetailData) => void;
  allArticleSlugs?: string[];
}

export default function BlogDetailAdmin({
  blogDetails,
  selectedSlug,
  onSelectSlug,
  onChangeArticle,
  onAddNewArticle,
  allArticleSlugs = [],
}: BlogDetailAdminProps) {
  const [activeTab, setActiveTab] = useState<
    "content" | "meta" | "author" | "facts" | "faqs"
  >("content");
  const [expandedSectionIndex, setExpandedSectionIndex] = useState<number | null>(0);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  // Current article
  const currentArticle: BlogDetailData =
    blogDetails[selectedSlug] || getDefaultBlogDetail(selectedSlug);

  const updateField = <K extends keyof BlogDetailData>(
    field: K,
    val: BlogDetailData[K]
  ) => {
    const updated: BlogDetailData = {
      ...currentArticle,
      [field]: val,
    };
    onChangeArticle(selectedSlug, updated);
  };

  const updateAuthorField = (
    field: "name" | "role" | "avatar" | "bio",
    val: string
  ) => {
    const updated: BlogDetailData = {
      ...currentArticle,
      author: {
        ...currentArticle.author,
        [field]: val,
      },
    };
    onChangeArticle(selectedSlug, updated);
  };

  // Section helpers
  const handleAddSection = () => {
    const newSection: BlogSectionItem = {
      id: `section-${Date.now()}`,
      title: `${(currentArticle.sections?.length || 0) + 1}. New Story Section`,
      paragraphs: ["Add your descriptive story paragraphs here."],
      proTip: "Insider local tip for travelers visiting this spot.",
      bulletPoints: ["Highlight point 1", "Highlight point 2"],
    };
    const updatedSections = [...(currentArticle.sections || []), newSection];
    updateField("sections", updatedSections);
    setExpandedSectionIndex(updatedSections.length - 1);
  };

  const handleUpdateSection = (
    index: number,
    field: keyof BlogSectionItem,
    val: any
  ) => {
    const updatedSections = [...(currentArticle.sections || [])];
    updatedSections[index] = {
      ...updatedSections[index],
      [field]: val,
    };
    updateField("sections", updatedSections);
  };

  const handleDeleteSection = (index: number) => {
    if (confirm("Are you sure you want to delete this story section?")) {
      const updatedSections = [...(currentArticle.sections || [])];
      updatedSections.splice(index, 1);
      updateField("sections", updatedSections);
      if (expandedSectionIndex === index) {
        setExpandedSectionIndex(null);
      }
    }
  };

  // Bullet point helpers
  const handleAddBulletPoint = (sectionIndex: number) => {
    const section = currentArticle.sections[sectionIndex];
    const updatedBullets = [...(section.bulletPoints || []), "New key highlight"];
    handleUpdateSection(sectionIndex, "bulletPoints", updatedBullets);
  };

  const handleUpdateBulletPoint = (
    sectionIndex: number,
    bulletIndex: number,
    val: string
  ) => {
    const section = currentArticle.sections[sectionIndex];
    const updatedBullets = [...(section.bulletPoints || [])];
    updatedBullets[bulletIndex] = val;
    handleUpdateSection(sectionIndex, "bulletPoints", updatedBullets);
  };

  const handleDeleteBulletPoint = (
    sectionIndex: number,
    bulletIndex: number
  ) => {
    const section = currentArticle.sections[sectionIndex];
    const updatedBullets = [...(section.bulletPoints || [])];
    updatedBullets.splice(bulletIndex, 1);
    handleUpdateSection(sectionIndex, "bulletPoints", updatedBullets);
  };

  // Key Facts helpers
  const handleAddFact = () => {
    const newFact: BlogKeyFact = {
      label: "Highlight Label",
      value: "Highlight Description",
    };
    updateField("keyFacts", [...(currentArticle.keyFacts || []), newFact]);
  };

  const handleUpdateFact = (
    index: number,
    field: "label" | "value",
    val: string
  ) => {
    const updatedFacts = [...(currentArticle.keyFacts || [])];
    updatedFacts[index] = {
      ...updatedFacts[index],
      [field]: val,
    };
    updateField("keyFacts", updatedFacts);
  };

  const handleDeleteFact = (index: number) => {
    const updatedFacts = [...(currentArticle.keyFacts || [])];
    updatedFacts.splice(index, 1);
    updateField("keyFacts", updatedFacts);
  };

  // FAQ helpers
  const handleAddFaq = () => {
    const newFaq: BlogFaqItem = {
      question: "Frequently asked question for travelers?",
      answer: "Clear, helpful insider answer from local guide experts.",
    };
    const updatedFaqs = [...(currentArticle.faqs || []), newFaq];
    updateField("faqs", updatedFaqs);
    setExpandedFaqIndex(updatedFaqs.length - 1);
  };

  const handleUpdateFaq = (
    index: number,
    field: "question" | "answer",
    val: string
  ) => {
    const updatedFaqs = [...(currentArticle.faqs || [])];
    updatedFaqs[index] = {
      ...updatedFaqs[index],
      [field]: val,
    };
    updateField("faqs", updatedFaqs);
  };

  const handleDeleteFaq = (index: number) => {
    const updatedFaqs = [...(currentArticle.faqs || [])];
    updatedFaqs.splice(index, 1);
    updateField("faqs", updatedFaqs);
    if (expandedFaqIndex === index) {
      setExpandedFaqIndex(null);
    }
  };

  // List of available slugs
  const availableSlugs = Array.from(
    new Set([...Object.keys(blogDetails), ...allArticleSlugs])
  );

  return (
    <div className="space-y-6">
      {/* Top Banner: Article Selector & Live Link */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-[#ff5e15]">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-black uppercase text-slate-500">
                  Selected Article:
                </label>
                <span className="rounded-md bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-[#ff5e15]">
                  {currentArticle.categoryLabel}
                </span>
              </div>
              <select
                value={selectedSlug}
                onChange={(e) => onSelectSlug(e.target.value)}
                className="mt-1 font-bold text-sm sm:text-base text-slate-900 bg-transparent border-0 border-b-2 border-orange-400 focus:outline-none cursor-pointer pr-8"
              >
                {availableSlugs.map((slug) => {
                  const article = blogDetails[slug];
                  const label = article ? article.title : slug;
                  return (
                    <option key={slug} value={slug}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`/blog/${selectedSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-orange-50 hover:text-[#ff5e15] hover:border-orange-200 transition-colors shadow-xs"
            >
              <span>View Public Page</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            {onAddNewArticle && (
              <button
                type="button"
                onClick={() => {
                  const title = prompt("Enter new article title:");
                  if (!title) return;
                  const slug = title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");
                  const newArt = getDefaultBlogDetail(slug, { title });
                  onAddNewArticle(newArt);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#ff5e15] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#ea4908] transition shadow-xs cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Blog</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Internal Subtabs Switcher */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        {[
          { id: "content", label: "Story Sections", icon: Layers, count: currentArticle.sections?.length || 0 },
          { id: "meta", label: "Title, Cover & Meta", icon: FileText },
          { id: "author", label: "Author Profile", icon: User },
          { id: "facts", label: "Fast Facts", icon: Compass, count: currentArticle.keyFacts?.length || 0 },
          { id: "faqs", label: "Traveler FAQs", icon: HelpCircle, count: currentArticle.faqs?.length || 0 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? "border-[#ff5e15] text-[#ff5e15]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-orange-100 text-[#ff5e15]" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: STORY SECTIONS ================= */}
      {activeTab === "content" && (
        <div className="space-y-6">
          {/* Lead Intro Box */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Article Opening Lead / Intro Paragraph
              </label>
              <span className="text-[11px] text-slate-400">
                Shown prominently at the start of the article
              </span>
            </div>
            <textarea
              rows={3}
              value={currentArticle.intro}
              onChange={(e) => updateField("intro", e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3 text-xs sm:text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#ff5e15]"
              placeholder="Compelling opening paragraph..."
            />
          </div>

          {/* Sections List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900">
                Story Sub-Sections ({currentArticle.sections?.length || 0})
              </h3>
              <button
                type="button"
                onClick={handleAddSection}
                className="inline-flex items-center gap-1.5 rounded-xl bg-orange-50 border border-orange-200 px-3 py-1.5 text-xs font-bold text-[#ff5e15] hover:bg-orange-100 transition cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Story Section</span>
              </button>
            </div>

            {(currentArticle.sections || []).map((section, sIdx) => {
              const isExpanded = expandedSectionIndex === sIdx;

              return (
                <div
                  key={section.id || sIdx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-all"
                >
                  <div
                    onClick={() => setExpandedSectionIndex(isExpanded ? null : sIdx)}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors select-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 font-mono text-xs font-extrabold text-[#ff5e15]">
                        #{sIdx + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">
                          {section.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {section.paragraphs?.[0] || "No content yet"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSection(sIdx);
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition cursor-pointer"
                        title="Delete section"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="p-1 text-slate-400">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-5 sm:p-6 border-t border-slate-200 bg-slate-50/50 space-y-5">
                      {/* Section Title */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Section Heading (H2)
                        </label>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) =>
                            handleUpdateSection(sIdx, "title", e.target.value)
                          }
                          className="w-full rounded-xl border border-slate-300 p-2.5 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                        />
                      </div>

                      {/* Section Paragraphs */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-semibold text-slate-700">
                            Story Paragraphs (separate multiple paragraphs with double line breaks)
                          </label>
                          <span className="text-[11px] text-slate-400">
                            {(section.paragraphs || []).length} paragraph(s)
                          </span>
                        </div>
                        <textarea
                          rows={4}
                          value={(section.paragraphs || []).join("\n\n")}
                          onChange={(e) => {
                            const paras = e.target.value
                              .split(/\n\s*\n/)
                              .filter((p) => p.trim());
                            handleUpdateSection(sIdx, "paragraphs", paras);
                          }}
                          className="w-full rounded-xl border border-slate-300 p-3 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          placeholder="Write section narrative..."
                        />
                      </div>

                      {/* Inline Image & Caption */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Section Photo (Optional)
                          </label>
                          <ImageUploader
                            currentImage={section.image}
                            onImageSelected={(url) =>
                              handleUpdateSection(sIdx, "image", url)
                            }
                            label="Section Illustration Photo"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Photo Caption
                          </label>
                          <input
                            type="text"
                            value={section.imageCaption || ""}
                            onChange={(e) =>
                              handleUpdateSection(sIdx, "imageCaption", e.target.value)
                            }
                            placeholder="e.g. Scenic coastal views from the rocky outcrop"
                            className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                          />
                        </div>
                      </div>

                      {/* Local Insider Tip */}
                      <div className="pt-2 border-t border-slate-200">
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 mb-1">
                          <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                          <span>Local Insider Tip Box (Highlighted amber alert)</span>
                        </label>
                        <input
                          type="text"
                          value={section.proTip || ""}
                          onChange={(e) =>
                            handleUpdateSection(sIdx, "proTip", e.target.value)
                          }
                          placeholder="e.g. Take the ferry from Sultan Battery around 4:30 PM for sunset views."
                          className="w-full rounded-xl border border-amber-200 bg-amber-50/40 p-2.5 text-xs text-slate-800 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      {/* Bullet Highlights Checklist */}
                      <div className="pt-2 border-t border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-slate-700">
                            Key Highlights / Bullet Points
                          </label>
                          <button
                            type="button"
                            onClick={() => handleAddBulletPoint(sIdx)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#ff5e15] hover:underline cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                            <span>Add Bullet</span>
                          </button>
                        </div>

                        {(section.bulletPoints || []).map((bp, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-2">
                            <span className="text-slate-400 text-xs">•</span>
                            <input
                              type="text"
                              value={bp}
                              onChange={(e) =>
                                handleUpdateBulletPoint(sIdx, bIdx, e.target.value)
                              }
                              className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteBulletPoint(sIdx, bIdx)}
                              className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 2: META & COVER ================= */}
      {activeTab === "meta" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Article Title (H1)
              </label>
              <input
                type="text"
                value={currentArticle.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs sm:text-sm font-bold text-slate-900 bg-white focus:outline-none focus:border-[#ff5e15]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={currentArticle.category}
                onChange={(e) => {
                  const val = e.target.value;
                  const catMap: Record<string, string> = {
                    beaches: "Beaches",
                    food: "Food & Dining",
                    temples: "Temples & Heritage",
                    tips: "Travel Tips",
                    culture: "Culture & Festivals",
                    festivals: "Festivals",
                    nature: "Nature & Outdoors",
                  };
                  updateField("category", val);
                  if (catMap[val]) {
                    updateField("categoryLabel", catMap[val]);
                  }
                }}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
              >
                <option value="beaches">Beaches</option>
                <option value="food">Food & Dining</option>
                <option value="temples">Temples & Heritage</option>
                <option value="tips">Travel Tips</option>
                <option value="culture">Culture</option>
                <option value="festivals">Festivals</option>
                <option value="nature">Nature & Outdoors</option>
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subtitle / Tagline
              </label>
              <input
                type="text"
                value={currentArticle.subtitle || ""}
                onChange={(e) => updateField("subtitle", e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Published Date
              </label>
              <input
                type="text"
                value={currentArticle.date}
                onChange={(e) => updateField("date", e.target.value)}
                placeholder="e.g. October 12, 2025"
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reading Time
              </label>
              <input
                type="text"
                value={currentArticle.readingTime}
                onChange={(e) => updateField("readingTime", e.target.value)}
                placeholder="e.g. 7 min read"
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={currentArticle.slug}
                disabled
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-500 bg-slate-100 cursor-not-allowed"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Featured Cover Image
              </label>
              <ImageUploader
                currentImage={currentArticle.heroImage}
                onImageSelected={(url) => updateField("heroImage", url)}
                label="Article Hero Header Image"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hero Photo Caption
              </label>
              <input
                type="text"
                value={currentArticle.heroImageCaption || ""}
                onChange={(e) => updateField("heroImageCaption", e.target.value)}
                placeholder="e.g. Golden sands and gentle waves along the Mangalore coastline"
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={(currentArticle.tags || []).join(", ")}
                onChange={(e) => {
                  const tags = e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean);
                  updateField("tags", tags);
                }}
                placeholder="Panambur Beach, Tannirbhavi, Beach Tourism, Water Sports"
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: AUTHOR PROFILE ================= */}
      {activeTab === "author" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <User className="h-5 w-5 text-[#ff5e15]" />
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Author & Editorial Information
              </h3>
              <p className="text-xs text-slate-500">
                Displayed in the article header and the author card at the end of the post.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Author Full Name
              </label>
              <input
                type="text"
                value={currentArticle.author?.name || ""}
                onChange={(e) => updateAuthorField("name", e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Author Title / Role
              </label>
              <input
                type="text"
                value={currentArticle.author?.role || ""}
                onChange={(e) => updateAuthorField("role", e.target.value)}
                placeholder="e.g. Coastal Travel Writer & Surf Enthusiast"
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Author Avatar Photo
              </label>
              <ImageUploader
                currentImage={currentArticle.author?.avatar}
                onImageSelected={(url) => updateAuthorField("avatar", url)}
                label="Author Headshot"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Author Biography
              </label>
              <textarea
                rows={3}
                value={currentArticle.author?.bio || ""}
                onChange={(e) => updateAuthorField("bio", e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                placeholder="Brief bio describing the author's local expertise..."
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: FAST FACTS ================= */}
      {activeTab === "facts" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Trip Overview & Fast Facts ({currentArticle.keyFacts?.length || 0})
              </h3>
              <p className="text-xs text-slate-500">
                Quick facts displayed in the highlighted box at the beginning of the article.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddFact}
              className="inline-flex items-center gap-1.5 rounded-xl bg-orange-50 border border-orange-200 px-3 py-1.5 text-xs font-bold text-[#ff5e15] hover:bg-orange-100 transition cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Fact</span>
            </button>
          </div>

          <div className="space-y-3">
            {(currentArticle.keyFacts || []).map((fact, fIdx) => (
              <div
                key={fIdx}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50"
              >
                <div className="w-1/3">
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">
                    Label
                  </label>
                  <input
                    type="text"
                    value={fact.label}
                    onChange={(e) => handleUpdateFact(fIdx, "label", e.target.value)}
                    placeholder="e.g. Best Season"
                    className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">
                    Value
                  </label>
                  <input
                    type="text"
                    value={fact.value}
                    onChange={(e) => handleUpdateFact(fIdx, "value", e.target.value)}
                    placeholder="e.g. October to March"
                    className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#ff5e15]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteFact(fIdx)}
                  className="mt-4 p-2 text-slate-400 hover:text-red-500 rounded-lg transition cursor-pointer"
                  title="Remove Fact"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 5: TRAVELER FAQS ================= */}
      {activeTab === "faqs" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Frequently Asked Traveler Questions ({currentArticle.faqs?.length || 0})
              </h3>
              <p className="text-xs text-slate-500">
                Accordion Q&A displayed at the end of the article.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddFaq}
              className="inline-flex items-center gap-1.5 rounded-xl bg-orange-50 border border-orange-200 px-3 py-1.5 text-xs font-bold text-[#ff5e15] hover:bg-orange-100 transition cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Question</span>
            </button>
          </div>

          <div className="space-y-3">
            {(currentArticle.faqs || []).map((faq, qIdx) => {
              const isExpanded = expandedFaqIndex === qIdx;

              return (
                <div
                  key={qIdx}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden"
                >
                  <div
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : qIdx)}
                    className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-100/60 select-none"
                  >
                    <span className="font-bold text-xs sm:text-sm text-slate-800">
                      {qIdx + 1}. {faq.question}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFaq(qIdx);
                        }}
                        className="p-1 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-4 border-t border-slate-200 bg-white space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Question
                        </label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) =>
                            handleUpdateFaq(qIdx, "question", e.target.value)
                          }
                          className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Answer
                        </label>
                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) =>
                            handleUpdateFaq(qIdx, "answer", e.target.value)
                          }
                          className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-800 focus:outline-none focus:border-[#ff5e15]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
