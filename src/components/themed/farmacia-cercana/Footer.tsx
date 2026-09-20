import { Heart } from "lucide-react";

export default function FooterFarmaciaCercana() {
  return (
    <footer className="bg-orange-500 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-center sm:px-6">
        <div className="flex items-center justify-center gap-2">
          <Heart size={16} fill="white" />
          <span className="text-sm font-extrabold">Farmacia Cercana</span>
        </div>
        <p className="text-xs text-orange-100">
          Prototipo demo — Todos los productos son de demostración. © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
