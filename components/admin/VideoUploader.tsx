"use client";

import React, { useRef, useState } from "react";
import {
  Upload,
  Video,
  AlertCircle,
  Loader2,
  Trash2,
  ExternalLink,
  Play,
  RotateCcw,
} from "lucide-react";

interface VideoUploaderProps {
  label?: string;
  value?: string;
  onChange?: (newUrl: string) => void;
  aspectHint?: string;
}

const DEFAULT_YOUTUBE_VIDEO =
  "https://www.youtube-nocookie.com/embed/ScegE0n053U?autoplay=1&rel=0";

// Helper to convert standard youtube watch or short links into clean embed format
export function formatToEmbedUrl(url: string): string {
  if (!url) return "";
  const trimmed = url.trim();

  // If already embed URL or direct video file, return as is
  if (
    trimmed.includes("/embed/") ||
    trimmed.startsWith("/uploads/") ||
    trimmed.endsWith(".mp4") ||
    trimmed.endsWith(".webm") ||
    trimmed.endsWith(".mov")
  ) {
    return trimmed;
  }

  // Handle youtu.be/<id>
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch && shortMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${shortMatch[1]}?autoplay=1&rel=0`;
  }

  // Handle youtube.com/watch?v=<id>
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${watchMatch[1]}?autoplay=1&rel=0`;
  }

  return trimmed;
}

export function isDirectVideoFile(url?: string): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  return (
    lower.endsWith(".mp4") ||
    lower.endsWith(".webm") ||
    lower.endsWith(".ogg") ||
    lower.endsWith(".mov") ||
    (lower.startsWith("/uploads/") && !lower.includes("youtube"))
  );
}

export default function VideoUploader({
  label = "Hero Video (Device Upload or YouTube / Embed Link)",
  value = "",
  onChange,
  aspectHint = "Upload MP4, WebM, MOV video files (up to 100MB) or paste any YouTube / Vimeo URL.",
}: VideoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveValue = value || "";
  const isVideoFile = isDirectVideoFile(effectiveValue);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Video upload failed");
      }

      if (onChange) {
        onChange(json.url);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Error uploading video file";
      setError(msg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatToEmbedUrl(raw);
    if (onChange) onChange(formatted);
  };

  const handleResetDefault = () => {
    if (onChange) onChange(DEFAULT_YOUTUBE_VIDEO);
    setError(null);
  };

  const handleClear = () => {
    if (onChange) onChange("");
    setError(null);
  };

  return (
    <div className="space-y-3 rounded-2xl border border-slate-700/80 bg-slate-900/60 p-4">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-white flex items-center gap-1.5">
            <Video className="h-4 w-4 text-orange-400" />
            {label}
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetDefault}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-orange-400 transition cursor-pointer"
              title="Reset back to default Mangalore showcase video"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Default</span>
            </button>
            {effectiveValue && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-red-400 hover:text-red-300 transition cursor-pointer"
                title="Clear video"
              >
                <Trash2 className="h-3 w-3" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Video Preview Box */}
      <div className="relative aspect-video w-full max-w-lg overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-inner flex items-center justify-center">
        {effectiveValue ? (
          isVideoFile ? (
            <video
              src={effectiveValue}
              controls
              playsInline
              className="h-full w-full object-contain bg-black"
            />
          ) : (
            <iframe
              src={effectiveValue}
              className="h-full w-full border-0"
              title="Video Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )
        ) : (
          <div className="flex flex-col items-center justify-center gap-1.5 text-slate-500 p-4 text-center">
            <Video className="h-8 w-8 text-slate-600 stroke-1" />
            <span className="text-xs font-semibold">No Video Attached</span>
            <span className="text-[10px] text-slate-500">
              Upload an MP4/WebM file or paste a YouTube embed link below
            </span>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-20">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            <span className="text-xs font-semibold text-white">
              Uploading Video from Device...
            </span>
            <span className="text-[10px] text-slate-400">
              Please wait while file is stored securely
            </span>
          </div>
        )}
      </div>

      {/* Upload Controls & URL Input */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Direct File Upload Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/mp4,video/webm,video/ogg,video/quicktime"
            className="hidden"
          />

          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-500 active:bg-orange-700 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-600/30 transition disabled:opacity-50 cursor-pointer"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            <span>{isUploading ? "Uploading Video..." : "Upload Video File"}</span>
          </button>

          {/* Or Paste URL input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={effectiveValue}
              onChange={handleUrlInputChange}
              placeholder="Or paste /uploads/video.mp4 or YouTube link"
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none font-mono"
            />
            {effectiveValue && (
              <a
                href={effectiveValue}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                title="Open video URL in new tab"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        <p className="text-[11px] text-slate-400">{aspectHint}</p>

        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-red-950/40 border border-red-800/60 p-2 text-xs text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
