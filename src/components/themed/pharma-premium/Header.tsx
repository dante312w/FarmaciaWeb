"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, Menu, X, LockKeyhole } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Categorías" },
  { href: "/catalogo", label: "Productos" },
  { href: "/#promociones", label: "Ediciones" },
];

export default function HeaderPharmaPremium() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold uppercase tracking-[0.2em] text-white">
            PHARMA
          </span>
          <span className="text-lg font-light uppercase tracking-[0.2em] text-amber-400">
            PREMIUM
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-medium uppercase tracking-widest text-neutral-300 transition hover:text-amber-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <Link
            href="/catalogo"
            aria-label="Buscar productos"
            className="hidden text-neutral-300 transition hover:text-amber-400 sm:flex"
          >
            <Search size={18} />
          </Link>
          <Link href="/carrito" aria-label="Ver carrito" className="relative text-neutral-300 transition hover:text-amber-400">
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-neutral-950">
                {count}
              </span>
            )}
          </Link>
          <Link
            href="/admin"
            className="hidden items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-neutral-400 transition hover:text-amber-400 lg:flex"
          >
            <LockKeyhole size={13} /> Admin
          </Link>
          <button
            aria-label="Abrir menú"
            className="text-neutral-200 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-neutral-950 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-medium uppercase tracking-widest text-neutral-300"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="text-xs font-medium uppercase tracking-widest text-amber-400"
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
