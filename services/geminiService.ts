
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getExpertAdvice(carInfo: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional Iranian car maintenance expert.
      The user is asking about oil for: "${carInfo}".
      Provide 3 brief, important tips in Persian regarding oil change, filters, or specific engine maintenance for this car in Iran's climate.
      Keep the tone friendly and professional. Use bullet points.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "متأسفانه مشکلی در دریافت مشاوره پیش آمد.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "خطا در برقراری ارتباط با کارشناس هوش مصنوعی.";
  }
}
