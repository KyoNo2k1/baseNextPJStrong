import React from 'react';
import { Button, Result } from 'antd';
import Link from 'next/link';
import useTrans from '@/shared/hooks/useTrans';
import { HashLoader } from 'react-spinners';

interface PageProps {
  isLoading: boolean;
  data: any;
  children: React.ReactNode;
}

function PageSingleton(props: PageProps) {
  const { trans } = useTrans();
  if (props.isLoading)
    return (
      <div className='flex h-[100vh] w-full items-center justify-center'>
        <HashLoader color='#016390' />
      </div>
    );

  if (!props.isLoading && !props.data)
    return (
      <Result
        status='404'
        title='404'
        subTitle={trans.page[404].pageTitle}
        extra={
          <Button type='primary'>
            <Link href={'/'}>{trans.common.gobackHome}</Link>{' '}
          </Button>
        }
      />
    );
  return props.children;
}

export default PageSingleton;
