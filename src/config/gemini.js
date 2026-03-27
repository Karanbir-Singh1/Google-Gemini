import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

async function runChat(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // ✅ latest working model
      contents: prompt,
    });

    return response.text;

  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error: Unable to fetch response";
  }
}

export default runChat;