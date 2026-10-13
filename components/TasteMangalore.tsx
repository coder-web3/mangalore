"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FoodCategory {
  id: string;
  title: string;
  count?: string;
  image: string;
}

const foodCategories: FoodCategory[] = [
  {
    id: "mangalorean",
    title: "Mangalorean Cuisine",
    image: "/meals.avif",
  },
  {
    id: "seafood",
    title: "Seafood",
    image: "/seafood.avif",
  },
  {
    id: "cafes",
    title: "Cafés & Bakeries",
    image: "/cafe.avif",
  },
  {
    id: "restaurants",
    title: "Restaurants",
    image: "/restaurant.avif",
  },
  {
    id: "beverages",
    title: "Juices & Beverages",
    image: "/drinks.avif",
  },
  {
    id: "nightfood",
    title: "Late-Night Food",
    image: "/late-food.avif",
  },
];

interface TasteMangaloreProps {
  initialData?: {
    tag?: string;
    title?: string;
    description?: string;
    categories?: Array<{
      id: string;
      title: string;
      image: string;
    }>;
  };
}

export default function TasteMangalore({ initialData }: TasteMangaloreProps) {
  const categoriesList = initialData?.categories && initialData.categories.length > 0 ? initialData.categories : foodCategories;
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="food"
      className="relative bg-white pt-10 sm:pt-12 lg:pt-14 pb-2 sm:pb-3 lg:pb-4 overflow-hidden"
    >
      {/* Top Right Warm Village / Palms Sketch Illustration Background */}
      <div className="absolute top-0 right-0 w-[360px] sm:w-[480px] lg:w-[600px] h-[180px] sm:h-[220px] pointer-events-none select-none z-0 overflow-hidden opacity-25">
        <svg
          viewBox="0 0 500 200"
          className="w-full h-full text-orange-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Palm trees silhouettes & coastline village sketch */}
          <path d="M420 180 Q430 110 440 60 M440 60 Q400 50 370 70 M440 60 Q460 30 490 40 M440 60 Q470 70 495 90 M440 60 Q420 30 400 35 M440 60 Q445 20 460 10" />
          <path d="M360 190 Q370 130 380 90 M380 90 Q350 80 330 95 M380 90 Q400 70 425 80 M380 90 Q410 100 430 115 M380 90 Q365 65 350 70" />
          <path d="M280 195 Q290 150 295 120 M295 120 Q270 110 255 125 M295 120 Q315 105 335 112 M295 120 Q320 130 338 140" />
          {/* Coastal roofs & houses line */}
          <path d="M200 190 L220 170 L250 170 L260 190 M270 190 L285 165 L315 165 L330 190 M340 190 L360 160 L400 160 L420 190" />
          <path d="M150 195 C250 190 350 192 500 190" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-9 gap-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-orange-500 font-extrabold text-sm">—</span>
              <span className="text-[11px] sm:text-xs font-extrabold tracking-widest text-[#0d1e38] uppercase">
                {initialData?.tag || "FOOD & DINING"}
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0d1e38] leading-tight">
              {initialData?.title || (
                <>
                  Taste <span className="text-[#ea580c]">Mangalore</span>
                </>
              )}
            </h2>

            {/* Subtitle */}
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-xl font-normal leading-relaxed">
              {initialData?.description ||
                "From authentic Mangalorean cuisine to cafés and seafood, explore the best places to eat in the city."}
            </p>
          </div>

          {/* View All Food Link */}
          <Link
            href="#food"
            className="group self-start sm:self-end inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#ea580c] hover:text-orange-600 transition-colors"
          >
            <span>View All Food</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Food Category Cards in One Row */}
        <div
          className={`flex items-center gap-3.5 sm:gap-4 lg:grid lg:grid-cols-6 overflow-x-auto pb-3 pt-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {categoriesList.map((cat, idx) => (
            <div
              key={cat.id}
              className="group relative flex-shrink-0 w-[200px] sm:w-[220px] lg:w-full h-[200px] sm:h-[215px] lg:h-[230px] rounded-[20px] sm:rounded-[22px] overflow-hidden cursor-pointer shadow-md shadow-slate-900/10 border border-slate-100/60 transition-all duration-500 hover:shadow-xl hover:shadow-slate-900/15 hover:-translate-y-1.5"
              style={{
                transitionDelay: `${idx * 70 + 80}ms`,
              }}
            >
              {/* Background Food Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 220px, (max-width: 1200px) 200px, 16vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Gradient Overlay for Crisp Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent transition-opacity duration-300 group-hover:opacity-95" />
              </div>

              {/* Card Bottom Content Area */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 sm:p-4 flex items-end justify-between gap-2">
                <div className="flex-1 min-w-0 pr-1">
                  <h3 className="text-xs sm:text-sm lg:text-[14px] font-extrabold text-white leading-tight drop-shadow-md tracking-tight">
                    {cat.title}
                  </h3>

                  {/* Orange accent line indicator */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-4 h-[3px] bg-orange-500 rounded-full" />
                  </div>
                </div>

                {/* Circular Arrow Button */}
                <div className="flex-shrink-0">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:scale-110">
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
