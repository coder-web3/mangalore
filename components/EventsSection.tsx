"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Utensils,
  Music,
  Palette,
  Flame,
  Users,
} from "lucide-react";

interface EventCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  image: string;
}

const eventCategories: EventCategory[] = [
  {
    id: "cultural",
    title: "Cultural Programs",
    icon: <Sparkles className="h-3.5 w-3.5 text-orange-400" />,
    image: "/cultural.avif",
  },
  {
    id: "food-fests",
    title: "Food Festivals",
    icon: <Utensils className="h-3.5 w-3.5 text-orange-400" />,
    image: "/food.avif",
  },
  {
    id: "concerts",
    title: "Concerts & Music",
    icon: <Music className="h-3.5 w-3.5 text-orange-400" />,
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "exhibitions",
    title: "Exhibitions",
    icon: <Palette className="h-3.5 w-3.5 text-orange-400" />,
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "religious",
    title: "Religious Festivals",
    icon: <Flame className="h-3.5 w-3.5 text-orange-400" />,
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "community",
    title: "Community Events",
    icon: <Users className="h-3.5 w-3.5 text-orange-400" />,
    image: "/community.avif",
  },
];

export default function EventsSection() {
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

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -260, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 260, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative bg-white py-12 sm:py-14 lg:py-16 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
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
                WHAT&apos;S HAPPENING
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0d1e38] leading-tight">
              Events in <span className="text-[#ea580c]">Mangalore</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-xl font-normal leading-relaxed">
              Discover upcoming festivals, cultural programs, concerts, markets
              and more.
            </p>
          </div>

          {/* Right Action: View All Link & Carousel Controls */}
          <div className="flex items-center gap-3 sm:gap-4 self-start sm:self-end">
            <Link
              href="#events"
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#ea580c] hover:text-orange-600 transition-colors"
            >
              <span>View All Events</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
              <button
                type="button"
                onClick={scrollLeft}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:border-orange-400 hover:text-orange-600 hover:scale-105 active:scale-95"
                aria-label="Previous events"
              >
                <ArrowLeft className="h-4 w-4 stroke-[2.2]" />
              </button>
              <button
                type="button"
                onClick={scrollRight}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:border-orange-400 hover:text-orange-600 hover:scale-105 active:scale-95"
                aria-label="Next events"
              >
                <ArrowRight className="h-4 w-4 stroke-[2.2]" />
              </button>
            </div>
          </div>
        </div>

        {/* 6 Event Category Cards in One Row */}
        <div
          ref={containerRef}
          className={`flex items-center gap-3.5 sm:gap-4 lg:grid lg:grid-cols-6 overflow-x-auto pb-3 pt-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {eventCategories.map((cat, idx) => (
            <div
              key={cat.id}
              className="group relative flex-shrink-0 w-[200px] sm:w-[220px] lg:w-full h-[200px] sm:h-[215px] lg:h-[230px] rounded-[20px] sm:rounded-[22px] overflow-hidden cursor-pointer shadow-md shadow-slate-900/10 border border-slate-100/60 transition-all duration-500 hover:shadow-xl hover:shadow-slate-900/15 hover:-translate-y-1.5"
              style={{
                transitionDelay: `${idx * 70 + 80}ms`,
              }}
            >
              {/* Event Image */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />
              </div>

              {/* Card Bottom Content Area */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 sm:p-4 flex items-end justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 pr-1">
                  {/* Small Circular Frosted Icon Badge */}
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-orange-500/80">
                    {cat.icon}
                  </div>
                  <h3 className="text-xs sm:text-sm lg:text-[13px] font-extrabold text-white leading-tight drop-shadow-md tracking-tight">
                    {cat.title}
                  </h3>
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
