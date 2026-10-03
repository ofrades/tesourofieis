import { type PropsWithChildren, type RefObject } from "react";

export interface PrintMeasure {
  measureInWindow(callback: (x: number, y: number, width: number, height: number) => void): void;
}

export function PrintingProvider({ children }: PropsWithChildren) {
  return children;
}
export function PrintablePage({ children }: PropsWithChildren) {
  return children;
}
export function PrintInlineProvider({ children }: PropsWithChildren) {
  return children;
}
export function usePrintBlock(
  _ref: RefObject<PrintMeasure | null>,
  _html: () => string | Promise<string>,
) {}
