import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  useEditEventMutation,
  useEventQuery,
  useUpdateSingleImageMutation,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import { Language } from '../../types';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import { getImageName } from '../image/utils';
import EventForm, {
  defaultInitialValues,
  EventFormFields,
} from './eventForm/EventForm';
import styles from './eventPage.module.scss';
import {
  createOrUpdateVenue,
  getEventLanguageFromUrl,
  getEventPayload,
  getEventVenueDescription,
  getFirstAvailableLanguage,
  isEditableEvent,
} from './utils';

const EditEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const language = getEventLanguageFromUrl(location.search);
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

  const [editEvent] = useEditEventMutation();
  const [updateImage] = useUpdateSingleImageMutation();

  const goToEventDetailsPage = () => {
    history.push(`/${locale}${ROUTES.EVENT_DETAILS.replace(':id', id)}`);
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
      const requests: Promise<any>[] = [];

      requests.push(
        editEvent({
          variables: {
            event: {
              id: eventData?.event?.id || '',
              ...getEventPayload(values, selectedLanguage),
            },
          },
        })
      );
      const createOrUpdateVenueRequest = createOrUpdateVenue({
        formValues: values,
        selectedLanguage,
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

      goToEventDetailsPage();
    } catch (e) {
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
        audience: eventData.event?.audience.map((item) => item.id || '') || [],
        description: eventData.event?.description?.[selectedLanguage] || '',
        duration: eventData.event?.pEvent?.duration.toString() || '',
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
        keywords: eventData.event?.keywords.map((item) => item.id || '') || [],
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
                  <EventForm
                    eventData={eventData}
                    initialValues={initialValues}
                    onCancel={goToEventDetailsPage}
                    onSubmit={submit}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={handleLanguageChange}
                    title={t('editEvent.title')}
                  />
                </div>
              </Container>
            ) : (
              <ErrorPage
                title={t('editEvent.errorEventIsInThePast')}
                description={t('editEvent.errorEventIsInThePastDescription')}
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
