import counties from "./countyList";

const normalizeCountyCode = (countyCode) => {
  const normalized = parseInt(countyCode, 10);

  return Number.isNaN(normalized) ? countyCode : String(normalized);
};

const countyParser = (countyCode) => {
  const county = counties[countyCode] || counties[normalizeCountyCode(countyCode)];

  return {
    code: countyCode,
    name: county?.name,
    ISO: county?.ISO,
  };
};

const countyValidator = (countyCode) => {
  return Boolean(counties[countyCode] || counties[normalizeCountyCode(countyCode)]);
};

export { countyParser as default, countyValidator };
