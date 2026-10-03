import { useFonts } from "expo-font";
import Head from "expo-router/head";
import { useEffect } from "react";
import { Platform, Pressable, View } from "react-native";
import { Typography } from "~/components/typography";
import "../global.css";
import { BookPlus, ChevronRight, Search, Menu, AlertTriangle } from "lucide-react-native";
import { burgundy } from "config";
import { useNavigation, usePathname, useRouter } from "expo-router";

import Drawer from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomDrawer from "~/components/Drawer";
import { SearchModalProvider, useSearchModal } from "~/components/Search";
import { COLORS } from "~/constants/Colors";
import { CalendarProvider } from "~/providers/calendar";
import { EditionProvider } from "~/providers/edition";
import { FontProvider } from "~/providers/fonts";
import { SettingsProvider } from "~/providers/settings";
import { PostHogProvider } from "posthog-react-native";
import { LanguageProvider } from "~/providers/language";
import { useAppTheme } from "~/theme";
import { useWebDesktop } from "~/hooks/useWebDesktop";

SplashScreen.preventAutoHideAsync();

export default function PageRootLayout() {
  const [loaded, error] = useFonts({
    Cardo_400Regular: require("~/assets/fonts/Cardo_400Regular.ttf"),
    Cardo_400Regular_Italic: require("~/assets/fonts/Cardo_400Regular_Italic.ttf"),
    Cardo_700Bold: require("~/assets/fonts/Cardo_700Bold.ttf"),
    DMSerifDisplay_400Regular: require("~/assets/fonts/DMSerifDisplay_400Regular.ttf"),
    DMSerifDisplay_400Regular_Italic: require("~/assets/fonts/DMSerifDisplay_400Regular_Italic.ttf"),
    Inter_400Regular: require("~/assets/fonts/Inter_400Regular.ttf"),
    Inter_600SemiBold: require("~/assets/fonts/Inter_600SemiBold.ttf"),
    Inter_700Bold: require("~/assets/fonts/Inter_700Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-sepia-200 dark:bg-sepia-900 p-4">
        <AlertTriangle size={48} color={burgundy[500]} />
        <Typography className="text-burgundy-700 dark:text-burgundy-300 text-center mt-4 font-display text-lg">
          Erro ao carregar fontes
        </Typography>
        <Typography className="text-sepia-600 dark:text-sepia-400 text-center mt-2">
          Reinicie a aplicação
        </Typography>
      </View>
    );
  }

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Tesouro dos Fiéis</title>
      </Head>
      <PostHogProvider
        apiKey="phc_Ng6Rsd9u1mXEatvYAJUwiLLd6Sl5uMX8Y6PgOrtPC9W"
        options={{
          host: "https://eu.i.posthog.com",
          enableSessionReplay: true,
        }}
        autocapture={{
          captureScreens: false, // expo-router requires this to be false and capture screens manually
          captureTouches: true,
          customLabelProp: "ph-my-label",
        }}
      >
        <FontProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <EditionProvider>
                  <CalendarProvider>
                    <LanguageProvider>
                      <SettingsProvider>
                        <SearchModalProvider>
                          <RootLayoutNav />
                        </SearchModalProvider>
                      </SettingsProvider>
                    </LanguageProvider>
                  </CalendarProvider>
                </EditionProvider>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </FontProvider>
      </PostHogProvider>
    </>
  );
}

function RootLayoutNav() {
  const isWeb = Platform.OS === "web";
  const { colors } = useAppTheme();

  if (isWeb) {
    return (
      <View className="flex-1 bg-sepia-200 dark:bg-sepia-800">
        <UpdateAwareDrawer />
        <StatusBar hidden />
      </View>
    );
  }

  // Inline style instead of className: NativeWind style application on the
  // codegen-based SafeAreaView silently drops every class in this
  // toolchain (flex-1 included), collapsing the whole app subtree to
  // zero height — a blank screen on launch. Inline styles are immune.
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.shell }}>
      <UpdateAwareDrawer />
      <StatusBar hidden />
    </SafeAreaView>
  );
}

