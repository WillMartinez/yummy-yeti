"use client";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { RECIPE_CATEGORIES } from "./constants";

export default function Home() {
  // You could fetch this from an API later
  const featuredRecipes = [
    {
      id: 1,
      title: "Homemade Pizza",
      cookTime: "30 mins",
      difficulty: "Medium",
      imageId: "pizza_pzkqcv", // Changed from "samples/food/pizza"
      category: RECIPE_CATEGORIES[0],
    },
    {
      id: 2,
      title: "Shrimp Pasta",
      cookTime: "30 mins",
      difficulty: "Medium",
      imageId: "p8cf7mh9xj82ijnqijiw", // Add your image
      category: RECIPE_CATEGORIES[1],
    },
    {
      id: 3,
      title: "Pumpkin Pie",
      cookTime: "45 mins",
      difficulty: "Medium",
      imageId: "oocyvdiqmyscxz8yafdf", // Add your image
      category: RECIPE_CATEGORIES[2],
    },
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-6xl">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Martinez Meal Menu
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Find and share the best recipes from the Martinez Mi Familia
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/recipes"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              Browse Recipes
            </Link>
            <Link
              href="/create"
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              Add Recipe
            </Link>
          </div>
        </section>

        {/* Featured Recipes */}
        <section className="w-full">
          <h2 className="text-2xl font-bold mb-6">Featured Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <Link
                href={`/recipes/${recipe.id}`}
                key={recipe.id}
                className="group"
              >
                <div className="border border-black/[.08] dark:border-white/[.145] rounded-lg overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-video relative bg-gray-100 dark:bg-gray-800">
                    {/* Add actual images later */}
                    {/* <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      [Recipe Image]
                    </div> */}
                    <CldImage
                      src={recipe.imageId}
                      alt={recipe.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold group-hover:text-blue-500 transition-colors">
                      {recipe.title}
                    </h3>
                    <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>⏱ {recipe.cookTime}</span>
                      <span>📊 {recipe.difficulty}</span>
                      <span>🏷️ {recipe.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="w-full">
          <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {RECIPE_CATEGORIES.map((category) => (
              <Link
                href={`/category/${category.toLowerCase()}`}
                key={category}
                className="p-4 text-center border border-black/[.08] dark:border-white/[.145] rounded-lg hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
