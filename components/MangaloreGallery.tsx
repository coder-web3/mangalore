"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Eye, X } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Panambur Beach Sunset",
    category: "beaches",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Heritage Pagoda Temple",
    category: "temples",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Netravati River & Palms",
    category: "nature",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "Authentic Ghee Roast Feast",
    category: "food",
    image:
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    title: "Historic Coastal Fort",
    category: "culture",
    image:
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    title: "Mangalore Suspension Bridge Twilight",
    category: "city",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "7",
    title: "Milagres Historic Altar",
    category: "culture",
    image: "/milagrees.avif",
  },
];

const filterTabs = [
  { id: "all", label: "All" },
  { id: "beaches", label: "Beaches" },
  { id: "temples", label: "Temples" },
  { id: "nature", label: "Nature" },
  { id: "food", label: "Food" },
  { id: "culture", label: "Culture" },
  { id: "city", label: "City Life" },
];

export default function MangaloreGallery() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const filteredItems =
    activeTab === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative bg-white py-10 sm:py-14 lg:py-16 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-9 gap-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Left Title & Subtitle */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-orange-500 font-extrabold text-sm">—</span>
              <span className="text-[11px] sm:text-xs font-extrabold tracking-widest text-[#0d1e38] uppercase">
                GALLERY
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0d1e38] leading-tight">
              Mangalore in <span className="text-[#ea580c]">Pictures</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-xl font-normal leading-relaxed">
              A visual journey through Mangalore&apos;s beaches, heritage, culture,
              food and everyday moments.
            </p>
          </div>

          {/* Right Filter Pills & Navigation Arrows */}
          <div className="flex items-center flex-wrap sm:flex-nowrap gap-3 sm:gap-4 self-start lg:self-end">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {filterTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-full px-3.5 sm:px-4 py-1.5 text-xs sm:text-[13px] font-semibold transition-all duration-300 focus:outline-none whitespace-nowrap ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/30 scale-105"
                        : "border border-slate-200/90 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50/50"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Carousel Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
              <button
                type="button"
                onClick={scrollLeft}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:border-orange-400 hover:text-orange-600 hover:scale-105 active:scale-95"
                aria-label="Previous photos"
              >
                <ArrowLeft className="h-4 w-4 stroke-[2.2]" />
              </button>
              <button
                type="button"
                onClick={scrollRight}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:border-orange-400 hover:text-orange-600 hover:scale-105 active:scale-95"
                aria-label="Next photos"
              >
                <ArrowRight className="h-4 w-4 stroke-[2.2]" />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Carousel Row */}
        <div className="relative">
          <div
            ref={containerRef}
            className={`flex items-center gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative flex-shrink-0 w-[200px] sm:w-[220px] lg:w-[calc((100%-6*16px)/7)] xl:w-[calc((100%-6*18px)/7)] h-[260px] sm:h-[280px] lg:h-[300px] rounded-[20px] sm:rounded-[24px] overflow-hidden cursor-pointer shadow-md shadow-slate-900/8 border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-2 select-none"
                style={{
                  transitionDelay: `${idx * 60 + 80}ms`,
                }}
              >
                {/* Photo Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 220px, 15vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Floating Eye Icon & Caption on Hover */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="self-end rounded-full bg-white/30 backdrop-blur-md p-2 text-white">
                    <Eye className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-orange-400 uppercase">
                      {item.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-extrabold text-white leading-snug drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 transition-all duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl bg-black"
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 flex items-center justify-center transition-colors"
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative w-full h-[60vh] sm:h-[70vh]">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <div className="p-4 sm:p-5 bg-gradient-to-t from-black via-black/90 to-transparent text-white">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                {selectedImage.category}
              </span>
              <h3 className="text-base sm:text-lg font-bold">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
