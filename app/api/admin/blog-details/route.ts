import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getBlogDetailsData, saveBlogDetailsData } from "@/lib/cms-server";
import { BlogDetailData } from "@/lib/cms";

export async function GET() {
  try {
    const data = await getBlogDetailsData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load blog details data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const current = await getBlogDetailsData();

    if (body.slug && body.article) {
      current[body.slug] = body.article as BlogDetailData;
      await saveBlogDetailsData(current);
      revalidatePath(`/blog/${body.slug}`);
      revalidatePath("/blog");
      revalidatePath("/admin");
      return NextResponse.json({
        success: true,
        message: `Blog article "${body.article.title || body.slug}" saved successfully!`,
      });
    }

    if (body.blogDetails) {
      await saveBlogDetailsData(body.blogDetails);
      revalidatePath("/blog");
      revalidatePath("/admin");
      return NextResponse.json({
        success: true,
        message: "All blog details saved successfully!",
      });
    }

    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save blog details" },
      { status: 500 }
    );
  }
}
