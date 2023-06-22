import { useLocation } from 'react-router-dom';

import { addParamsToQueryString } from './addParamsToQueryString';

const useQueryStringWithReturnPath = () => {
  const { search, pathname } = useLocation();
  return addParamsToQueryString(search, {
    returnPath: pathname,
  });
};

export default useQueryStringWithReturnPath;
