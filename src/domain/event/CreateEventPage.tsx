import { useApolloClient } from '@apollo/react-hooks';
import { Notification } from 'hds-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  EventDocument,
  EventQuery,
  PersonFieldsFragment,
  useCreateEventMutation,
  useMyProfileQuery,
  useUpdateSingleImageMutation,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import { isTestEnv } from '../../utils/envUtils';
import { clearApolloCache } from '../app/apollo/utils';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import { getImageName } from '../image/utils';
import { getSelectedOrganisation } from '../myProfile/utils';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { activeOrganisationSelector } from '../organisation/selector';
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
} from './utils';

const CreateEventPage: React.FC = () => {
  const apolloClient = useApolloClient();
  const { id: eventIdToCopy } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const locale = useLocale();
  const language = getEventLanguageFromUrl(location.search);
  const [selectedLanguage, setSelectedLanguage] = useState(language || locale);

  const [initialValues, setInitialValues] = useState<CreateEventFormFields>(
    createEventInitialValues
  );
  const [loading, setLoading] = useState<boolean>(true);

  const [createEvent] = useCreateEventMutation();
  const [updateImage] = useUpdateSingleImageMutation();
  const { data: myProfileData } = useMyProfileQuery();
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
          setInitialValues({
            ...getEventFormValues(data, selectedLanguage),
            ...createEventAlwaysEmptyInitialValues,
          });
        } else {
          setInitialValues(createEventInitialValues);
        }
      } catch (err) {
        setInitialValues(createEventInitialValues);
        handleError(err);
      } finally {
        setLoading(false);
      }
    };
    getInitialValues();
  }, [
    eventIdToCopy,
    apolloClient,
    handleError,
    selectedLanguage,
    setInitialValues,
    setLoading,
  ]);

  const activeOrganisation = useSelector(activeOrganisationSelector);
  const selectedOrganisation =
    myProfileData?.myProfile &&
    getSelectedOrganisation(myProfileData.myProfile, activeOrganisation);

  const persons =
    selectedOrganisation?.persons.edges.map(
      (edge) => edge?.node as PersonFieldsFragment
    ) || [];
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
                selectedLanguage,
                organisationId: selectedOrganisation?.id || '',
              }),
              // save event always as a draft first
              draft: true,
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
