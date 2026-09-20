"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import type { CartLine } from "@/lib/cart";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function CartLineItemPharmaPremium({ line }: { line: CartLine }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, lineTotal } = line;

  return (
    <div className="flex items-center gap-5 border-b border-neutral-200 py-5 last:border-none">
      <Link href={`/producto/${product.slug}`} className="h-20 w-20 shrink-0 overflow-hidden bg-neutral-100">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </Link>
      <div className="min-w-0 flex-1">
        <Link href={`/producto/${product.slug}`} className="line-clamp-2 text-sm font-medium text-neutral-900 hover:text-amber-600">
          {product.name}
        </Link>
        <p className="mt-1 text-xs text-neutral-400">{formatCurrency(product.price)} / unidad</p>
      </div>
      <div className="flex items-center gap-3 border border-neutral-200 px-2 py-1.5">
        <button
          aria-label="Disminuir cantidad"
          onClick={() => updateQuantity(product.id, quantity - 1)}
          className="text-neutral-500 hover:text-amber-600"
        >
          <Minus size={13} />
        </button>
        <span className="w-5 text-center text-sm text-neutral-800">{quantity}</span>
        <button
          aria-label="Aumentar cantidad"
          onClick={() => quantity < product.stock && updateQuantity(product.id, quantity + 1)}
          className="text-neutral-500 hover:text-amber-600 disabled:opacity-30"
          disabled={quantity >= product.stock}
        >
          <Plus size={13} />
        </button>
      </div>
      <div className="w-24 text-right text-sm font-semibold text-neutral-900">{formatCurrency(lineTotal)}</div>
      <button
        aria-label="Eliminar producto"
        onClick={() => removeFromCart(product.id)}
        className="text-neutral-300 hover:text-red-500"
      >
        <X size={18} />
      </button>
    </div>
  );
}
