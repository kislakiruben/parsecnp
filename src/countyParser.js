import counties from "./countyList";
import { includes, keys } from "./utils";

const countyParser = (countyCode) => {
  const county = counties[countyCode];

  return {
    code: countyCode,
    name: county?.name,
    ISO: county?.ISO,
  };
};

const countyValidator = (countyCode) => includes(keys(counties), countyCode);

export { countyParser as default, countyValidator };
