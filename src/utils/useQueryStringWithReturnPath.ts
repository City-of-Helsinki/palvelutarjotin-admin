import { useLocation } from 'react-router';

import { addParamsToQueryString } from './addParamsToQueryString';

const useQueryStringWithReturnPath = () => {
  const { search, pathname } = useLocation();
  return addParamsToQueryString(search, {
    returnPath: pathname,
  });
};

export default useQueryStringWithReturnPath;
