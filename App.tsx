
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import RecipeGenerator from './components/RecipeGenerator';
import SavedRecipes from './components/SavedRecipes';
import RecipeCard from './components/RecipeCard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Recipe, View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.GENERATOR);
  const [savedRecipes, setSavedRecipes] = useLocalStorage<Recipe[]>('savedRecipes', []);
  const [sharedRecipe, setSharedRecipe] = useState<Recipe | null>(null);

  const savedRecipeIds = useMemo(() => new Set(savedRecipes.map(r => r.id)), [savedRecipes]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shareData = params.get('share');
    if (shareData) {
      try {
        const jsonStr = decodeURIComponent(atob(shareData).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        const recipe = JSON.parse(jsonStr);
        setSharedRecipe(recipe);
        setCurrentView(View.SHARED);
      } catch (e) {
        console.error("Failed to parse shared recipe", e);
      }
    }
  }, []);

  const handleRecipeSave = (recipe: Recipe) => {
    if (!savedRecipeIds.has(recipe.id)) {
      setSavedRecipes(prev => [...prev, recipe]);
    }
  };

  const handleRecipeDelete = (recipeId: string) => {
    setSavedRecipes(prev => prev.filter(r => r.id !== recipeId));
  };

  const handleToggleFavorite = (recipeId: string) => {
    setSavedRecipes(prev =>
      prev.map(r =>
        r.id === recipeId ? { ...r, isFavorite: !r.isFavorite } : r
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main>
        {currentView === View.GENERATOR && (
          <RecipeGenerator onRecipeSave={handleRecipeSave} savedRecipeIds={savedRecipeIds} />
        )}
        {currentView === View.SAVED && (
          <SavedRecipes
            recipes={savedRecipes}
            onDelete={handleRecipeDelete}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        {currentView === View.SHARED && sharedRecipe && (
           <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-text-primary tracking-tight">Shared Recipe</h2>
              <p className="mt-2 text-lg text-text-secondary">Check out this recipe shared with you!</p>
            </div>
            <div className="animate-fade-in">
               <RecipeCard 
                  recipe={sharedRecipe} 
                  onSave={handleRecipeSave} 
                  isSaved={savedRecipeIds.has(sharedRecipe.id)}
                  onDelete={handleRecipeDelete}
                  onToggleFavorite={handleToggleFavorite}
               />
            </div>
            <div className="mt-8 text-center">
                <button 
                    onClick={() => {
                        setCurrentView(View.GENERATOR);
                        // Clean the URL without reloading
                        window.history.pushState({}, '', window.location.pathname);
                    }}
                    className="text-primary hover:text-amber-600 font-semibold transition-colors"
                >
                    &larr; Create your own recipe
                </button>
            </div>
          </div>
        )}
      </main>
      <footer className="text-center py-4 text-xs text-text-secondary">
        Powered by AI. Recipes are suggestions and should be prepared with care.
      </footer>
    </div>
  );
};

export default App;
