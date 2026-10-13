"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPin, Crown, Leaf, Headphones } from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  barColor: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    id: "expertise",
    title: "Local Expertise",
    description: "In-depth knowledge of Mangalore's hidden gems.",
    barColor: "bg-orange-500",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    icon: <MapPin className="h-5 w-5 fill-orange-500 text-white" />,
  },
  {
    id: "packages",
    title: "Best Tour Packages",
    description: "Curated & customizable tours for every traveler.",
    barColor: "bg-blue-600",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    icon: <Crown className="h-5 w-5 stroke-[2.2]" />,
  },
  {
    id: "experiences",
    title: "Authentic Experiences",
    description: "Explore real local culture, food & traditions.",
    barColor: "bg-emerald-600",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    icon: <Leaf className="h-5 w-5 stroke-[2.2]" />,
  },
  {
    id: "support",
    title: "24/7 Support",
    description: "We're here to help you plan a hassle-free trip.",
    barColor: "bg-purple-600",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    icon: <Headphones className="h-5 w-5 stroke-[2.2]" />,
  },
];

interface WhyChooseUsProps {
  initialData?: {
    tag?: string;
    title?: string;
    description?: string;
    features?: Array<{
      id: string;
      title: string;
      description: string;
      color?: string;
    }>;
  };
}

export default function WhyChooseUs({ initialData }: WhyChooseUsProps) {
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
      id="why-choose-us"
      className="relative bg-white py-8 sm:py-10 lg:py-12 overflow-hidden"
    >
      {/* Background Image: why-bg.avif */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <Image
          src="/why-bg.avif"
          alt="Why Choose Mangalore Tours background"
          fill
          unoptimized
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-6 sm:mb-7 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Eyebrow Tagline */}
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="text-orange-500 font-bold text-xs sm:text-sm">—</span>
            <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.2em] text-slate-600 uppercase">
              {initialData?.tag || "WHY CHOOSE MANGALORE TOURS"}
            </span>
            <span className="text-orange-500 font-bold text-xs sm:text-sm">—</span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold tracking-tight text-[#0d1e38] leading-tight mb-2">
            {initialData?.title || (
              <>
                Your Local <span className="text-[#ea580c]">Travel Partner</span>
              </>
            )}
          </h2>

          {/* Subtitle Description */}
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal">
            {initialData?.description ||
              "We help you experience the most authentic and memorable side of Mangalore with carefully curated tours, local insights and complete travel support."}
          </p>
        </div>

        {/* 4 Value Proposition Cards Row */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 xl:gap-5 items-stretch transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {features.map((feature, idx) => {
            const dynamicFeature = initialData?.features?.[idx];
            const title = dynamicFeature?.title || feature.title;
            const description = dynamicFeature?.description || feature.description;

            return (
              <div
                key={feature.id}
                className="group relative flex items-center gap-3 rounded-2xl bg-white p-3.5 sm:p-4 shadow-md shadow-slate-900/5 border border-slate-100/90 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/10 hover:-translate-y-1 hover:border-slate-200"
                style={{
                  transitionDelay: `${idx * 80 + 100}ms`,
                }}
              >
                {/* Left Colored Accent Bar */}
                <div
                  className={`w-1 h-7 sm:h-8 rounded-full ${feature.barColor} flex-shrink-0 transition-all duration-300 group-hover:h-9`}
                />

                {/* Circular Icon Container */}
                <div
                  className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full ${feature.iconBg} ${feature.iconColor} shadow-sm transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}
                >
                  {feature.icon}
                </div>

                {/* Text Information */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-extrabold text-[#0d1e38] tracking-tight leading-snug transition-colors group-hover:text-orange-600">
                    {title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-snug mt-0.5 font-normal">
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
