import { NetworkStatus } from 'apollo-client';
import { isPast } from 'date-fns';
import isValidDate from 'date-fns/isValid';
import { FormikHelpers } from 'formik';
import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
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
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const initialFormValues = useInitialFormValues();

  const { id: eventId } = useParams<Params>();

  const {
    data: eventData,
    loading: loadingEvent,
    refetch: refetchEvent,
    networkStatus: eventNetworkStatus,
  } = useEventQuery({
    variables: { id: eventId, include: ['location'] },
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

  const {
    data: myProfileData,
    loading: loadingMyProfile,
  } = useMyProfileQuery();

  const [createOccurrence] = useAddOccurrenceMutation();
  const [deleteOccurrence] = useDeleteOccurrenceMutation();

  const goToEventDetailsPage = () => {
    history.push(`/${locale}${ROUTES.EVENT_DETAILS.replace(':id', eventId)}`);
  };

  const goToOccurrencesPage = () => {
    history.push(`/${locale}${ROUTES.OCCURRENCES.replace(':id', eventId)}`);
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

  const submit = async (values: OccurrenceFormFields) => {
    try {
      await runSubmitRequests(values);
      history.push(`/${locale}${ROUTES.OCCURRENCES.replace(':id', eventId)}`);
    } catch (e) {
      // TODO: Improve error handling when API returns more informative errors
      toast.error(t('createOccurrence.error'));
    }
  };

  const submitAndAdd = async (
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
        {myProfileData ? (
          <>
            {eventData ? (
              <Container>
                <div className={styles.eventOccurrencePage}>
                  <ActiveOrganisationInfo organisationId={organisationId} />
                  <BackButton onClick={goToOccurrencesPage}>
                    {t('createOccurrence.buttonBack')}
                  </BackButton>
                  <div className={styles.headerContainer}>
                    <h1>
                      {getLocalizedString(eventData?.event?.name || {}, locale)}
                    </h1>
                    <Button variant="secondary" onClick={goToEventDetailsPage}>
                      {t('createOccurrence.buttonShowEventInfo')}
                    </Button>
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
                    onCancel={goToOccurrencesPage}
                    onSubmit={submit}
                    onSubmitAndAdd={submitAndAdd}
                    refetchEvent={refetchEvent}
                    showFirstOccurrenceHelperText={occurrences.length === 0}
                  />
                </div>
              </Container>
            ) : (
              <ErrorPage />
            )}
          </>
        ) : (
          <div>TODO: MY PROFILE IS MISSING</div>
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

const useInitialFormValues = () => {
  const searcParams = useSearchParams();

  // initial pre-filled values from event wizard step 1
  const initialDate = searcParams.get('date');
  const initialStartsAt = searcParams.get('startsAt');
  const initialEndsAt = searcParams.get('endsAt');

  const initialFormValues = React.useMemo(() => {
    if (initialDate && initialEndsAt && initialStartsAt) {
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
  }, [initialDate, initialEndsAt, initialStartsAt]);

  return initialFormValues;
};

export default CreateOccurrencePage;
