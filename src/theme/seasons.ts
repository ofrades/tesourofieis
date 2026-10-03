import type { LiturgicalSeason } from "~/lib/domain";

/*
 * These are restrained UI accents derived from the traditional 1962 colors.
 * They are not replacements for the color of an individual Mass, which is
 * carried by the observance data and rendered on the Mass card.
 */

export type SeasonPalette = {
  accent: string;
  accentStrong: string;
  accentSoft: string;
  accentBorder: string;
};

type SeasonPalettePair = {
  light: SeasonPalette;
  dark: SeasonPalette;
};

const SEASON_PALETTES = {
  Advento: {
    light: {
      accent: "#6b4c83",
      accentStrong: "#573c73",
      accentSoft: "#ede7f2",
      accentBorder: "#b7a3cb",
    },
    dark: {
      accent: "#c4a7d8",
      accentStrong: "#d7c3e7",
      accentSoft: "#3d3048",
      accentBorder: "#85659f",
    },
  },
  Natal: {
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
  Epifania: {
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
  Septuagésima: {
    light: {
      accent: "#6b4c83",
      accentStrong: "#573c73",
      accentSoft: "#ede7f2",
      accentBorder: "#b7a3cb",
    },
    dark: {
      accent: "#c4a7d8",
      accentStrong: "#d7c3e7",
      accentSoft: "#3d3048",
      accentBorder: "#85659f",
    },
  },
  Quaresma: {
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
  Paixão: {
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
  "Semana Santa": {
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
  Páscoa: {
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
  Pentecostes: {
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
} satisfies Record<LiturgicalSeason, SeasonPalettePair>;

export function getSeasonPalette(season: LiturgicalSeason, isDark: boolean): SeasonPalette {
  return SEASON_PALETTES[season][isDark ? "dark" : "light"];
}
