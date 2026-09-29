import type { Day } from "~/lib/calendar";
import { getCalendar, getCalendarDay, getSeason } from "~/lib/getCalendar";
import type { CalendarEdition, LiturgicalSeason, Mass } from "~/lib/domain";
import { useCalendarEdition } from "~/providers/edition";
import { Season } from "~/lib/domain";
import { yyyyMMDD } from "~/lib/utils";
import { addDays, getMonth, getYear, isWithinInterval, parseISO } from "date-fns";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ActivityIndicator, View } from "react-native";

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

export function CalendarProvider({ children }: PropsWithChildren) {
  const { edition: selection, isLoading: editionLoading } = useCalendarEdition();
  const [autoDate, setAutoDate] = useState(new Date());
  const [userDate, setUserDate] = useState<Date | null>(null);

  const date = userDate ?? autoDate;
  const isCustomDate = userDate !== null;

  useEffect(() => {
    const timer = setInterval(() => {
      setAutoDate(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const setDate = (d: Date) => {
    // Preserve the current clock time — only the calendar date changes
    const withTime = new Date(d);
    withTime.setHours(
      autoDate.getHours(),
      autoDate.getMinutes(),
      autoDate.getSeconds(),
      autoDate.getMilliseconds(),
    );
    setUserDate(withTime);
  };
  const resetToToday = () => setUserDate(null);

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
  const day = useMemo(
    () => (editionLoading ? undefined : getCalendarDay(dateKey, selection)),
    [dateKey, selection, editionLoading],
  );
  const mass = day?.mass || [];

  const novenas = useMemo(() => {
    const endDate = addDays(date, 9);
    const novenaObservances: Mass[] = [];
    for (const calDay of calendar) {
      const dayDate = parseISO(calDay.date);
      if (isWithinInterval(dayDate, { start: date, end: endDate })) {
        const dayNovenas = calDay.mass
          .filter((mass) => mass.novena)
          .map((i) => ({ ...i, date: yyyyMMDD(dayDate) }));
        novenaObservances.push(...dayNovenas);
      }
    }
    return novenaObservances;
  }, [calendar, date]);

  const season = useMemo(
    () => (editionLoading ? undefined : getSeason(dateKey, selection)) || Season.ADVENT,
    [dateKey, selection, editionLoading],
  );

  if (!calendar || !day) {
    return (
      <View className="flex-auto justify-center items-center bg-sepia-200 dark:bg-sepia-900">
        <ActivityIndicator className="text-red-500" />
      </View>
    );
  }

  return (
    <CalendarContext.Provider
      value={{ mass, day, calendar, novenas, date, season, isCustomDate, setDate, resetToToday }}
    >
      {children}
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
