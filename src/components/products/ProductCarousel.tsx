"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import type { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export interface ProductCarouselTheme {
  wrapperClassName?: string;
  titleClassName?: string;
  priceClassName?: string;
  navButtonClassName?: string;
  dotActiveClassName?: string;
  dotInactiveClassName?: string;
  addButtonClassName?: string;
  cardRadiusClassName?: string;
}

const DEFAULT_THEME: Required<ProductCarouselTheme> = {
  wrapperClassName: "bg-slate-50",
  titleClassName: "text-white",
  priceClassName: "text-white/80",
  navButtonClassName: "bg-black/30 text-white hover:bg-black/50",
  dotActiveClassName: "bg-slate-900",
  dotInactiveClassName: "bg-slate-300",
  addButtonClassName: "bg-white text-slate-900 hover:bg-slate-100",
  cardRadiusClassName: "rounded-3xl",
};

export default function ProductCarousel({
  products,
  theme,
  autoplay = true,
}: {
  products: Product[];
  theme?: ProductCarouselTheme;
  autoplay?: boolean;
}) {
  const t = { ...DEFAULT_THEME, ...theme };
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", slidesToScroll: 1 },
    autoplay
      ? [Autoplay({ delay: 2800, stopOnInteraction: true, stopOnMouseEnter: true })]
      : []
  );
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (products.length === 0) return null;

  return (
    <div className={`relative w-full overflow-hidden ${t.wrapperClassName}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex h-[420px] touch-pan-y">
          {products.map((product, index) => {
            const isActive = current === index;
            const disabled = product.stock <= 0;
            return (
              <div
                key={product.id}
                className="relative flex h-full w-full shrink-0 grow-0 basis-[78%] items-center justify-center px-2 sm:basis-[52%] md:basis-[34%] lg:basis-[27%] xl:basis-[23%]"
              >
                <motion.div
                  initial={false}
                  animate={{
                    clipPath: isActive
                      ? "inset(0% 0 0% 0 round 1.5rem)"
                      : "inset(12% 0 12% 0 round 1.5rem)",
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`relative h-full w-full overflow-hidden ${t.cardRadiusClassName}`}
                >
                  <Link href={`/producto/${product.slug}`} className="block h-full w-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full scale-105 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  </Link>

                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, filter: "blur(8px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4"
                      >
                        <p className={`line-clamp-2 text-sm font-semibold ${t.titleClassName}`}>
                          {product.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-bold ${t.priceClassName}`}>
                            {formatCurrency(product.price)}
                          </span>
                          <button
                            type="button"
                            aria-label="Agregar al carrito"
                            disabled={disabled}
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product.id, 1);
                              showToast(`${product.name} agregado al carrito`);
                            }}
                            className={`flex h-8 w-8 items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-40 ${t.addButtonClassName}`}
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-between px-3 sm:px-6">
        <button
          type="button"
          aria-label="Anterior"
          onClick={() => emblaApi?.scrollPrev()}
          className={`pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full transition ${t.navButtonClassName}`}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          onClick={() => emblaApi?.scrollNext()}
          className={`pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full transition ${t.navButtonClassName}`}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 py-4">
        {products.map((_, index) => (
          <button
            type="button"
            key={index}
            aria-label={`Ir a la imagen ${index + 1}`}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              current === index ? `w-4 ${t.dotActiveClassName}` : t.dotInactiveClassName
            }`}
          />
        ))}
      </div>
    </div>
  );
}
