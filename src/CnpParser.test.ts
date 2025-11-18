import { expect, describe, it, vi } from "vitest";
import CnpParser from "./CnpParser";

describe("CnpParser", () => {
  it("should have getters", () => {
    const instance = new CnpParser("6121212261011");

    expect(instance.sex).toBe("female");
    expect(instance.birthdate).toEqual(new Date(2012, 11, 12));
    expect(instance.day).toBe(12);
    expect(instance.month).toBe(12);
    expect(instance.year).toBe(2012);
    expect(instance.county).toMatchObject({
      code: "26",
      name: "Mureș",
      ISO: "MS",
    });
    expect(instance.serial).toBe("101");
    expect(instance.checksum).toBe("1");
    expect(instance.isValid).toBe(false);
  });

  it("should have methods", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2012, 11, 12));

    const instance = new CnpParser("6121212261011");

    expect(instance.toString()).toBe("6121212261011");
    expect(instance.toJSON()).toBe(
      '{"birthdate":"2012-12-12T00:00:00.000Z","checksum":"1","county":{"code":"26","name":"Mureș","ISO":"MS"},"serial":"101","sex":"female"}',
    );

    vi.useRealTimers();
  });

  it("should throw if input not long enough", () => {
    expect(() => new CnpParser("123456789012")).toThrow(
      "Invalid CNP format: must be exactly 13 numeric digits",
    );
  });

  it("should throw if input too long", () => {
    expect(() => new CnpParser("12345678901234")).toThrow(
      "Invalid CNP format: must be exactly 13 numeric digits",
    );
  });

  it("should throw if input not alphanumeric", () => {
    expect(() => new CnpParser("123456789012A")).toThrow(
      "Invalid CNP format: must be exactly 13 numeric digits",
    );
  });

  it("should accept number input and convert to string", () => {
    const instance = new CnpParser(6121212261011);

    expect(instance.toString()).toBe("6121212261011");
    expect(instance.sex).toBe("female");
    expect(instance.year).toBe(2012);
  });

  it("should return unknown county for invalid county codes", () => {
    // Using county code "99" which doesn't exist
    const instance = new CnpParser("1700101991234");

    expect(instance.county).toEqual({
      code: "99",
      name: "Unknown",
      ISO: "XX",
    });
  });
});
