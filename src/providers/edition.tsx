import AsyncStorage from "@react-native-async-storage/async-storage";
import type { CalendarEdition } from "~/lib/domain";
import { CALENDARS } from "~/lib/calendars";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";

const STORAGE_KEY = "calendar_edition";

type EditionContextType = {
  edition: CalendarEdition;
  setEdition: (edition: CalendarEdition) => void;
  isLoading: boolean;
};

const EditionContext = createContext<EditionContextType | undefined>(undefined);

function isValidEdition(value: string): value is CalendarEdition {
  return value in CALENDARS;
}

export const EditionProvider = ({ children }: { children: React.ReactNode }) => {
  const [edition, setEditionState] = useState<CalendarEdition>("62");
  const [isLoading, setIsLoading] = useState(true);

  const loadEdition = useCallback(async () => {
    try {
      const stored =
        Platform.OS !== "web"
          ? await AsyncStorage.getItem(STORAGE_KEY)
          : localStorage.getItem(STORAGE_KEY);
      // Reject unknown/stale values (e.g. the removed "all" selection).
      if (stored && isValidEdition(stored)) {
        setEditionState(stored);
      }
    } catch (error) {
      console.log("Error loading calendar edition:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setEdition = useCallback(async (next: CalendarEdition) => {
    try {
      setEditionState(next);
      if (Platform.OS !== "web") {
        await AsyncStorage.setItem(STORAGE_KEY, next);
      } else {
        localStorage.setItem(STORAGE_KEY, next);
      }
      // Notification re-sync happens automatically: CalendarProvider
      // rebuilds its calendar for the new edition, and SettingsProvider's
      // syncNotifications effect (keyed on `calendar`) cancels and
      // reschedules everything.
    } catch (error) {
      console.log("Error saving calendar edition:", error);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadEdition);
  }, [loadEdition]);

  const value = useMemo(
    () => ({ edition, setEdition, isLoading }),
    [edition, setEdition, isLoading],
  );

  return <EditionContext.Provider value={value}>{children}</EditionContext.Provider>;
};

export const useCalendarEdition = () => {
  const context = useContext(EditionContext);
  if (!context) {
    throw new Error("useCalendarEdition must be used within EditionProvider");
  }
  return context;
};
