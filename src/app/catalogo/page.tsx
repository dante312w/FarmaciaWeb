"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import SiteChrome from "@/components/layout/SiteChrome";
import DemoBadge from "@/components/ui/DemoBadge";
import { useTheme } from "@/context/ThemeContext";
import { getThemeComponents } from "@/components/themed";
import { listActiveProducts } from "@/lib/products";
import { listCategories } from "@/lib/categories";
import { initStorage } from "@/lib/storage";
import type { Category, Product } from "@/types";

function CatalogoContent() {
  const { theme } = useTheme();
  const { ProductCard } = getThemeComponents(theme);
  const params = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState(params.get("buscar") || "");
  const [categoria, setCategoria] = useState(params.get("categoria") || "");
  const [maxPrice, setMaxPrice] = useState(200000);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    initStorage();
    setProducts(listActiveProducts());
    setCategories(listCategories());
  }, []);

  useEffect(() => {
    const cat = params.get("categoria");
    if (cat) setCategoria(cat);
  }, [params]);

  function updateCategoria(slug: string) {
    setCategoria(slug);
    const usp = new URLSearchParams(Array.from(params.entries()));
    if (slug) usp.set("categoria", slug);
    else usp.delete("categoria");
    router.replace(`/catalogo?${usp.toString()}`);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const catObj = categories.find((c) => c.slug === categoria);
    return products.filter((p) => {
      if (catObj && p.categoryId !== catObj.id) return false;
      if (q && !`${p.name} ${p.description}`.toLowerCase().includes(q)) return false;
      if (p.price > maxPrice) return false;
      if (onlyAvailable && p.stock <= 0) return false;
      if (onlyFeatured && !p.featured) return false;
      return true;
    });
  }, [products, categories, categoria, query, maxPrice, onlyAvailable, onlyFeatured]);

  const activeCategory = categories.find((c) => c.slug === categoria);

  return (
    <SiteChrome>
      <DemoBadge />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {activeCategory ? activeCategory.name : "Catálogo de productos"}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {filtered.length} producto{filtered.length !== 1 && "s"} encontrado
              {filtered.length !== 1 && "s"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-72">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full rounded-full border border-slate-200 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-blue-400"
                aria-label="Buscar productos"
              />
            </div>
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:border-slate-300 md:hidden"
            >
              <SlidersHorizontal size={15} /> Filtros
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
          <aside className={`${showFilters ? "block" : "hidden"} md:block`}>
            <div className="space-y-6 rounded-2xl border border-slate-100 p-4">
              <div className="flex items-center justify-between md:hidden">
                <p className="text-sm font-bold text-slate-800">Filtros</p>
                <button onClick={() => setShowFilters(false)} aria-label="Cerrar filtros">
                  <X size={16} />
                </button>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                  Categoría
                </p>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => updateCategoria("")}
                    className={`rounded-lg px-2.5 py-1.5 text-left text-sm ${
                      !categoria ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Todas
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => updateCategoria(c.slug)}
                      className={`rounded-lg px-2.5 py-1.5 text-left text-sm ${
                        categoria === c.slug
                          ? "bg-blue-50 font-semibold text-blue-700"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                  Precio máximo
                </p>
                <input
                  type="range"
                  min={5000}
                  max={200000}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Hasta {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(maxPrice)}
                </p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={onlyAvailable}
                    onChange={(e) => setOnlyAvailable(e.target.checked)}
                    className="accent-blue-600"
                  />
                  Solo disponibles
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={onlyFeatured}
                    onChange={(e) => setOnlyFeatured(e.target.checked)}
                    className="accent-blue-600"
                  />
                  Solo destacados
                </label>
              </div>
            </div>
          </aside>

          <div>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-20 text-center">
                <p className="text-sm font-semibold text-slate-600">
                  No encontramos productos con esos filtros
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Intenta ajustar la búsqueda o quitar algunos filtros
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteChrome>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <CatalogoContent />
    </Suspense>
  );
}
