import counties from "../countyList";
import type { County, CountyCode, ParserFunction } from "../types";

/**
 * Parses county code to county information
 *
 * @param countyCode - County code string (positions 8-9 of CNP)
 * @returns County object with code, name, and ISO
 */
export const parseCounty: ParserFunction<CountyCode, County | null> = (
  countyCode,
) => {
  const county = counties[countyCode];

  if (!county) return null;
  if (county.ISO === undefined || county.name === undefined) return null;

  return {
    code: countyCode,
    name: county?.name,
    ISO: county?.ISO,
  };
};
