import type { CalendarTheme } from "@marceloterreiro/flash-calendar";
import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { addMonths, format, parseISO, startOfMonth, subMonths } from "date-fns";
import { pt } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { COLORS } from "~/constants/Colors";
import { FONT_FAMILIES, useAppTheme } from "~/theme";

interface DatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
  children: React.ReactNode;
}

// Stable formatting functions (must be outside component for referential equality)
const formatWeekDay = (d: Date) => format(d, "EEEEEE", { locale: pt });

export function DatePicker({ date, onDateChange, children }: DatePickerProps) {
  const { isDark, colors } = useAppTheme();
  const sheetRef = useRef<BottomSheetModal>(null);
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(date));

  const open = useCallback(() => {
    setViewMonth(startOfMonth(date));
    sheetRef.current?.present();
  }, [date]);

  const handleDayPress = useCallback(
    (dateId: string) => {
      onDateChange(parseISO(dateId));
      sheetRef.current?.dismiss();
    },
    [onDateChange],
  );

  const monthLabel = format(viewMonth, "MMMM yyyy", { locale: pt });

  const bg = colors.panel;
  const textPrimary = colors.textSecondary;
  const textMuted = COLORS["500"];
  const hoverBg = colors.divider;
  const todayBg = colors.divider;
  const activeBg = colors.accent;

  const theme = useMemo<CalendarTheme>(
    () => ({
      // Hide the built-in month row — we have our own navigation
      rowMonth: {
        container: { height: 0, overflow: "hidden" },
      },
      // Week day names
      itemWeekName: {
        content: {
          fontFamily: FONT_FAMILIES.ui,
          fontSize: 11,
          color: textMuted,
          letterSpacing: 0.5,
        },
      },
      // Day cells
      itemDay: {
        idle: ({ isPressed, isHovered }) => ({
          container: {
            backgroundColor: isPressed || isHovered ? hoverBg : "transparent",
            borderRadius: 99,
          },
          content: {
            fontFamily: FONT_FAMILIES.ui,
            fontSize: 14,
            color: isDark ? COLORS["300"] : COLORS["600"],
          },
        }),
        today: ({ isPressed, isHovered }) => ({
          container: {
            backgroundColor: isPressed || isHovered ? activeBg : todayBg,
            borderRadius: 99,
          },
          content: {
            fontFamily: FONT_FAMILIES.ui,
            fontSize: 14,
            color: isPressed || isHovered ? "#fff" : isDark ? COLORS["100"] : COLORS["700"],
          },
        }),
        active: () => ({
          container: {
            backgroundColor: activeBg,
            borderRadius: 99,
          },
          content: {
            fontFamily: FONT_FAMILIES.ui,
            fontSize: 14,
            color: "#fff",
          },
        }),
      },
    }),
    [isDark, textMuted, hoverBg, todayBg, activeBg],
  );

  const dateId = toDateId(date);
  const monthId = toDateId(viewMonth);

  return (
    <>
      <Pressable
        onPress={open}
        accessibilityRole="button"
        accessibilityLabel="Selecionar data"
        accessibilityHint="Abre o calendário para alterar a data"
      >
        {children}
      </Pressable>

      <BottomSheetModal
        ref={sheetRef}
        snapPoints={["44%"]}
        backgroundStyle={{ backgroundColor: bg }}
        handleIndicatorStyle={{ backgroundColor: textMuted }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.3} />
        )}
      >
        <BottomSheetView style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
          {/* Month navigation */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 12,
            }}
          >
            <Pressable
              onPress={() => setViewMonth((m) => subMonths(m, 1))}
              style={{ padding: 8 }}
              accessibilityLabel="Mês anterior"
            >
              <ChevronLeft size={20} color={textMuted} />
            </Pressable>

            <Text
              style={{
                fontFamily: FONT_FAMILIES.uiBold,
                fontSize: 18,
                color: textPrimary,
              }}
            >
              {monthLabel}
            </Text>

            <Pressable
              onPress={() => setViewMonth((m) => addMonths(m, 1))}
              style={{ padding: 8 }}
              accessibilityLabel="Próximo mês"
            >
              <ChevronRight size={20} color={textMuted} />
            </Pressable>
          </View>

          {/* Calendar grid */}
          <Calendar
            calendarMonthId={monthId}
            calendarActiveDateRanges={[{ startId: dateId, endId: dateId }]}
            onCalendarDayPress={handleDayPress}
            calendarFirstDayOfWeek="monday"
            calendarMonthHeaderHeight={0}
            calendarDayHeight={36}
            calendarRowVerticalSpacing={4}
            calendarRowHorizontalSpacing={4}
            getCalendarWeekDayFormat={formatWeekDay}
            theme={theme}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
