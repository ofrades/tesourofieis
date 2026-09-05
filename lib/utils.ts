function yyyyMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const parsedDateCache = new Map<string, Date>();
const shiftedDateCache = new Map<string, string>();

function parseLocalDate(dateString: string): Date {
  const cached = parsedDateCache.get(dateString);
  if (cached) {
    return cached;
  }

  const year = Number.parseInt(dateString.slice(0, 4), 10);
  const month = Number.parseInt(dateString.slice(5, 7), 10) - 1;
  const day = Number.parseInt(dateString.slice(8, 10), 10);
  const parsed = new Date(year, month, day);
  parsedDateCache.set(dateString, parsed);
  return parsed;
}

function shiftLocalDate(dateString: string, days: number): string {
  const cacheKey = `${dateString}|${days}`;
  const cached = shiftedDateCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const date = new Date(parseLocalDate(dateString));
  date.setDate(date.getDate() + days);
  const shifted = yyyyMMDD(date);
  shiftedDateCache.set(cacheKey, shifted);
  return shifted;
}

function isFirstFriday(date: Date): boolean {
  return date.getDate() <= 7 && date.getDay() === 5;
}

function isFirstSaturday(date: Date): boolean {
  return date.getDate() <= 7 && date.getDay() === 6;
}

// Quaresma de São Miguel Arcanjo: 15 August (Assumption) through
// 29 September (Dedication of St. Michael), 46 days. Returns the
// 1-based day of the devotion, or null outside the period.
// Time-of-day agnostic: only the calendar date matters.
function stMichaelLentDay(date: Date): number | null {
  const year = date.getFullYear();
  const start = new Date(year, 7, 15).getTime();
  const end = new Date(year, 8, 29).getTime();
  const day = new Date(year, date.getMonth(), date.getDate()).getTime();
  if (day < start || day > end) return null;
  return Math.round((day - start) / 86_400_000) + 1;
}

function isStMichaelLent(date: Date): boolean {
  return stMichaelLentDay(date) !== null;
}

export {
  isFirstFriday,
  isFirstSaturday,
  isStMichaelLent,
  parseLocalDate,
  shiftLocalDate,
  stMichaelLentDay,
  yyyyMMDD,
};
