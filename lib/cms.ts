
export interface SlideData {
  image: string;
  badgeTitle: string;
  badgeLocation: string;
}

export interface DestinationData {
  id: string;
  number: string;
  name: string;
  location: string;
  image: string;
}

export interface FeatureData {
  id: string;
  title: string;
  description: string;
  color?: string;
}

export interface FoodCategoryData {
  id: string;
  title: string;
  image: string;
}

export interface HomepageData {
  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    slides: SlideData[];
  };
  popularDestinations: {
    tag: string;
    title: string;
    titleHighlight: string;
    description: string;
    scriptTop: string;
    scriptBottom: string;
    destinations: DestinationData[];
  };
  whyChooseUs: {
    tag: string;
    title: string;
    description: string;
    features: FeatureData[];
  };
  tasteMangalore: {
    tag: string;
    title: string;
    description: string;
    categories: FoodCategoryData[];
  };
  planTripCTA: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  tourEnquiryCTA: {
    title: string;
    subtitle: string;
    phone: string;
    email: string;
  };
}

export interface PlacesPolaroidCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link?: string;
}

export interface ListingHeroData {
  badge: string;
  titleLine1: string;
  titleHighlight: string;
  description: string;
  backdropImage: string;
  galleryCards: PlacesPolaroidCard[];
}

export interface PlaceItemData {
  id: string;
  name: string;
  slug?: string;
  category: string;
  categoryLabel: string;
  categoryIcon: "beach" | "temple" | "viewpoint" | "river" | "hill";
  description: string;
  image: string;
  location?: string;
  rating?: string;
  timings?: string;
}

export interface ListingCatalogData {
  tag: string;
  title: string;
  titleHighlight: string;
  description: string;
  places: PlaceItemData[];
}

export interface PanamburHeroData {
  title: string;
  titleHighlight: string;
  category: string;
  description: string;
  backdropImage: string;
  location: string;
  bestTime: string;
  popularFor: string;
  idealDuration: string;
  videoUrl?: string;
}

export interface PanamburOverviewData {
  badge: string;
  title: string;
  p1: string;
  p2: string;
  highlights: string[];
}

export interface QuickFactData {
  label: string;
  value: string;
}

export interface GalleryImageItem {
  id: string;
  image: string;
  caption: string;
  tag?: string;
}

export interface ThingToDoData {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface PanamburDetailData {
  hero: PanamburHeroData;
  overview: PanamburOverviewData;
  quickFacts: QuickFactData[];
  gallery: GalleryImageItem[];
  thingsToDo: ThingToDoData[];
}

export type PlaceDetailHeroData = PanamburHeroData;
export type PlaceDetailOverviewData = PanamburOverviewData;
export type PlaceDetailPageData = PanamburDetailData;

export interface PlacesData {
  listingHero: ListingHeroData;
  listingCatalog: ListingCatalogData;
  panamburDetail?: PanamburDetailData;
  placeDetails: Record<string, PanamburDetailData>;
}

export function getDefaultPlaceDetail(place: {
  name: string;
  categoryLabel?: string;
  category?: string;
  description?: string;
  image?: string;
  location?: string;
}): PanamburDetailData {
  const parts = place.name.trim().split(" ");
  const title = parts.length > 1 ? parts.slice(0, -1).join(" ") : place.name;
  const titleHighlight = parts.length > 1 ? parts[parts.length - 1] : "";

  return {
    hero: {
      title: title,
      titleHighlight: titleHighlight,
      category: (place.categoryLabel || place.category || "Sightseeing").toUpperCase(),
      description:
        place.description ||
        `Discover the scenic charm, attractions and vibrant coastal atmosphere of ${place.name} in Mangalore.`,
      backdropImage: place.image || "/panambur-hero-backdrop.jpg",
      location: place.location || "Mangalore, Karnataka, India",
      bestTime: "Oct to March",
      popularFor: "Sightseeing, Scenic Views & Photos",
      idealDuration: "1 - 2 Hours",
      videoUrl: "https://www.youtube.com/embed/9No-FiEInLA?autoplay=1",
    },
    overview: {
      badge: "DISCOVER MANGALORE",
      title: `About ${place.name}`,
      p1: `${place.name} is one of the most celebrated and must-visit destinations in the coastal district of Mangalore, Karnataka. Renowned for its unique character, captivating sights, and cultural significance, it draws tourists, families, and nature lovers from across the country.`,
      p2: `Visitors can enjoy relaxing walks, explore the distinct regional heritage, admire scenic backdrops, and discover nearby culinary favorites.`,
      highlights: [
        `Prominent coastal destination located in ${place.location || "Mangalore"}`,
        "Scenic photography opportunities with authentic coastal vistas",
        "Clean, well-maintained surroundings suitable for families",
        "Conveniently connected by road, auto, and city bus transit",
      ],
    },
    quickFacts: [
      { label: "Entry Fee", value: "Free Entry" },
      { label: "Timings", value: "Open Daily 6:00 AM - 7:30 PM" },
      { label: "Location", value: place.location || "Mangalore, Karnataka" },
      { label: "Ideal Duration", value: "1 to 2 Hours" },
      { label: "Best Time to Visit", value: "October to March" },
      { label: "Photography", value: "Allowed" },
    ],
    gallery: [
      {
        id: "1",
        image: place.image || "/panambur.avif",
        caption: `${place.name} Scenic Panorama`,
        tag: "Highlights",
      },
      {
        id: "2",
        image: "/ref-card-panambur.jpg",
        caption: `${place.name} Coastal Surroundings`,
        tag: "Atmosphere",
      },
      {
        id: "3",
        image: "/kadri.avif",
        caption: `${place.name} Heritage & Culture`,
        tag: "Heritage",
      },
    ],
    thingsToDo: [
      {
        id: "1",
        title: "Sightseeing & Nature Walks",
        description: `Explore the surroundings and take in the natural beauty of ${place.name}.`,
        icon: "sun",
      },
      {
        id: "2",
        title: "Photography & Viewpoints",
        description: "Capture memorable pictures of the vistas, coastal horizon, and local scenes.",
        icon: "sparkles",
      },
      {
        id: "3",
        title: "Local Food & Fresh Snacks",
        description: "Savor coastal snacks, fresh tender coconut, and authentic Mangalorean bites.",
        icon: "waves",
      },
      {
        id: "4",
        title: "Relaxation & Evening Breezes",
        description: "Enjoy peaceful ambiance and soothing breezes during afternoon and sunset.",
        icon: "car",
      },
    ],
  };
}
