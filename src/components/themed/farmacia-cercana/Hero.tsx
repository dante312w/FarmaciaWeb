import Link from "next/link";
import { Smile, Gift, MapPin } from "lucide-react";

export default function HeroFarmaciaCercana() {
  return (
    <section className="bg-orange-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-orange-500 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-orange-400/40" />
          <div className="absolute -bottom-14 -right-10 h-52 w-52 rounded-full bg-orange-400/40" />
          <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
            <Smile size={14} /> Prototipo demo
          </span>
          <h1 className="relative mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">
            ¡Todo lo que necesitas,
            <br /> a un clic de distancia!
          </h1>
          <p className="relative mx-auto mt-4 max-w-lg text-sm text-orange-50 sm:text-base">
            Productos de salud, cuidado personal y bienestar con la calidez de
            tu farmacia de barrio.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/catalogo"
              className="rounded-full bg-white px-7 py-3 text-sm font-bold text-orange-600 shadow-md transition hover:scale-105"
            >
              Comprar ahora
            </Link>
            <Link
              href="/catalogo"
              className="rounded-full border-2 border-white/70 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Ver categorías
            </Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
              <Gift size={18} />
            </span>
            <p className="text-sm font-semibold text-orange-900">Promos de la semana</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
              <MapPin size={18} />
            </span>
            <p className="text-sm font-semibold text-orange-900">Entrega rápida y cercana</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
              <Smile size={18} />
            </span>
            <p className="text-sm font-semibold text-orange-900">Compra fácil, sin complicaciones</p>
          </div>
        </div>
      </div>
    </section>
  );
}
