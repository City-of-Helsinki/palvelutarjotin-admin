import { Button, IconCrossCircle } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import AlertModal from '../../common/components/modal/AlertModal';
import {
  useDeleteSingleEventMutation,
  useEventQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import { Language } from '../../types';
import getLocalizedString from '../../utils/getLocalizedString';
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
import { getEventLanguageFromUrl, getFirstAvailableLanguage } from './utils';

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
  const location = useLocation();
  const language = getEventLanguageFromUrl(location.search);
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    language || locale
  );

  const { data: eventData, loading } = useEventQuery({
    fetchPolicy: 'network-only',
    variables,
  });
  const organisationId = eventData?.event?.pEvent?.organisation?.id || '';

  const [deleteEventRequest] = useDeleteSingleEventMutation();

  React.useEffect(() => {
    if (eventData) {
      setSelectedLanguage(language || getFirstAvailableLanguage(eventData));
    }
  }, [eventData, language]);

  const handleLanguageChange = (newLanguage: Language) => {
    history.push({
      pathname: `/${locale}${ROUTES.EVENT_DETAILS.replace(':id', id)}`,
      search: `?language=${newLanguage}`,
    });
    setSelectedLanguage(newLanguage);
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
                <p>{t('eventDetails.deleteModal.text2')}</p>
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
              <Button
                className={styles.deleteButton}
                iconLeft={<IconCrossCircle />}
                onClick={openDeleteModal}
                variant="secondary"
              >
                {t('eventDetails.buttons.buttonDelete')}
              </Button>
            </div>
          ) : (
            <ErrorPage />
          )}
        </Container>
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default EventDetailsPage;
