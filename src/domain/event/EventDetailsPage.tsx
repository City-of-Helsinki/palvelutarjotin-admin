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
import styles from './eventDetailsPage.module.scss';
import EventLocation from './eventLocation/EventLocation';

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: eventData, loading } = useEventQuery({
    variables: { id, include: ['keywords', 'in_language', 'location'] },
  });
  const locale = useLocale();

  return (
    <PageWrapper title="eventDetails.title">
      <LoadingSpinner isLoading={loading}>
        <Container>
          {eventData ? (
            <div className={styles.eventDetailsPage}>
              <h1>{getLocalizedString(eventData.event?.name || {}, locale)}</h1>
              <div className={styles.contentWrapper}>
                <div>
                  <EventBasicInfo eventData={eventData} />
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
