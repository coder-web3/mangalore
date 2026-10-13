"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PlanTripCTAProps {
  initialData?: {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
  };
}

export default function PlanTripCTA({ initialData }: PlanTripCTAProps) {
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
      id="plan"
      className="relative bg-white pt-0 pb-10 sm:pb-12 lg:pb-14 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Main Floating Banner Card */}
        <div
          className={`relative rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-xl shadow-slate-900/8 border border-slate-100 min-h-[230px] sm:min-h-[250px] lg:min-h-[270px] flex items-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Background Sunset & Lighthouse Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/nitk.avif"
              alt="Mangalore NITK Lighthouse Sunset Coast"
              fill
              unoptimized
              priority
              className="object-cover object-right md:object-[position:85%_center]"
              sizes="(max-width: 1600px) 100vw, 1600px"
            />
          </div>

          {/* Smooth White Gradient Shield:
              Guarantees crisp typography on left, feathers into sunset photo on right */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 38%, rgba(255,255,255,0.7) 54%, rgba(255,255,255,0) 75%)",
            }}
          />

          {/* Left Palm Fronds Watermark Silhouette */}
          <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-40 pointer-events-none select-none z-10 opacity-20 overflow-hidden">
            <svg
              viewBox="0 0 200 400"
              className="w-full h-full text-slate-700"
              fill="currentColor"
            >
              <path d="M-20 40 Q40 60 90 120 Q60 125 10 120" />
              <path d="M-20 70 Q70 100 130 180 Q80 185 20 170" />
              <path d="M-20 110 Q90 150 160 250 Q100 250 30 220" />
              <path d="M-20 170 Q80 200 140 310 Q80 295 20 260" />
              <path d="M-20 230 Q60 250 110 360 Q60 340 10 300" />
            </svg>
          </div>

          {/* Subtle Ambient Bottom Warm Glow Line */}
          <div className="absolute bottom-0 left-0 w-1/2 h-20 bg-gradient-to-t from-orange-500/10 to-transparent pointer-events-none z-10" />

          {/* Banner Content Area */}
          <div className="relative z-20 p-5 sm:p-7 lg:p-9 xl:p-10 max-w-xl lg:max-w-2xl">
            {/* Eyebrow Tag */}
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="text-orange-500 font-extrabold text-xs sm:text-sm">—</span>
              <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.2em] text-[#ea580c] uppercase">
                PLAN YOUR TRIP
              </span>
            </div>

            {/* Headline with reduced font size */}
            <h2 className="text-lg sm:text-2xl lg:text-[28px] xl:text-[32px] font-extrabold tracking-tight text-[#0d1e38] leading-tight mb-2 sm:mb-2.5">
              {initialData?.title || (
                <>
                  Need Help Planning{" "}
                  <span className="text-[#ea580c] block sm:inline">
                    Your Mangalore Trip?
                  </span>
                </>
              )}
            </h2>

            {/* Description */}
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 font-normal">
              {initialData?.description || (
                <>
                  Tell us your travel dates, interests and group details.
                  <br className="hidden sm:block" />
                  We&apos;ll create a customised itinerary just for you.
                </>
              )}
            </p>

            {/* CTA Button */}
            <Link
              href={initialData?.buttonLink || "#contact"}
              className="group btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/50 hover:scale-[1.02] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{initialData?.buttonText || "Plan My Trip"}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
