import { describe, it, expect } from "vitest";
import { parseDate } from "./date";

describe("date parser", () => {
  it("should create a correct date object", () => {
    expect(parseDate("1", "880110")).toEqual(new Date(1988, 0, 10));
    expect(parseDate("5", "020202")).toEqual(new Date(2002, 1, 2));
    expect(parseDate("6", "120401")).toEqual(new Date(2012, 3, 1));
  });

  it("should correctly parse resident birthdate (sex codes 7-8)", () => {
    expect(parseDate("7", "120401")).toEqual(new Date(2012, 3, 1));
    expect(parseDate("7", "880401")).toEqual(new Date(1988, 3, 1));
    expect(parseDate("8", "150601")).toEqual(new Date(2015, 5, 1));
    expect(parseDate("8", "900301")).toEqual(new Date(1990, 2, 1));
  });

  it("should correctly parse foreign nationals (sex code 9)", () => {
    expect(parseDate("9", "850505")).toEqual(new Date(1985, 4, 5));
    expect(parseDate("9", "120401")).toEqual(new Date(1912, 3, 1));
  });

  it("should handle invalid dates", () => {
    expect(parseDate("1", "139901").toString()).toBe("Invalid Date");
    expect(parseDate("1", "991301").toString()).toBe("Invalid Date");
  });
});
