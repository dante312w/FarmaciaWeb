import type { CartItem, Product } from "@/types";
import { getCart, saveCart } from "@/lib/storage";
import { getProductById } from "@/lib/products";

export function listCart(): CartItem[] {
  return getCart();
}

export interface CartLine {
  product: Product;
  quantity: number;
  lineTotal: number;
}

export function getCartLines(): CartLine[] {
  return getCart()
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return {
        product,
        quantity: item.quantity,
        lineTotal: product.price * item.quantity,
      };
    })
    .filter((line): line is CartLine => line !== null);
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function addToCart(productId: string, quantity = 1): CartItem[] {
  const cart = getCart();
  const existing = cart.find((item) => item.productId === productId);
  let updated: CartItem[];
  if (existing) {
    updated = cart.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  } else {
    updated = [...cart, { productId, quantity }];
  }
  saveCart(updated);
  return updated;
}

export function updateCartQuantity(productId: string, quantity: number): CartItem[] {
  const cart = getCart();
  let updated: CartItem[];
  if (quantity <= 0) {
    updated = cart.filter((item) => item.productId !== productId);
  } else {
    updated = cart.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
  }
  saveCart(updated);
  return updated;
}

export function removeFromCart(productId: string): CartItem[] {
  const updated = getCart().filter((item) => item.productId !== productId);
  saveCart(updated);
  return updated;
}

export function clearCart(): void {
  saveCart([]);
}

export function getSubtotal(): number {
  return getCartLines().reduce((sum, line) => sum + line.lineTotal, 0);
}

export const SHIPPING_COST = 8000;
export const FREE_SHIPPING_THRESHOLD = 150000;

export function getShippingCost(): number {
  const subtotal = getSubtotal();
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

export function getCartTotal(): number {
  return getSubtotal() + getShippingCost();
}

export function cartHasPrescriptionItems(): boolean {
  return getCartLines().some((line) => line.product.requiresPrescription);
}
