import React, { useEffect, useState } from 'react';
// import {GetServerSideProps} from 'next';
import DashBoardLayout from '@/shared/components/layouts/dashboard/DashboardLayout';
import { URLS } from '@/shared/utils/constants/appMenu';
import { useForm } from 'antd/lib/form/Form';
import useTrans from '@/shared/hooks/useTrans';
import FormTeam from '@/shared/components/business/team/FormTeam';
import { Affix, Button, Form } from 'antd';
import { useGetDetailTeam, useUpdateTeam } from '@/shared/schema/services/Team';
import DiscardContentWarning from '@/shared/components/common/DiscardContentWarning';
import PageTitle from '@/shared/components/common/PageTitle';
import PageSingleton from '@/shared/components/layouts/PageSingleton';


const TeamManageUpdate = ({ editId }: { editId: React.Key | undefined })=>{
    const [form] = useForm()
    const { trans } = useTrans()
    const updateMarket = useUpdateTeam()
    function onFinish(value: any) {
        updateMarket.mutate({team: value, id: editId!})
    }
    const [isDirty, setIsDirty] = useState(false)
    const { data, isLoading } = useGetDetailTeam({ id: editId!, options: { enabled: editId !== undefined } });
    useEffect(() => {
        if (editId && data) {
          form.setFieldsValue(data);
        }
        return () => form.resetFields();
      }, [data, form, editId]);
    return (
        <div className='w-full p-4'>
            <PageSingleton isLoading={isLoading} data={data}>
                <Form
                    autoComplete='false'
                    onValuesChange={()=>setIsDirty(true)}
                    preserve
                    form={form}
                    onFinish={onFinish}
                    layout='vertical'
                    labelWrap
                    size='large'
                    colon={false}
                    scrollToFirstError
                >
                    <Form.Item className='col-span-3 mobile:col-span-1 ipad:col-span-2 '>
                        <Affix offsetTop={0}>
                            <div className='block justify-between py-2 bg-white space-y-4 lg:space-y-0 lg:flex'>
                                <div className='text-2xl font-bold flex items-center'>
                                    <div className='hidden lg:block'>
                                        <DiscardContentWarning isBack={true} url={URLS.TEAM} dirty={isDirty}/>
                                    </div>
                                    <PageTitle title={data?.name + ""}/>
                                </div>
                                <div className='space-x-2'>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        className='mr-2 '
                                        loading={updateMarket.isLoading}
                                    >
                                        {trans.common.save}
                                    </Button>
                                    <DiscardContentWarning url={URLS.TEAM} dirty={isDirty}/>
                                </div>
                            </div>
                        </Affix>
                    </Form.Item>
                <FormTeam form={form} editId={editId as string} />
                </Form>
            </PageSingleton>
        </div>
    )
}




TeamManageUpdate.getLayout = (children: React.ReactNode) => <DashBoardLayout contentClass='bg-white'>{children}</DashBoardLayout>




export default TeamManageUpdate
