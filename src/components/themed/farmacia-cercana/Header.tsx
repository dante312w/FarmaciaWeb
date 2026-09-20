"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, Menu, X, Heart, Settings } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Categorías" },
  { href: "/catalogo", label: "Productos" },
  { href: "/#promociones", label: "🔥 Promos" },
];

export default function HeaderFarmaciaCercana() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-orange-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-sm shadow-orange-200">
            <Heart size={18} fill="white" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-extrabold text-orange-900">Farmacia Cercana</p>
            <p className="text-[11px] text-orange-400">Tu farmacia de siempre</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm font-semibold text-orange-900/80 transition hover:bg-orange-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <Link
            href="/catalogo"
            aria-label="Buscar productos"
            className="hidden rounded-full bg-white p-2.5 text-orange-500 shadow-sm sm:flex"
          >
            <Search size={18} />
          </Link>
          <Link
            href="/carrito"
            aria-label="Ver carrito"
            className="relative rounded-full bg-white p-2.5 text-orange-500 shadow-sm"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <Link
            href="/admin"
            className="hidden items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-bold text-orange-500 shadow-sm lg:flex"
          >
            <Settings size={14} /> Admin
          </Link>
          <button
            aria-label="Abrir menú"
            className="rounded-full bg-white p-2.5 text-orange-600 shadow-sm md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="bg-orange-50 px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-orange-900"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Vista administrativa
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
