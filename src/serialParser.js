const serialValidator = (serial) => {
  const num = parseInt(serial, 10);

  return !isNaN(num) && num > 0;
};

export { serialValidator };
