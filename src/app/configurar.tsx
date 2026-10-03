import { ScrollView } from "react-native";
import { FontSizeSelector } from "~/components/FontSelector";
import { Notifications } from "~/components/Notifications";
import { DefaultLanguageSelector } from "~/providers/language";
import { CalendarEditionSelector } from "~/components/CalendarEditionSelector";

export default function PageNot() {
  return (
    <ScrollView className="px-5 medium-background">
      <CalendarEditionSelector />
      <DefaultLanguageSelector />
      <FontSizeSelector />
      <Notifications />
    </ScrollView>
  );
}
