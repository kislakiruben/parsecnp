import type {
  Sex,
  SexCode,
  SexCodeString,
  SexMapping,
  ParserFunction,
  ValidatorFunction,
} from "./types";

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
 * Valid sex codes
 */
const VALID_SEX_CODES: readonly SexCode[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Parses sex code to human-readable sex string
 *
 * @param sexCode - Sex code string from CNP (first digit)
 * @returns Sex string ("male", "female", etc.)
 */
const parseSex: ParserFunction<SexCodeString, Sex> = (sexCode) => {
  const code = parseInt(sexCode, 10) as SexCode;

  return sexMapping[code] || SEX_ISO_CODE[0];
};

/**
 * Validates sex code
 *
 * @param sexCode - Sex code string from CNP
 * @returns true if sex code is valid
 */
export const isSexValid: ValidatorFunction<SexCodeString> = (sexCode) => {
  const code = parseInt(sexCode, 10);

  return !isNaN(code) && VALID_SEX_CODES.includes(code as SexCode);
};

export default parseSex;
