import type { ConfigContext, ExpoConfig } from "expo/config";

const isDevelopment = process.env.APP_VARIANT === "development";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: isDevelopment ? "Tesouro dos Fiéis (Dev)" : "Tesouro dos Fiéis",
  description: "Espaço dedicado à oração, exposição e preservação das santas tradições da Igreja.",
  slug: "tesourofieis",
  scheme: "com.tesourofieis.app",
  platforms: ["android", "web", "ios"],
  githubUrl: "https://github.com/tesourofieis/tesourofieis",
  version: "1.3.3",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "automatic",
  updates: {
    enabled: true,
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/22ae55e2-5e39-4f06-ad1a-3f96776bdc75",
    enableBsdiffPatchSupport: true,
  },
  runtimeVersion: {
    policy: "appVersion",
  },
  assetBundlePatterns: ["**/*"],
  android: {
    versionCode: 23,
    package: isDevelopment ? "com.tesourofieis.app.dev" : "com.tesourofieis.app",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#1d2021",
    },
    intentFilters: [
      {
        action: "VIEW",
        autoVerify: true,
        data: [
          {
            scheme: "https",
            host: "tesourofieis.com",
            pathPrefix: "/",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
      },
    ],
  },
  ios: {
    bundleIdentifier: "com.tesourofieis.com",
    icon: {
      dark: "./assets/images/ios-dark.png",
      light: "./assets/images/ios-light.png",
      tinted: "./assets/images/ios-tinted.png",
    },
    associatedDomains: ["applinks:tesourofieis.com"],
    userInterfaceStyle: "automatic",
    supportsTablet: true,
    config: {
      usesNonExemptEncryption: false,
    },
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./public/favicon.png",
  },
  extra: {
    eas: {
      projectId: "22ae55e2-5e39-4f06-ad1a-3f96776bdc75",
    },
  },
  plugins: [
    [
      "expo-router",
      {
        asyncRoutes: { web: true },
        sitemap: true,
        origin: "https://tesourofieis.com",
      },
    ],
    [
      "expo-font",
      {
        fonts: [
          "./assets/fonts/Cardo_700Bold.ttf",
          "./assets/fonts/Cardo_400Regular.ttf",
          "./assets/fonts/DMSerifDisplay_400Regular.ttf",
          "./assets/fonts/DMSerifDisplay_400Regular_Italic.ttf",
        ],
      },
    ],
    [
      "expo-notifications",
      {
        icon: "./assets/images/notifications.png",
      },
    ],
    "expo-localization",
    "expo-status-bar",
    "expo-secure-store",
    "expo-image",
    "expo-web-browser",
    [
      "expo-navigation-bar",
      {
        hidden: true,
      },
    ],
    [
      "expo-splash-screen",
      {
        backgroundColor: "#eee6d9",
        image: "./assets/images/splash.png",
        dark: {
          backgroundColor: "#1d2021",
        },
      },
    ],

    [
      "expo-asset",
      {
        assets: [
          "./assets/images/station1.png",
          "./assets/images/station2.png",
          "./assets/images/station3.png",
          "./assets/images/station4.png",
          "./assets/images/station5.png",
          "./assets/images/station6.png",
          "./assets/images/station7.png",
          "./assets/images/station8.png",
          "./assets/images/station9.png",
          "./assets/images/station10.png",
          "./assets/images/station11.png",
          "./assets/images/station12.png",
          "./assets/images/station13.png",
          "./assets/images/station14.png",
          "./assets/images/station14.png",
          "./assets/images/cross.png",
          "./assets/images/1.jpeg",
          "./assets/images/angelus.jpg",
        ],
      },
    ],
  ],
});
