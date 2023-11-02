import useTrans from '@/shared/hooks/useTrans';
import { DatePicker, Form, FormInstance } from 'antd';
import { useWatch } from "antd/lib/form/Form";
import { Dayjs } from "dayjs";
import { useEffect } from 'react';

type Props = {
  startDateName?: string|any[],
  startDateLabel?: string,
  startDateDisableOption?: (date: Dayjs, endDate?: Dayjs) => boolean,
  endDateName?: string|any[],
  endDateLabel?: string;
  endDateDisableOption?: (date: Dayjs, startDate?: Dayjs) => boolean,
  form?: FormInstance
  disableChooseStartDate? : boolean
}

/**
 * @description follow thông thường start date mặc định là ngày hiện tại , endDate nếu không chọn thì hiệu lực sẽ là vĩnh viễn
 * */
export default function DateRangeInput({ startDateName =  "startdate", endDateName = "enddate", startDateDisableOption, endDateDisableOption, form  ,disableChooseStartDate}: Props) {
  const { trans , dateLang } = useTrans()
  const startDate = useWatch(startDateName, form)
  const endDate = useWatch(endDateName, form)

  useEffect(() => {
    if (startDate && endDate) {
      if (startDate?.isAfter(endDate)) {
        form?.setFields([{ name: startDateName, errors: [trans.common.form.startDateAfterEndDate] }])
        form?.setFields([{ name: endDateName, errors: [trans.common.form.endDateBeforeStartDate] }])
      } else {
        form?.setFields([{ name: startDateName, errors: [] }])
        form?.setFields([{ name: endDateName, errors: [] }])
      }
    }
  }, [startDate, endDate])
  const disabledDateFrom = (current:any) => {
    return current < startDate
}
  return (
    <>
      <Form.Item
        name={startDateName}
        label={trans.common.startDate}
        rules={[{ required: false, message: trans.common.form.require }]}
      >
        <DatePicker
          locale={dateLang}
          disabled={disableChooseStartDate}
          format={'DD/MM/YYYY'}
          allowClear
          disabledDate={date => startDateDisableOption?.(date, endDate) || false}
          placeholder={'dd/mm/yyyy'}
          className='w-full'
        ></DatePicker>
      </Form.Item>

      <Form.Item
        name={endDateName}
        label={trans.common.endDate}
        rules={[{ required: false, message: trans.common.form.require }]}
      >
        <DatePicker
          locale={dateLang}
          format={'DD/MM/YYYY'}
          disabled={!startDate}
          allowClear
          disabledDate={date => endDateDisableOption?.(date, startDate) || disabledDateFrom(date)}
          placeholder={'dd/mm/yyyy'}
          className='w-full'
        ></DatePicker>
      </Form.Item>
    </>
  );
}
