import localFont from 'next/font/local';

export const montserratLocal = localFont({
  src: [
    {
      path: '../public/fonts/Montserrat/Montserrat-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Montserrat/Montserrat-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Montserrat/Montserrat-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Montserrat/Montserrat-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Montserrat/Montserrat-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--montserrat-font',
  display: 'swap',
  fallback: ['sans-serif'],
});

