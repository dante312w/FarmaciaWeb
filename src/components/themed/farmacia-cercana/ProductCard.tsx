"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ProductBadgeRow } from "@/components/products/ProductBadges";

export default function ProductCardFarmaciaCercana({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const disabled = product.stock <= 0;

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-orange-100 transition hover:shadow-md">
      <Link href={`/producto/${product.slug}`} className="relative block aspect-square overflow-hidden bg-orange-50">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        <div className="absolute left-2 top-2">
          <ProductBadgeRow product={product} />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/producto/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-bold text-orange-950 hover:text-orange-600">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-base font-extrabold text-orange-600">
            {formatCurrency(product.price)}
          </span>
          <button
            aria-label="Agregar al carrito"
            disabled={disabled}
            onClick={() => {
              addToCart(product.id, 1);
              showToast(`¡${product.name} agregado! 🛍️`);
            }}
            className="flex items-center gap-1.5 rounded-full bg-orange-500 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-100 disabled:text-orange-300"
          >
            <ShoppingBag size={14} /> Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
