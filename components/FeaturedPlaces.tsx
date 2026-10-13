"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowRight, Clock } from "lucide-react";

export default function FeaturedPlaces() {
  const places = [
    {
      title: "NITK Surathkal Lighthouse Beach",
      tag: "Iconic Sunset",
      rating: "4.9",
      reviews: "1,420",
      duration: "2-3 hrs",
      location: "Surathkal, Mangalore",
      description:
        "Panoramic coastal lighthouse overlooking Arabian Sea waves, golden rocks, and pristine beaches.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Panambur Beach & Watersports",
      tag: "Beaches & Fun",
      rating: "4.8",
      reviews: "2,150",
      duration: "Half Day",
      location: "NH-66, Mangalore",
      description:
        "One of India's cleanest beaches featuring jet skis, parasailing, camel rides, and the annual Kite Festival.",
      image:
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kudroli Gokarnanatheshwara Temple",
      tag: "Heritage & Culture",
      rating: "4.9",
      reviews: "3,800",
      duration: "1-2 hrs",
      location: "Kudroli, Mangalore",
      description:
        "Renowned spiritual temple built by Narayana Guru, world-famous for its dazzling illuminated Mangalore Dasara.",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Tannirbhavi Beach & Tree Park",
      tag: "Serene & Relaxing",
      rating: "4.7",
      reviews: "1,890",
      duration: "2-3 hrs",
      location: "Bengre, Mangalore",
      description:
        "Lush casuarina pine tree groves, breezy wooden boardwalks, and tranquil Gurupura river ferry rides.",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Pilikula Nisargadhama Eco Park",
      tag: "Nature & Wildlife",
      rating: "4.8",
      reviews: "1,620",
      duration: "Full Day",
      location: "Vamanjoor, Mangalore",
      description:
        "Sprawling biological park with tigers and leopards, 3D planetarium, heritage artisan village, and boating lake.",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "St. Aloysius Chapel Frescoes",
      tag: "Historic Architecture",
      rating: "4.9",
      reviews: "2,300",
      duration: "1 hr",
      location: "Light House Hill, Mangalore",
      description:
        "Masterpiece 1899 chapel featuring ceiling and wall frescoes painted by Italian Jesuit artist Antony Moscheni.",
      image:
        "https://images.unsplash.com/photo-1548625361-19597ffc6600?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="places" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3.5 py-1 text-xs font-bold text-orange-600 mb-3">
              <span>EXPLORE HIGHLIGHTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1e38] tracking-tight">
              Top Places to Visit in Mangalore
            </h2>
            <p className="mt-2 text-base text-slate-500 max-w-2xl">
              From sun-drenched Arabian coastlines to century-old sacred temples
              and serene backwaters.
            </p>
          </div>
          <Link
            href="#all-places"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700"
          >
            <span>View All Attractions</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {places.map((place, idx) => (
            <div
              key={idx}
              className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                <Image
                  src={place.image}
                  alt={place.title}
                  fill
                  unoptimized
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-slate-800 shadow-sm">
                  {place.tag}
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-[#0d1e38]/85 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-white">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{place.rating}</span>
                  <span className="text-slate-300 font-normal">
                    ({place.reviews})
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-orange-500" />
                    {place.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {place.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0d1e38] group-hover:text-orange-600 transition-colors">
                  {place.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
                  {place.description}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">
                    Free Entry / Open Daily
                  </span>
                  <button
                    type="button"
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    <span>View Guide</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
