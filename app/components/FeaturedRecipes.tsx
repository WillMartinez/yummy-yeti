"use client";

import { CldImage } from "next-cloudinary";
import Link from "next/link";

type Recipe = {
  id: number;
  title: string;
  cookTime: string;
  difficulty: string;
  imageID: string;
  category: string;
};

export default function FeaturedRecipes({ recipes }: { recipes: Recipe[] }) {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-6">Featured Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link
            href={`/recipes/${recipe.id}`}
            key={recipe.id}
            className="group"
          >
            <div className="border border-black/[.08] dark:border-white/[.145] rounded-lg overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-video relative bg-gray-100 dark:bg-gray-800">
                {recipe.imageID ? (
                  <CldImage
                    src={recipe.imageID}
                    alt={recipe.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image Available
                  </div>
                )}
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
  );
} 