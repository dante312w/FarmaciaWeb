import Link from "next/link";
import type { Category } from "@/types";
import DynamicIcon from "@/components/ui/DynamicIcon";

export default function CategoryCardFarmaciaCercana({ category }: { category: Category }) {
  return (
    <Link
      href={`/catalogo?categoria=${category.slug}`}
      className="flex flex-col items-center gap-2 rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-orange-100 transition hover:-translate-y-1 hover:shadow-md"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-500">
        <DynamicIcon name={category.icon} size={24} />
      </span>
      <p className="text-sm font-bold text-orange-950">{category.name}</p>
    </Link>
  );
}
