"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  addToCart as addToCartService,
  clearCart as clearCartService,
  getCartCount,
  getCartLines,
  removeFromCart as removeFromCartService,
  updateCartQuantity as updateCartQuantityService,
  type CartLine,
} from "@/lib/cart";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  refresh: () => void;
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue>({
  lines: [],
  count: 0,
  refresh: () => {},
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [count, setCount] = useState(0);

  const refresh = useCallback(() => {
    setLines(getCartLines());
    setCount(getCartCount());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addToCart = useCallback(
    (productId: string, quantity = 1) => {
      addToCartService(productId, quantity);
      refresh();
    },
    [refresh]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      updateCartQuantityService(productId, quantity);
      refresh();
    },
    [refresh]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      removeFromCartService(productId);
      refresh();
    },
    [refresh]
  );

  const clearCart = useCallback(() => {
    clearCartService();
    refresh();
  }, [refresh]);

  return (
    <CartContext.Provider
      value={{ lines, count, refresh, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
