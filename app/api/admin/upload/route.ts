import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

// Allowed MIME types
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
];

const MAX_IMAGE_SIZE = 15 * 1024 * 1024; // 15MB limit
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB limit for video

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);
    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        {
          error:
            "Invalid file format. Allowed: Images (JPEG, PNG, WebP, AVIF) or Videos (MP4, WebM, MOV, OGG)",
        },
        { status: 400 }
      );
    }

    const maxAllowedSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    if (file.size > maxAllowedSize) {
      const limitMb = isVideo ? "100MB" : "15MB";
      return NextResponse.json(
        { error: `File exceeds maximum allowed limit of ${limitMb}` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    if (isVideo) {
      // Determine video extension
      let ext = "mp4";
      if (file.type === "video/webm") ext = "webm";
      else if (file.type === "video/ogg") ext = "ogg";
      else if (file.type === "video/quicktime") ext = "mov";
      else {
        const origExt = path.extname(file.name).toLowerCase().replace(".", "");
        if (origExt) ext = origExt;
      }

      const cleanName = path
        .basename(file.name, path.extname(file.name))
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "-")
        .slice(0, 35);
      const uniqueName = `${Date.now()}-${cleanName}.${ext}`;
      const targetFilePath = path.join(uploadsDir, uniqueName);

      await fs.writeFile(targetFilePath, buffer);
      const publicUrl = `/uploads/${uniqueName}`;

      return NextResponse.json({
        success: true,
        url: publicUrl,
        filename: uniqueName,
        type: "video",
        mimeType: file.type,
        size: file.size,
      });
    }

    // Process image with sharp
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

    const targetFilePath = path.join(uploadsDir, uniqueName);
    await fs.writeFile(targetFilePath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueName,
      width: metadata.width,
      height: metadata.height,
      type: "image",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process upload" },
      { status: 500 }
    );
  }
}
