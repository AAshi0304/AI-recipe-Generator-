
import React, { useState } from 'react';
import { generateRecipe } from '../services/geminiService';
import type { Recipe } from '../types';
import RecipeCard from './RecipeCard';
import Spinner from './Spinner';
import { SparklesIcon } from './Icon';

interface RecipeGeneratorProps {
  onRecipeSave: (recipe: Recipe) => void;
  savedRecipeIds: Set<string>;
}

const RecipeGenerator: React.FC<RecipeGeneratorProps> = ({ onRecipeSave, savedRecipeIds }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cuisineType, setCuisineType] = useState('Any');
  const [dishType, setDishType] = useState('Any');
  const [recipeStyle, setRecipeStyle] = useState('Any');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Please enter some ingredients or a dish idea.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedRecipe(null);

    const enhancedPrompt = `${prompt}. Cuisine: ${cuisineType}. Dish Type: ${dishType}. Recipe Style: ${recipeStyle}.`;

    try {
      const recipeData = await generateRecipe(enhancedPrompt);
      const newRecipe: Recipe = {
        ...recipeData,
        id: new Date().toISOString(), // Simple unique ID
        isFavorite: false,
      };
      setGeneratedRecipe(newRecipe);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = (recipe: Recipe) => {
    onRecipeSave(recipe);
    // Visually update the state to "saved"
    setGeneratedRecipe(null); 
  };
  
  const isCurrentRecipeSaved = generatedRecipe ? savedRecipeIds.has(generatedRecipe.id) : false;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-text-primary tracking-tight">Welcome , Chef! what are we creating today</h2>
        <p className="mt-2 text-lg text-text-secondary">Tell me what ingredients you have and your preferences, and I'll create a unique recipe just for you!</p>
      </div>

      <form onSubmit={handleGenerate} className="mb-8">
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-text-primary mb-2">What ingredients do you have?</label>
          <textarea
            id="ingredients"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., chicken breast, broccoli, rice, soy sauce..."
            className="w-full p-4 text-base border border-slate-300 rounded-full shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
            rows={1}
            onFocus={() => setError(null)}
          />
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex-1 min-w-0">
            <label htmlFor="cuisineType" className="block text-sm font-medium text-text-primary mb-1">Cuisine Type</label>
            <select
              id="cuisineType"
              value={cuisineType}
              onChange={(e) => setCuisineType(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
            >
              <option value="Any">Any</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Chinese">Chinese</option>
              <option value="Indian">Indian</option>
              <option value="American">American</option>
              <option value="Mediterranean">Mediterranean</option>
              <option value="Japanese">Japanese</option>
            </select>
          </div>

          <div className="flex-1 min-w-0">
            <label htmlFor="dishType" className="block text-sm font-medium text-text-primary mb-1">Dish Type</label>
            <select
              id="dishType"
              value={dishType}
              onChange={(e) => setDishType(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
            >
              <option value="Any">Any</option>
              <option value="Main Course">Main Course</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Dessert">Dessert</option>
              <option value="Salad">Salad</option>
              <option value="Soup">Soup</option>
              <option value="Breakfast">Breakfast</option>
            </select>
          </div>

          <div className="flex-1 min-w-0">
            <label htmlFor="recipeStyle" className="block text-sm font-medium text-text-primary mb-1">Recipe Style</label>
            <select
              id="recipeStyle"
              value={recipeStyle}
              onChange={(e) => setRecipeStyle(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
            >
              <option value="Any">Any</option>
              <option value="Quick and Easy (under 30 mins)">Quick and Easy (under 30 mins)</option>
              <option value="Healthy">Healthy</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Gluten-free">Gluten-free</option>
              <option value="Gourmet">Gourmet</option>
            </select>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full flex items-center justify-center mx-auto transition-colors disabled:bg-amber-300"
          >
            {isLoading ? 'Creating...' : <> <SparklesIcon className="w-5 h-5 mr-2"/> Generate Recipe </>}
          </button>
          {generatedRecipe && !isCurrentRecipeSaved && (
            <button
              onClick={() => handleSave(generatedRecipe)}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full flex items-center justify-center mx-auto transition-colors"
            >
              Save Recipe
            </button>
          )}
        </div>
      </form>
      
      {isLoading && <Spinner />}

      {error && (
        <div className="text-center">
          <div className="text-red-500 bg-red-100 p-4 rounded-lg mb-4">{error}</div>
          <button
            onClick={handleGenerate}
            className="bg-primary hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {generatedRecipe && !isCurrentRecipeSaved && (
        <div className="animate-fade-in">
           <RecipeCard recipe={generatedRecipe} onSave={handleSave} />
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;
