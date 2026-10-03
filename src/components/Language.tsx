import React, { useEffect, useMemo, useRef, useState } from "react";
/* eslint-disable react-hooks/immutability, react-hooks/set-state-in-effect */
import { Platform, Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  ScrollView as GestureScrollView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useDefaultLanguage } from "~/providers/language";
import { Typography } from "./typography";
import { PrintInlineProvider, usePrintBlock } from "~/providers/printing";
import { printBilingual } from "~/printing/markup";

type LanguageToggleProps = {
  children: React.ReactNode;
};

type ClassedElement = React.ReactElement<{ className?: string }>;

/** Parses a rendered child at the component boundary into its className contract. */
function isClassedElement(child: React.ReactNode): child is ClassedElement {
  if (!React.isValidElement(child)) return false;
  if (typeof child.props !== "object" || child.props === null) return false;
  for (const [key, value] of Object.entries(child.props)) {
    if (key === "className") {
      return typeof value === "string";
    }
  }
  return false;
}

const springConfig = {
  damping: 20,
  stiffness: 150,
  mass: 0.8,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
} as const;

const styles = StyleSheet.create({
  container:
    Platform.OS === "web"
      ? {}
      : {
          overflow: "hidden",
        },
  animatedContainer: {
    flexDirection: "row",
    alignItems: "stretch",
  },
});

export default function LanguageToggle({ children }: LanguageToggleProps) {
  const defaultLanguage = useDefaultLanguage();
  const printRef = useRef<View>(null);
  usePrintBlock(printRef, () => printBilingual(children));
  const { width: windowWidth } = useWindowDimensions();
  const [containerWidth, setContainerWidth] = useState(0);
  const widthRef = useRef(0);
  const [currentLang, setCurrentLang] = useState<"latin" | "vernacular">(defaultLanguage);

  const currentLanguage = useSharedValue<"latin" | "vernacular">(defaultLanguage);
  const translateX = useSharedValue(defaultLanguage === "vernacular" ? -1000 : 0);

  useEffect(() => {
    setCurrentLang(defaultLanguage);
    currentLanguage.value = defaultLanguage;
    if (widthRef.current > 0) {
      translateX.value = defaultLanguage === "vernacular" ? -widthRef.current : 0;
    }
  }, [defaultLanguage, currentLanguage, translateX]);

  const setLanguage = (vernacular: boolean) => {
    if (containerWidth === 0) return;
    const newLang = vernacular ? "vernacular" : "latin";
    setCurrentLang(newLang);
    currentLanguage.value = newLang;
    const targetContent = vernacular ? -containerWidth : 0;
    translateX.value = withSpring(targetContent, springConfig);
  };

  const startTranslate = useSharedValue(0);
  const panGesture = Gesture.Pan()
    .minPointers(1)
    .maxPointers(1)
    .activeOffsetX([-10, 10])
    .failOffsetY([-5, 5])
    .onStart(() => {
      startTranslate.value = translateX.value;
    })
    .onUpdate((event) => {
      if (containerWidth === 0) return;
      translateX.value = Math.max(
        -containerWidth,
        Math.min(0, startTranslate.value + event.translationX),
      );
    })
    .onEnd((event) => {
      if (containerWidth === 0) return;
      const dx = event.translationX;
      const vx = event.velocityX;
      const swipeThreshold = containerWidth * 0.25;
      const velocityThreshold = 500;
      if (dx < -swipeThreshold || vx < -velocityThreshold) {
        runOnJS(setLanguage)(true);
      } else if (dx > swipeThreshold || vx > velocityThreshold) {
        runOnJS(setLanguage)(false);
      } else {
        const midpoint = -containerWidth / 2;
        runOnJS(setLanguage)(translateX.value < midpoint);
      }
    });

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const { latinContent, vernacularContent } = useMemo(() => {
    const classedChildren = React.Children.toArray(children).filter(isClassedElement);
    return {
      latinContent: classedChildren.filter((child) =>
        (child.props.className ?? "").includes("latin"),
      ),
      vernacularContent: classedChildren.filter((child) =>
        (child.props.className ?? "").includes("vernacular"),
      ),
    };
  }, [children]);

  const onContainerLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    if (width > 0 && width !== containerWidth) {
      widthRef.current = width;
      setContainerWidth(width);
      const isVernacular = currentLanguage.value === "vernacular";
      translateX.value = isVernacular ? -width : 0;
    }
  };

  const isWeb = Platform.OS === "web";

  if (isWeb) {
    if (windowWidth < 768) {
      return (
        <View>
          <LanguageSelector selected={currentLang} onChange={setCurrentLang} />
          <View>{currentLang === "latin" ? latinContent : vernacularContent}</View>
        </View>
      );
    }
    const latinArray = React.Children.toArray(latinContent);
    const vernacularArray = React.Children.toArray(vernacularContent);
    const maxLength = Math.max(latinArray.length, vernacularArray.length);

    const pairs = Array.from({ length: maxLength }, (_, i) => ({
      latin: latinArray[i] || null,
      vernacular: vernacularArray[i] || null,
    }));

    return (
      <View>
        {pairs.map((pair, index) => (
          <View key={index} className="flex-row gap-4 print-language-pair">
            <View className="flex-1">{pair.latin}</View>
            <View className="flex-1">{pair.vernacular}</View>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View ref={printRef} onLayout={onContainerLayout} style={styles.container}>
      <PrintInlineProvider>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[contentStyle, { width: containerWidth * 2 }, styles.animatedContainer]}
          >
            <View
              style={{ flex: 1, width: containerWidth }}
              accessibilityElementsHidden={currentLang !== "latin"}
              importantForAccessibility={currentLang === "latin" ? "auto" : "no-hide-descendants"}
            >
              <GestureScrollView
                scrollEnabled
                removeClippedSubviews={false}
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                {latinContent}
              </GestureScrollView>
            </View>
            <View
              style={{ flex: 1, width: containerWidth }}
              accessibilityElementsHidden={currentLang !== "vernacular"}
              importantForAccessibility={
                currentLang === "vernacular" ? "auto" : "no-hide-descendants"
              }
            >
              <GestureScrollView
                scrollEnabled
                removeClippedSubviews={false}
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                {vernacularContent}
              </GestureScrollView>
            </View>
          </Animated.View>
        </GestureDetector>
        <LanguageSelector
          selected={currentLang}
          onChange={(language) => setLanguage(language === "vernacular")}
        />
      </PrintInlineProvider>
    </View>
  );
}

interface LanguageSelectorProps {
  selected: "latin" | "vernacular";
  onChange: (language: "latin" | "vernacular") => void;
}

function LanguageSelector({ selected, onChange }: LanguageSelectorProps) {
  return (
    <View className="flex-row justify-center gap-2 my-2">
      {(["latin", "vernacular"] as const).map((language) => (
        <Pressable
          key={language}
          accessibilityRole="button"
          accessibilityLabel={language === "latin" ? "Latim" : "Português"}
          accessibilityState={{ selected: selected === language }}
          onPress={() => onChange(language)}
          className={`min-h-11 items-center justify-center px-4 rounded-lg border border-sepia ${selected === language ? "soft-background" : "extreme-background"}`}
        >
          <Typography className="font-ui-medium text-sm">
            {language === "latin" ? "Latim" : "Português"}
          </Typography>
        </Pressable>
      ))}
    </View>
  );
}
