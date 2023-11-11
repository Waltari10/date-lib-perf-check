import {
  format,
  parse,
  set,
} from "date-fns";
import moment from "moment";
import momentTZ from "moment-timezone";
import * as luxon from 'luxon'


export const padWithZero = (number: number): string =>
  number < 10 ? `0${number}` : `${number}`;

const DATE_FNS_DATE_STRING_FORMAT = "yyyy-MM-dd";
const MOMENT_DATE_STRING_FORMAT = "YYYY-MM-DD";

const dateStringToDateDateJSDate = (
  date: Date | number,
) => {
  const parsedDate: Date = typeof date === "number" ? new Date(date) : date;

  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1; // Months are 0 indexed
  const day = parsedDate.getDate();

  return `${year}-${padWithZero(month)}-${padWithZero(day)}`;
};


const measurePerformance = (fn: () => void, name: string) => {
  const start = Date.now();
  for (let i = 0; i < 10000; i++) {
    fn();
  }
  console.log(name, Date.now() - start)
}

measurePerformance(() => dateStringToDateDateJSDate(new Date()), "JS DATE")

momentTZ(new Date())
.format(MOMENT_DATE_STRING_FORMAT)
moment(new Date())
.format(MOMENT_DATE_STRING_FORMAT)


measurePerformance(() => moment(new Date())
.format(MOMENT_DATE_STRING_FORMAT), "MOMENT")

measurePerformance(() => momentTZ(new Date())
.format(MOMENT_DATE_STRING_FORMAT), "MOMENT TZ")



measurePerformance(() => format(new Date(), DATE_FNS_DATE_STRING_FORMAT), "DATE_FNS")


measurePerformance(() => luxon.DateTime.fromJSDate(new Date()).toISODate(), "LUXON")


