import { useState } from 'react';
import Router from 'next/router';

const useOnRouteChange = () => {
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  Router.events.on('routeChangeStart', () => {
    setIsRouteChanging(true);
  });

  Router.events.on('routeChangeComplete', () => {
    setIsRouteChanging(false);
  });
  Router.events.on('routeChangeError', () => {
    setIsRouteChanging(false);
  });

  return {
    isRouteChanging,
  };
};

export default useOnRouteChange;
