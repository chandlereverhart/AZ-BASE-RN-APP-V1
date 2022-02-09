import { format, getTime, formatDistanceToNow, fromUnixTime } from "date-fns";

// ----------------------------------------------------------------------

export function fDate(date, customFormat) {
  const defaultFormat = "MMM d, yyyy";
  return format(new Date(date), !customFormat ? defaultFormat : customFormat);
}
export function fDateComp(date, customFormat) {
  const defaultFormat = "yyyy-mm-dd";
  return format(new Date(date), !customFormat ? defaultFormat : customFormat);
}

export function fDateTime(date) {
  return format(new Date(date), "dd MMM yyyy HH:mm");
}
export function fTimeShort(date) {
  return format(new Date(date), "h a");
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}
export function fDateTimeUnix(date) {
  return format(
    new Date(fromUnixTime(date.seconds).toISOString()),
    "MMMM dd, yyyy p"
  );
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
