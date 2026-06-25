import countyList from "../countyList";
import { createValidationError, ERROR_CODES } from "./helpers";
import type { ValidationError } from "../types";

const DISTRICT_ABOLISH_DATE = new Date(1979, 11, 19);
const COUNTY_51_52_CREATE_DATE = new Date(1981, 1, 17);
const ILFOV_REESTABLISH_DATE = new Date(1968, 1, 14);

const normalizeCountyCode = (countyCode: string): string => {
  const normalized = parseInt(countyCode, 10);
  return Number.isNaN(normalized) ? countyCode : String(normalized);
};

const lookupCounty = (countyCode: string) =>
  countyList[countyCode] || countyList[normalizeCountyCode(countyCode)];

export function isCountyValid(countyCode: string, birthdate?: Date): boolean {
  if (!lookupCounty(countyCode)) return false;
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
}

export function validateCounty(
  countyCode: string,
  birthdate?: Date,
): ValidationError | null {
  if (!lookupCounty(countyCode)) {
    return createValidationError(
      "county",
      ERROR_CODES.INVALID_COUNTY,
      `Invalid county code: "${countyCode}" is not a valid Romanian county`,
    );
  }
  if (countyCode === "47" || countyCode === "48") {
    if (!birthdate) return null;
    if (birthdate >= DISTRICT_ABOLISH_DATE) {
      const sector = countyCode === "47" ? "7" : "8";
      return createValidationError(
        "county",
        ERROR_CODES.INVALID_COUNTY_TEMPORAL,
        `County code ${countyCode} (București sector ${sector}) is only valid for birthdates before December 19, 1979`,
      );
    }
  }
  if (countyCode === "51" || countyCode === "52") {
    if (!birthdate) return null;
    if (birthdate < COUNTY_51_52_CREATE_DATE) {
      const countyName = countyCode === "51" ? "Călărași" : "Giurgiu";
      return createValidationError(
        "county",
        ERROR_CODES.INVALID_COUNTY_TEMPORAL,
        `County code ${countyCode} (${countyName}) is only valid for birthdates on or after February 17, 1981`,
      );
    }
  }
  if (countyCode === "23") {
    if (!birthdate) return null;
    if (birthdate < ILFOV_REESTABLISH_DATE) {
      return createValidationError(
        "county",
        ERROR_CODES.INVALID_COUNTY_TEMPORAL,
        `County code 23 (Ilfov) is only valid for birthdates on or after February 14, 1968`,
      );
    }
  }
  return null;
}
