export type LiturgicalColorCode = "w" | "r" | "v" | "b" | "g" | "vw";

export type LiturgicalPalette = {
  accent: string;
  accentStrong: string;
  accentSoft: string;
  accentBorder: string;
};

type PalettePair = {
  light: LiturgicalPalette;
  dark: LiturgicalPalette;
};

const PALETTES = {
  w: {
    light: {
      accent: "#9a6d18",
      accentStrong: "#79530e",
      accentSoft: "#f5ecd2",
      accentBorder: "#d8b965",
    },
    dark: {
      accent: "#d9b765",
      accentStrong: "#ebce8c",
      accentSoft: "#493c22",
      accentBorder: "#a98535",
    },
  },
  vw: {
    light: {
      accent: "#9a6d18",
      accentStrong: "#79530e",
      accentSoft: "#f5ecd2",
      accentBorder: "#d8b965",
    },
    dark: {
      accent: "#d9b765",
      accentStrong: "#ebce8c",
      accentSoft: "#493c22",
      accentBorder: "#a98535",
    },
  },
  r: {
    light: {
      accent: "#9b3d3f",
      accentStrong: "#7d2d30",
      accentSoft: "#f4e0e1",
      accentBorder: "#d48385",
    },
    dark: {
      accent: "#d48385",
      accentStrong: "#e8b5b6",
      accentSoft: "#4a1a1c",
      accentBorder: "#9b3d3f",
    },
  },
  v: {
    light: {
      accent: "#6f4b8a",
      accentStrong: "#593b70",
      accentSoft: "#eee7f3",
      accentBorder: "#b9a2cd",
    },
    dark: {
      accent: "#c8a9dc",
      accentStrong: "#ddc5eb",
      accentSoft: "#3e3049",
      accentBorder: "#8966a4",
    },
  },
  g: {
    light: {
      accent: "#3a7d50",
      accentStrong: "#2d6240",
      accentSoft: "#e5f0e7",
      accentBorder: "#99c6a5",
    },
    dark: {
      accent: "#82bd92",
      accentStrong: "#a5d2b0",
      accentSoft: "#293c2d",
      accentBorder: "#4f8b5f",
    },
  },
  b: {
    light: {
      accent: "#5b5550",
      accentStrong: "#403b37",
      accentSoft: "#e8e4df",
      accentBorder: "#aaa29a",
    },
    dark: {
      accent: "#c8c0b8",
      accentStrong: "#e2dad2",
      accentSoft: "#393634",
      accentBorder: "#817970",
    },
  },
} satisfies Record<LiturgicalColorCode, PalettePair>;

const DEFAULT_COLOR: LiturgicalColorCode = "r";

export function getLiturgicalPalette(
  color: LiturgicalColorCode | undefined,
  isDark: boolean,
): LiturgicalPalette {
  return PALETTES[color ?? DEFAULT_COLOR][isDark ? "dark" : "light"];
}
