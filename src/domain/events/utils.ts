import { QueryHookOptions } from '@apollo/client';
import * as React from 'react';

import {
  EventsQuery,
  EventsQueryVariables,
  useEventsQuery,
} from '../../generated/graphql';
import getPageNumberFromUrl from '../../utils/getPageNumberFromUrl';

export const useEventsQueryHelper = ({
  variables,
}: QueryHookOptions<EventsQuery, EventsQueryVariables>) => {
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const {
    fetchMore: fetchMoreEvents,
    data,
    ...helpers
  } = useEventsQuery({
    errorPolicy: 'ignore',
    variables: variables,
  });

  const nextPage = React.useMemo(() => {
    const nextUrl = data?.events?.meta.next;
    return nextUrl ? getPageNumberFromUrl(nextUrl) : null;
  }, [data]);

  const hasNextPage = Boolean(nextPage);

  const fetchMore = async () => {
    if (nextPage) {
      try {
        setIsLoadingMore(true);
        await fetchMoreEvents({
          variables: {
            page: nextPage,
          },
        });
        setIsLoadingMore(false);
      } catch (e) {
        setIsLoadingMore(false);
      }
    }
  };

  return { data, fetchMore, isLoadingMore, hasNextPage, ...helpers };
};
