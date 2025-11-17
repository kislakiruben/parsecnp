import { isValidDate } from "./utils";

const CENTURY_MAP = {
  1: "19",
  2: "19",
  3: "18",
  4: "18",
  5: "20",
  6: "20",
  9: "19", // Foreign nationals / Not applicable (default to 19xx)
};
const dateParser = (sexCode, birthdate) => {
  const year = birthdate.substring(0, 2);
  const month = birthdate.substring(2, 4);
  const day = birthdate.substring(4, 6);
  const sexCodeStr = String(sexCode);
  const isResident =
    sexCodeStr === "7" || sexCodeStr === "8" || sexCodeStr === "9";
  const fullYear = `${isResident ? (year < new Date().getFullYear().toString().substring(2, 4) ? 20 : 19) : CENTURY_MAP[sexCode]}${year}`;
  const date = new Date(fullYear, month - 1, day, 0, 0, 0, 0);

  return isValidDate(fullYear, month, day) ? date : new Date("");
};
const dateValidator = (date) => !isNaN(date);

export { dateParser as default, dateValidator };
