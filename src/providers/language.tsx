import AsyncStorage from "@react-native-async-storage/async-storage";
import { Languages } from "~/components/icons";
import { SegmentedOption, SettingsSection } from "~/components/SettingsControls";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Platform, View } from "react-native";
import { useAppTheme } from "~/theme";

type Language = "latin" | "vernacular";

const STORAGE_KEY = "default_language";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLoading: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("vernacular");
  const [isLoading, setIsLoading] = useState(true);

  const loadLanguage = useCallback(async () => {
    try {
      if (Platform.OS !== "web") {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setLanguageState(stored as Language);
        }
      } else {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setLanguageState(stored as Language);
        }
      }
    } catch (error) {
      console.log("Error loading default language:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setLanguage = useCallback(async (lang: Language) => {
    try {
      setLanguageState(lang);
      if (Platform.OS !== "web") {
        await AsyncStorage.setItem(STORAGE_KEY, lang);
      } else {
        localStorage.setItem(STORAGE_KEY, lang);
      }
    } catch (error) {
      console.log("Error saving default language:", error);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadLanguage);
  }, [loadLanguage]);

  const value = useMemo(
    () => ({ language, setLanguage, isLoading }),
    [language, setLanguage, isLoading],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useDefaultLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useDefaultLanguage must be used within LanguageProvider");
  }
  return context.language;
};

const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguageContext must be used within LanguageProvider");
  }
  return context;
};

export const DefaultLanguageSelector = () => {
  const { colors } = useAppTheme();
  const { language, setLanguage, isLoading } = useLanguageContext();

  if (isLoading) {
    return (
      <SettingsSection
        icon={<Languages size={15} color={colors.textPrimary} />}
        title="Língua Padrão"
      >
        <View className="h-12 soft-background rounded-lg" />
      </SettingsSection>
    );
  }

  return (
    <SettingsSection
      icon={<Languages size={15} color={colors.textPrimary} />}
      title="Língua Padrão"
    >
      <SegmentedOption
        value={language}
        onChange={setLanguage}
        options={[
          { label: "Vernáculo", value: "vernacular" },
          { label: "Latim", value: "latin" },
        ]}
      />
    </SettingsSection>
  );
};