function UpdateAwareDrawer() {
  const { colors } = useAppTheme();
  const isWebDesktop = useWebDesktop();

  // Backgrounds are CSS-driven (dark: classes) so the statically exported
  // HTML is dark from first paint; the header/scene/drawer wrappers stay
  // transparent and let the themed layers beneath them paint.
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        freezeOnBlur: true,
        header: ({ route }) => {
          const isRootScreen = ["index", "configurar"].includes(route.name);
          return <Header withBC={!isRootScreen} isWebDesktop={isWebDesktop} />;
        },
        sceneStyle: {
          backgroundColor: "transparent",
        },
        drawerType: isWebDesktop ? "permanent" : "slide",
        drawerStyle: {
          backgroundColor: "var(--theme-screen)",
          borderRightWidth: 1,
          borderRightColor: "var(--theme-divider)",
          width: 250,
        },
        drawerInactiveTintColor: COLORS["700"],
        drawerActiveTintColor: colors.accent,
      }}
    />
  );
}

const Breadcrumbs = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isWebDesktop = useWebDesktop();
  const { colors } = useAppTheme();

  const segments = pathname.split("/").filter((segment) => segment && segment !== "(tabs)");

  if (segments.length <= 1) {
    return null;
  }

  let displaySegments: string[] = segments;

  if (!isWebDesktop) {
    if (segments.length > 2) {
      displaySegments = [
        "...",
        segments[segments.length - 2] ?? "",
        segments[segments.length - 1] ?? "",
      ].filter(Boolean);
    }
  } else {
    if (segments.length > 4) {
      displaySegments = [
        "...",
        segments[segments.length - 3] ?? "",
        segments[segments.length - 2] ?? "",
        segments[segments.length - 1] ?? "",
      ].filter(Boolean);
    }
  }

  const formatSegmentName = (segment: string): string => {
    if (segment === "...") return "...";

    // Check if segment is a UUID using regex
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(segment)) {
      return `${segment.substring(0, 4)}...`;
    }

    // Check if it's a number (for IDs etc)
    if (/^\d+$/.test(segment)) {
      return `#${segment}`;
    }

    segment = segment.replace(/\(.*?\)/g, "");
    const formatted = segment
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Truncate very long segment names on mobile
    if (
      !isWebDesktop &&
      formatted.length > 15 &&
      segments.indexOf(segment) !== segments.length - 1
    ) {
      return `${formatted.substring(0, 15)}...`;
    }
    return formatted;
  };

  const handleBreadcrumbPress = (targetPath: string, isEllipsis: boolean) => {
    if (isEllipsis) return;
    router.push(targetPath as any);
  };

  return (
    <View className="flex-row items-center px-2 py-1 rounded-lg soft-background flex-shrink">
      {displaySegments.map((segment, index) => {
        const isEllipsis = segment === "...";

        let targetPath = "";
        if (!isEllipsis) {
          // Find the actual index of this segment in the original array
          // Since we might have identical segments, we need to be careful.
          // Working backwards from the end is safer since we kept the last N elements.
          const reverseIndex = displaySegments.length - 1 - index;
          const actualIndex = segments.length - 1 - reverseIndex;
          targetPath = `/${segments.slice(0, actualIndex + 1).join("/")}`;
        }

        return (
          <View className="flex-row items-center gap-1 flex-shrink" key={`${segment}-${index}`}>
            {index !== 0 && (
              <ChevronRight size={8} color={colors.accent} className="flex-shrink-0" />
            )}
            {index === displaySegments.length - 1 ? (
              <Typography
                className="font-display text-sm"
                style={{ color: colors.accent }}
                numberOfLines={1}
              >
                {formatSegmentName(segment)}
              </Typography>
            ) : (
              <Pressable
                className={`rounded px-1 py-0.5 flex-shrink ${!isEllipsis ? "active:bg-sepia-200 dark:active:bg-sepia-800" : ""}`}
                accessibilityRole="link"
                accessibilityLabel={formatSegmentName(segment)}
                disabled={isEllipsis}
                onPress={() => handleBreadcrumbPress(targetPath, isEllipsis)}
              >
                <Typography
                  className={`bold text-sm text-sepia-600 dark:text-sepia-400 ${!isEllipsis ? "underline" : ""}`}
                  numberOfLines={1}
                >
                  {formatSegmentName(segment)}
                </Typography>
              </Pressable>
            )}
          </View>
        );
      })}
    </View>
  );
};

