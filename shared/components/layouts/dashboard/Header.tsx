import PageTitle from '@/shared/components/common/PageTitle';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useRedux';
import useTrans from '@/shared/hooks/useTrans';
import { useLogout } from '@/shared/schema/services/Auth';
import { toggleExpandDrawer } from '@/shared/stores/appSlice';
import { LockOutlined, LogoutOutlined, UserOutlined, BellOutlined, GlobalOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, Layout, Modal, theme as antTheme } from 'antd';
import classNames from 'classnames';
import { AlignJustifyIcon, BellRingIcon, ChevronDownIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import UserIcon from '../../icons/UserIcon';

const { Header } = Layout;

const RenderFlag = (language: string, size: number) => {
  const flagMap: {
    [key: string]: {
      src: string;
      text: string;
    };
  } = {
    vi: {
      src: '/vietnam.png',
      text: 'Việt Nam',
    },
    en: {
      src: '/united-kingdom.png',
      text: 'English',
    },
  };

  const flagSource = flagMap[language] || flagMap['vi'];

  return (
    <div className='flex items-center gap-2'>
      {flagSource.text}
      <Image src={flagSource.src} alt={flagSource.text} width={size} height={size} />
    </div>
  );
};

const HeaderComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { changeLanguage, lang, trans } = useTrans();

  const token = antTheme.useToken();
  const [openLogoutWarn, setOpenLogoutWarn] = useState(false);


  const { user } = useAppSelector(state => state.appSlice);
  const isSuperAdmin = useAppSelector(state => state.appSlice.isSupperAdmin);
  // const isAdminVNA = useAppSelector(state => state.appSlice.isAdmin) && user?.attributes.userType === 'VNA';
  const handleLogout = useLogout();

  const onActionClick = () => setOpenLogoutWarn(true);

  const expanded = useAppSelector(state => state.appSlice.isExpandDrawer);

  return (
    <Header className='layout-page-header bg-2' style={{ backgroundColor: token.token.colorBgContainer }}>
      <div className='lg:hidden' onClick={() => dispatch(toggleExpandDrawer(!expanded))}>
        <span
          id='sidebar-trigger'
          className='flex cursor-pointer items-center justify-center rounded-lg p-2 hover:bg-slate-200'
        >
          <AlignJustifyIcon />
        </span>
      </div>
      <div className='flex w-full justify-end overflow-auto pr-1 md:pr-4'>
        <div className='flex items-center gap-2 md:gap-6'>


          {(user?.attributes?.organization?.officeid || user?.attributes?.organization?.iatanumber) && (
            <div className='flex justify-center gap-2'>
              <div className='flex justify-center items-center'>
                <Image src='/images/icons/header/icon-office-iata.svg' alt='office id - iata' width={32} height={32} />
              </div>

              <div className='flex flex-col gap-1 pr-2 md:pr-4' style={{ borderRight: '1px solid #E3EBF1' }}>
                {user?.attributes?.organization?.officeid && (
                  <span className='leading-none text-[#535E71] text-xs '>
                    OfficeID : <span className={'font-bold uppercase text-xs text-black'}>{user?.attributes?.organization?.officeid}</span>
                  </span>
                )}
                {user?.attributes?.organization?.iatanumber && (
                  <span className='leading-none text-[#535E71] text-xs'>
                    IATA : <span className={'font-bold uppercase text-xs text-black'}>{user?.attributes?.organization?.iatanumber}</span>
                  </span>
                )}
                {/* only sub-agent , sub-ca , sub-gsa display above code */}
                {user?.attributes?.organization?.name && ['SUBCA','SUBAGENT'].includes(user?.attributes?.userType) && (
                  <span className='leading-none text-[#535E71] text-xs'>
                    {user?.attributes?.userType==='SUBCA'?'CA':'Agent'} : <span className={'font-bold uppercase text-xs text-black'}>{user?.attributes?.organization?.name}</span>
                  </span>
                )}
              </div>
            </div>
          )}

          <Dropdown
            className='mr-2 flex hidden items-center md:flex'
            placement='bottomRight'
            menu={{
              items: [
                {
                  key: '1',
                  label: <div>{trans.common.notification} 1</div>,
                },
                {
                  key: '2',
                  label: <div>{trans.common.notification} 2 </div>,
                },
              ],
            }}
          >
            <Badge count={2}>
              <BellRingIcon />
            </Badge>
          </Dropdown>

          <Dropdown
            placement='bottomRight'
            className='hidden md:flex'
            menu={{
              items: [
                {
                  key: 'vn',
                  label: <div>{trans.common.vi}</div>,
                  onClick: () => {
                    if (lang !== 'vi') changeLanguage('vi');
                  },
                },
                {
                  key: 'en',
                  label: <div>{trans.common.en}</div>,
                  onClick: () => {
                    if (lang !== 'en') changeLanguage('en');
                  },
                },
              ],
            }}
          >
            <div className='flex flex-row items-center gap-2'>
              <div className='flex flex-row items-center'>{lang && RenderFlag(lang, 24)}</div>
              <ChevronDownIcon size={16} />
            </div>
          </Dropdown>
          {/* Display on mobile */}
          {!isSuperAdmin ? (
            <Dropdown
              placement='bottomRight'
              className='flex md:hidden'
              menu={{
                items: [
                  {
                    key: '1',
                    icon: <UserOutlined />,
                    label: <span>{trans.menu.header.AccountInfo}</span>,
                    onClick: () => router.push('/profile'),
                  },
                  {
                    key: '2',
                    icon: (
                      <Badge size='small' count={2}>
                        <BellOutlined />
                      </Badge>
                    ),
                    label: (
                      <Dropdown
                        className='mr-2 flex flex items-center'
                        placement='bottomRight'
                        menu={{
                          items: [
                            {
                              key: '1',
                              label: <div>{trans.common.notification} 1</div>,
                            },
                            {
                              key: '2',
                              label: <div>{trans.common.notification} 2 </div>,
                            },
                          ],
                        }}
                      >
                        <p>Notification</p>
                      </Dropdown>
                    ),
                  },
                  {
                    key: '3',
                    icon: <GlobalOutlined />,
                    label: (
                      <Dropdown
                        placement='bottomRight'
                        className='flex'
                        menu={{
                          items: [
                            {
                              key: 'vn',
                              label: <div>{trans.common.vi}</div>,
                              onClick: () => {
                                if (lang !== 'vi') changeLanguage('vi');
                              },
                            },
                            {
                              key: 'en',
                              label: <div>{trans.common.en}</div>,
                              onClick: () => {
                                if (lang !== 'en') changeLanguage('en');
                              },
                            },
                          ],
                        }}
                      >
                        <div className='flex flex-row items-center'>
                          <div className='flex flex-row items-center'>{lang && RenderFlag(lang, 0)}</div>
                          <ChevronDownIcon size={16} />
                        </div>
                      </Dropdown>
                    ),
                  },

                  {
                    key: '5',
                    icon: <LockOutlined />,
                    label: <span>{trans.menu.header.ChangePass}</span>,
                    onClick: () => router.push('/change-password'),
                  },
                  {
                    key: '6',
                    icon: <LogoutOutlined />,
                    label: <span>{trans.menu.header.Logout}</span>,
                    onClick: () => onActionClick(),
                  },
                ],
              }}
            >
              <div className='min-h-50 flex cursor-pointer items-center justify-center gap-3'>
                <Avatar className='flex h-10 w-10 items-center justify-center'>
                  <UserIcon className='flex h-full w-full items-center justify-center' />
                </Avatar>

                <div className={'flex flex-col'}>
                  <span
                    className={classNames('ipad:hidden  h-max truncate text-ellipsis font-bold capitalize', {
                      'leading-none': user && user?.attributes?.shortname,
                    })}
                  >
                    {user && user?.username}
                  </span>
                  {user && user?.attributes?.shortname && (
                    <span className='ipad:hidden leading-2.5 text-xs  mt-1 h-max truncate text-ellipsis text-sm capitalize text-gray-400 '>
                      {user && user?.attributes.orgName}
                    </span>
                  )}
                </div>
                <ChevronDownIcon size={16} />
              </div>
            </Dropdown>
          ) : (
            <Dropdown
              placement='bottomRight'
              className='flex md:hidden'
              menu={{
                items: [
                  {
                    key: '1',
                    icon: <UserOutlined />,
                    label: <span>{trans.menu.header.AccountInfo}</span>,
                    onClick: () => router.push('/profile'),
                  },
                  {
                    key: '2',
                    icon: (
                      <Badge size='small' count={2}>
                        <BellOutlined />
                      </Badge>
                    ),
                    label: (
                      <Dropdown
                        className='mr-2 flex flex items-center'
                        placement='bottomRight'
                        menu={{
                          items: [
                            {
                              key: '1',
                              label: <div>{trans.common.notification} 1</div>,
                            },
                            {
                              key: '2',
                              label: <div>{trans.common.notification} 2 </div>,
                            },
                          ],
                        }}
                      >
                        <p>Notification</p>
                      </Dropdown>
                    ),
                  },
                  {
                    key: '3',
                    icon: <GlobalOutlined />,
                    label: (
                      <Dropdown
                        placement='bottomRight'
                        className='flex'
                        menu={{
                          items: [
                            {
                              key: 'vn',
                              label: <div>{trans.common.vi}</div>,
                              onClick: () => {
                                if (lang !== 'vi') changeLanguage('vi');
                              },
                            },
                            {
                              key: 'en',
                              label: <div>{trans.common.en}</div>,
                              onClick: () => {
                                if (lang !== 'en') changeLanguage('en');
                              },
                            },
                          ],
                        }}
                      >
                        <div className='flex flex-row items-center'>
                          <div className='flex flex-row items-center'>{lang && RenderFlag(lang, 0)}</div>
                          <ChevronDownIcon size={16} />
                        </div>
                      </Dropdown>
                    ),
                  },
                  {
                    key: '4',
                    icon: <LockOutlined />,
                    label: <span>{trans.menu.header.ChangePass}</span>,
                    onClick: () => router.push('/change-password'),
                  },
                  {
                    key: '5',
                    icon: <LogoutOutlined />,
                    label: <span>{trans.menu.header.Logout}</span>,
                    onClick: () => onActionClick(),
                  },
                ],
              }}
            >
              <div className='min-h-50 flex cursor-pointer items-center justify-center gap-3'>
                <Avatar className='flex h-10 w-10 items-center justify-center'>
                  <UserIcon className='flex h-full w-full items-center justify-center' />
                </Avatar>

                <div className={'flex flex-col'}>
                  <span
                    className={classNames('ipad:hidden  h-max truncate text-ellipsis font-bold capitalize', {
                      'leading-none': user && user?.attributes?.shortname,
                    })}
                  >
                    {user && user?.username}
                  </span>
                  {user && user?.attributes?.shortname && (
                    <span className='ipad:hidden leading-2.5 mt-1  text-xs h-max truncate text-ellipsis text-sm capitalize text-gray-400 '>
                      {user && user?.attributes.orgName}
                    </span>
                  )}
                </div>
                <ChevronDownIcon size={16} />
              </div>
            </Dropdown>
          )}
          {/* Display on pc */}
          <Dropdown
            placement='bottomRight'
            className='hidden md:flex'
            menu={{
              items: [
                {
                  key: '1',
                  icon: <UserOutlined />,
                  label: <span>{trans.menu.header.AccountInfo}</span>,
                  onClick: () => router.push('/profile'),
                },
                {
                  key: '2',
                  icon: <LockOutlined />,
                  label: <span>{trans.menu.header.ChangePass}</span>,
                  onClick: () => router.push('/change-password'),
                },
                {
                  key: '3',
                  icon: <LogoutOutlined />,
                  label: <span>{trans.menu.header.Logout}</span>,
                  onClick: () => onActionClick(),
                },
              ],
            }}
          >
            <div className='min-h-50 flex cursor-pointer items-center justify-center gap-3'>
              <Avatar className='flex h-10 w-10 items-center justify-center bg-slate-300'>
                <UserIcon className='flex h-full w-full items-center justify-center' />
              </Avatar>

              <div className={'flex flex-col'}>
                <span
                  className={classNames('ipad:hidden  h-max truncate text-ellipsis font-bold capitalize', {
                    'leading-none': user && user?.attributes?.shortname,
                  })}
                >
                  {user && user?.username}
                </span>
                {user && user?.attributes?.shortname && (
                  <span className='ipad:hidden leading-2.5 mt-1 h-max truncate text-ellipsis text-xs capitalize text-gray-400 '>
                    {user && user?.attributes.orgName}
                  </span>
                )}
              </div>
              <ChevronDownIcon size={16} />
            </div>
          </Dropdown>
        </div>
      </div>
      <Modal
        open={openLogoutWarn}
        confirmLoading={handleLogout.isLoading}
        onCancel={() => setOpenLogoutWarn(false)}
        footer={null}
      >
        <div className='text-center'>
          <PageTitle title={trans.common.logout} />
          <div className={'mt-4 space-x-2'}>
            <Button
              type='default'
              className='border-none bg-[#F3F6FA] px-10 py-2 font-medium text-primary'
              htmlType='button'
              disabled={handleLogout.isLoading}
              onClick={() => setOpenLogoutWarn(false)}
            >
              {trans.common.cancel}
            </Button>
            <Button
              type={'primary'}
              htmlType='submit'
              loading={handleLogout.isLoading}
              onClick={() => {
                // setOpenLogoutWarn(false);
                handleLogout.mutateAsync();
              }}
              className='border-none px-10 py-2 font-medium'
            >
              Logout
            </Button>
          </div>
        </div>
      </Modal>
    </Header>
  );
};

export default HeaderComponent;
