import counties from "./countyList";

const countyParser = (countyCode) => {
  const county = counties[countyCode];

  return {
    code: countyCode,
    name: county?.name,
    ISO: county?.ISO,
  };
};

const countyValidator = (countyCode) => {
  return Object.keys(counties).includes(countyCode);
};

export { countyParser as default, countyValidator };
