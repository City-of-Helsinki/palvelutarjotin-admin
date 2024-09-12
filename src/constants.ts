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
  fi:
    // eslint-disable-next-line max-len
    'https://hkih.production.geniem.io/uploads/sites/5/2022/11/739f5edc-rekisteriseloste-kultus.fi_.pdf',
  en:
    // eslint-disable-next-line max-len
    'https://hkih.production.geniem.io/uploads/sites/5/2022/11/bf2f8d34-rekisteriseloste-kultus.fi_en.pdf',
  sv:
    // eslint-disable-next-line max-len
    'https://hkih.production.geniem.io/uploads/sites/5/2022/11/0d425f44-rekisteriseloste-kultus.fi_sv.pdf',
};

export const TERMS_OF_SERVICE_SLUGS = {
  fi: import.meta.env.NEXT_PUBLIC_CMS_TERMS_OF_SERVICE_SLUG_FI ?? 'kayttoehdot',
  en:
    import.meta.env.NEXT_PUBLIC_CMS_TERMS_OF_SERVICE_SLUG_EN ??
    'terms-of-service',
  sv:
    import.meta.env.NEXT_PUBLIC_CMS_TERMS_OF_SERVICE_SLUG_SV ??
    'anvandarvillkor',
};

export const createEmptyLocalizedObject = (): LocalisedObject => ({
  [SUPPORT_LANGUAGES.FI]: '',
  [SUPPORT_LANGUAGES.SV]: '',
  [SUPPORT_LANGUAGES.EN]: '',
});
