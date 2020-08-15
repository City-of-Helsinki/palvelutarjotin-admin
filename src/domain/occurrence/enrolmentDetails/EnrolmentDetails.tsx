import { format } from 'date-fns';
import {
  Button,
  IconArrowLeft,
  IconCheck,
  IconCross,
  IconCrossCircle,
  IconPen,
} from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../../common/components/loadingSpinner/LoadingSpinner';
import {
  EnrolmentStatus,
  OccurrenceDocument,
  OccurrenceQuery,
  useApproveEnrolmentMutation,
  useDeclineEnrolmentMutation,
  useDeleteEnrolmentMutation,
  useEnrolmentQuery,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { translateValue } from '../../../utils/translateUtils';
import { ROUTES } from '../../app/routes/constants';
import styles from './enrolmentDetails.module.scss';
import EnrolmentInfoRow from './EnrolmentInfoRow';
import { getNotificationInfoText } from './utils';

const EnrolmentDetails: React.FC<{
  enrolmentId: string;
  occurrenceId: string;
  eventId: string;
  onGoBackClick: () => void;
}> = ({ enrolmentId, occurrenceId, eventId, onGoBackClick }) => {
  const history = useHistory();
  const locale = useLocale();
  const { t } = useTranslation();
  const { data: enrolmentData, loading: loadingEnrolment } = useEnrolmentQuery({
    variables: {
      id: enrolmentId,
    },
  });
  const enrolment = enrolmentData?.enrolment;
  const enrolmentIsNotApproved = enrolment?.status !== EnrolmentStatus.Approved;
  const enrolmentIsNotDeclined = enrolment?.status !== EnrolmentStatus.Declined;

  const [approveEnrolment] = useApproveEnrolmentMutation({
    onError: (error) => {
      toast(t('enrolment.approveEnrolmentError'), {
        type: toast.TYPE.ERROR,
      });
    },
  });

  const [declineEnrolment] = useDeclineEnrolmentMutation({
    onError: (error) => {
      toast(t('enrolment.declineEnrolmentError'), {
        type: toast.TYPE.ERROR,
      });
    },
  });

  const [deleteEnrolment] = useDeleteEnrolmentMutation({
    onError: (error) => {
      toast(t('enrolment.deleteEnrolmentError'), {
        type: toast.TYPE.ERROR,
      });
    },
  });

  const handleApproveEnrolment = async () => {
    approveEnrolment({ variables: { input: { enrolmentId } } });
  };

  const handleDeclineEnrolment = () => {
    declineEnrolment({ variables: { input: { enrolmentId } } });
  };

  const handleDeleteEnrolment = async () => {
    if (enrolment) {
      await deleteEnrolment({
        variables: {
          input: { occurrenceId, studyGroupId: enrolment.studyGroup.id },
        },
        update: (cache) => {
          const occurrenceData = cache.readQuery<OccurrenceQuery>({
            query: OccurrenceDocument,
            variables: { id: occurrenceId },
          });
          const occurrence = occurrenceData?.occurrence;
          // overwrite occurrence from cache (delete enrolment)
          cache.writeQuery({
            query: OccurrenceDocument,
            data: {
              occurrence: {
                ...occurrence,
                enrolments: {
                  ...occurrence?.enrolments,
                  edges: occurrence?.enrolments.edges.filter(
                    (e) => e?.node?.id !== enrolment.id
                  ),
                },
              },
            },
          });
        },
      });
      onGoBackClick();
    }
  };

  const getStudyLevel = () => {
    const studyLevel = enrolment?.studyGroup?.studyLevel;
    if (studyLevel) {
      return studyLevel.startsWith('GRADE')
        ? t('studyLevel.grade_interval', {
            postProcess: 'interval',
            count: Number(studyLevel.split('_')[1]),
          })
        : translateValue('studyLevel.', studyLevel, t);
    }
  };

  const handleEditEnrolment = () => {
    history.push(
      `/${locale}${ROUTES.EDIT_ENROLMENT}`
        .replace(':eventId', eventId)
        .replace(':enrolmentId', enrolmentId)
    );
  };

  return (
    <LoadingSpinner isLoading={loadingEnrolment}>
      {enrolment ? (
        <div className={styles.enrolmentDetails}>
          <div className={styles.backButtonContainer}>
            <button
              aria-label={t(
                'enrolment.enrolmentDetails.buttonGoToEnrolleesList'
              )}
              onClick={onGoBackClick}
            >
              <IconArrowLeft />
            </button>
          </div>

          <div className={styles.detailsSection}>
            <div className={styles.topRow}>
              <div>
                <span className={styles.enrolleesTitle}>
                  {t('enrolment.enrolmentDetails.buttonEnrolleesTitle')}
                </span>
              </div>
              <div className={styles.actionButtons}>
                {enrolmentIsNotApproved && (
                  <Button
                    className={styles.approveButton}
                    onClick={handleApproveEnrolment}
                    variant="secondary"
                    iconLeft={<IconCheck />}
                  >
                    {t('enrolment.enrolmentDetails.buttonApproveEnrolment')}
                  </Button>
                )}
                {enrolmentIsNotDeclined && (
                  <Button
                    className={styles.declineButton}
                    onClick={handleDeclineEnrolment}
                    variant="secondary"
                    iconLeft={<IconCross />}
                  >
                    {t('enrolment.enrolmentDetails.buttonDeclineEnrolment')}
                  </Button>
                )}
                <Button
                  className={styles.editButton}
                  onClick={handleEditEnrolment}
                  variant="secondary"
                  iconLeft={<IconPen />}
                >
                  {t('enrolment.enrolmentDetails.buttonEditEnrolment')}
                </Button>
                <Button
                  className={styles.deleteButton}
                  onClick={handleDeleteEnrolment}
                  variant="secondary"
                  iconLeft={<IconCrossCircle />}
                >
                  {t('enrolment.enrolmentDetails.buttonDeleteEnrolment')}
                </Button>
              </div>
            </div>
            <table className={styles.detailsTable}>
              <tbody>
                <EnrolmentInfoRow
                  label={t('enrolment.enrolmentDetails.labelEnrolled')}
                  value={format(
                    new Date(enrolment?.enrolmentTime),
                    'dd.MM.yyyy hh:mm'
                  )}
                />
                <EnrolmentInfoRow
                  label={t('enrolment.enrolmentDetails.labelStatus')}
                  value={translateValue(
                    'enrolment.status.',
                    enrolment.status,
                    t
                  )}
                />

                {enrolment.person && (
                  <>
                    <EnrolmentInfoRow
                      label={t('enrolment.enrolmentDetails.labelName')}
                      value={enrolment.person.name}
                      space
                    />
                    <EnrolmentInfoRow
                      label={t('enrolment.enrolmentDetails.labelEmail')}
                      value={enrolment.person.emailAddress}
                    />
                    <EnrolmentInfoRow
                      label={t('enrolment.enrolmentDetails.labelPhoneNumber')}
                      value={enrolment.person.phoneNumber}
                    />
                  </>
                )}

                <EnrolmentInfoRow
                  label={t('enrolment.enrolmentDetails.labelStudyGroupName')}
                  value={enrolment.studyGroup.name}
                  space
                />
                <EnrolmentInfoRow
                  label={t('enrolment.enrolmentDetails.labelGroupName')}
                  value={enrolment.studyGroup.groupName}
                />
                {enrolment.studyGroup.studyLevel && (
                  <EnrolmentInfoRow
                    label={t('enrolment.enrolmentDetails.labelStudyLevel')}
                    value={getStudyLevel()}
                  />
                )}

                <EnrolmentInfoRow
                  label={t('enrolment.enrolmentDetails.labelResponsiblePerson')}
                  value={enrolment.studyGroup.person.name}
                  space
                />
                <EnrolmentInfoRow
                  label={t('enrolment.enrolmentDetails.labelEmail')}
                  value={enrolment.studyGroup.person.emailAddress}
                />
                <EnrolmentInfoRow
                  label={t('enrolment.enrolmentDetails.labelPhoneNumber')}
                  value={enrolment.studyGroup.person.phoneNumber}
                />

                <EnrolmentInfoRow
                  label={t('enrolment.enrolmentDetails.labelNotifications')}
                  value={getNotificationInfoText(enrolment, t)}
                  space
                />
                <EnrolmentInfoRow
                  label={t('enrolment.enrolmentDetails.labelAdditionalInfo')}
                  value={enrolment.studyGroup.extraNeeds}
                  space
                />
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <button
            aria-label={t('enrolment.enrolmentDetails.buttonGoToEnrolleesList')}
            onClick={onGoBackClick}
          >
            <IconArrowLeft />
          </button>
          <p>{t('enrolment.enrolmentDetails.error')}</p>
        </div>
      )}
    </LoadingSpinner>
  );
};

export default EnrolmentDetails;
