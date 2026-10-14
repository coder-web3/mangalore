import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAboutData, saveAboutData } from "@/lib/cms-server";
import { AboutData } from "@/lib/cms";

export async function GET() {
  try {
    const data = await getAboutData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load about data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AboutData;
    if (!body || !body.hero || !body.story || !body.whatMakesUsDifferent) {
      return NextResponse.json(
        { error: "Invalid about data payload structure" },
        { status: 400 }
      );
    }
    await saveAboutData(body);
    revalidatePath("/about");
    revalidatePath("/admin");
    return NextResponse.json({
      success: true,
      message: "About Us CMS updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save about data" },
      { status: 500 }
    );
  }
}
