import {LoginedUser} from "@/shared/schema/types/IAuth";
import {PERMISSION_ACTIONS, PERMISSION_CODES} from "@/shared/utils/constants/appConfig";

export const APP_ROLE_TYPE_OPTIONS = [
    {
        value: 'admin',
        label: 'admin'
    },
    {
        value: 'agent',
        label: 'agent'
    },
    {
        value: 'ca',
        label: 'ca'
    }
]

export const AGENT_STATUS_OPTIONS = [
  {value: "NEW", label: "NEW"},
  {value: "REJECT", label: "REJECTED"},
  {value: "ACTIVE", label: "ACTIVE"},
  {value: "INACTIVE", label: "INACTIVE"},
  {value: "CLOSE", label: "CLOSED"},
  {value: "PENDING", label: "PENDING"},
]
export const SUB_STATUS_OPTIONS = [
  {value: "ACTIVE", label: "ACTIVE"},
  {value: "INACTIVE", label: "INACTIVE"},
  {value: "CLOSE", label: "CLOSED"},
]

export const CA_STATUS_OPTIONS = [...AGENT_STATUS_OPTIONS]
export const GSA_STATUS_OPTIONS = [...AGENT_STATUS_OPTIONS]

export const MODEL_STATUS_OPTIONs = [
    {value: "NEW", label: "NEW"},
    {value: "APPROVED", label: "APPROVED"},
    {value: "REJECTED", label: "REJECTED"},
    {value: "ACTIVATED", label: "ACTIVATED"},
    {value: "DEACTIVATED", label: "DEACTIVATED"},
    {value: "CLOSE", label: "CLOSED"},
    {value: "RENEW", label: "RENEW"},
]

export const USER_STATUS_OPTIONS = [
  {value: "ACTIVE", label: "ACTIVE"},
  {value: "INACTIVE", label: "INACTIVE"},
  // {value: "CLOSE", label: "CLOSE"},
]
export const USER_STATUS_FILTER_OPTIONS = [
  {value: "ACTIVE", label: "ACTIVE"},
  {value: "INACTIVE", label: "INACTIVE"},
  {value: "CLOSE", label: "CLOSED"},
]
export const SUB_CA_STATUS_OPTIONS = [
    {value: "ACTIVE", label: "ACTIVE"},
    {value: "INACTIVE", label: "INACTIVE"},
    {value: "CLOSE", label: "CLOSE"},
]

export const USER_STATUS_OPTION = [
    {value: "ACTIVE", label: "ACTIVE"},
    {value: "INACTIVE", label: "INACTIVE"},
  ]

export const USER_TYPE_OPTIONS = [
  {value: "VNA", label: "Admin user"},
  {value: "AGENT", label: "Agent  user"},
  {value: "CA", label: "CA user"},
  {value: "SUBAGENT", label: "Sub-agent user"},
  {value: "SUBCA", label: "Sub-CA user"},
  {value: "GSA", label: "GSA user"},
]
export const USER_TYPE_OPTIONS_VIA_PERMISSION  = (isSupperAdmin : boolean , user? : LoginedUser )=> {
  const permissions = user?.attributes.permissions
  return ([
    {value: "VNA", label: "Admin user" , disabled:  !isSupperAdmin && !permissions?.includes(PERMISSION_CODES.R_VNA_USER+'.'+PERMISSION_ACTIONS.READ)},
    {value: "AGENT", label: "Agent  user",disabled: !isSupperAdmin && !permissions?.includes(PERMISSION_CODES.R_AGENT+'.'+PERMISSION_ACTIONS.READ)},
    {value: "CA", label: "CA user", disabled: !isSupperAdmin && !permissions?.includes(PERMISSION_CODES.R_CA+'.'+PERMISSION_ACTIONS.READ)},
    {value: "SUBAGENT", label: "Sub-agent user" , disabled:!isSupperAdmin && !permissions?.includes(PERMISSION_CODES.R_SUBAGENT+'.'+PERMISSION_ACTIONS.READ)},
    {value: "SUBCA", label: "Sub-CA user" , disabled: !isSupperAdmin &&!permissions?.includes(PERMISSION_CODES.R_SUBCA+'.'+PERMISSION_ACTIONS.READ)},
    {value: "GSA", label: "GSA user" , disabled:!isSupperAdmin && !permissions?.includes(PERMISSION_CODES.R_GSA+'.'+PERMISSION_ACTIONS.READ)},
  ])
}

export const BOOKING_TYPE_ADULT = [
    {
        value : 'MR',
        label :'Mr'
    },
    {
        value : 'MRS',
        label :'Mrs'
    },
    {
        value : 'MS',
        label :'Ms'
    }
]
export const BOOKING_TYPE_CHILDREN = [
    {
        value : 'MASTER',
        label :'Master'
    },
    {
        value : 'MISS',
        label :'Miss'
    }
]
export const BOOKING_TYPE_INFANT = [
    {
        value : 'MASTER',
        label :'Master'
    },
    {
        value : 'MISS',
        label :'Miss'
    }
]

/**
 * @description xem follow update status tai : https://pms.ngsd.vn/browse/TAP-112
 */
export enum EnumModelStatus {
    NEW = "NEW",
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECT = "REJECT",
    ACTIVATED = "ACTIVE",
    DEACTIVATED = "INACTIVE",
    CLOSE = "CLOSED",
    RENEW = "RENEW",
    INACTIVE = 'INACTIVE'
}
export enum EnumChangeStatusAction {
  PENDING = "PENDING",
  APPROVE = "APPROVE",
  REJECT = "REJECT",
  ACTIVATE = "ACTIVATE",
  DEACTIVATE = "DEACTIVATE",
  CLOSE = "CLOSE",
  RENEW = "RENEW",
}
export enum EnumUserStatus {
    ACTIVE= "ACTIVE",
    INACTIVE = "INACTIVE"
}
export enum EnumGSAStatus {
    NEW = "NEW",
    REJECT = "REJECT",
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    CLOSE = "CLOSE",
    PENDING = "PENDING",
    APPROVE = "APPROVE",
}

/**
 * @property VNAUSER : cho viec tao admin user. Khi tạo Admin user, hệ thống cho phép Super admin thêm thông tin market, sau này được sử dụng để giới hạn thông tin mà Admin user xem, quản lý.
 */
export enum EnumUserType {
    GSAUser = "GSAUser",
    AgentUser = "AgentUser",
    CAUser = "CAUser",
    VNAUser = "VNAUser",
    SubAgentUser = "SubAgentUser",
    SubCAUser = "SubCAUser"
}

export enum EnumCAType {
    BOOKING ='BOOKING',
    NOSELFBOOKING = 'NO_SELF_BOOKING'
}
export enum EnumRoleType {
    ADMIN = "ADMIN",
    GSA = "GSA",
    VNA = "VNA",
    AGENT = "AGENT",
    SUBAGENT = "SUBAGENT",
    CA = "CA",
    SUBCA = "SUBCA"
}

export enum EnumFlyType {
    ONEWAY = "oneWay",
    ROUNDTRIP = "roundTrip",
    MULTISTOP = "multiStop",
}
export enum EnumTypePassenger{
    ADULT = 'ADT',
    CHILDREN = 'CHD',
    INFANT = 'INF'
}
export enum EnumTypeService{
    BAGGAGE = 'BAGGAGE',
    SEAT = 'SEAT',
    TICKET = 'TICKET'
}
