
import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure API key is defined, handle undefined gracefully to prevent crash on load
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';

let ai: GoogleGenerativeAI | null = null;
if (apiKey) {
    ai = new GoogleGenerativeAI(apiKey);
} else {
    console.warn("Gemini API Key is missing!");
}

export async function getExpertAdvice(carInfo: string): Promise<string> {
  if (!ai) {
      return "تنظیمات هوش مصنوعی انجام نشده است. لطفاً کلید API را بررسی کنید.";
  }
  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are a professional Iranian car maintenance expert.
      The user is asking about oil for: "${carInfo}".
      Provide 3 brief, important tips in Persian regarding oil change, filters, or specific engine maintenance for this car in Iran's climate.
      Keep the tone friendly and professional. Use bullet points.`;
      
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "متأسفانه مشکلی در دریافت مشاوره پیش آمد.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "خطا در برقراری ارتباط با کارشناس هوش مصنوعی.";
  }
}
