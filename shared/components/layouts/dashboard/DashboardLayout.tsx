import { useAppSelector } from '@/shared/hooks/useRedux';
import {toggleExpandDrawer} from '@/shared/stores/appSlice';
import { menuListMock } from '@/shared/utils/constants/appMenu';
import { Affix, Drawer, Layout, theme as antTheme } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import HeaderComponent from './Header';
import MenuComponent from './Menu';
import {useAbility} from '@casl/react';
import {AbilityContext} from '@/pages/_app';
import {MenuItem} from "@/shared/schema/shared-types/IMenu";
import Image from 'next/image';


const { Sider, Content } = Layout;
function findFilteredMenu(ability: any ) {
  /**
   *
   * @param permission like [R_USER.READ , A_BOOKING.READ]
   */
  function checkItem(permission: string[] | undefined) {
    if (permission) {
      return !permission.some(per=> {
        const rObject = per.split('.')?.[0]
        const rAction = per.split('.')?.[1]
        return !ability.can( rAction, rObject)
      })
    } else return true
  }
  const result: MenuItem[] = [];
  menuListMock.forEach(item => {
    if (item.children) {
      const tmp = { ...item }
      tmp.children = item.children.filter((children:MenuItem) => {
          return checkItem(children.permission)
      })
      result.push(tmp)
    } else {
      if (item.permission) {
        if (checkItem(item.permission)) result.push(item)
        return
      } else result.push(item)

    }
  })
  return result
}
const DashBoardLayout = ({
  children,breadcrumb,contentClass = 'bg-white'
}: {
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
  contentClass?: string;
}) => {
  const router = useRouter();
  const [openKey, setOpenkey] = useState<string>();
  const [selectedKey, setSelectedKey] = useState<string>(router.pathname);
  const token = antTheme.useToken();
  const {isCollapseMenu : collapsed , isExpandDrawer :expandedDrawer } = useAppSelector(state => state.appSlice);
  // const isSupperAdmin = useAppSelector(state=>state.appSlice.isSupperAdmin)
  const dispatch = useDispatch();
  useEffect(() => {
    if (!collapsed) {
      setOpenkey('/'+router.pathname.split('/')[1]);
    }
    // only get 2 level
    const first = router.pathname.split('/')[1];
    const second = router.pathname.split('/')[2];
    if(second){
      setSelectedKey('/' + first + '/' + second);
    }else{
      setSelectedKey('/' + first );

    }

  }, [router.pathname, router.locale, collapsed]);

  /* Map menu base on permissions */
  const ability = useAbility(AbilityContext)
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>([])
  useEffect(() => {
    setFilteredMenu(findFilteredMenu(ability ))
  }, [ability ])

  return (
    <>
      <Layout>
            <Drawer
              width='230'
              placement='left'
              className={"lg:hidden"}
              bodyStyle={{ padding: 0, height: '100%', overflowX: 'hidden' }}
              closable={false}
              onClose={() => {
                dispatch(toggleExpandDrawer(!expandedDrawer));
              }}
              open={expandedDrawer}
            >
              <div className='px-4 pt-4 text-xl font-bold'>Menu</div>
              <MenuComponent
                menuList={filteredMenu}
                openKey={openKey}
                onChangeOpenKey={k => setOpenkey(k)}
                selectedKey={selectedKey}
              />
            </Drawer>


          <Affix offsetTop={0}>
            <Sider
              width={230}
              className='layout-page-sider min-h-screen hidden lg:block'
              trigger={null}
              collapsible
              style={{ backgroundColor: token.token.colorBgContainer }}
              collapsedWidth={80}
              collapsed={collapsed}
              breakpoint='md'
            >
              <div className='h-16 overflow-hidden font-bold ' onClick={() => router.push('/')}>

                <Image
                  width={40}
                  height={40}
                  src= '/404image.jpg'
                  alt='logo'
                  className='relative h-14 p-2 w-full object-contain'
                />
              </div>
              <MenuComponent
                menuList={filteredMenu}
                openKey={openKey}
                onChangeOpenKey={k => setOpenkey(k)}
                selectedKey={selectedKey}
              />
            </Sider>
          </Affix>


        <Layout>
          <HeaderComponent />
           {breadcrumb}
          <Content className={`${contentClass} m-2 p-4 lg:m-6 min-h-screen rounded-lg mobile:m-4`}>
            {/* <TagsView /> */}
            <div className='p-2'>{children}</div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DashBoardLayout;
