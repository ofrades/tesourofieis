export const FONT_FAMILIES = {
  reading: "Cardo_400Regular",
  readingItalic: "Cardo_400Regular_Italic",
  strong: "Cardo_700Bold",
  display: "DMSerifDisplay_400Regular",
  displayItalic: "DMSerifDisplay_400Regular_Italic",
  ui: "Inter_700Bold",
  uiMedium: "Inter_600SemiBold",
  uiBold: "Inter_700Bold",
} as const;

export const TYPE_SCALE = {
  body: { small: "text-sm", medium: "text-base", large: "text-lg" },
  h1: { small: "text-3xl", medium: "text-4xl", large: "text-5xl" },
  h2: { small: "text-2xl", medium: "text-3xl", large: "text-4xl" },
  h3: { small: "text-xl", medium: "text-2xl", large: "text-3xl" },
  h4: { small: "text-lg", medium: "text-xl", large: "text-2xl" },
  h5: { small: "text-base", medium: "text-lg", large: "text-xl" },
  h6: { small: "text-sm", medium: "text-base", large: "text-lg" },
} as const;
