import fs from "fs/promises";
import path from "path";
import { HomepageData, PlacesData } from "@/lib/cms";

const dataFilePath = path.join(process.cwd(), "data", "homepage.json");
const placesFilePath = path.join(process.cwd(), "data", "places.json");

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
