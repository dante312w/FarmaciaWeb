"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import SiteChrome from "@/components/layout/SiteChrome";
import DemoBadge from "@/components/ui/DemoBadge";
import { useTheme, THEME_INFO } from "@/context/ThemeContext";
import { getThemeComponents } from "@/components/themed";
import { listCategories } from "@/lib/categories";
import { getFeaturedProducts } from "@/lib/products";
import type { Category, Product, Theme } from "@/types";
import { initStorage } from "@/lib/storage";

const THEMES: Theme[] = ["salud-moderna", "farmacia-cercana", "pharma-premium"];

function ThemePickerScreen({ onSelect }: { onSelect: (t: Theme) => void }) {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl text-center">
        <span className="inline-block rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
          Prototipo demo
        </span>
        <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
          Elige la propuesta visual
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
          Selecciona el diseño que más se adapte a la identidad de tu negocio.
          Podrás cambiar de propuesta en cualquier momento desde la parte
          superior de la aplicación.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => onSelect(t)}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-video w-full overflow-hidden bg-slate-100">
                <img
                  src={`https://picsum.photos/seed/${t}-preview/600/338`}
                  alt={THEME_INFO[t].name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="text-base font-bold text-slate-900">{THEME_INFO[t].name}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  {THEME_INFO[t].tagline}
                </p>
                <p className="text-sm text-slate-500">{THEME_INFO[t].description}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                  Explorar propuesta →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { theme, setTheme, ready } = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [hasChosen, setHasChosen] = useState(false);

  useEffect(() => {
    initStorage();
    setCategories(listCategories());
    setFeatured(getFeaturedProducts(6));
    setHasChosen(Boolean(localStorage.getItem("farmacia_theme")));
  }, []);

  if (!ready) return <div className="min-h-screen bg-white" />;

  if (!hasChosen) {
    return (
      <ThemePickerScreen
        onSelect={(t) => {
          setTheme(t);
          setHasChosen(true);
        }}
      />
    );
  }

  const { Hero, CategoryCard, ProductCard } = getThemeComponents(theme);

  return (
    <SiteChrome>
      <DemoBadge />
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Categorías</h2>
            <p className="mt-1 text-sm text-slate-500">
              Encuentra rápidamente lo que necesitas
            </p>
          </div>
          <Link href="/catalogo" className="text-sm font-semibold text-blue-600 hover:underline">
            Ver todo
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      <section id="promociones" className="bg-slate-50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Productos destacados</h2>
              <p className="mt-1 text-sm text-slate-500">
                Selección de productos con mejor rotación
              </p>
            </div>
            <Link href="/catalogo" className="text-sm font-semibold text-blue-600 hover:underline">
              Ver catálogo completo
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
          <Check size={14} /> Puedes cambiar de propuesta visual en cualquier momento
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Usa el selector "Diseño" en la parte superior para comparar
          las 3 propuestas con los mismos datos y flujo de compra.
        </p>
      </section>
    </SiteChrome>
  );
}
