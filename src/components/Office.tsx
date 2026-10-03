import { getCurrentOffice } from "~/lib/office";
import { useCalendar } from "~/providers/calendar";
import LinkCard from "./LinkCard";

export default function PageOffice() {
  const { date } = useCalendar();
  const office = getCurrentOffice(date);

  if (office) {
    return (
      <LinkCard
        oratio={{ link: office.link, name: office.name }}
        description={office.description}
      />
    );
  }

  return null;
}
