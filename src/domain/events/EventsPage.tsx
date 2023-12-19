import { Button, Combobox, TextInput } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import { EventFieldsFragment } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import useNavigate from '../../hooks/useNavigate';
import useProfilePlaces from '../../hooks/useProfilePlaces';
import getLocalizedString from '../../utils/getLocalizedString';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import EventCard from '../event/eventCard/EventCard';
import { getEventFields } from '../event/utils';
import { getEnrolmentType } from '../occurrence/utils';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import styles from './eventsPage.module.scss';
import useEventsPageContext from './hooks/useEventsPageContext';
import useEventsPageQueries from './hooks/useEventsPageQueries';
import { PlaceOption } from './types';

const EventsPage: React.FC = () => {
  const { t } = useTranslation();
  const { pushWithLocale } = useNavigate();
  const eventsContext = useEventsPageContext();
  const {
    upcomingEventsData,
    loadingUpcomingEvents,
    isLoadingMoreUpcomingEvents,
    upcomingEventsHasNextPage,
    fetchMoreUpcomingEvents,
    pastEventsData,
    loadingPastEvents,
    loadingMorePastEvents,
    fetchMorePastEvents,
    pastEventsHasNextPage,
    eventsWithoutOccurrencesData,
    loadingEventsWithoutOccurrences,
    loadingMoreEventsWithoutOccurrences,
    fetchMoreEventsWithoutOccurrences,
    eventsWithoutOccurrencesHasNextPage,
  } = useEventsPageQueries(eventsContext);

  const { inputValue, setInputValue, placesValue, setPlacesValue } =
    eventsContext;

  const goToCreateEventPage = () => {
    pushWithLocale(ROUTES.CREATE_EVENT);
  };

  const goToEventSummaryPage = (id: string) => {
    pushWithLocale(ROUTES.EVENT_SUMMARY.replace(':id', id));
  };

  const eventsWithComingOccurrences = upcomingEventsData?.events?.data || [];
  const eventsWithComingOccurrencesCount =
    upcomingEventsData?.events?.meta.count;

  const eventsWithoutOccurrences =
    eventsWithoutOccurrencesData?.events?.data || [];
  const eventsWithoutOccurrencesCount =
    eventsWithoutOccurrencesData?.events?.meta.count;

  const eventsWithPastOccurrences = pastEventsData?.events?.data || [];
  const eventsWithPastOccurrencesCount = pastEventsData?.events?.meta.count;

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

const PlaceSelector: React.FC<{
  onChange: (selected: PlaceOption[]) => void;
  value: PlaceOption[];
}> = ({ onChange, value }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { places } = useProfilePlaces();

  const placeOptions: PlaceOption[] = places
    ? places.map((place) => ({
        label: getLocalizedString(place.name, locale),
        value: place.id ?? '',
      }))
    : [];

  return (
    <Combobox
      value={value as any}
      label={t('events.search.labelPlaces')}
      multiselect
      placeholder={t('events.search.placeholderPlaces')}
      toggleButtonAriaLabel={t('events.search.placesToggleButtonAriaLabel')}
      clearButtonAriaLabel={t('events.search.placesClearButtonAriaLabel')}
      selectedItemRemoveButtonAriaLabel={t(
        'events.search.placesSelectedItemRemoveButtonAriaLabel'
      )}
      onChange={onChange as any}
      options={placeOptions}
    />
  );
};

interface EventsCategoryListProps {
  eventsCount: number;
  title: string;
  events: EventFieldsFragment[];
  onGoToEventSummaryPage: (id: string) => void;
  isLoadingMoreEvents: boolean;
  onFetchMoreEvents: () => Promise<void>;
  hasNextPage: boolean;
  notFoundText?: string;
}

const EventsCategoryList: React.FC<EventsCategoryListProps> = ({
  eventsCount,
  title,
  events,
  onGoToEventSummaryPage,
  isLoadingMoreEvents,
  onFetchMoreEvents,
  hasNextPage,
  notFoundText,
}) => {
  if (!!events.length) {
    return (
      <>
        <EventsTitle count={eventsCount} title={title} />
        <Events events={events} goToEventSummaryPage={onGoToEventSummaryPage} />
        {hasNextPage && (
          <ShowMoreButton
            loading={isLoadingMoreEvents}
            onClick={onFetchMoreEvents}
          />
        )}
      </>
    );
  }

  if (notFoundText) {
    return (
      <>
        <EventsTitle count={eventsCount} title={title} />
        <p>{notFoundText}</p>
      </>
    );
  }

  return null;
};

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
  goToEventSummaryPage: (id: string) => void;
}> = ({ events, goToEventSummaryPage }) => {
  const locale = useLocale();

  return (
    <div className={styles.eventsContainer}>
      {events?.map((event) => {
        const {
          shortDescription,
          eventName = '',
          id,
          imageUrl,
          occurrences,
          totalSeatsTakes = 0,
          publicationStatus,
        } = getEventFields(event, locale);
        const enrolmentType = getEnrolmentType(event);
        return (
          <EventCard
            key={id || ''}
            description={shortDescription}
            enrolmentsCount={totalSeatsTakes}
            id={id || ''}
            image={imageUrl}
            name={eventName}
            occurrencesCount={occurrences?.length || 0}
            publicationStatus={publicationStatus}
            enrolmentType={enrolmentType}
            onClick={goToEventSummaryPage}
          />
        );
      })}
    </div>
  );
};

const ShowMoreButton: React.FC<{
  loading: boolean;
  onClick: () => Promise<void>;
}> = ({ loading, onClick }) => {
  const { t } = useTranslation();

  return (
    <LoadingSpinner hasPadding={false} isLoading={loading}>
      <button onClick={onClick} className={styles.showMoreButton}>
        {t('events.buttonLoadMore')}
      </button>
    </LoadingSpinner>
  );
};

export default EventsPage;
