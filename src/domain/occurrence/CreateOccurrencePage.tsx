import { useApolloClient } from '@apollo/react-hooks';
import { NetworkStatus } from 'apollo-client';
import { Form, Formik, FormikHelpers } from 'formik';
import { Button } from 'hds-react';
import compact from 'lodash/compact';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useLocalStorage from 'react-use/esm/useLocalStorage';
import * as Yup from 'yup';

import BackButton from '../../common/components/backButton/BackButton';
import EventSteps from '../../common/components/EventSteps/EventSteps';
import FocusToFirstError from '../../common/components/form/FocusToFirstError';
import FormLanguageSelector from '../../common/components/formLanguageSelector/FormLanguageSelector';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import NotificationModal from '../../common/components/modal/NotificationModal';
import {
  useEditEventMutation,
  useMyProfileQuery,
  VenueDocument,
  VenueQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import { Language } from '../../types';
import { isTestEnv } from '../../utils/envUtils';
import getLocalizedString from '../../utils/getLocalizedString';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import { VIRTUAL_EVENT_LOCATION_ID } from '../event/constants';
import { NAVIGATED_FROM } from '../event/EditEventPage';
import { useCreateOrUpdateVenueRequest } from '../event/eventForm/useEventFormSubmitRequests';
import { isEditableEvent } from '../event/utils';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { defaultInitialValues } from './constants';
import EnrolmentInfoFormPart from './enrolmentInfoFormPart/EnrolmentInfoFormPart';
import LocationFormPart from './locationFormPart/LocationFormPart';
import styles from './occurrencePage.module.scss';
import OccurrencesFormPart from './occurrencesFormPart/OccurrencesFormPart';
import { LocationDescriptions, TimeAndLocationFormFields } from './types';
import { getEditEventPayload, useBaseEventQuery } from './utils';
import ValidationSchema from './ValidationSchema';

interface Params {
  id: string;
}

const CreateOccurrencePage: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const locale = useLocale();
  const apolloClient = useApolloClient();
  const [
    missingEventInfoError,
    setMissingEventInfoError,
  ] = React.useState<Yup.ValidationError | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useLocalStorage<Language[]>(
    'formLanguages',
    ['fi']
  );
  const { id: eventId } = useParams<Params>();
  const [initialValues, setInitialValues] = React.useState(
    defaultInitialValues
  );

  const createOrUpdateVenue = useCreateOrUpdateVenueRequest();

  const [editEvent, { loading: editEventLoading }] = useEditEventMutation();

  const {
    data: eventData,
    refetch: refetchEvent,
    loading: loadingEvent,
    networkStatus: eventNetworkStatus,
  } = useBaseEventQuery({
    variables: { id: eventId },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  const eventIsRefetching = eventNetworkStatus === NetworkStatus.refetch;
  const eventIsInitialLoading = !eventIsRefetching && loadingEvent;

  const organisationId = eventData?.event?.pEvent?.organisation?.id || '';
  const { loading: loadingMyProfile } = useMyProfileQuery();

  React.useEffect(() => {
    const initializeForm = async () => {
      if (eventData?.event) {
        const event = eventData.event;

        const { data } = await apolloClient.query<VenueQuery>({
          query: VenueDocument,
          variables: {
            id: event.location?.id,
          },
        });
        const venueData = data.venue;
        const isVirtualEvent = event.location?.id === VIRTUAL_EVENT_LOCATION_ID;
        setInitialValues({
          ...defaultInitialValues,
          // If enrolment start time is not defined yet, then user hasn't filled this form yet
          // and initial value can be set to true as default
          autoAcceptance: event.pEvent.enrolmentStart
            ? event.pEvent.autoAcceptance
            : true,
          enrolmentEndDays: event.pEvent.enrolmentEndDays ?? '',
          enrolmentStart: event.pEvent.enrolmentStart
            ? new Date(event.pEvent.enrolmentStart)
            : null,
          isVirtual: isVirtualEvent,
          neededOccurrences: event.pEvent.neededOccurrences ?? '',
          location: isVirtualEvent ? '' : event.location?.id || '',
          hasAreaForGroupWork: venueData?.hasAreaForGroupWork ?? false,
          hasClothingStorage: venueData?.hasClothingStorage ?? false,
          hasIndoorPlayingArea: venueData?.hasIndoorPlayingArea ?? false,
          hasSnackEatingPlace: venueData?.hasSnackEatingPlace ?? false,
          hasOutdoorPlayingArea: venueData?.hasOutdoorPlayingArea ?? false,
          hasToiletNearby: venueData?.hasToiletNearby ?? false,
          outdoorActivity: venueData?.outdoorActivity ?? false,
          locationDescription: venueData?.translations
            ? Object.values(venueData?.translations).reduce(
                (acc, { description, languageCode }) => {
                  return {
                    ...acc,
                    [languageCode.toLowerCase()]: description,
                  };
                },
                {} as LocationDescriptions
              )
            : ({} as LocationDescriptions),
        });
      }
    };
    initializeForm();
  }, [apolloClient, eventData]);

  const goToEventBasicInfo = () => {
    history.push(
      `/${locale}${ROUTES.EDIT_EVENT}?navigatedFrom=${NAVIGATED_FROM.OCCURRENCES}`.replace(
        ':id',
        eventId
      )
    );
  };

  const goToSummaryPage = () => {
    history.push(`/${locale}${ROUTES.EVENT_SUMMARY}`.replace(':id', eventId));
  };

  const handleSelectedLanguagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setSelectedLanguages([
        ...(selectedLanguages ?? []),
        e.target.value as Language,
      ]);
    } else {
      setSelectedLanguages(
        (selectedLanguages ?? []).filter((lang) => e.target.value !== lang)
      );
    }
  };

  const handleSaveEventInfo = async (
    values: TimeAndLocationFormFields,
    formikHelpers: FormikHelpers<TimeAndLocationFormFields>
  ) => {
    try {
      if (eventData?.event) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const requests: Promise<any>[] = compact([
          editEvent({
            // with fetchPolicy="no-cache" cache is not updated with the result and in turn eventData is
            // not updated and initialValues are not updated therefore form not reseted
            fetchPolicy: 'no-cache',
            variables: {
              event: {
                id: eventData?.event?.id || '',
                ...getEditEventPayload({
                  event: eventData?.event,
                  formValues: values,
                }),
              },
            },
          }),
          values.location
            ? createOrUpdateVenue({
                venueFormData: {
                  locationDescription: values.locationDescription,
                  hasAreaForGroupWork: values.hasAreaForGroupWork,
                  hasClothingStorage: values.hasClothingStorage,
                  hasIndoorPlayingArea: values.hasIndoorPlayingArea,
                  hasOutdoorPlayingArea: values.hasOutdoorPlayingArea,
                  hasSnackEatingPlace: values.hasSnackEatingPlace,
                  hasToiletNearby: values.hasToiletNearby,
                  outdoorActivity: values.outdoorActivity,
                },
                locationId: values.location,
              })
            : null,
        ]);

        await Promise.all(requests);
        formikHelpers.resetForm({ values });
        refetchEvent();
        toast(t('eventForm.saveSuccesful'), {
          type: toast.TYPE.SUCCESS,
        });
      } else {
        throw new Error("Can't submit because event wasn't defined");
      }
    } catch (e) {
      if (isTestEnv()) {
        // eslint-disable-next-line no-console
        console.log(e);
      }

      toast(t('createOccurrence.error'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const handleGoToPublishingClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    const {
      location,
      pEvent: {
        neededOccurrences = undefined,
        occurrences = undefined,
        enrolmentEndDays = undefined,
        enrolmentStart = undefined,
      } = {},
    } = eventData?.event ?? {};

    const requiredFieldsSchema = Yup.object().shape({
      location: Yup.string().required(
        t('createOccurrence.missingEventInfo.eventLocation')
      ),
      enrolmentStart: Yup.date()
        .typeError(t('createOccurrence.missingEventInfo.enrolmentStartTime'))
        .required(t('createOccurrence.missingEventInfo.enrolmentStartTime')),
      enrolmentEndDays: Yup.number()
        .typeError(t('createOccurrence.missingEventInfo.enrolmentEndDays'))
        .required(t('createOccurrence.missingEventInfo.enrolmentEndDays')),
      neededOccurrences: Yup.number()
        .typeError(t('createOccurrence.missingEventInfo.enrolmentEndDays'))
        .required(t('createOccurrence.missingEventInfo.enrolmentEndDays')),
      occurrences: Yup.array().min(
        1,
        t('createOccurrence.missingEventInfo.occurrences')
      ),
    });

    try {
      // Check that that user has already filled and saved required fields in this form before
      // navigatin to publishing / summary page
      requiredFieldsSchema.validateSync(
        {
          location: location?.id,
          enrolmentStart,
          enrolmentEndDays,
          neededOccurrences,
          occurrences: occurrences?.edges,
        },
        { abortEarly: false }
      );
      // All good, redirect user to summary page for publishing
      goToSummaryPage();
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        setMissingEventInfoError(e);
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      }
    }
  };

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
                    <div>
                      <h1>
                        {getLocalizedString(
                          eventData?.event?.name || {},
                          locale
                        )}
                      </h1>
                      <div className={styles.stepsContainer}>
                        <EventSteps step={2} />
                      </div>
                    </div>
                    <FormLanguageSelector
                      selectedLanguages={selectedLanguages ?? []}
                      onLanguageClick={handleSelectedLanguagesChange}
                    />
                  </div>
                  <OccurrenceInfoForm
                    initialValues={initialValues}
                    pEventId={eventData.event.pEvent.id}
                    eventId={eventId}
                    selectedLanguages={selectedLanguages ?? []}
                    onSubmit={handleSaveEventInfo}
                    editEventLoading={editEventLoading}
                    onGoToPublishingClick={handleGoToPublishingClick}
                  />
                </div>
                <NotificationModal
                  isOpen={!!missingEventInfoError}
                  title={t('createOccurrence.missingEventInfo.modalTitle')}
                  confirmButtonText={t('common.notificationModal.buttonClose')}
                  toggleModal={() => setMissingEventInfoError(null)}
                  onConfirm={() => setMissingEventInfoError(null)}
                >
                  <p>
                    {t('createOccurrence.missingEventInfo.missingInfoTitle')}
                  </p>
                  <ul>
                    {missingEventInfoError?.errors.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                </NotificationModal>
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

const OccurrenceInfoForm: React.FC<{
  pEventId: string;
  eventId: string;
  selectedLanguages: Language[];
  initialValues: TimeAndLocationFormFields;
  onSubmit: (
    values: TimeAndLocationFormFields,
    formikHelpers: FormikHelpers<TimeAndLocationFormFields>
  ) => void | Promise<void>;
  editEventLoading: boolean;
  onGoToPublishingClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({
  pEventId,
  eventId,
  selectedLanguages,
  onSubmit,
  initialValues,
  editEventLoading,
  onGoToPublishingClick,
}) => {
  const { t } = useTranslation();

  return (
    <Formik<TimeAndLocationFormFields>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={ValidationSchema}
    >
      {({ dirty }) => (
        <Form className={styles.occurrencesForm} noValidate>
          <FocusToFirstError />
          <LocationFormPart selectedLanguages={selectedLanguages} />
          <EnrolmentInfoFormPart />
          <OccurrencesFormPart pEventId={pEventId} eventId={eventId} />
          <div className={styles.submitButtons}>
            <Button disabled={editEventLoading || !dirty} type="submit">
              {t('eventForm.buttonSave')}
            </Button>
            <Button
              variant="secondary"
              type="button"
              disabled={editEventLoading}
              onClick={onGoToPublishingClick}
            >
              {t('createOccurrence.buttonGoToPublishing')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateOccurrencePage;
