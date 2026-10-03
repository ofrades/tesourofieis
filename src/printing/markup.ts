import { Children, isValidElement, type ReactNode } from "react";

interface PrintTextProps {
  children?: ReactNode;
  className?: string;
  text?: string;
}

export function escapePrintText(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function printInline(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      // oxlint-disable-next-line anti-slop/no-runtime-typeof -- Parse React's text-node union at the HTML serialization boundary.
      if (typeof child === "string" || typeof child === "number")
        return escapePrintText(String(child));
      if (!isValidElement<PrintTextProps>(child)) return "";
      const classes = child.props.className ?? "";
      const content = printInline(child.props.children ?? child.props.text);
      const rubric = /\b(response|versicle|cross|link)\b/.test(classes);
      const italic = /\b(aside|em|font-italic)\b/.test(classes);
      return `<span${rubric ? ' class="rubric"' : ""}${italic ? ' style="font-style:italic"' : ""}>${content}</span>`;
    })
    .join("");
}

export function printBilingual(children: ReactNode) {
  const elements = Children.toArray(children).filter(isValidElement<PrintTextProps>);
  const latin = elements.filter((child) => child.props.className?.includes("latin"));
  const vernacular = elements.filter((child) => child.props.className?.includes("vernacular"));
  return `<table class="bilingual"><tbody>${Array.from(
    { length: Math.max(latin.length, vernacular.length) },
    (_, i) => `<tr><td>${printInline(latin[i])}</td><td>${printInline(vernacular[i])}</td></tr>`,
  ).join("")}</tbody></table>`;
}

export function printFileName(title: string) {
  return (
    title
      // oxlint-disable-next-line eslint/no-control-regex -- Strip control characters that are invalid in filenames.
      .replace(/[\\/:*?"<>|\u0000-\u001f]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 120) || "Tesouro dos Fiéis"
  );
}

export function printDocument(content: string, fontData?: string, title = "Tesouro dos Fiéis") {
  return `<!DOCTYPE html><html lang="pt"><head><meta charset="utf-8"><title>${escapePrintText(title)}</title><meta name="viewport" content="width=device-width,initial-scale=1"><style>
    ${fontData ? `@font-face { font-family:Cardo; src:url(data:font/ttf;base64,${fontData}) format('truetype'); }` : ""}
    @page { size:A4 portrait; margin:22mm 20mm; }
    body { margin:0; color:#222; font:12pt/1.5 Cardo,Georgia,"Times New Roman",serif; }
    .frame { position:fixed; inset:0; border:2px solid #9b3d3f; pointer-events:none; }
    .frame::after { content:""; position:absolute; inset:3px; border:1px solid #9b3d3f; }
    .page { width:100%; border-collapse:collapse; table-layout:fixed; }
    .page > thead { display:table-header-group; } .page > tfoot { display:table-footer-group; }
    .page > thead td,.page > tfoot td { height:6mm; padding:0; }
    .page > tbody > tr > td { padding:0 6mm; vertical-align:top; }
    h1,h2,h3,h4,h5,h6 { color:#9b3d3f; text-align:center; break-after:avoid; font-weight:normal; }
    h1 { font-size:24pt; } p { margin:0 0 3mm; orphans:3; widows:3; }
    .rubric { color:#9b3d3f; } .bilingual { width:100%; table-layout:fixed; border-collapse:collapse; }
    .bilingual td { width:50%; padding:2mm; vertical-align:top; } .bilingual tr { break-inside:avoid; }
    img { display:block; max-width:100%; height:70mm; object-fit:contain; margin:4mm auto; break-inside:avoid; }
  </style></head><body><div class="frame"></div><table class="page"><thead><tr><td></td></tr></thead><tbody><tr><td>${content}</td></tr></tbody><tfoot><tr><td></td></tr></tfoot></table></body></html>`;
}
