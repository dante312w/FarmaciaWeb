"use client";

import type { ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";
import { getThemeComponents } from "@/components/themed";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const { theme, ready } = useTheme();
  const { Header, Footer } = getThemeComponents(theme);

  if (!ready) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
