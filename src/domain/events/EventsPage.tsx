import { Button, TextInput } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  EventFieldsFragment,
  useMyProfileQuery,
} from '../../generated/graphql';
import useDebounce from '../../hooks/useDebounce';
import useLocale from '../../hooks/useLocale';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import EventCard from '../event/eventCard/EventCard';
import { getEventFields } from '../event/utils';
import { getSelectedOrganisation } from '../myProfile/utils';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { activeOrganisationSelector } from '../organisation/selector';
import { EVENT_SORT_KEYS, PAGE_SIZE, PUBLICATION_STATUS } from './constants';
import styles from './eventsPage.module.scss';
import { useEventsQueryHelper } from './utils';

const EventsPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('');
  const searchValue = useDebounce(inputValue, 100);
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();

  const { data: myProfileData } = useMyProfileQuery();

  const activeOrganisation = useSelector(activeOrganisationSelector);
  const selectedOrganisation =
    myProfileData?.myProfile &&
    getSelectedOrganisation(myProfileData.myProfile, activeOrganisation);

  const baseVariables = {
    pageSize: PAGE_SIZE,
    published: selectedOrganisation?.publisherId,
    sort: EVENT_SORT_KEYS.START_TIME,
    text: searchValue,
    showAll: true,
  };

  const {
    data: eventsData,
    loading: loadingEvents,
    isLoadingMore: isLoadingMoreEvents,
    hasNextPage: eventsHasNextPage,
    fetchMore: fetchMoreEvents,
  } = useEventsQueryHelper({
    errorPolicy: 'ignore',
    variables: {
      ...baseVariables,
      // with start:now we can get events that have upcoming occurrences
      start: 'now',
    },
  });

  const {
    data: eventsWithoutOccurrencesData,
    isLoadingMore: loadingMoreEventsWithoutOccurrences,
    fetchMore: fetchMoreEventsWithoutOccurrences,
    hasNextPage: eventsWithoutOccurrencesHasNextPage,
  } = useEventsQueryHelper({
    errorPolicy: 'ignore',
    variables: {
      ...baseVariables,
      // when querying for events that are in draft should have no occurrences
      publicationStatus: PUBLICATION_STATUS.DRAFT,
    },
  });

  const {
    data: pastEventsData,
    isLoadingMore: loadingMorePastEvents,
    fetchMore: fetchMorePastEvents,
    hasNextPage: pastEventsHasNextPage,
  } = useEventsQueryHelper({
    errorPolicy: 'ignore',
    variables: {
      ...baseVariables,
      // we will egt past events with end:now
      end: 'now',
    },
  });

  const goToCreateEventPage = () => {
    history.push(`/${locale}${ROUTES.CREATE_EVENT}`);
  };

  const goToEventOccurrencesPage = (id: string) => {
    history.push(`/${locale}${ROUTES.OCCURRENCES.replace(':id', id)}`);
  };

  const eventsWithComingOccurrences = eventsData?.events?.data || [];
  const eventsWithComingOccurrencesCount = eventsData?.events?.meta.count;

  const eventsWithoutOccurrences =
    eventsWithoutOccurrencesData?.events?.data || [];
  const eventsWithoutOccurrencesCount =
    eventsWithoutOccurrencesData?.events?.meta.count;

  const eventsWithPastOccurrences = pastEventsData?.events?.data || [];
  const eventsWithPastOccurrencesCount = pastEventsData?.events?.meta.count;

  const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <PageWrapper>
      <Container>
        <div className={styles.eventsPage}>
          <ActiveOrganisationInfo as="h1" />

          <div className={styles.comingEventsTitleWrapper}>
            <EventsTitle
              count={
                eventsWithComingOccurrencesCount ||
                eventsWithComingOccurrences.length
              }
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
          <LoadingSpinner isLoading={loadingEvents}>
            {!!eventsWithComingOccurrences.length ? (
              <>
                <Events
                  events={eventsWithComingOccurrences}
                  goToEventOccurrencesPage={goToEventOccurrencesPage}
                />
                {eventsHasNextPage && (
                  <ShowMoreButton
                    loading={isLoadingMoreEvents}
                    onClick={fetchMoreEvents}
                  />
                )}
              </>
            ) : (
              <p>{t('events.textNoComingEvents')}</p>
            )}

            {!!eventsWithoutOccurrences.length && (
              <>
                <EventsTitle
                  count={
                    eventsWithoutOccurrencesCount ||
                    eventsWithoutOccurrences.length
                  }
                  title={t('events.titleEventsWithoutOccurrences')}
                />
                <Events
                  events={eventsWithoutOccurrences}
                  goToEventOccurrencesPage={goToEventOccurrencesPage}
                />
                {eventsWithoutOccurrencesHasNextPage && (
                  <ShowMoreButton
                    loading={loadingMoreEventsWithoutOccurrences}
                    onClick={fetchMoreEventsWithoutOccurrences}
                  />
                )}
              </>
            )}

            {!!eventsWithPastOccurrences.length && (
              <>
                <EventsTitle
                  count={
                    eventsWithPastOccurrencesCount ||
                    eventsWithPastOccurrences.length
                  }
                  title={t('events.titleEventsWithPastOccurrences')}
                />
                <Events
                  events={eventsWithPastOccurrences}
                  goToEventOccurrencesPage={goToEventOccurrencesPage}
                />
                {pastEventsHasNextPage && (
                  <ShowMoreButton
                    loading={loadingMorePastEvents}
                    onClick={fetchMorePastEvents}
                  />
                )}
              </>
            )}
          </LoadingSpinner>
        </div>
      </Container>
    </PageWrapper>
  );
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
          publicationStatus,
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
            publicationStatus={publicationStatus}
            onClick={goToEventOccurrencesPage}
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
