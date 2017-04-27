const includes = (array, item) => array.includes(item);

const keys = (collection) => Object.keys(collection);

const isValidDate = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    const yearIsValid = parseInt(year, 10) === date.getFullYear();
    const monthIsValid = parseInt(month, 10) === date.getMonth() + 1;
    const dayIsValid = parseInt(day, 10) === date.getDate();

    return yearIsValid && monthIsValid && dayIsValid;
}

export { includes, isValidDate, keys };
