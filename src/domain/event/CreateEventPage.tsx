import { useApolloClient } from '@apollo/react-hooks';
import { Notification } from 'hds-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  EventDocument,
  EventQuery,
  OrganisationNodeFieldsFragment,
  useCreateEventMutation,
  useUpdateSingleImageMutation,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import { isTestEnv } from '../../utils/envUtils';
import { clearApolloCache } from '../app/apollo/utils';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import { getImageName } from '../image/utils';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { getPersons } from '../organisation/oranisationUtils';
import { useSelectedOrganisation } from '../organisation/useSelectedOrganisation';
import { createOrUpdateVenue } from '../venue/utils';
import EventForm, {
  createEventAlwaysEmptyInitialValues,
  createEventInitialValues,
} from './eventForm/EventForm';
import styles from './eventPage.module.scss';
import { CreateEventFormFields } from './types';
import {
  firstOccurrencePrefilledValuesToQuery,
  getEventFormValues,
  getEventLanguageFromUrl,
  getEventPayload,
  getFirstAvailableLanguage,
} from './utils';

const CreateEventPage: React.FC = () => {
  const { id: eventIdToCopy } = useParams<{ id: string }>();
  const apolloClient = useApolloClient();
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const locale = useLocale();
  const language = useMemo(() => getEventLanguageFromUrl(location.search), [
    location.search,
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState(language || locale);

  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState<EventQuery | null>(null);
  const [initialValues, setInitialValues] = useState<CreateEventFormFields>(
    createEventInitialValues
  );

  const [createEvent] = useCreateEventMutation();
  const [updateImage] = useUpdateSingleImageMutation();

  const selectedOrganisation = useSelectedOrganisation();

  const [eventOrganisation, setEventOrganisation] = useState<
    OrganisationNodeFieldsFragment | null | undefined
  >(null);

  const handleError = useCallback(
    (err: Error) => {
      // TODO: Improve error handling when API returns more informative errors
      if (isTestEnv()) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
      toast(t('createEvent.error'), {
        type: toast.TYPE.ERROR,
      });
    },
    [t]
  );

  useEffect(() => {
    const getInitialValues = async () => {
      try {
        if (eventIdToCopy) {
          const { data } = await apolloClient.query<EventQuery>({
            query: EventDocument,
            fetchPolicy: 'network-only',
            variables: {
              id: eventIdToCopy,
              include: ['audience', 'in_language', 'keywords', 'location'],
            },
          });
          setEventData(data);
          setInitialValues({
            ...getEventFormValues(data),
            ...createEventAlwaysEmptyInitialValues,
          });
        } else {
          setInitialValues(createEventInitialValues);
        }
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };
    getInitialValues();
  }, [eventIdToCopy, apolloClient, handleError, setInitialValues, setLoading]);

  useEffect(
    () => setSelectedLanguage(language ?? getFirstAvailableLanguage(eventData)),
    [eventData, language, setSelectedLanguage]
  );

  useEffect(
    () => setEventOrganisation(eventData?.event?.pEvent?.organisation),
    [eventData, setEventOrganisation]
  );

  const organisation = eventOrganisation ?? selectedOrganisation;
  const persons = useMemo(() => getPersons(organisation), [organisation]);

  const goToEventList = () => {
    history.push(ROUTES.HOME);
  };

  const handleSubmit = async (values: CreateEventFormFields) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const requests: Promise<any>[] = [];

      // Request to create new event
      requests.push(
        createEvent({
          variables: {
            event: {
              ...getEventPayload({
                values,
                organisationId: organisation?.id ?? '',
              }),
              // save event always as a draft first
              draft: true,
            },
          },
        })
      );

      const createOrUpdateVenueRequest = createOrUpdateVenue({
        venueFormData: values,
        locationId: values.location,
      });

      if (createOrUpdateVenueRequest) {
        requests.push(createOrUpdateVenueRequest);
      }

      const imageId = values.image;
      if (imageId) {
        const imageName = getImageName(imageId);
        if (imageName) {
          // Request to update image data
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
      const responses = await Promise.all(requests);

      // TODO: come up with a better way to handle this
      // Find the request that made the eventMutation and get the id
      const id =
        responses.find((r) => r.data.addEventMutation).data.addEventMutation
          .response.body.id || '';

      // TODO: After apollo-client 3.0 release check is there a better way to force
      // eventlist reload
      // https://github.com/apollographql/apollo-client/blob/v3.0.0-rc.0/CHANGELOG.md
      // Clear apollo cache to force eventlist reload
      await clearApolloCache();
      history.push({
        pathname: `/${locale}${ROUTES.CREATE_FIRST_OCCURRENCE.replace(
          ':id',
          id
        )}`,
        search: firstOccurrencePrefilledValuesToQuery(values),
      });
    } catch (e) {
      handleError(e);
    }
  };
  return (
    <PageWrapper title="createEvent.pageTitle">
      <LoadingSpinner isLoading={loading}>
        <Container>
          <div className={styles.eventPage}>
            <Notification label={t('createEvent.threeStepNotification.title')}>
              {t('createEvent.threeStepNotification.description')}
            </Notification>
            <ActiveOrganisationInfo />
            <EventForm
              onCancel={goToEventList}
              onSubmit={handleSubmit}
              persons={persons}
              initialValues={initialValues}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              title={t('createEvent.title')}
            />
          </div>
        </Container>
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default CreateEventPage;
