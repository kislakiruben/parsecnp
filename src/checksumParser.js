const CONSTANT = "279146358279";
const checksumValidator = (cnp, checksum) => {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnp[i], 10) * parseInt(CONSTANT[i], 10);
  }
  const computedChecksum = sum % 11;
  const validator = computedChecksum === 10 ? 1 : computedChecksum;

  return parseInt(checksum, 10) === validator;
};

export { checksumValidator };
