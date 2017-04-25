import counties from './countyList';

const countyParser = (countyCode) => {
    const county = {
        code: countyCode,
        name: counties[countyCode].name,
        ISO: counties[countyCode].ISO,
    };

    return county;
}

export { countyParser as default };
