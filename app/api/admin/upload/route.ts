import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

// Allowed MIME types
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds 10MB limit" },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPEG, PNG, WebP and AVIF image formats are allowed" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Validate image format with sharp
    const metadata = await sharp(buffer).metadata();
    if (!metadata.width || !metadata.height) {
      return NextResponse.json(
        { error: "Invalid image file format" },
        { status: 400 }
      );
    }

    // Generate safe filename
    const ext = metadata.format === "jpeg" ? "jpg" : metadata.format || "png";
    const cleanName = path
      .basename(file.name, path.extname(file.name))
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .slice(0, 30);
    const uniqueName = `${Date.now()}-${cleanName}.${ext}`;

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const targetFilePath = path.join(uploadsDir, uniqueName);
    await fs.writeFile(targetFilePath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueName,
      width: metadata.width,
      height: metadata.height,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
