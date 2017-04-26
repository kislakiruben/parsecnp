const dateParser = (birthdate) => {
    const year = birthdate.substr(0, 2);
    const month = birthdate.substr(2, 2) - 1; // month is zero indexed
    const day = birthdate.substr(4, 2);
    const date = new Date(year, month, day);

    return date;
}

export { dateParser as default };
