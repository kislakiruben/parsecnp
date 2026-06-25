import { describe, it, expect } from "vitest";
import CnpParser from "./CnpParser";

describe("CnpParser", () => {
  it("should parse raw components from CNP", () => {
    const parser = new CnpParser("1234567261011");
    expect(parser.raw).toMatchObject({
      birthdate: "234567",
      checksum: "1",
      cnp: "1234567261011",
      county: "26",
      serial: "101",
      sex: "1",
    });
  });

  it("should expose parsed getters", () => {
    const parser = new CnpParser("6121212261011");
    expect(parser.sex).toBe("female");
    expect(parser.birthdate).toEqual(new Date(2012, 11, 12));
    expect(parser.day).toBe(12);
    expect(parser.month).toBe(12);
    expect(parser.year).toBe(2012);
    expect(parser.county).toMatchObject({
      code: "26",
      name: "Mureș",
      ISO: "MS",
    });
    expect(parser.serial).toBe(101);
    expect(parser.checksum).toBe(1);
    expect(parser.isValid).toBe(false);
  });

  it("should throw on invalid CNP format", () => {
    expect(() => new CnpParser("123")).toThrow("Invalid CNP format");
    expect(() => new CnpParser("12345678901234")).toThrow("Invalid CNP format");
  });

  it("should throw on non-numeric CNP", () => {
    expect(() => new CnpParser("123456789012A")).toThrow("Invalid CNP format");
  });

  it("should expose validation errors", () => {
    const parser = new CnpParser("6121212261011");
    const errors = parser.validationErrors;
    expect(errors).toBeInstanceOf(Array);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toHaveProperty("field");
    expect(errors[0]).toHaveProperty("message");
    expect(errors[0]).toHaveProperty("code");
  });

  it("should have methods", () => {
    const parser = new CnpParser("6121212261011");
    expect(parser.toString()).toBe("6121212261011");
    expect(parser.toJSON()).toHaveProperty("cnp");
    expect(parser.toJSON()).toHaveProperty("sex");
    expect(parser.toJSON()).toHaveProperty("isValid");
  });

  it("should validate CNPs with unique county code", () => {
    const parser = new CnpParser("1660302702618");
    expect(parser.county).toMatchObject({
      code: "70",
      name: "Cod unic",
    });
    expect(parser.isValid).toBe(true);
  });
});
