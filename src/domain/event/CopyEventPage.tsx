import { Notification } from 'hds-react';
import { compact } from 'lodash';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  PersonFieldsFragment,
  useCreateEventMutation,
  useEventQuery,
  useMyProfileQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import { isTestEnv } from '../../utils/envUtils';
import { clearApolloCache } from '../app/apollo/utils';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import { getSelectedOrganisation } from '../myProfile/utils';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { activeOrganisationSelector } from '../organisation/selector';
import EventForm, { defaultInitialValues } from './eventForm/EventForm';
import {
  useCreateOrUpdateVenueRequest,
  useUpdateImageRequest,
} from './eventForm/useEventFormSubmitRequests';
import styles from './eventPage.module.scss';
import { CreateEventFormFields, EventFormFields } from './types';
import {
  firstOccurrencePrefilledValuesToQuery,
  getEventFormValues,
  getEventLanguageFromUrl,
  getEventPayload,
  getFirstAvailableLanguage,
} from './utils';

const CopyEventPage: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const [selectedLanguage, setSelectedLanguage] = React.useState(locale);

  const [createEvent] = useCreateEventMutation();
  const { data: myProfileData } = useMyProfileQuery();

  const activeOrganisation = useSelector(activeOrganisationSelector);
  const selectedOrganisation =
    myProfileData?.myProfile &&
    getSelectedOrganisation(myProfileData.myProfile, activeOrganisation);

  const persons =
    selectedOrganisation?.persons.edges.map(
      (edge) => edge?.node as PersonFieldsFragment
    ) || [];

  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const language = getEventLanguageFromUrl(location.search);
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
  React.useEffect(() => {
    if (eventData) {
      setSelectedLanguage(language || getFirstAvailableLanguage(eventData));
    }
  }, [eventData, language]);
  React.useEffect(() => {
    if (eventData && selectedLanguage) {
      setInitialValues(getEventFormValues(eventData, selectedLanguage));
    }
  }, [eventData, selectedLanguage]);
  const cloneEventInitialValues: CreateEventFormFields = {
    occurrenceDate: null,
    occurrenceStartsAt: '',
    occurrenceEndsAt: '',
    ...initialValues,
  };

  const goToEventList = () => {
    history.push(ROUTES.HOME);
  };

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
              initialValues={cloneEventInitialValues}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              title={t('copyEvent.title')}
            />
          </div>
        </Container>
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default CopyEventPage;
