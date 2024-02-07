import type { Language } from '../types';

export const HEADER_MENU_NAME = {
  en: 'Palvelutarjotin all UIs Header (EN)',
  fi: 'Palvelutarjotin all UIs Header (FI)',
  sv: 'Palvelutarjotin all UIs Header (SV)',
} as const satisfies Record<Language, string>;

export const FOOTER_MENU_NAME = {
  en: 'Palvelutarjotin-admin Footer (EN)',
  fi: 'Palvelutarjotin-admin Footer (FI)',
  sv: 'Palvelutarjotin-admin Footer (SV)',
} as const satisfies Record<Language, string>;
