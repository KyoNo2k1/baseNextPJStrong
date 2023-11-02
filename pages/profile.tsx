import {useAppSelector} from '@/shared/hooks/useRedux';
import useTrans from '@/shared/hooks/useTrans';
import ViewProfile from "@/shared/components/business/user/ViewProfile";
import Head from "next/head";
import PageTitle from "@/shared/components/common/PageTitle";
import React, {useMemo} from "react";
import DashBoardLayout from "@/shared/components/layouts/dashboard/DashboardLayout";

const Profile = () => {
  const { user } = useAppSelector(state => state.appSlice);
  const {trans} = useTrans()
  const flatUserInfo = useMemo(()=>({...user , ...user?.attributes , userType : user?.attributes.userType}) , [user])

  return (
    <>
      <Head>
        <title>{trans.menu.profile}</title>
      </Head>
      <div className={'p-7'}>
        <PageTitle title={trans.page.profile} />
        <div className='pt-4'></div>
        <ViewProfile {...flatUserInfo} />
      </div>

    </>
  )
};


Profile.getLayout = (children: React.ReactNode) => (
  <DashBoardLayout contentClass='bg-white' >{children}</DashBoardLayout>
);
export default Profile;
