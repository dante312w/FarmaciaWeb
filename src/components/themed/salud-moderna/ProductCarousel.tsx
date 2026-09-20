import ProductCarousel from "@/components/products/ProductCarousel";
import type { Product } from "@/types";

export default function ProductCarouselSaludModerna({ products }: { products: Product[] }) {
  return (
    <ProductCarousel
      products={products}
      theme={{
        wrapperClassName: "bg-blue-50",
        titleClassName: "text-white",
        priceClassName: "text-white/85",
        navButtonClassName: "bg-slate-900/40 text-white hover:bg-slate-900/60",
        dotActiveClassName: "bg-blue-600",
        dotInactiveClassName: "bg-blue-200",
        addButtonClassName: "bg-blue-600 text-white hover:bg-blue-700",
        cardRadiusClassName: "rounded-2xl",
      }}
    />
  );
}
