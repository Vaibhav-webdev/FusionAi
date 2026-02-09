export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { gemini } from "@/lib/Google";

export async function POST(req) {
  try {
    const { prompt, style } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }
    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: `${prompt} in ${style}`,
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return NextResponse.json({
          imageBase64: part.inlineData.data,
        });
      }
    }

    return NextResponse.json(
      { error: "No image generated" },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Image generation failed", error },
      { status: 500 }
    );
  }
}