export const Header = ({
  withBC,
  isWebDesktop = false,
}: {
  withBC: boolean;
  isWebDesktop?: boolean;
}) => {
  const router = useRouter();
  const navigation = useNavigation();
  const { toggleSearch } = useSearchModal();
  const { colors } = useAppTheme();

  // On web desktop sub-pages keep the app header visible with breadcrumbs and search.
  if (isWebDesktop && withBC) {
    return (
      <View className="flex-row items-center justify-between px-5 py-2.5 gap-3 border-b border-sepia-200 dark:border-sepia-700 medium-background w-full">
        <View className="flex-row items-center gap-3 flex-1 min-w-0">
          <Pressable
            className="flex items-center justify-center w-9 h-9 rounded-xl active:bg-sepia-200 dark:active:bg-sepia-700"
            onPress={() => router.navigate("/")}
            accessibilityRole="button"
            accessibilityLabel="Ir para Início"
          >
            <BookPlus size={18} color={colors.accent} />
          </Pressable>
          <Breadcrumbs />
        </View>

        <Pressable
          onPress={toggleSearch}
          className="flex items-center justify-center w-9 h-9 rounded-xl active:bg-sepia-400 dark:active:bg-sepia-700 soft-background"
          accessibilityRole="button"
          accessibilityLabel="Pesquisar"
        >
          <Search size={18} color={colors.accent} />
        </Pressable>
      </View>
    );
  }

  if (withBC) {
    return (
      <View className="flex-row items-center justify-between p-3 gap-2 medium-background w-full border-b border-sepia">
        <View className="flex-row items-center justify-between flex-1">
          <View className="flex-row gap-3 items-center shrink">
            <Pressable
              className="flex items-center justify-center w-9 h-9 rounded-xl active:bg-sepia-400 dark:active:bg-sepia-700 soft-background"
              accessibilityRole="button"
              accessibilityLabel="Abrir menu"
              hitSlop={6}
              // @ts-expect-error
              onPress={() => navigation.openDrawer()}
            >
              <Menu size={18} color={colors.accent} />
            </Pressable>

            <Pressable
              className="flex items-center justify-center w-9 h-9 rounded-xl active:bg-sepia-200 dark:active:bg-sepia-700"
              onPress={() => router.navigate("/")}
              accessibilityRole="button"
              accessibilityLabel="Ir para Início"
            >
              <BookPlus size={18} color={colors.accent} />
            </Pressable>
            <Breadcrumbs />
          </View>
          <Pressable
            onPress={toggleSearch}
            className="flex items-center justify-center w-9 h-9 rounded-xl active:bg-sepia-400 dark:active:bg-sepia-700 soft-background"
            accessibilityRole="button"
            accessibilityLabel="Pesquisar"
            hitSlop={6}
          >
            <Search size={18} color={colors.accent} />
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View
      className={`flex-row items-center justify-between w-full border-b border-sepia-300 dark:border-sepia-700 ${
        isWebDesktop ? "px-5 py-2.5 gap-3 medium-background" : "p-3 gap-2 medium-background"
      }`}
    >
      <View className={`flex-row items-center flex-1 ${isWebDesktop ? "gap-3 min-w-0" : "gap-2"}`}>
        {isWebDesktop ? null : (
          <Pressable
            className="flex items-center justify-center w-9 h-9 rounded-xl active:bg-sepia-400 dark:active:bg-sepia-700 soft-background"
            accessibilityRole="button"
            accessibilityLabel="Abrir menu"
            hitSlop={6}
            // @ts-expect-error
            onPress={() => navigation.openDrawer()}
          >
            <Menu size={18} color={colors.accent} />
          </Pressable>
        )}
        <Pressable
          className="flex items-center justify-center w-9 h-9 rounded-xl active:bg-sepia-200 dark:active:bg-sepia-700"
          onPress={() => router.navigate("/")}
          accessibilityRole="button"
          accessibilityLabel="Ir para Início"
        >
          <BookPlus size={18} color={colors.accent} />
        </Pressable>
      </View>
      <Pressable
        onPress={toggleSearch}
        accessibilityRole="button"
        accessibilityLabel="Pesquisar"
        hitSlop={6}
        className={`flex items-center justify-center w-9 h-9 rounded-xl dark:active:bg-sepia-700 soft-background ${
          isWebDesktop ? "active:bg-sepia-400" : "active:bg-sepia-100"
        }`}
      >
        <Search size={18} color={colors.accent} />
      </Pressable>
    </View>
  );
};
