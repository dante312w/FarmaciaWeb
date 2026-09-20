import type { Category, Product, CartItem, Order } from "@/types";
import initialProducts from "@/data/products.json";
import initialCategories from "@/data/categories.json";
import { buildDemoOrders } from "@/lib/seed";

const KEYS = {
  products: "farmacia_products",
  categories: "farmacia_categories",
  cart: "farmacia_cart",
  orders: "farmacia_orders",
  theme: "farmacia_theme",
} as const;

function isBrowser() {
  return typeof window !== "undefined";
}

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // almacenamiento no disponible, se ignora en el prototipo
  }
}

export function initStorage(): void {
  if (!isBrowser()) return;
  if (!window.localStorage.getItem(KEYS.products)) {
    write<Product[]>(KEYS.products, initialProducts as Product[]);
  }
  if (!window.localStorage.getItem(KEYS.categories)) {
    write<Category[]>(KEYS.categories, initialCategories as Category[]);
  }
  if (!window.localStorage.getItem(KEYS.cart)) {
    write<CartItem[]>(KEYS.cart, []);
  }
  if (!window.localStorage.getItem(KEYS.orders)) {
    write<Order[]>(KEYS.orders, buildDemoOrders(initialProducts as Product[]));
  }
}

// Productos
export function getProducts(): Product[] {
  return read<Product[]>(KEYS.products, initialProducts as Product[]);
}
export function saveProducts(products: Product[]): void {
  write(KEYS.products, products);
}

// Categorías
export function getCategories(): Category[] {
  return read<Category[]>(KEYS.categories, initialCategories as Category[]);
}
export function saveCategories(categories: Category[]): void {
  write(KEYS.categories, categories);
}

// Carrito
export function getCart(): CartItem[] {
  return read<CartItem[]>(KEYS.cart, []);
}
export function saveCart(cart: CartItem[]): void {
  write(KEYS.cart, cart);
}

// Pedidos
export function getOrders(): Order[] {
  return read<Order[]>(KEYS.orders, []);
}
export function saveOrders(orders: Order[]): void {
  write(KEYS.orders, orders);
}

// Tema / propuesta visual activa
export function getStoredTheme(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(KEYS.theme);
}
export function saveTheme(theme: string): void {
  write(KEYS.theme, theme);
}

export function resetDemoData(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(KEYS.products);
  window.localStorage.removeItem(KEYS.categories);
  window.localStorage.removeItem(KEYS.cart);
  window.localStorage.removeItem(KEYS.orders);
  initStorage();
}
