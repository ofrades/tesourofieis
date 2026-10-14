const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = withNativewind(getDefaultConfig(__dirname));

// The offline search corpus ships as an asset (`assets/*.searchdata`) so it is
// read on demand instead of being parsed into the launch bundle.
config.resolver.assetExts.push("searchdata");

// `lucide-react-native`'s package `exports` map exposes only the full barrel,
// and Metro does not tree-shake it, so importing the package root bundles all
// ~1,700 icons. Resolve per-icon subpaths straight to the ESM files instead so
// only the icons `src/components/icons.ts` re-exports reach the bundle.
const LUCIDE_ICON_PREFIX = "lucide-react-native/dist/esm/icons/";
const LUCIDE_ICON_DIR = path.join(
  __dirname,
  "node_modules",
  "lucide-react-native",
  "dist",
  "esm",
  "icons",
);

const defaultResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith(LUCIDE_ICON_PREFIX)) {
    const iconFile = path.join(
      LUCIDE_ICON_DIR,
      `${moduleName.slice(LUCIDE_ICON_PREFIX.length)}.js`,
    );
    return context.resolveRequest(context, iconFile, platform);
  }
  return (defaultResolveRequest ?? context.resolveRequest)(context, moduleName, platform);
};

module.exports = config;
