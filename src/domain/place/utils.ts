/**
 * Generate link to get Hsl directions
 * @param {string} streetAddress
 * @param {string} addressLocality
 * @return {string}
 */
export const generateHslLink = (
  streetAddress: string,
  addressLocality: string
) => {
  return `http://www.reittiopas.fi/fi/?to=${streetAddress.replace(
    /\s+/g,
    '+'
  )},${addressLocality}`;
};

/**
 * Generate link to service map
 * @param {string} id
 * @return {string}
 */
export const generateServiceMapLink = (id: string) => {
  const unitId = id.split(':')[1];
  return `https://palvelukartta.hel.fi/fi/unit/${unitId}`;
};
