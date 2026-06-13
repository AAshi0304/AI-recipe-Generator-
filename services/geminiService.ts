
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

/// <reference types="vite/client" />

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: { type: Type.STRING, description: "The name of the recipe." },
    description: { type: Type.STRING, description: "A short, enticing description of the dish." },
    prepTime: { type: Type.STRING, description: "Preparation time, e.g., '15 minutes'." },
    cookTime: { type: Type.STRING, description: "Cooking time, e.g., '25 minutes'." },
    servings: { type: Type.STRING, description: "Number of servings, e.g., '4 servings'." },
    ingredients: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of ingredients with measurements."
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Step-by-step cooking instructions."
    },
  },
  required: ["recipeName", "description", "prepTime", "cookTime", "servings", "ingredients", "instructions"]
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateRecipe = async (prompt: string, retries = 3): Promise<Omit<Recipe, 'id' | 'isFavorite'>> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set. Please set GEMINI_API_KEY in your .env file.");
  }

  const ai = new GoogleGenAI({ apiKey });

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const fullPrompt = `Generate a creative and delicious recipe based on the following ingredients and preferences: "${prompt}". Please provide a complete recipe.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: recipeSchema,
        },
      });

      const text = response.text.trim();
      // Gemini sometimes wraps JSON in ```json ... ```, so we strip it.
      const cleanJson = text.replace(/^```json\s*/, '').replace(/```$/, '');
      const recipeData = JSON.parse(cleanJson);

      return recipeData;
    } catch (error: any) {
      console.error(`Error generating recipe with Gemini API (attempt ${attempt + 1}):`, error);

      // If this is the last attempt, throw the error
      if (attempt === retries) {
        // More specific error handling
        if (error?.status === 429) {
          throw new Error("Rate limit exceeded. Please wait a moment and try again.");
        } else if (error?.status === 403) {
          throw new Error("API key invalid or insufficient permissions. Please check your API key.");
        } else if (error?.status >= 500) {
          throw new Error("Server error. The AI service might be temporarily unavailable. Please try again later.");
        } else if (error?.code === 'NETWORK_ERROR' || !navigator.onLine) {
          throw new Error("Network error. Please check your internet connection and try again.");
        } else if (error?.message?.includes('JSON')) {
          throw new Error("Failed to parse recipe data. Please try again.");
        } else {
          throw new Error("Failed to generate recipe. The AI might be busy, please try again.");
        }
      }

      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
      console.log(`Retrying in ${delay}ms...`);
      await sleep(delay);
    }
  }
  // This should never be reached, but TypeScript requires it
  throw new Error("Failed to generate recipe after retries.");
};
