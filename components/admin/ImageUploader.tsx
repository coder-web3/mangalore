"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Check, AlertCircle, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  label?: string;
  value?: string;
  currentImage?: string;
  onChange?: (newUrl: string) => void;
  onImageSelected?: (newUrl: string) => void;
  aspectHint?: string;
}

export default function ImageUploader({
  label = "Image",
  value,
  currentImage,
  onChange,
  onImageSelected,
  aspectHint = "Recommended: Landscape ratio (JPEG, PNG, WebP up to 10MB)",
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveValue = value ?? currentImage ?? "";

  const notifyChange = (url: string) => {
    if (onChange) onChange(url);
    if (onImageSelected) onImageSelected(url);
  };

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
        throw new Error(json.error || "Upload failed");
      }

      notifyChange(json.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error uploading file";
      setError(msg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-[11px] font-semibold text-slate-300">
          {label}
        </label>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Preview Thumbnail */}
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-700 bg-slate-800/80 shadow-inner flex items-center justify-center">
          {effectiveValue ? (
            <Image
              src={effectiveValue}
              alt="Preview"
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <span className="text-[10px] text-slate-500">No Image</span>
          )}
        </div>

        {/* Input & Upload from Device Trigger */}
        <div className="flex-1 w-full space-y-1.5">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={effectiveValue}
              onChange={(e) => notifyChange(e.target.value)}
              placeholder="e.g. /kadri.avif or /uploads/..."
              className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none"
            />

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png,image/jpeg,image/webp,image/avif"
              className="hidden"
            />

            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-orange-600/90 hover:bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white shadow transition disabled:opacity-50 cursor-pointer"
            >
              {isUploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Upload className="h-3.5 w-3.5" />
              )}
              <span>{isUploading ? "Uploading..." : "Upload Device"}</span>
            </button>
          </div>

          <p className="text-[10px] text-slate-400">{aspectHint}</p>

          {error && (
            <div className="flex items-center gap-1.5 text-[11px] text-red-400">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
