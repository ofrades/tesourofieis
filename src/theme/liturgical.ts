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
      accentSoft: "#eedfd8",
      accentBorder: "#9b3d3f",
    },
    dark: {
      accent: "#9b3d3f",
      accentStrong: "#9b3d3f",
      accentSoft: "#4a1a1c",
      accentBorder: "#9b3d3f",
    },
  },
  v: {
    light: {
      accent: "#593080",
      accentStrong: "#482267",
      accentSoft: "#e8e1ee",
      accentBorder: "#735095",
    },
    dark: {
      accent: "#a47ad1",
      accentStrong: "#a47ad1",
      accentSoft: "#32223f",
      accentBorder: "#8054af",
    },
  },
  g: {
    light: {
      accent: "#226d35",
      accentStrong: "#185229",
      accentSoft: "#e3ece1",
      accentBorder: "#387347",
    },
    dark: {
      accent: "#3ca45c",
      accentStrong: "#3ca45c",
      accentSoft: "#203526",
      accentBorder: "#2f824a",
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
