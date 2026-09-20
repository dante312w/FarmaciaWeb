import ProductCarousel from "@/components/products/ProductCarousel";
import type { Product } from "@/types";

export default function ProductCarouselPharmaPremium({ products }: { products: Product[] }) {
  return (
    <ProductCarousel
      products={products}
      theme={{
        wrapperClassName: "bg-neutral-950",
        titleClassName: "text-white",
        priceClassName: "text-amber-400",
        navButtonClassName: "bg-white/10 text-amber-400 hover:bg-white/20",
        dotActiveClassName: "bg-amber-400",
        dotInactiveClassName: "bg-white/20",
        addButtonClassName: "bg-amber-400 text-neutral-950 hover:bg-amber-300",
        cardRadiusClassName: "rounded-none",
      }}
    />
  );
}
