import { MenuItem } from '@/shared/schema/shared-types/IMenu';
import { Contact, Home, Shield, Users } from 'lucide-react';


export const URLS = {
  HOME: '/',
  GROUP : '/groups',
  TEAM : '/teams',
  USERS: {
    _: '/users',
    PDONE: '/users/pdone',
    APPROVEMENT_PDONE: '/users/pdone/approvement',
    JA: '/users/ja',
    APPROVEMENT_JA: '/users/ja/approvement',
    MARSHOP: '/users/marshop',
    APPROVEMENT_MARSHOP: '/users/marshop/approvement',

  },

};


/* description: use path for define key of menuItem , use label to define localize */
export const menuListMock: MenuItem[] = [
  {
    code: '',
    label: 'home',
    Icon: <Home />,
    path: URLS.HOME,
  },
  {
    code: 'group',
    label: 'group',
    Icon: <Shield />,
    path: URLS.GROUP,
  },
  {
    code: 'team',
    label: 'team',
    Icon: <Users />,
    path: URLS.TEAM,
  },
  {
    code: 'user-management',
    label: 'userManagement',
    Icon: <Contact />,
    path: URLS.USERS._,
    children: [
      {
        code: 'user-management',
        label: 'users',
        path: URLS.USERS._,
      },
      {
        code: 'user-management',
        label: 'pdone',
        path: URLS.USERS.PDONE,
      },
      {
        code: 'user-management',
        label: 'pdoneApprovement',
        path: URLS.USERS.APPROVEMENT_PDONE,
      },
      {
        code: 'user-management',
        label: 'ja',
        path: URLS.USERS.JA,
      },
      {
        code: 'user-management',
        label: 'jaApprovement',
        path: URLS.USERS.APPROVEMENT_JA,
      },
      {
        code: 'user-management',
        label: 'marshop',
        path: URLS.USERS.MARSHOP,
        // permission: [
        //   PERMISSION_CODES.R_AGENT_USER + '.' + PERMISSION_ACTIONS.READ,
        // ],
      },
      {
        code: 'user-management',
        label: 'marshopApprovement',
        path: URLS.USERS.APPROVEMENT_MARSHOP,
      },

    ],
  },

];

export function flatMenu() {
  let result: MenuItem[] | [] = [];
  menuListMock.forEach(menu => {
    const { children, ...rest } = menu;
    result = [...result, rest];
    if (children) {
      children.forEach(child => {
        result = [...result, child];
      });
    }
  });
  return result;
}
