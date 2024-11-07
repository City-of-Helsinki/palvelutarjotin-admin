import { useApolloClient } from '@apollo/client';
import formatDate from 'date-fns/format';
import {
  Form,
  Formik,
  FormikContextType,
  FormikHelpers,
  useFormikContext,
} from 'formik';
import { Button } from 'hds-react';
import compact from 'lodash/compact';
import omit from 'lodash/omit';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import BackButton from '../../common/components/backButton/BackButton';
import EventSteps from '../../common/components/EventSteps/EventSteps';
import FocusToFirstError from '../../common/components/form/FocusToFirstError';
import FormLanguageSelector from '../../common/components/formLanguageSelector/FormLanguageSelector';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import NotificationModal from '../../common/components/modal/NotificationModal';
import {
  EventQuery,
  useAddOccurrenceMutation,
  useEditEventMutation,
  useMyProfileQuery,
  VenueDocument,
  VenueQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import useNavigate from '../../hooks/useNavigate';
import type { EmptyObject, Language } from '../../types';
import { isTestEnv } from '../../utils/envUtils';
import getLocalizedString from '../../utils/getLocalizedString';
import { DATE_FORMAT, TIME_FORMAT } from '../../utils/time/format';
import {
  isValidDateTimeString,
  parseDateTimeString,
} from '../../utils/time/utils';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import {
  BOOKABLE_TO_SCHOOL_LOCATION_ID,
  VIRTUAL_EVENT_LOCATION_ID,
} from '../event/constants';
import {
  EDIT_EVENT_QUERY_PARAMS,
  NAVIGATED_FROM,
} from '../event/EditEventPage';
import { useCreateOrUpdateVenueRequest } from '../event/eventForm/useEventFormSubmitRequests';
import { isEditableEvent } from '../event/utils';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { defaultInitialValues, EnrolmentType } from './constants';
import EnrolmentInfoFormPart from './enrolmentInfoFormPart/EnrolmentInfoFormPart';
import LocationFormPart from './locationFormPart/LocationFormPart';
import styles from './occurrencePage.module.scss';
import { OccurrencesFormHandleContext } from './OccurrencesFormHandleContext';
import OccurrencesFormPart from './occurrencesFormPart/OccurrencesFormPart';
import {
  LocationDescriptions,
  OccurrenceSectionFormFields,
  TimeAndLocationFormFields,
} from './types';
import { getEditEventPayload, useBaseEventQuery } from './utils';
import ValidationSchema from './ValidationSchema';

const OccurrencesFormPartWrapper: React.FC<{
  eventData: EventQuery;
  createOccurrence: ReturnType<typeof useAddOccurrenceMutation>[0];
  disabled: boolean;
  title: string;
}> = (props) => {
  const {
    values: {
      location,
      isVirtual,
      isBookable,
      enrolmentEndDays,
      enrolmentStartDate,
      enrolmentStartTime,
      enrolmentType,
    },
  } = useFormikContext<TimeAndLocationFormFields>();

  const enrolmentStartDateTime = `${enrolmentStartDate} ${enrolmentStartTime}`;

  const formProps = {
    location,
    isVirtual,
    isBookable,
    enrolmentEndDays,
    enrolmentStart: isValidDateTimeString(enrolmentStartDateTime)
      ? parseDateTimeString(enrolmentStartDateTime)
      : null,
    enrolmentType,
  };

  return <OccurrencesFormPart {...props} {...formProps} />;
};

const OccurrenceInfoForm: React.FC<{
  eventData: EventQuery;
  selectedLanguages: Language[];
  initialValues: TimeAndLocationFormFields;
  loadingEvent: boolean;
  editEventLoading: boolean;
  onGoToPublishingClick: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit: (
    values: TimeAndLocationFormFields,
    formikHelpers: FormikHelpers<TimeAndLocationFormFields>
  ) => void | Promise<void>;
}> = ({
  eventData,
  selectedLanguages,
  onSubmit,
  initialValues,
  editEventLoading,
  onGoToPublishingClick,
  loadingEvent,
}) => {
  const { t } = useTranslation();
  const context = React.useRef<
    FormikContextType<OccurrenceSectionFormFields> | EmptyObject
  >({});

  const [createOccurrence, { loading: addOccurrenceLoading }] =
    useAddOccurrenceMutation();

  // Used for disabling form buttons if something is loading
  const loading = loadingEvent || editEventLoading || addOccurrenceLoading;

  const submitOccurrenceFormIfNeeded = async () => {
    if ('submitForm' in context.current) {
      const {
        submitForm: submitOccurrenceForm,
        isValid: occurrenceFormIsValid,
      } = context.current;

      if (occurrenceFormIsValid) {
        await submitOccurrenceForm();
      }
    }
  };

  return (
    <OccurrencesFormHandleContext.Provider value={context}>
      <Formik<TimeAndLocationFormFields>
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={ValidationSchema}
        validateOnMount
      >
        {({ dirty, submitForm, isValid }) => {
          // Handle submitting both event info and occurrence form
          const handleGoToPublishingClick: React.MouseEventHandler<
            HTMLButtonElement
          > = (e) => {
            (async (e) => {
              try {
                const hasBeenSubmitted = isValid && !dirty;
                if (!hasBeenSubmitted) {
                  await submitForm();
                }
                await submitOccurrenceFormIfNeeded();
                if (isValid) {
                  onGoToPublishingClick(e);
                }
              } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Failed to go to publishing page', { error });
              }
            })(e);
          };

          // Custom submit handler to also submit occurrence form if it is filled
          const handleSaveClick: React.MouseEventHandler<HTMLButtonElement> = (
            e
          ) => {
            e.preventDefault();
            (async () => {
              try {
                await submitForm();
                await submitOccurrenceFormIfNeeded();
              } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Failed to save occurrence form', { error });
              }
            })();
          };

          return (
            <Form
              className={styles.occurrencesForm}
              noValidate
              data-testid="time-and-location-form"
            >
              <FocusToFirstError />
              <LocationFormPart selectedLanguages={selectedLanguages} />
              <EnrolmentInfoFormPart />
              <OccurrencesFormPartWrapper
                eventData={eventData}
                createOccurrence={createOccurrence}
                disabled={loading}
                title={t('eventForm.occurrences.occurrencesFormSectionTitle')}
              />
              <div className={styles.submitButtons}>
                <Button
                  disabled={loading || !dirty}
                  type="submit"
                  onClick={handleSaveClick}
                >
                  {t('eventForm.buttonSave')}
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  disabled={loading}
                  onClick={handleGoToPublishingClick}
                >
                  {t('createOccurrence.buttonGoToPublishing')}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </OccurrencesFormHandleContext.Provider>
  );
};

type Params = {
  id: string;
};

const CreateOccurrencePage: React.FC = () => {
  const { pushWithLocale } = useNavigate();
  const { t } = useTranslation();
  const locale = useLocale();
  const apolloClient = useApolloClient();
  const [missingEventInfoError, setMissingEventInfoError] =
    React.useState<Yup.ValidationError | null>(null);
  const [selectedLanguages, setSelectedLanguages] = React.useState<Language[]>([
    'fi',
  ]);
  const { id: eventId } = useParams<Params>();
  const [initialValues, setInitialValues] =
    React.useState<TimeAndLocationFormFields | null>(null);
  const eventDataRef = React.useRef<EventQuery>();

  const createOrUpdateVenue = useCreateOrUpdateVenueRequest(apolloClient);

  const [editEvent, { loading: editEventLoading }] = useEditEventMutation();

  const { loading: loadingMyProfile } = useMyProfileQuery();
  const {
    data: eventData,
    refetch: refetchEvent,
    loading: loadingEvent,
  } = useBaseEventQuery({
    skip: !eventId,
    variables: { id: eventId! },
    fetchPolicy: 'network-only',
  });

  // Get access to latest eventData in handleGoToPublishingClick when it is called
  // from child component
  eventDataRef.current = eventData;

  const organisationId = eventData?.event?.pEvent?.organisation?.id || '';

  React.useEffect(() => {
    const initializeForm = async () => {
      if (eventData?.event) {
        const event = eventData.event;
        let data;
        if (event.location?.id) {
          try {
            ({ data } = await apolloClient.query<VenueQuery>({
              query: VenueDocument,
              variables: {
                id: event.location?.id,
              },
            }));
          } catch (e) {
            if (isTestEnv()) {
              // eslint-disable-next-line no-console
              console.log(e);
            }
          }
        }

        const venueData = data?.venue;
        const isVirtualEvent = event.location?.id === VIRTUAL_EVENT_LOCATION_ID;
        const isBookable =
          event.location?.id === BOOKABLE_TO_SCHOOL_LOCATION_ID;
        const isLocationEditable = isVirtualEvent || isBookable;
        const eventName = omit(event.name, '__typename');
        const eventLangs = Object.entries(eventName).reduce<string[]>(
          (prev, [lang, value]) => (value ? [...prev, lang] : prev),
          []
        );

        const getEnrolmentType = (): EnrolmentType => {
          if (event.pEvent.externalEnrolmentUrl) {
            return EnrolmentType.External;
          }
          if (event.pEvent.enrolmentStart) {
            return EnrolmentType.Internal;
          }
          if (event.location) {
            return EnrolmentType.Unenrollable;
          }
          return EnrolmentType.Internal;
        };

        const enrolmentType = getEnrolmentType();

        setSelectedLanguages(eventLangs as Language[]);
        setInitialValues({
          ...defaultInitialValues,
          enrolmentType,
          externalEnrolmentUrl: event.pEvent.externalEnrolmentUrl ?? '',
          // If enrolment start time is not defined yet, then user hasn't filled this form yet
          // and initial value can be set to true as default
          autoAcceptance: event.pEvent.autoAcceptance
            ? event.pEvent.autoAcceptance
            : false,
          autoAcceptanceMessage: event.pEvent.autoAcceptanceMessage ?? null,
          enrolmentEndDays: event.pEvent.enrolmentEndDays ?? '',
          enrolmentStartDate: event.pEvent.enrolmentStart
            ? formatDate(new Date(event.pEvent.enrolmentStart), DATE_FORMAT)
            : '',
          enrolmentStartTime: event.pEvent.enrolmentStart
            ? formatDate(new Date(event.pEvent.enrolmentStart), TIME_FORMAT)
            : '',
          isVirtual: isVirtualEvent,
          isBookable,
          neededOccurrences: event.pEvent.neededOccurrences || '1',
          location: isLocationEditable ? '' : event.location?.id || '',
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

    // hack to prevent reinitializing form with old values after mutation
    if (eventData) {
      initializeForm();
    }
  }, [apolloClient, eventData, setSelectedLanguages]);

  const goToEventBasicInfo = () => {
    const searchParams = new URLSearchParams();
    searchParams.append(
      EDIT_EVENT_QUERY_PARAMS.NAVIGATED_FROM,
      NAVIGATED_FROM.OCCURRENCES
    );
    if (eventId) {
      pushWithLocale(
        `${ROUTES.EDIT_EVENT}?${searchParams.toString()}`.replace(
          ':id',
          eventId
        )
      );
    }
  };

  const goToSummaryPage = () => {
    if (eventId) {
      pushWithLocale(ROUTES.EVENT_SUMMARY.replace(':id', eventId));
    }
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
            // Do not modify cache because not all fields we would want can be returned from api
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
        toast.success(t('eventForm.saveSuccesful'));
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
      return Promise.reject(e);
    }
  };

  const handleGoToPublishingClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    // after saving, event data is refetched and it should include at least 1 ocurrences
    const { pEvent: { occurrences = undefined } = {} } =
      eventDataRef.current?.event ?? {};
    const requiredFieldsSchema = Yup.object().shape({
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
          occurrences: occurrences?.edges,
        },
        { abortEarly: false }
      );
      // All good, redirect user to summary page for publishing
      goToSummaryPage();
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        setMissingEventInfoError(e);
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      }
    }
  };

  return (
    <PageWrapper title="createOccurrence.pageTitle">
      <LoadingSpinner
        isLoading={loadingEvent || loadingMyProfile || !initialValues}
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
                  {initialValues && (
                    <OccurrenceInfoForm
                      initialValues={initialValues}
                      eventData={eventData}
                      selectedLanguages={selectedLanguages ?? []}
                      onSubmit={handleSaveEventInfo}
                      editEventLoading={editEventLoading}
                      loadingEvent={loadingEvent}
                      onGoToPublishingClick={handleGoToPublishingClick}
                    />
                  )}
                </div>
                <NotificationModal
                  isOpen={!!missingEventInfoError}
                  title={t('createOccurrence.missingEventInfo.modalTitle')}
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

export default CreateOccurrencePage;
