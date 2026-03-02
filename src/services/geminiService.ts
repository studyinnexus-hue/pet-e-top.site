import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface Story {
  title: string;
  content: string;
  illustrationPrompt: string;
  audioBase64?: string;
}

export interface NewsItem {
  title: string;
  summary: string;
  date: string;
  source: string;
  url?: string;
}

export const geminiService = {
  async generateStory(petType: string = "cachorro"): Promise<Story> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Gere uma história real e emocionante de superação de um ${petType} que sofreu maus-tratos e foi resgatado. 
      A história deve ser em português, educativa e inspiradora. 
      Retorne em formato JSON com os campos: title, content (a história completa), illustrationPrompt (um prompt em inglês para gerar uma imagem dessa cena).`,
      config: {
        responseMimeType: "application/json",
      },
    });

    try {
      return JSON.parse(response.text || "{}");
    } catch (e) {
      console.error("Failed to parse story", e);
      throw e;
    }
  },

  async generateAudio(text: string): Promise<string | undefined> {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Leia esta história de forma calma e acolhedora: ${text.substring(0, 500)}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    } catch (e) {
      console.error("Audio generation failed", e);
      return undefined;
    }
  },

  async getNews(): Promise<NewsItem[]> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Liste 6 notícias recentes (reais ou baseadas em fatos) sobre bem-estar animal, resgates emocionantes e novas leis contra maus-tratos no Brasil. Retorne um array JSON com objetos contendo title, summary, date, source (nome do portal de notícias) e url (o link real da notícia encontrado na busca).",
      config: {
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }]
      },
    });

    try {
      return JSON.parse(response.text || "[]");
    } catch (e) {
      console.error("Failed to parse news", e);
      return [];
    }
  },

  async generateIllustration(prompt: string): Promise<string | undefined> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `A beautiful, heartwarming digital illustration for a children's book: ${prompt}. Soft lighting, emotional, high quality.`,
            },
          ],
        },
      });
      
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    } catch (e) {
      console.error("Image generation failed", e);
    }
    return undefined;
  }
};
