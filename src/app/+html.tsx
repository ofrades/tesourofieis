import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";
import { FONT_FAMILIES } from "~/theme/typography";
import { initialCalendarDate } from "~/providers/initialDate";

/**
 * Document shell shared by every static route. Route-specific metadata lives in
 * `src/components/Seo.tsx`; only tags that never change per route belong here.
 */
export default function PageRoot({ children }: PropsWithChildren) {
  return (
    <html lang="pt-PT">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `globalThis.__tesouroInitialDate=${JSON.stringify(initialCalendarDate)};`,
          }}
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="sitemap" href="/sitemap.xml" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
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
