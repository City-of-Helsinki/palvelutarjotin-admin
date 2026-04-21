import { QueryHookOptions } from '@apollo/client';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useNotificationsContext } from '../../common/components/notificationsContext/hooks/useNotificationsContext';
import {
  EventsQuery,
  EventsQueryVariables,
  useEventsQuery,
} from '../../generated/graphql';
import getPageNumberFromUrl from '../../utils/getPageNumberFromUrl';

export const useEventsQueryHelper = ({
  skip,
  variables,
}: QueryHookOptions<EventsQuery, EventsQueryVariables>) => {
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const { t } = useTranslation();
  const { addNotification } = useNotificationsContext();

  const {
    fetchMore: fetchMoreEvents,
    data,
    ...helpers
  } = useEventsQuery({
    skip,
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
      } catch (error) {
        addNotification({
          label: t('events.errorFetchMoreEvents'),
          type: 'error',
        });
        setIsLoadingMore(false);
        // eslint-disable-next-line no-console
        console.error('Failed to fetch more events', { error });
      }
    }
  };

  return { data, fetchMore, isLoadingMore, hasNextPage, ...helpers };
};
