export const MAX_EXPORT_SIZE = 100_000;
export const MAX_RETRY_REQUEST = 2;
export const TIMEOUT_REQUEST = 20_000;
export const TIME_FORMAT = 'DD/MM/YYYY HH:mm';
export const DATE_FORMAT = 'DD/MM/YYYY';
export const SCREENTYPE = {
  MOBILE: 'mobile',
  IPAD: 'ipad',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
  MONITOR: 'monitor',
};
export const APP_SAVE_KEY = {
  TOKEN_KEY: process.env.NEXT_PUBLIC_APP_NAME + '::token_key',
  REFRESH_TOKEN_KEY: process.env.NEXT_PUBLIC_APP_NAME + '::refresh_token_key',
  LOGIN_STATUS: process.env.NEXT_PUBLIC_APP_NAME + '::login_status',
  USER_DATA: process.env.NEXT_PUBLIC_APP_NAME + ':user_data',
  USER_PERMISSION: process.env.NEXT_PUBLIC_APP_NAME + ':user_permission',
  CURRENTPATH_NAME: process.env.NEXT_PUBLIC_APP_NAME + '::pathname',
  LAST_NOTALLOW_ACCESS_PATH: process.env.NEXT_PUBLIC_APP_NAME + '::last_not_allow_access',
  CURRENT_LANG: process.env.NEXT_PUBLIC_APP_NAME + '::lang',
  COUNTRY: process.env.NEXT_PUBLIC_APP_NAME + '::masterdata-country',
  CURRENCY: process.env.NEXT_PUBLIC_APP_NAME + '::masterdata-currency',
  TIMEZONE: process.env.NEXT_PUBLIC_APP_NAME + '::masterdata-timezone',
};
export const APP_REGEX = {
  PhoneRegex: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
  VNPhoneRegex: /^\d{1,16}$/,
  VNPhoneRegex2: /^(?!0$)(?!0\d)\d{1,16}$/,
  EmailRegex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  EnglishRegex: /^[A-Za-z]+$/g,
  regexEnglishAndSpace : /^[A-Za-z\s]+$/g,
  VietnameseRegex: /^[a-zA-ZÀ-ỹ\s]+$/g,
  WebsiteRegex: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/,
  FaxRegex: /^\+?[0-9\s-]+$/i,
  TaxRegex: /^\d{10,}$/g,

  NumberOnly: /^\d{1,100}$/,
  StringOnly: /^[^\d]*$/,
  /* allow type string in length min-max */
  RangeAllow: (min:number , max:number)=>new RegExp(`^[\\s\\S]{${min},${max}}$`),
  SpecialCharactersRegex: /[\!\#\$\%\^\&\*\(\)\{\}\[\]\,\?`\~\_\+=;:'"\/<>\\]/g,
  /* Not allow type special string  */
  NotAllowSpecialCharactersRegex: /^[a-zA-ZÀ-ỹ0-9\s]*$/,
  NotAllowSpecialCharactersEnglishRegex: /^[a-zA-Z0-9\s]*$/,
  NotAllowSpaceAtSide : /^[^\s].*[^\s]$/,
  NotAllowVietnameseAccent : /^[^\p{L}\p{M}]+$/u,
}
export const PERMISSION_CODES = {
  /*resource permission cho truy cập màn hình */
  R_PERMISSION: 'R_PERMISSION',
  R_MARKET: 'R_MARKET',
  R_ADMIN: 'R_ADMIN',
  R_AGENT_USER: 'R_AGENT_USER',
  R_SUB_AGENT_USER: 'R_SUB_AGENT_USER',
  R_CA_USER: 'R_CA_USER',
  R_SUB_CA_USER: 'R_SUB_CA_USER',
  R_GSA_USER: 'R_GSA_USER',
  R_VNA_USER: 'R_VNA_USER',
  R_GSA: 'R_GSA',
  R_AGENT: 'R_AGENT',
  R_SUBAGENT: 'R_SUBAGENT',
  R_CA: 'R_CA',
  R_SUBCA: 'R_SUBCA',
  R_ROLE: 'R_ROLE',
  R_FARE_RULE: 'R_FARE_RULE',

  /* action permission */
  A_SUBAGENT: 'A_SUBAGENT',
  A_AGENT_USER: 'A_AGENT_USER',
  A_SUBCA: 'A_SUBCA',
  A_CA_USER: 'A_CA_USER',
  A_GSA_USER: 'A_GSA_USER',
  A_AGENT: 'A_AGENT',
  A_CA: 'A_CA',
  A_GSA: 'A_GSA',
  /* booking manage */
  A_BOOKING_TICKET : 'A_BOOKING_TICKET',
  A_PAYMENT_ACL: "A_PAYMENT_ACL",
  A_PAYMENT_GILFCARD: "A_PAYMENT_GILFCARD",
  A_PAYMENT_EVOUCHER: "A_PAYMENT_EVOUCHER",
};


export const PERMISSION_ACTIONS = {
  /* for resource permission */
  READ: 'READ',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  /* for action permission */
  ASSIGN_AGENT: 'ASSIGN_AGENT',
  CHANGE_PASS: 'CHANGE_PASS',
  RESET_PASS: 'RESET_PASS',
  CHANGE_STATUS: 'CHANGE_STATUS',
  ADD_MARKET: 'ADD_MARKET',
  DELETE_MARKET: 'DELETE_MARKET',
  EDIT_MARKET: 'EDIT_MARKET',
  ADD_AGENT: 'ADD_AGENT',
  DELETE_AGENT: 'DELETE_AGENT',
  EDIT_AGENT: 'EDIT_AGENT',
  EXECUTE : "EXECUTE"
};
