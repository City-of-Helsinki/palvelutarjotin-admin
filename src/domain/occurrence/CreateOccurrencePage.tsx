import { useApolloClient } from '@apollo/react-hooks';
import { NetworkStatus } from 'apollo-client';
import { Form, Formik, FormikHelpers } from 'formik';
import { Button } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

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
import { isEditableEvent } from '../event/utils';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { createOrUpdateVenue } from '../venue/utils';
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
  const [selectedLanguages, setSelectedLanguages] = React.useState<Language[]>([
    'fi',
  ]);
  const { id: eventId } = useParams<Params>();
  const [initialValues, setInitialValues] = React.useState(
    defaultInitialValues
  );

  const [editEvent, { loading: editEventLoading }] = useEditEventMutation();

  const {
    data: eventData,
    loading: loadingEvent,
    networkStatus: eventNetworkStatus,
  } = useBaseEventQuery({
    variables: { id: eventId },
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
            id: event.location.id,
          },
        });
        const venueData = data.venue;

        setInitialValues({
          ...defaultInitialValues,
          autoAcceptance: event.pEvent.autoAcceptance,
          enrolmentEndDays: event.pEvent.enrolmentEndDays?.toString() ?? '',
          enrolmentStart: new Date(event.pEvent.enrolmentStart),
          isVirtual: event.location.id === VIRTUAL_EVENT_LOCATION_ID,
          neededOccurrences: event.pEvent.neededOccurrences.toString() ?? '',
          location: event.location.id ?? '',
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

  const handleSelectedLanguagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setSelectedLanguages([...selectedLanguages, e.target.value as Language]);
    } else {
      setSelectedLanguages(
        selectedLanguages.filter((lang) => e.target.value !== lang)
      );
    }
  };

  const handleSaveEventInfo = async (
    values: TimeAndLocationFormFields
    // formikHelpers: FormikHelpers<TimeAndLocationFormFields>
  ) => {
    try {
      const requests: Promise<any>[] = [];

      // Request to create new event
      requests.push(
        editEvent({
          variables: {
            event: {
              id: eventData?.event?.id || '',
              ...getEditEventPayload({
                event: eventData?.event!,
                formValues: values,
              }),
            },
          },
        })
      );

      const createOrUpdateVenueRequest = createOrUpdateVenue({
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
      });

      if (createOrUpdateVenueRequest) {
        requests.push(createOrUpdateVenueRequest);
      }

      await Promise.all(requests);
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
                      selectedLanguages={selectedLanguages}
                      onLanguageClick={handleSelectedLanguagesChange}
                    />
                  </div>
                  <OccurrenceInfoForm
                    initialValues={initialValues}
                    pEventId={eventData.event.pEvent.id}
                    eventId={eventId}
                    selectedLanguages={selectedLanguages}
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
      <Form className={styles.occurrencesForm} noValidate>
        <FocusToFirstError />
        <LocationFormPart selectedLanguages={selectedLanguages} />
        <EnrolmentInfoFormPart />
        <OccurrencesFormPart pEventId={pEventId} eventId={eventId} />
        <div className={styles.submitButtons}>
          <Button disabled={editEventLoading} type="submit">
            {t('eventForm.buttonSave')}
          </Button>
          <Button variant="secondary" type="button">
            {t('createOccurrence.buttonGoToPublishing')}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateOccurrencePage;
