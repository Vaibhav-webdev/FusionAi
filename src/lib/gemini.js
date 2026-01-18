// lib/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function runGemini(prompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });
  
  const final_prompt = `You are a professional resume writer. Enhance the following professional summary while:
- Keeping it in a single paragraph
- Any Sentence Provided Your Just Convert Into summary paragraph under 40-50 words
- Limit the enhanced summary to 45–50 words
- Maintaining almost the same length (do not make it longer)
- Using similar wording and tone
- Not adding new skills or technologies
- Improving clarity, flow, and professionalism
- Avoiding buzzwords or exaggerated claims

Original summary:
"${prompt}"
`;
  const result = await model.generateContent(final_prompt);
  return result.response.text();
}