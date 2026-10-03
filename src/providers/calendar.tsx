import type { Day } from "~/lib/calendar";
import { getCalendar, getCalendarDay, getSeason } from "~/lib/getCalendar";
import type { LiturgicalSeason, Mass } from "~/lib/domain";
import { useCalendarEdition } from "~/providers/edition";
import { Season } from "~/lib/domain";
import { shiftLocalDate, yyyyMMDD } from "~/lib/utils";
import { getMonth, getYear } from "date-fns";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import { getInitialCalendarDate } from "./initialDate";

const CalendarContext = createContext<
  | {
      calendar: Day[];
      day: Day;
      mass: Mass[];
      novenas?: Mass[] | undefined;
      date: Date;
      season: LiturgicalSeason;
      isCustomDate: boolean;
      setDate: (date: Date) => void;
      resetToToday: () => void;
    }
  | undefined
>(undefined);

// Theme subscribers only need the liturgical day, not the minute-by-minute clock.
const CalendarDayContext = createContext<Day | undefined>(undefined);

export function CalendarProvider({ children }: PropsWithChildren) {
  const { edition: selection, isLoading: editionLoading } = useCalendarEdition();
  const [autoDate, setAutoDate] = useState(getInitialCalendarDate);
  const [userDate, setUserDate] = useState<Date | null>(null);

  const date = userDate ?? autoDate;
  const isCustomDate = userDate !== null;

  useEffect(() => {
    const refresh = setTimeout(() => setAutoDate(new Date()), 0);
    const timer = setInterval(() => {
      setAutoDate(new Date());
    }, 60000);
    return () => {
      clearTimeout(refresh);
      clearInterval(timer);
    };
  }, []);

  const setDate = useCallback((d: Date) => {
    // Preserve the current clock time — only the calendar date changes
    const withTime = new Date(d);
    const now = new Date();
    withTime.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    setUserDate(withTime);
  }, []);
  const resetToToday = useCallback(() => setUserDate(null), []);

  const currentYear = getYear(date);
  const currentMonth = getMonth(date);

  const calendar = useMemo(
    () => [
      ...getCalendar(currentYear, selection),
      ...(currentMonth === 11 ? getCalendar(currentYear + 1, selection) : []),
    ],
    [currentYear, currentMonth, selection],
  );

  const dateKey = yyyyMMDD(date);
  const day = useMemo(() => getCalendarDay(dateKey, selection), [dateKey, selection]);
  const novenas = useMemo(() => {
    const endDate = shiftLocalDate(dateKey, 9);
    const novenaObservances: Mass[] = [];
    for (const calDay of calendar) {
      // Upcoming feasts in the next nine days; no clock-dependent date parsing.
      if (calDay.date > dateKey && calDay.date <= endDate) {
        const dayNovenas = calDay.mass
          .filter((mass) => mass.novena)
          .map((i) => ({ ...i, date: calDay.date }));
        novenaObservances.push(...dayNovenas);
      }
    }
    return novenaObservances;
  }, [calendar, dateKey]);

  const season = useMemo(
    () => getSeason(dateKey, selection) || Season.ADVENT,
    [dateKey, selection],
  );

  const value = useMemo(
    () =>
      day && {
        mass: day.mass,
        day,
        calendar,
        novenas,
        date,
        season,
        isCustomDate,
        setDate,
        resetToToday,
      },
    [day, calendar, novenas, date, season, isCustomDate, setDate, resetToToday],
  );

  if (!day || (editionLoading && Platform.OS !== "web")) {
    return (
      <View className="flex-auto justify-center items-center bg-sepia-200 dark:bg-sepia-900">
        <ActivityIndicator className="text-red-500" />
      </View>
    );
  }

  return (
    <CalendarContext.Provider value={value}>
      <CalendarDayContext.Provider value={day}>{children}</CalendarDayContext.Provider>
    </CalendarContext.Provider>
  );
}

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};

export const useCalendarDay = () => {
  const day = useContext(CalendarDayContext);
  if (!day) throw new Error("useCalendarDay must be used within CalendarProvider");
  return day;
};
