import { describe, it, expect } from "vitest";
import { isSerialValid, validateSerial } from "./serial";

describe("serial validator", () => {
  it("should return false if serial is zero or negative", () => {
    expect(isSerialValid("000")).toBe(false);
    expect(isSerialValid("-1")).toBe(false);
  });

  it("should correctly parse valid serial", () => {
    expect(isSerialValid("001")).toBe(true);
    expect(isSerialValid("999")).toBe(true);
  });

  it("should return false if serial is more than 3 digits", () => {
    expect(isSerialValid("1000")).toBe(false);
  });

  it("should return null for valid serial", () => {
    expect(validateSerial("001")).toBeNull();
  });

  it("should return error for invalid serial", () => {
    const result = validateSerial("000");
    expect(result).not.toBeNull();
    expect(result!.code).toBe("invalid_serial_range");
  });
});
