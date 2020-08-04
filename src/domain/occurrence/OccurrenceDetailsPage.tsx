import { Notification } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';

import BackButton from '../../common/components/backButton/BackButton';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  EnrolmentFieldsFragment,
  useEventQuery,
  useOccurrenceQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import { useQuery } from '../../hooks/useQuery';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { OCCURRENCE_URL_PARAMS } from './constants';
import EnrolmentTable from './enrolmentTable/EnrolmentTable';
import OccurrenceInfo from './occurrenceInfo/OccurrenceInfo';
import styles from './occurrencePage.module.scss';

interface Params {
  id: string;
  occurrenceId: string;
}

const OccurrenceDetailsPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const locale = useLocale();
  const { id, occurrenceId } = useParams<Params>();
  const query = useQuery();
  const enrolmentUpdated = Boolean(
    query.get(OCCURRENCE_URL_PARAMS.ENROLMENT_UPDATED)
  );

  const { data: eventData, loading: loadingEvent } = useEventQuery({
    variables: { id, include: ['location'] },
  });
  const event = eventData?.event;
  const organisationId = event?.pEvent?.organisation?.id || '';

  const {
    data: occurrenceData,
    loading: loadingOccurrence,
  } = useOccurrenceQuery({
    variables: { id: occurrenceId },
  });
  const occurrence = occurrenceData?.occurrence;

  const goToOccurrencesPage = () => {
    history.push(`/${locale}${ROUTES.OCCURRENCES.replace(':id', id)}`);
  };

  return (
    <PageWrapper title="occurrenceDetails.pageTitle">
      <LoadingSpinner isLoading={loadingEvent || loadingOccurrence}>
        {event && occurrence ? (
          <div className={styles.eventOccurrencePage}>
            <Container>
              <div>
                {enrolmentUpdated && (
                  <Notification
                    labelText={t('occurrenceDetails.enrolmentDetailsUpdated')}
                    type="success"
                  />
                )}
                <ActiveOrganisationInfo organisationId={organisationId} />

                <BackButton onClick={goToOccurrencesPage}>
                  {t('occurrenceDetails.buttonBack')}
                </BackButton>

                <OccurrenceInfo event={event} occurrence={occurrence} />

                <div className={styles.divider} />

                <EnrolmentTable
                  enrolments={occurrence.enrolments.edges.map(
                    (e) => e?.node as EnrolmentFieldsFragment
                  )}
                  eventId={event.id}
                  id="enrolments-table"
                  seatsTaken={occurrence.seatsTaken || 0}
                />
              </div>
            </Container>
          </div>
        ) : (
          <ErrorPage />
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default OccurrenceDetailsPage;
