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
  RECIPE_UNITS,
} from "../constants";
import TimeSelector from "@/components/TimeSelector";

export default function ShareRecipe() {
  const [formData, setFormData] = useState<CreateRecipeInput>({
    title: "",
    description: "",
    difficulty: "EASY",
    category: "Main Course",
    subCategory: "",
    ingredients: [],
    instructions: [],
    prepTime: 0,
    cookTime: 0,
    imageID: "",
    servings: 0,
  });

  const [currentIngredient, setCurrentIngredient] = useState({
    item: "",
    amount: "",
    unit: "",
  });

  const [currentInstruction, setCurrentInstruction] = useState('');

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
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        {/* Categories Section */}
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <label
              htmlFor="servings"
              className="block text-sm font-medium mb-2"
            >
              Servings
            </label>
            <select
              id="servings"
              value={formData.servings}
              onChange={(e) => setFormData({...formData, servings: parseInt(e.target.value)})}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="0">Select servings</option>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'serving' : 'servings'}
                </option>
              ))}
            </select>
          </div>
          <TimeSelector
            id="cookTime"
            label="Cooking Time"
            value={formData.cookTime}
            onChange={(value) => setFormData({ ...formData, cookTime: value })}
          />
          <TimeSelector
            id="prepTime"
            label="Prep Time"
            value={formData.prepTime}
            onChange={(value) => setFormData({ ...formData, prepTime: value })}
          />
          <div>
            <label className="block text-sm font-medium mb-2">Difficulty</label>
            <select
              id="difficulty"
              value={formData.difficulty}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  difficulty: e.target.value as "EASY" | "MEDIUM" | "HARD",
                })
              }
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
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as RecipeCategory,
                })
              }
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
                setFormData({
                  ...formData,
                  subCategory: e.target.value as RecipeSubCategory,
                })
              }
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a sub category</option>
              {RECIPE_SUBCATEGORIES[formData.category]?.map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ingredients and Instructions Section */}
        <div className="space-y-8">
          <div>
            <ImageUpload
              onUploadSuccess={(publicId: string) => {
                console.log("Uploaded image public ID:", publicId);
                setFormData({ ...formData, imageID: publicId });
              }}
            />
          </div>

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
                  id="ingredientItem"
                  value={currentIngredient.item}
                  onChange={(e) =>
                    setCurrentIngredient({
                      ...currentIngredient,
                      item: e.target.value,
                    })
                  }
                  placeholder="Ingredient name"
                  className="flex-1 p-2 border rounded-md"
                />
                <select
                  id="ingredientAmount"
                  value={currentIngredient.amount}
                  onChange={(e) =>
                    setCurrentIngredient({
                      ...currentIngredient,
                      amount: e.target.value,
                    })
                  }
                  className="w-24 p-2 border rounded-md"
                  required
                >
                  <option value="">Amount</option>
                  {/* Fractions */}
                  <option value="0.125">1/8</option>
                  <option value="0.25">1/4</option>
                  <option value="0.33">1/3</option>
                  <option value="0.5">1/2</option>
                  <option value="0.66">2/3</option>
                  <option value="0.75">3/4</option>
                  {/* Whole numbers */}
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  id="ingredientUnit"
                  value={currentIngredient.unit}
                  onChange={(e) =>
                    setCurrentIngredient({
                      ...currentIngredient,
                      unit: e.target.value,
                    })
                  }
                  className="w-24 p-2 border rounded-md"
                  required
                >
                  <option value="">Unit</option>
                  <optgroup label="Volume">
                    {RECIPE_UNITS.volume.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Weight">
                    {RECIPE_UNITS.weight.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Other">
                    {RECIPE_UNITS.other.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </optgroup>
                </select>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      currentIngredient.item &&
                      currentIngredient.amount &&
                      currentIngredient.unit
                    ) {
                      setFormData({
                        ...formData,
                        ingredients: [
                          ...formData.ingredients,
                          {
                            item: currentIngredient.item,
                            amount: Number(currentIngredient.amount),
                            unit: currentIngredient.unit,
                          },
                        ],
                      });
                      setCurrentIngredient({ item: "", amount: "", unit: "" });
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
                    <span>
                      {ingredient.amount} {ingredient.amount > 1 ? `${ingredient.unit}s` : ingredient.unit} {ingredient.item}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newIngredients = formData.ingredients.filter(
                          (_, i) => i !== index
                        );
                        setFormData({
                          ...formData,
                          ingredients: newIngredients,
                        });
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

          <div>
            <label
              htmlFor="instructions"
              className="block text-sm font-medium mb-2"
            >
              Instructions
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a step to your recipe..."
                  value={currentInstruction || ''}
                  onChange={(e) => setCurrentInstruction(e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (currentInstruction?.trim()) {
                      setFormData({
                        ...formData,
                        instructions: [...formData.instructions, currentInstruction.trim()]
                      });
                      setCurrentInstruction('');
                    }
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Add Step
                </button>
              </div>

              <ul className="space-y-2">
                {formData.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                  >
                    <span className="flex-1">
                      <span className="font-medium mr-2">Step {index + 1}:</span>
                      {instruction}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newInstructions = formData.instructions.filter(
                          (_, i) => i !== index
                        );
                        setFormData({
                          ...formData,
                          instructions: newInstructions,
                        });
                      }}
                      className="text-red-500 hover:text-red-600 ml-2"
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
