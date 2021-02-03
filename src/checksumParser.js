const checksumValidator = (cnp, checksum) => {
    const CONSTANT = '279146358279';
    const reducer = cnp.split('').reduce((accumulator, value, index) => {
        return accumulator + value * CONSTANT.charAt(index);
    }, 0);
    const computedChecksum = reducer % 11;
    const validator = (computedChecksum === 0 || computedChecksum === 10) ? 1 : computedChecksum;

    return parseInt(checksum, 10) === validator;
}

export { checksumValidator };
