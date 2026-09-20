"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Search } from "lucide-react";
import { initStorage } from "@/lib/storage";
import { listProducts, updateStock } from "@/lib/products";
import { getStockState } from "@/lib/utils";
import type { Product, StockState } from "@/types";
import { useToast } from "@/context/ToastContext";

const STATE_STYLES: Record<StockState, string> = {
  Disponible: "bg-emerald-100 text-emerald-700",
  "Stock bajo": "bg-amber-100 text-amber-700",
  Agotado: "bg-red-100 text-red-700",
};

export default function AdminInventarioPage() {
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  function refresh() {
    setProducts(listProducts());
  }

  useEffect(() => {
    initStorage();
    refresh();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  function applyStock(id: string, newStock: number) {
    updateStock(id, newStock);
    refresh();
    showToast("Inventario actualizado");
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Inventario</h1>

      <div className="relative mb-4 max-w-sm">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar producto..."
          className="w-full rounded-full border border-slate-200 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-blue-400"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="border-b border-slate-100 text-xs font-bold uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((p) => {
              const state = getStockState(p.stock);
              const draft = drafts[p.id];
              return (
                <tr key={p.id}>
                  <td className="flex items-center gap-3 px-4 py-3">
                    <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                    <span className="line-clamp-1 max-w-[240px] font-medium text-slate-800">{p.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        aria-label="Disminuir stock"
                        onClick={() => applyStock(p.id, Math.max(0, p.stock - 1))}
                        className="rounded-full border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-100"
                      >
                        <Minus size={13} />
                      </button>
                      <input
                        type="number"
                        min={0}
                        value={draft ?? p.stock}
                        onChange={(e) =>
                          setDrafts((prev) => ({ ...prev, [p.id]: e.target.value }))
                        }
                        onBlur={() => {
                          const value = Number(draft);
                          if (draft !== undefined && !Number.isNaN(value)) {
                            applyStock(p.id, value);
                          }
                          setDrafts((prev) => {
                            const next = { ...prev };
                            delete next[p.id];
                            return next;
                          });
                        }}
                        className="w-16 rounded-lg border border-slate-200 px-2 py-1.5 text-center text-sm outline-none focus:border-blue-400"
                      />
                      <button
                        aria-label="Aumentar stock"
                        onClick={() => applyStock(p.id, p.stock + 1)}
                        className="rounded-full border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-100"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${STATE_STYLES[state]}`}>
                      {state}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-slate-400">
                    Actualiza al instante en localStorage
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-sm text-slate-400">
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
