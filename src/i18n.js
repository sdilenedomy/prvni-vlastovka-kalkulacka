import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const tranlsationsLoaded = i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: JSON.parse(process.env.REACT_APP_SUPPORTED_LANGS),
    fallbackLng: {
      default: [process.env.REACT_APP_DEFAULT_LANG],
    },
    debug: process.env.NODE_ENV === 'development',
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: process.env.REACT_APP_LANG_PATH_INDEX,
    },
  });

i18n.on('languageChanged', (lng) => {
  const urlLang = window.location.pathname.match(/\/([a-zA-Z-]*)/g)[process.env.REACT_APP_LANG_PATH_INDEX]
    .replace('/', '');
  if (urlLang !== lng) {
    // replace the language in the URL with the language used
    window.history.replaceState({}, '', `/${lng}`);
  }

  document.documentElement.lang = lng;

  tranlsationsLoaded.then(() => {
    document.title = i18n.t('Page title');
  });
});

export default i18n;
