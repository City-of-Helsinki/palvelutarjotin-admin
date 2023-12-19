import { Button, TextInput } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import useNavigate from '../../hooks/useNavigate';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import EventsCategoryList from './eventsCategoryList/EventsCategoryList';
import styles from './eventsPage.module.scss';
import useEventsPageContext from './hooks/useEventsPageContext';
import useEventsPageQueries from './hooks/useEventsPageQueries';
import PlaceSelector from './PlaceSelector';

const EventsPage: React.FC = () => {
  const { t } = useTranslation();
  const { pushWithLocale } = useNavigate();
  const eventsContext = useEventsPageContext();
  const { inputValue, setInputValue, placesValue, setPlacesValue } =
    eventsContext;
  const {
    loadingUpcomingEvents,
    isLoadingMoreUpcomingEvents,
    upcomingEventsHasNextPage,
    fetchMoreUpcomingEvents,
    loadingPastEvents,
    loadingMorePastEvents,
    fetchMorePastEvents,
    pastEventsHasNextPage,
    loadingEventsWithoutOccurrences,
    loadingMoreEventsWithoutOccurrences,
    fetchMoreEventsWithoutOccurrences,
    eventsWithoutOccurrencesHasNextPage,
    eventsWithComingOccurrences,
    eventsWithComingOccurrencesCount,
    eventsWithoutOccurrences,
    eventsWithoutOccurrencesCount,
    eventsWithPastOccurrences,
    eventsWithPastOccurrencesCount,
  } = useEventsPageQueries(eventsContext);

  const goToCreateEventPage = () => {
    pushWithLocale(ROUTES.CREATE_EVENT);
  };

  const goToEventSummaryPage = (id: string) => {
    pushWithLocale(ROUTES.EVENT_SUMMARY.replace(':id', id));
  };

  const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const loadingEvents =
    loadingUpcomingEvents ||
    loadingEventsWithoutOccurrences ||
    loadingPastEvents;

  return (
    <PageWrapper>
      <Container>
        <div className={styles.eventsPage}>
          <ActiveOrganisationInfo as="h1" />

          <div className={styles.comingEventsTitleWrapper}>
            <div className={styles.searchWrapper}>
              <div>
                <TextInput
                  id="search"
                  placeholder={t('events.search.placeholderSearch')}
                  onChange={handleSearchFieldChange}
                  value={inputValue}
                  label={t('events.search.labelSearch')}
                />
              </div>
              <div>
                <PlaceSelector
                  onChange={(places) => setPlacesValue(places)}
                  value={placesValue}
                />
              </div>
              <div style={{ marginLeft: 'auto', marginTop: '28px' }}>
                <Button fullWidth={true} onClick={goToCreateEventPage}>
                  {t('events.buttonNewEvent')}
                </Button>
              </div>
            </div>
          </div>
          <LoadingSpinner isLoading={loadingEvents}>
            <EventsCategoryList
              eventsCount={
                eventsWithComingOccurrencesCount ||
                eventsWithComingOccurrences.length
              }
              title={t('events.titleComingEvents')}
              events={eventsWithComingOccurrences}
              onGoToEventSummaryPage={goToEventSummaryPage}
              isLoadingMoreEvents={isLoadingMoreUpcomingEvents}
              onFetchMoreEvents={fetchMoreUpcomingEvents}
              hasNextPage={upcomingEventsHasNextPage}
              notFoundText={t('events.textNoComingEvents')}
            />
            <EventsCategoryList
              eventsCount={
                eventsWithoutOccurrencesCount || eventsWithoutOccurrences.length
              }
              title={t('events.titleEventsWithoutOccurrences')}
              events={eventsWithoutOccurrences}
              onGoToEventSummaryPage={goToEventSummaryPage}
              isLoadingMoreEvents={loadingMoreEventsWithoutOccurrences}
              onFetchMoreEvents={fetchMoreEventsWithoutOccurrences}
              hasNextPage={eventsWithoutOccurrencesHasNextPage}
            />
            <EventsCategoryList
              eventsCount={
                eventsWithPastOccurrencesCount ||
                eventsWithPastOccurrences.length
              }
              title={t('events.titleEventsWithPastOccurrences')}
              events={eventsWithPastOccurrences}
              onGoToEventSummaryPage={goToEventSummaryPage}
              isLoadingMoreEvents={loadingMorePastEvents}
              onFetchMoreEvents={fetchMorePastEvents}
              hasNextPage={pastEventsHasNextPage}
            />
          </LoadingSpinner>
        </div>
      </Container>
    </PageWrapper>
  );
};

export default EventsPage;
