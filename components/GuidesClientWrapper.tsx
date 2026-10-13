"use client";

import React, { useState } from "react";
import GuidesHeroSection from "@/components/GuidesHeroSection";
import GuidesArticlesSection from "@/components/GuidesArticlesSection";
import GuidesCatalogSection from "@/components/GuidesCatalogSection";
import { GuidesData } from "@/lib/cms";

interface GuidesClientWrapperProps {
  guidesData: GuidesData;
}

export default function GuidesClientWrapper({ guidesData }: GuidesClientWrapperProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <>
      {/* 1. Hero Section */}
      <GuidesHeroSection
        heroData={guidesData.listingHero}
        showFloatingTabs={false}
      />

      {/* 2. Travel Articles & Guides Section (Matches user's exact uploaded design) */}
      <GuidesArticlesSection
        articles={guidesData.articlesSection?.articles}
        categories={guidesData.articlesSection?.categories}
        popularPosts={guidesData.articlesSection?.popularPosts}
      />

      {/* 3. Verified Native Local Guides Directory */}
      <GuidesCatalogSection
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        guidesList={guidesData.listingCatalog.guides}
        catalogHeader={guidesData.listingCatalog}
      />
    </>
  );
}
