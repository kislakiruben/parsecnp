const serialValidator = (serial) => {
  if (!/^\d{3}$/.test(serial)) return false;

  const num = parseInt(serial, 10);

  return !isNaN(num) && num > 0 && num <= 999;
};

export { serialValidator };
