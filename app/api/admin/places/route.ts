import { NextResponse } from "next/server";
import { getPlacesData, savePlacesData } from "@/lib/cms-server";
import { PlacesData } from "@/lib/cms";

export async function GET() {
  try {
    const data = await getPlacesData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load places data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PlacesData;
    if (!body || !body.listingHero || !body.listingCatalog) {
      return NextResponse.json(
        { error: "Invalid places data payload structure" },
        { status: 400 }
      );
    }
    // Ensure panamburDetail and placeDetails["panambur-beach"] stay synchronized
    if (body.placeDetails && body.placeDetails["panambur-beach"]) {
      body.panamburDetail = body.placeDetails["panambur-beach"];
    } else if (body.panamburDetail && body.placeDetails && !body.placeDetails["panambur-beach"]) {
      body.placeDetails["panambur-beach"] = body.panamburDetail;
    }
    await savePlacesData(body);
    return NextResponse.json({ success: true, message: "Places CMS updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save places data" },
      { status: 500 }
    );
  }
}
