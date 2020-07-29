import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  Language,
  NotificationType,
  useEnrolmentQuery,
  useUpdateEnrolmentMutation,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import styles from './editEnrolmentPage.module.scss';
import EnrolmentForm, {
  defaultInitialValues,
} from './enrolmentForm/EnrolmentForm';
import { EnrolmentFormFields } from './types';
import { getUpdateEnrolmentPayload } from './utils';

const EditorEnrolmentPage: React.FC = () => {
  const { enrolmentId } = useParams<{
    enrolmentId: string;
    eventId: string;
  }>();
  const { t } = useTranslation();
  const locale = useLocale();
  const [selectedLanguage] = React.useState(locale);
  const [initialValues, setInitialValues] = React.useState<EnrolmentFormFields>(
    defaultInitialValues
  );

  const [updateEnrolment] = useUpdateEnrolmentMutation();

  const { data: enrolmentData, loading } = useEnrolmentQuery({
    variables: {
      id: enrolmentId,
    },
  });

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
        // TODO: reidrect to enrolment details page when implemented??
      }
    } catch (error) {
      toast(t('enrolment.errors.updateFailed'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  React.useEffect(() => {
    if (enrolmentData) {
      const enrolment = enrolmentData.enrolment;
      setInitialValues({
        hasEmailNotification:
          enrolment?.notificationType === NotificationType.Email ||
          enrolment?.notificationType === NotificationType.EmailSms,
        hasSmsNotification:
          enrolment?.notificationType === NotificationType.Sms ||
          enrolment?.notificationType === NotificationType.EmailSms,
        isSameResponsiblePerson:
          enrolment?.person?.id === enrolment?.studyGroup.person.id,
        minGroupSize: enrolmentData.enrolment?.occurrence.minGroupSize || 0,
        maxGroupSize: enrolmentData.enrolment?.occurrence.maxGroupSize || 0,
        studyGroup: {
          amountOfAdult: enrolment?.studyGroup.amountOfAdult?.toString() || '',
          groupSize: enrolment?.studyGroup.groupSize.toString() || '',
          groupName: enrolment?.studyGroup.groupName || '',
          name: enrolment?.studyGroup.name || '',
          studyLevel: enrolment?.studyGroup.studyLevel || '',
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

  return (
    <PageWrapper title="createEvent.pageTitle">
      <LoadingSpinner isLoading={loading}>
        {enrolmentData && (
          <div className={styles.editEnrolmentPage}>
            <Container>
              <h1>{t('enrolment.editEnrolmentTitle')}</h1>
              {/* TODO: add information about occurrence or something atfer we have design */}
              <EnrolmentForm
                onSubmit={handleSubmit}
                initialValues={initialValues}
              />
            </Container>
          </div>
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default EditorEnrolmentPage;
