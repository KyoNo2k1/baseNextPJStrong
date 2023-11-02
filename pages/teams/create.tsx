import DashBoardLayout from '@/shared/components/layouts/dashboard/DashboardLayout';
import useTrans from '@/shared/hooks/useTrans';
import { URLS } from '@/shared/utils/constants/appMenu';
import { Affix, Button, Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';
import FormMarket from '@/shared/components/business/team/FormTeam';
import { useCreateTeam } from '@/shared/schema/services/Team';
import DiscardContentWarning from '@/shared/components/common/DiscardContentWarning';
import PageTitle from '@/shared/components/common/PageTitle';
import AddDataToForm from '@/shared/components/common/AddDataToForm';
import { dummyITeamData } from '@/shared/schema/types/ITeam';

const CreateTeam = () => {
    const [form] = useForm()
    const { trans } = useTrans()
    const createMarket = useCreateTeam()

    function onFinish(value: any) {
        createMarket.mutate(value)
    }
    const [isDirty, setIsDirty] = useState(false)
    return (
        <div className='w-full p-4'>
            <Form
                onValuesChange={()=>setIsDirty(true)}
                autoComplete='false'
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
                                <PageTitle title={trans.menu.team}/>
                            </div>
                            <div className='space-x-2'>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    className='mr-2 '
                                    loading={createMarket.isLoading}
                                    onClick={() => setIsDirty(false)}
                                >
                                    {trans.common.save}
                                </Button>
                                <DiscardContentWarning url={URLS.TEAM} dirty={isDirty}/>
                            </div>
                        </div>
                    </Affix>
                </Form.Item>
                <FormMarket form={form}/>
                {
                    process.env.NODE_ENV === 'development'
                    && <AddDataToForm form={form} data={dummyITeamData[0]} />
                }
            </Form>
        </div>
    )
}


// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//
//     const shouldRedirect = await checkPermission({ permissionCodes: [PERMISSION_CODES.R_MARKET + '.' + PERMISSION_ACTIONS.CREATE] }, ctx.req.cookies[APP_SAVE_KEY.TOKEN_KEY])
//     return shouldRedirect
//         ? {
//             redirect: shouldRedirect
//         }
//         : { props: {} }
//
//   }

CreateTeam.getLayout = (children: React.ReactNode) => <DashBoardLayout >{children}</DashBoardLayout>
export default CreateTeam
