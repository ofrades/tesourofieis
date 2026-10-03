import { useFocusEffect } from "expo-router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
  type RefObject,
  type Dispatch,
  type SetStateAction,
} from "react";

export interface PrintMeasure {
  measureInWindow(callback: (x: number, y: number, width: number, height: number) => void): void;
}

interface PrintBlock {
  ref: RefObject<PrintMeasure | null>;
  html: () => string | Promise<string>;
}

type CollectPrint = () => Promise<string>;
interface PrintingState {
  active: RefObject<CollectPrint | null>;
  setAvailable: Dispatch<SetStateAction<boolean>>;
}

const PrintingContext = createContext<PrintingState | null>(null);
const PrintBlocksContext = createContext<Map<string, PrintBlock> | null>(null);
const PrintInlineContext = createContext(false);
const PrintingAvailableContext = createContext(false);

export function PrintingProvider({ children }: PropsWithChildren) {
  const active = useRef<CollectPrint | null>(null);
  const [available, setAvailable] = useState(false);
  const value = useMemo(() => ({ active, setAvailable }), []);
  return (
    <PrintingContext value={value}>
      <PrintingAvailableContext value={available}>{children}</PrintingAvailableContext>
    </PrintingContext>
  );
}

function measureBlock(block: PrintBlock): Promise<number> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(Number.POSITIVE_INFINITY), 250);
    if (!block.ref.current) {
      clearTimeout(timeout);
      resolve(Number.POSITIVE_INFINITY);
      return;
    }
    block.ref.current.measureInWindow((_x, y) => {
      clearTimeout(timeout);
      resolve(y);
    });
  });
}

export function PrintablePage({ children }: PropsWithChildren) {
  const printing = useContext(PrintingContext);
  const blocks = useMemo(() => new Map<string, PrintBlock>(), []);
  const collect = useCallback(async () => {
    const measured = await Promise.all(
      Array.from(blocks.values(), async (block, order) => ({
        y: await measureBlock(block),
        order,
        html: await block.html(),
      })),
    );
    return measured
      .sort((a, b) => a.y - b.y || a.order - b.order)
      .map((block) => block.html)
      .join("");
  }, [blocks]);
  useFocusEffect(
    useCallback(() => {
      if (!printing) return;
      printing.active.current = collect;
      printing.setAvailable(true);
      return () => {
        if (printing.active.current === collect) {
          printing.active.current = null;
          printing.setAvailable(false);
        }
      };
    }, [printing, collect]),
  );
  return <PrintBlocksContext value={blocks}>{children}</PrintBlocksContext>;
}

export function PrintInlineProvider({ children }: PropsWithChildren) {
  return <PrintInlineContext value={true}>{children}</PrintInlineContext>;
}

export function usePrintBlock(
  ref: RefObject<PrintMeasure | null>,
  html: () => string | Promise<string>,
) {
  const blocks = useContext(PrintBlocksContext);
  const inline = useContext(PrintInlineContext);
  const id = useId();
  useEffect(() => {
    if (!blocks || inline) return;
    blocks.set(id, { ref, html });
    return () => {
      blocks.delete(id);
    };
  }, [blocks, inline, id, ref, html]);
}

export function useCollectPrint() {
  const printing = useContext(PrintingContext);
  return async () => {
    if (!printing?.active.current) throw new Error("Esta página não tem conteúdo para imprimir.");
    const content = await printing.active.current();
    if (!content) throw new Error("Esta página não tem conteúdo para imprimir.");
    return content;
  };
}

export function usePrintingAvailable() {
  return useContext(PrintingAvailableContext);
}
