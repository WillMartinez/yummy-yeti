import { prisma } from "@/lib/db";

export async function getFeaturedRecipes() {
  return prisma.recipe.findMany({
    take: 3,
    where: {
      featured: true,
    },
    select: {
      id: true,
      title: true,
      cookTime: true,
      difficulty: true,
      imageID: true,
      category: true,
    },
  });
}
