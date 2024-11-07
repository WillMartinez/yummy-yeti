"use client";
import ImageUpload from "@/components/ImageUpload";
import Link from "next/link";
import { useState } from "react";
import {
  RECIPE_CATEGORIES,
  RECIPE_SUBCATEGORIES,
  RecipeCategory,
  RecipeSubCategory,
} from "../constants";

export default function ShareRecipe() {
  const [title, setTitle] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [category, setCategory] = useState<RecipeCategory>("Main Course");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [subCategory, setSubCategory] = useState<RecipeSubCategory | "">("");

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log({ title, cookTime, difficulty, category, ingredients, image });
  };

  const handleIngredientKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient(e);
    }
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
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
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
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
              value={category}
              onChange={(e) => setCategory(e.target.value as RecipeCategory)}
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
              value={subCategory}
              onChange={(e) =>
                setSubCategory(e.target.value as RecipeSubCategory)
              }
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a sub category</option>
              {RECIPE_SUBCATEGORIES[category].map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Image and Ingredients Section */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="ingredients"
              className="block text-sm font-medium mb-2"
            >
              Ingredients
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  id="ingredients"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  onKeyDown={handleIngredientKeyPress}
                  placeholder="Add an ingredient"
                  className="flex-1 p-2 border rounded-md"
                />
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Add
                </button>
              </div>

              <ul className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                  >
                    {ingredient}
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <ImageUpload
              onUploadSuccess={(publicId: string) => {
                console.log("Uploaded image public ID:", publicId);
                setImage(publicId);
              }}
            />
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
