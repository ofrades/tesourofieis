import { Printer } from "lucide-react-native";
import { useEffect } from "react";
import { useAppTheme } from "~/theme";
import { usePrintingAvailable } from "~/providers/printing";

let previousTitle: string | null = null;

function preparePrint() {
  if (document.getElementById("a4-print")) return;
  const content = Array.from(document.querySelectorAll('[id="reading-content"]')).find(
    (element) => element.getClientRects().length > 0 && !element.closest('[aria-hidden="true"]'),
  );
  if (!content) return;
  const title = content.querySelector('h1, [aria-level="1"]')?.textContent?.trim();
  if (title) {
    previousTitle = document.title;
    document.title = title;
  }

  // Isolate the visible page from the navigator's clipped and cached screens.
  const page = document.createElement("main");
  page.id = "a4-print";
  const table = document.createElement("table");
  table.className = "print-page-content";
  // Repeated table headers/footers reserve space inside the rule on every sheet.
  for (const section of [table.createTHead(), table.createTFoot()]) {
    section.insertRow().insertCell();
  }
  table.createTBody().insertRow().insertCell().append(content.cloneNode(true));
  page.append(table);
  document.body.append(page);
}

function finishPrint() {
  document.getElementById("a4-print")?.remove();
  if (previousTitle !== null) {
    document.title = previousTitle;
    previousTitle = null;
  }
}

interface PrintPageProps {
  iconOnly?: boolean;
}

export default function PrintPage({ iconOnly = false }: PrintPageProps) {
  const { colors } = useAppTheme();
  const available = usePrintingAvailable();

  useEffect(() => {
    if (!available) return;
    window.addEventListener("beforeprint", preparePrint);
    window.addEventListener("afterprint", finishPrint);
    return () => {
      window.removeEventListener("beforeprint", preparePrint);
      window.removeEventListener("afterprint", finishPrint);
      finishPrint();
    };
  }, [available]);

  const print = () => {
    finishPrint();
    preparePrint();
    window.print();
  };

  if (!available) return null;
  return (
    <button
      type="button"
      className={`reading-print-action${iconOnly ? " reading-print-action-icon" : ""}`}
      style={{ color: colors.accent }}
      aria-label="Imprimir ou guardar PDF em A4"
      onClick={print}
    >
      <Printer size={iconOnly ? 18 : 15} strokeWidth={1.5} color={colors.accent} />
      {!iconOnly && <span>Imprimir A4</span>}
    </button>
  );
}
