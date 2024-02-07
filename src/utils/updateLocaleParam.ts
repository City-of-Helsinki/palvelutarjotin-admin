const updateLocaleParam = (
  url: string,
  currentLocale: string,
  value: string
) => {
  return url.replace(
    new RegExp(`/${currentLocale}`, 'i'),
    `/${value.toLowerCase()}`
  );
};

export default updateLocaleParam;
