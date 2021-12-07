import { Notification } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import BackButton from '../../common/components/backButton/BackButton';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  Language,
  NotificationType,
  useEnrolmentQuery,
  useUpdateEnrolmentMutation,
} from '../../generated/graphql';
import useHistory from '../../hooks/useHistory';
import useLocale from '../../hooks/useLocale';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import { OCCURRENCE_URL_PARAMS } from '../occurrence/constants';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import styles from './editEnrolmentPage.module.scss';
import EnrolmentForm, {
  defaultInitialValues,
} from './enrolmentForm/EnrolmentForm';
import { EnrolmentFormFields } from './types';
import { getGroupSizeBoundaries, getUpdateEnrolmentPayload } from './utils';

const EditorEnrolmentPage: React.FC = () => {
  const { enrolmentId, eventId } = useParams<{
    enrolmentId: string;
    eventId: string;
  }>();
  const { t } = useTranslation();
  const history = useHistory();
  const locale = useLocale();
  const [selectedLanguage] = React.useState(locale);
  const [initialValues, setInitialValues] =
    React.useState<EnrolmentFormFields>(defaultInitialValues);

  const [updateEnrolment] = useUpdateEnrolmentMutation();

  const { data: enrolmentData, loading } = useEnrolmentQuery({
    variables: {
      id: enrolmentId,
    },
  });
  const organisationId =
    enrolmentData?.enrolment?.occurrence.pEvent?.organisation?.id;
  const occurrenceId = enrolmentData?.enrolment?.occurrence.id;

  const handleSubmit = async (values: EnrolmentFormFields) => {
    try {
      if (enrolmentData?.enrolment?.id) {
        await updateEnrolment({
          variables: {
            input: getUpdateEnrolmentPayload({
              enrolmentId: enrolmentData.enrolment.id,
              values,
            }),
          },
        });

        goToOccurrenceDetailsPage({ enrolmentUpdated: true });
      }
    } catch (error) {
      toast(t('enrolment.errors.updateFailed'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const goToOccurrenceDetailsPage = ({
    enrolmentUpdated,
  }: {
    enrolmentUpdated?: boolean;
  } = {}) => {
    if (eventId && occurrenceId) {
      const search = new URLSearchParams();
      if (enrolmentUpdated) {
        search.append(OCCURRENCE_URL_PARAMS.ENROLMENT_UPDATED, 'true');
      }
      history.pushWithLocale({
        pathname: `${ROUTES.OCCURRENCE_DETAILS.replace(':id', eventId).replace(
          ':occurrenceId',
          occurrenceId
        )}`,
        search: search.toString(),
      });
    }
  };

  React.useEffect(() => {
    if (enrolmentData) {
      const enrolment = enrolmentData.enrolment;
      const studyLevels =
        enrolment?.studyGroup?.studyLevels?.edges
          .map((edge) => edge?.node?.id as string)
          .filter((n) => n) || [];
      setInitialValues({
        hasEmailNotification:
          enrolment?.notificationType === NotificationType.Email ||
          enrolment?.notificationType === NotificationType.EmailSms,
        hasSmsNotification:
          enrolment?.notificationType === NotificationType.Sms ||
          enrolment?.notificationType === NotificationType.EmailSms,
        isSameResponsiblePerson:
          enrolment?.person?.id === enrolment?.studyGroup.person.id,
        studyGroup: {
          amountOfAdult: enrolment?.studyGroup.amountOfAdult?.toString() || '',
          groupSize: enrolment?.studyGroup.groupSize.toString() || '',
          groupName: enrolment?.studyGroup.groupName || '',
          unitId: enrolment?.studyGroup.unitId || '',
          unitName: enrolment?.studyGroup.unitName || '',
          studyLevels: studyLevels.map((s) => s.toUpperCase()) || [],
          person: {
            name: enrolment?.studyGroup.person.name || '',
            emailAddress: enrolment?.studyGroup.person.emailAddress || '',
            phoneNumber: enrolment?.person?.phoneNumber || '',
          },
          extraNeeds: enrolment?.studyGroup.extraNeeds || '',
        },
        language:
          enrolment?.person?.language ||
          enrolment?.studyGroup.person.language ||
          Language.Fi,
        person: {
          name: enrolment?.person?.name || '',
          phoneNumber: enrolment?.person?.phoneNumber || '',
          emailAddress: enrolment?.person?.emailAddress || '',
        },
      });
    }
  }, [enrolmentData, selectedLanguage]);

  const { minGroupSize, maxGroupSize } =
    getGroupSizeBoundaries({
      occurrence: enrolmentData?.enrolment?.occurrence,
      studyGroup: enrolmentData?.enrolment?.studyGroup,
    }) ?? {};

  return (
    <PageWrapper title="createEvent.pageTitle">
      <LoadingSpinner isLoading={loading}>
        {enrolmentData && (
          <div className={styles.editEnrolmentPage}>
            <Container>
              <ActiveOrganisationInfo organisationId={organisationId} />
              <BackButton onClick={() => goToOccurrenceDetailsPage()}>
                {t('enrolment.editEnrolmentBackButton')}
              </BackButton>
              <h1>{t('enrolment.editEnrolmentTitle')}</h1>
              {!!minGroupSize && !!maxGroupSize ? (
                <EnrolmentForm
                  onSubmit={handleSubmit}
                  initialValues={initialValues}
                  minGroupSize={minGroupSize}
                  maxGroupSize={maxGroupSize}
                />
              ) : (
                <Notification label="Virhe" type="error">
                  Virhe lomakkeen alustuksessa
                </Notification>
              )}
            </Container>
          </div>
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default EditorEnrolmentPage;
