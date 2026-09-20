# Farmacia Prototipo — Demo de e-commerce farmacéutico

Prototipo funcional para presentar a un cliente las 3 propuestas visuales de
su futura tienda en línea de productos farmacéuticos y cuidado personal.

## Tecnologías

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- lucide-react (iconos)
- Persistencia en `localStorage`, datos iniciales desde JSON
- Sin backend ni base de datos real todavía

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:3000. La primera vez se mostrará el selector de
propuesta visual; después puedes cambiar de diseño en cualquier momento
desde el selector "Diseño" en la parte superior de cada página.

## Estructura del proyecto

```
src/
├── app/                  # Rutas (App Router)
│   ├── page.tsx          # Selector de propuesta + landing
│   ├── catalogo/         # Catálogo con búsqueda y filtros
│   ├── producto/[slug]/  # Detalle de producto
│   ├── carrito/          # Carrito de compras
│   ├── checkout/         # Formulario de compra
│   ├── pedido/[id]/      # Confirmación / detalle de pedido
│   └── admin/            # Panel administrativo (dashboard, CRUDs)
│
├── components/
│   ├── themed/           # 3 sets de componentes visuales (una carpeta por propuesta)
│   ├── layout/           # SiteChrome (header/footer temático)
│   ├── products/         # Badges de producto reutilizables
│   ├── admin/            # Modales y formularios del panel admin
│   └── ui/               # Selector de tema, íconos dinámicos, etc.
│
├── context/              # ThemeContext, CartContext, ToastContext
├── lib/                  # storage.ts, products.ts, categories.ts, cart.ts, orders.ts, utils.ts, seed.ts
├── data/                 # products.json, categories.json (datos iniciales)
└── types/                # Tipos compartidos (Product, Category, Order, etc.)
```

## Las 3 propuestas visuales

Selecciona el diseño desde la pantalla inicial o desde el selector superior:

- **Salud Moderna**: limpio, profesional, azul médico.
- **Farmacia Cercana**: cálido, cercano, naranja y redondeado.
- **Pharma Premium**: editorial, elegante, fondo oscuro y acentos ámbar.

Cada propuesta tiene su propio Header, Hero, tarjeta de producto, tarjeta de
categoría, footer y línea de carrito — la lógica de datos (carrito,
checkout, pedidos, admin) es la misma para las tres.

## Cómo funciona el CRUD

La arquitectura separa claramente:

```
UI (componentes / páginas)
      ↓
Servicio (lib/products.ts, categories.ts, cart.ts, orders.ts)
      ↓
Storage (lib/storage.ts)
      ↓
localStorage
```

Los componentes nunca llaman a `localStorage` directamente: siempre pasan
por un servicio. Esto permite que, en una siguiente fase, `lib/storage.ts`
se reemplace por llamadas a una API (`fetch`) sin tener que tocar la UI.

## Dónde se guarda la información

Todo vive en `localStorage` del navegador bajo estas claves:

- `farmacia_products`
- `farmacia_categories`
- `farmacia_cart`
- `farmacia_orders`
- `farmacia_theme` (propuesta visual activa)

Al cargar la app por primera vez, si no hay datos en `localStorage`, se
inicializan desde `src/data/products.json` y `src/data/categories.json`, y
se generan 5 pedidos de demostración (`src/lib/seed.ts`).

## Panel administrativo

Ruta: `/admin` (sin autenticación real — se muestra el aviso "Modo
demostración" en la parte superior).

- **Dashboard**: ventas totales, número de pedidos, productos y alertas de
  stock bajo/agotado.
- **Productos**: listado, crear, editar y eliminar (con confirmación).
- **Inventario**: ajustar stock por producto, con estado calculado
  automáticamente (Disponible / Stock bajo / Agotado).
- **Categorías**: crear, editar y eliminar (bloqueando el borrado si tiene
  productos asociados).
- **Pedidos**: listado, ver detalle y cambiar el estado del pedido.

## Qué reemplazar cuando se pase a backend real (Next.js API + Prisma + PostgreSQL)

1. `src/lib/storage.ts`: reemplazar las funciones `get*`/`save*` por
   llamadas `fetch` a rutas `/api/...`.
2. `src/data/*.json`: pasan a ser el *seed* inicial de la base de datos
   (script de `prisma db seed`), ya no se cargan en el cliente.
3. `src/lib/products.ts`, `categories.ts`, `cart.ts`, `orders.ts`: la forma
   de las funciones se mantiene casi igual; internamente pasan de leer
   `localStorage` a hacer `fetch`/`await`.
4. Agregar autenticación real para `/admin` (hoy es de libre acceso, solo
   con el aviso de "Modo demostración").
5. El flujo de "requiere fórmula médica" es solo visual: en producción
   debería integrarse con un proceso real de validación y carga de
   documentos, que hoy no se implementa ni se simula el almacenamiento de
   archivos.
6. El carrito, que hoy vive en `localStorage` por navegador, pasaría a
   asociarse a una sesión o usuario autenticado en el backend.

Todos los datos de productos, categorías y pedidos son ficticios y están
claramente marcados como material de demostración.

# FarmaciaWeb
