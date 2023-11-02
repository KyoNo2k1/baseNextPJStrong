export interface MenuItem{
  code: string;
  sort? : number
  title?: string,
  label : string
  Icon?: React.ReactNode;
  path: string;
  isHide?: boolean,
  permission?: string[]
  hideWithSuperAdmin? : boolean,
  children?: MenuItem[];
  superAdminHide? : boolean
}

// export interface MenuItem extends IBaseModelJmix {
// 	code: string;
// 	active: string;
// 	title: string;
// 	parentId: string;
// }






export type MenuList = MenuItem[];
