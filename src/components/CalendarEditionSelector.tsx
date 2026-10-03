import { CalendarDays } from "lucide-react-native";
import { View } from "react-native";
import { CALENDARS } from "~/lib/calendars";
import { useCalendarEdition } from "~/providers/edition";
import { useAppTheme } from "~/theme";
import { SegmentedOption, SettingsSection } from "./SettingsControls";

export function CalendarEditionSelector() {
  const { colors } = useAppTheme();
  const { edition, setEdition, isLoading } = useCalendarEdition();
  return (
    <SettingsSection icon={<CalendarDays size={15} color={colors.textPrimary} />} title="Calendário">
      {isLoading ? (
        <View className="h-12 soft-background rounded-lg" />
      ) : (
        <SegmentedOption
          value={edition}
          onChange={setEdition}
          options={Object.values(CALENDARS).map((definition) => ({
            label: definition.label,
            value: definition.id,
          }))}
        />
      )}
    </SettingsSection>
  );
}
