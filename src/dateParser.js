import { isValidDate } from './utils';

const dateParser = (sexCode, birthdate) => {
    let year = birthdate.substr(0, 2);
    const month = birthdate.substr(2, 2);
    const day = birthdate.substr(4, 2);

    const centuryMapping = {
        1: '19',
        2: '19',
        3: '18',
        4: '18',
        5: '20',
        6: '20',
        7: year < 19 ? '20' : '19',
        8: year < 19 ? '20' : '19',
    };

    year = `${centuryMapping[sexCode]}${year}`;
    const date = new Date(year, month - 1, day);

    return isValidDate(year, month, day) ? date : new Date('');
};

const dateValidator = (date) => !isNaN(date);

export {
    dateParser as default,
    dateValidator,
};
