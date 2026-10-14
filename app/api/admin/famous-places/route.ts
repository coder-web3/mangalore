import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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
    const body = await request.json();
    const current = await getFamousPlacesData();

    // 1. Granular Single Famous Place Detail Update: { type: "detail", slug: string, detail: PanamburDetailData }
    if (body.type === "detail" && body.slug && body.detail) {
      const updatedDetails = {
        ...(current.placeDetails || {}),
        [body.slug]: body.detail,
      };

      const updatedData: PlacesData = {
        ...current,
        placeDetails: updatedDetails,
      };

      if (body.slug === "panambur-beach") {
        updatedData.panamburDetail = body.detail;
      }

      await saveFamousPlacesData(updatedData);
      revalidatePath(`/famous-tourist-places/${body.slug}`);
      revalidatePath("/famous-tourist-places");
      revalidatePath("/admin");
      return NextResponse.json({
        success: true,
        message: `Famous detail page for "${body.slug}" saved without conflicts!`,
      });
    }

    // 2. Granular Listing Page Only Update: { type: "listing", listingHero: ..., listingCatalog: ... }
    if (body.type === "listing" && body.listingHero && body.listingCatalog) {
      const updatedData: PlacesData = {
        ...current,
        listingHero: body.listingHero,
        listingCatalog: body.listingCatalog,
      };
      await saveFamousPlacesData(updatedData);
      revalidatePath("/famous-tourist-places");
      revalidatePath("/admin");
      return NextResponse.json({
        success: true,
        message: "Famous places listing page saved without touching detail pages!",
      });
    }

    // 3. Fallback / Full update with safety merge
    const fullBody = body as PlacesData;
    if (!fullBody || !fullBody.listingHero || !fullBody.listingCatalog) {
      return NextResponse.json(
        { error: "Invalid famous places data payload structure" },
        { status: 400 }
      );
    }

    const mergedDetails = {
      ...(current.placeDetails || {}),
      ...(fullBody.placeDetails || {}),
    };

    const finalData: PlacesData = {
      ...current,
      ...fullBody,
      placeDetails: mergedDetails,
    };

    if (finalData.placeDetails["panambur-beach"]) {
      finalData.panamburDetail = finalData.placeDetails["panambur-beach"];
    }

    await saveFamousPlacesData(finalData);
    revalidatePath("/famous-tourist-places");
    revalidatePath("/admin");
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
