/**
 * Update locale part of the url
 * @param {string} url
 * @param {string} currentLocale
 * @param {string} value
 * @return {string}
 */
export default (url: string, currentLocale: string, value: string) => {
  return url.replace(`/${currentLocale}`, `/${value}`);
};
