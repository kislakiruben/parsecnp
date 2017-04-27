import counties from './countyList';
import { includes, keys } from './utils';

const countyParser = (countyCode) => {
    return {
        code: countyCode,
        name: counties[countyCode].name,
        ISO: counties[countyCode].ISO,
    };
}

const countyValidator = (countyCode) => includes(keys(counties), countyCode);

export {
    countyParser as default,
    countyValidator,
};
