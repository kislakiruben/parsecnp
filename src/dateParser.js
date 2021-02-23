import { isValidDate } from './utils';

const dateParser = (sexCode, birthdate) => {
    const centuryMapping = {
        1: '19',
        2: '19',
        3: '18',
        4: '18',
        5: '20',
        6: '20',
        7: '20',
        8: '20',
    };
    const month = birthdate.substr(2, 2);
    const day = birthdate.substr(4, 2);
    let year = `${centuryMapping[sexCode]}${birthdate.substr(0, 2)}`;
    if (year > (new Date()).getFullYear() - 14) year = `${year - 100}`
    const date = new Date(year, month - 1, day);

    return isValidDate(year, month, day) ? date : new Date('');
};

const dateValidator = (date) => !isNaN(date);

export {
    dateParser as default,
    dateValidator,
};
