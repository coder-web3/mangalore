
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

export interface GalleryItemData {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface GalleryFilterTab {
  id: string;
  label: string;
}

export interface MangaloreGalleryData {
  tag: string;
  title: string;
  titleHighlight: string;
  description: string;
  filterTabs?: GalleryFilterTab[];
  items: GalleryItemData[];
}

export interface ArtAndHistoryItemData {
  id: string;
  title: string;
  iconName: string;
  image: string;
  link?: string;
}

export interface ArtAndHistoryData {
  tag: string;
  titleLine1: string;
  titleHighlight: string;
  description: string;
  viewAllText: string;
  viewAllLink: string;
  items: ArtAndHistoryItemData[];
}

export interface EventCategoryItemData {
  id: string;
  title: string;
  iconName: string;
  image: string;
  link?: string;
}

export interface EventsSectionData {
  tag: string;
  title: string;
  titleHighlight: string;
  description: string;
  viewAllText: string;
  viewAllLink: string;
  categories: EventCategoryItemData[];
}

export interface ExploreMoreQuickLinkData {
  id: string;
  label: string;
  iconName: string;
  href: string;
}

export interface ExploreMoreCTAData {
  tag: string;
  title: string;
  titleHighlight: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backdropImage: string;
  quickLinks: ExploreMoreQuickLinkData[];
}

export interface PlanTripCTAData {
  tag?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backdropImage?: string;
}

export interface TourEnquiryStepData {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
}

export interface TourEnquiryCTAData {
  tag?: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  phone: string;
  email: string;
  backdropImage?: string;
  steps?: TourEnquiryStepData[];
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
  planTripCTA: PlanTripCTAData;
  gallery: MangaloreGalleryData;
  tourEnquiryCTA: TourEnquiryCTAData;
  artAndHistory: ArtAndHistoryData;
  events: EventsSectionData;
  exploreMore: ExploreMoreCTAData;
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

export interface ReachModeItem {
  id: string;
  icon: "plane" | "train" | "bus" | "car";
  title: string;
  distance: string;
  description: string;
}

export interface HowToReachData {
  badge: string;
  title: string;
  description: string;
  modes: ReachModeItem[];
}

export interface SeasonInfoItem {
  id: string;
  name: string;
  months: string;
  temp: string;
  status: string;
  description: string;
  highlight?: boolean;
}

export interface BestTimeData {
  badge: string;
  title: string;
  description: string;
  recommendedSeason: string;
  idealTimeOfDay: string;
  seasons: SeasonInfoItem[];
}

export interface NearbyPlaceItem {
  id: string;
  name: string;
  distance: string;
  travelTime: string;
  category: string;
  image: string;
  link?: string;
}

export interface NearbyPlacesData {
  badge: string;
  title: string;
  description: string;
  places: NearbyPlaceItem[];
}

export interface TravelTipItem {
  id: string;
  title: string;
  description: string;
  category?: string;
}

export interface TravelTipsData {
  badge: string;
  title: string;
  description: string;
  tips: TravelTipItem[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQSectionData {
  badge: string;
  title: string;
  description: string;
  items: FAQItem[];
}

export interface PanamburDetailData {
  hero: PanamburHeroData;
  overview: PanamburOverviewData;
  quickFacts: QuickFactData[];
  gallery: GalleryImageItem[];
  thingsToDo: ThingToDoData[];
  howToReach?: HowToReachData;
  bestTimeSection?: BestTimeData;
  nearbyPlaces?: NearbyPlacesData;
  travelTips?: TravelTipsData;
  faqs?: FAQSectionData;
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

export type FamousPlacesData = PlacesData;

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
    howToReach: {
      badge: "CONNECTIVITY & COMMUTE",
      title: `How to Reach ${place.name}`,
      description: `Easily accessible from Mangalore city center, airport, and major transport terminals by private vehicle, taxi, or public bus.`,
      modes: [
        {
          id: "1",
          icon: "plane",
          title: "By Air (Mangalore International Airport)",
          distance: "Approx. 12 - 15 km",
          description: "Prepaid taxis, app-based cabs, and rental cars connect directly from Bajpe Airport terminal.",
        },
        {
          id: "2",
          icon: "train",
          title: "By Train (Mangalore Central / Junction)",
          distance: "Approx. 8 - 11 km",
          description: "Both major railway stations offer prepaid auto-rickshaws, city cabs, and bus connectivity.",
        },
        {
          id: "3",
          icon: "bus",
          title: "By Public Bus (State Bank Bus Stand)",
          distance: "Direct City Routes",
          description: "Frequent city buses ply along the main highway routes with nearby bus stops within walking distance.",
        },
        {
          id: "4",
          icon: "car",
          title: "By Car / Auto-Rickshaw",
          distance: "Well-paved highway",
          description: "Direct road access via NH 66 / city arterial roads with designated parking spaces for vehicles.",
        },
      ],
    },
    bestTimeSection: {
      badge: "SEASONS & TIMINGS",
      title: `Best Time to Visit ${place.name}`,
      description: "Mangalore features a tropical coastal climate with pleasant weather during winter and post-monsoon months.",
      recommendedSeason: "October to March (Pleasant Breeze & Sunshine)",
      idealTimeOfDay: "Early Morning (6:30 AM - 9:00 AM) or Late Afternoon (4:30 PM - 6:45 PM)",
      seasons: [
        {
          id: "1",
          name: "Winter / Post-Monsoon",
          months: "October - February",
          temp: "22°C - 30°C",
          status: "Peak Season • Best Time",
          description: "Pleasant sea breeze, clear blue skies, and comfortable conditions for sightseeing and photography.",
          highlight: true,
        },
        {
          id: "2",
          name: "Summer",
          months: "March - May",
          temp: "28°C - 35°C",
          status: "Warm & Tropical",
          description: "Warm weather during midday. Mornings and evenings are ideal for coastal walks and sunsets.",
          highlight: false,
        },
        {
          id: "3",
          name: "Monsoon",
          months: "June - September",
          temp: "24°C - 29°C",
          status: "Heavy Rainfall",
          description: "Lush green coastal atmosphere, dramatic skies, and refreshing showers. Outdoor activities depend on rainfall.",
          highlight: false,
        },
      ],
    },
    nearbyPlaces: {
      badge: "EXPLORE MORE",
      title: `Nearby Attractions Around ${place.name}`,
      description: "Combine your itinerary with these top-rated sightseeing destinations situated nearby.",
      places: [
        {
          id: "1",
          name: "Panambur Beach",
          distance: "8 km away",
          travelTime: "15 mins drive",
          category: "Coastline & Water Sports",
          image: "/panambur.avif",
          link: "/places-to-visit/panambur-beach",
        },
        {
          id: "2",
          name: "Tannirbhavi Beach & Tree Park",
          distance: "6.5 km away",
          travelTime: "12 mins drive",
          category: "Pine Trees & Sunset Shore",
          image: "/ref-card-panambur.jpg",
          link: "/places-to-visit/tannirbhavi-beach",
        },
        {
          id: "3",
          name: "Kadri Manjunatha Temple",
          distance: "7 km away",
          travelTime: "15 mins drive",
          category: "Historic Heritage & Architecture",
          image: "/kadri.avif",
          link: "/places-to-visit/kadri-manjunatha-temple",
        },
        {
          id: "4",
          name: "Sultan Battery Watchtower",
          distance: "5 km away",
          travelTime: "10 mins drive",
          category: "Historical Monument & Ferry",
          image: "/ref-card-sultan.jpg",
          link: "/places-to-visit/sultan-battery",
        },
      ],
    },
    travelTips: {
      badge: "LOCAL ADVICE",
      title: `Practical Travel Tips for ${place.name}`,
      description: "Essential suggestions to make your visit comfortable, memorable, and safe.",
      tips: [
        {
          id: "1",
          title: "Sun Protection & Hydration",
          description: "Carry sunglasses, wide-brim hat, and sunscreen. Drink fresh tender coconut water from local stalls.",
          category: "Weather",
        },
        {
          id: "2",
          title: "Comfortable Footwear",
          description: "Wear slip-resistant sandals or easy slip-on walking shoes suitable for sandy shores and paved paths.",
          category: "Attire",
        },
        {
          id: "3",
          title: "Safety & Local Regulations",
          description: "Follow safety guidelines and respect local heritage decorum or lifeguard advisories.",
          category: "Safety",
        },
        {
          id: "4",
          title: "Best Sunset Timings",
          description: "Arrive at least 45 minutes before scheduled sunset to secure prime photography viewpoints.",
          category: "Photography",
        },
      ],
    },
    faqs: {
      badge: "COMMON QUESTIONS",
      title: `Frequently Asked Questions About ${place.name}`,
      description: "Quick answers to help you plan your travel itinerary effortlessly.",
      items: [
        {
          id: "1",
          question: `Is there an entry fee to visit ${place.name}?`,
          answer: "Entry is generally free for visitors. Standard nominal parking charges apply if arriving by car or two-wheeler.",
        },
        {
          id: "2",
          question: `What are the typical operating hours?`,
          answer: "Most outdoor and coastal attractions are accessible from 6:00 AM until 7:30 PM. Temples typically close between 1:00 PM and 4:00 PM.",
        },
        {
          id: "3",
          question: "Is public transportation easily available?",
          answer: "Yes, Mangalore city has excellent bus and auto-rickshaw connectivity with frequent services throughout the day.",
        },
        {
          id: "4",
          question: "Are food stalls and refreshments available on site?",
          answer: "Yes, you will find stalls serving authentic coastal snacks, fresh fruit juices, tender coconut, and Mangalorean delicacies.",
        },
        {
          id: "5",
          question: "Is the location suitable for families and children?",
          answer: "Absolutely. The location offers family-friendly paths, scenic views, and relaxed seating spots suitable for all age groups.",
        },
      ],
    },
  };
}

export interface AboutStatData {
  count: string;
  label: string;
}

export interface AboutFeatureBullet {
  id: string;
  title: string;
  description: string;
}

export interface AboutValueCard {
  id: string;
  title: string;
  description: string;
  icon: "map" | "book" | "sparkles" | "camera";
}

export interface AboutData {
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleHighlight: string;
    description: string;
    backdropImage: string;
    stats: {
      travelers: AboutStatData;
      places: AboutStatData;
      rating: AboutStatData;
    };
  };
  story: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    beachPhoto: string;
    beachBadgeTitle: string;
    beachBadgeSubtitle: string;
    templePhoto: string;
    templeBadge: string;
    sunsetPhoto: string;
    sunsetBadge: string;
    features: AboutFeatureBullet[];
  };
  whatMakesUsDifferent: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    description: string;
    cards: AboutValueCard[];
  };
  vision: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    backdropImage: string;
    quoteText: string;
  };
  team: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    teamPhoto: string;
    pillars: AboutFeatureBullet[];
  };
}

