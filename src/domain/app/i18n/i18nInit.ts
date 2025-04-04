import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import fi from './fi.json';
import sv from './sv.json';
import { SUPPORT_LANGUAGES } from '../../../constants';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(intervalPlural)
  .init({
    detection: {
      order: [
        'path',
        'querystring',
        'cookie',
        'localStorage',
        'navigator',
        'htmlTag',
        'subdomain',
      ],
    },
    fallbackLng: 'fi',
    interpolation: {
      escapeValue: false,
    },
    supportedLngs: Object.values(SUPPORT_LANGUAGES),
    resources: {
      en: {
        translation: en,
      },
      fi: {
        translation: fi,
      },
      sv: {
        translation: sv,
      },
    },
  });

export default i18n;
