"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchFilterBar() {
  const [query, setQuery] = useState("");

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl px-3 sm:px-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative flex items-center rounded-full bg-white p-2 sm:p-2.5 pl-4 sm:pl-6 shadow-none border-2 border-orange-300/90 hover:border-orange-400 transition-all duration-300 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/20"
      >
        {/* Left Magnifying Glass Icon */}
        <div className="flex flex-shrink-0 items-center justify-center text-orange-500 mr-2 sm:mr-3">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
        </div>

        {/* Text Input Field */}
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search places, food, events and local businesses in Mangalore..."
            className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 outline-none"
          />
        </div>

        {/* Clear Button if query exists */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="mr-2 flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}

        {/* Search CTA Button */}
        <button
          type="submit"
          className="group btn-shimmer flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0"
        >
          <Search className="h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:scale-110" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}
