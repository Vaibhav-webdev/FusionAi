import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const { image } = await req.json();

    const result = await cloudinary.uploader.upload(image, {
      folder: "bg-removed",
      transformation: [{ effect: "background_removal" }],
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    return NextResponse.json(
      { error: "Background removal failed" },
      { status: 500 }
    );
  }
}
