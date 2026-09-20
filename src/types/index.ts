export type Theme = "salud-moderna" | "farmacia-cercana" | "pharma-premium";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string; // lucide icon name
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
  stock: number;
  requiresPrescription: boolean;
  featured: boolean;
  active: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export type OrderStatus =
  | "Pendiente"
  | "Confirmado"
  | "Preparando"
  | "Enviado"
  | "Entregado"
  | "Cancelado";

export type PaymentMethod = "Pago online" | "Transferencia" | "Contraentrega";

export interface OrderCustomer {
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  direccion: string;
  ciudad: string;
  departamento: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  requiresPrescription: boolean;
}

export interface Order {
  id: string;
  numero: string;
  cliente: OrderCustomer;
  items: OrderItem[];
  metodoPago: PaymentMethod;
  subtotal: number;
  envio: number;
  total: number;
  estado: OrderStatus;
  fecha: string;
}

export type StockState = "Disponible" | "Stock bajo" | "Agotado";
