import { Platform, Text } from "react-native";
import { useRef } from "react";
import { usePrintBlock } from "~/providers/printing";
import { escapePrintText } from "~/printing/markup";
import { useFontContext } from "~/providers/fonts";
import { TYPE_SCALE } from "~/theme/typography";
import { useAppTheme } from "~/theme";

type HeadingProps = {
  text: string;
  id?: string;
  className?: string;
};

function usePrintHeading(text: string, level: number) {
  const ref = useRef<Text>(null);
  usePrintBlock(ref, () => `<h${level}>${escapePrintText(text)}</h${level}>`);
  return ref;
}

function useHeadingId(text: string, id?: string): string {
  return (
    id ||
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  );
}

function registerAnchor(anchorId: string, yPosition: number) {
  if (Platform.OS !== "web") {
    if (!(globalThis as any).anchorRegistry) {
      (globalThis as any).anchorRegistry = {};
    }
    (globalThis as any).anchorRegistry[anchorId] = { yPosition };
  }
}

export function H1({ text, id, className = "" }: HeadingProps) {
  const printRef = usePrintHeading(text, 1);
  const { fontSize } = useFontContext();
  const { colors } = useAppTheme();
  const anchorId = useHeadingId(text, id);
  return (
    <Text
      accessibilityRole="header"
      aria-level={1}
      ref={printRef}
      nativeID={anchorId}
      onLayout={(e) => registerAnchor(anchorId, e.nativeEvent.layout.y)}
      className={`font-display tracking-wide text-center py-5 ${TYPE_SCALE.h1[fontSize]} ${className}`}
      style={{ color: colors.accent }}
    >
      {text}
    </Text>
  );
}

export function H2({ text, id, className = "" }: HeadingProps) {
  const printRef = usePrintHeading(text, 2);
  const { fontSize } = useFontContext();
  const anchorId = useHeadingId(text, id);
  return (
    <Text
      accessibilityRole="header"
      aria-level={2}
      ref={printRef}
      nativeID={anchorId}
      onLayout={(e) => registerAnchor(anchorId, e.nativeEvent.layout.y)}
      className={`font-display text-center text-sepia-800 dark:text-sepia-200 pt-8 pb-2 ${TYPE_SCALE.h2[fontSize]} ${className}`}
    >
      {text}
    </Text>
  );
}

export function H3({ text, id, className = "" }: HeadingProps) {
  const printRef = usePrintHeading(text, 3);
  const { fontSize } = useFontContext();
  const anchorId = useHeadingId(text, id);
  return (
    <Text
      accessibilityRole="header"
      aria-level={3}
      ref={printRef}
      nativeID={anchorId}
      onLayout={(e) => registerAnchor(anchorId, e.nativeEvent.layout.y)}
      className={`font-display text-center text-sepia-500 dark:text-sepia-400 pt-7 pb-1 ${TYPE_SCALE.h3[fontSize]} ${className}`}
    >
      {text}
    </Text>
  );
}

export function H4({ text, id, className = "" }: HeadingProps) {
  const printRef = usePrintHeading(text, 4);
  const { fontSize } = useFontContext();
  const anchorId = useHeadingId(text, id);
  return (
    <Text
      accessibilityRole="header"
      aria-level={4}
      ref={printRef}
      nativeID={anchorId}
      onLayout={(e) => registerAnchor(anchorId, e.nativeEvent.layout.y)}
      className={`font-display text-center text-sepia-700 dark:text-sepia-300 pt-5 pb-1 ${TYPE_SCALE.h4[fontSize]} ${className}`}
    >
      {text}
    </Text>
  );
}

export function H5({ text, id, className = "" }: HeadingProps) {
  const printRef = usePrintHeading(text, 5);
  const { fontSize } = useFontContext();
  const anchorId = useHeadingId(text, id);
  return (
    <Text
      accessibilityRole="header"
      aria-level={5}
      ref={printRef}
      nativeID={anchorId}
      onLayout={(e) => registerAnchor(anchorId, e.nativeEvent.layout.y)}
      className={`font-display text-center text-sepia-600 dark:text-sepia-400 pt-4 pb-0.5 ${TYPE_SCALE.h5[fontSize]} ${className}`}
    >
      {text}
    </Text>
  );
}

export function H6({ text, id, className = "" }: HeadingProps) {
  const printRef = usePrintHeading(text, 6);
  const { fontSize } = useFontContext();
  const anchorId = useHeadingId(text, id);
  return (
    <Text
      accessibilityRole="header"
      aria-level={6}
      ref={printRef}
      nativeID={anchorId}
      onLayout={(e) => registerAnchor(anchorId, e.nativeEvent.layout.y)}
      className={`font-display text-center text-sepia-500 dark:text-sepia-500 pt-3 pb-0.5 ${TYPE_SCALE.h6[fontSize]} ${className}`}
    >
      {text}
    </Text>
  );
}
