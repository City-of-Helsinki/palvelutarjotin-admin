import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';

import BackButton from '../../common/components/backButton/BackButton';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  useAddOccurrenceMutation,
  useEventQuery,
  useMyProfileQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import getLocalizedString from '../../utils/getLocalizedString';
import scrollToTop from '../../utils/scrollToTop';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import EventOccurrenceForm, {
  defaultInitialValues,
  OccurrenceFormFields,
} from './eventOccurrenceForm/EventOccurrenceForm';
import styles from './occurrencePage.module.scss';
import { getOccurrencePayload } from './utils';

interface Params {
  id: string;
}

const CreateOccurrencePage: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();

  const { id: eventId } = useParams<Params>();

  const {
    data: eventData,
    loading: loadingEvent,
    refetch: refetchEvent,
  } = useEventQuery({
    variables: { id: eventId },
  });

  const {
    data: myProfileData,
    loading: loadingMyProfile,
  } = useMyProfileQuery();

  const [createOccurrence] = useAddOccurrenceMutation();

  const goToEventDetailsPage = () => {
    history.push(`/${locale}${ROUTES.EVENT_DETAILS.replace(':id', eventId)}`);
  };

  const goToOccurrencesPage = () => {
    history.push(`/${locale}${ROUTES.OCCURRENCES.replace(':id', eventId)}`);
  };

  const getPayload = (values: OccurrenceFormFields) => {
    return getOccurrencePayload({
      values,
      organisationId:
        myProfileData?.myProfile?.organisations.edges[0]?.node?.id || '',
      pEventId: eventData?.event?.pEvent?.id || '',
    });
  };

  const submit = async (values: OccurrenceFormFields) => {
    try {
      await createOccurrence({
        variables: {
          input: getPayload(values),
        },
      });
      history.push(`/${locale}${ROUTES.OCCURRENCES.replace(':id', eventId)}`);
    } catch (e) {}
  };

  const submitAndAdd = async (
    values: OccurrenceFormFields,
    resetForm: () => void
  ) => {
    try {
      await createOccurrence({
        variables: {
          input: getPayload(values),
        },
      });
      history.push(
        `/${locale}${ROUTES.CREATE_OCCURRENCE.replace(':id', eventId)}`
      );
      refetchEvent();
      resetForm();
      scrollToTop();
    } catch (e) {}
  };

  return (
    <PageWrapper title="createOccurrence.pageTitle">
      <LoadingSpinner isLoading={loadingEvent || loadingMyProfile}>
        {myProfileData ? (
          <>
            {eventData ? (
              <Container>
                <div className={styles.eventOccurrencePage}>
                  <BackButton onClick={goToOccurrencesPage}>
                    {t('createOccurrence.buttonBack')}
                  </BackButton>
                  <div className={styles.headerContainer}>
                    <h1>
                      {getLocalizedString(eventData?.event?.name || {}, locale)}
                    </h1>
                    <Button variant="secondary" onClick={goToEventDetailsPage}>
                      {t('createOccurrence.buttonShowEventInfo')}
                    </Button>
                  </div>
                  <EventOccurrenceForm
                    eventId={eventId}
                    formTitle={t('createOccurrence.formTitle')}
                    initialValues={defaultInitialValues}
                    onSubmit={submit}
                    onSubmitAndAdd={submitAndAdd}
                  />
                </div>
              </Container>
            ) : (
              <div>TODO: Event not found page</div>
            )}
          </>
        ) : (
          <div>TODO: MY PROFILE IS MISSING</div>
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default CreateOccurrencePage;
