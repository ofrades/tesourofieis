import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Menu } from "lucide-react-native";
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
  const [activated, setActivated] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pointerFocus = useRef(false);
  const [host, setHost] = useState<Element | null>(null);
  const open = activated || hovered || focused;

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
    timer.current = setTimeout(
      () => {
        setHovered(next);
        if (!next) setActivated(false);
      },
      next ? 180 : 400,
    );
  };

  const content = (
    <div
      className={`edge-reveal edge-reveal-${edge}`}
      data-open={open}
      onMouseEnter={() => scheduleHover(true)}
      onMouseLeave={() => scheduleHover(false)}
      onPointerDownCapture={() => {
        pointerFocus.current = true;
        setFocused(false);
      }}
      onFocus={(event) => {
        if (
          !trigger.current?.contains(event.target) &&
          !pointerFocus.current &&
          event.target.matches(":focus-visible")
        )
          setFocused(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false);
          pointerFocus.current = false;
        }
      }}
      onKeyDown={(event) => {
        pointerFocus.current = false;
        if (event.target !== trigger.current && event.key !== "Escape") setFocused(true);
        if (event.key !== "Escape") return;
        event.stopPropagation();
        if (timer.current) clearTimeout(timer.current);
        setActivated(false);
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
        onClick={(event) => {
          if (timer.current) clearTimeout(timer.current);
          setHovered(false);
          setActivated(event.detail !== 0 && !open);
          setFocused(event.detail === 0 && !open);
        }}
      >
        <span style={{ backgroundColor: colors.screen, borderColor: colors.accentBorder }}>
          <Menu size={14} strokeWidth={1.5} color={colors.accent} />
        </span>
      </button>
      <div
        id={id}
        className="edge-reveal-panel"
        inert={!open}
        style={{ backgroundColor: colors.screen }}
      >
        {children}
      </div>
    </div>
  );
  return host ? createPortal(content, host) : content;
}
