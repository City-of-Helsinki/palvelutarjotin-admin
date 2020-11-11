import { NetworkStatus } from 'apollo-client';
import { isPast } from 'date-fns';
import isValidDate from 'date-fns/isValid';
import { FormikHelpers } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

import BackButton from '../../common/components/backButton/BackButton';
import EventSteps from '../../common/components/EventSteps/EventSteps';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  OccurrenceFieldsFragment,
  useAddOccurrenceMutation,
  useDeleteOccurrenceMutation,
  useEventQuery,
  useMyProfileQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import { useSearchParams } from '../../hooks/useQuery';
import getLocalizedString from '../../utils/getLocalizedString';
import scrollToTop from '../../utils/scrollToTop';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import { NAVIGATED_FROM } from '../event/EditEventPage';
import { isEditableEvent } from '../event/utils';
import OccurrencesTable from '../occurrences/occurrencesTable/OccurrencesTable';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { createOrUpdateVenue } from '../venue/utils';
import EventOccurrenceForm, {
  defaultInitialValues,
} from './eventOccurrenceForm/EventOccurrenceForm';
import { isValidTime } from './eventOccurrenceForm/ValidationSchema';
import styles from './occurrencePage.module.scss';
import { OccurrenceFormFields } from './types';
import { getOccurrencePayload } from './utils';

interface Params {
  id: string;
}

const CreateOccurrencePage: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const locale = useLocale();
  const isFirstOccurrence = Boolean(
    useRouteMatch(`/${locale}${ROUTES.CREATE_FIRST_OCCURRENCE}`)
  );
  const initialFormValues = useInitialFormValues(isFirstOccurrence);

  const { id: eventId } = useParams<Params>();

  const {
    data: eventData,
    loading: loadingEvent,
    refetch: refetchEvent,
    networkStatus: eventNetworkStatus,
  } = useEventQuery({
    variables: { id: eventId, include: ['location', 'keywords'] },
    notifyOnNetworkStatusChange: true,
  });

  const eventIsRefetching = eventNetworkStatus === NetworkStatus.refetch;
  const eventIsInitialLoading = !eventIsRefetching && loadingEvent;

  const organisationId = eventData?.event?.pEvent?.organisation?.id || '';
  const occurrences =
    (eventData?.event?.pEvent?.occurrences.edges.map(
      (edge) => edge?.node
    ) as OccurrenceFieldsFragment[]) || [];
  const comingOccurrences = occurrences.filter(
    (item) => !isPast(new Date(item.startTime))
  );

  const { loading: loadingMyProfile } = useMyProfileQuery();

  const [createOccurrence] = useAddOccurrenceMutation();
  const [deleteOccurrence] = useDeleteOccurrenceMutation();

  const goToEventSummary = () => {
    history.push(`/${locale}${ROUTES.EVENT_SUMMARY.replace(':id', eventId)}`);
  };

  const handleGoToPublishing = () => {
    history.push(`/${locale}${ROUTES.EVENT_SUMMARY}`.replace(':id', eventId));
  };

  const goToCreateOccurrencePage = () => {
    history.replace(
      `/${locale}${ROUTES.CREATE_OCCURRENCE}`.replace(':id', eventId)
    );
  };

  const goToEventBasicInfo = () => {
    history.push(
      `/${locale}${ROUTES.EDIT_EVENT}?navigatedFrom=${NAVIGATED_FROM.OCCURRENCES}`.replace(
        ':id',
        eventId
      )
    );
  };

  const getPayload = (values: OccurrenceFormFields) => {
    return getOccurrencePayload({
      values,
      pEventId: eventData?.event?.pEvent?.id || '',
    });
  };

  const runSubmitRequests = async (values: OccurrenceFormFields) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const requests: Promise<any>[] = [];

      requests.push(
        createOccurrence({
          variables: {
            input: getPayload(values),
          },
        })
      );

      const createOrUpdateVenueRequest = createOrUpdateVenue({
        venueFormData: values,
        locationId: values.placeId,
        language: locale,
      });

      if (createOrUpdateVenueRequest) {
        requests.push(createOrUpdateVenueRequest);
      }

      await Promise.all(requests);
    } catch (e) {
      throw e;
    }
  };

  const handleSubmit = async (values: OccurrenceFormFields) => {
    try {
      await runSubmitRequests(values);
      handleGoToPublishing();
    } catch (e) {
      // TODO: Improve error handling when API returns more informative errors
      toast.error(t('createOccurrence.error'));
    }
  };

  const handleSubmitAndAdd = async (
    values: OccurrenceFormFields,
    action: FormikHelpers<OccurrenceFormFields>
  ) => {
    try {
      await runSubmitRequests(values);
      refetchEvent();
      action.resetForm();
      action.setValues({
        ...defaultInitialValues,
        languages: values.languages,
        amountOfSeats: values.amountOfSeats,
        minGroupSize: values.minGroupSize,
        maxGroupSize: values.maxGroupSize,
      });
      scrollToTop();
      if (isFirstOccurrence) {
        goToCreateOccurrencePage();
      }
    } catch (e) {
      // TODO: Improve error handling when API returns more informative errors
      toast(t('createOccurrence.error'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const handleDeleteOccurrence = async (
    occurrence: OccurrenceFieldsFragment
  ) => {
    try {
      await deleteOccurrence({ variables: { input: { id: occurrence.id } } });
      refetchEvent();
    } catch (e) {
      toast(t('occurrences.deleteError'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  return (
    <PageWrapper title="createOccurrence.pageTitle">
      <LoadingSpinner
        isLoading={eventIsInitialLoading || loadingMyProfile}
        hasPadding={false}
      >
        {eventData ? (
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
                  {!!comingOccurrences.length && (
                    <OccurrencesTable
                      eventData={eventData}
                      id="coming-occurrences"
                      occurrences={comingOccurrences}
                      onDelete={handleDeleteOccurrence}
                    />
                  )}
                  <EventOccurrenceForm
                    eventData={eventData}
                    formTitle={t('createOccurrence.formTitle')}
                    initialValues={initialFormValues}
                    onCancel={goToEventSummary}
                    onSubmit={handleSubmit}
                    onSubmitAndAdd={handleSubmitAndAdd}
                    refetchEvent={refetchEvent}
                    showFirstOccurrenceHelperText={isFirstOccurrence}
                    showGoToPublishingButton={occurrences.length > 0}
                    onGoToPublishing={handleGoToPublishing}
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
const useInitialFormValues = (isFirstOccurrence: boolean) => {
  const searcParams = useSearchParams();

  const getInitialFormValues = () => {
    // initial pre-filled values from event wizard step 1
    const initialDate = searcParams.get('date');
    const initialStartsAt = searcParams.get('startsAt');
    const initialEndsAt = searcParams.get('endsAt');

    // if is first occurrence, use pre-filled values from event form (query params)
    if (isFirstOccurrence && initialDate && initialEndsAt && initialStartsAt) {
      const valuesAreValid =
        isValidDate(new Date(initialDate)) &&
        isValidTime(initialStartsAt) &&
        isValidTime(initialEndsAt);
      return valuesAreValid
        ? {
            ...defaultInitialValues,
            date: new Date(initialDate),
            startsAt: initialStartsAt,
            endsAt: initialEndsAt,
          }
        : defaultInitialValues;
    }
    return defaultInitialValues;
  };

  // we don't want the initialValues to update because we don't
  // want form to reset to those on subsequent renders
  return React.useMemo(getInitialFormValues, []);
};

export default CreateOccurrencePage;
