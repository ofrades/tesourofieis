import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
  type RefObject,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useFocusEffect } from "expo-router";

interface PrintingState {
  active: RefObject<string | null>;
  setAvailable: Dispatch<SetStateAction<boolean>>;
}
const PrintingContext = createContext<PrintingState | null>(null);
const PrintingAvailableContext = createContext(false);

export interface PrintMeasure {
  measureInWindow(callback: (x: number, y: number, width: number, height: number) => void): void;
}

export function PrintingProvider({ children }: PropsWithChildren) {
  const active = useRef<string | null>(null);
  const [available, setAvailable] = useState(false);
  const value = useMemo(() => ({ active, setAvailable }), []);
  return (
    <PrintingContext value={value}>
      <PrintingAvailableContext value={available}>{children}</PrintingAvailableContext>
    </PrintingContext>
  );
}
export function PrintablePage({ children }: PropsWithChildren) {
  const printing = useContext(PrintingContext);
  const id = useId();
  useFocusEffect(
    useCallback(() => {
      if (!printing) return;
      printing.active.current = id;
      printing.setAvailable(true);
      return () => {
        if (printing.active.current === id) {
          printing.active.current = null;
          printing.setAvailable(false);
        }
      };
    }, [printing, id]),
  );
  return children;
}
export function PrintInlineProvider({ children }: PropsWithChildren) {
  return children;
}
export function usePrintBlock(
  _ref: RefObject<PrintMeasure | null>,
  _html: () => string | Promise<string>,
  _title?: string,
) {}

export function usePrintingAvailable() {
  return useContext(PrintingAvailableContext);
}
