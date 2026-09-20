"use client";

import Link from "next/link";
import { ShoppingCart, Trash2, ArrowRight, FileWarning } from "lucide-react";
import SiteChrome from "@/components/layout/SiteChrome";
import DemoBadge from "@/components/ui/DemoBadge";
import { useTheme } from "@/context/ThemeContext";
import { getThemeComponents } from "@/components/themed";
import { useCart } from "@/context/CartContext";
import { getShippingCost, getSubtotal, getCartTotal, cartHasPrescriptionItems, FREE_SHIPPING_THRESHOLD } from "@/lib/cart";
import { formatCurrency } from "@/lib/utils";

export default function CarritoPage() {
  const { theme } = useTheme();
  const { CartLineItem } = getThemeComponents(theme);
  const { lines, clearCart, refresh } = useCart();

  const subtotal = getSubtotal();
  const envio = getShippingCost();
  const total = getCartTotal();
  const hasPrescription = cartHasPrescriptionItems();

  return (
    <SiteChrome>
      <DemoBadge />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="mb-8 text-2xl font-bold text-slate-900">Tu carrito</h1>

        {lines.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-24 text-center">
            <ShoppingCart size={36} className="text-slate-300" />
            <p className="mt-4 text-sm font-semibold text-slate-600">Tu carrito está vacío</p>
            <Link
              href="/catalogo"
              className="mt-4 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Ver catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_320px]">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  {lines.length} producto{lines.length !== 1 && "s"} en tu carrito
                </p>
                <button
                  onClick={() => {
                    clearCart();
                    refresh();
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={13} /> Vaciar carrito
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {lines.map((line) => (
                  <CartLineItem key={line.product.id} line={line} />
                ))}
              </div>
            </div>

            <div className="h-fit rounded-2xl border border-slate-100 p-5">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">
                Resumen del pedido
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Envío</span>
                  <span>{envio === 0 ? "Gratis" : formatCurrency(envio)}</span>
                </div>
                {envio > 0 && (
                  <p className="text-xs text-slate-400">
                    Envío gratis en compras superiores a {formatCurrency(FREE_SHIPPING_THRESHOLD)}
                  </p>
                )}
                <div className="mt-2 flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-slate-900">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              {hasPrescription && (
                <div className="mt-4 flex items-start gap-2 rounded-xl bg-violet-50 p-3 text-xs text-violet-700">
                  <FileWarning size={15} className="mt-0.5 shrink-0" />
                  <p>Tu carrito incluye productos que requieren fórmula médica.</p>
                </div>
              )}

              <Link
                href="/checkout"
                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Continuar al checkout <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </SiteChrome>
  );
}
