import { LanguageCodeEnum } from 'react-helsinki-headless-cms';

import type { Language } from '../types';

const appLanguageToLanguageCode = {
  en: LanguageCodeEnum.En,
  fi: LanguageCodeEnum.Fi,
  sv: LanguageCodeEnum.Sv,
} as const satisfies Record<Language, LanguageCodeEnum>;

export default function getLanguageCode(language: Language) {
  return appLanguageToLanguageCode[language];
}
