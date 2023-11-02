import React from 'react';
import BlankLayout from '@/shared/components/layouts/BlankLayout';
import useTrans from '@/shared/hooks/useTrans';
import {useForgetPass} from '@/shared/schema/services/Auth';
import {useForm} from 'antd/lib/form/Form';
// import {useLogin} from '@/shared/schema/services/AppUser';
import {Button, Col, Form, Input, Row, Typography} from 'antd';
import {useRouter} from 'next/router';
import ChangeLanguage from '@/shared/components/layouts/ChangeLanguage';

const ForgotPassword = () => {
  const router = useRouter();
  const { trans } = useTrans();
  const [form] = useForm();
  const [isSendSuccess, setIsSendSuccess] = React.useState<boolean>(false);
  const forgotPass = useForgetPass(() => setIsSendSuccess(true));
  // const doLogin = useLogin();
  function handleLogin(value: any) {
    forgotPass.mutate(value);
  }

  return (
    <Row className='h-full w-full relative' align={'middle'} justify={'space-between'} gutter={24}>
      <Col className='m-0 h-full w-full p-0' span={12}>
        <div
          className='h-full w-full'
          style={{
            backgroundImage: `url("loginbg.jpg")`,
            backgroundOrigin: 'initial',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            opacity: 1,
          }}
        ></div>
      </Col>
      <Col span={11} >
        {isSendSuccess ? (
          <div className='max-w-[600px]'>
            <p className='my-[0px] text-[42px] font-bold'>Email Sent</p>
            <p className='text-[14px]'>
              An email with instructions on how to reset your password has been sent to {form.getFieldValue('email')}{' '}
              Check your spam or junk folder if you don’t see the email in your in your inbox
              <br /> If you no longer have access to this email account, please contact your administrator
            </p>
            <Button type='primary' className='w-full' onClick={() => router.push('/login')}>
              Back to Login
            </Button>
          </div>
        ) : (
          <Row gutter={[16, 16]} align={'middle'} className='max-w-[600px] '>
            <Col span={24}>
              <Row justify='space-between' align='middle'>
                <Typography.Title level={2} className=''>
                  {trans.page.auth.forgotPass}
                </Typography.Title>
                <p className='cursor-pointer underline' onClick={() => router.push('/login')}>
                  {trans.common.gobackHome}
                </p>
              </Row>
            </Col>
            <Col span={24} className='text-[14px]'>
              {trans.page.auth.descForgotPass}
            </Col>
            <Col span={24}>
              <Form
                name='basic'
                style={{ maxWidth: 600 }}
                onFinish={handleLogin}
                autoComplete='off'
                layout='vertical'
                size={'large'}
                form={form}
              >
                <Form.Item
                  name='username'
                  label={trans.page.users.userName}
                  rules={[
                    { required: true, message: trans.common.form.require },
                    { max: 20, message: trans.common.form.charMax20 },
                  ]}
                >
                  <Input placeholder={trans.page.users.userName} />
                </Form.Item>
                <Form.Item
                  name='email'
                  label={trans.page.agent.email}
                  rules={[
                    { required: true, message: trans.common.form.require },
                    { type: 'email', message: trans.common.form.invalidEmail },
                  ]}
                >
                  <Input placeholder={trans.page.agent.email} />
                </Form.Item>

                <Form.Item className='w-full'>
                  <Button className='w-full' type='primary' htmlType='submit' loading={forgotPass.isLoading}>
                    {trans.page.auth.emailMe}
                  </Button>
                </Form.Item>
              </Form>
            </Col>

          </Row>
        )}
      </Col>
      <div className='absolute bottom-4 right-6'>
        <ChangeLanguage placement='top'/>
      </div>
    </Row>

  );
};
ForgotPassword.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>;
export default ForgotPassword;
