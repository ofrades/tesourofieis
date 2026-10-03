import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { yyyyMMDD } from "~/lib/utils";
import { addWeeks, eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
import { pt } from "date-fns/locale";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { LiturgicalDateHeader } from "~/components/LiturgicalDateHeader";
import LinkCard from "~/components/LinkCard";
import { EditionSummary } from "~/components/EditionSummary";
import { Typography } from "~/components/typography";
import { COLORS } from "~/constants/Colors";
import { useCalendar } from "~/providers/calendar";
import { useCalendarEdition } from "~/providers/edition";
import { useAppTheme } from "~/theme";

export default function CalendarMasterpiece() {
  const scrollViewRef = useRef<ScrollView>(null);
  const todayRef = useRef<View>(null);
  const { calendar, date } = useCalendar();
  const { edition } = useCalendarEdition();
  const { colors } = useAppTheme();

  const todayString = yyyyMMDD(date);
  const [currentDate, setCurrentDate] = useState<Date>(date);

  const intervalStart = useMemo(() => startOfWeek(currentDate), [currentDate]);
  const intervalEnd = useMemo(() => endOfWeek(currentDate), [currentDate]);
  const days = useMemo(
    () => eachDayOfInterval({ start: intervalStart, end: intervalEnd }),
    [intervalEnd, intervalStart],
  );

  const formattedPeriod = `${format(intervalStart, "d MMM", {
    locale: pt,
  })} – ${format(intervalEnd, "d MMM yyyy", { locale: pt })}`;

  const handlePrevious = () => {
    setCurrentDate((prevDate) => addWeeks(prevDate, -1));
  };

  const handleNext = () => {
    setCurrentDate((prevDate) => addWeeks(prevDate, 1));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (todayRef.current) {
        todayRef.current.measure((_x, _y, _width, _height, _pageX, pageY) => {
          if (pageY > 0) {
            scrollViewRef.current?.scrollTo({
              y: Math.max(0, pageY - 100),
              animated: true,
            });
          }
        });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [currentDate]);

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
      <View className="extreme-background w-full">
        <View
          className="flex-1 w-full web:lg:max-w-1/2 web:lg:mx-auto py-5 px-3"
          style={{
            backgroundColor: colors.screen,
          }}
        >
          <Header
            formattedPeriod={formattedPeriod}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />

          <View style={{ paddingBottom: 8 }}>
            {days.map((dayDate) => {
              const dayString = yyyyMMDD(dayDate);
              const dayData = calendar.find((i) => i.date === dayString);
              const isToday = dayString === todayString;
              const weekdayColor = isToday ? colors.accent : colors.textMuted;
              const dateColor = isToday ? colors.textPrimary : colors.textSecondary;

              return (
                <View
                  key={dayString}
                  ref={isToday ? todayRef : null}
                  style={{
                    borderTopWidth: 1,
                    borderColor: colors.divider,
                    paddingHorizontal: 20,
                    paddingVertical: 14,
                    backgroundColor: isToday ? colors.cardElevated : "transparent",
                  }}
                >
                  <Typography
                    className="font-ui-medium"
                    style={{
                      fontSize: 10,
                      letterSpacing: 0.8,
                      color: weekdayColor,
                      marginBottom: 6,
                    }}
                  >
                    {format(dayDate, "EEEE", { locale: pt })}
                  </Typography>

                  <Typography
                    className="font-display leading-none"
                    style={{
                      fontSize: 28,
                      color: dateColor,
                      marginBottom: 4,
                    }}
                  >
                    {format(dayDate, "d 'de' MMMM", { locale: pt })}
                  </Typography>

                  {dayData?.season && (
                    <Typography
                      className="font-display-italic"
                      style={{
                        fontSize: 12,
                        color: colors.textMuted,
                        marginBottom: 12,
                      }}
                    >
                      {dayData.season}
                    </Typography>
                  )}

                  <EditionSummary date={dayString} edition={edition} />

                  <View className="gap-3">
                    {dayData?.mass && dayData.mass.length > 0
                      ? dayData.mass.map((item) => (
                          <LinkCard key={item.id} mass={item} variant="featured" />
                        ))
                      : null}
                    {dayData?.alternatives && dayData.alternatives.length > 0
                      ? dayData.alternatives.map((item) => (
                          <LinkCard key={item.id} mass={item} variant="featured" />
                        ))
                      : null}
                    {!dayData?.mass?.length && !dayData?.alternatives?.length ? (
                      <Typography
                        className="font-reading italic"
                        style={{ fontSize: 14, color: colors.textMuted }}
                      >
                        Sem missa própria neste dia.
                      </Typography>
                    ) : null}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

type HeaderProps = {
  formattedPeriod: string;
  handlePrevious: () => void;
  handleNext: () => void;
};

function Header({ formattedPeriod, handlePrevious, handleNext }: HeaderProps) {
  const { isDark, colors } = useAppTheme();
  const chevronColor = isDark ? colors.textMuted : COLORS["500"];

  return (
    <LiturgicalDateHeader
      overline="SEMANA"
      centeredTitle
      paddingHorizontal={20}
      paddingTop={8}
      paddingBottom={10}
      titleSize={24}
      bottomSpacing={4}
      leftControl={
        <Pressable
          onPress={handlePrevious}
          hitSlop={6}
          accessibilityRole="button"
          accessibilityLabel="Semana anterior"
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: colors.divider,
          }}
        >
          <ChevronLeft size={18} color={chevronColor} strokeWidth={1.7} />
        </Pressable>
      }
      title={formattedPeriod}
      rightControl={
        <Pressable
          onPress={handleNext}
          hitSlop={6}
          accessibilityRole="button"
          accessibilityLabel="Próxima semana"
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: colors.divider,
          }}
        >
          <ChevronRight size={18} color={chevronColor} strokeWidth={1.7} />
        </Pressable>
      }
    />
  );
}
