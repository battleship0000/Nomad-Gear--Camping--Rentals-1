
import { GoogleGenAI, Type } from "@google/genai";

export async function getGearRecommendation(tripDetails: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Based on these trip details: "${tripDetails}", recommend the most suitable camping package from our options: Weekend Light Kit, Family Basecamp, Solo Explorer, or Group Expedition. Provide a short explanation and 3 essential gear tips for this specific trip. Return the result in a structured JSON format.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendedPackage: {
            type: Type.STRING,
            description: "The name of the recommended package",
          },
          explanation: {
            type: Type.STRING,
            description: "A short explanation of why this package was chosen",
          },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 specific gear or safety tips for the trip",
          },
        },
        required: ["recommendedPackage", "explanation", "tips"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
}

export async function searchCampgrounds(location: string, latLng?: { latitude: number, longitude: number }) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Find 3-5 high-rated campgrounds or hiking spots near ${location}. For each, provide a brief description of why it's great for camping.`;

  const config: any = {
    tools: [{ googleMaps: {} }, { googleSearch: {} }],
  };

  if (latLng) {
    config.toolConfig = {
      retrievalConfig: {
        latLng: latLng
      }
    };
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: config,
  });

  return {
    text: response.text,
    links: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
}
