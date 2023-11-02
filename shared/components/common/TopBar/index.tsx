import useOnRouteChange from '@/shared/hooks/useOnRouteChange';
import type { FC } from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';

export const TopBar: FC = () => {
  const { isRouteChanging } = useOnRouteChange();

  return isRouteChanging ? <TopBarProgress /> : null;
};
