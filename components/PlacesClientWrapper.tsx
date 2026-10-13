"use client";

import React, { useState } from "react";
import PlacesHeroSection from "@/components/PlacesHeroSection";
import PopularPlacesSection from "@/components/PopularPlacesSection";
import { PlacesData } from "@/lib/cms";

interface PlacesClientWrapperProps {
  placesData: PlacesData;
  breadcrumbLabel?: string;
}

export default function PlacesClientWrapper({
  placesData,
  breadcrumbLabel,
}: PlacesClientWrapperProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <>
      {/* Exact Hero Section with Functional Category Pills */}
      <PlacesHeroSection
        activeTab={selectedCategory}
        onSelectTab={(cat) => setSelectedCategory(cat)}
        heroData={placesData.listingHero}
        breadcrumbLabel={breadcrumbLabel}
      />

      {/* Popular Tourist Places in Mangalore Section matching design */}
      <div id="popular-tourist-places">
        <PopularPlacesSection
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          placesList={placesData.listingCatalog.places}
          catalogHeader={placesData.listingCatalog}
        />
      </div>
    </>
  );
}
