const deleteParamsFromQueryString = (
  queryString: string,
  queryParams: string[]
): string => {
  const searchParams = new URLSearchParams(queryString);

  queryParams.forEach((paramName) => {
    searchParams.delete(paramName);
  });
  return '?' + searchParams.toString();
};

export default deleteParamsFromQueryString;
