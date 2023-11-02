import {IBaseModelJmix} from "@/shared/schema/shared-types/IBaseModel";

export interface MenuItem extends IBaseModelJmix {
    code: string;
    active: string;
    title: string;
    parentId: string;
}
export type MenuList = MenuItem[];
