import PageTitle from '@/shared/components/common/PageTitle';
import FilterInputRender from '@/shared/components/common/filterTable/FilterInputRender';
import DashBoardLayout from '@/shared/components/layouts/dashboard/DashboardLayout';
import useTrans from '@/shared/hooks/useTrans';
import { useGetListTeam } from '@/shared/schema/services/Team';
import { ITeam } from '@/shared/schema/types/ITeam';
import { URLS } from '@/shared/utils/constants/appMenu';
import { Button, Dropdown, Pagination, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ClipboardListIcon, Edit, MoreVertical, Trash2, UserMinus } from 'lucide-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';


type Props = {
  search?: Record<string, any>
}

const TeamManagement = ({ search }: Props) => {
  const {
    data,
    onChangeMultiParams,
    tableConfig,
    isLoading,
  } = useGetListTeam();

  const { trans } = useTrans();
  // const ability = useAbility(AbilityContext);

  const router = useRouter();
  const columns: ColumnsType<ITeam> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: _value => _value.slice(0, 4),
    },
    {
      title: "Name",
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: "Group",
      dataIndex: 'group',
      key: 'group',
      ellipsis: true,
    },
    {
      title: "Boss team",
      dataIndex: 'teamOwner',
      key: 'teamOwner',
      ellipsis: true,
    },
    {
      title: "Boss group",
      dataIndex: 'groupOwner',
      key: 'groupOwner',
      ellipsis: true,
    },
    {
      title: "Quantity member",
      dataIndex: 'quantityMember',
      key: 'quantityMember',
      ellipsis: true,
    },
    // {
    //   title: trans.common.createAt,
    //   dataIndex: 'createdTs',
    //   key: 'createdTs',
    //   render: (value) => <div>{dayjs(value).format(TIME_FORMAT)}</div>,
    // },
    // {
    //   title: trans.common.updateAt,
    //   dataIndex: 'lastModifiedTs',
    //   key: 'lastModifiedTs',
    //   render: (value) => <div>{dayjs(value).format(TIME_FORMAT)}</div>,
    // },

    {
      title: trans.common.action,
      key: 'action',
      render(_value, record) {
        return (
          <div onClick={(e) => {
            e.stopPropagation();
          }}>
            <Dropdown
              menu={{items :
                [
                  {
                    key: 1, label: <div className='flex items-center gap-4' onClick={() => {
                      router.push(URLS.TEAM + '/update/' + record.id);

                    }}><Edit size={16} />{trans.common.edit}</div>,
                  },
                  {
                    key: 2, label: <div className='flex items-center gap-4' onClick={() => {
                      router.push(URLS.TEAM + '/detail/' + record.id);
                    }}><ClipboardListIcon size={16} /> {trans.common.detail}</div>,
                  },
                  {
                    key: 3, label: <div className='flex items-center gap-4' ><Trash2 size={16} /> Close team</div>,
                  },
                  {
                    key: 4, label: <div className='flex items-center gap-4' ><UserMinus size={16} /> Remove boss team</div>,
                  }
                ]
              }}
              placement='bottomLeft'
              arrow
            >
              <Button type='text'>
                <MoreVertical />
              </Button>
            </Dropdown>
          </div>
        );
      },
    },
  ];
  const inputSearch: any[] = [
    {
      id: 1,
      property: 'name',
      label: 'Name',
      active: true,
      inputType: 'text',
      fieldType: 'STRING',
      operator: 'contains',
      value: search?.marketName,
    },
    // {
    //   id: 2,
    //   property: 'description',
    //   label: trans.page.marketManagement.description,
    //   active: true,
    //   inputType: 'text',
    //   fieldType: 'STRING',
    //   operator: 'contains',
    //   value: search?.description,
    // },
    //
    // {
    //   id: 4,
    //   property: 'status',
    //   label: trans.page.marketManagement.status,
    //   active: true,
    //   inputType: 'select',
    //   options: USER_STATUS_OPTIONS,
    //   fieldType: 'STRING',
    //   operator: '=',
    //   value: search?.status,
    // },
    // {
    //   id: 5,
    //   property: 'id',
    //   label: 'ID',
    //   active: false,
    //   inputType: 'text',
    //   fieldType: 'STRING',
    //   operator: 'contains',
    //   value: search?.id,
    // },
    // {
    //   id: 6,
    //   property: 'createdTs',
    //   label: [trans.common.updateAtFrom, trans.common.updateAtTo],
    //   active: false,
    //   inputType: 'date-range',
    //   fieldType: 'STRING',
    //   operator: '<>',
    //   value: search?.createdTs,
    // },
  ];
  const [inputs, setInputs] = useState<any[]>(inputSearch);
  useEffect(() => {
    setInputs(inputSearch);
  }, [trans]);

  return (
    <>
      <Head>
        <title>{trans.menu.team}</title>
      </Head>
      <div className='mb-4 flex justify-between text-2xl font-bold flex items-center' id='#tbCate'>
        <PageTitle title={trans.menu.team} />
        <div className='flex gap-4'>
          <Button
            type='primary'
            onClick={() => router.push(URLS.TEAM + '/create')}

          >
            {trans.common.create}
          </Button>

        </div>
      </div>
      <div className='my-4 border'>
        <FilterInputRender setInputs={setInputs} inputs={inputs}
                           searchFunction={(value) => onChangeMultiParams(value)} />
      </div>

      <Table
        columns={columns}
        dataSource={data?.data.map((item: any) => ({ ...item, key: item.id }))}
        pagination={false}
        scroll={{ x: 'max-content' }}
        loading={isLoading}
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(URLS.TEAM + '/detail/' + record.id);
            },
          };
        }}
      />

      <div className='mt-4 flex justify-between px-4'>
        <div>{trans.common.showElements(data?.data.length || 0, tableConfig.total || 0)}
        </div>
        <Pagination {...tableConfig} />
      </div>

    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const search = {
//     marketName : getFieldValueOnSearchParamServerSide('marketName' , ctx.query),
//     status : getFieldValueOnSearchParamServerSide('status' , ctx.query),
//     currencyid : getFieldValueOnSearchParamServerSide('currencyid' , ctx.query),
//     id : getFieldValueOnSearchParamServerSide('id' , ctx.query),
//     createdTs : getFieldValueOnSearchParamServerSide('createdTs' , ctx.query),
//   }
//   const shouldRedirect = await checkPermission({ permissionCodes: [PERMISSION_CODES.R_MARKET + '.' + PERMISSION_ACTIONS.READ] }, ctx.req.cookies[APP_SAVE_KEY.TOKEN_KEY])
//   return shouldRedirect
//       ? {
//           props: {search},
//           redirect: shouldRedirect
//       }
//       : { props: {search} }
//
// }

TeamManagement.getLayout = (children: React.ReactNode) => (
  <DashBoardLayout>{children}</DashBoardLayout>
);

export default TeamManagement;
