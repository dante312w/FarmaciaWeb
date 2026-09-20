import type { ComponentType } from "react";
import type { Theme, Product, Category } from "@/types";
import type { CartLine } from "@/lib/cart";

import HeaderSaludModerna from "./salud-moderna/Header";
import HeroSaludModerna from "./salud-moderna/Hero";
import ProductCardSaludModerna from "./salud-moderna/ProductCard";
import CategoryCardSaludModerna from "./salud-moderna/CategoryCard";
import FooterSaludModerna from "./salud-moderna/Footer";
import CartLineItemSaludModerna from "./salud-moderna/CartLineItem";
import ProductCarouselSaludModerna from "./salud-moderna/ProductCarousel";

import HeaderFarmaciaCercana from "./farmacia-cercana/Header";
import HeroFarmaciaCercana from "./farmacia-cercana/Hero";
import ProductCardFarmaciaCercana from "./farmacia-cercana/ProductCard";
import CategoryCardFarmaciaCercana from "./farmacia-cercana/CategoryCard";
import FooterFarmaciaCercana from "./farmacia-cercana/Footer";
import CartLineItemFarmaciaCercana from "./farmacia-cercana/CartLineItem";
import ProductCarouselFarmaciaCercana from "./farmacia-cercana/ProductCarousel";

import HeaderPharmaPremium from "./pharma-premium/Header";
import HeroPharmaPremium from "./pharma-premium/Hero";
import ProductCardPharmaPremium from "./pharma-premium/ProductCard";
import CategoryCardPharmaPremium from "./pharma-premium/CategoryCard";
import FooterPharmaPremium from "./pharma-premium/Footer";
import CartLineItemPharmaPremium from "./pharma-premium/CartLineItem";
import ProductCarouselPharmaPremium from "./pharma-premium/ProductCarousel";

interface ThemeComponents {
  Header: ComponentType;
  Hero: ComponentType;
  Footer: ComponentType;
  ProductCard: ComponentType<{ product: Product }>;
  ProductCarousel: ComponentType<{ products: Product[] }>;
  CategoryCard: ComponentType<{ category: Category }>;
  CartLineItem: ComponentType<{ line: CartLine }>;
}

const REGISTRY: Record<Theme, ThemeComponents> = {
  "salud-moderna": {
    Header: HeaderSaludModerna,
    Hero: HeroSaludModerna,
    Footer: FooterSaludModerna,
    ProductCard: ProductCardSaludModerna,
    ProductCarousel: ProductCarouselSaludModerna,
    CategoryCard: CategoryCardSaludModerna,
    CartLineItem: CartLineItemSaludModerna,
  },
  "farmacia-cercana": {
    Header: HeaderFarmaciaCercana,
    Hero: HeroFarmaciaCercana,
    Footer: FooterFarmaciaCercana,
    ProductCard: ProductCardFarmaciaCercana,
    ProductCarousel: ProductCarouselFarmaciaCercana,
    CategoryCard: CategoryCardFarmaciaCercana,
    CartLineItem: CartLineItemFarmaciaCercana,
  },
  "pharma-premium": {
    Header: HeaderPharmaPremium,
    Hero: HeroPharmaPremium,
    Footer: FooterPharmaPremium,
    ProductCard: ProductCardPharmaPremium,
    ProductCarousel: ProductCarouselPharmaPremium,
    CategoryCard: CategoryCardPharmaPremium,
    CartLineItem: CartLineItemPharmaPremium,
  },
};

export function getThemeComponents(theme: Theme): ThemeComponents {
  return REGISTRY[theme] ?? REGISTRY["salud-moderna"];
}
