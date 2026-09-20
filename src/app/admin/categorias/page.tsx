"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { initStorage } from "@/lib/storage";
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  categoryHasProducts,
  type CategoryInput,
} from "@/lib/categories";
import { listProducts } from "@/lib/products";
import type { Category } from "@/types";
import DynamicIcon from "@/components/ui/DynamicIcon";
import CategoryFormModal from "@/components/admin/CategoryFormModal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useToast } from "@/context/ToastContext";

export default function AdminCategoriasPage() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [toDelete, setToDelete] = useState<Category | null>(null);
  const [blockedMessage, setBlockedMessage] = useState<string | null>(null);

  function refresh() {
    const cats = listCategories();
    setCategories(cats);
    const products = listProducts();
    const counts: Record<string, number> = {};
    cats.forEach((c) => {
      counts[c.id] = products.filter((p) => p.categoryId === c.id).length;
    });
    setProductCounts(counts);
  }

  useEffect(() => {
    initStorage();
    refresh();
  }, []);

  function handleSubmit(input: CategoryInput) {
    if (editing) {
      updateCategory(editing.id, input);
      showToast("Categoría actualizada correctamente");
    } else {
      createCategory(input);
      showToast("Categoría creada correctamente");
    }
    setModalOpen(false);
    setEditing(null);
    refresh();
  }

  function handleDeleteRequest(category: Category) {
    if (categoryHasProducts(category.id)) {
      setBlockedMessage(
        `No puedes eliminar "${category.name}" porque tiene ${productCounts[category.id]} producto(s) asociado(s). Reasigna o elimina esos productos primero.`
      );
      return;
    }
    setToDelete(category);
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Categorías</h1>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
        >
          <Plus size={16} /> Nueva categoría
        </button>
      </div>

      {blockedMessage && (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
          <span>{blockedMessage}</span>
          <button onClick={() => setBlockedMessage(null)} className="font-semibold underline">
            Cerrar
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.id} className="rounded-2xl border border-slate-100 bg-white p-5">
            <div className="flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <DynamicIcon name={c.icon} size={20} />
              </span>
              <div className="flex gap-1">
                <button
                  aria-label="Editar categoría"
                  onClick={() => {
                    setEditing(c);
                    setModalOpen(true);
                  }}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <Pencil size={14} />
                </button>
                <button
                  aria-label="Eliminar categoría"
                  onClick={() => handleDeleteRequest(c)}
                  className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm font-bold text-slate-800">{c.name}</p>
            <p className="mt-1 text-xs text-slate-400">{c.description}</p>
            <p className="mt-3 text-xs font-semibold text-slate-500">
              {productCounts[c.id] ?? 0} producto(s) asociado(s)
            </p>
          </div>
        ))}
      </div>

      <CategoryFormModal
        open={modalOpen}
        initialCategory={editing}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="¿Seguro que deseas eliminar esta categoría?"
        message={toDelete ? `Se eliminará "${toDelete.name}" de forma permanente en este prototipo.` : ""}
        onCancel={() => setToDelete(null)}
        onConfirm={() => {
          if (toDelete) {
            const result = deleteCategory(toDelete.id);
            if (result.success) {
              showToast("Categoría eliminada");
            } else {
              setBlockedMessage(result.reason ?? null);
            }
            setToDelete(null);
            refresh();
          }
        }}
      />
    </div>
  );
}
