import { Button, TextInput } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  EventFieldsFragment,
  EventsQuery,
  useEventsQuery,
  useMyProfileQuery,
} from '../../generated/graphql';
import useDebounce from '../../hooks/useDebounce';
import useLocale from '../../hooks/useLocale';
import getLocalizedString from '../../utils/getLocalizedString';
import getPageNumberFromUrl from '../../utils/getPageNumberFromUrl';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import EventCard from '../event/eventCard/EventCard';
import {
  getEventFields,
  hasComingOccurrences,
  hasOccurrences,
} from '../event/utils';
import { getSelectedOrganisation } from '../myProfile/utils';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { activeOrganisationSelector } from '../organisation/selector';
import { EVENT_SORT_KEYS, PAGE_SIZE } from './constants';
import styles from './eventsPage.module.scss';

const EventsTitle: React.FC<{ count: number; title: string }> = ({
  count,
  title,
}) => {
  const { t } = useTranslation();
  return (
    <h2>
      {title}{' '}
      <span className={styles.eventCount}>
        {t('events.textEventCount', {
          count: count,
        })}
      </span>
    </h2>
  );
};

const Events: React.FC<{
  events: EventFieldsFragment[];
  goToEventOccurrencesPage: (id: string) => void;
}> = ({ events, goToEventOccurrencesPage }) => {
  const locale = useLocale();

  return (
    <div className={styles.eventsContainer}>
      {events?.map((event) => {
        const {
          description,
          eventName = '',
          id,
          imageUrl,
          occurrences,
          totalSeatsTakes = 0,
        } = getEventFields(event, locale);
        return (
          <EventCard
            key={id || ''}
            description={description}
            enrolmentsCount={totalSeatsTakes}
            id={id || ''}
            image={imageUrl}
            name={eventName}
            occurrencesCount={occurrences?.length || 0}
            onClick={goToEventOccurrencesPage}
          />
        );
      })}
    </div>
  );
};

const EventsPage = () => {
  const [inputValue, setInputValue] = React.useState('');
  const searchValue = useDebounce(inputValue, 100);
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const { data: myProfileData } = useMyProfileQuery();

  const activeOrganisation = useSelector(activeOrganisationSelector);
  const selectedOrganisation =
    myProfileData?.myProfile &&
    getSelectedOrganisation(myProfileData.myProfile, activeOrganisation);

  const { data, loading, fetchMore } = useEventsQuery({
    errorPolicy: 'ignore',
    variables: {
      pageSize: PAGE_SIZE,
      publisher: selectedOrganisation?.publisherId,
      sort: EVENT_SORT_KEYS.START_TIME,
      text: searchValue,
    },
  });

  const goToCreateEventPage = () => {
    history.push(`/${locale}${ROUTES.CREATE_EVENT}`);
  };

  const goToEventOccurrencesPage = (id: string) => {
    history.push(`/${locale}${ROUTES.OCCURRENCES.replace(':id', id)}`);
  };

  const events = data?.events?.data.filter((event) => event.pEvent?.id) || [];
  const eventsWithComingOccurrences = events.filter((event) =>
    hasComingOccurrences(event)
  );
  const eventsWithoutOccurrences = events.filter(
    (event) => !hasOccurrences(event)
  );
  const eventsWithPastOccurrences = events.filter(
    (event) => hasOccurrences(event) && !hasComingOccurrences(event)
  );

  const nextPage = React.useMemo(() => {
    const nextUrl = data?.events?.meta.next;
    return nextUrl ? getPageNumberFromUrl(nextUrl) : null;
  }, [data]);

  const shouldShowLoadMore = Boolean(nextPage);

  const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const fetchMoreEvents = async () => {
    if (nextPage) {
      try {
        setIsLoadingMore(true);
        await fetchMore({
          updateQuery: (prev: EventsQuery, { fetchMoreResult }) => {
            if (!fetchMoreResult?.events) {
              return prev;
            }

            const prevEvents = prev.events?.data || [];
            const newEvents = fetchMoreResult.events?.data || [];
            fetchMoreResult.events.data = [...prevEvents, ...newEvents];

            return fetchMoreResult;
          },
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

  return (
    <PageWrapper>
      <Container>
        <div className={styles.eventsPage}>
          <ActiveOrganisationInfo as="h1" />

          <div className={styles.comingEventsTitleWrapper}>
            <EventsTitle
              count={eventsWithComingOccurrences.length}
              title={t('events.titleComingEvents')}
            />
            <div className={styles.searchWrapper}>
              <div>
                <Button fullWidth={true} onClick={goToCreateEventPage}>
                  {t('events.buttonNewEvent')}
                </Button>
              </div>
              <div>
                <TextInput
                  id="search"
                  placeholder={t('events.placeholderSearch')}
                  onChange={handleSearchFieldChange}
                  value={inputValue}
                />
              </div>
            </div>
          </div>
          <LoadingSpinner isLoading={loading}>
            {!!eventsWithComingOccurrences.length ? (
              <Events
                events={eventsWithComingOccurrences}
                goToEventOccurrencesPage={goToEventOccurrencesPage}
              />
            ) : (
              <p>{t('events.textNoComingEvents')}</p>
            )}

            {!!eventsWithoutOccurrences.length && (
              <>
                <EventsTitle
                  count={eventsWithoutOccurrences.length}
                  title={t('events.titleEventsWithoutOccurrences')}
                />
                <Events
                  events={eventsWithoutOccurrences}
                  goToEventOccurrencesPage={goToEventOccurrencesPage}
                />
              </>
            )}
            {!!eventsWithPastOccurrences.length && (
              <>
                <EventsTitle
                  count={eventsWithPastOccurrences.length}
                  title={t('events.titleEventsWithPastOccurrences')}
                />
                <Events
                  events={eventsWithPastOccurrences}
                  goToEventOccurrencesPage={goToEventOccurrencesPage}
                />
              </>
            )}
            {shouldShowLoadMore && (
              <LoadingSpinner hasPadding={false} isLoading={isLoadingMore}>
                <button
                  onClick={fetchMoreEvents}
                  className={styles.showMoreButton}
                >
                  {t('events.buttonLoadMore')}
                </button>
              </LoadingSpinner>
            )}
          </LoadingSpinner>
        </div>
      </Container>
    </PageWrapper>
  );
};

export default EventsPage;
