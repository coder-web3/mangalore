"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowRight, Clock, Heart } from "lucide-react";

export interface PlaceItem {
  id: string;
  category: string; // 'beaches' | 'rivers' | 'hills' | 'temples' | 'nature' | 'cultural' | 'food'
  title: string;
  tag: string;
  rating: string;
  reviews: string;
  duration: string;
  location: string;
  description: string;
  image: string;
}

export const allPlacesData: PlaceItem[] = [
  // Beaches
  {
    id: "panambur",
    category: "beaches",
    title: "Panambur Beach & Watersports",
    tag: "Beaches & Fun",
    rating: "4.8",
    reviews: "2,150",
    duration: "Half Day",
    location: "NH-66, Mangalore",
    description:
      "One of India's cleanest beaches featuring jet skis, parasailing, camel rides, and the annual Kite Festival.",
    image: "/panambur.avif",
  },
  {
    id: "tannirbhavi",
    category: "beaches",
    title: "Tannirbhavi Beach & Tree Park",
    tag: "Serene & Relaxing",
    rating: "4.7",
    reviews: "1,890",
    duration: "2-3 hrs",
    location: "Bengre, Mangalore",
    description:
      "Lush casuarina pine tree groves, breezy wooden boardwalks, and tranquil Gurupura river ferry rides.",
    image: "/tannirbhavi.avif",
  },
  {
    id: "someshwar",
    category: "beaches",
    title: "Someshwar Beach & Rudra Shile",
    tag: "Sunset & Rock Formations",
    rating: "4.8",
    reviews: "1,340",
    duration: "2 hrs",
    location: "Ullal, Mangalore",
    description:
      "Golden sands framed by colossal rock boulders called Rudra Shila, offering spectacular sunset panoramas.",
    image: "/someshwar.avif",
  },
  {
    id: "nitk-beach",
    category: "beaches",
    title: "NITK Surathkal Lighthouse Beach",
    tag: "Iconic Lighthouse Sunset",
    rating: "4.9",
    reviews: "1,420",
    duration: "2-3 hrs",
    location: "Surathkal, Mangalore",
    description:
      "Panoramic coastal lighthouse overlooking Arabian Sea waves, golden rocks, and pristine beaches.",
    image: "/nitk.avif",
  },

  // Rivers & Backwaters
  {
    id: "sultan-battery",
    category: "rivers",
    title: "Sultan Battery Watchtower & Gurupura River",
    tag: "River & Watchtower",
    rating: "4.6",
    reviews: "1,120",
    duration: "1-2 hrs",
    location: "Boloor, Mangalore",
    description:
      "Historical miniature fortress erected by Tipu Sultan along Gurupura river backwaters with ferry rides across Bengre.",
    image: "/sulthan.avif",
  },
  {
    id: "sasihithlu",
    category: "rivers",
    title: "Sasihithlu River Estuary (Sangama)",
    tag: "River Estuary & Surfing",
    rating: "4.8",
    reviews: "980",
    duration: "Half Day",
    location: "Mukka, Mangalore",
    description:
      "Breathtaking confluence where the Nandini and Shambhavi rivers merge into the Arabian Sea; premier surfing spot.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },

  // Hills & Viewpoints
  {
    id: "lighthouse-hill",
    category: "hills",
    title: "Light House Hill Garden & Viewpoint",
    tag: "City Viewpoint",
    rating: "4.5",
    reviews: "1,200",
    duration: "1 hr",
    location: "Hampankatta, Mangalore",
    description:
      "Centuries-old first 18th-century lighthouse surrounded by blooming garden pathways with overlooking harbor views.",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
  },

  // Temples & Heritage
  {
    id: "kadri-temple",
    category: "temples",
    title: "Kadri Manjunath Temple",
    tag: "Spiritual Heritage",
    rating: "4.9",
    reviews: "4,100",
    duration: "1-2 hrs",
    location: "Kadri, Mangalore",
    description:
      "10th-century Vijayanagara spiritual sanctuary atop Kadri Hills with sacred spring Gomukha water tanks and bronze idols.",
    image: "/kadri.avif",
  },
  {
    id: "kudroli-temple",
    category: "temples",
    title: "Kudroli Gokarnanatheshwara Temple",
    tag: "Heritage & Dasara Fest",
    rating: "4.9",
    reviews: "3,800",
    duration: "1-2 hrs",
    location: "Kudroli, Mangalore",
    description:
      "Renowned spiritual temple built by Narayana Guru, world-famous for its dazzling illuminated Mangalore Dasara.",
    image: "/kudroli.avif",
  },
  {
    id: "kateel-temple",
    category: "temples",
    title: "Kateel Durgaparameshwari Temple",
    tag: "Island River Shrine",
    rating: "4.9",
    reviews: "3,500",
    duration: "2-3 hrs",
    location: "Kateel, Mangalore",
    description:
      "Sacred Hindu temple set on an islet in the middle of Nandini river, surrounded by lush coastal greenery.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
  },

  // Nature & Wildlife
  {
    id: "pilikula-eco",
    category: "nature",
    title: "Pilikula Nisargadhama Eco Park & Zoo",
    tag: "Nature & Wildlife",
    rating: "4.8",
    reviews: "1,620",
    duration: "Full Day",
    location: "Vamanjoor, Mangalore",
    description:
      "Sprawling biological park with tigers and leopards, 3D planetarium, heritage artisan village, and boating lake.",
    image: "/pilikula.avif",
  },

  // Cultural & Historic
  {
    id: "aloysius-chapel",
    category: "cultural",
    title: "St. Aloysius Chapel Frescoes",
    tag: "Historic Architecture",
    rating: "4.9",
    reviews: "2,300",
    duration: "1 hr",
    location: "Light House Hill, Mangalore",
    description:
      "Masterpiece 1899 chapel featuring ceiling and wall frescoes painted by Italian Jesuit artist Antony Moscheni.",
    image: "https://images.unsplash.com/photo-1548625361-19597ffc6600?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "milagres-church",
    category: "cultural",
    title: "Milagres Church (Church of Our Lady of Miracles)",
    tag: "Historic 1680 Landmark",
    rating: "4.8",
    reviews: "1,750",
    duration: "1 hr",
    location: "Hampankatta, Mangalore",
    description:
      "One of the oldest historic Roman Catholic churches in South Canara, built by Bishop Thomas de Castro in 1680.",
    image: "/milagrees.avif",
  },

  // Food & Markets
  {
    id: "central-market",
    category: "food",
    title: "Mangalore Central Spice & Fish Market",
    tag: "Culinary & Bazaar",
    rating: "4.6",
    reviews: "2,800",
    duration: "1-2 hrs",
    location: "Car Street, Mangalore",
    description:
      "Vibrant bazaar brimming with freshly caught coastal seafood, Byadgi chillies, cashew nuts, Halwa, and local spices.",
    image: "/meals.avif",
  },
];

interface PlacesCatalogProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function PlacesCatalog({
  selectedCategory,
  onSelectCategory,
}: PlacesCatalogProps) {
  const filteredPlaces =
    selectedCategory === "all"
      ? allPlacesData
      : allPlacesData.filter((p) => p.category === selectedCategory);

  return (
    <section id="places-catalog" className="bg-slate-50/60 py-12 sm:py-16 scroll-mt-24">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header with Results Count & Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-100/80 px-3 py-1 text-xs font-bold text-orange-600 mb-2">
              <span>CURATED ATTRACTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1e38] tracking-tight">
              Showing{" "}
              <span className="text-orange-600 capitalize">
                {selectedCategory === "all" ? "All Tourist Places" : selectedCategory}
              </span>{" "}
              ({filteredPlaces.length})
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Hand-picked sightseeing destinations with ratings, reviews, and travel tips.
            </p>
          </div>

          {selectedCategory !== "all" && (
            <button
              type="button"
              onClick={() => onSelectCategory("all")}
              className="self-start sm:self-auto text-xs font-bold text-orange-600 hover:text-orange-700 underline underline-offset-4 cursor-pointer"
            >
              Reset to All Places
            </button>
          )}
        </div>

        {/* Places Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Image Frame */}
              <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100">
                <Image
                  src={place.image}
                  alt={place.title}
                  fill
                  unoptimized
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Badge Tag */}
                <div className="absolute top-3.5 left-3.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-slate-800 shadow-sm">
                  {place.tag}
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1 rounded-full bg-[#0d1e38]/90 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-white shadow">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span>{place.rating}</span>
                  <span className="text-slate-300 font-normal text-[10px]">
                    ({place.reviews})
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                    <span className="flex items-center gap-1 font-medium text-slate-600">
                      <MapPin className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                      {place.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      {place.duration}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0d1e38] tracking-tight group-hover:text-orange-600 transition-colors mb-2 leading-snug">
                    {place.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed line-clamp-3">
                    {place.description}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-600 group-hover:text-orange-700 flex items-center gap-1">
                    <span>Explore Guide</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {place.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
