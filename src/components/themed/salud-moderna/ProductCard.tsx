"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ProductBadgeRow } from "@/components/products/ProductBadges";

export default function ProductCardSaludModerna({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const disabled = product.stock <= 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-100">
      <Link href={`/producto/${product.slug}`} className="block aspect-square overflow-hidden bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <ProductBadgeRow product={product} />
        <Link href={`/producto/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-800 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-base font-bold text-slate-900">
            {formatCurrency(product.price)}
          </span>
          <button
            aria-label="Agregar al carrito"
            disabled={disabled}
            onClick={() => {
              addToCart(product.id, 1);
              showToast(`${product.name} agregado al carrito`);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
