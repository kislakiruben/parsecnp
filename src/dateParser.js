import { isValidDate } from './utils';

const CENTURY_MAP = {
    1: '19',
    2: '19',
    3: '18',
    4: '18',
    5: '20',
    6: '20',
};
const dateParser = (sexCode, birthdate) => {
    const year = birthdate.substr(0, 2);
    const month = birthdate.substr(2, 2);
    const day = birthdate.substr(4, 2);
    const isResident = sexCode === 7 || sexCode === 8;
    const fullYear = `${isResident ? year < new Date().getFullYear().toString().substr(2, 2) ? 20 : 19 : CENTURY_MAP[sexCode]}${year}`;
    const date = new Date(fullYear, month - 1, day, 0, 0, 0, 0);

    return isValidDate(fullYear, month, day) ? date : new Date('');
};
const dateValidator = (date) => !isNaN(date);

export {
    dateParser as default,
    dateValidator,
};
