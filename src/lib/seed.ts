import type { Order, OrderStatus, Product } from "@/types";
import { generateId } from "@/lib/utils";

const DEMO_CUSTOMERS = [
  { nombre: "Camila", apellido: "Rodríguez", telefono: "3001234567", correo: "camila.rodriguez@example.com", direccion: "Cra 5 # 12-34", ciudad: "Popayán", departamento: "Cauca" },
  { nombre: "Andrés", apellido: "Muñoz", telefono: "3109876543", correo: "andres.munoz@example.com", direccion: "Calle 20 # 8-15", ciudad: "Cali", departamento: "Valle del Cauca" },
  { nombre: "Laura", apellido: "Gómez", telefono: "3157654321", correo: "laura.gomez@example.com", direccion: "Av. Siempre Viva 742", ciudad: "Bogotá", departamento: "Cundinamarca" },
  { nombre: "Julián", apellido: "Torres", telefono: "3123456789", correo: "julian.torres@example.com", direccion: "Cra 15 # 45-10", ciudad: "Medellín", departamento: "Antioquia" },
  { nombre: "Valentina", apellido: "Restrepo", telefono: "3187654321", correo: "valentina.restrepo@example.com", direccion: "Calle 9 # 3-21", ciudad: "Popayán", departamento: "Cauca" },
];

const DEMO_STATUSES: OrderStatus[] = [
  "Entregado",
  "Enviado",
  "Preparando",
  "Confirmado",
  "Pendiente",
];

const PAYMENT_METHODS: Array<"Pago online" | "Transferencia" | "Contraentrega"> = [
  "Pago online",
  "Transferencia",
  "Contraentrega",
];

export function buildDemoOrders(products: Product[]): Order[] {
  const orders: Order[] = [];
  const daysAgoList = [12, 7, 4, 2, 0];

  DEMO_CUSTOMERS.forEach((cliente, index) => {
    const productA = products[index % products.length];
    const productB = products[(index + 3) % products.length];
    const qtyA = 1 + (index % 3);
    const qtyB = 1 + ((index + 1) % 2);

    const items = [
      {
        productId: productA.id,
        name: productA.name,
        price: productA.price,
        quantity: qtyA,
        requiresPrescription: productA.requiresPrescription,
      },
      {
        productId: productB.id,
        name: productB.name,
        price: productB.price,
        quantity: qtyB,
        requiresPrescription: productB.requiresPrescription,
      },
    ];

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const envio = subtotal >= 150000 ? 0 : 8000;
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - daysAgoList[index]);

    orders.push({
      id: generateId("ord"),
      numero: `ORD-${100000 + index * 137}`,
      cliente,
      items,
      metodoPago: PAYMENT_METHODS[index % PAYMENT_METHODS.length],
      subtotal,
      envio,
      total: subtotal + envio,
      estado: DEMO_STATUSES[index % DEMO_STATUSES.length],
      fecha: fecha.toISOString(),
    });
  });

  return orders;
}
