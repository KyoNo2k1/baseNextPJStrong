import useTrans from '@/shared/hooks/useTrans';
import { useGetDetailTeam } from '@/shared/schema/services/Team';
import { APP_REGEX } from "@/shared/utils/constants/appConfig";
import { Form, FormInstance, Input } from 'antd';
import React, { useEffect } from 'react';

type Props = {
  form: FormInstance;
  editId?: React.Key;
  viewOnly?: boolean;
};


// export default function FormMarket({ form, editId }: Props) {
export default function FormMarket ({ form, editId, viewOnly : _viewOnly }: Props) {
  const { trans } = useTrans();
  const { data } = useGetDetailTeam({ id: editId!, options: { enabled: editId !== undefined } });

  useEffect(() => {
    if (editId && data) {
      form.setFieldsValue(data);
    }
    return () => form.resetFields();
  }, [data, form, editId]);


  return (

    <div>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: trans.common.form.require },
            {
              pattern: APP_REGEX.RangeAllow(1, 256),
              message: trans.common.form.invalidLength
            }
          ]}
          className='col-span-3 lg:col-span-1'
        >
          <Input placeholder={"Team name..."}/>
        </Form.Item>
        <Form.Item
          name='description'
          label={"Description"}
          rules={[
            { required: true, message: trans.common.form.require },
            {
              pattern: APP_REGEX.RangeAllow(1, 256),
              message: trans.common.form.invalidLength
            }
          ]}
          className='col-span-3 lg:col-span-1'
        >
          <Input placeholder={"Description"}/>
        </Form.Item>
      {/* {
        viewOnly && <HistoryInput/>
      } */}
    </div>

  );
}
