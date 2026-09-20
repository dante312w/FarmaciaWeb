"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { initStorage } from "@/lib/storage";
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type ProductInput,
} from "@/lib/products";
import { listCategories } from "@/lib/categories";
import { formatCurrency, getStockState } from "@/lib/utils";
import type { Category, Product } from "@/types";
import ProductFormModal from "@/components/admin/ProductFormModal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useToast } from "@/context/ToastContext";

export default function AdminProductosPage() {
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [toDelete, setToDelete] = useState<Product | null>(null);

  function refresh() {
    setProducts(listProducts());
    setCategories(listCategories());
  }

  useEffect(() => {
    initStorage();
    refresh();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  function categoryName(id: string) {
    return categories.find((c) => c.id === id)?.name ?? "—";
  }

  function handleSubmit(input: ProductInput) {
    if (editing) {
      updateProduct(editing.id, input);
      showToast("Producto actualizado correctamente");
    } else {
      createProduct(input);
      showToast("Producto creado correctamente");
    }
    setModalOpen(false);
    setEditing(null);
    refresh();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Productos</h1>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
        >
          <Plus size={16} /> Nuevo producto
        </button>
      </div>

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
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-slate-100 text-xs font-bold uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((p) => (
              <tr key={p.id}>
                <td className="flex items-center gap-3 px-4 py-3">
                  <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                  <span className="line-clamp-1 max-w-[220px] font-medium text-slate-800">{p.name}</span>
                </td>
                <td className="px-4 py-3 text-slate-500">{categoryName(p.categoryId)}</td>
                <td className="px-4 py-3 text-slate-700">{formatCurrency(p.price)}</td>
                <td className="px-4 py-3 text-slate-700">{p.stock}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      !p.active
                        ? "bg-slate-100 text-slate-500"
                        : getStockState(p.stock) === "Disponible"
                          ? "bg-emerald-100 text-emerald-700"
                          : getStockState(p.stock) === "Stock bajo"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.active ? getStockState(p.stock) : "Inactivo"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button
                      aria-label="Editar producto"
                      onClick={() => {
                        setEditing(p);
                        setModalOpen(true);
                      }}
                      className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      aria-label="Eliminar producto"
                      onClick={() => setToDelete(p)}
                      className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ProductFormModal
        open={modalOpen}
        categories={categories}
        initialProduct={editing}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="¿Seguro que deseas eliminar este producto?"
        message={toDelete ? `Se eliminará "${toDelete.name}" de forma permanente en este prototipo.` : ""}
        onCancel={() => setToDelete(null)}
        onConfirm={() => {
          if (toDelete) {
            deleteProduct(toDelete.id);
            showToast("Producto eliminado");
            setToDelete(null);
            refresh();
          }
        }}
      />
    </div>
  );
}
