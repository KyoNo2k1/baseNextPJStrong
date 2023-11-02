import PageTitle from "@/shared/components/common/PageTitle";
import DashBoardLayout from '@/shared/components/layouts/dashboard/DashboardLayout';
import useTrans from '@/shared/hooks/useTrans';
import {useChangePassword} from '@/shared/schema/services/Auth';
import {Button, Form, Input} from 'antd';
import Head from "next/head";
import {useRouter} from 'next/router';

const ChangePassword = () => {
  const router = useRouter();
  const changePassword = useChangePassword()
  const {trans} = useTrans()
  function handleChange(value: any) {
    changePassword.mutate({password: value})
  }

  return (
    <div className = 'relative p-7'>
      <Head>
        <title>{trans.page.auth.changeYourPass}</title>
      </Head>
      <PageTitle title={trans.menu.changePassword._}/>
      <Form
        layout='vertical'
        name='basic'
        size={'large'}
        onFinish={handleChange}
        autoComplete='off'
      >
        <Form.Item
          label={trans.menu.changePassword.currentPassword}
          name='currentPassword'
          rules={[{required: true, message: trans.common.form.requirePass}]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
          label={trans.menu.changePassword.newPassword}
          name='newPassword'
          rules={[{required: true, message: trans.common.form.requirePass},
              {min : 8 ,   message:trans.common.form.minAmountChar(8) }
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
          label={trans.menu.changePassword.confirmPassword}
          name='newPassword2'
          rules={[{required: true, message: trans.common.form.requirePass},
            ({getFieldValue}) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(trans.common.form.messDontMatch))
              }
            })
          ]}
        >
          <Input.Password/>
        </Form.Item>
        <div className='flex justify-center gap-4'>
          <Form.Item >
            <Button className='w-full' htmlType='reset' onClick={() => router.push("/")}>
              {trans.common.cancel}
            </Button>
          </Form.Item>
          <Form.Item >
            <Button className='w-full' type='primary' htmlType='submit' loading={false}>
              {trans.common.save}
            </Button>
          </Form.Item>
        </div>

      </Form>
    </div>
  );
};
ChangePassword.getLayout = (children: React.ReactNode) => <DashBoardLayout contentClass='bg-white'>{children}</DashBoardLayout>;
export default ChangePassword;
