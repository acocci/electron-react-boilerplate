import { addHours, differenceInSeconds, isValid, parseISO, subHours } from 'date-fns';
import { format, zonedTimeToUtc } from 'date-fns-tz';

export const diffInSeconds = (currentDate: string, formerDate: string) => {
  const current = parseISO(currentDate);
  const former = parseISO(formerDate);
  if (!isValid(new Date(current)) || !isValid(new Date(former))) return 0;
  return differenceInSeconds(current, former);
};

export function getTimezoneOffset(date: Date) {
  const offset = date.getTimezoneOffset() / 60;
  if (Math.sign(offset) === 0) return date;
  if (Math.sign(offset) === 1) {
    return subHours(date, offset);
  }
  return addHours(date, offset * -1);
}

export const formatUTCDate = (date: Date | string, utc?: boolean) => {
  const toDate = new Date(date);
  if (!isValid(toDate)) return '';
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const utcDate = zonedTimeToUtc(toDate, timeZone);
  // ex: Mar. 27, 2023 11:37 p.m.
  return `${format(utcDate, 'MMM. dd, yyyy h:mm aaaa')}${utc ? ' (UTC)' : ''}`;
};

export const formatUTCDateWithSeconds = (date: Date | string, utc?: boolean) => {
  const toDate = new Date(date);
  if (!isValid(toDate)) return '';
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const utcDate = zonedTimeToUtc(toDate, timeZone);
  // ex: Mar. 27, 2023 11:37 p.m.
  return `${format(utcDate, 'MMM. dd, yyyy h:mm:ss aaaa')}${utc ? ' (UTC)' : ''}`;
};

export const parseISODate = (date: string) => {
  const parsed = parseISO(date);
  if (!isValid(new Date(parsed))) return '';
  return new Date(parsed);
};
