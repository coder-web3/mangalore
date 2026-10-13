import { NextResponse } from "next/server";
import { getGuidesData, saveGuidesData } from "@/lib/cms-server";
import { GuidesData, GuideItemData } from "@/lib/cms";

export async function GET() {
  try {
    const data = await getGuidesData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load guides data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const current = await getGuidesData();

    // 1. Single Guide Update: { type: "guide", guide: GuideItemData }
    if (body.type === "guide" && body.guide && body.guide.id) {
      const updatedGuides = current.listingCatalog.guides.map((g) =>
        g.id === body.guide.id ? (body.guide as GuideItemData) : g
      );

      // If it's a new guide not in list
      if (!current.listingCatalog.guides.some((g) => g.id === body.guide.id)) {
        updatedGuides.unshift(body.guide as GuideItemData);
      }

      const updatedData: GuidesData = {
        ...current,
        listingCatalog: {
          ...current.listingCatalog,
          guides: updatedGuides,
        },
      };

      await saveGuidesData(updatedData);
      return NextResponse.json({
        success: true,
        message: `Guide "${body.guide.name}" updated successfully!`,
      });
    }

    // 2. Listing & Catalog Update: { type: "listing", listingHero: ..., listingCatalog: ... }
    if (body.type === "listing" && (body.listingHero || body.listingCatalog)) {
      const updatedData: GuidesData = {
        ...current,
        listingHero: body.listingHero || current.listingHero,
        listingCatalog: body.listingCatalog || current.listingCatalog,
      };
      await saveGuidesData(updatedData);
      return NextResponse.json({
        success: true,
        message: "Guides listing saved successfully!",
      });
    }

    // 3. Full GuidesData update
    const fullBody = body as GuidesData;
    if (fullBody.listingHero && fullBody.listingCatalog) {
      await saveGuidesData(fullBody);
      return NextResponse.json({
        success: true,
        message: "Local Guides CMS updated successfully!",
      });
    }

    return NextResponse.json(
      { error: "Invalid payload format for guides update" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error saving guides data:", error);
    return NextResponse.json(
      { error: "Failed to save guides data" },
      { status: 500 }
    );
  }
}
