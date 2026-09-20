import type { Product } from "@/types";
import { getProducts, saveProducts } from "@/lib/storage";
import { generateId, slugify } from "@/lib/utils";

export function listProducts(): Product[] {
  return getProducts();
}

export function listActiveProducts(): Product[] {
  return getProducts().filter((p) => p.active);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function getFeaturedProducts(limit = 6): Product[] {
  return listActiveProducts()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export type ProductInput = Omit<Product, "id" | "slug">;

export function createProduct(input: ProductInput): Product {
  const products = getProducts();
  const product: Product = {
    ...input,
    id: generateId("p"),
    slug: slugify(input.name),
  };
  saveProducts([...products, product]);
  return product;
}

export function updateProduct(id: string, input: ProductInput): Product | undefined {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  const updated: Product = {
    ...input,
    id,
    slug: slugify(input.name),
  };
  products[index] = updated;
  saveProducts(products);
  return updated;
}

export function updateStock(id: string, stock: number): Product | undefined {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  products[index] = { ...products[index], stock: Math.max(0, stock) };
  saveProducts(products);
  return products[index];
}

export function deleteProduct(id: string): void {
  const products = getProducts().filter((p) => p.id !== id);
  saveProducts(products);
}

export function searchProducts(
  query: string,
  categorySlugToId?: (slug: string) => string | undefined
): Product[] {
  const q = query.trim().toLowerCase();
  const products = listActiveProducts();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (categorySlugToId && p.categoryId === categorySlugToId(q))
  );
}
