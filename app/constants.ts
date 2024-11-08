export const RECIPE_CATEGORIES = [
  "Main Course",
  "Desserts",
  "Appetizers",
  "Breakfast",
  "Snack",
  "Beverage",
] as const;

export const RECIPE_SUBCATEGORIES = {
  "Main Course": ["Chicken", "Beef", "Fish", "Vegetarian"],
  "Desserts": ["Cakes", "Cookies", "Pies", "Ice Cream"],
  "Appetizers": ["Hot", "Cold", "Dips", "Finger Foods"],
  "Breakfast": ["Oatmeal", "Pancakes", "Eggs", "Smoothies"],
  "Snack": ["Fruit", "Veggies", "Nuts", "Granola Bars"],
  "Beverage": ["Coffee", "Tea", "Juice", "Smoothies"],
} as const;

export type RecipeCategory = typeof RECIPE_CATEGORIES[number];
export type RecipeSubCategory = typeof RECIPE_SUBCATEGORIES[RecipeCategory][number];

export interface Recipe {
  id: string;
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  category: RecipeCategory;
  subCategory: RecipeSubCategory;
  ingredients: {
    item: string;
    amount: number;
    unit: string;
  }[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  imageID?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateRecipeInput = Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>;
