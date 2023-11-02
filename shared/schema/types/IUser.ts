import {IBaseModelJmix} from "@/shared/schema/shared-types/IBaseModel";
import {IUserStatus} from "@/shared/schema/shared-types/IModelStatus";
import {IRole} from "@/shared/schema/types/IRole";
import {IMarket} from "@/shared/schema/types/ITeam";
import {IAgent} from "@/shared/schema/types/IAgent";
import {ICA} from "@/shared/schema/types/ICA";

export interface IAppUser extends IBaseModelJmix{
	lsssign: string;
	deletedTs: string;
	timeZoneId: string;
	phonenumber: string;
	active: string;
	activeMarket: string;
	shortname: string;
	deletedBy: string;
	office_id: string;
	password: string;
	organization: (IAgent | ICA) & {caId : string , agentId : string} ;
	organizationId: string;
	fullname: string;
	userType: string;
	email: string;
	username: string;
	status : IUserStatus,
  roleIds: string[];
	roles? : IRole[],
  isAdmin : boolean,
	assignedMarket : (IMarket& { startdate : string , enddate : string , marketName : string, marketId?:string})[],
  orgStatus : string
}

// export type ICreateAppUser = Omit<IAppUser, 'roles'> & {
//   roles : {id : React.Key}[]
// }





