import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useAppTheme } from "~/theme";

interface EdgeRevealProps {
  edge: "left" | "top";
  label: string;
  children: ReactNode;
}

/** Desktop-only navigation that leaves the reading page stationary. */
export default function EdgeReveal({ edge, label, children }: EdgeRevealProps) {
  const { colors } = useAppTheme();
  const id = useId();
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [host, setHost] = useState<Element | null>(null);
  const open = pinned || hovered || focused;

  useEffect(() => {
    if (edge === "top") setHost(trigger.current?.closest(".web-reading-frame") ?? null);
  }, [edge]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const scheduleHover = (next: boolean) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setHovered(next), next ? 180 : 400);
  };

  const content = (
    <div
      className={`edge-reveal edge-reveal-${edge}`}
      data-open={open}
      onMouseEnter={() => scheduleHover(true)}
      onMouseLeave={() => scheduleHover(false)}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.stopPropagation();
        if (timer.current) clearTimeout(timer.current);
        setPinned(false);
        setHovered(false);
        setFocused(false);
        trigger.current?.focus();
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="edge-reveal-trigger"
        style={{ color: colors.accent }}
        aria-label={label}
        aria-controls={id}
        aria-expanded={open}
        aria-pressed={pinned}
        onClick={() => setPinned(!pinned)}
      >
        <span style={{ backgroundColor: colors.screen, borderColor: colors.accentBorder }}>
          {edge === "left" ? "☰" : "Navegação"}
        </span>
      </button>
      <div
        id={id}
        className="edge-reveal-panel"
        inert={!open}
        style={{ backgroundColor: colors.screen }}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        }}
      >
        {children}
      </div>
    </div>
  );
  return host ? createPortal(content, host) : content;
}
