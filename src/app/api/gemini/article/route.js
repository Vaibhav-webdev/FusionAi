import { NextResponse } from "next/server";
import { gemini } from "@/lib/Google";

export async function POST(req) {
    try {
        const { prompt, length } = await req.json(); // user ka topic

        const response = await gemini.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Write a well-structured, informative article on the topic in ${length} paragraph:
            "${prompt}"
            The article should include:
            - Introduction
            - Main content with headings
            - Conclusion`,
            config: {
                systemInstruction: "You are a professional article writer.",
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