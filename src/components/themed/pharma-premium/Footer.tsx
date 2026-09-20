export default function FooterPharmaPremium() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-center sm:px-6">
        <p className="text-sm font-light uppercase tracking-[0.3em] text-amber-400">
          Pharma Premium
        </p>
        <p className="text-xs text-neutral-500">
          Prototipo demo — Todos los productos son de demostración. © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
