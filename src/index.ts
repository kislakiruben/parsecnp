import CnpParser from "./CnpParser";
import type { ValidationResult } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ParseCnp(this: any, cnp: string | number): CnpParser {
  if (!(this instanceof CnpParser)) {
    return new CnpParser(cnp);
  }
  return this as CnpParser;
}

ParseCnp.isValid = function (cnp: string | number): boolean {
  try {
    return new CnpParser(cnp).isValid;
  } catch {
    return false;
  }
};

ParseCnp.validate = function (cnp: string | number): ValidationResult {
  try {
    const instance = new CnpParser(cnp);
    return {
      valid: instance.isValid,
      errors: instance.validationErrors,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          field: "format",
          code: "invalid_format",
          message:
            error instanceof Error ? error.message : "Invalid CNP format",
        },
      ],
    };
  }
};

export { CnpParser };
export default ParseCnp;
export type {
  Sex,
  SexCode,
  SexCodeString,
  County,
  CountyCode,
  CountyISO,
  RawCnp,
  ParsedCnp,
  ValidationError,
  ValidationResult,
} from "./types";
