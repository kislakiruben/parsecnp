import { describe, it, expect } from "vitest";
import ParseCnp, { CnpParser } from "./index";

describe("ParseCnp entrypoint", () => {
  it("should create instance with new", () => {
    const instance = new (ParseCnp as unknown as new (cnp: string | number) => CnpParser)("2121212261011");
    expect(instance).toBeInstanceOf(CnpParser);
  });

  it("should create instance via factory call", () => {
    const instance = ParseCnp("2121212261011");
    expect(instance).toBeInstanceOf(CnpParser);
  });

  it("should provide static isValid method", () => {
    expect(ParseCnp.isValid("2121212261011")).toBe(false);
    expect(ParseCnp.isValid("invalid")).toBe(false);
  });

  it("should provide static validate method", () => {
    const result = ParseCnp.validate("2121212261011");
    expect(result).toHaveProperty("valid");
    expect(result).toHaveProperty("errors");
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("should handle invalid input gracefully in validate", () => {
    const result = ParseCnp.validate("123");
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toHaveProperty("field", "format");
  });
});
