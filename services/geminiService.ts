import { GoogleGenAI } from "@google/genai";

// Get API key - Vite replaces these at build time via define in vite.config.ts
function getApiKey(): string {
    // Method 1: From process.env.API_KEY (as in your working code)
    // @ts-ignore - process.env is defined by Vite's define option
    if (typeof process !== 'undefined' && process.env?.API_KEY) {
        return process.env.API_KEY;
    }
    
    // Method 2: From process.env.GEMINI_API_KEY (alternative)
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) {
        return process.env.GEMINI_API_KEY;
    }
    
    // Method 3: From Vite's import.meta.env
    // @ts-ignore
    if (import.meta.env?.VITE_GEMINI_API_KEY) {
        // @ts-ignore
        return import.meta.env.VITE_GEMINI_API_KEY;
    }
    
    // Method 4: Fallback to hardcoded key
    return "AIzaSyDq85XaNHDWtRnZtNfJ9AOw5Fv3F_XAXhU";
}

const apiKey = getApiKey().trim();

// Initialize GoogleGenAI exactly as in your working code
const ai = new GoogleGenAI({ apiKey: apiKey });

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
