import { Language } from '../types';

/**
 * Get localized time format
 */
export default function getTimeFormat(lng: Language): string {
  return {
    en: 'h:mm aaaa',
    fi: 'HH:mm',
    sv: 'HH.mm',
  }[lng];
}