export interface ContactData {
  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    backdropImage: string;
  };
  quickInfo: {
    location: {
      title: string;
      line1: string;
      line2: string;
    };
    phone: {
      title: string;
      number: string;
      hours: string;
    };
    email: {
      title: string;
      address: string;
      note: string;
    };
    workingHours: {
      title: string;
      days: string;
      hours: string;
    };
  };
  formSection: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
  };
  mapWidget: {
    badgeTitle: string;
    badgeSubtitle: string;
    mapImage: string;
    googleMapsUrl: string;
  };
  customTourBanner: {
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    houseboatImage: string;
  };
}

export interface GuideItemData {
  id: string;
  name: string;
  title: string;
  category: "heritage" | "beaches" | "food" | "nature" | "culture" | "all" | string;
  categoryLabel: string;
  image: string;
  languages: string[];
  experienceYears: number;
  rating: string;
  reviewCount: number;
  pricePerDay: string;
  pricePerHour?: string;
  location: string;
  badge: string;
  phone: string;
  whatsapp?: string;
  bio: string;
  specialties: string[];
  available: boolean;
}

export interface GuidesListingHeroData {
  badge: string;
  titleLine1: string;
  titleHighlight: string;
  description: string;
  backdropImage: string;
  galleryCards: PlacesPolaroidCard[];
  stats?: {
    guidesCount: string;
    toursCompleted: string;
    rating: string;
    languagesCount: string;
  };
}

export interface GuidesListingCatalogData {
  tag: string;
  title: string;
  titleHighlight: string;
  description: string;
  guides: GuideItemData[];
}

export interface GuidesData {
  listingHero: GuidesListingHeroData;
  listingCatalog: GuidesListingCatalogData;
}
