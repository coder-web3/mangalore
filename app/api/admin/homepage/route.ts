import { NextResponse } from "next/server";
import { getHomepageData, saveHomepageData } from "@/lib/cms-server";
import { HomepageData } from "@/lib/cms";

export async function GET() {
  try {
    const data = await getHomepageData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load homepage data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HomepageData;
    if (!body || !body.hero || !body.whyChooseUs) {
      return NextResponse.json(
        { error: "Invalid data payload structure" },
        { status: 400 }
      );
    }
    await saveHomepageData(body);
    return NextResponse.json({ success: true, message: "Homepage updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save homepage data" },
      { status: 500 }
    );
  }
}
