"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Minus, Plus, ShoppingCart, FileWarning, ChevronRight } from "lucide-react";
import SiteChrome from "@/components/layout/SiteChrome";
import DemoBadge from "@/components/ui/DemoBadge";
import { useTheme } from "@/context/ThemeContext";
import { getThemeComponents } from "@/components/themed";
import { getProductBySlug, listActiveProducts } from "@/lib/products";
import { getCategoryById } from "@/lib/categories";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatCurrency, getStockState } from "@/lib/utils";
import { initStorage } from "@/lib/storage";
import type { Category, Product } from "@/types";
import { ProductBadgeRow } from "@/components/products/ProductBadges";

export default function ProductoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { theme } = useTheme();
  const { ProductCard } = getThemeComponents(theme);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [related, setRelated] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    initStorage();
    const p = getProductBySlug(slug);
    setProduct(p || null);
    if (p) {
      const cat = getCategoryById(p.categoryId);
      setCategory(cat);
    }
  }, [slug]);

  useEffect(() => {
    if (product) {
      setRelated(
        listActiveProducts()
          .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
          .slice(0, 4)
      );
    }
  }, [product]);

  if (product === undefined) return <div className="min-h-screen bg-white" />;
  if (product === null) return notFound();

  const stockState = getStockState(product.stock);
  const disabled = product.stock <= 0;

  return (
    <SiteChrome>
      <DemoBadge />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-600">Inicio</Link>
          <ChevronRight size={12} />
          <Link href="/catalogo" className="hover:text-slate-600">Catálogo</Link>
          {category && (
            <>
              <ChevronRight size={12} />
              <Link href={`/catalogo?categoria=${category.slug}`} className="hover:text-slate-600">
                {category.name}
              </Link>
            </>
          )}
        </nav>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-2xl bg-slate-50">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>

          <div>
            <ProductBadgeRow product={product} />
            <h1 className="mt-3 text-2xl font-bold text-slate-900">{product.name}</h1>
            {category && (
              <p className="mt-1 text-sm text-slate-400">Categoría: {category.name}</p>
            )}
            <p className="mt-4 text-3xl font-extrabold text-slate-900">
              {formatCurrency(product.price)}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{product.description}</p>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Disponibilidad:{" "}
              <span
                className={
                  stockState === "Disponible"
                    ? "text-emerald-600"
                    : stockState === "Stock bajo"
                      ? "text-amber-600"
                      : "text-red-600"
                }
              >
                {stockState}
                {stockState !== "Agotado" && ` (${product.stock} unidades)`}
              </span>
            </p>

            {product.requiresPrescription && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-violet-50 p-3 text-xs text-violet-700">
                <FileWarning size={16} className="mt-0.5 shrink-0" />
                <p>
                  Este producto requiere fórmula médica. En el prototipo no se
                  valida ni almacena ningún documento; este flujo es solo
                  demostrativo.
                </p>
              </div>
            )}

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-full border border-slate-200 px-3 py-2">
                <button
                  aria-label="Disminuir cantidad"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-slate-500 hover:text-slate-800"
                >
                  <Minus size={15} />
                </button>
                <span className="w-6 text-center text-sm font-semibold text-slate-800">
                  {quantity}
                </span>
                <button
                  aria-label="Aumentar cantidad"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="text-slate-500 hover:text-slate-800 disabled:opacity-30"
                  disabled={quantity >= product.stock}
                >
                  <Plus size={15} />
                </button>
              </div>
              <button
                disabled={disabled}
                onClick={() => {
                  addToCart(product.id, quantity);
                  showToast(`${product.name} agregado al carrito`);
                  setQuantity(1);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                <ShoppingCart size={16} />
                {disabled ? "Producto agotado" : "Agregar al carrito"}
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-xl font-bold text-slate-900">Productos relacionados</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </SiteChrome>
  );
}
