import type { Order, OrderCustomer, OrderStatus, PaymentMethod } from "@/types";
import { getOrders, saveOrders } from "@/lib/storage";
import { getCartLines, clearCart } from "@/lib/cart";
import { generateId } from "@/lib/utils";
import { getShippingCost, getSubtotal } from "@/lib/cart";

export function listOrders(): Order[] {
  return getOrders().sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );
}

export function getOrderById(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id);
}

export function createOrderFromCart(
  cliente: OrderCustomer,
  metodoPago: PaymentMethod
): Order {
  const lines = getCartLines();
  const subtotal = getSubtotal();
  const envio = getShippingCost();
  const order: Order = {
    id: generateId("ord"),
    numero: `ORD-${Math.floor(100000 + Math.random() * 899999)}`,
    cliente,
    items: lines.map((line) => ({
      productId: line.product.id,
      name: line.product.name,
      price: line.product.price,
      quantity: line.quantity,
      requiresPrescription: line.product.requiresPrescription,
    })),
    metodoPago,
    subtotal,
    envio,
    total: subtotal + envio,
    estado: "Pendiente",
    fecha: new Date().toISOString(),
  };
  const orders = getOrders();
  saveOrders([...orders, order]);
  clearCart();
  return order;
}

export function updateOrderStatus(id: string, estado: OrderStatus): Order | undefined {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return undefined;
  orders[index] = { ...orders[index], estado };
  saveOrders(orders);
  return orders[index];
}

export const ORDER_STATUSES: OrderStatus[] = [
  "Pendiente",
  "Confirmado",
  "Preparando",
  "Enviado",
  "Entregado",
  "Cancelado",
];
