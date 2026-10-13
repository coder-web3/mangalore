"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Calendar, Headphones } from "lucide-react";

const steps = [
  {
    id: "choose",
    title: "Choose Your Preferred Tour",
    subtitle: "Beach, Heritage, Nature & More",
    icon: <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
  },
  {
    id: "dates",
    title: "Share Travel Dates",
    subtitle: "Tell us when you plan to visit",
    icon: <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
  },
  {
    id: "experts",
    title: "Talk to Our Experts",
    subtitle: "For a hassle-free Mangalore trip",
    icon: <Headphones className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
  },
];

interface TourEnquiryCTAProps {
  initialData?: {
    title?: string;
    subtitle?: string;
    phone?: string;
    email?: string;
  };
}

export default function TourEnquiryCTA({ initialData }: TourEnquiryCTAProps) {
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
      id="tour-enquiry"
      className="relative bg-white py-6 sm:py-8 lg:py-10 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Main Floating Banner Card */}
        <div
          className={`relative rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl shadow-slate-900/15 border border-slate-800 min-h-[240px] sm:min-h-[260px] lg:min-h-[280px] flex items-center p-6 sm:p-8 lg:p-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Background Sunset/Twilight Lighthouse Image on Right */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/nitk.avif"
              alt="Mangalore NITK Lighthouse Coast"
              fill
              unoptimized
              priority
              className="object-cover object-right md:object-[position:90%_center]"
              sizes="(max-width: 1600px) 100vw, 1600px"
            />
          </div>

          {/* Deep Navy / Twilight Gradient Shield:
              Solid deep dark blue on left, feathers into twilight lighthouse on right */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #061527 0%, #071c36 40%, rgba(9, 32, 60, 0.95) 58%, rgba(10, 36, 68, 0.75) 75%, rgba(10, 36, 68, 0.2) 100%)",
            }}
          />

          {/* Dotted Flight Path & Orange Paper Plane */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 280"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Dotted flight trail */}
              <path
                d="M550,110 C620,85 700,60 800,75 C900,90 940,65 980,45"
                stroke="#60a5fa"
                strokeWidth="1.8"
                strokeDasharray="4 5"
                opacity="0.35"
              />
              {/* Paper airplane */}
              <g transform="translate(980, 35) rotate(-15)">
                <polygon
                  points="0,0 28,12 8,16 6,26"
                  fill="#ea580c"
                  filter="drop-shadow(0 2px 4px rgba(234, 88, 12, 0.4))"
                />
              </g>
            </svg>
          </div>

          {/* Grid Layout: Left Content & Right Steps */}
          <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            {/* Left Content Area */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
                <span className="text-orange-500 font-extrabold text-sm">—</span>
                <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.25em] text-slate-300 uppercase">
                  TOUR ENQUIRY
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-white leading-tight mb-2 sm:mb-2.5">
                {initialData?.title || (
                  <>
                    Interested in Our
                    <br />
                    <span className="text-[#ea580c]">
                      Mangalore Tour Packages?
                    </span>
                  </>
                )}
              </h2>

              {/* Subtitle */}
              <p className="text-slate-300/90 text-xs sm:text-sm leading-relaxed max-w-md font-normal mb-5 sm:mb-6">
                {initialData?.subtitle || (
                  <>
                    Get the latest offers, package details, pricing and availability.
                    <br className="hidden sm:block" />
                    Our travel experts will help you choose the best tour for your
                    needs.
                  </>
                )}
              </p>

              {/* CTA Button */}
              <div>
                <Link
                  href="#contact"
                  className="group btn-shimmer inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-orange-500/35 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/50 hover:scale-[1.02] hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Send Enquiry</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Steps (3 Circular Step Icons with Dividers) */}
            <div className="lg:col-span-6 xl:col-span-7 flex items-center justify-start lg:justify-end gap-3 sm:gap-4 lg:gap-6 pr-0 lg:pr-10 xl:pr-16">
              {steps.map((step, idx) => (
                <React.Fragment key={step.id}>
                  <div className="group/step flex flex-col items-center text-center flex-1 max-w-[140px] sm:max-w-[160px]">
                    {/* Circular Icon Container */}
                    <div className="flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-md transition-all duration-300 group-hover/step:scale-110 group-hover/step:bg-orange-500 group-hover/step:border-orange-400">
                      {step.icon}
                    </div>

                    {/* Step Title */}
                    <h3 className="text-xs sm:text-[13px] font-bold text-white tracking-tight leading-snug mt-2.5 sm:mt-3">
                      {step.title}
                    </h3>

                    {/* Step Subtitle */}
                    <p className="text-[10px] sm:text-[11px] text-slate-400 leading-snug mt-0.5 font-normal">
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Vertical Divider Line between steps */}
                  {idx < steps.length - 1 && (
                    <div className="h-10 sm:h-12 w-[1px] bg-white/15 self-center flex-shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
