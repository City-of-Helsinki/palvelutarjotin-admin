import { compact } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import { SUPPORT_LANGUAGES } from '../../constants';
import {
  EventQuery,
  useEditEventMutation,
  useEventQuery,
} from '../../generated/graphql';
import useGoBack from '../../hooks/useGoBack';
import useNavigate from '../../hooks/useNavigate';
import { useSearchParams } from '../../hooks/useQuery';
import { Language } from '../../types';
import { isTestEnv } from '../../utils/envUtils';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import { PUBLICATION_STATUS } from '../events/constants';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { getPersons } from '../organisation/oranisationUtils';
import EventForm, { eventInitialValues } from './eventForm/EventForm';
import { useUpdateImageRequest } from './eventForm/useEventFormSubmitRequests';
import styles from './eventPage.module.scss';
import { CreateEventFormFields } from './types';
import {
  getEditEventPayload,
  getEventFormValues,
  omitUnselectedLanguagesFromValues,
} from './utils';
import { invalidateEventCache } from '../app/apollo/utils';

export enum EDIT_EVENT_QUERY_PARAMS {
  NAVIGATED_FROM = 'navigatedFrom',
}

export enum NAVIGATED_FROM {
  OCCURRENCES = 'occurrences',
  EVENT_SUMMARY = 'eventSummary',
  EVENT_DETAILS = 'eventDetails',
}

const useEventFormEditSubmit = (
  initialValues: CreateEventFormFields,
  eventData: EventQuery | undefined
) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { pushWithLocale } = useNavigate();
  const goBack = useGoBack({ defaultReturnPath: ROUTES.HOME });
  const [editEvent, { loading: editEventLoading }] = useEditEventMutation();
  const [updateImageRequestHandler, updateImageLoading] =
    useUpdateImageRequest();
  const navigatedFrom = useSearchParams().get(
    EDIT_EVENT_QUERY_PARAMS.NAVIGATED_FROM
  );

  const goToOccurrencesPage = () => {
    id && pushWithLocale(ROUTES.CREATE_OCCURRENCE.replace(':id', id));
  };

  const navigateAfterSave = () => {
    if (navigatedFrom === NAVIGATED_FROM.OCCURRENCES) {
      goToOccurrencesPage();
    } else {
      goBack();
    }
  };

  const shouldSaveImage = (values: CreateEventFormFields): boolean =>
    !!values.image &&
    (values.image !== initialValues.image ||
      values.imageAltText !== initialValues.imageAltText ||
      values.imagePhotographerName !== initialValues.imagePhotographerName);

  const submit = async (
    values: CreateEventFormFields,
    selectedLanguages: Language[]
  ) => {
    const existingEventValues = eventData?.event;

    const unselectedLanguages = Object.values(SUPPORT_LANGUAGES).filter(
      (lang) => !selectedLanguages.includes(lang)
    );

    try {
      if (existingEventValues) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const requests: Promise<any>[] = compact([
          editEvent({
            variables: {
              event: {
                id: eventData?.event?.id || '',
                ...getEditEventPayload({
                  formValues: omitUnselectedLanguagesFromValues(
                    values,
                    unselectedLanguages
                  ),
                  existingEventValues,
                  organisationId:
                    eventData?.event?.pEvent?.organisation?.id ?? '',
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
          }),
          shouldSaveImage(values)
            ? updateImageRequestHandler(values)
            : undefined,
        ]);

        // Run all requests parallel
        await Promise.all(requests);

        // Make sure event's data is up to date after editing
        if (eventData?.event?.id) {
          invalidateEventCache(eventData?.event?.id);
        }

        navigateAfterSave();
      } else {
        throw new Error('Existing event values missing!');
      }
    } catch (e) {
      if (isTestEnv()) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
      // TODO: Improve error handling when API returns more informative errors
      toast(t('editEvent.error'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const isLoading = editEventLoading || updateImageLoading;

  return [submit, isLoading] as const;
};

const EditEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { pushWithLocale } = useNavigate();
  const [initialValues, setInitialValues] =
    useState<CreateEventFormFields>(eventInitialValues);

  const { data: eventData, loading } = useEventQuery({
    fetchPolicy: 'network-only',
    skip: !id,
    variables: {
      id: id!,
      include: ['audience', 'in_language', 'keywords', 'location'],
    },
  });

  const organisation = eventData?.event?.pEvent?.organisation;
  const persons = getPersons(organisation);

  const goToEventDetailsPage = () => {
    id && pushWithLocale(`${ROUTES.EVENT_DETAILS.replace(':id', id)}`);
  };

  useEffect(() => {
    if (eventData) {
      setInitialValues(getEventFormValues(eventData));
    }
  }, [eventData]);

  const [onSubmit, editEventLoading] = useEventFormEditSubmit(
    initialValues,
    eventData
  );

  return (
    <PageWrapper title="editEvent.pageTitle">
      <LoadingSpinner isLoading={loading}>
        {!!eventData ? (
          <>
            <Container>
              <div className={styles.eventPage}>
                <ActiveOrganisationInfo
                  organisationId={organisation?.id ?? ''}
                />
                <EventForm
                  formType="edit"
                  eventData={eventData}
                  initialValues={initialValues}
                  onCancel={goToEventDetailsPage}
                  onSubmit={onSubmit}
                  persons={persons}
                  eventMutationLoading={editEventLoading}
                  title={t('editEvent.title')}
                />
              </div>
            </Container>
          </>
        ) : (
          <ErrorPage />
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default EditEventPage;
