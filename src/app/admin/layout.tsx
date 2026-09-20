"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Package,
  Boxes,
  Tags,
  ClipboardList,
  ArrowLeft,
  ShieldAlert,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/inventario", label: "Inventario", icon: Boxes },
  { href: "/admin/categorias", label: "Categorías", icon: Tags },
  { href: "/admin/pedidos", label: "Pedidos", icon: ClipboardList },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex items-center justify-between gap-3 bg-slate-900 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-amber-300 sm:px-6">
        <span className="flex items-center gap-1.5">
          <ShieldAlert size={14} /> Modo demostración — sin autenticación real
        </span>
        <Link href="/" className="flex items-center gap-1.5 text-slate-300 normal-case hover:text-white">
          <ArrowLeft size={13} /> Volver a la tienda
        </Link>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 md:flex-row">
        <aside className="shrink-0 md:w-56">
          <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                    active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
