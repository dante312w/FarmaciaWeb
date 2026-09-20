"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Category } from "@/types";
import type { CategoryInput } from "@/lib/categories";

const ICONS = ["Pill", "Sparkles", "Leaf", "Droplets", "Baby", "Cross"];

const EMPTY: CategoryInput = {
  name: "",
  description: "",
  icon: "Pill",
};

export default function CategoryFormModal({
  open,
  initialCategory,
  onClose,
  onSubmit,
}: {
  open: boolean;
  initialCategory: Category | null;
  onClose: () => void;
  onSubmit: (input: CategoryInput) => void;
}) {
  const [form, setForm] = useState<CategoryInput>(EMPTY);

  useEffect(() => {
    if (initialCategory) {
      const { id, slug, ...rest } = initialCategory;
      setForm(rest);
    } else {
      setForm(EMPTY);
    }
  }, [initialCategory, open]);

  if (!open) return null;

  function update<K extends keyof CategoryInput>(field: K, value: CategoryInput[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            {initialCategory ? "Editar categoría" : "Nueva categoría"}
          </h2>
          <button onClick={onClose} aria-label="Cerrar" className="text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-500">
            Nombre
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal text-slate-800 outline-none focus:border-blue-400"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-500">
            Descripción
            <textarea
              required
              rows={2}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal text-slate-800 outline-none focus:border-blue-400"
            />
          </label>

          <div>
            <p className="mb-2 text-xs font-semibold text-slate-500">Ícono</p>
            <div className="flex flex-wrap gap-2">
              {ICONS.map((icon) => (
                <button
                  type="button"
                  key={icon}
                  onClick={() => update("icon", icon)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium ${
                    form.icon === icon
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
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
              {initialCategory ? "Guardar cambios" : "Crear categoría"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
