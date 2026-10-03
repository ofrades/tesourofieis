import { burgundy, sepia } from "config";
import { useColorScheme } from "nativewind";
import { Platform } from "react-native";
import { useSyncExternalStore } from "react";
import { useCalendarDay } from "~/providers/calendar";
import { getLiturgicalPalette } from "~/theme/liturgical";

const emptySubscribe = () => () => {};

/**
 * react-native-web's `useColorScheme` seeds its state from `matchMedia`
 * during hydration. On the statically exported web app that mismatches the
 * prerendered (light) inline styles, and React then never rewrites those
 * DOM nodes — so scheme-colored chrome (drawer, header) stays light in
 * production. Clamp to the prerendered value until mounted so the first
 * client render matches; the post-mount flip is a real state change that
 * rewrites the styles.
 */
function useHydratedColorScheme() {
  const { colorScheme } = useColorScheme();
  const isServerRender = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true,
  );
  if (Platform.OS === "web" && isServerRender) {
    return "light";
  }
  return colorScheme ?? "light";
}

export { FONT_FAMILIES } from "./typography";

const THEME_COLORS = {
  sepia,
  burgundy,
} as const;

const isWeb = Platform.OS === "web";

/**
 * On web the semantic colors resolve to CSS custom properties (see
 * global.css) that switch on `prefers-color-scheme`. The statically
 * exported HTML ships these values inside prerendered inline styles, so
 * theme-dependent chrome is dark from first paint — before the JS bundle
 * loads. On native there is no CSS, so the JS values are used directly.
 */
const semanticColors = (isDark: boolean, accent: ReturnType<typeof getLiturgicalPalette>) =>
  isWeb
    ? {
        shell: "var(--theme-shell)",
        screen: "var(--theme-screen)",
        panel: "var(--theme-panel)",
        card: "var(--theme-card)",
        cardElevated: "var(--theme-card-elevated)",
        divider: "var(--theme-divider)",
        textPrimary: "var(--theme-text-primary)",
        textSecondary: "var(--theme-text-secondary)",
        textMuted: "var(--theme-text-muted)",
        textSubtle: sepia[500],
        icon: "var(--theme-icon)",
        accent: accent.accent,
        accentStrong: accent.accentStrong,
        accentSoft: accent.accentSoft,
        accentBorder: accent.accentBorder,
        selectedBg: "var(--theme-selected-bg)",
        selectedText: "var(--theme-selected-text)",
      }
    : {
        shell: isDark ? sepia[800] : sepia[200],
        screen: isDark ? sepia[900] : sepia[50],
        panel: isDark ? sepia[800] : sepia[200],
        card: isDark ? sepia[800] : sepia[100],
        cardElevated: isDark ? sepia[900] : sepia[50],
        divider: isDark ? sepia[700] : sepia[300],
        textPrimary: isDark ? sepia[100] : sepia[900],
        textSecondary: isDark ? sepia[200] : sepia[800],
        textMuted: isDark ? sepia[300] : sepia[600],
        textSubtle: sepia[500],
        icon: isDark ? sepia[300] : sepia[700],
        accent: accent.accent,
        accentStrong: accent.accentStrong,
        accentSoft: accent.accentSoft,
        accentBorder: accent.accentBorder,
        selectedBg: isDark ? sepia[200] : sepia[800],
        selectedText: isDark ? sepia[800] : sepia[200],
      };

export function useAppTheme() {
  const { setColorScheme, toggleColorScheme } = useColorScheme();
  const resolvedColorScheme = useHydratedColorScheme();
  const isDark = resolvedColorScheme === "dark";
  const day = useCalendarDay();
  const accent = getLiturgicalPalette(day.mass[0]?.color, isDark);

  return {
    colorScheme: resolvedColorScheme,
    isDark,
    setColorScheme,
    toggleColorScheme,
    colors: {
      ...THEME_COLORS,
      ...semanticColors(isDark, accent),
    },
  };
}
