"use client";

import React from "react";
import { Utensils, ArrowRight } from "lucide-react";

export default function CoastalCuisine() {
  const foods = [
    {
      name: "Mangalorean Chicken Ghee Roast",
      origin: "Kundapura & Mangalore",
      badge: "Signature Delicacy",
      desc: "Tender chicken slow-cooked in aromatic Byadgi chili paste, fragrant whole spices, and rich golden pure desi ghee.",
      icon: "🍗",
    },
    {
      name: "Anjal / Surmai Tawa Fry",
      origin: "Coastal Bunder Ports",
      badge: "Fresh Catch",
      desc: "Seer fish steaks marinated in spicy Kundapur masala and crispy semolina rava-crusted pan fry.",
      icon: "🐟",
    },
    {
      name: "Delicate Neer Dosa & Kori Rotti",
      origin: "Tulu Nadu Tradition",
      badge: "Authentic Breakfast",
      desc: "Silky, melt-in-mouth rice crepes served with creamy coconut chutney and spicy Mangalorean red chicken curry.",
      icon: "🥞",
    },
    {
      name: "Pabbas Gadbad Ice Cream",
      origin: "Hampankatta, Mangalore",
      badge: "Iconic Dessert",
      desc: "Legendary multi-layered sundae with dry fruits, jelly, cut fruits, and homemade ice cream scoops created in 1975.",
      icon: "🍨",
    },
  ];

  return (
    <section id="food" className="bg-slate-50/70 py-16 sm:py-24 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-100/70 px-4 py-1 text-xs font-bold text-orange-700 mb-3">
            <Utensils className="h-3.5 w-3.5 text-orange-600" />
            <span>COASTAL KARAVALI FLAVORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1e38] tracking-tight">
            Must-Try Mangalorean Food
          </h2>
          <p className="mt-2 text-base text-slate-500">
            Taste the legendary coastal cuisine shaped by fresh coconut, curry
            leaves, Kokum, Byadgi chilies, and generations of culinary passion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {foods.map((food, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{food.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                    {food.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0d1e38] mb-1">
                  {food.name}
                </h3>
                <div className="text-xs font-medium text-slate-400 mb-3">
                  {food.origin}
                </div>
                <p className="text-xs leading-relaxed text-slate-500">
                  {food.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">
                  Find best eateries
                </span>
                <span className="text-orange-600">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
