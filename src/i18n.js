import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.on('languageChanged', (lng) => {
  const urlLang = window.location.pathname.match(/\/([a-zA-Z-]*)/g)[process.env.REACT_APP_LANG_PATH_INDEX]
    .replace('/', '');
  if (urlLang !== lng) {
    window.history.replaceState({}, '', lng);
  }

  document.title = i18n.t('Page title');
  document.documentElement.lang = lng;
});

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['cs', 'de'],
    fallbackLng: {
      default: [process.env.REACT_APP_DEFAULT_LANG],
    },
    debug: process.env.NODE_ENV === 'development',
    detection: {
      order: ['path', 'navigator'],
      lookupFromPathIndex: process.env.REACT_APP_LANG_PATH_INDEX,
    },
  });

export default i18n;
