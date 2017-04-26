import counties from './countyList';
import { includes, keys } from "./utils";

const countyParser = (countyCode) => {
    const county = {
        code: countyCode,
        name: counties[countyCode].name,
        ISO: counties[countyCode].ISO,
    };

    return county;
}

const countyValidator = (countyCode) => {
    return includes(keys(counties), countyCode);
}

export {
    countyParser as default,
    countyValidator,
};
