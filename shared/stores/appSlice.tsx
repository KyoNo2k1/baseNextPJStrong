import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {deleteCookie} from 'cookies-next';
import {APP_SAVE_KEY} from '../utils/constants/appConfig';


type APPSTATE = {
  user: any | undefined,
  isSupperAdmin: boolean,
  isAdmin: boolean,
  isLogined: boolean,
  isCollapseMenu: boolean,
  isExpandDrawer: boolean,
  isRouteLoading: boolean,

}

const initialState: APPSTATE = {
  user: {role : {permission : ['super_admin']}},
  isSupperAdmin: false,
  isAdmin: false,
  isLogined: false,
  isCollapseMenu: false,
  isRouteLoading: false,
  isExpandDrawer: false,
}
export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
      login: (state: any, action: PayloadAction<any | undefined>) => {
        state.user = action.payload
        state.isLogined = true
        if (action.payload?.attributes?.permissions?.includes('SUPER_ADMIN')) {
          state.isSupperAdmin = true
        }
        if (action.payload.attributes.userType === 'VNA' || action.payload.attributes.isAdmin) {
          state.isAdmin = true
        }
      },
      logout: (state: any) => {
        state.user = undefined
        state.isLogined = false
        state.isSupperAdmin = false
        state.isAdmin = false
        deleteCookie(APP_SAVE_KEY.REFRESH_TOKEN_KEY)
        deleteCookie(APP_SAVE_KEY.TOKEN_KEY)
        deleteCookie(APP_SAVE_KEY.LOGIN_STATUS)
      },
      toggleMenu: (state, action: PayloadAction<boolean>) => {
        state.isCollapseMenu = action.payload
      },
      toggleExpandDrawer: (state, action: PayloadAction<boolean>) => {
        state.isExpandDrawer = action.payload
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.isRouteLoading = action.payload
      },

    }
  }
)
export const {
  toggleExpandDrawer, login, logout, toggleMenu, setLoading
} = appSlice.actions


export default appSlice.reducer
