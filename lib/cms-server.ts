import fs from "fs/promises";
import path from "path";
import { HomepageData, PlacesData, AboutData, ContactData, GuidesData } from "@/lib/cms";

const dataFilePath = path.join(process.cwd(), "data", "homepage.json");
const placesFilePath = path.join(process.cwd(), "data", "places.json");
const famousPlacesFilePath = path.join(process.cwd(), "data", "famous-places.json");
const aboutFilePath = path.join(process.cwd(), "data", "about.json");
const contactFilePath = path.join(process.cwd(), "data", "contact.json");
const guidesFilePath = path.join(process.cwd(), "data", "guides.json");

export async function getHomepageData(): Promise<HomepageData> {
  try {
    const raw = await fs.readFile(dataFilePath, "utf8");
    const data = JSON.parse(raw);
    return {
      ...data,
      planTripCTA: data.planTripCTA || {
        tag: "PLAN YOUR TRIP",
        title: "Need Help Planning Your Mangalore Trip?",
        description: "Tell us your travel dates, interests and group details. We'll create a customised itinerary just for you.",
        buttonText: "Plan My Trip",
        buttonLink: "/contact",
        backdropImage: "/nitk.avif",
      },
      gallery: data.gallery || {
        tag: "GALLERY",
        title: "Mangalore in",
        titleHighlight: "Pictures",
        description: "A visual journey through Mangalore's beaches, heritage, culture, food and everyday moments.",
        filterTabs: [
          { id: "all", label: "All" },
          { id: "beaches", label: "Beaches" },
          { id: "temples", label: "Temples" },
          { id: "nature", label: "Nature" },
          { id: "food", label: "Food" },
          { id: "culture", label: "Culture" },
          { id: "city", label: "City Life" },
        ],
        items: [],
      },
      tourEnquiryCTA: data.tourEnquiryCTA || {
        tag: "TOUR ENQUIRY",
        title: "Interested in Our Mangalore Tour Packages?",
        subtitle: "Get the latest offers, package details, pricing and availability.",
        buttonText: "Send Enquiry",
        buttonLink: "/contact",
        phone: "+91 98765 43210",
        email: "explore@mangaloretours.com",
        backdropImage: "/nitk.avif",
        steps: [],
      },
      artAndHistory: data.artAndHistory || {
        tag: "ART & HISTORY",
        titleLine1: "Mangalore's",
        titleHighlight: "Art, Heritage and History",
        description: "Explore the rich culture, historic landmarks and artistic traditions.",
        viewAllText: "View All",
        viewAllLink: "/places-to-visit",
        items: [],
      },
      events: data.events || {
        tag: "WHAT'S HAPPENING",
        title: "Events in",
        titleHighlight: "Mangalore",
        description: "Discover upcoming festivals, cultural programs, concerts, markets and more.",
        viewAllText: "View All Events",
        viewAllLink: "#events",
        categories: [],
      },
      exploreMore: data.exploreMore || {
        tag: "BE A PART OF MANGALORE",
        title: "Explore More of",
        titleHighlight: "Mangalore",
        description: "Discover places, food, events, businesses and experiences.",
        buttonText: "Start Exploring",
        buttonLink: "/places-to-visit",
        backdropImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
        quickLinks: [],
      },
    } as HomepageData;
  } catch (error) {
    console.error("Error reading homepage data:", error);
    throw error;
  }
}

export async function saveHomepageData(data: HomepageData): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf8");
}

export async function getPlacesData(): Promise<PlacesData> {
  try {
    const raw = await fs.readFile(placesFilePath, "utf8");
    return JSON.parse(raw) as PlacesData;
  } catch (error) {
    console.error("Error reading places data:", error);
    throw error;
  }
}

export async function savePlacesData(data: PlacesData): Promise<void> {
  await fs.writeFile(placesFilePath, JSON.stringify(data, null, 2), "utf8");
}

export async function getFamousPlacesData(): Promise<PlacesData> {
  try {
    const raw = await fs.readFile(famousPlacesFilePath, "utf8");
    const parsed = JSON.parse(raw) as PlacesData;
    // Ensure placeDetails exists
    if (!parsed.placeDetails) {
      parsed.placeDetails = {};
    }
    return parsed;
  } catch (error) {
    console.error("Error reading famous places data:", error);
    return getPlacesData();
  }
}

export async function saveFamousPlacesData(data: PlacesData): Promise<void> {
  await fs.writeFile(famousPlacesFilePath, JSON.stringify(data, null, 2), "utf8");
}

export async function getAboutData(): Promise<AboutData> {
  try {
    const raw = await fs.readFile(aboutFilePath, "utf8");
    return JSON.parse(raw) as AboutData;
  } catch (error) {
    console.error("Error reading about data:", error);
    throw error;
  }
}

export async function saveAboutData(data: AboutData): Promise<void> {
  await fs.writeFile(aboutFilePath, JSON.stringify(data, null, 2), "utf8");
}

export async function getContactData(): Promise<ContactData> {
  try {
    const raw = await fs.readFile(contactFilePath, "utf8");
    return JSON.parse(raw) as ContactData;
  } catch (error) {
    console.error("Error reading contact data:", error);
    throw error;
  }
}

export async function saveContactData(data: ContactData): Promise<void> {
  await fs.writeFile(contactFilePath, JSON.stringify(data, null, 2), "utf8");
}

export async function getGuidesData(): Promise<GuidesData> {
  try {
    const raw = await fs.readFile(guidesFilePath, "utf8");
    return JSON.parse(raw) as GuidesData;
  } catch (error) {
    console.error("Error reading guides data:", error);
    throw error;
  }
}

export async function saveGuidesData(data: GuidesData): Promise<void> {
  await fs.writeFile(guidesFilePath, JSON.stringify(data, null, 2), "utf8");
}
