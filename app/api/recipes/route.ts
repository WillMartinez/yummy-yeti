import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received body:", body);

    const recipeData = {
      title: body.title,
      description: body.description,
      difficulty: body.difficulty,
      category: body.category,
      subCategory: body.subCategory,
      ingredients: body.ingredients || [],
      instructions: body.instructions || [],
      prepTime: body.prepTime,
      cookTime: body.cookTime,
      servings: body.servings || 1,
      imageID: body.imageID || null,
    };

    console.log("Attempting to create recipe with:", recipeData);

    const recipe = await prisma.recipe.create({
      data: recipeData,
    });

    return NextResponse.json(recipe);
  } catch (error: unknown) {
    console.error("Failed to create recipe. Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      name: error instanceof Error ? error.name : "Unknown error",
      stack: error instanceof Error ? error.stack : "Unknown error",
    });
    return NextResponse.json(
      {
        error: "Failed to create recipe",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
