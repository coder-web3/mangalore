"use client";

import React from "react";
import GuidesHeroSection from "@/components/GuidesHeroSection";
import GuidesArticlesSection from "@/components/GuidesArticlesSection";
import { GuidesData } from "@/lib/cms";

interface GuidesClientWrapperProps {
  guidesData: GuidesData;
}

export default function GuidesClientWrapper({ guidesData }: GuidesClientWrapperProps) {
  return (
    <>
      {/* 1. Hero Section */}
      <GuidesHeroSection
        heroData={guidesData.listingHero}
        showFloatingTabs={false}
      />

      {/* 2. Travel Articles & Guides Section */}
      <GuidesArticlesSection
        articles={guidesData.articlesSection?.articles}
        categories={guidesData.articlesSection?.categories}
        popularPosts={guidesData.articlesSection?.popularPosts}
      />
    </>
  );
}
