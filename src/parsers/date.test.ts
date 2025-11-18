import { expect, describe, it } from "vitest";
import { parseDate } from "./date";
import { isDateValid } from "../validators/date";

describe(`date parser`, () => {
  it(`should create a correct date object`, () => {
    expect(parseDate("1", "880110")).toEqual(new Date(1988, 0, 10));
    expect(parseDate("5", "020202")).toEqual(new Date(2002, 1, 2));
    expect(parseDate("6", "120401")).toEqual(new Date(2012, 3, 1));
  });

  it(`should correctly parse resident birthdate`, () => {
    expect(parseDate("7", "120401")).toEqual(new Date(2012, 3, 1));
    expect(parseDate("7", "880401")).toEqual(new Date(1988, 3, 1));
  });

  it(`should correctly parse resident birthdate for sex code 8`, () => {
    expect(parseDate("8", "150601")).toEqual(new Date(2015, 5, 1));
    expect(parseDate("8", "900301")).toEqual(new Date(1990, 2, 1));
  });

  it(`should correctly parse foreign nationals (sex code 9)`, () => {
    expect(parseDate("9", "850505")).toEqual(new Date(1985, 4, 5));
    expect(parseDate("9", "120401")).toEqual(new Date(2012, 3, 1));
  });

  it(`should handle string sex codes correctly`, () => {
    // Ensure type safety - sex codes are strings from CNP parsing
    expect(parseDate("7", "120401")).toEqual(new Date(2012, 3, 1));
    expect(parseDate("8", "150601")).toEqual(new Date(2015, 5, 1));
    expect(parseDate("9", "850505")).toEqual(new Date(1985, 4, 5));
  });
});

describe(`date validator`, () => {
  it(`should return 'true' if date is valid`, () => {
    expect(isDateValid(new Date(1988, 0, 10))).toBe(true);
  });

  it(`should return 'false' if is not valid`, () => {
    expect(isDateValid(new Date("foo-bar"))).toBe(false);
  });
});
