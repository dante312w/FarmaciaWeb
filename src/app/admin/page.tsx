"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DollarSign, ClipboardList, Package, AlertTriangle } from "lucide-react";
import { initStorage } from "@/lib/storage";
import { listProducts } from "@/lib/products";
import { listOrders } from "@/lib/orders";
import { formatCurrency, formatDate, getStockState } from "@/lib/utils";
import type { Order, Product } from "@/types";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    initStorage();
    setProducts(listProducts());
    setOrders(listOrders());
  }, []);

  const totalVentas = orders
    .filter((o) => o.estado !== "Cancelado")
    .reduce((sum, o) => sum + o.total, 0);
  const stockBajo = products.filter((p) => getStockState(p.stock) !== "Disponible");

  const cards = [
    { label: "Ventas totales", value: formatCurrency(totalVentas), icon: DollarSign, color: "text-emerald-600 bg-emerald-50" },
    { label: "Pedidos", value: orders.length, icon: ClipboardList, color: "text-blue-600 bg-blue-50" },
    { label: "Productos", value: products.length, icon: Package, color: "text-indigo-600 bg-indigo-50" },
    { label: "Stock bajo / agotado", value: stockBajo.length, icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border border-slate-100 bg-white p-5">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
              <Icon size={18} />
            </span>
            <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-xs font-medium text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">
              Pedidos recientes
            </h2>
            <Link href="/admin/pedidos" className="text-xs font-semibold text-blue-600 hover:underline">
              Ver todos
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {orders.slice(0, 5).map((o) => (
              <li key={o.id} className="flex items-center justify-between py-2.5 text-sm">
                <div>
                  <p className="font-semibold text-slate-800">{o.numero}</p>
                  <p className="text-xs text-slate-400">{formatDate(o.fecha)}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-800">{formatCurrency(o.total)}</p>
                  <p className="text-xs text-slate-400">{o.estado}</p>
                </div>
              </li>
            ))}
            {orders.length === 0 && (
              <p className="py-4 text-sm text-slate-400">Aún no hay pedidos registrados.</p>
            )}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">
              Productos con stock bajo
            </h2>
            <Link href="/admin/inventario" className="text-xs font-semibold text-blue-600 hover:underline">
              Ver inventario
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {stockBajo.slice(0, 5).map((p) => (
              <li key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                <p className="line-clamp-1 font-medium text-slate-700">{p.name}</p>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    p.stock === 0 ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {p.stock} unidades
                </span>
              </li>
            ))}
            {stockBajo.length === 0 && (
              <p className="py-4 text-sm text-slate-400">Todo el inventario está en buen nivel.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
