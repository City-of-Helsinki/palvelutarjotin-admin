import { Notification } from 'hds-react';
import { compact } from 'lodash';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  OrganisationNodeFieldsFragment,
  useCreateEventMutation,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import { Language } from '../../types';
import { isTestEnv } from '../../utils/envUtils';
import { clearApolloCache } from '../app/apollo/utils';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import EventForm, { createEventInitialValues } from './eventForm/EventForm';
import {
  useCreateOrUpdateVenueRequest,
  useUpdateImageRequest,
} from './eventForm/useEventFormSubmitRequests';
import useOrganisationPersons from './eventForm/useOrganisationPersons';
import styles from './eventPage.module.scss';
import { CreateEventFormFields } from './types';
import {
  firstOccurrencePrefilledValuesToQuery,
  getEventPayload,
} from './utils';

const useEventFormCreateSubmit = (
  selectedLanguage: Language,
  selectedOrganisation: OrganisationNodeFieldsFragment | null | undefined
) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const [createEvent] = useCreateEventMutation();
  const createOrUpdateVenueRequestHandler = useCreateOrUpdateVenueRequest(
    selectedLanguage
  );
  const updateImageRequestHandler = useUpdateImageRequest();

  const handleSubmit = async (values: CreateEventFormFields) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const requests: Promise<any>[] = compact([
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
        }),
        createOrUpdateVenueRequestHandler(values),
        updateImageRequestHandler(values),
      ]);

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
      // TODO: Improve error handling when API returns more informative errors
      if (isTestEnv()) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
      toast(t('createEvent.error'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  return handleSubmit;
};

const CreateEventPage: React.FC<{
  initialValues: CreateEventFormFields;
  loading: boolean;
  selectedLanguage: Language | undefined;
  setSelectedLanguage: (selectedLanguage: Language) => void | undefined;
}> = ({
  initialValues = createEventInitialValues,
  loading = false,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const [defaultSelectedLanguage, defaultSetSelectedLanguage] = React.useState(
    locale
  );
  const { organisation, persons } = useOrganisationPersons();

  const onSubmit = useEventFormCreateSubmit(
    selectedLanguage ?? defaultSelectedLanguage,
    organisation
  );

  const goToEventList = () => {
    history.push(ROUTES.HOME);
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
              onSubmit={onSubmit}
              persons={persons}
              initialValues={initialValues}
              selectedLanguage={selectedLanguage ?? defaultSelectedLanguage}
              setSelectedLanguage={
                setSelectedLanguage ?? defaultSetSelectedLanguage
              }
              title={t('createEvent.title')}
            />
          </div>
        </Container>
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default CreateEventPage;
