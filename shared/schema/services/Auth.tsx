import { useAppDispatch } from '@/shared/hooks/useRedux';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstanceAuth, axiosInstanceNoAuth } from '@/shared/configs/Axios';
import { notification } from 'antd';
import { getCookie, setCookie } from 'cookies-next';
import { APP_SAVE_KEY } from '@/shared/utils/constants/appConfig';
import { login, logout } from '@/shared/stores/appSlice';
import useTrans from '@/shared/hooks/useTrans';

export const useLogin = () => {
  const router = useRouter();
  const { trans } = useTrans();
  return useMutation({
    mutationFn: ({ username, password, remember }: { username: string; password: string; remember: boolean }) => {
      // return axios.post("/oauth2/token", { username, password })
      return axiosInstanceNoAuth.post<any>(
        '/oauth2/token',
        `grant_type=password&username=${username}&password=${password}&rememberMe=${remember}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic d2ViQXBwQ2xpZW50OnZuYS1jbGllbnQ',
          },
        },
      );
    },
    onSuccess(data) {
      /* because redirect display success when redirect */
      notification.success({ message: trans.page.auth.loginSuccess, placement: 'top' });
      router.push('/');
      setCookie(APP_SAVE_KEY.TOKEN_KEY, data.access_token);
      setCookie(APP_SAVE_KEY.REFRESH_TOKEN_KEY, data.refresh_token);
      setCookie(APP_SAVE_KEY.LOGIN_STATUS, 'true');
      setCookie(APP_SAVE_KEY.USER_DATA, data.permissions);
    },
    onError() {
      notification.error({ message: trans.page.auth.loginFail, placement: 'top' });
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const { trans } = useTrans();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async () => {
      // return axios.post("/oauth2/token", { username, password })
      return Promise.all([
        axiosInstanceNoAuth.post<any>('/oauth2/revoke', `token=${getCookie(APP_SAVE_KEY.TOKEN_KEY)}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic d2ViQXBwQ2xpZW50OnZuYS1jbGllbnQ',
          },
        }),
        axiosInstanceNoAuth.post<any>('/oauth2/revoke', `token=${getCookie(APP_SAVE_KEY.REFRESH_TOKEN_KEY)}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic d2ViQXBwQ2xpZW50OnZuYS1jbGllbnQ',
          },
        }),
      ]);
    },
    onSuccess() {
      dispatch(logout());

      router.push('/login');
    },
    onError() {
      notification.error({ message: trans.page.auth.logoutFail });
    },
  });
};

export const useChangePassword = () => {
  // const router = useRouter();
  const dispatch = useAppDispatch()
  const { trans } = useTrans();
  return useMutation({
    mutationFn: ({ password }: { password: string }) =>
      axiosInstanceAuth.post<string>('/public/v1/user/change-password', password),
    onSuccess: () => {
      /* case reset pass */
      // router.push('/');
      dispatch(logout())
      notification.success({ message: trans.page.auth.changePassSuccess });
    },
    onError: () => {
      notification.error({ message: trans.page.auth.changePassFail });
    },
  });
};

export const useForgetPass = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (payload: any) => {
      return axiosInstanceNoAuth.post<string>('/public/v1/user/forgot-password', { ...payload });
    },
    onSuccess(res: any) {
      if (res.code === '400') {
        notification.error({ message: res.description });
      }
      if (onSuccess && res.code === '200') onSuccess();
    },
    onError() {
      // console.log('fail');
      notification.error({ message: 'Fail' });
    },
  });
};

export const useChangePasswordForgot = () => {
  const { trans } = useTrans();
  const router = useRouter()
  return useMutation({
    mutationFn: ({ password, token }: { password: string; token: string }) =>
      axiosInstanceNoAuth.post('/public/v1/user/change-password-forgot', {
        newPassword: password,
        token,
      }),
    onSuccess: () => {
      notification.success({ message: trans.page.auth.changePassSuccess });

      router.push('/login')
    },
    onError: () => {
      notification.error({ message: trans.page.auth.changePassFail });
    },
  });
};
export const useCreatePassword = () => {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: ({ username, password, token }: { username: string; password: string; token: string }) =>
      axiosInstanceNoAuth.post('/public/v1/user/change-password-forgot', {
        newPassword: password,
        token,
        username,
      }),
    onSuccess: () => {
      notification.success({ message: trans.page.auth.createPassSuccess });
    },
    onError: () => {
      notification.error({ message: trans.page.auth.createPassFail });
    },
  });
};

export const useGetInfoByToken = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const whiteLists = [
    '/login',
    '/change-password',
    '/forgot-password',
    '/reset-password/[token]',
    '/create-password/[...slug]',
  ];
  return useQuery({
    queryKey: ['GET_PROFILE'],
    queryFn: () => axiosInstanceAuth.get<any>('rest/userInfo'),
    onSuccess(data) {
      setCookie(APP_SAVE_KEY.LOGIN_STATUS, 'true');
      // data.attributes.permissions = ['R_AGENT.READ']
      //   const permission = JSON.parse(getCookie(APP_SAVE_KEY.USER_DATA) as string ||'[]')
      dispatch(login({ ...data }));
    },
    /* 403 tự đá login */
    // onError(e){
    //   console.error(e)
    //   router.push('/login')
    // },
    enabled: !whiteLists.includes(router.pathname),
  });
};


