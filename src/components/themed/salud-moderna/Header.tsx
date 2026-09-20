"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, Menu, X, Stethoscope, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Categorías" },
  { href: "/catalogo", label: "Productos" },
  { href: "/#promociones", label: "Promociones" },
];

export default function HeaderSaludModerna() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Stethoscope size={18} />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-slate-900">Salud Moderna</p>
            <p className="text-[11px] text-slate-400">Farmacia digital</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
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
            className="hidden rounded-full p-2 text-slate-500 transition hover:bg-slate-100 sm:flex"
          >
            <Search size={19} />
          </Link>
          <Link
            href="/carrito"
            aria-label="Ver carrito"
            className="relative rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <ShoppingCart size={19} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <Link
            href="/admin"
            className="hidden items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:border-blue-200 hover:text-blue-600 lg:flex"
          >
            <ShieldCheck size={14} /> Vista administrativa
          </Link>
          <button
            aria-label="Abrir menú"
            className="rounded-full p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/admin" className="text-sm font-semibold text-blue-600" onClick={() => setOpen(false)}>
              Vista administrativa
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
