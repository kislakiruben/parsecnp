import type { Sex, SexCode, SexMapping, ParserFunction } from "../types";

const SEX_ISO_CODE: Record<number, Sex> = {
  0: "not known",
  1: "male",
  2: "female",
  9: "not applicable",
};

const sexMapping: SexMapping = {
  1: SEX_ISO_CODE[1],
  2: SEX_ISO_CODE[2],
  3: SEX_ISO_CODE[1],
  4: SEX_ISO_CODE[2],
  5: SEX_ISO_CODE[1],
  6: SEX_ISO_CODE[2],
  7: SEX_ISO_CODE[1],
  8: SEX_ISO_CODE[2],
  9: SEX_ISO_CODE[9],
};

/**
 * Parses sex code to human-readable sex string
 *
 * @param sexCode - Sex code string from CNP (first digit)
 * @returns Sex string ("male", "female", etc.)
 */
export const parseSex: ParserFunction<string, Sex> = (sexCode) => {
  const code = parseInt(sexCode, 10) as SexCode;

  return sexMapping[code] || SEX_ISO_CODE[0];
};
