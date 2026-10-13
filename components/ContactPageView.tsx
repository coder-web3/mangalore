"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Maximize2,
  ChevronDown,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import { ContactData } from "@/lib/cms";

interface ContactPageViewProps {
  contactData?: ContactData;
}

export default function ContactPageView({ contactData }: ContactPageViewProps) {
  const hero = contactData?.hero || {
    badge: "GET IN TOUCH",
    titlePrefix: "We're Here to",
    titleHighlight: "Help",
    description:
      "Have questions about places to visit, tours or travel planning? Our team is ready to assist you with the best travel experiences in Mangalore.",
    backdropImage: "/contact-hero-scenic.jpg",
  };

  const quickInfo = contactData?.quickInfo || {
    location: {
      title: "Our Location",
      line1: "Mangalore, Karnataka",
      line2: "India",
    },
    phone: {
      title: "Call Us",
      number: "+91 74 8383 0582",
      hours: "Mon - Sat, 9:00 AM - 6:00 PM",
    },
    email: {
      title: "Email Us",
      address: "info@mangaloreetours.com",
      note: "We reply within 24 hours",
    },
    workingHours: {
      title: "Working Hours",
      days: "Monday - Saturday",
      hours: "9:00 AM - 6:00 PM",
    },
  };

  const formSection = contactData?.formSection || {
    badge: "SEND US A MESSAGE",
    titlePrefix: "Plan Your",
    titleHighlight: "Mangalore Trip",
    description:
      "Fill out the form below and our travel experts will get back to you soon.",
  };

  const mapWidget = contactData?.mapWidget || {
    badgeTitle: "Find Us on Map",
    badgeSubtitle: "Mangalore, Karnataka",
    mapImage: "/contact-map.jpg",
    googleMapsUrl: "https://maps.google.com/?q=Mangalore,+Karnataka",
  };

  const customTourBanner = contactData?.customTourBanner || {
    titlePrefix: "Need a Custom",
    titleHighlight: "Tour Package?",
    description:
      "Let us create a personalised itinerary based on your interests, budget and travel dates.",
    buttonText: "Get a Custom Plan",
    buttonLink: "/#tour-enquiry",
    houseboatImage: "/contact-houseboat.jpg",
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Select an option",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus("error");
      setStatusMessage("Please fill in your name, email address, and message.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitStatus("success");
        setStatusMessage(
          "Thank you! Your travel inquiry has been received. Our Mangalore travel experts will get in touch with you shortly."
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          interest: "Select an option",
          message: "",
        });
      } else {
        throw new Error(data.error || "Failed to submit enquiry");
      }
    } catch (err: unknown) {
      setSubmitStatus("error");
      setStatusMessage("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 overflow-x-clip bg-gradient-to-b from-[#f8faff] via-white to-[#f8faff]">
        {/* ================= HERO SECTION ================= */}
        <section className="relative w-full overflow-hidden bg-white pt-4 sm:pt-6 pb-6">
          <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="relative min-h-[360px] sm:min-h-[400px] md:min-h-[430px] rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm flex flex-col justify-between p-6 sm:p-10 md:p-12">
              {/* Scenic Coastal Lighthouse Backdrop on Right */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={hero.backdropImage || "/contact-hero-scenic.jpg"}
                  alt="Mangalore Coastal Lighthouse"
                  fill
                  priority
                  unoptimized
                  className="object-cover object-right md:object-right"
                  sizes="(max-width: 1600px) 100vw, 1600px"
                />
              </div>

              {/* Frosted Soft Gradient Shield (Left solid white, fading into scenic right) */}
              <div
                className="absolute inset-y-0 left-0 w-full sm:w-[82%] md:w-[68%] lg:w-[56%] z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.98) 55%, rgba(255, 255, 255, 0.85) 75%, rgba(255, 255, 255, 0) 100%)",
                }}
              />

              {/* Decorative "Explore Mangalore" Handwritten Calligraphy */}
              <div className="absolute right-1/4 top-10 z-10 pointer-events-none hidden md:block">
                <span className="font-serif italic text-2xl lg:text-3xl text-amber-900/60 drop-shadow-xs rotate-[-8deg] select-none block">
                  Explore Mangalore
                </span>
              </div>

              {/* Decorative Orange Paper Plane with Dashed Trail */}
              <div className="absolute left-[36%] sm:left-[38%] md:left-[40%] top-24 sm:top-28 z-20 pointer-events-none hidden sm:block">
                <svg
                  className="w-36 h-20 text-[#ff5e15] overflow-visible"
                  viewBox="0 0 140 70"
                  fill="none"
                >
                  <path
                    d="M10 65 C 50 65, 80 40, 120 18"
                    stroke="#ff5e15"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                  />
                  {/* Paper Plane Icon */}
                  <g transform="translate(115, 6) rotate(15)">
                    <polygon
                      points="0,12 22,0 12,22 10,14"
                      fill="#ff5e15"
                      stroke="#ea4908"
                      strokeWidth="1"
                    />
                  </g>
                </svg>
              </div>

              {/* Hero Content (Left) */}
              <div className="relative z-20 max-w-xl md:max-w-2xl py-2 sm:py-4">
                {/* Section Tag */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-[3px] w-6 rounded-full bg-[#ff5e15]" />
                  <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#0d1e38]">
                    {hero.badge || "GET IN TOUCH"}
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#0d1e38] leading-[1.08] mb-4">
                  {hero.titlePrefix || "We're Here to"}{" "}
                  <span className="text-[#ff5e15]">{hero.titleHighlight || "Help"}</span>
                </h1>

                {/* Subtitle Description */}
                <p className="text-xs sm:text-sm md:text-[14px] text-slate-600 leading-relaxed font-normal max-w-lg mb-4">
                  {hero.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4 QUICK INFO CARDS ROW ================= */}
        <section className="relative z-30 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12 -mt-4 sm:-mt-6 mb-8 sm:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Card 1: Our Location */}
            <div className="flex items-center gap-4 rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 shadow-lg shadow-slate-900/5 border border-slate-200/80 hover:border-orange-200 transition-all">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff5e15] to-[#ff7a3d] text-white shadow-md shadow-orange-500/25">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#0d1e38]">
                  {quickInfo.location.title || "Our Location"}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  {quickInfo.location.line1 || "Mangalore, Karnataka"}
                </p>
                <p className="text-[11px] text-slate-400">
                  {quickInfo.location.line2 || "India"}
                </p>
              </div>
            </div>

            {/* Card 2: Call Us */}
            <div className="flex items-center gap-4 rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 shadow-lg shadow-slate-900/5 border border-slate-200/80 hover:border-orange-200 transition-all">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff5e15] to-[#ff7a3d] text-white shadow-md shadow-orange-500/25">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#0d1e38]">
                  {quickInfo.phone.title || "Call Us"}
                </h3>
                <a
                  href={`tel:${(quickInfo.phone.number || "").replace(/\s+/g, "")}`}
                  className="text-xs font-bold text-[#0d1e38] hover:text-[#ff5e15] transition-colors mt-0.5 block"
                >
                  {quickInfo.phone.number || "+91 74 8383 0582"}
                </a>
                <p className="text-[11px] text-slate-500">
                  {quickInfo.phone.hours || "Mon - Sat, 9:00 AM - 6:00 PM"}
                </p>
              </div>
            </div>

            {/* Card 3: Email Us */}
            <div className="flex items-center gap-4 rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 shadow-lg shadow-slate-900/5 border border-slate-200/80 hover:border-orange-200 transition-all">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff5e15] to-[#ff7a3d] text-white shadow-md shadow-orange-500/25">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#0d1e38]">
                  {quickInfo.email.title || "Email Us"}
                </h3>
                <a
                  href={`mailto:${quickInfo.email.address || "info@mangaloreetours.com"}`}
                  className="text-xs font-bold text-[#0d1e38] hover:text-[#ff5e15] transition-colors mt-0.5 block truncate max-w-[160px]"
                >
                  {quickInfo.email.address || "info@mangaloreetours.com"}
                </a>
                <p className="text-[11px] text-slate-500">
                  {quickInfo.email.note || "We reply within 24 hours"}
                </p>
              </div>
            </div>

            {/* Card 4: Working Hours */}
            <div className="flex items-center gap-4 rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 shadow-lg shadow-slate-900/5 border border-slate-200/80 hover:border-orange-200 transition-all">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff5e15] to-[#ff7a3d] text-white shadow-md shadow-orange-500/25">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#0d1e38]">
                  {quickInfo.workingHours.title || "Working Hours"}
                </h3>
                <p className="text-xs font-bold text-[#0d1e38] mt-0.5">
                  {quickInfo.workingHours.days || "Monday - Saturday"}
                </p>
                <p className="text-[11px] text-slate-500">
                  {quickInfo.workingHours.hours || "9:00 AM - 6:00 PM"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MAIN TWO-COLUMN CONTENT ================= */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12 pb-16 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: CONTACT FORM CARD (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 md:p-10 shadow-xl shadow-slate-900/5">
              {/* Form Header */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-[3px] w-6 rounded-full bg-[#ff5e15]" />
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0d1e38]">
                    {formSection.badge || "SEND US A MESSAGE"}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold tracking-tight text-[#0d1e38] leading-tight mb-2">
                  {formSection.titlePrefix || "Plan Your"}{" "}
                  <span className="text-[#ff5e15]">{formSection.titleHighlight || "Mangalore Trip"}</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 font-normal">
                  {formSection.description}
                </p>
              </div>

              {/* Submission Alerts */}
              {submitStatus === "success" && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs sm:text-sm text-emerald-800">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Message Sent Successfully!</p>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      {statusMessage}
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl bg-red-50 border border-red-200 p-4 text-xs sm:text-sm text-red-800">
                  <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Failed to Send</p>
                    <p className="text-xs text-red-700 mt-0.5">{statusMessage}</p>
                  </div>
                </div>
              )}

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Your Name <span className="text-[#ff5e15]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#ff5e15] focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Email Address <span className="text-[#ff5e15]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#ff5e15] focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                </div>

                {/* Row 2: Phone & Travel Interest */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#ff5e15] focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="interest"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Travel Interest
                    </label>
                    <div className="relative">
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 pr-10 text-xs sm:text-sm text-slate-800 transition focus:border-[#ff5e15] focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer"
                      >
                        <option value="Select an option">Select an option</option>
                        <option value="Places to Visit & Sightseeing">
                          Places to Visit &amp; Sightseeing
                        </option>
                        <option value="Beach Vacations & Water Sports">
                          Beach Vacations &amp; Water Sports
                        </option>
                        <option value="Temple & Heritage Circuits">
                          Temple &amp; Heritage Circuits
                        </option>
                        <option value="Custom Tour Packages">
                          Custom Tour Packages
                        </option>
                        <option value="Cab Booking & Airport Transfers">
                          Cab Booking &amp; Transfers
                        </option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Row 3: Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold text-slate-700 mb-1.5"
                  >
                    Your Message <span className="text-[#ff5e15]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your travel plan, places you want to visit, or any questions..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#ff5e15] focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ff5e15] hover:bg-[#ea4908] px-8 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:shadow-orange-500/40 disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT COLUMN: MAP & CUSTOM TOUR CARDS (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card 1: Interactive Styled Map Widget */}
              <div className="relative rounded-3xl border border-slate-200/90 overflow-hidden shadow-xl shadow-slate-900/5 min-h-[280px] sm:min-h-[300px] bg-slate-100 group">
                <Image
                  src={mapWidget.mapImage || "/contact-map.jpg"}
                  alt="Mangalore Location Map"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />

                {/* Top Left: Find Us on Map Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2.5 rounded-2xl bg-white/95 backdrop-blur-md px-3.5 py-2 shadow-md border border-slate-100">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-orange-100 text-[#ff5e15]">
                    <MapPin className="h-4 w-4 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#0d1e38]">
                      {mapWidget.badgeTitle || "Find Us on Map"}
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      {mapWidget.badgeSubtitle || "Mangalore, Karnataka"}
                    </p>
                  </div>
                </div>

                {/* Top Right: Expand / Open in Google Maps */}
                <a
                  href={mapWidget.googleMapsUrl || "https://maps.google.com/?q=Mangalore,+Karnataka"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-slate-100 text-slate-700 hover:text-[#ff5e15] hover:scale-110 transition"
                  aria-label="Open in Google Maps"
                >
                  <Maximize2 className="h-4 w-4" />
                </a>

                {/* Center Pin Pulse Overlay */}
                <div className="absolute left-[62%] top-[54%] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-2 pointer-events-none">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute h-8 w-8 animate-ping rounded-full bg-orange-500/40 opacity-75" />
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#ff5e15] text-white shadow-lg shadow-orange-600/40">
                      <MapPin className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                  <span className="rounded-xl bg-[#0d1e38]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
                    Mangalore
                  </span>
                </div>
              </div>

              {/* Card 2: "Need a Custom Tour Package?" Banner */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-900/10 bg-gradient-to-r from-[#0d1e38] via-[#112644] to-[#0a182d] p-6 sm:p-7 md:p-8 text-white min-h-[170px] flex flex-col justify-between">
                {/* Houseboat Scenic Image on Right */}
                <div className="absolute right-0 top-0 bottom-0 w-[42%] pointer-events-none overflow-hidden opacity-55">
                  <Image
                    src={customTourBanner.houseboatImage || "/contact-houseboat.jpg"}
                    alt="Houseboat Tour Mangalore"
                    fill
                    unoptimized
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 40vw, 250px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0d1e38] via-[#112644]/70 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-xs">
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight">
                    {customTourBanner.titlePrefix || "Need a Custom"}{" "}
                    <span className="text-[#ff7a3d]">{customTourBanner.titleHighlight || "Tour Package?"}</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {customTourBanner.description}
                  </p>

                  <Link
                    href={customTourBanner.buttonLink || "/#tour-enquiry"}
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 hover:bg-white hover:text-[#0d1e38] px-5 py-2 text-xs font-bold text-white transition backdrop-blur-sm mt-4 shadow-sm"
                  >
                    <span>{customTourBanner.buttonText || "Get a Custom Plan"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
