import { RangePickerProps } from 'antd/es/date-picker';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

export const disabledDateBeforeToday: RangePickerProps['disabledDate'] = current => {
  // Can not select days before today and today
  return current < dayjs().endOf('day');
};
export const disabledDate = (current: any) => {
  const customDate = dayjs().format('YYYY-MM-DD');
  return current && current < dayjs(customDate, 'YYYY-MM-DD');
};
export const disabledDateFrom = (current: any, fromDate: any) => {
  return current < fromDate;
};

export const formatTimeHour = ({ number, h = true, lang = 'en' }: { number: number; h?: boolean, lang?: string }): string => {
  const hours = Math.floor(number / 100);
  const minutes = number % 100;
  return h ? `${hours}:${minutes.toString().padStart(2, '0')}` : `${hours}${lang === 'en' ? 'h' : ' giờ'} ${minutes.toString().padStart(2, '0')}${lang === 'en' ? 'mins' : ' phút'}`;
};

export const convertFormatDate = (date: any) => {
  const formatStartDate = new Date(date);
  return formatStartDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const convertDayTypeString = ({ date, format = 'DD/MM/YYYY' }: { date: number | string; format?: string }) => {
  return dayjs(date?.toString(), 'YYYYMMDD').format(format);
};

export const convertFormatDateToTypeInteger = (date: any) => {
  return parseInt(dayjs(date).format('YYYYMMDD'), 10);
};

export const startDateDisableOption = (current: Dayjs, endDate?: Dayjs) =>
  current.isBefore(dayjs(), 'date') || (!!endDate && current.isAfter(endDate));
export const endDateDisableOption = (current: Dayjs, startDate?: Dayjs) =>
  current.isBefore(dayjs(), 'date') || (!!startDate && current.isBefore(startDate));
