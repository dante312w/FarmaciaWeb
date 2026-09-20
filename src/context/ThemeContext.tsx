"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Theme } from "@/types";
import { getStoredTheme, saveTheme, initStorage } from "@/lib/storage";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  ready: boolean;
}

const DEFAULT_THEME: Theme = "salud-moderna";

function isTheme(value: string | null): value is Theme {
  return value === "salud-moderna" || value === "farmacia-cercana" || value === "pharma-premium";
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  ready: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initStorage();
    const stored = getStoredTheme();
    if (isTheme(stored)) setThemeState(stored);
    setReady(true);
  }, []);

  function setTheme(next: Theme) {
    setThemeState(next);
    saveTheme(next);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, ready }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export const THEME_INFO: Record<
  Theme,
  { name: string; tagline: string; description: string }
> = {
  "salud-moderna": {
    name: "Salud Moderna",
    tagline: "Profesional y confiable",
    description:
      "Diseño limpio y minimalista inspirado en clínicas modernas y plataformas SaaS premium.",
  },
  "farmacia-cercana": {
    name: "Farmacia Cercana",
    tagline: "Cercana y fácil de usar",
    description:
      "Diseño cálido y amigable, pensado para una experiencia de compra sencilla y accesible.",
  },
  "pharma-premium": {
    name: "Pharma Premium",
    tagline: "Elegante y editorial",
    description:
      "Composición editorial de alto contraste, propia de una marca de bienestar premium.",
  },
};
