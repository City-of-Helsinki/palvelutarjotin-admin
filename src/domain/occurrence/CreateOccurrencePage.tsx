import { NetworkStatus } from 'apollo-client';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import BackButton from '../../common/components/backButton/BackButton';
import EventSteps from '../../common/components/EventSteps/EventSteps';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import { useMyProfileQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import getLocalizedString from '../../utils/getLocalizedString';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import { NAVIGATED_FROM } from '../event/EditEventPage';
import { isEditableEvent } from '../event/utils';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import styles from './occurrencePage.module.scss';
import OccurrencesFormPart from './occurrencesFormPart/OccurrencesFormPart';
import { useBaseEventQuery } from './utils';

interface Params {
  id: string;
}

const CreateOccurrencePage: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const locale = useLocale();
  //  const isFirstOccurrence = Boolean(
  //   useRouteMatch(`/${locale}${ROUTES.CREATE_FIRST_OCCURRENCE}`)
  // );

  const { id: eventId } = useParams<Params>();

  const {
    data: eventData,
    loading: loadingEvent,
    // refetch: refetchEvent,
    networkStatus: eventNetworkStatus,
  } = useBaseEventQuery({
    variables: { id: eventId },
    notifyOnNetworkStatusChange: true,
  });

  const eventIsRefetching = eventNetworkStatus === NetworkStatus.refetch;
  const eventIsInitialLoading = !eventIsRefetching && loadingEvent;

  const organisationId = eventData?.event?.pEvent?.organisation?.id || '';
  // const occurrences =
  //   (eventData?.event?.pEvent?.occurrences.edges.map(
  //     (edge) => edge?.node
  //   ) as OccurrenceFieldsFragment[]) || [];

  //   const comingOccurrences = occurrences.filter(
  //   (item) => !isPast(new Date(item.startTime))
  // );

  // const initialFormValues = useInitialFormValues(isFirstOccurrence);
  const { loading: loadingMyProfile } = useMyProfileQuery();

  // const [deleteOccurrence] = useDeleteOccurrenceMutation();

  // const goToEventSummary = () => {
  //   history.push(`/${locale}${ROUTES.EVENT_SUMMARY.replace(':id', eventId)}`);
  // };

  // const handleGoToPublishing = () => {
  //   history.push(`/${locale}${ROUTES.EVENT_SUMMARY}`.replace(':id', eventId));
  // };

  // const goToCreateOccurrencePage = () => {
  //   history.replace(
  //     `/${locale}${ROUTES.CREATE_OCCURRENCE}`.replace(':id', eventId)
  //   );
  // };

  const goToEventBasicInfo = () => {
    history.push(
      `/${locale}${ROUTES.EDIT_EVENT}?navigatedFrom=${NAVIGATED_FROM.OCCURRENCES}`.replace(
        ':id',
        eventId
      )
    );
  };

  // const handleDeleteOccurrence = async (
  //   occurrence: OccurrenceFieldsFragment
  // ) => {
  //   try {
  //     await deleteOccurrence({ variables: { input: { id: occurrence.id } } });
  //     refetchEvent();
  //   } catch (e) {
  //     toast(t('occurrences.deleteError'), {
  //       type: toast.TYPE.ERROR,
  //     });
  //   }
  // };

  return (
    <PageWrapper title="createOccurrence.pageTitle">
      <LoadingSpinner
        isLoading={eventIsInitialLoading || loadingMyProfile}
        hasPadding={false}
      >
        {eventData?.event ? (
          <>
            {isEditableEvent(eventData) ? (
              <Container>
                <div className={styles.eventOccurrencePage}>
                  <ActiveOrganisationInfo organisationId={organisationId} />
                  <BackButton onClick={goToEventBasicInfo}>
                    {t('createOccurrence.buttonBack')}
                  </BackButton>
                  <div className={styles.headerContainer}>
                    <h1>
                      {getLocalizedString(eventData?.event?.name || {}, locale)}
                    </h1>
                  </div>
                  <div className={styles.stepsContainer}>
                    <EventSteps step={2} />
                  </div>
                  {/* {!!comingOccurrences.length && (
                    <OccurrencesTable
                      eventData={eventData}
                      id="coming-occurrences"
                      occurrences={comingOccurrences}
                      onDelete={handleDeleteOccurrence}
                    />
                  )} */}
                  {/* <EventOccurrenceForm
                    event={eventData.event}
                    formTitle={t('createOccurrence.formTitle')}
                    initialValues={initialFormValues}
                    onCancel={goToEventSummary}
                    onSubmit={handleSubmit}
                    onSubmitAndAdd={handleSubmitAndAdd}
                    refetchEvent={refetchEvent}
                    showFirstOccurrenceHelperText={isFirstOccurrence}
                    showGoToPublishingButton={occurrences.length > 0}
                    onGoToPublishing={handleGoToPublishing}
                  /> */}
                  <OccurrencesFormPart
                    pEventId={eventData.event.pEvent.id}
                    eventId={eventId}
                  />
                </div>
              </Container>
            ) : (
              <ErrorPage
                title={t('editEvent.errorEventIsPublished')}
                description={t('editEvent.errorEventIsPublishedDescription')}
              />
            )}
          </>
        ) : (
          <ErrorPage />
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

// TODO: maybe could just provide enableReinitialize props form parent component
// to simplify this. We might not need reinitialization here.
// const useInitialFormValues = (isFirstOccurrence: boolean) => {
//   const searcParams = useSearchParams();

//   const getInitialFormValues = () => {
//     // initial pre-filled values from event wizard step 1
//     const initialDate = searcParams.get('date');
//     const initialStartsAt = searcParams.get('startsAt');
//     const initialEndsAt = searcParams.get('endsAt');

//     // if is first occurrence, use pre-filled values from event form (query params)
//     if (isFirstOccurrence && initialDate && initialEndsAt && initialStartsAt) {
//       if (
//         isValidDate(new Date(initialDate)) &&
//         isValidTime(initialStartsAt) &&
//         isValidTime(initialEndsAt)
//       ) {
//         return {
//           ...defaultInitialValues,
//           date: new Date(initialDate),
//           startsAt: initialStartsAt,
//           endsAt: initialEndsAt,
//         };
//       }
//     }
//     return defaultInitialValues;
//   };

//   // we don't want the initialValues to update because we don't
//   // want form to reset to those on subsequent renders
//   return React.useMemo(getInitialFormValues, []);
// };

export default CreateOccurrencePage;
