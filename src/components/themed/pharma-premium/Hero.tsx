import Link from "next/link";

export default function HeroPharmaPremium() {
  return (
    <section className="bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-0 sm:px-6 md:grid-cols-5">
        <div className="col-span-3 flex flex-col justify-center px-4 py-16 sm:px-0 sm:py-24">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400">
            Prototipo demo
          </span>
          <h1 className="mt-6 text-5xl font-light leading-[1.05] sm:text-6xl">
            Bienestar
            <br />
            <span className="font-serif italic text-amber-400">redefinido.</span>
          </h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-neutral-400">
            Una selección curada de productos de salud y cuidado personal,
            presentada como una experiencia de marca premium.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <Link
              href="/catalogo"
              className="border-b border-amber-400 pb-1 text-xs font-semibold uppercase tracking-widest text-amber-400 transition hover:text-white"
            >
              Comprar ahora
            </Link>
            <Link
              href="/catalogo"
              className="text-xs font-semibold uppercase tracking-widest text-neutral-400 transition hover:text-white"
            >
              Ver categorías →
            </Link>
          </div>
        </div>
        <div className="col-span-2 h-72 md:h-auto">
          <img
            src="https://picsum.photos/seed/pharma-premium-hero/900/1200"
            alt="Colección de bienestar premium"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
