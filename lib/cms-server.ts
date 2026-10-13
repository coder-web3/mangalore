import fs from "fs/promises";
import path from "path";
import { HomepageData, PlacesData, AboutData, ContactData } from "@/lib/cms";

const dataFilePath = path.join(process.cwd(), "data", "homepage.json");
const placesFilePath = path.join(process.cwd(), "data", "places.json");
const aboutFilePath = path.join(process.cwd(), "data", "about.json");
const contactFilePath = path.join(process.cwd(), "data", "contact.json");

export async function getHomepageData(): Promise<HomepageData> {
  try {
    const raw = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(raw) as HomepageData;
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
