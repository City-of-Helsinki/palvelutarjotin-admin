import { useLocation } from 'react-router-dom';

import useNavigate from './useNavigate';
import deleteParamsFromQueryString from '../utils/deleteParamsFromQueryString';
import { extractLatestReturnPath } from '../utils/extractLatestReturnPath';

type Props<S> = {
  defaultReturnPath: string;
  pageQueryParams?: string[];
  state?: S;
};

function useGoBack<S>({
  defaultReturnPath,
  // page query params that we don't want to persist when navigating back
  pageQueryParams,
  state,
}: Props<S>): () => void {
  const { search } = useLocation();
  const { pushWithLocale } = useNavigate();

  const goBack = () => {
    let queryString = search;
    if (pageQueryParams) {
      queryString = deleteParamsFromQueryString(search, pageQueryParams);
    }

    const { returnPath, remainingQueryString } = extractLatestReturnPath(
      queryString,
      defaultReturnPath
    );

    pushWithLocale(
      {
        pathname: returnPath,
        search: remainingQueryString,
      },
      { state }
    );
  };

  return goBack;
}

export default useGoBack;
