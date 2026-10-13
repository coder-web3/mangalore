import { NextResponse } from "next/server";
import { getContactData, saveContactData } from "@/lib/cms-server";
import { ContactData } from "@/lib/cms";

export async function GET() {
  try {
    const data = await getContactData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load contact data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactData;
    if (!body || !body.hero || !body.quickInfo || !body.formSection) {
      return NextResponse.json(
        { error: "Invalid contact data payload structure" },
        { status: 400 }
      );
    }
    await saveContactData(body);
    return NextResponse.json({
      success: true,
      message: "Contact CMS updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save contact data" },
      { status: 500 }
    );
  }
}
