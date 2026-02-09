export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { gemini } from "@/lib/Google";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");
    const userPrompt = formData.get("prompt");

    if (!file || !userPrompt) {
      return NextResponse.json(
        { error: "Image and prompt required" },
        { status: 400 }
      );
    }

    // === Official doc equivalent of fs.readFileSync ===
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString("base64");

    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
        {
          role: "user",
          parts: [
            { text: userPrompt },
            {
              inlineData: {
                mimeType: file.type,
                data: base64Image,
              },
            },
          ],
        },
      ],
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((p) => p.inlineData);

    if (!imagePart) {
      return NextResponse.json(
        { error: "No image returned" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      imageBase64: imagePart.inlineData.data,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Image edit failed" },
      { status: 500 }
    );
  }
}
