import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // In production or demo, log the enquiry
    console.log("Contact Enquiry Received:", body);

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Our Mangalore travel expert will contact you shortly.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process enquiry. Please try again." },
      { status: 500 }
    );
  }
}
