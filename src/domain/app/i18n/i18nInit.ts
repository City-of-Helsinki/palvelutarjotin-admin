import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { initReactI18next } from 'react-i18next';

import { ROUTER_LANGUAGES } from '../../../constants';
import en from './en.json';
import fi from './fi.json';
import sv from './sv.json';

// eslint-disable-next-line import/no-named-as-default-member
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
    supportedLngs: Object.values(ROUTER_LANGUAGES),
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
