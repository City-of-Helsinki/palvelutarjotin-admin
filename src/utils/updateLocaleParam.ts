const updateLocaleParam = (
  url: string,
  currentLocale: string,
  value: string
) => {
  return url.replace(`/${currentLocale}`, `/${value}`);
};

export default updateLocaleParam;
