import type { ValidationError } from "../types";

export function createValidationError(
  field: ValidationError["field"],
  code: string,
  message: string,
): ValidationError {
  return { field, code, message };
}

export const ERROR_CODES = {
  INVALID_SEX: "invalid_sex_code",
  INVALID_DATE: "invalid_date",
  INVALID_COUNTY: "invalid_county_code",
  INVALID_COUNTY_TEMPORAL: "invalid_county_temporal",
  INVALID_SERIAL: "invalid_serial_range",
  INVALID_CHECKSUM: "invalid_checksum",
  INVALID_FORMAT: "invalid_format",
} as const;
