import { useRouter } from 'next/router';
import React from 'react';

import FormTeam from '@/shared/components/business/team/FormTeam';
import PageTitle from '@/shared/components/common/PageTitle';
import DashBoardLayout from '@/shared/components/layouts/dashboard/DashboardLayout';
import useTrans from '@/shared/hooks/useTrans';
import { useGetDetailTeam } from '@/shared/schema/services/Team';
import { URLS } from '@/shared/utils/constants/appMenu';
import { Affix, Button, Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { ChevronLeftIcon } from 'lucide-react';
import Head from 'next/head';
import PageSingleton from '@/shared/components/layouts/PageSingleton';


const TeamManageDetail = ({ id }: { id: React.Key | undefined }) => {
  const [form] = useForm();
  const { trans } = useTrans();
  const router = useRouter();
  const { data, isLoading } = useGetDetailTeam({ id: id! });

  return (
    <PageSingleton isLoading={isLoading} data={data}>
      <div className='w-full p-4'>
        <Head>
          <title>{trans.menu.team}</title>
        </Head>
        <Affix offsetTop={0}>
          <div className='block justify-between py-2 bg-white space-y-4 lg:space-y-0 lg:flex'>
            <div className='text-2xl font-bold flex items-center'>
              <div className='hidden lg:block'>
                <Button
                  type={'text'}
                  onClick={() => {
                    router.push(URLS.TEAM);
                  }}>
                  <ChevronLeftIcon />
                </Button>
              </div>
              <PageTitle title={data?.name + ''} />
            </div>
            <div className='space-x-2 text-right'>

            </div>
          </div>
        </Affix>
        <Form
          autoComplete='false'
          preserve
          form={form}
          layout='vertical'
          labelWrap
          size='large'
          colon={false}
          scrollToFirstError
          disabled
        >
          <FormTeam form={form} editId={id as string} viewOnly />
        </Form>

      </div>
    </PageSingleton>
  );
};



TeamManageDetail.getLayout = (children: React.ReactNode) => <DashBoardLayout
  contentClass='bg-white'>{children}</DashBoardLayout>;


// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     const shouldRedirect = await checkPermission({ permissionCodes:[`${PERMISSION_CODES.R_MARKET}.${PERMISSION_ACTIONS.READ}`] }, ctx.req.cookies[APP_SAVE_KEY.TOKEN_KEY])
//     return shouldRedirect
//         ? {
//             props: {},
//             redirect: shouldRedirect
//         }
//         : { props: {id : ctx.query.id} }
// }

export default TeamManageDetail;
