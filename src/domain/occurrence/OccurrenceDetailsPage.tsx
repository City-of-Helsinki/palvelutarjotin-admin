import { Notification } from 'hds-react';
import * as React from 'react';
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
import { useSearchParams } from '../../hooks/useQuery';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { OCCURRENCE_URL_PARAMS } from './constants';
import EnrolmentDetails from './enrolmentDetails/EnrolmentDetails';
import EnrolmentTable from './enrolmentTable/EnrolmentTable';
import OccurrenceInfo from './occurrenceInfo/OccurrenceInfo';
import styles from './occurrencePage.module.scss';

interface Params {
  id: string;
  occurrenceId: string;
  enrolmentId?: string;
}

const OccurrenceDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const locale = useLocale();
  const { id, occurrenceId, enrolmentId } = useParams<Params>();
  const searchParams = useSearchParams();
  const enrolmentUpdated = Boolean(
    searchParams.get(OCCURRENCE_URL_PARAMS.ENROLMENT_UPDATED)
  );
  const { data: eventData, loading: loadingEvent } = useEventQuery({
    variables: { id, include: ['keywords', 'location'] },
  });
  const event = eventData?.event;
  const organisationId = event?.pEvent?.organisation?.id || '';

  const {
    data: occurrenceData,
    loading: loadingOccurrence,
    refetch: refetchOccurrence,
  } = useOccurrenceQuery({
    variables: { id: occurrenceId },
  });
  const occurrence = occurrenceData?.occurrence;

  const goToOccurrenceDetails = () => {
    history.push({
      pathname: `/${locale}${ROUTES.OCCURRENCE_DETAILS.replace(
        ':id',
        id
      ).replace(':occurrenceId', occurrenceId)}`,
    });
  };

  const handleEnrolmentsModified = () => {
    refetchOccurrence();
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
                    label={t('occurrenceDetails.enrolmentDetailsUpdated')}
                    type="success"
                  />
                )}
                <ActiveOrganisationInfo organisationId={organisationId} />

                <BackButton onClick={history.goBack}>
                  {t('occurrenceDetails.buttonBack')}
                </BackButton>

                <OccurrenceInfo event={event} occurrence={occurrence} />

                <div className={styles.divider} />

                {enrolmentId ? (
                  <EnrolmentDetails
                    enrolmentId={enrolmentId}
                    occurrenceId={occurrenceId}
                    eventId={id}
                    onGoBackClick={goToOccurrenceDetails}
                    refetchOccurrence={refetchOccurrence}
                  />
                ) : (
                  <EnrolmentTable
                    enrolments={occurrence.enrolments.edges.map(
                      (e) => e?.node as EnrolmentFieldsFragment
                    )}
                    occurrenceId={occurrenceId}
                    eventId={event.id}
                    id="enrolments-table"
                    seatsTaken={occurrence.seatsTaken || 0}
                    seatsRemaining={occurrence.remainingSeats}
                    onEnrolmentsModified={handleEnrolmentsModified}
                  />
                )}
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
