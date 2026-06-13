
import React, { useState } from 'react';
import type { Recipe } from '../types';
import RecipeCard from './RecipeCard';

interface SavedRecipesProps {
  recipes: Recipe[];
  onDelete: (recipeId: string) => void;
  onToggleFavorite: (recipeId: string) => void;
}

const SavedRecipes: React.FC<SavedRecipesProps> = ({ recipes, onDelete, onToggleFavorite }) => {
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredRecipes = showFavorites ? recipes.filter(r => r.isFavorite) : recipes;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-text-primary tracking-tight">Your Recipe Box</h2>
        <p className="mt-2 text-lg text-text-secondary">All your saved and favorite culinary creations.</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-slate-200 p-1 rounded-full flex items-center space-x-1">
          <button 
            onClick={() => setShowFavorites(false)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${!showFavorites ? 'bg-card shadow' : 'text-text-secondary hover:bg-slate-300'}`}
          >
            All Recipes
          </button>
          <button 
            onClick={() => setShowFavorites(true)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${showFavorites ? 'bg-card shadow' : 'text-text-secondary hover:bg-slate-300'}`}
          >
            Favorites
          </button>
        </div>
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isSaved={true}
              onDelete={onDelete}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-card rounded-2xl shadow-sm">
          <h3 className="text-xl font-semibold text-text-primary">No Recipes Found</h3>
          <p className="text-text-secondary mt-2">
            {showFavorites
              ? "You haven't marked any recipes as your favorite yet."
              : "Your recipe box is empty. Go generate some new ideas!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
