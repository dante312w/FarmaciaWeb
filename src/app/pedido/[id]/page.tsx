"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Package } from "lucide-react";
import SiteChrome from "@/components/layout/SiteChrome";
import DemoBadge from "@/components/ui/DemoBadge";
import { getOrderById } from "@/lib/orders";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types";

const STATUS_COLORS: Record<OrderStatus, string> = {
  Pendiente: "bg-amber-100 text-amber-700",
  Confirmado: "bg-blue-100 text-blue-700",
  Preparando: "bg-indigo-100 text-indigo-700",
  Enviado: "bg-purple-100 text-purple-700",
  Entregado: "bg-emerald-100 text-emerald-700",
  Cancelado: "bg-red-100 text-red-700",
};

export default function PedidoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    const o = getOrderById(id);
    setOrder(o || null);
  }, [id]);

  if (order === undefined) return <div className="min-h-screen bg-white" />;
  if (order === null) return notFound();

  return (
    <SiteChrome>
      <DemoBadge />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={28} />
          </span>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Pedido creado correctamente
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Número de pedido <span className="font-semibold text-slate-700">{order.numero}</span>
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-100 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Estado</p>
              <span className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-bold ${STATUS_COLORS[order.estado]}`}>
                {order.estado}
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Fecha</p>
              <p className="text-sm text-slate-600">{formatDate(order.fecha)}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Package size={16} /> Productos
          </div>
          <ul className="mt-3 space-y-3">
            {order.items.map((item) => (
              <li key={item.productId} className="flex items-center justify-between text-sm text-slate-600">
                <span>
                  {item.quantity}× {item.name}
                  {item.requiresPrescription && (
                    <span className="ml-2 rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
                      Requiere fórmula
                    </span>
                  )}
                </span>
                <span className="font-medium text-slate-800">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2 border-t border-slate-100 pt-4 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Envío</span>
              <span>{order.envio === 0 ? "Gratis" : formatCurrency(order.envio)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-slate-900">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-800">Datos de envío</p>
            <p className="mt-1">
              {order.cliente.nombre} {order.cliente.apellido} · {order.cliente.telefono}
            </p>
            <p>{order.cliente.correo}</p>
            <p>
              {order.cliente.direccion}, {order.cliente.ciudad}, {order.cliente.departamento}
            </p>
            <p className="mt-1 text-xs text-slate-400">Método de pago: {order.metodoPago}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/catalogo"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </SiteChrome>
  );
}
