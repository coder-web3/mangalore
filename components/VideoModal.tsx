"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  videoTitle?: string;
  videoSubtitle?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl = "https://www.youtube-nocookie.com/embed/ScegE0n053U?autoplay=1&rel=0",
  videoTitle = "A Glimpse of Mangalore",
  videoSubtitle = "Coastal beaches, lighthouses, temple heritage & vibrant food culture",
}: VideoModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const effectiveUrl =
    videoUrl ||
    "https://www.youtube-nocookie.com/embed/ScegE0n053U?autoplay=1&rel=0";

  const isVideoFile =
    effectiveUrl.toLowerCase().endsWith(".mp4") ||
    effectiveUrl.toLowerCase().endsWith(".webm") ||
    effectiveUrl.toLowerCase().endsWith(".ogg") ||
    effectiveUrl.toLowerCase().endsWith(".mov") ||
    (effectiveUrl.startsWith("/uploads/") && !effectiveUrl.includes("youtube"));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl bg-slate-900 shadow-2xl border border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div>
            <h3 className="text-base font-bold text-white">
              {videoTitle}
            </h3>
            <p className="text-xs text-slate-400">
              {videoSubtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {isVideoFile ? (
            <video
              src={effectiveUrl}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-contain"
            />
          ) : (
            <iframe
              className="h-full w-full border-0"
              src={effectiveUrl}
              title={videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 px-6 py-4 text-xs text-slate-400">
          <span>Featured: Surathkal NITK Lighthouse, Panambur, Tannirbhavi, Kudroli Temple</span>
          <button
            onClick={onClose}
            className="rounded-full bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600 transition-colors cursor-pointer"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
}
