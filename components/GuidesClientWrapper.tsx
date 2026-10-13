"use client";

import React, { useState } from "react";
import GuidesHeroSection from "@/components/GuidesHeroSection";
import GuidesCatalogSection from "@/components/GuidesCatalogSection";
import { GuidesData } from "@/lib/cms";

interface GuidesClientWrapperProps {
  guidesData: GuidesData;
}

export default function GuidesClientWrapper({ guidesData }: GuidesClientWrapperProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <>
      {/* Hero Section with Functional Category Filtering Pills & Stats */}
      <GuidesHeroSection
        activeTab={selectedCategory}
        onSelectTab={(cat) => setSelectedCategory(cat)}
        heroData={guidesData.listingHero}
      />

      {/* Verified Local Guides Catalog */}
      <GuidesCatalogSection
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        guidesList={guidesData.listingCatalog.guides}
        catalogHeader={guidesData.listingCatalog}
      />
    </>
  );
}
