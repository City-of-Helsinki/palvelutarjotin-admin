import React from 'react';
import { useParams } from 'react-router';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import { useEventQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import getLocalizedString from '../../utils/getLocalizedString';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import EventBasicInfo from './eventBasicInfo/EventBasicInfo';
import EventContactPersonInfo from './eventContactPersonInfo/EventContactPersonInfo';
import EventDetailsButtons from './eventDetailsButtons/EventDetailsButtons';
import styles from './eventDetailsPage.module.scss';
import EventLocation from './eventLocation/EventLocation';
import { getFirstAvailableLanguage } from './utils';

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const locale = useLocale();
  const [selectedLanguage, setSelectedLanguage] = React.useState(locale);

  const { data: eventData, loading } = useEventQuery({
    variables: {
      id,
      include: ['audience', 'in_language', 'keywords', 'location'],
    },
  });

  React.useEffect(() => {
    if (eventData) {
      setSelectedLanguage(getFirstAvailableLanguage(eventData));
    }
  }, [eventData]);

  return (
    <PageWrapper title="eventDetails.title">
      <LoadingSpinner isLoading={loading}>
        <Container>
          {eventData ? (
            <div className={styles.eventDetailsPage}>
              <EventDetailsButtons
                eventData={eventData}
                onClickLanguage={setSelectedLanguage}
                selectedLanguage={selectedLanguage}
              />

              <h1>{getLocalizedString(eventData.event?.name || {}, locale)}</h1>
              <div className={styles.contentWrapper}>
                <div>
                  <EventBasicInfo
                    eventData={eventData}
                    language={selectedLanguage}
                  />
                  <EventLocation eventData={eventData} />
                </div>
                <div>
                  <EventContactPersonInfo />
                </div>
              </div>
            </div>
          ) : (
            <div>TODO: EVENT NOT FOUND</div>
          )}
        </Container>
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default EventDetailsPage;
