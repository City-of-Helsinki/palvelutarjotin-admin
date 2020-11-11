import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  PersonFieldsFragment,
  useEditEventMutation,
  useEventQuery,
  useUpdateSingleImageMutation,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import { useSearchParams } from '../../hooks/useQuery';
import { Language } from '../../types';
import { isTestEnv } from '../../utils/envUtils';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import { PUBLICATION_STATUS } from '../events/constants';
import { getImageName } from '../image/utils';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { createOrUpdateVenue } from '../venue/utils';
import EventForm, { defaultInitialValues } from './eventForm/EventForm';
import styles from './eventPage.module.scss';
import { EventFormFields } from './types';
import {
  getEventLanguageFromUrl,
  getEventPayload,
  getEventVenueDescription,
  getFirstAvailableLanguage,
  getRealKeywords,
  isEditableEvent,
} from './utils';

export enum NAVIGATED_FROM {
  OCCURRENCES = 'occurrences',
  EVENT_SUMMARY = 'eventSummary',
}

const EditEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const language = getEventLanguageFromUrl(location.search);
  const navigatedFrom = useSearchParams().get('navigationFrom');
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    language || locale
  );

  const [initialValues, setInitialValues] = React.useState<EventFormFields>(
    defaultInitialValues
  );

  const { data: eventData, loading } = useEventQuery({
    fetchPolicy: 'network-only',
    variables: {
      id,
      include: ['audience', 'in_language', 'keywords', 'location'],
    },
  });

  const organisationId = eventData?.event?.pEvent?.organisation?.id || '';
  const persons =
    eventData?.event?.pEvent?.organisation?.persons.edges.map(
      (edge) => edge?.node as PersonFieldsFragment
    ) || [];

  const [editEvent] = useEditEventMutation();
  const [updateImage] = useUpdateSingleImageMutation();

  const goToEventDetailsPage = () => {
    history.push(`/${locale}${ROUTES.EVENT_DETAILS.replace(':id', id)}`);
  };

  const goToOccurrencesPage = () => {
    history.push(`/${locale}${ROUTES.CREATE_OCCURRENCE.replace(':id', id)}`);
  };

  const goToEventSummary = () => {
    history.push(`/${locale}${ROUTES.EVENT_SUMMARY.replace(':id', id)}`);
  };

  const navigateAfterSave = () => {
    if (navigatedFrom === NAVIGATED_FROM.OCCURRENCES) {
      goToOccurrencesPage();
    } else if (navigatedFrom === NAVIGATED_FROM.EVENT_SUMMARY) {
      goToEventSummary();
    } else {
      history.goBack();
    }
  };

  React.useEffect(() => {
    if (eventData) {
      setSelectedLanguage(language || getFirstAvailableLanguage(eventData));
    }
  }, [eventData, language]);

  const shouldSaveImage = (values: EventFormFields): boolean =>
    !!values.image &&
    (values.image !== initialValues.image ||
      values.imageAltText !== initialValues.imageAltText ||
      values.imagePhotographerName !== initialValues.imagePhotographerName);

  const submit = async (values: EventFormFields) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const requests: Promise<any>[] = [];
      requests.push(
        editEvent({
          variables: {
            event: {
              id: eventData?.event?.id || '',
              ...getEventPayload({
                values,
                selectedLanguage,
                organisationId,
              }),
              // endTime needed
              // eslint-disable-next-line max-len
              // see ticket: https://helsinkisolutionoffice.atlassian.net/secure/RapidBoard.jspa?rapidView=40&projectKey=PT&modal=detail&selectedIssue=PT-437&assignee=557058%3A7f7be94a-c144-45ca-950c-6091dd896255
              endTime: eventData?.event?.endTime,
              draft:
                eventData?.event?.publicationStatus ===
                PUBLICATION_STATUS.DRAFT,
            },
          },
        })
      );

      const createOrUpdateVenueRequest = createOrUpdateVenue({
        venueFormData: values,
        language: selectedLanguage,
        locationId: values.location,
      });

      if (createOrUpdateVenueRequest) {
        requests.push(createOrUpdateVenueRequest);
      }

      if (shouldSaveImage(values)) {
        const imageName = getImageName(values.image);
        if (imageName) {
          requests.push(
            updateImage({
              variables: {
                image: {
                  altText: values.imageAltText,
                  id: values.image,
                  name: imageName,
                  photographerName: values.imagePhotographerName,
                },
              },
            })
          );
        }
      }

      // Run all requests parallel
      await Promise.all(requests);

      navigateAfterSave();
    } catch (e) {
      if (isTestEnv()) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
      // TODO: Improve error handling when API returns more informative errors
      toast(t('editEvent.error'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const handleLanguageChange = (newLanguage: Language) => {
    history.push({
      pathname: `/${locale}${ROUTES.EDIT_EVENT.replace(':id', id)}`,
      search: `?language=${newLanguage}`,
    });
    setSelectedLanguage(newLanguage);
  };

  React.useEffect(() => {
    if (eventData) {
      setInitialValues({
        additionalCriteria:
          eventData.event?.additionalCriteria.map((item) => item.id || '') ||
          [],
        categories:
          eventData.event?.categories.map((item) => item.id || '') || [],
        audience: eventData.event?.audience.map((item) => item.id || '') || [],
        contactEmail: eventData.event?.pEvent?.contactEmail || '',
        contactPersonId: eventData.event?.pEvent?.contactPerson?.id || '',
        contactPhoneNumber: eventData.event?.pEvent?.contactPhoneNumber || '',
        description: eventData.event?.description?.[selectedLanguage] || '',
        enrolmentEndDays:
          eventData.event?.pEvent?.enrolmentEndDays?.toString() || '',
        enrolmentStart: eventData.event?.pEvent?.enrolmentStart
          ? new Date(eventData.event?.pEvent?.enrolmentStart)
          : null,
        image: eventData.event?.images[0]?.id || '',
        imageAltText: eventData.event?.images[0]?.altText || '',
        imagePhotographerName:
          eventData.event?.images[0]?.photographerName || '',
        infoUrl: eventData.event?.infoUrl?.[selectedLanguage] || '',
        inLanguage:
          eventData.event?.inLanguage.map((item) => item.id || '') || [],
        // TODO: Get price info from event data
        isFree: true,
        keywords:
          getRealKeywords(eventData)?.map((keyword) => keyword.id || '') || [],
        location: eventData.event?.location?.id || '',
        name: eventData.event?.name[selectedLanguage] || '',
        neededOccurrences:
          eventData.event?.pEvent?.neededOccurrences.toString() || '',
        // TODO: Get price info from event data
        price: '',
        shortDescription:
          eventData.event?.shortDescription?.[selectedLanguage] || '',
        locationDescription: getEventVenueDescription(
          eventData,
          selectedLanguage
        ),
        hasClothingStorage:
          eventData?.event?.venue?.hasClothingStorage || false,
        hasSnackEatingPlace:
          eventData?.event?.venue?.hasSnackEatingPlace || false,
        outdoorActivity: eventData?.event?.venue?.outdoorActivity || false,
        autoAcceptance: eventData.event?.pEvent.autoAcceptance,
      });
    }
  }, [eventData, selectedLanguage]);

  return (
    <PageWrapper title="editEvent.pageTitle">
      <LoadingSpinner isLoading={loading}>
        {!!eventData ? (
          <>
            {isEditableEvent(eventData) ? (
              <Container>
                <div className={styles.eventPage}>
                  <ActiveOrganisationInfo organisationId={organisationId} />
                  <EventForm
                    edit
                    eventData={eventData}
                    initialValues={initialValues}
                    onCancel={goToEventDetailsPage}
                    onSubmit={submit}
                    persons={persons}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={handleLanguageChange}
                    title={t('editEvent.title')}
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

export default EditEventPage;
