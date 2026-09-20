import { Stethoscope } from "lucide-react";

export default function FooterSaludModerna() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Stethoscope size={16} />
          </span>
          <span className="text-sm font-bold text-slate-800">Salud Moderna</span>
        </div>
        <p className="text-xs text-slate-400">
          Prototipo demo — Todos los productos son de demostración. © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
