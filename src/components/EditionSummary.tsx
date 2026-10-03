import { useMemo } from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import type { CalendarEdition } from "~/lib/domain";
import { getCalendarDay } from "~/lib/getCalendar";
import { Typography } from "~/components/typography";
import { useAppTheme } from "~/theme";

const LABELS = {
  "pre-55": "pré-55",
  "62": "1962",
} satisfies Record<CalendarEdition, string>;

const EDITIONS = Object.keys(LABELS) as CalendarEdition[];

/**
 * Subtle rubric-style note listing what the other calendar edition
 * celebrates at the head of the day, when it differs from the edition
 * being browsed - like a missal's cross-reference to another rite.
 */
export function EditionSummary({
  date,
  edition,
  style,
}: {
  date: string;
  edition: CalendarEdition;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useAppTheme();

  const notes = useMemo(() => {
    const currentTop = getCalendarDay(date, edition)?.mass[0]?.name;
    if (!currentTop) return [];
    return EDITIONS.filter((e) => e !== edition).flatMap((other) => {
      const otherTop = getCalendarDay(date, other)?.mass[0];
      if (!otherTop || otherTop.name === currentTop) return [];
      return [{ label: LABELS[other], name: otherTop.name }];
    });
  }, [date, edition]);

  if (notes.length === 0) return null;

  return (
    <View
      style={[{ marginBottom: 8 }, style]}
      accessibilityLabel="Outras edições do calendário neste dia"
    >
      {notes.map((n) => (
        <Typography
          key={n.label}
          className="font-italic"
          style={{
            fontSize: 11,
            letterSpacing: 0.6,
            color: colors.textMuted,
          }}
        >
          {`† ${n.label} · ${n.name}`}
        </Typography>
      ))}
    </View>
  );
}
