import { expect, describe, it } from "vitest";
import { parseDate } from "./date";

describe("date parser", () => {
  it("should create a correct date object", () => {
    expect(parseDate("1", "880110")).toEqual(new Date(1988, 0, 10));
    expect(parseDate("5", "020202")).toEqual(new Date(2002, 1, 2));
    expect(parseDate("6", "120401")).toEqual(new Date(2012, 3, 1));
  });

  it("should correctly parse resident birthdate", () => {
    expect(parseDate("7", "120401")).toEqual(new Date(2012, 3, 1));
    expect(parseDate("7", "880401")).toEqual(new Date(1988, 3, 1));
  });

  it(`should correctly parse resident birthdate for sex code 8`, () => {
    expect(parseDate("8", "150601")).toEqual(new Date(2015, 5, 1));
    expect(parseDate("8", "900301")).toEqual(new Date(1990, 2, 1));
  });

  it("should correctly parse foreign nationals (sex code 9)", () => {
    expect(parseDate("9", "850505")).toEqual(new Date(1985, 4, 5));
    expect(parseDate("9", "120401")).toEqual(new Date(2012, 3, 1));
  });

  it("should handle string sex codes correctly", () => {
    // Ensure type safety - sex codes are strings from CNP parsing
    expect(parseDate("7", "120401")).toEqual(new Date(2012, 3, 1));
    expect(parseDate("8", "150601")).toEqual(new Date(2015, 5, 1));
    expect(parseDate("9", "850505")).toEqual(new Date(1985, 4, 5));
  });

  it("should return invalid date if date is invalid", () => {
    expect(parseDate("8", "121340")).toEqual(new Date(""));
  });

  it("should handle leap year Feb 29", () => {
    // Sex code 5 = 2000-2099, year 00 = 2000 (which IS a leap year)
    expect(parseDate("5", "000229")).toEqual(new Date(2000, 1, 29));
    // Sex code 1 = 1900-1999, year 96 = 1996 (leap year)
    expect(parseDate("1", "960229")).toEqual(new Date(1996, 1, 29));
  });

  it("should handle century transitions", () => {
    // Sex code 1 = 1900-1999
    expect(parseDate("1", "990101")).toEqual(new Date(1999, 0, 1));
    expect(parseDate("1", "000101")).toEqual(new Date(1900, 0, 1));
    // Sex code 5 = 2000-2099
    expect(parseDate("5", "000101")).toEqual(new Date(2000, 0, 1));
    expect(parseDate("5", "990101")).toEqual(new Date(2099, 0, 1));
  });
});
