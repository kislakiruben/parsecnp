import { describe, it, expect } from "vitest";
import { isChecksumValid, validateChecksum } from "./checksum";

describe("checksum validator", () => {
  it("should return true for valid CNP", () => {
    expect(isChecksumValid("6130626527204", "4")).toBe(true);
    expect(isChecksumValid("2941118271691", "1")).toBe(true);
    expect(isChecksumValid("1900803342580", "0")).toBe(true);
  });

  it("should return false for invalid CNP", () => {
    expect(isChecksumValid("5160916081327", "7")).toBe(false);
    expect(isChecksumValid("5031227201941", "1")).toBe(false);
  });

  it("should validate using last digit when checksum not provided", () => {
    expect(isChecksumValid("6130626527204")).toBe(true);
    expect(isChecksumValid("5160916081327")).toBe(false);
  });

  it("should return null for valid checksum", () => {
    expect(validateChecksum("6130626527204", "4")).toBeNull();
  });

  it("should return error for invalid checksum", () => {
    const result = validateChecksum("5160916081327", "7");
    expect(result).not.toBeNull();
    expect(result!.field).toBe("checksum");
    expect(result!.code).toBe("invalid_checksum");
  });
});
