import { useLocation } from 'react-router';

import deleteParamsFromQueryString from '../utils/deleteParamsFromQueryString';
import { extractLatestReturnPath } from '../utils/extractLatestReturnPath';
import useHistory from './useHistory';

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
  const history = useHistory();

  const goBack = () => {
    let queryString = search;
    if (pageQueryParams) {
      queryString = deleteParamsFromQueryString(search, pageQueryParams);
    }

    const { returnPath, remainingQueryString } = extractLatestReturnPath(
      queryString,
      defaultReturnPath
    );

    history.pushWithLocale({
      pathname: returnPath,
      search: remainingQueryString,
      state,
    });
  };

  return goBack;
}

export default useGoBack;
