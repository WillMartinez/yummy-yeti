"use client";
import ImageUpload from "@/components/ImageUpload";
import Link from "next/link";
import { useState } from "react";
import {
  CreateRecipeInput,
  RECIPE_CATEGORIES,
  RECIPE_SUBCATEGORIES,
  RecipeCategory,
  RecipeSubCategory,
} from "../constants";


export default function ShareRecipe() {
    const [formData, setFormData] = useState<CreateRecipeInput>({
      title: "",
      description: "",
      difficulty: "EASY",
      category: "Main Course",
      subCategory: "Chicken",
      ingredients: [],
      instructions: [],
      prepTime: 0,
      cookTime: 0,
      imageID:"",
      servings: 0,
    });
  

  const [currentIngredient, setCurrentIngredient] = useState({
    item: '',
    amount: '',
    unit: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create recipe");

      // Handle success (e.g., show message, reset form, redirect)
    } catch (error) {
      console.error("Error creating recipe:", error);
      // Handle error (e.g., show error message)
    }
    console.log(formData);
  };


  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="flex items-center text-blue-500 hover:text-blue-600"
        >
          <span>← Back to Recipes</span>
        </Link>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Share Your Recipe</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Info Section */}
        <div className="space-y-6 mb-8">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="cookTime"
              className="block text-sm font-medium mb-2"
            >
              Cooking Time
            </label>
            <input
              type="text"
              id="cookTime"
              value={formData.cookTime.toString()}
              onChange={(e) => setFormData({...formData, cookTime: e.target.value ? parseInt(e.target.value) : 0})}
              placeholder="e.g., 30 mins"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        {/* Categories Section */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Difficulty</label>
            <select
              id="difficulty"
              value={formData.difficulty}
              onChange={(e) => setFormData({...formData, difficulty: e.target.value as "EASY" | "MEDIUM" | "HARD"})}
              className="w-full p-2 border rounded-md"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value as RecipeCategory})}
              className="w-full p-2 border rounded-md"
            >
              {RECIPE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Sub Category
            </label>
            <select
              id="subCategory"
              value={formData.subCategory}
              onChange={(e) =>
                setFormData({...formData, subCategory: e.target.value as RecipeSubCategory})
              }
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a sub category</option>
              {RECIPE_SUBCATEGORIES[formData.category].map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Image and Ingredients Section */}
        <div className="space-y-8">
          <div>
            <ImageUpload
              onUploadSuccess={(publicId: string) => {
                console.log("Uploaded image public ID:", publicId);
                setFormData({...formData, imageID: publicId});
              }}
            />
          </div>

          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium mb-2">
              Ingredients
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  id="ingredientItem"
                  value={currentIngredient.item}
                  onChange={(e) => setCurrentIngredient({...currentIngredient, item: e.target.value})}
                  placeholder="Ingredient name"
                  className="flex-1 p-2 border rounded-md"
                />
                <input
                  type="number"
                  id="ingredientAmount"
                  value={currentIngredient.amount}
                  onChange={(e) => setCurrentIngredient({...currentIngredient, amount: e.target.value})}
                  placeholder="Amount"
                  className="w-24 p-2 border rounded-md"
                />
                <input
                  type="text"
                  id="ingredientUnit"
                  value={currentIngredient.unit}
                  onChange={(e) => setCurrentIngredient({...currentIngredient, unit: e.target.value})}
                  placeholder="Unit"
                  className="w-24 p-2 border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (currentIngredient.item && currentIngredient.amount && currentIngredient.unit) {
                      setFormData({
                        ...formData,
                        ingredients: [...formData.ingredients, {
                          item: currentIngredient.item,
                          amount: Number(currentIngredient.amount),
                          unit: currentIngredient.unit
                        }]
                      });
                      setCurrentIngredient({ item: '', amount: '', unit: '' });
                    }
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Add
                </button>
              </div>

              <ul className="space-y-2">
                {formData.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                  >
                    <span>{ingredient.amount} {ingredient.unit} {ingredient.item}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newIngredients = formData.ingredients.filter((_, i) => i !== index);
                        setFormData({...formData, ingredients: newIngredients});
                      }}
                      className="text-red-500 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg mt-8"
        >
          Share Recipe
        </button>
      </form>
    </main>
  );
}
