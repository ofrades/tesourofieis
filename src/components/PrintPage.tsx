import { Printer } from "lucide-react-native";
import { useEffect } from "react";
import { useAppTheme } from "~/theme";

function preparePrint() {
  if (document.getElementById("a4-print")) return;
  const content = Array.from(document.querySelectorAll('[id="reading-content"]')).find(
    (element) => element.getClientRects().length > 0 && !element.closest('[aria-hidden="true"]'),
  );
  if (!content) return;

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
}

export default function PrintPage() {
  const { colors } = useAppTheme();

  useEffect(() => {
    window.addEventListener("beforeprint", preparePrint);
    window.addEventListener("afterprint", finishPrint);
    return () => {
      window.removeEventListener("beforeprint", preparePrint);
      window.removeEventListener("afterprint", finishPrint);
    };
  }, []);

  const print = () => {
    finishPrint();
    preparePrint();
    window.print();
  };

  return (
    <button
      type="button"
      className="reading-print-action"
      style={{ color: colors.accent }}
      aria-label="Imprimir ou guardar PDF em A4"
      onClick={print}
    >
      <Printer size={15} strokeWidth={1.5} color={colors.accent} />
      <span>Imprimir A4</span>
    </button>
  );
}
