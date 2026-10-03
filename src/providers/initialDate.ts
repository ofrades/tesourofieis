import { format } from "date-fns";

// Local clock fields ensure the first render also matches across browser timezones.
export const initialCalendarDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS");

const environment: typeof globalThis & { __tesouroInitialDate?: string } = globalThis;

export function getInitialCalendarDate(): Date {
  return new Date(environment.__tesouroInitialDate ?? initialCalendarDate);
}
