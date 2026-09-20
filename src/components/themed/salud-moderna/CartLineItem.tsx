"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartLine } from "@/lib/cart";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function CartLineItemSaludModerna({ line }: { line: CartLine }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, lineTotal } = line;

  return (
    <div className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-none">
      <Link href={`/producto/${product.slug}`} className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-50">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </Link>
      <div className="min-w-0 flex-1">
        <Link href={`/producto/${product.slug}`} className="line-clamp-2 text-sm font-semibold text-slate-800 hover:text-blue-600">
          {product.name}
        </Link>
        <p className="mt-1 text-xs text-slate-400">{formatCurrency(product.price)} c/u</p>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-slate-200 px-2 py-1">
        <button
          aria-label="Disminuir cantidad"
          onClick={() => updateQuantity(product.id, quantity - 1)}
          className="rounded-full p-1 text-slate-500 hover:bg-slate-100"
        >
          <Minus size={13} />
        </button>
        <span className="w-5 text-center text-sm font-medium text-slate-700">{quantity}</span>
        <button
          aria-label="Aumentar cantidad"
          onClick={() => quantity < product.stock && updateQuantity(product.id, quantity + 1)}
          className="rounded-full p-1 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
          disabled={quantity >= product.stock}
        >
          <Plus size={13} />
        </button>
      </div>
      <div className="w-24 text-right text-sm font-bold text-slate-900">{formatCurrency(lineTotal)}</div>
      <button
        aria-label="Eliminar producto"
        onClick={() => removeFromCart(product.id)}
        className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
