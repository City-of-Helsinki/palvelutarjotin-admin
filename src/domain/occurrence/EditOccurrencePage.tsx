import { isPast } from 'date-fns';
import { FormikHelpers } from 'formik';
import { Button } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';

import BackButton from '../../common/components/backButton/BackButton';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  OccurrenceFieldsFragment,
  OccurrenceSeatType,
  useDeleteOccurrenceMutation,
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
import { isEditableEvent } from '../event/utils';
import OccurrencesTable from '../occurrences/occurrencesTable/OccurrencesTable';
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
    variables: { id: eventId, include: ['keywords', 'location'] },
  });

  const organisationId = eventData?.event?.pEvent?.organisation?.id || '';

  const [editOccurrence] = useEditOccurrenceMutation();
  const [deleteOccurrence] = useDeleteOccurrenceMutation();

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
  const occurrences =
    (eventData?.event?.pEvent?.occurrences.edges.map(
      (edge) => edge?.node
    ) as OccurrenceFieldsFragment[]) || [];
  const comingOccurrences = occurrences.filter(
    (item) => !isPast(new Date(item.startTime))
  );
  const filteredComingOccurrences = occurrenceId
    ? comingOccurrences.filter((item) => item.id !== occurrenceId)
    : comingOccurrences;

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const requests: Promise<any>[] = [];

      requests.push(
        editOccurrence({
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
      toast(t('editOccurrence.error'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const submitAndAdd = async (
    values: OccurrenceFormFields,
    action: FormikHelpers<OccurrenceFormFields>
  ) => {
    try {
      await runSubmitRequests(values);
      history.push(
        `/${locale}${ROUTES.CREATE_OCCURRENCE.replace(':id', eventId)}`
      );
      action.resetForm();
      scrollToTop();
    } catch (e) {
      // TODO: Improve error handling when API returns more informative errors
      toast(t('editOccurrence.error'), {
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
      toast.error(t('occurrences.deleteError'));
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
        occurrenceData?.occurrence?.languages.edges.map(
          (edge) => edge?.node?.id || ''
        ) || [],
      oneGroupFills:
        occurrenceData?.occurrence?.seatType ===
        OccurrenceSeatType.EnrolmentCount,
      placeId: occurrenceData?.occurrence?.placeId || '',
      amountOfSeats: occurrenceData?.occurrence?.amountOfSeats.toString() || '',
      maxGroupSize: occurrenceData?.occurrence?.maxGroupSize?.toString() || '',
      minGroupSize: occurrenceData?.occurrence?.minGroupSize?.toString() || '',
      locationDescription: getVenueDescription(venueData?.venue),
      hasClothingStorage: venueData?.venue?.hasClothingStorage || false,
      hasSnackEatingPlace: venueData?.venue?.hasSnackEatingPlace || false,
      outdoorActivity: venueData?.venue?.outdoorActivity || false,
      hasToiletNearby: venueData?.venue?.hasToiletNearby || false,
      hasAreaForGroupWork: venueData?.venue?.hasAreaForGroupWork || false,
      hasIndoorPlayingArea: venueData?.venue?.hasIndoorPlayingArea || false,
      hasOutdoorPlayingArea: venueData?.venue?.hasOutdoorPlayingArea || false,
    }),
    [occurrenceData, venueData]
  );

  return (
    <PageWrapper title="editOccurrence.pageTitle">
      <LoadingSpinner
        isLoading={loadingEvent || loadingOccurrence || loadingVenue}
      >
        {eventData?.event && occurrenceData ? (
          <>
            {isEditableEvent(eventData) ? (
              <Container>
                <div className={styles.eventOccurrencePage}>
                  <ActiveOrganisationInfo organisationId={organisationId} />

                  <BackButton onClick={history.goBack}>
                    {t('editOccurrence.buttonBack')}
                  </BackButton>
                  <div className={styles.headerContainer}>
                    <h1>
                      {getLocalizedString(eventData.event.name || {}, locale)}
                    </h1>
                    <Button variant="secondary" onClick={goToEventDetailsPage}>
                      {t('editOccurrence.buttonShowEventInfo')}
                    </Button>
                  </div>
                  <EventOccurrenceForm
                    event={eventData.event}
                    formTitle={t('editOccurrence.formTitle')}
                    initialValues={initialValues}
                    occurrenceId={occurrenceId}
                    onCancel={goToOccurrenceDetailsPage}
                    onSubmit={submit}
                    onSubmitAndAdd={submitAndAdd}
                    refetchEvent={refetchEvent}
                  />
                  <h2>
                    {t('occurrences.titleComingOccurrences')}{' '}
                    <span className={styles.count}>
                      {t('occurrences.count', {
                        count: filteredComingOccurrences.length,
                      })}
                    </span>
                  </h2>
                  {filteredComingOccurrences.length ? (
                    <OccurrencesTable
                      eventData={eventData}
                      id="coming-occurrences"
                      occurrences={filteredComingOccurrences}
                      onDelete={handleDeleteOccurrence}
                    />
                  ) : (
                    <div>{t('occurrences.textNoComingOccurrences')}</div>
                  )}
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

export default EditOccurrencePage;
