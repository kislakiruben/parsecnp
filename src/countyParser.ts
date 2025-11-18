import counties from "./countyList";
import type {
  County,
  CountyCode,
  ParserFunction,
  ValidatorFunction,
} from "./types";

/**
 * Date when București districts 7 and 8 (codes 47-48) were abolished
 */
const DISTRICT_ABOLISH_DATE = new Date(1979, 11, 19); // December 19, 1979

/**
 * Parses county code to county information
 *
 * @param countyCode - County code string (positions 8-9 of CNP)
 * @returns County object with code, name, and ISO
 */
const parseCounty: ParserFunction<CountyCode, County | null> = (countyCode) => {
  const county = counties[countyCode];

  if (!county) return null;
  if (county.ISO === undefined || county.name === undefined) return null;

  return {
    code: countyCode,
    name: county?.name,
    ISO: county?.ISO,
  };
};

/**
 * Validates county code
 * Special handling for defunct districts 47-48 (valid only before Dec 19, 1979)
 *
 * @param countyCode - County code string
 * @param birthdate - Optional birth date (required for validating codes 47-48)
 * @returns true if county code is valid
 */
export const isCountyValid: ValidatorFunction<CountyCode> = (
  countyCode,
  birthdate?: Date,
) => {
  const county = counties[countyCode];

  if (!county) return false;
  if (county.ISO === undefined || county.name === undefined) return false;
  if (countyCode === "47" || countyCode === "48") {
    if (!birthdate) return false;
    return birthdate < DISTRICT_ABOLISH_DATE;
  }

  return true;
};

export default parseCounty;
