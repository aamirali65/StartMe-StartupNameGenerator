import { GoogleGenerativeAI } from "@google/generative-ai";

// The API key comes from the environment, never from source.
// Copy .env.example to .env (it is gitignored) and set VITE_GEMINI_API_KEY.
//
// Note: Vite inlines VITE_* variables into the built bundle, so anyone using the
// deployed site can read the key. If the key must stay secret, proxy the call
// through a small server route instead of calling Gemini from the browser.
const getModel = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "VITE_GEMINI_API_KEY is not set. Copy .env.example to .env and add your Gemini API key."
    );
  }

  return new GoogleGenerativeAI(apiKey).getGenerativeModel({ model: "gemini-pro" });
};

export const testGemini = async () => {
  try {
    const result = await getModel().generateContent("Test message");
    console.log("Test response:", result.response.text());
    return true;
  } catch (error) {
    console.error("Gemini Error:", error);
    return false;
  }
};

export const generateNames = async (formData) => {
  const { industry, keywords } = formData;

  const prompt = `Generate 6 unique and creative startup names for a ${industry} company.
Keywords to consider: ${keywords}
Guidelines:
- Memorable and easy to pronounce
- Check domain name availability
- Avoid common clichés
Only provide the names, one per line.`;

  try {
    const result = await getModel().generateContent(prompt);
    const response = result.response.text();
    return response.split("\n").filter((name) => name.trim().length > 0);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate names");
  }
};
