import i18n from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { initReactI18next } from 'react-i18next';

import fi from '../domain/app/i18n/fi.json';

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(initReactI18next)
  .use(intervalPlural)
  .init({
    lng: 'fi',
    fallbackLng: 'fi',
    resources: {
      fi: {
        translation: fi,
      },
    },
  });

export default i18n;
