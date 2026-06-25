import countyList from "../countyList";
import type { County } from "../types";

const normalizeCountyCode = (countyCode: string): string => {
  const normalized = parseInt(countyCode, 10);
  return Number.isNaN(normalized) ? countyCode : String(normalized);
};

export function parseCounty(countyCode: string): County | null {
  const county =
    countyList[countyCode] || countyList[normalizeCountyCode(countyCode)];
  if (!county || (county.name === undefined && county.ISO === undefined)) {
    return null;
  }
  if (county.name === undefined || county.ISO === undefined) {
    return { code: countyCode, name: county.name, ISO: county.ISO } as County;
  }
  return { code: countyCode, name: county.name, ISO: county.ISO };
}
