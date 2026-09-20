import ProductCarousel from "@/components/products/ProductCarousel";
import type { Product } from "@/types";

export default function ProductCarouselFarmaciaCercana({ products }: { products: Product[] }) {
  return (
    <ProductCarousel
      products={products}
      theme={{
        wrapperClassName: "bg-orange-50",
        titleClassName: "text-white",
        priceClassName: "text-orange-50",
        navButtonClassName: "bg-orange-900/40 text-white hover:bg-orange-900/60",
        dotActiveClassName: "bg-orange-500",
        dotInactiveClassName: "bg-orange-200",
        addButtonClassName: "bg-orange-500 text-white hover:bg-orange-600",
        cardRadiusClassName: "rounded-[2rem]",
      }}
    />
  );
}
