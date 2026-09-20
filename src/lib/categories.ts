import type { Category } from "@/types";
import { getCategories, saveCategories, getProducts } from "@/lib/storage";
import { generateId, slugify } from "@/lib/utils";

export function listCategories(): Category[] {
  return getCategories();
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategories().find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return getCategories().find((c) => c.id === id);
}

export type CategoryInput = Omit<Category, "id" | "slug">;

export function createCategory(input: CategoryInput): Category {
  const categories = getCategories();
  const category: Category = {
    ...input,
    id: generateId("cat"),
    slug: slugify(input.name),
  };
  saveCategories([...categories, category]);
  return category;
}

export function updateCategory(id: string, input: CategoryInput): Category | undefined {
  const categories = getCategories();
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return undefined;
  const updated: Category = { ...input, id, slug: slugify(input.name) };
  categories[index] = updated;
  saveCategories(categories);
  return updated;
}

export function categoryHasProducts(id: string): boolean {
  return getProducts().some((p) => p.categoryId === id);
}

export function deleteCategory(id: string): { success: boolean; reason?: string } {
  if (categoryHasProducts(id)) {
    return {
      success: false,
      reason:
        "No se puede eliminar esta categoría porque tiene productos asociados. Reasigna o elimina esos productos primero.",
    };
  }
  const categories = getCategories().filter((c) => c.id !== id);
  saveCategories(categories);
  return { success: true };
}
