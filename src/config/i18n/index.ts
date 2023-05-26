import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import en_common from 'config/i18n/locales/en/common.json';
import pl_common from 'config/i18n/locales/pl/common.json';

i18n
  .use(Backend) // lazy loads translations from /public/locales
  .use(LanguageDetector) // detect user language
  .use(initReactI18next)
  .init({
    debug: false,
    defaultNS: 'common',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    lng: 'en',
    resources: {
      en: {
        common: en_common,
      },
      pl: {
        common: pl_common,
      },
    },
  });

export default i18n;
