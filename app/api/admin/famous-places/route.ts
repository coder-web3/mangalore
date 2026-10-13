import { NextResponse } from "next/server";
import { getFamousPlacesData, saveFamousPlacesData } from "@/lib/cms-server";
import { PlacesData } from "@/lib/cms";

export async function GET() {
  try {
    const data = await getFamousPlacesData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load famous places data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PlacesData;
    if (!body || !body.listingHero || !body.listingCatalog) {
      return NextResponse.json(
        { error: "Invalid famous places data payload structure" },
        { status: 400 }
      );
    }
    await saveFamousPlacesData(body);
    return NextResponse.json({
      success: true,
      message: "Famous tourist places CMS updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save famous places data" },
      { status: 500 }
    );
  }
}
