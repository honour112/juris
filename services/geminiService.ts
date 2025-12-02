import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Ensure this is set in your environment
const ai = new GoogleGenAI({ apiKey });

export const generateArticleIdea = async (topic: string, language: 'en' | 'fr') => {
  try {
    const prompt = language === 'en' 
      ? `Generate a creative and professional article title and a brief 2-sentence summary for a law firm blog about "${topic}". Return the result as a JSON object with keys: "title" and "summary".`
      : `Générez un titre d'article créatif et professionnel ainsi qu'un bref résumé de 2 phrases pour un blog de cabinet d'avocats sur "${topic}". Retournez le résultat sous forme d'objet JSON avec les clés : "title" et "summary".`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};