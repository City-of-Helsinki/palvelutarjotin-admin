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

import BackButton from '../../common/components/backButton/BackButton';
import EventSteps from '../../common/components/EventSteps/EventSteps';
import FocusToFirstError from '../../common/components/form/FocusToFirstError';
import FormLanguageSelector from '../../common/components/formLanguageSelector/FormLanguageSelector';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  useEditEventMutation,
  useMyProfileQuery,
  VenueDocument,
  VenueQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import { Language } from '../../types';
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
          // TODO: dirty prop not working correctly when all fields are not initialized here (empty descriptions)
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
      const requests: Promise<any>[] = compact([
        editEvent({
          // with fetchPolicy="no-cache" cache is not updated with the result and in turn eventData is
          // not updated and therefore form not reseted
          fetchPolicy: 'no-cache',
          variables: {
            event: {
              id: eventData?.event?.id || '',
              ...getEditEventPayload({
                event: eventData?.event!,
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
      toast(t('eventForm.saveSuccesful'), {
        type: toast.TYPE.SUCCESS,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      toast(t('createOccurrence.error'), {
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
}> = ({
  pEventId,
  eventId,
  selectedLanguages,
  onSubmit,
  initialValues,
  editEventLoading,
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
            {/* TODO: handle this button */}
            <Button variant="secondary" type="button">
              {t('createOccurrence.buttonGoToPublishing')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateOccurrencePage;
