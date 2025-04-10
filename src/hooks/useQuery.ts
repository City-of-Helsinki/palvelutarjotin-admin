import * as React from 'react';
import { useLocation } from 'react-router';

export const useSearchParams = () => {
  const search = useLocation().search;

  const searchParams = React.useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);

  return searchParams;
};
