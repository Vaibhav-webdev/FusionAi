import { NextResponse } from "next/server";
import { gemini } from "@/lib/Google";

export async function POST(req) {
    try {
        const { prompt, style, platform } = await req.json();

        const response = await gemini.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `
You are an expert AI title generator and SEO copywriter.

Task:
Generate high-quality, attention-grabbing titles based on the given content idea.

Rules:
- Return ONLY valid JSON
- No explanations, no markdown, no extra text
- Output must be an array of titles
- Titles must be clear, natural, and human-like
- Avoid emojis unless platform requires it
- Avoid repetition
- Each title should be unique

Guidelines:
- Optimize titles for the given platform
- Match the requested writing style
- Keep titles engaging and clickable
- SEO-friendly but not keyword-stuffed

Platform rules:
- YouTube: curiosity + strong hook
- Blog/Website: SEO-focused + clarity
- Instagram/Reels: short, catchy, scroll-stopping
- LinkedIn: professional, value-driven
- Twitter/X: concise and impactful

Input:
Content Idea: "${prompt}"
Style: "${style}"
Platform: "${platform}"

Output format:
{
  "titles": [
    "title 1",
    "title 2",
    "title 3",
    "title 4",
    "title 5"
  ]
}
`,
            config: {
                systemInstruction: "You are a professional SEO title strategist.",
            }
        });

        return NextResponse.json({
            text: response.text,
        });

    } catch (error) {
        return NextResponse.json(
            { error: "Gemini Failed To Generate" },
            { status: 500 }
        );
    }

}