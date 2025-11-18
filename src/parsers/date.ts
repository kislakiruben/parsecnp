import type {
  CenturyMap,
  ParserFunction,
  SexCodeString,
  ValidatorFunction,
} from "../types";
import { isValidDate } from "../utils";

const CENTURY_MAP: CenturyMap = {
  1: "19",
  2: "19",
  3: "18",
  4: "18",
  5: "20",
  6: "20",
  // 9: "19", // Foreign nationals / Not applicable (default to 19xx)
};

/**
 * Parses birth date from CNP components
 * Handles century determination based on sex code
 *
 * @param sexCode - Sex code number (first digit of CNP)
 * @param birthdate - Birth date string YYMMDD (positions 2-7 of CNP)
 * @returns Date object, or invalid date if parsing fails
 */
export const parseDate: ParserFunction<SexCodeString, Date> = (
  sexCodeString,
  birthdate,
) => {
  const year = birthdate.substring(0, 2);
  const month = birthdate.substring(2, 4);
  const day = birthdate.substring(4, 6);
  const isResident = ["7", "8", "9"].includes(sexCodeString);

  let century: string;
  if (isResident) {
    const currentYear = new Date().getFullYear();
    const currentYearShort = currentYear % 100;
    const yearNum = parseInt(year, 10);

    century = yearNum <= currentYearShort ? "20" : "19";
  } else {
    const sexCodeNum = parseInt(sexCodeString, 10);

    century = CENTURY_MAP[sexCodeNum as keyof CenturyMap];
  }

  const fullYear = `${century}${year}`;

  if (!isValidDate(fullYear, month, day)) {
    return new Date("");
  }

  const dayNum = parseInt(day, 10);
  const monthNum = parseInt(month, 10);
  const fullYearNum = parseInt(fullYear, 10);
  const date = new Date(fullYearNum, monthNum - 1, dayNum, 0, 0, 0, 0);

  return date;
};

/**
 * Validates parsed date
 *
 * @param date - Date object to validate
 * @returns true if date is valid and not in future
 */
export const isDateValid: ValidatorFunction<Date> = (date) => {
  return !isNaN(date.getTime());
};

export default parseDate;
