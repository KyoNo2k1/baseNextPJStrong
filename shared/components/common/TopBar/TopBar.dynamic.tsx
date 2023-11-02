import dynamic from 'next/dynamic';

import type { TopBar as TopBarType } from './index';

export const TopBar = dynamic(() => import('./index' /* webpackChunkName: "TopBar" */).then(mod => mod.TopBar as any), {
  ssr: false,
}) as typeof TopBarType;
