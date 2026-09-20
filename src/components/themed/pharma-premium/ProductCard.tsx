"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ProductBadgeRow } from "@/components/products/ProductBadges";

export default function ProductCardPharmaPremium({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const disabled = product.stock <= 0;

  return (
    <div className="group flex flex-col">
      <Link href={`/producto/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          aria-label="Agregar al carrito"
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            addToCart(product.id, 1);
            showToast(`${product.name} añadido a tu selección`);
          }}
          className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center bg-neutral-950 text-amber-400 opacity-0 shadow-lg transition group-hover:translate-y-0 group-hover:opacity-100 disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          <Plus size={16} />
        </button>
      </Link>
      <div className="mt-3 flex flex-col gap-1.5">
        <ProductBadgeRow product={product} />
        <Link href={`/producto/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-medium text-neutral-900 hover:text-amber-600">
            {product.name}
          </h3>
        </Link>
        <span className="text-sm font-semibold text-neutral-500">
          {formatCurrency(product.price)}
        </span>
      </div>
    </div>
  );
}
