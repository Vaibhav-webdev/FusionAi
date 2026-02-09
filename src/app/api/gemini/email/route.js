import { NextResponse } from "next/server";
import { gemini } from "@/lib/Google";

export async function POST(req) {
    try {
        const { prompt, tone, addi } = await req.json();

        const response = await gemini.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `
You are an expert email copywriter.

Task:
Write a clear, well-structured, and human-like email based on the inputs.

Rules:
- Return ONLY valid JSON
- No explanations, no markdown, no extra text
- Subject must be concise and relevant
- Email body must sound natural and professional
- Avoid robotic or AI-sounding language
- Follow the requested tone strictly

Tone guidelines:
- Professional: formal, polite, business-ready
- Friendly: warm, conversational, respectful
- Funny: light humor but still appropriate
- Emotional: empathetic, sincere, human
- Persuasive: convincing, confident, benefit-driven

Email structure:
- Subject line
- Greeting
- Main message (clear and focused)
- Polite closing
- Professional sign-off (generic, no name)

Inputs:
Email purpose: "${prompt}"
Tone/type: "${tone}"
Additional instructions (optional): "${addi || "none"}"

Output format:
{
  "subject": "Email subject here",
  "body": "Full email body here"
}`,
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