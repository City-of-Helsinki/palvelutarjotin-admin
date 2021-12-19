import { Button, IconCrossCircle, IconPen } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import AlertModal from '../../common/components/modal/AlertModal';
import {
  useDeleteSingleEventMutation,
  useEventQuery,
} from '../../generated/graphql';
import useHistory from '../../hooks/useHistory';
import useLocale from '../../hooks/useLocale';
import { Language } from '../../types';
import { addParamsToQueryString } from '../../utils/addParamsToQueryString';
import getLocalizedString from '../../utils/getLocalizedString';
import { formatIntoDate, formatIntoTime } from '../../utils/time/format';
import { clearApolloCache } from '../app/apollo/utils';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import EventBasicInfo from './eventBasicInfo/EventBasicInfo';
import EventCategorisation from './eventCategorisation/EventCategorisation';
import EventContactPersonInfo from './eventContactPersonInfo/EventContactPersonInfo';
import EventDetailsButtons from './eventDetailsButtons/EventDetailsButtons';
import styles from './eventDetailsPage.module.scss';
import EventLocation from './eventLocation/EventLocation';
import {
  getEventLanguageFromUrl,
  getFirstAvailableLanguage,
  getUpcomingOccurrences,
} from './utils';

const EventDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const variables = {
    id,
    include: ['audience', 'in_language', 'keywords', 'location'],
  };
  const history = useHistory();
  const locale = useLocale();
  const { search } = useLocation();
  const language = getEventLanguageFromUrl(search);
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    language || locale
  );

  const { data: eventData, loading } = useEventQuery({
    fetchPolicy: 'network-only',
    variables,
  });

  const organisationId = eventData?.event?.pEvent?.organisation?.id || '';
  const upcomingOccurrences = getUpcomingOccurrences(eventData?.event);
  const eventHasUpcomingOccurrences = upcomingOccurrences.length > 0;

  const [deleteEventRequest] = useDeleteSingleEventMutation();

  React.useEffect(() => {
    if (eventData) {
      setSelectedLanguage(language || getFirstAvailableLanguage(eventData));
    }
  }, [eventData, language]);

  // replace language and preserve returnPath
  const handleLanguageChange = (newLanguage: Language) => {
    const searchParams = new URLSearchParams(search);
    searchParams.delete('language');
    const queryString = addParamsToQueryString(searchParams.toString(), {
      language: newLanguage,
    });
    history.pushWithLocale({
      pathname: ROUTES.EVENT_DETAILS.replace(':id', id),
      search: queryString,
    });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const deleteEvent = async () => {
    try {
      await deleteEventRequest({
        variables: { eventId: eventData?.event?.id || '' },
      });
      // TODO: Use cache.modify function from apollo-client v3 to filter
      // deleted event from event list
      // https://github.com/apollographql/apollo-client/blob/v3.0.0-rc.0/CHANGELOG.md
      // Clear apollo cache to force eventlist reload
      await clearApolloCache();
      history.replace(ROUTES.HOME);
    } catch (e) {
      // Check apolloClient to see error handling
    }
  };

  const renderFutureOccurrencesList = () => {
    const getOccurrenceTime = (time: string) =>
      t('eventDetails.deleteModal.occurrenceTime', {
        date: formatIntoDate(new Date(time)),
        time: formatIntoTime(new Date(time)),
      });

    if (eventHasUpcomingOccurrences) {
      return (
        <div className={styles.futureOccurrencesList}>
          <p style={{ fontWeight: 'bold' }}>
            {t('eventDetails.deleteModal.upcomingOccurrences')} (
            {upcomingOccurrences.length}):
          </p>
          {upcomingOccurrences.length <= 5 ? (
            <ul>
              {upcomingOccurrences.map((o) => (
                <li key={o?.node?.id}>
                  {getOccurrenceTime(o?.node?.startTime)}
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <div>
                {getOccurrenceTime(upcomingOccurrences[0]?.node?.startTime)}
              </div>
              <Dots />
              <div>
                {getOccurrenceTime(
                  upcomingOccurrences[upcomingOccurrences.length - 1]?.node
                    ?.startTime
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const handleEditEventClick = () => {
    history.pushWithReturnPath(ROUTES.EDIT_EVENT.replace(':id', id));
  };

  return (
    <PageWrapper title="eventDetails.title">
      <LoadingSpinner isLoading={loading}>
        <Container>
          {eventData ? (
            <div className={styles.eventDetailsPage}>
              <AlertModal
                confirmButtonText={t('eventDetails.deleteModal.buttonDelete')}
                onConfirm={deleteEvent}
                isOpen={isModalOpen}
                title={t('eventDetails.deleteModal.title')}
                toggleModal={toggleModal}
              >
                <p>{t('eventDetails.deleteModal.text1')}</p>
                <p>{t('eventDetails.deleteModal.sendNotificationWarning')}</p>
                {renderFutureOccurrencesList()}
              </AlertModal>

              <ActiveOrganisationInfo organisationId={organisationId} />

              <EventDetailsButtons
                eventData={eventData}
                onClickLanguage={handleLanguageChange}
                selectedLanguage={selectedLanguage}
              />

              <h1>{getLocalizedString(eventData.event?.name || {}, locale)}</h1>
              <div className={styles.contentWrapper}>
                <div>
                  <EventBasicInfo
                    eventData={eventData}
                    language={selectedLanguage}
                  />
                  <EventCategorisation
                    eventData={eventData}
                    language={selectedLanguage}
                  />
                  <EventLocation
                    eventData={eventData}
                    language={selectedLanguage}
                  />
                </div>
                <div>
                  <EventContactPersonInfo eventData={eventData} />
                </div>
              </div>
              <div className={styles.actionButtonsContainer}>
                <Button
                  iconLeft={<IconPen />}
                  onClick={handleEditEventClick}
                  variant="secondary"
                >
                  {t('eventDetails.buttons.buttonEdit')}
                </Button>
                <Button
                  className={styles.deleteButton}
                  iconLeft={<IconCrossCircle />}
                  onClick={openDeleteModal}
                  variant="secondary"
                >
                  {t('eventDetails.buttons.buttonDelete')}
                </Button>
              </div>
            </div>
          ) : (
            <ErrorPage />
          )}
        </Container>
      </LoadingSpinner>
    </PageWrapper>
  );
};

const Dots = () => {
  return (
    <div className={styles.dots} data-testid="dots">
      <div />
      <div />
      <div />
    </div>
  );
};

export default EventDetailsPage;
