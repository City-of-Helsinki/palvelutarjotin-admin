import { LocalisedObject } from './generated/graphql';

/**
 * Check is the instance that is rendering component client (not SSR)
 */
export const IS_CLIENT = typeof window !== 'undefined';

/**
 * Endpoint to get api token
 */
export const TUNNISTAMO_API_TOKEN_ENDPOINT = `${process.env.REACT_APP_OIDC_AUTHORITY}/api-tokens/`;

// Supported languages
export enum SUPPORT_LANGUAGES {
  FI = 'fi',
  SV = 'sv',
  EN = 'en',
}

export enum DEV_LANGUAGES {
  CIMODE = 'cimode',
}

// ROUTER_LANGUAGES are used to set cimode language without breaking locales related to datepickers etc.
export const ROUTER_LANGUAGES = { ...SUPPORT_LANGUAGES, ...DEV_LANGUAGES };
export type ROUTER_LANGUAGES = SUPPORT_LANGUAGES | DEV_LANGUAGES;

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
    'https://www.hel.fi/static/liitteet-2019/Kaupunginkanslia/Rekisteriselosteet/Kuva/Henkil%C3%B6rekisteri%20Palvelutarjotin.pdf',
  en:
    // eslint-disable-next-line max-len
    'https://www.hel.fi/static/liitteet-2019/Kaupunginkanslia/Rekisteriselosteet/Kuva/Personal%20data%20file%20Palvelutarjotin.pdf',
  sv:
    // eslint-disable-next-line max-len
    'https://www.hel.fi/static/liitteet-2019/Kaupunginkanslia/Rekisteriselosteet/Kuva/Personregister%20Tj%C3%A4nstepalett.pdf',
};

export const TEACHER_UI_LINKS = {
  fi: 'https://beta.kultus.fi/fi',
  en: 'https://beta.kultus.fi/en',
  sv: 'https://beta.kultus.fi/sv',
};

export const createEmptyLocalizedObject = (): LocalisedObject => ({
  [SUPPORT_LANGUAGES.FI]: '',
  [SUPPORT_LANGUAGES.SV]: '',
  [SUPPORT_LANGUAGES.EN]: '',
});
