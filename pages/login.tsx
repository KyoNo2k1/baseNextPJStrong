import BlankLayout from '@/shared/components/layouts/BlankLayout';
import {Button, Card, Checkbox, Form, Input, Modal} from 'antd';
import Link from 'next/link';
import {useLogin} from '@/shared/schema/services/Auth';
import useTrans from '@/shared/hooks/useTrans';
import {ReloadOutlined} from '@ant-design/icons';
import {useState} from 'react';
import ChangeLanguage from '@/shared/components/layouts/ChangeLanguage';
import PageTitle from "@/shared/components/common/PageTitle";
import Image from "next/image";


function generateRandomCaptcha() {
  const captchaLength = 6; // Số lượng ký tự captcha
  let captcha = '';
  const characters = 'Thequickbrownfoxjumpsoverthelazydog' + 'Thequickbrownfoxjumpsoverthelazydog'.toUpperCase() + '0123456789' + '@#$%^&*(()'; // Các ký tự có thể xuất hiện trong captcha

  for (let i = 0; i < captchaLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    captcha += characters[randomIndex];
  }
  return captcha;
}

const Login = () => {
  const doLogin = useLogin();
  const {trans} = useTrans();

  function handleLogin(value: any) {
    doLogin.mutate(value);
  }

  const [captcha, reload] = useState(generateRandomCaptcha);
  return (
    <div className='relative h-full flex-col items-center justify-center md:grid container lg:grid-cols-2 lg:px-0'>

      <div className='relative md:h-full flex-col bg-muted px-10 hidden lg:flex text-[#f5f5f5]'>
        <div className='relative object-contain w-full h-full '>
          <Image src='/loginbg.jpg' quality={100} fill
                 alt='logo'></Image>
        </div>

        <div className='relative hidden md:block z-20 mt-auto pb-4'>
          <p className='text-lg'>{trans.page.login.copyright} &copy; Vdone 2023</p>
        </div>
      </div>

      <div className='py-8 lg:py-0 lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 '>
          <div className='font-bold text-3xl text-center w-full'>{trans.page.login._}</div>
          <Card size='default' className='p-6'>
            <Form
              name='loginForm'
              layout='vertical'
              // style={{maxWidth: 600}}
              onFinish={handleLogin}
              autoComplete='off'
            >
              <Form.Item
                label={trans.page.login.userName}
                name='username'
                rules={[{required: true, message: trans.common.form.require}]}
              >
                <Input size='large'/>
              </Form.Item>

              <Form.Item
                label={trans.page.login.pass}
                name='password'
                rules={[{required: true, message: trans.common.form.require}]}
              >
                <Input.Password size='large' autoComplete={'current-password'}/>
              </Form.Item>

              {/* Catcha */}
              {(doLogin.error as any)?.response?.data?.failedLogin >= 3 && <><Form.Item>
                <div className='flex gap-4 w-full items-center'>
                  <Input disabled size='large'
                         className={'!select-none !italic  !text-2xl !tracking-widest !font-semibold !font-mono !rounded-none'}
                         value={captcha}/>
                  <Button onClick={() => reload(generateRandomCaptcha())}>
                    <ReloadOutlined/>
                  </Button>
                </div>
              </Form.Item>
                <Form.Item label={trans.page.login.captcha}
                           name='captcha'
                           rules={
                             [
                               {
                                 required: true,
                                 message: trans.common.form.require,
                               },
                               () => ({
                                 validator(_, value) {
                                   if (!value || captcha === value) {
                                     return Promise.resolve();
                                   }
                                   return Promise.reject(new Error(trans.page.login.incorrectCaptcha));
                                 },
                               }),
                             ]
                           }

                >
                  <Input size='large'/>
                </Form.Item>
              </>
              }
              {/* MODAL warning block account */}
              {
                <Modal
                  open={(doLogin.error as any)?.response?.data?.error === 'AccountLocked'}
                  title={
                    <PageTitle title={trans.common.notify.blockTitle} className={'text-center'}/>
                  }
                  onOk={() => doLogin.reset()}

                  footer={null}
                >
                  <p className='mb-[32px]'>{trans.common.notify.blockDes}</p>
                  <div className='w-full space-x-2 text-center'>
                    <Button type='primary' onClick={() => doLogin.reset()}>
                      {trans.common.confirm}
                    </Button>
                  </div>
                </Modal>
              }
              {/* End captcha */}
              <div className={'flex justify-between items-center'}>
                <Form.Item name='remember' valuePropName='checked'>
                  <Checkbox>{trans.page.login.remember}</Checkbox>
                </Form.Item>
                <Link href={'/forgot-password'} className='mb-5 '>
                  {trans.page.login.forgotPass}
                </Link>
              </div>

              <Form.Item className='w-full'>
                <Button className='w-full' type='primary' htmlType='submit' loading={doLogin.isLoading}>
                  {trans.page.login.submit}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>

      <div className='absolute bottom-10 right-6'>
        <ChangeLanguage placement={'top'}/>
      </div>
    </div>
  );
};

Login.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>;
export default Login;
