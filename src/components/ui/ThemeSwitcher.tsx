"use client";

import { useTheme, THEME_INFO } from "@/context/ThemeContext";
import type { Theme } from "@/types";
import { ChevronDown } from "lucide-react";

const THEMES: Theme[] = ["salud-moderna", "farmacia-cercana", "pharma-premium"];

export default function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();

  return (
    <label
      className={`flex items-center gap-1.5 rounded-full border border-black/10 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm ${
        compact ? "" : ""
      }`}
      title="Herramienta de demostración: cambia entre las 3 propuestas visuales"
    >
      <span className="hidden sm:inline text-slate-400">Diseño:</span>
      <span className="relative flex items-center">
        <select
          aria-label="Cambiar propuesta visual"
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
          className="appearance-none bg-transparent pr-4 text-xs font-semibold text-slate-700 focus:outline-none"
        >
          {THEMES.map((t) => (
            <option key={t} value={t}>
              {THEME_INFO[t].name}
            </option>
          ))}
        </select>
        <ChevronDown size={12} className="pointer-events-none absolute right-0 text-slate-400" />
      </span>
    </label>
  );
}
