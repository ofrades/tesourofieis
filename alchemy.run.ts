import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Effect from "effect/Effect";

export default Alchemy.Stack(
  "TesouroFieis",
  {
    providers: Cloudflare.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const stage = yield* Alchemy.Stage;
    const prod = stage === "prod";

    // Alchemy manages the apex domain. The existing proxied www record remains
    // on a Worker route and is redirected to the apex by the site worker.
    const customDomain = prod
      ? {
          domain: "tesourofieis.com",
          routes: [{ pattern: "www.tesourofieis.com/*" }],
        }
      : {};

    // Static Expo web export served by Cloudflare Workers Assets.
    // - unmatched paths fall through to main worker, which serves +not-found.html with a 404
    // - www→apex and trailing-slash 301s live in infra/site-worker.ts
    const site = yield* Cloudflare.Website.StaticSite("Website", {
      command: "bun run build:web:release",
      outdir: "dist",
      // The build command also removes native bundles and source maps from
      // dist/. Do not reuse a memoized directory that may predate that prune.
      memo: false,
      main: "./infra/site-worker.ts",
      ...customDomain,
      assets: {
        htmlHandling: "drop-trailing-slash",
        notFoundHandling: "none",
        runWorkerFirst: true,
      },
    }).pipe(Alchemy.RemovalPolicy.retain(prod));

    return { url: site.url };
  }),
);
