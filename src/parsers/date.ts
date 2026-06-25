import { isValidDate } from "../utils";

const CENTURY_MAP: Record<number, string> = {
  1: "19",
  2: "19",
  3: "18",
  4: "18",
  5: "20",
  6: "20",
  9: "19",
};

export function parseDate(sexCodeString: string, birthdate: string): Date {
  const year = birthdate.substring(0, 2);
  const month = birthdate.substring(2, 4);
  const day = birthdate.substring(4, 6);

  const isResident = ["7", "8"].includes(sexCodeString);

  let century: string;
  if (isResident) {
    const currentYearShort = new Date().getFullYear() % 100;
    century = parseInt(year, 10) <= currentYearShort ? "20" : "19";
  } else {
    century = CENTURY_MAP[parseInt(sexCodeString, 10)] ?? "19";
  }

  const fullYear = `${century}${year}`;
  if (!isValidDate(fullYear, month, day)) {
    return new Date("");
  }

  const dayNum = parseInt(day, 10);
  const monthNum = parseInt(month, 10);
  const fullYearNum = parseInt(fullYear, 10);

  return new Date(fullYearNum, monthNum - 1, dayNum, 0, 0, 0, 0);
}
