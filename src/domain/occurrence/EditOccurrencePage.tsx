import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';

import BackButton from '../../common/components/backButton/BackButton';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  useEditOccurrenceMutation,
  useEventQuery,
  useOccurrenceQuery,
  useVenueQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import formatDate from '../../utils/formatDate';
import getLocalizedString from '../../utils/getLocalizedString';
import scrollToTop from '../../utils/scrollToTop';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { createOrUpdateVenue, getVenueDescription } from '../venue/utils';
import EventOccurrenceForm from './eventOccurrenceForm/EventOccurrenceForm';
import styles from './occurrencePage.module.scss';
import { OccurrenceFormFields } from './types';
import { getOccurrencePayload } from './utils';

interface Params {
  id: string;
  occurrenceId: string;
}

const EditOccurrencePage: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();

  const { id: eventId, occurrenceId } = useParams<Params>();

  const {
    data: eventData,
    loading: loadingEvent,
    refetch: refetchEvent,
  } = useEventQuery({
    variables: { id: eventId, include: ['location'] },
  });

  const organisationId = eventData?.event?.pEvent?.organisation?.id || '';

  const [editOccurrence] = useEditOccurrenceMutation();

  const {
    data: occurrenceData,
    loading: loadingOccurrence,
  } = useOccurrenceQuery({
    variables: { id: occurrenceId },
  });

  const { data: venueData, loading: loadingVenue } = useVenueQuery({
    fetchPolicy: 'network-only',
    skip: !occurrenceData?.occurrence?.placeId,
    variables: { id: occurrenceData?.occurrence?.placeId as string },
  });

  const goToEventDetailsPage = () => {
    history.push(`/${locale}${ROUTES.EVENT_DETAILS.replace(':id', eventId)}`);
  };

  const goToOccurrenceDetailsPage = () => {
    history.push(
      `/${locale}${ROUTES.OCCURRENCE_DETAILS.replace(':id', eventId).replace(
        ':occurrenceId',
        occurrenceId
      )}`
    );
  };

  const goToOccurrencesPage = () => {
    history.push(`/${locale}${ROUTES.OCCURRENCES.replace(':id', eventId)}`);
  };

  const getPayload = (values: OccurrenceFormFields) => {
    return {
      id: occurrenceId,
      ...getOccurrencePayload({
        values,
        pEventId: occurrenceData?.occurrence?.pEvent?.id || '',
      }),
    };
  };

  const runSubmitRequests = async (values: OccurrenceFormFields) => {
    try {
      const requests: Promise<any>[] = [];

      requests.push(
        editOccurrence({
          variables: {
            input: getPayload(values),
          },
        })
      );

      const createOrUpdateVenueRequest = createOrUpdateVenue({
        formValues: values,
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
      toast(t('editOccurrence.error'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const submitAndAdd = async (
    values: OccurrenceFormFields,
    resetForm: () => void
  ) => {
    try {
      await runSubmitRequests(values);
      history.push(
        `/${locale}${ROUTES.CREATE_OCCURRENCE.replace(':id', eventId)}`
      );
      resetForm();
      scrollToTop();
    } catch (e) {
      // TODO: Improve error handling when API returns more informative errors
      toast(t('editOccurrence.error'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const initialValues: OccurrenceFormFields = React.useMemo(
    () => ({
      date: occurrenceData?.occurrence?.startTime
        ? new Date(occurrenceData?.occurrence?.startTime)
        : null,
      startsAt: occurrenceData?.occurrence?.startTime
        ? formatDate(new Date(occurrenceData?.occurrence?.startTime), 'HH:mm')
        : '',
      endsAt: occurrenceData?.occurrence?.endTime
        ? formatDate(new Date(occurrenceData?.occurrence?.endTime), 'HH:mm')
        : '',
      languages:
        occurrenceData?.occurrence?.languages.map((language) =>
          language.id.toUpperCase()
        ) || [],
      placeId: occurrenceData?.occurrence?.placeId || '',
      amountOfSeats: occurrenceData?.occurrence?.amountOfSeats.toString() || '',
      maxGroupSize: occurrenceData?.occurrence?.maxGroupSize.toString() || '',
      minGroupSize: occurrenceData?.occurrence?.minGroupSize.toString() || '',
      autoAcceptance: Boolean(occurrenceData?.occurrence?.autoAcceptance),
      locationDescription: getVenueDescription(venueData, locale),
      hasClothingStorage: venueData?.venue?.hasClothingStorage || false,
      hasSnackEatingPlace: venueData?.venue?.hasSnackEatingPlace || false,
    }),
    [locale, occurrenceData, venueData]
  );

  return (
    <PageWrapper title="editOccurrence.pageTitle">
      <LoadingSpinner
        isLoading={loadingEvent || loadingOccurrence || loadingVenue}
      >
        {eventData && occurrenceData ? (
          <Container>
            <div className={styles.eventOccurrencePage}>
              <ActiveOrganisationInfo organisationId={organisationId} />

              <BackButton onClick={goToOccurrencesPage}>
                {t('editOccurrence.buttonBack')}
              </BackButton>
              <div className={styles.headerContainer}>
                <h1>
                  {getLocalizedString(eventData?.event?.name || {}, locale)}
                </h1>
                <Button variant="secondary" onClick={goToEventDetailsPage}>
                  {t('editOccurrence.buttonShowEventInfo')}
                </Button>
              </div>
              <EventOccurrenceForm
                eventData={eventData}
                formTitle={t('editOccurrence.formTitle')}
                initialValues={initialValues}
                occurrenceId={occurrenceId}
                onCancel={goToOccurrenceDetailsPage}
                onSubmit={submit}
                onSubmitAndAdd={submitAndAdd}
                refetchEvent={refetchEvent}
              />
            </div>
          </Container>
        ) : (
          <ErrorPage />
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default EditOccurrencePage;
