import { useLocalSearchParams, usePathname } from "expo-router";
import type React from "react";
import { useCallback, useEffect, useRef } from "react";
import { Platform, ScrollView, View } from "react-native";
import { ScrollView as GestureScrollView } from "react-native-gesture-handler";
import { PageProvider, useIsNested } from "~/providers/page";
import { PrintablePage } from "~/providers/printing";

type PageWrapperProps = {
  children: React.ReactNode;
};

export default function PageWrapper({ children }: PageWrapperProps) {
  const isNested = useIsNested();
  const isWeb = Platform.OS === "web";
  const scrollViewRef = useRef<any>(null);
  const pathname = usePathname();
  const { anchor } = useLocalSearchParams();
  const anchorString = Array.isArray(anchor) ? anchor[0] : anchor;

  // Clear anchor registry when navigating to a new page
  useEffect(() => {
    if (Platform.OS !== "web") {
      (globalThis as any).anchorRegistry = {};
    }
  }, [pathname]);

  const scrollToAnchor = useCallback((anchorId: string) => {
    if (Platform.OS === "web") {
      // @ts-ignore - document exists on web
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
    } else {
      const anchorElement = (globalThis as any).anchorRegistry?.[anchorId];
      if (anchorElement && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: Math.max(0, anchorElement.yPosition - 100),
          animated: true,
        });
        return true;
      }
    }
    return false;
  }, []);

  useEffect(() => {
    if (!anchorString) return;

    // Try to scroll immediately, then retry with increasing delays
    // This handles cases where headings haven't registered yet
    const delays = [100, 300, 600, 1000];
    let attemptIndex = 0;

    const tryScroll = () => {
      if (scrollToAnchor(anchorString)) {
        return; // Success, stop trying
      }
      attemptIndex++;
      if (attemptIndex < delays.length) {
        setTimeout(tryScroll, delays[attemptIndex]);
      }
    };

    // Initial attempt after first delay
    const timeoutId = setTimeout(tryScroll, delays[0]);

    return () => clearTimeout(timeoutId);
  }, [anchorString, scrollToAnchor]);

  if (isNested) {
    return <PageProvider>{children}</PageProvider>;
  }

  const ScrollComponent = isWeb ? ScrollView : GestureScrollView;
  const content = <View className="flex-1 px-5">{children}</View>;
  const scrollContent = (
    <View className="flex-1 w-full web:lg:max-w-5xl web:lg:mx-auto" style={{ minHeight: "100%" }}>
      {content}
    </View>
  );

  return (
    <PrintablePage>
      <PageProvider>
        <ScrollComponent
          nativeID="reading-content"
          scrollEnabled
          removeClippedSubviews={false}
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {scrollContent}
        </ScrollComponent>
      </PageProvider>
    </PrintablePage>
  );
}
