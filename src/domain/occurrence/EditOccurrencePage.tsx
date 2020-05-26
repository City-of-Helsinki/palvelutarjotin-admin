import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  useEditOccurrenceMutation,
  useEventQuery,
  useOccurrenceQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import formatDate from '../../utils/formatDate';
import getLocalizedString from '../../utils/getLocalizedString';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
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

  const submit = async (values: OccurrenceFormFields) => {
    try {
      await editOccurrence({
        variables: {
          input: {
            id: occurrenceId,
            ...getOccurrencePayload(
              values,
              occurrenceData?.occurrence?.organisation.id,
              occurrenceData?.occurrence?.pEvent?.id
            ),
          },
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
      await editOccurrence({
        variables: {
          input: {
            id: occurrenceId,
            ...getOccurrencePayload(
              values,
              occurrenceData?.occurrence?.organisation.id,
              occurrenceData?.occurrence?.pEvent?.id
            ),
          },
        },
      });
      history.push(
        `/${locale}${ROUTES.CREATE_OCCURRENCE.replace(':id', eventId)}`
      );
      resetForm();
    } catch (e) {}
  };

  return (
    <PageWrapper title="editOccurrence.pageTitle">
      <LoadingSpinner isLoading={loadingEvent || loadingOccurrence}>
        {eventData && occurrenceData ? (
          <Container>
            <div className={styles.eventOccurrencePage}>
              <div className={styles.headerContainer}>
                {/* TODO: use selected event name as title */}
                <h1>
                  {getLocalizedString(eventData?.event?.name || {}, locale)}
                </h1>
                {/* TODO: show eventi information when clicking this button */}
                <Button variant="secondary" onClick={goToEventDetailsPage}>
                  {t('editOccurrence.buttonShowEventInfo')}
                </Button>
              </div>
              <EventOccurrenceForm
                eventId={eventId}
                formTitle={t('editOccurrence.formTitle')}
                initialValues={{
                  date: occurrenceData.occurrence?.startTime
                    ? new Date(occurrenceData.occurrence?.startTime)
                    : null,
                  startsAt: occurrenceData.occurrence?.startTime
                    ? formatDate(
                        new Date(occurrenceData.occurrence?.startTime),
                        'HH:mm'
                      )
                    : '',
                  endsAt: occurrenceData.occurrence?.endTime
                    ? formatDate(
                        new Date(occurrenceData.occurrence?.endTime),
                        'HH:mm'
                      )
                    : '',
                  location: occurrenceData.occurrence?.placeId || '',
                  maxGroupSize:
                    occurrenceData.occurrence?.maxGroupSize.toString() || '',
                  minGroupSize:
                    occurrenceData.occurrence?.minGroupSize.toString() || '',
                }}
                occurrenceId={occurrenceId}
                onSubmit={submit}
                onSubmitAndAdd={submitAndAdd}
              />
            </div>
          </Container>
        ) : (
          <div>TODO: Event not found page</div>
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default EditOccurrencePage;
