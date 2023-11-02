import EnglishScript from '@/public/locales/en';
import VnScript from '@/public/locales/vi';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { setCookie } from 'cookies-next';
import { APP_SAVE_KEY } from '@/shared/utils/constants/appConfig';
import dateVi from 'antd/lib/date-picker/locale/vi_VN';
import dateEn from 'antd/lib/date-picker/locale/en_US';
import dayjs from 'dayjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import updateLocale from 'dayjs/plugin/updateLocale'

function getTrans(locale: string | undefined) {
  switch (locale) {
    case 'vi': return VnScript
    case 'en': return EnglishScript
    default: return VnScript
  }
}
function getCurrentcy(locale: string | undefined) {
  switch (locale) {
    case 'vi': return 'VND'
    case 'en': return 'USD'
    default: return 'VND'
  }
}

const useTrans = () => {
  const router = useRouter();
  const { locale, pathname, query, asPath } = router;
  const [lang, setLang] = useState(locale);
  const [currentcy, setCurrentcy] = useState('VND')
  const [dateLang, setDateLang] = useState(dateVi)





  const trans = getTrans(locale);

  const changeLanguage = useCallback((lang: 'vi' | 'en') => {
    router.push({ pathname, query }, asPath, { locale: lang });
  }, [router, pathname, query, asPath, locale])

  useEffect(() => {
    setLang(locale || 'vi');
    setCurrentcy(getCurrentcy(locale))
    setCookie(APP_SAVE_KEY.CURRENT_LANG, locale)
    setDateLang(locale === 'vi' ? dateVi : dateEn)
    dayjs.extend(updateLocale);
    dayjs.updateLocale(locale === 'vi' ? 'vi' : 'en', { weekStart: 1 })
  }, [router, locale]);

  return { trans, lang, changeLanguage, currentcy, dateLang };
};

export default useTrans;
