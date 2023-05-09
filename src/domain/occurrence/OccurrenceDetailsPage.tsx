import { Notification } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router';

import BackButton from '../../common/components/backButton/BackButton';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  EnrolmentFieldsFragment,
  EventQueueEnrolmentFieldsFragment,
  useEventQuery,
  useEventQueueEnrolmentsQuery,
  useOccurrenceQuery,
} from '../../generated/graphql';
import useGoBack from '../../hooks/useGoBack';
import useHistory from '../../hooks/useHistory';
import useLocale from '../../hooks/useLocale';
import { useSearchParams } from '../../hooks/useQuery';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import { getEventFields } from '../event/utils';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { EnrolmentType, OCCURRENCE_URL_PARAMS } from './constants';
import EnrolmentDetails from './enrolmentDetails/EnrolmentDetails';
import EnrolmentQueueTable from './enrolmentTable/EnrolmentQueueTable';
import EnrolmentTable from './enrolmentTable/EnrolmentTable';
import OccurrenceInfo from './occurrenceInfo/OccurrenceInfo';
import styles from './occurrencePage.module.scss';

interface Params {
  id: string;
  eventId: string;
  occurrenceId: string;
  enrolmentId?: string;
}

const OccurrenceDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const locale = useLocale();
  const { search } = useLocation();
  const { id, occurrenceId, enrolmentId } = useParams<Params>();
  const searchParams = useSearchParams();
  const enrolmentUpdated = Boolean(
    searchParams.get(OCCURRENCE_URL_PARAMS.ENROLMENT_UPDATED)
  );
  const { data: eventData, loading: loadingEvent } = useEventQuery({
    variables: { id, include: ['keywords', 'location'] },
  });
  const goBack = useGoBack({
    defaultReturnPath: ROUTES.EVENT_SUMMARY.replace(':id', id),
    pageQueryParams: Object.values(OCCURRENCE_URL_PARAMS),
  });

  const event = eventData?.event;
  const { organisationId, enrolmentType } = getEventFields(event, locale);
  const hasInternalEnrolment = enrolmentType === EnrolmentType.Internal;

  const {
    data: occurrenceData,
    loading: loadingOccurrence,
    refetch: refetchOccurrence,
  } = useOccurrenceQuery({
    variables: { id: occurrenceId },
  });
  const occurrence = occurrenceData?.occurrence;

  const {
    data: queuedEnrolmentsData,
    loading: loadingQueuedEnrolments,
    refetch: refetchQueueEnrolments,
  } = useEventQueueEnrolmentsQuery({
    skip: !event?.pEvent?.id,
    variables: { pEventId: event?.pEvent?.id, orderBy: 'enrolment_time' },
  });
  const queuedEnrolments =
    queuedEnrolmentsData?.eventQueueEnrolments?.edges.map(
      (e) => e?.node as EventQueueEnrolmentFieldsFragment
    ) ?? [];

  const goToOccurrenceDetails = () => {
    history.pushWithLocale({
      pathname: ROUTES.OCCURRENCE_DETAILS.replace(':id', id).replace(
        ':occurrenceId',
        occurrenceId
      ),
      search,
    });
  };

  const handleEnrolmentsModified = async () => {
    await refetchOccurrence();
    await refetchQueueEnrolments();
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

                <BackButton onClick={goBack}>{t('common.back')}</BackButton>

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
                ) : hasInternalEnrolment ? (
                  <>
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
                    <LoadingSpinner isLoading={loadingQueuedEnrolments}>
                      <EnrolmentQueueTable
                        enrolments={queuedEnrolments}
                        occurrenceId={occurrenceId}
                        eventId={event.id}
                        id="enrolments-queued-table"
                        onEnrolmentsModified={handleEnrolmentsModified}
                      />
                    </LoadingSpinner>
                  </>
                ) : null}
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
