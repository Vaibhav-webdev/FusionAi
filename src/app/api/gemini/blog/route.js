import { NextResponse } from "next/server";
import { gemini } from "@/lib/Google";

export async function POST(req) {
    try {
        const { prompt, category } = await req.json(); // user ka topic

        const response = await gemini.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `
You are an expert SEO keyword researcher.

Task:
Generate SEO-friendly keywords for the given topic.

Rules:
- Return ONLY valid JSON
- No explanations, no markdown, no extra text
- Keywords must be relevant, searchable, and natural
- Use lowercase keywords
- Avoid repetition

Output Format (strictly follow this):
{
  "primary_keywords": [],
  "secondary_keywords": [],
  "questions": []
}

Guidelines:
- Primary keywords: 2–4 high-intent main keywords
- Secondary keywords: 3–6 supporting or long-tail keywords
- Questions: 3–5 common search queries (how/what/why/is)

Category: ${category}
Topic: "${prompt}"
`,
            config: {
                systemInstruction: "You are a professional SEO keyword strategist.",
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