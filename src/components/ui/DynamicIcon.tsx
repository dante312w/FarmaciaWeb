import { Pill, Sparkles, Leaf, Droplets, Baby, Cross, Package, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";

const ICON_MAP: Record<string, ComponentType<LucideProps>> = {
  Pill,
  Sparkles,
  Leaf,
  Droplets,
  Baby,
  Cross,
};

export default function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const IconComponent = ICON_MAP[name] || Package;
  return <IconComponent {...props} />;
}
