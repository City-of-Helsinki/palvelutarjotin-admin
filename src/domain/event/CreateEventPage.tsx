import { useApolloClient } from '@apollo/client';
import { Notification } from 'hds-react';
import compact from 'lodash/compact';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import { SUPPORT_LANGUAGES } from '../../constants';
import {
  EventDocument,
  EventQuery,
  OrganisationNodeFieldsFragment,
  useCreateEventMutation,
} from '../../generated/graphql';
import useHistory from '../../hooks/useHistory';
import { Language } from '../../types';
import { isTestEnv } from '../../utils/envUtils';
import { clearApolloCache } from '../app/apollo/utils';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { getPersons } from '../organisation/oranisationUtils';
import { useSelectedOrganisation } from '../organisation/useSelectedOrganisation';
import EventForm, { createEventInitialValues } from './eventForm/EventForm';
import { useUpdateImageRequest } from './eventForm/useEventFormSubmitRequests';
import styles from './eventPage.module.scss';
import { CreateEventFormFields } from './types';
import {
  getEventFormValues,
  getEventPayload,
  omitUnselectedLanguagesFromValues,
} from './utils';

const CreateEventPage: React.FC = () => {
  const { id: eventIdToCopy } = useParams<{ id: string }>();
  const apolloClient = useApolloClient();
  const { t } = useTranslation();
  const history = useHistory();
  const updateImageRequestHandler = useUpdateImageRequest();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<CreateEventFormFields>(
    createEventInitialValues
  );
  const [createEvent] = useCreateEventMutation();

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
          setEventOrganisation(data.event?.pEvent?.organisation);
          setInitialValues(getEventFormValues(data));
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

  const organisation = eventOrganisation ?? selectedOrganisation;
  const persons = useMemo(() => getPersons(organisation), [organisation]);

  const goToEventList = () => {
    history.pushWithLocale(ROUTES.HOME);
  };

  const handleSubmit = async (
    values: CreateEventFormFields,
    selectedLanguages: Language[]
  ) => {
    try {
      const unselectedLanguages = Object.values(SUPPORT_LANGUAGES).filter(
        (lang) => !selectedLanguages.includes(lang)
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const requests: Promise<any>[] = compact([
        createEvent({
          variables: {
            event: {
              ...getEventPayload({
                formValues: omitUnselectedLanguagesFromValues(
                  values,
                  unselectedLanguages
                ),
                organisationId: organisation?.id ?? '',
              }),
              // save event always as a draft first
              draft: true,
            },
          },
        }),
        updateImageRequestHandler(values),
      ]);

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
      history.pushWithLocale({
        pathname: ROUTES.CREATE_OCCURRENCE.replace(':id', id),
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
              formType={eventIdToCopy ? 'template' : 'new'}
              onCancel={goToEventList}
              onSubmit={handleSubmit}
              persons={persons}
              initialValues={initialValues}
              title={t('createEvent.title')}
            />
          </div>
        </Container>
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default CreateEventPage;
