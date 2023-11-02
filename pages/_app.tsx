import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Uniq from 'lodash/uniq';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { HashLoader } from 'react-spinners';
import ErrorBoundary from '@/shared/components/layouts/ErrorBoundary';
import DashBoardLayout from '@/shared/components/layouts/dashboard/DashboardLayout';
import AbilityConfig from '@/shared/configs/abilityBuild';
import usePageLoading from '@/shared/hooks/usePageLoading';
import { useAppSelector } from '@/shared/hooks/useRedux';
// import { useGetInfoByToken } from '@/shared/schema/services/Auth';
import { store } from '@/shared/stores';
import { MAX_RETRY_REQUEST } from '@/shared/utils/constants/appConfig';
import '@/styles/globals.scss';
import 'dayjs/locale/vi';
import { ConfigProvider } from 'antd';
import { APP_THEME } from '@/shared/utils/constants/appTheme';
import { TopBar } from '@/shared/components/common/TopBar';


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: MAX_RETRY_REQUEST } },
});

export const AbilityContext = React.createContext(AbilityConfig());
AbilityContext.displayName = 'AbilityContext';

const Boostrap = ({
                    children,
                    getLayout,
                  }: {
  children: React.ReactElement;
  getLayout: (page: ReactElement) => ReactNode;
}) => {
  usePageLoading();
  // const { isFetching } = useGetInfoByToken();
  const [mounted, setMounted] = useState(false);
  const isRouteLoading = useAppSelector(state => state.appSlice.isRouteLoading);
  // const permissions = useAppSelector(state => state.appSlice.user?.attributes.permissions);
  if (typeof window !== 'undefined') {
    window.onload = () => {
      document.getElementById('holderStyle')!.remove();
    };
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main>
      <ConfigProvider theme={{ ...APP_THEME.theme.light }}>
        <style
          id='holderStyle'
          dangerouslySetInnerHTML={{
            __html: `
            *, *::before, *::after {
              transition: none!important;
            }
            `,
          }}
        />
        {isRouteLoading && (
          <div
            className='absolute z-[9999] flex h-screen w-screen items-center justify-center bg-slate-50 bg-opacity-70'>
            <HashLoader color='#016390' size={50} />
          </div>
        )}

        <div style={{ visibility: !mounted ? 'hidden' : 'visible' }}>{getLayout(children)}</div>

        {/*<AbilityContext.Provider value={AbilityConfig(Uniq(permissions))}>*/}
        {/*  {isRouteLoading && (*/}
        {/*    <div className='absolute z-[9999] flex h-screen w-screen items-center justify-center bg-slate-50 bg-opacity-70'>*/}
        {/*      <HashLoader color='#016390' size={50} />*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*  {isFetching ? (*/}
        {/*    <div className='absolute z-[9999] flex h-screen w-screen items-center justify-center bg-slate-50 bg-opacity-70'>*/}
        {/*      <HashLoader color='#016390' size={50} />*/}
        {/*    </div>*/}
        {/*  ) : (*/}
        {/*    <div style={{ visibility: !mounted ? 'hidden' : 'visible' }}>{getLayout(children)}</div>*/}
        {/*  )}*/}
        {/*</AbilityContext.Provider>*/}
      </ConfigProvider>
    </main>
  );
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => <DashBoardLayout>{page}</DashBoardLayout>);
  return (
    <ErrorBoundary>
      <Head>
        <title>Admin Social</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' href='/favicon.ico' />
      </Head>
      <Provider store={store}>
        <TopBar />
        <QueryClientProvider client={queryClient}>
          <Boostrap getLayout={getLayout}>
            <Component {...pageProps} />
          </Boostrap>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
