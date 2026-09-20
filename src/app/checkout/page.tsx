"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileWarning, Landmark, CreditCard, Truck } from "lucide-react";
import SiteChrome from "@/components/layout/SiteChrome";
import DemoBadge from "@/components/ui/DemoBadge";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { getShippingCost, getSubtotal, getCartTotal, cartHasPrescriptionItems } from "@/lib/cart";
import { createOrderFromCart } from "@/lib/orders";
import { formatCurrency } from "@/lib/utils";
import type { OrderCustomer, PaymentMethod } from "@/types";

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
  { value: "Pago online", label: "Pago online", icon: CreditCard },
  { value: "Transferencia", label: "Transferencia bancaria", icon: Landmark },
  { value: "Contraentrega", label: "Pago contraentrega", icon: Truck },
];

const EMPTY_FORM: OrderCustomer = {
  nombre: "",
  apellido: "",
  telefono: "",
  correo: "",
  direccion: "",
  ciudad: "",
  departamento: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, refresh } = useCart();
  const { showToast } = useToast();
  const [form, setForm] = useState<OrderCustomer>(EMPTY_FORM);
  const [metodoPago, setMetodoPago] = useState<PaymentMethod>("Pago online");
  const [submitting, setSubmitting] = useState(false);

  const subtotal = getSubtotal();
  const envio = getShippingCost();
  const total = getCartTotal();
  const hasPrescription = cartHasPrescriptionItems();

  function updateField(field: keyof OrderCustomer, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const isValid = Object.values(form).every((v) => v.trim().length > 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || lines.length === 0) return;
    setSubmitting(true);
    const order = createOrderFromCart(form, metodoPago);
    refresh();
    showToast("Pedido creado correctamente");
    router.push(`/pedido/${order.id}`);
  }

  if (lines.length === 0) {
    return (
      <SiteChrome>
        <DemoBadge />
        <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
          <p className="text-sm font-semibold text-slate-600">
            Tu carrito está vacío, agrega productos antes de continuar.
          </p>
          <Link
            href="/catalogo"
            className="mt-4 inline-block rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Ver catálogo
          </Link>
        </div>
      </SiteChrome>
    );
  }

  return (
    <SiteChrome>
      <DemoBadge />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="mb-8 text-2xl font-bold text-slate-900">Finalizar compra</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-100 p-5">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">
                Datos de contacto y envío
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Nombre" value={form.nombre} onChange={(v) => updateField("nombre", v)} />
                <Field label="Apellido" value={form.apellido} onChange={(v) => updateField("apellido", v)} />
                <Field label="Teléfono" value={form.telefono} onChange={(v) => updateField("telefono", v)} type="tel" />
                <Field label="Correo" value={form.correo} onChange={(v) => updateField("correo", v)} type="email" />
                <Field label="Dirección" value={form.direccion} onChange={(v) => updateField("direccion", v)} className="sm:col-span-2" />
                <Field label="Ciudad" value={form.ciudad} onChange={(v) => updateField("ciudad", v)} />
                <Field label="Departamento" value={form.departamento} onChange={(v) => updateField("departamento", v)} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 p-5">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">
                Método de pago
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {PAYMENT_OPTIONS.map(({ value, label, icon: Icon }) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => setMetodoPago(value)}
                    className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left text-sm transition ${
                      metodoPago === value
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-semibold">{label}</span>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-400">
                Los métodos de pago son simulados; ningún dato financiero real
                se procesa en este prototipo.
              </p>
            </div>

            {hasPrescription && (
              <div className="flex items-start gap-2 rounded-xl bg-violet-50 p-4 text-xs text-violet-700">
                <FileWarning size={16} className="mt-0.5 shrink-0" />
                <p>
                  Este producto requiere validación de fórmula médica. En una
                  versión productiva, aquí se solicitaría cargar la fórmula
                  antes de confirmar el pedido.
                </p>
              </div>
            )}
          </div>

          <div className="h-fit rounded-2xl border border-slate-100 p-5">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">
              Resumen
            </h2>
            <ul className="mb-4 space-y-2 text-sm text-slate-600">
              {lines.map((line) => (
                <li key={line.product.id} className="flex justify-between gap-2">
                  <span className="line-clamp-1">
                    {line.quantity}× {line.product.name}
                  </span>
                  <span className="shrink-0">{formatCurrency(line.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t border-slate-100 pt-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Envío</span>
                <span>{envio === 0 ? "Gratis" : formatCurrency(envio)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-slate-900">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={!isValid || submitting}
              className="mt-5 w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              Confirmar pedido
            </button>
          </div>
        </form>
      </div>
    </SiteChrome>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 text-xs font-semibold text-slate-500 ${className}`}>
      {label}
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal text-slate-800 outline-none focus:border-blue-400"
      />
    </label>
  );
}
