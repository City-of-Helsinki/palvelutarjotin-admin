import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import BackButton from '../../common/components/backButton/BackButton';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import { useAddOccurrenceMutation } from '../../generated/graphql';
import useHistory from '../../hooks/useHistory';
import useLocale from '../../hooks/useLocale';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import { VIRTUAL_EVENT_LOCATION_ID } from '../event/constants';
import { getEventFields } from '../event/utils';
import { EnrolmentType } from './constants';
import styles from './editOccurrencesPage.module.scss';
import OccurrencesFormPart from './occurrencesFormPart/OccurrencesFormPart';
import { getEnrolmentType, useBaseEventQuery } from './utils';

interface Params {
  id: string;
}

const EditOccurrencesPage: React.FC = () => {
  const { id: eventId } = useParams<Params>();
  const history = useHistory();
  const { t } = useTranslation();
  const locale = useLocale();

  const { data: eventData, loading: loadingEvent } = useBaseEventQuery({
    variables: { id: eventId },
    fetchPolicy: 'network-only',
  });
  const event = eventData?.event;

  const [createOccurrence, { loading: addOccurrenceLoading }] =
    useAddOccurrenceMutation();

  const goToEventSummaryPage = () => {
    history.pushWithLocale(ROUTES.EVENT_SUMMARY.replace(':id', eventId));
  };

  const { eventName } = getEventFields(event, locale);
  const enrolmentType = event ? getEnrolmentType(event) : null;
  const enrolmentEndDays = event?.pEvent.enrolmentEndDays ?? 0;
  const enrolmentStart = event?.pEvent.enrolmentStart;
  const isVirtual = event?.location?.id === VIRTUAL_EVENT_LOCATION_ID;
  const location = event?.location?.id ?? EnrolmentType.Internal;

  return (
    <PageWrapper title={t('editOccurrencesPage.titleEditOccurrences')}>
      <LoadingSpinner isLoading={loadingEvent} hasPadding={false}>
        <Container>
          <BackButton onClick={goToEventSummaryPage}>
            {t('common.back')}
          </BackButton>
          {eventData?.event ? (
            <div className={styles.editOccurrencesPage}>
              <div className={styles.headerContainer}>
                <h1>{eventName}</h1>
              </div>
              {enrolmentType && (
                <OccurrencesFormPart
                  title={t('editOccurrencesPage.titleEditOccurrences')}
                  createOccurrence={createOccurrence}
                  eventData={eventData}
                  enrolmentEndDays={enrolmentEndDays}
                  enrolmentStart={new Date(enrolmentStart)}
                  enrolmentType={enrolmentType}
                  isVirtual={isVirtual}
                  location={location}
                  disabled={addOccurrenceLoading}
                />
              )}
            </div>
          ) : (
            <ErrorPage />
          )}
        </Container>
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default EditOccurrencesPage;
