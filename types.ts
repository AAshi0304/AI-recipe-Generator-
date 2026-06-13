
export interface Recipe {
  id: string;
  recipeName: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: string;
  isFavorite: boolean;
}

export enum View {
  GENERATOR = 'GENERATOR',
  SAVED = 'SAVED',
  SHARED = 'SHARED',
}
