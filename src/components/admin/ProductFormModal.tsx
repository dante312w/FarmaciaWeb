"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Category, Product } from "@/types";
import type { ProductInput } from "@/lib/products";

const EMPTY: ProductInput = {
  name: "",
  description: "",
  price: 0,
  categoryId: "",
  image: "",
  stock: 0,
  requiresPrescription: false,
  featured: false,
  active: true,
};

export default function ProductFormModal({
  open,
  categories,
  initialProduct,
  onClose,
  onSubmit,
}: {
  open: boolean;
  categories: Category[];
  initialProduct: Product | null;
  onClose: () => void;
  onSubmit: (input: ProductInput) => void;
}) {
  const [form, setForm] = useState<ProductInput>(EMPTY);

  useEffect(() => {
    if (initialProduct) {
      const { id, slug, ...rest } = initialProduct;
      setForm(rest);
    } else {
      setForm({ ...EMPTY, categoryId: categories[0]?.id ?? "" });
    }
  }, [initialProduct, categories, open]);

  if (!open) return null;

  function update<K extends keyof ProductInput>(field: K, value: ProductInput[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            {initialProduct ? "Editar producto" : "Nuevo producto"}
          </h2>
          <button onClick={onClose} aria-label="Cerrar" className="text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField label="Nombre" value={form.name} onChange={(v) => update("name", v)} required />
          <TextArea label="Descripción" value={form.description} onChange={(v) => update("description", v)} required />

          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Precio (COP)"
              type="number"
              value={String(form.price)}
              onChange={(v) => update("price", Number(v) || 0)}
              required
            />
            <TextField
              label="Stock"
              type="number"
              value={String(form.stock)}
              onChange={(v) => update("stock", Number(v) || 0)}
              required
            />
          </div>

          <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-500">
            Categoría
            <select
              required
              value={form.categoryId}
              onChange={(e) => update("categoryId", e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal text-slate-800 outline-none focus:border-blue-400"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <TextField
            label="URL de imagen"
            value={form.image}
            onChange={(v) => update("image", v)}
            required
          />

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.requiresPrescription}
                onChange={(e) => update("requiresPrescription", e.target.checked)}
                className="accent-blue-600"
              />
              Requiere fórmula
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="accent-blue-600"
              />
              Destacado
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => update("active", e.target.checked)}
                className="accent-blue-600"
              />
              Activo
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              {initialProduct ? "Guardar cambios" : "Crear producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-500">
      {label}
      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal text-slate-800 outline-none focus:border-blue-400"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-500">
      {label}
      <textarea
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal text-slate-800 outline-none focus:border-blue-400"
      />
    </label>
  );
}
