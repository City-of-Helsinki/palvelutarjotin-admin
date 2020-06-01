import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';

import BackButton from '../../common/components/backButton/BackButton';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  useEditOccurrenceMutation,
  useEventQuery,
  useOccurrenceQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import formatDate from '../../utils/formatDate';
import getLocalizedString from '../../utils/getLocalizedString';
import scrollToTop from '../../utils/scrollToTop';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import EventOccurrenceForm, {
  OccurrenceFormFields,
} from './eventOccurrenceForm/EventOccurrenceForm';
import styles from './occurrencePage.module.scss';
import { getOccurrencePayload } from './utils';

interface Params {
  id: string;
  occurrenceId: string;
}

const EditOccurrencePage: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();

  const { id: eventId, occurrenceId } = useParams<Params>();

  const { data: eventData, loading: loadingEvent } = useEventQuery({
    variables: { id: eventId },
  });

  const [editOccurrence] = useEditOccurrenceMutation();

  const {
    data: occurrenceData,
    loading: loadingOccurrence,
  } = useOccurrenceQuery({
    variables: { id: occurrenceId },
  });

  const goToEventDetailsPage = () => {
    history.push(`/${locale}${ROUTES.EVENT_DETAILS.replace(':id', eventId)}`);
  };

  const goToOccurrencesPage = () => {
    history.push(`/${locale}${ROUTES.OCCURRENCES.replace(':id', eventId)}`);
  };

  const getPayload = (values: OccurrenceFormFields) => {
    return {
      id: occurrenceId,
      ...getOccurrencePayload({
        values,
        organisationId: occurrenceData?.occurrence?.organisation.id || '',
        pEventId: occurrenceData?.occurrence?.pEvent?.id || '',
      }),
    };
  };

  const submit = async (values: OccurrenceFormFields) => {
    try {
      await editOccurrence({
        variables: {
          input: getPayload(values),
        },
      });
      history.push(`/${locale}${ROUTES.OCCURRENCES.replace(':id', eventId)}`);
    } catch (e) {
      // TODO: Improve error handling when API returns more informative errors
      toast(t('editOccurrence.error'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const submitAndAdd = async (
    values: OccurrenceFormFields,
    resetForm: () => void
  ) => {
    try {
      await editOccurrence({
        variables: {
          input: getPayload(values),
        },
      });
      history.push(
        `/${locale}${ROUTES.CREATE_OCCURRENCE.replace(':id', eventId)}`
      );
      resetForm();
      scrollToTop();
    } catch (e) {
      // TODO: Improve error handling when API returns more informative errors
      toast(t('editOccurrence.error'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const initialValues = React.useMemo(
    () => ({
      date: occurrenceData?.occurrence?.startTime
        ? new Date(occurrenceData?.occurrence?.startTime)
        : null,
      startsAt: occurrenceData?.occurrence?.startTime
        ? formatDate(new Date(occurrenceData?.occurrence?.startTime), 'HH:mm')
        : '',
      endsAt: occurrenceData?.occurrence?.endTime
        ? formatDate(new Date(occurrenceData?.occurrence?.endTime), 'HH:mm')
        : '',
      languages:
        occurrenceData?.occurrence?.languages.map((language) =>
          language.id.toUpperCase()
        ) || [],
      location: occurrenceData?.occurrence?.placeId || '',
      amountOfSeats: occurrenceData?.occurrence?.amountOfSeats.toString() || '',
      maxGroupSize: occurrenceData?.occurrence?.maxGroupSize.toString() || '',
      minGroupSize: occurrenceData?.occurrence?.minGroupSize.toString() || '',
      autoAcceptance: Boolean(occurrenceData?.occurrence?.autoAcceptance),
    }),
    [occurrenceData]
  );

  return (
    <PageWrapper title="editOccurrence.pageTitle">
      <LoadingSpinner isLoading={loadingEvent || loadingOccurrence}>
        {eventData && occurrenceData ? (
          <Container>
            <div className={styles.eventOccurrencePage}>
              <BackButton onClick={goToOccurrencesPage}>
                {t('editOccurrence.buttonBack')}
              </BackButton>
              <div className={styles.headerContainer}>
                <h1>
                  {getLocalizedString(eventData?.event?.name || {}, locale)}
                </h1>
                <Button variant="secondary" onClick={goToEventDetailsPage}>
                  {t('editOccurrence.buttonShowEventInfo')}
                </Button>
              </div>
              <EventOccurrenceForm
                eventId={eventId}
                formTitle={t('editOccurrence.formTitle')}
                initialValues={initialValues}
                occurrenceId={occurrenceId}
                onSubmit={submit}
                onSubmitAndAdd={submitAndAdd}
              />
            </div>
          </Container>
        ) : (
          <ErrorPage />
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default EditOccurrencePage;
