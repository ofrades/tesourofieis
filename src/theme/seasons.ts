import type { LiturgicalSeason } from "~/lib/domain";

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
  "Semana Santa": {
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
} satisfies Record<LiturgicalSeason, SeasonPalettePair>;

export function getSeasonPalette(season: LiturgicalSeason, isDark: boolean): SeasonPalette {
  return SEASON_PALETTES[season][isDark ? "dark" : "light"];
}
