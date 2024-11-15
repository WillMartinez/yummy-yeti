export const RECIPE_CATEGORIES = [
  "Appetizer",
  "Beverage",
  "Breakfast",
  "Dessert",
  "Main Course",
  "Side Dish",
  "Snack",
  "Soup",
] as const;

export const RECIPE_SUBCATEGORIES: Record<RecipeCategory, string[]> = {
  "Main Course": ["Chicken", "Beef", "Fish", "Vegetarian"],
  Appetizer: ["Hot", "Cold", "Soups"],
  Dessert: ["Cakes", "Cookies", "Ice Cream"],
  "Side Dish": ["Potatoes", "Vegetables", "Salads"],
  Breakfast: ["Oatmeal", "Pancakes", "Eggs", "Smoothies"],
  Snack: ["Fruit", "Veggies", "Nuts", "Granola Bars"],
  Beverage: ["Coffee", "Tea", "Juice", "Smoothies"],
  Soup: ["Soups"],
};

export const RECIPE_UNITS = {
  volume: [
    { value: "tsp", label: "tsp" },
    { value: "tbsp", label: "tbsp" },
    { value: "cup", label: "cup" },
    { value: "fl oz", label: "fl oz" },
    { value: "ml", label: "ml" },
    { value: "l", label: "l" },
  ],
  weight: [
    { value: "g", label: "g" },
    { value: "kg", label: "kg" },
    { value: "oz", label: "oz" },
    { value: "lb", label: "lb" },
  ],
  other: [
    { value: "none", label: "none" },
    { value: "small", label: "small" },
    { value: "medium", label: "medium" },
    { value: "large", label: "large" },
    { value: "piece", label: "piece" },
    { value: "pinch", label: "pinch" },
    { value: "stick", label: "stick" },
    { value: "to taste", label: "to taste" },
  ],
} as const;

export type RecipeCategory = (typeof RECIPE_CATEGORIES)[number];
export type RecipeSubCategory = string;
export type RecipeUnit =
  (typeof RECIPE_UNITS)[keyof typeof RECIPE_UNITS][number]["value"];

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
  featured?: boolean; // optional field
  imageID?: string; // optional field
  createdAt: Date;
  updatedAt: Date;
}

export type CreateRecipeInput = Omit<Recipe, "id" | "createdAt" | "updatedAt">;
