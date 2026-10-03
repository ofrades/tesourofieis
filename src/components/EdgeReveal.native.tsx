import type { ReactNode } from "react";

interface EdgeRevealProps {
  edge: "left" | "top";
  label: string;
  children: ReactNode;
}

export default function EdgeReveal({ children }: EdgeRevealProps) {
  return <>{children}</>;
}
