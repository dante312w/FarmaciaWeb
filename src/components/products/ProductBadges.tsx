import { Star, FileWarning, AlertTriangle, XCircle } from "lucide-react";
import { getStockState } from "@/lib/utils";
import type { Product } from "@/types";

export function StockBadge({ stock }: { stock: number }) {
  const state = getStockState(stock);
  if (state === "Disponible") return null;
  if (state === "Stock bajo") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
        <AlertTriangle size={11} /> Stock bajo
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-semibold text-red-700">
      <XCircle size={11} /> Agotado
    </span>
  );
}

export function FeaturedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
      <Star size={11} /> Destacado
    </span>
  );
}

export function PrescriptionBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-[11px] font-semibold text-violet-700">
      <FileWarning size={11} /> Requiere fórmula
    </span>
  );
}

export function ProductBadgeRow({ product }: { product: Product }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {product.featured && <FeaturedBadge />}
      {product.requiresPrescription && <PrescriptionBadge />}
      <StockBadge stock={product.stock} />
    </div>
  );
}
