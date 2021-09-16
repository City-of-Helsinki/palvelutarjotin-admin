import { PlaceFieldsFragment } from '../../generated/graphql';
import { Language } from '../../types';
import getLocalizedString from '../../utils/getLocalizedString';
/**
 * Generate link to get Hsl directions
 * @param {string} streetAddress
 * @param {string} addressLocality
 * @param {string} locale
 * @return {string}
 */
export const generateHslLink = (
  streetAddress: string,
  addressLocality: string,
  locale: Language
) => {
  return `https://www.reittiopas.fi/${locale}/?to=${streetAddress.replace(
    /\s+/g,
    '+'
  )},${addressLocality}`;
};

/**
 * Generate link to service map
 * @param {string} id
 * @param {string} locale
 * @return {string}
 */
export const generateServiceMapLink = (id: string, locale: Language) => {
  const unitId = id.split(':')[1];
  return `https://palvelukartta.hel.fi/${locale}/unit/${unitId}`;
};

type PlaceFields = {
  name: string;
  streetAddress: string;
  telephone: string;
  addressLocality: string;
};

export const getPlaceFields = (
  place: PlaceFieldsFragment | null | undefined,
  locale: Language
): PlaceFields => {
  return {
    name: getLocalizedString(place?.name, locale),
    streetAddress: getLocalizedString(place?.streetAddress, locale),
    telephone: getLocalizedString(place?.telephone, locale),
    addressLocality: getLocalizedString(place?.addressLocality, locale),
  };
};
