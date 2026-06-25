import type { Sex } from "../types";

const SEX_ISO_CODE: Record<number, Sex> = {
  0: "not known",
  1: "male",
  2: "female",
  9: "not applicable",
};

const sexMapping: Record<number, Sex | undefined> = {
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

export function parseSex(sexCode: string | number): Sex {
  const code = typeof sexCode === "string" ? parseInt(sexCode, 10) : sexCode;
  return sexMapping[code] ?? SEX_ISO_CODE[0] ?? "not known";
}
