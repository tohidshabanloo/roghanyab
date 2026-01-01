
import { GoogleGenerativeAI } from "@google/generative-ai";

// Using the provided API Key directly to ensure it's available in the Android build
const apiKey = "AIzaSyDq85XaNHDWtRnZtNfJ9AOw5Fv3F_XAXhU";

let ai: GoogleGenerativeAI | null = null;
if (apiKey) {
    ai = new GoogleGenerativeAI(apiKey);
}

export async function getExpertAdvice(carInfo: string): Promise<string> {
  if (!ai) {
      return "خطا: تنظیمات هوش مصنوعی انجام نشده است.";
  }

  try {
    // Using 'gemini-1.5-flash' which is the standard, fast model
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You are a professional Iranian car maintenance expert.
      The user is asking about oil for: "${carInfo}".
      Provide 3 brief, important tips in Persian regarding oil change, filters, or specific engine maintenance for this car in Iran's climate.
      Keep the tone friendly and professional. Use bullet points.`;
      
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Gemini Error:", error);
    
    // Check for specific error types to give better advice
    const errorMessage = error.message || JSON.stringify(error);
    
    if (errorMessage.includes("404") || errorMessage.includes("not found")) {
         return `خطا: مدل هوش مصنوعی در دسترس نیست (404).\n\nنکته مهم: اگر در ایران هستید، لطفاً اطمینان حاصل کنید که VPN روی گوشی/شبیه‌ساز شما روشن است. گوگل این سرویس را برای IP ایران مسدود کرده است.`;
    }
    
    return `خطا در ارتباط با هوش مصنوعی:\n${errorMessage}`;
  }
}
