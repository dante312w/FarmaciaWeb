import Link from "next/link";
import type { Category } from "@/types";
import DynamicIcon from "@/components/ui/DynamicIcon";

export default function CategoryCardSaludModerna({ category }: { category: Category }) {
  return (
    <Link
      href={`/catalogo?categoria=${category.slug}`}
      className="group flex flex-col items-start gap-3 rounded-2xl border border-slate-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-md"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
        <DynamicIcon name={category.icon} size={20} />
      </span>
      <div>
        <p className="text-sm font-semibold text-slate-800">{category.name}</p>
        <p className="mt-0.5 text-xs text-slate-400">{category.description}</p>
      </div>
    </Link>
  );
}
