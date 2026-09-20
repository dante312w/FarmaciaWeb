"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { initStorage } from "@/lib/storage";
import { listOrders, updateOrderStatus, ORDER_STATUSES } from "@/lib/orders";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types";
import { useToast } from "@/context/ToastContext";

const STATUS_COLORS: Record<OrderStatus, string> = {
  Pendiente: "bg-amber-100 text-amber-700",
  Confirmado: "bg-blue-100 text-blue-700",
  Preparando: "bg-indigo-100 text-indigo-700",
  Enviado: "bg-purple-100 text-purple-700",
  Entregado: "bg-emerald-100 text-emerald-700",
  Cancelado: "bg-red-100 text-red-700",
};

export default function AdminPedidosPage() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);

  function refresh() {
    setOrders(listOrders());
  }

  useEffect(() => {
    initStorage();
    refresh();
  }, []);

  function handleStatusChange(id: string, estado: OrderStatus) {
    updateOrderStatus(id, estado);
    showToast("Estado del pedido actualizado");
    refresh();
    setSelected((prev) => (prev && prev.id === id ? { ...prev, estado } : prev));
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Pedidos</h1>

      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="border-b border-slate-100 text-xs font-bold uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="px-4 py-3 font-medium text-slate-800">{o.numero}</td>
                <td className="px-4 py-3 text-slate-600">
                  {o.cliente.nombre} {o.cliente.apellido}
                </td>
                <td className="px-4 py-3 text-slate-500">{formatDate(o.fecha)}</td>
                <td className="px-4 py-3 text-slate-700">{formatCurrency(o.total)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${STATUS_COLORS[o.estado]}`}>
                    {o.estado}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setSelected(o)}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300"
                  >
                    Ver pedido
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">
                  Aún no hay pedidos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Pedido {selected.numero}</h2>
              <button onClick={() => setSelected(null)} aria-label="Cerrar" className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-slate-600">
              {selected.cliente.nombre} {selected.cliente.apellido} · {selected.cliente.telefono}
            </p>
            <p className="text-sm text-slate-600">{selected.cliente.correo}</p>
            <p className="text-sm text-slate-600">
              {selected.cliente.direccion}, {selected.cliente.ciudad}, {selected.cliente.departamento}
            </p>
            <p className="mt-1 text-xs text-slate-400">Método de pago: {selected.metodoPago}</p>

            <ul className="mt-4 divide-y divide-slate-100 border-t border-slate-100">
              {selected.items.map((item) => (
                <li key={item.productId} className="flex justify-between py-2.5 text-sm text-slate-600">
                  <span>{item.quantity}× {item.name}</span>
                  <span className="font-medium text-slate-800">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-slate-900">
              <span>Total</span>
              <span>{formatCurrency(selected.total)}</span>
            </div>

            <label className="mt-5 flex flex-col gap-1.5 text-xs font-semibold text-slate-500">
              Estado del pedido
              <select
                value={selected.estado}
                onChange={(e) => handleStatusChange(selected.id, e.target.value as OrderStatus)}
                className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal text-slate-800 outline-none focus:border-blue-400"
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
