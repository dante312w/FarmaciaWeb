"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartLine } from "@/lib/cart";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function CartLineItemFarmaciaCercana({ line }: { line: CartLine }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, lineTotal } = line;

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-orange-100">
      <Link href={`/producto/${product.slug}`} className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-orange-50">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </Link>
      <div className="min-w-0 flex-1">
        <Link href={`/producto/${product.slug}`} className="line-clamp-2 text-sm font-bold text-orange-950 hover:text-orange-600">
          {product.name}
        </Link>
        <p className="mt-1 text-xs text-orange-400">{formatCurrency(product.price)} c/u</p>
      </div>
      <div className="flex items-center gap-2 rounded-full bg-orange-50 px-2 py-1">
        <button
          aria-label="Disminuir cantidad"
          onClick={() => updateQuantity(product.id, quantity - 1)}
          className="rounded-full p-1 text-orange-500 hover:bg-orange-100"
        >
          <Minus size={13} />
        </button>
        <span className="w-5 text-center text-sm font-bold text-orange-900">{quantity}</span>
        <button
          aria-label="Aumentar cantidad"
          onClick={() => quantity < product.stock && updateQuantity(product.id, quantity + 1)}
          className="rounded-full p-1 text-orange-500 hover:bg-orange-100 disabled:opacity-30"
          disabled={quantity >= product.stock}
        >
          <Plus size={13} />
        </button>
      </div>
      <div className="w-24 text-right text-sm font-extrabold text-orange-600">{formatCurrency(lineTotal)}</div>
      <button
        aria-label="Eliminar producto"
        onClick={() => removeFromCart(product.id)}
        className="rounded-full p-2 text-orange-300 hover:bg-red-50 hover:text-red-500"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
