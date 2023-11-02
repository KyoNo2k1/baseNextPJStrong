

import { IBaseModel } from '../shared-types/IBaseModel';

// export type ActionPermission = "create" | "edit" | "view" | "delete" | "approve"
export interface IRole extends IBaseModel {
  applyTo: string;
  isAdmin: boolean;
  id: React.Key;
  code: string;
  name: string;
  description: string;
  permissions: { code: string; description: string; name: string }[];
  [key: string]: any;
}

export interface IPermissionSetting {
  code: string;
  name: string;
  children: any;
  permissions: string[];
}

/**
 * @property code remove later
 */
export interface ICreateRole {
  code: string;
  name: string;
  description: string;
  permissions: string[];
}
