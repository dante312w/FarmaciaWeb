import Link from "next/link";
import { ShieldCheck, Truck, Clock } from "lucide-react";

export default function HeroSaludModerna() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div className="animate-fade-in-up">
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            Prototipo demo · Salud Moderna
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Tu bienestar,
            <br /> más cerca de ti.
          </h1>
          <p className="mt-4 max-w-md text-base text-slate-500">
            Encuentra productos de salud, cuidado personal y bienestar con la
            confianza de una farmacia profesional.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/catalogo"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700"
            >
              Comprar ahora
            </Link>
            <Link
              href="/catalogo"
              className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
            >
              Ver categorías
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 text-xs text-slate-500">
            <div className="flex flex-col items-start gap-1.5">
              <ShieldCheck size={18} className="text-blue-600" />
              Compra segura
            </div>
            <div className="flex flex-col items-start gap-1.5">
              <Truck size={18} className="text-blue-600" />
              Envíos a todo el país
            </div>
            <div className="flex flex-col items-start gap-1.5">
              <Clock size={18} className="text-blue-600" />
              Atención rápida
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square w-full overflow-hidden rounded-3xl bg-white shadow-xl shadow-blue-100 ring-1 ring-slate-100">
            <img
              src="https://picsum.photos/seed/salud-hero/700/700"
              alt="Productos de salud y bienestar"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-slate-100">
            <p className="text-xs text-slate-400">Productos disponibles</p>
            <p className="text-lg font-bold text-slate-900">+20 referencias</p>
          </div>
        </div>
      </div>
    </section>
  );
}
