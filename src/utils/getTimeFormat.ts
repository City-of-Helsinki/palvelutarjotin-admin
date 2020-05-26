import { Language } from '../types';

/**
 * Get localized time format
 */
export default (lng: Language) => {
  return {
    en: 'h:mm aaaa',
    fi: 'HH:mm',
    sv: 'HH.mm',
  }[lng];
};
