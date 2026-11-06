import Head from "expo-router/head";
import { usePathname } from "expo-router";
import { getSeo, SITE_IMAGE, SITE_NAME } from "~/services/seo";

/**
 * Per-route document head. `usePathname` resolves during the static export, so
 * every generated HTML file gets its own title, description and canonical
 * instead of the one hardcoded in `+html.tsx`.
 */
export function Seo() {
  const pathname = usePathname();
  const seo = getSeo(pathname);

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="robots" content={seo.robots} />
      <link rel="canonical" href={seo.canonical} />

      <meta property="og:type" content={seo.ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="pt_PT" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:image" content={SITE_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seo.title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={SITE_IMAGE} />
      <meta name="twitter:image:alt" content={seo.title} />

      {seo.jsonLd.length > 0 ? <script type="application/ld+json">{seo.jsonLd}</script> : null}
    </Head>
  );
}
