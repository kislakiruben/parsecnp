const SEX_ISO_CODE = {
    0: 'not kwown',
    1: 'male',
    2: 'female',
    9: 'not applicable',
};

const sexMapping = {
    1: SEX_ISO_CODE[1],
    2: SEX_ISO_CODE[2],
    3: SEX_ISO_CODE[1],
    4: SEX_ISO_CODE[2],
    5: SEX_ISO_CODE[1],
    6: SEX_ISO_CODE[2],
    7: SEX_ISO_CODE[1],
    8: SEX_ISO_CODE[2],
    9: SEX_ISO_CODE[9],
};

const sexParser = (sexCode) => {
    return sexMapping[sexCode] || SEX_ISO_CODE[0];
}

export { sexParser as default };
