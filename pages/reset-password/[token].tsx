import React from 'react';
import BlankLayout from '@/shared/components/layouts/BlankLayout';
import useTrans from '@/shared/hooks/useTrans';
import { useChangePasswordForgot } from '@/shared/schema/services/Auth';
import { useForm } from 'antd/lib/form/Form';
// import {useLogin} from '@/shared/schema/services/AppUser';
import { Button, Col, Form, Input, Row } from 'antd';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import PageTitle from "@/shared/components/common/PageTitle";

const ResetPassword = ({ isExpired, token }: { isExpired: boolean; token: string }) => {
  const router = useRouter();
  const { trans } = useTrans();
  const [form] = useForm();
  const changePassForgot = useChangePasswordForgot();
  function handleChangePass(value: any) {
    changePassForgot.mutate({ password: value.password, token });
  }

  return (
    <Row className='h-full w-full' align={'middle'} justify='center' gutter={24}>
      <Col span={8}>
        <Row gutter={[16, 16]} align={'middle'}>
          <Col span={24}>
            <Row justify='space-between' align='middle'>
              <PageTitle title={trans.page.auth.resetPass}></PageTitle>
            </Row>
          </Col>
          {isExpired ? (
            <>
              <p>
                Sorry, this Reset password link is not valid. Please{' '}
                <span className='cursor-pointer underline' onClick={() => router.push('/forgot-password')}>
                  request another one.
                </span>
              </p>
            </>
          ) : (
            <>
              <Col span={24} className='text-[14px]'>
                {trans.page.auth.desResetPass}
              </Col>
              <Col span={24}>
                <Form
                  name='basic'
                  style={{ maxWidth: 600 }}
                  onFinish={handleChangePass}
                  autoComplete='off'
                  layout='vertical'
                  form={form}
                >
                  <Form.Item
                    name='password'
                    label={trans.page.auth.newPass}
                    rules={[
                      { required: true, message: trans.common.form.require },
                      {
                        min: 8,
                        message: trans.common.form.minChar,
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name='confirm'
                    label={trans.page.users.confirmPassword}
                    dependencies={['password']}
                    rules={[
                      {
                        required: true,
                        message: trans.common.form.confirmPass,
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error(trans.common.form.messDontMatch));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item className='w-full'>
                    <Button className='w-full' type='primary' htmlType='submit' loading={false}>
                      {trans.page.auth.change}
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </>
          )}
        </Row>
      </Col>
    </Row>
  );
};
ResetPassword.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>;
export default ResetPassword;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const token = ctx.query.token;
  const body = {token : token}
  const res = await fetch(`${process.env.NEXT_PUBLIC_DEV_API_URL}/public/v1/user/forgot-password-expired`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const status = await res.status;
  /* TODO : !== 200 is right wait backend fix */
  const isExpired = status !== 200
  return {
    props: {
      isExpired,
      token,
    },
  };
};
