import useTrans from '@/shared/hooks/useTrans';
import { ConditionItem, InputSearch } from '@/shared/schema/shared-types/ISearchParams';
import { DATE_FORMAT } from '@/shared/utils/constants/appConfig';
import { cn } from '@/shared/utils/functions/tailwind';
import { Button, Checkbox, DatePicker, Drawer, Form, Input, Select, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import dayjs from 'dayjs';
import { PlusIcon } from 'lucide-react';
import React, { SetStateAction, useState } from 'react';
import {useRouter} from "next/router";

type Props = {
  inputs: InputSearch[];
  setInputs: React.Dispatch<SetStateAction<InputSearch[]>>;
  searchFunction: (value: any) => void;
  onReset?: () => void;
};

function RenderInput({ input }: { input: InputSearch }) {
  const {dateLang} = useTrans()
  switch (input.inputType) {
    case 'text':
    case 'number':
      return (
        <Form.Item initialValue={input.value} name={input.property} className={cn('w-full', input.className)}>
          <Input placeholder={input.label as string} allowClear className='w-full' />
        </Form.Item>
      );
      break;
    case 'select':
      return (
        <Form.Item  name={input.property} className={cn('w-full', input.className)} initialValue={input.value}>
          <Select
            disabled={input.disable}
            onSelect={(value, _option)=>input.onChange && input.onChange(value)}
            placeholder={`${input.label}`}
            allowClear className='w-full'
            options={input.options}
            showSearch
            optionFilterProp='label'
          />
        </Form.Item>
      );
    case 'date':
      return (
        <Form.Item name={input.property} className={cn('w-full', input.className)} initialValue={input.value}>
          <DatePicker  locale={dateLang} placeholder={`${input.label}`} allowClear className='w-full' />
        </Form.Item>
      );
    case 'date-range':
      return (
        <Form.Item
          name={input.property}
          className={cn('col-span-2 w-full', input.className)}
          initialValue={input.value ? [dayjs(input.value?.[0]), dayjs(input.value?.[1])] : undefined}
        >
          <DatePicker.RangePicker   locale={dateLang}
            className='w-full'
            allowClear
            format={DATE_FORMAT}
            placeholder={[input.label?.[0], input.label?.[1]]}
          />
        </Form.Item>
      );
    default:
      break;
  }
}

export default function FilterInputRender({ inputs, searchFunction, setInputs, onReset  }: Props) {
  const { trans } = useTrans();
  const [form] = useForm();
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  function selectAll() {
    setInputs(inputs =>
      inputs.map(item => {
        item.active = true;
        return item;
      }),
    );
  }

  function clearAll() {
    setInputs(input =>
      input.map(item => {
        item.active = false;
        return item;
      }),
    );
  }

  function convertFormValueToInputs(value: Record<string, any>) {
    const arrFilter: ConditionItem[] = [];
    inputs.forEach(itemA => {
      if (itemA.operator === '<>') {
        arrFilter.push(
          {
            operator: '>=',
            property: itemA.property,
            value: value && value[itemA.property]?.[0],
          },
          {
            operator: '<=',
            property: itemA.property,
            value: value && value[itemA.property]?.[1],
          },
        );
      } else {
        arrFilter.push({
          operator: itemA.operator,
          property: itemA.property,
          value: value && value[itemA.property],
        });
      }
    });

    return arrFilter;
  }

  return (
    <Form
      size='large'
      form={form}
      onFinish={value => {
        searchFunction(convertFormValueToInputs(value));
      }}
      className='rounded-lg border border-solid border-gray-300 p-4'
    >
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4  '>
        {inputs
          .filter(item => item.active)
          .map(item => (
            <RenderInput input={item} key={item.id} />
          ))}
        <Button onClick={() => setOpen(true)} className={'flex w-max items-center'}>
          {trans.common.filterMore} &nbsp;
          <PlusIcon />
        </Button>

        <Drawer
          title={trans.common.listFilter}
          placement={'right'}
          width={500}
          onClose={() => setOpen(false)}
          open={isOpen}
          extra={
            <Space>
              <Button onClick={clearAll}>{trans.common.deleteFilter}</Button>
              <Button type='primary' onClick={selectAll}>
                {trans.common.selectAll}
              </Button>
            </Space>
          }
        >
          <div className='flex flex-col gap-2'>
            {inputs.map(item => (
              <Checkbox
                className='relative'
                key={item.id}
                checked={item.active}
                onClick={() => {
                  setInputs(
                    inputs.map(tmp => {
                      if (tmp.id === item.id) {
                        tmp.active = !tmp.active;
                      }
                      return tmp;
                    }),
                  );
                }}
              >
                {' '}
                {Array.isArray(item.label) ? item.label.join(' - ') : item.label}
              </Checkbox>
            ))}
          </div>
        </Drawer>
      </div>
      <div className='flex justify-end '>
        <Form.Item>
          <Space>
            <Button htmlType='reset' onClick={()=>{ onReset ? onReset() : router.push({query:{page:0}})}}>
              {trans.common.reset}
            </Button>
            <Button type='primary' htmlType='submit'>
              {trans.common.search}
            </Button>
          </Space>
        </Form.Item>
      </div>
    </Form>
  );
}
