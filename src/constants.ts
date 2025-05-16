import { LocalisedObject } from './generated/graphql';

/**
 * Check is the instance that is rendering component client (not SSR)
 */
export const IS_CLIENT = typeof window !== 'undefined';

// Supported languages
export enum SUPPORT_LANGUAGES {
  FI = 'fi',
  SV = 'sv',
  EN = 'en',
}

export enum LINKEDEVENTS_CONTENT_TYPE {
  IMAGE = 'image',
  KEYWORD = 'keyword',
  LANGUAGE = 'language',
  PLACE = 'place',
}

export enum EVENT_LANGUAGES {
  AR = 'ar',
  EN = 'en',
  FI = 'fi',
  RU = 'ru',
  SV = 'sv',
  ZH_HANS = 'zh_hans',
}

export const PRIVACY_POLICY_LINKS = {
  fi: 'https://hkih.production.geniem.io/uploads/sites/5/2022/11/739f5edc-rekisteriseloste-kultus.fi_.pdf',
  en: 'https://hkih.production.geniem.io/uploads/sites/5/2022/11/bf2f8d34-rekisteriseloste-kultus.fi_en.pdf',
  sv: 'https://hkih.production.geniem.io/uploads/sites/5/2022/11/0d425f44-rekisteriseloste-kultus.fi_sv.pdf',
} as const;

export const TERMS_OF_SERVICE_SLUGS = {
  fi: 'kayttoehdot',
  en: 'terms-of-service',
  sv: 'anvandarvillkor',
} as const;

export const createEmptyLocalizedObject = (): LocalisedObject => ({
  [SUPPORT_LANGUAGES.FI]: '',
  [SUPPORT_LANGUAGES.SV]: '',
  [SUPPORT_LANGUAGES.EN]: '',
});
