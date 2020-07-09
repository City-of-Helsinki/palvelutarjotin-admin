import { SUPPORT_LANGUAGES } from '../constants';
import { LocalisedObject } from '../generated/graphql';
import { Language } from '../types';

export default (
  obj: LocalisedObject | undefined | null = {},
  language: Language
): string => {
  if (obj === null) {
    return '';
  }

  const languages = [
    language,
    ...Object.values(SUPPORT_LANGUAGES).filter((item) => item !== language),
  ];
  // Find first langauge which has value
  const locale = languages.find((lng) => obj[lng]);
  // Return value in correct language
  return (locale && obj[locale]) || '';
};
