import counties from "../countyList";
import type { CountyCode, ValidatorFunction } from "../types";

/**
 * Date when București districts 7 and 8 (codes 47-48) were abolished
 */
const DISTRICT_ABOLISH_DATE = new Date(1979, 11, 19); // December 19, 1979

/**
 * Date when Călărași and Giurgiu counties (codes 51-52) were created
 */
const COUNTY_51_52_CREATE_DATE = new Date(1981, 1, 17); // February 17, 1981

/**
 * Date when Ilfov county (code 23) was re-established
 */
const ILFOV_REESTABLISH_DATE = new Date(1968, 1, 14); // February 14, 1968

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
  if (countyCode === "47" || countyCode === "48") {
    if (!birthdate) return false;

    return birthdate < DISTRICT_ABOLISH_DATE;
  }
  if (countyCode === "51" || countyCode === "52") {
    if (!birthdate) return false;

    return birthdate >= COUNTY_51_52_CREATE_DATE;
  }
  if (countyCode === "23") {
    if (!birthdate) return false;

    return birthdate >= ILFOV_REESTABLISH_DATE;
  }

  return true;
};
