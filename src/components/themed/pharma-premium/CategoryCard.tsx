import Link from "next/link";
import type { Category } from "@/types";

export default function CategoryCardPharmaPremium({ category }: { category: Category }) {
  return (
    <Link
      href={`/catalogo?categoria=${category.slug}`}
      className="group relative flex h-40 items-end overflow-hidden bg-neutral-900 p-5"
    >
      <img
        src={`https://picsum.photos/seed/${category.slug}/500/400`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-500 group-hover:scale-110 group-hover:opacity-40"
      />
      <p className="relative text-sm font-medium uppercase tracking-wider text-white">
        {category.name}
      </p>
    </Link>
  );
}
