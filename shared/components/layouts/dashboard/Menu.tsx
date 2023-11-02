import type {FC} from 'react';

import useTrans from '@/shared/hooks/useTrans';
import {Menu} from 'antd';
import {useRouter} from 'next/router';
import {ChevronLeftIcon, ChevronRightIcon} from 'lucide-react';
import {useDispatch} from 'react-redux';
import {toggleMenu} from '@/shared/stores/appSlice';
import {useAppSelector} from '@/shared/hooks/useRedux';
import {MenuList} from "@/shared/schema/shared-types/IMenu";


interface MenuProps {
  menuList: MenuList;
  openKey?: string;
  onChangeOpenKey: (key?: string) => void;
  selectedKey: string;
  // onChangeSelectedKey: (key: string) => void;
}

const MenuComponent: FC<MenuProps> = props => {
  const { menuList, openKey, onChangeOpenKey, selectedKey } = props;
  const router = useRouter()
  const onMenuClick = (path: string) => {
    router.push(path);
    // onChangeSelectedKey(path);
  };
  const isSuperAdmin = useAppSelector(state=>state.appSlice.isSupperAdmin)
  const collapse = useAppSelector(state => state.appSlice.isCollapseMenu)
  const dispatch = useDispatch()
  const { trans } = useTrans()
  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();
    onChangeOpenKey(key);
  };

  return (
    <div className='relative'>
      <Menu
        style={{whiteSpace: 'normal', height: 'auto'}}
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKey ? [openKey] : []}
        onOpenChange={onOpenChange}
        onSelect={k => onMenuClick(k.key)}
        className="layout-page-sider-menu text-2 max-h-[calc(100vh_-_80px)] overflow-y-auto min-h-screen"
        items={menuList.filter(menu => !(menu.superAdminHide && isSuperAdmin)).map(menu => {
          return menu.children
            ? {
              key: menu.path,
              icon: menu.Icon,
              //@ts-ignore
              label: trans.menu[menu.label as any],
              //@ts-ignore
              title: trans.menu[menu.label as any],
              children: menu.children.filter(child => !(child.superAdminHide && isSuperAdmin)).map(child => ({
                key: child.path,
                //@ts-ignore
                label: trans.menu[child.label],
                icon: child.Icon,
                //@ts-ignore
                title : trans.menu[child.label as any]
              })),
            }
            : {
              icon: menu.Icon,
              key: menu.path,
              //@ts-ignore
              label: trans.menu[menu.label],
              //@ts-ignore
              title : trans.menu[menu.label as any]
            };
        })}
      >

      </Menu>
      <div className='absolute bottom-24 -right-5 p-1 flex justify-center items-center cursor-pointer bg-white border shadow-md rounded-full'
        onClick={() => dispatch(toggleMenu(!collapse))}>
        {collapse ?
          <ChevronRightIcon />
          : <ChevronLeftIcon />
        }
      </div>
    </div>

  );
};

export default MenuComponent;
