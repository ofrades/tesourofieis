import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";
import { FONT_FAMILIES } from "~/theme/typography";
import { initialCalendarDate } from "~/providers/initialDate";

export default function PageRoot({ children }: PropsWithChildren) {
  return (
    <html lang="pt">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `globalThis.__tesouroInitialDate=${JSON.stringify(initialCalendarDate)};`,
          }}
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Tesouro dos Fiéis</title>
        <meta
          name="description"
          content="Espaço dedicado à oração, exposição e preservação das santas tradições da Igreja."
        />
        <meta property="og:title" content="Tesouro dos Fiéis" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Espaço dedicado à oração, exposição e preservação das santas tradições da Igreja."
        />
        <meta property="og:site_name" content="Tesouro dos Fiéis" />
        <link rel="canonical" href="https://tesourofieis.com/" />
        <link rel="sitemap" href="/sitemap.xml" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <meta property="og:image" content="https://tesourofieis.com/og.png" />
        <meta property="twitter:image" content="https://tesourofieis.com/og.png" />
        <meta name="og:url" property="og:url" content="https://tesourofieis.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tesouro dos Fiéis" />
        <meta name="twitter:image:alt" content="Tesouro dos Fiéis" />
        <meta name="twitter:site" content="@tesourofieis" />
        <meta name="twitter:creator" content="@tesourofieis" />
        <meta name="twitter:domain" content="https://tesourofieis.com" />
        <meta
          name="keywords"
          content="Espaço dedicado à oração, exposição e preservação das santas tradições da Igreja"
        />
        <meta name="author" content="Tesouro dos Fiéis" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#32302f" />

        <style>
          {`
            body {
              font-family: '${FONT_FAMILIES.reading}', Georgia, 'Times New Roman', Times, serif;
              background-color: #eee6d9;
              color: #262624;
            }

            @media (prefers-color-scheme: dark) {
              body {
                background-color: #2b2b29;
                color: #eee6d9;
              }
            }
          `}
        </style>

        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
