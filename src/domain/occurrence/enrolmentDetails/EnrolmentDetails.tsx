import classNames from 'classnames';
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
import ApproveEnrolmentModal from '../enrolmentTable/enrolmentModals/ApproveEnrolmentModal';
import DeclineEnrolmentModal from '../enrolmentTable/enrolmentModals/DeclineEnrolmentModal';
import DeleteEnrolmentModal from '../enrolmentTable/enrolmentModals/DeleteEnrolmentModal';
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
  const [approveModalOpen, setApproveModalOpen] = React.useState(false);
  const [declineModalOpen, setDeclineModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const { data: enrolmentData, loading: loadingEnrolment } = useEnrolmentQuery({
    variables: {
      id: enrolmentId,
    },
  });
  const enrolment = enrolmentData?.enrolment;
  const enrolmentIsNotApproved = enrolment?.status !== EnrolmentStatus.Approved;
  const enrolmentIsNotDeclined = enrolment?.status !== EnrolmentStatus.Declined;

  const [
    approveEnrolment,
    { loading: loadingApproveEnrolment },
  ] = useApproveEnrolmentMutation({
    onError: (error) => {
      toast(t('enrolment.approveEnrolmentError'), {
        type: toast.TYPE.ERROR,
      });
    },
    onCompleted: () => setApproveModalOpen(false),
  });

  const [
    declineEnrolment,
    { loading: loadingDeclineEnrolment },
  ] = useDeclineEnrolmentMutation({
    onError: (error) => {
      toast(t('enrolment.declineEnrolmentError'), {
        type: toast.TYPE.ERROR,
      });
    },
    onCompleted: () => setDeclineModalOpen(false),
  });

  const [deleteEnrolment] = useDeleteEnrolmentMutation({
    onError: (error) => {
      toast(t('enrolment.deleteEnrolmentError'), {
        type: toast.TYPE.ERROR,
      });
    },
    onCompleted: () => {
      setDeleteModalOpen(false);
      onGoBackClick();
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
              <ApproveEnrolmentModal
                isOpen={approveModalOpen}
                onClose={() => setApproveModalOpen(false)}
                // TODO: Will there be a way to approve many at the same time?
                enrollees={enrolment.person ? [enrolment?.person] : undefined}
                approveEnrolment={handleApproveEnrolment}
                loading={loadingApproveEnrolment}
              />
              <DeclineEnrolmentModal
                isOpen={declineModalOpen}
                onClose={() => setDeclineModalOpen(false)}
                // TODO: Will there be a way to decline many at the same time?
                enrollees={enrolment.person ? [enrolment?.person] : undefined}
                declineEnrolment={handleDeclineEnrolment}
                loading={loadingDeclineEnrolment}
              />
              <DeleteEnrolmentModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                deleteEnrolment={handleDeleteEnrolment}
              />
              <div className={styles.actionButtons}>
                {enrolmentIsNotApproved && (
                  <Button
                    className={classNames(
                      styles.approveButton,
                      styles.actionButton
                    )}
                    onClick={() => setApproveModalOpen(true)}
                    variant="secondary"
                    iconLeft={<IconCheck />}
                    disabled={loadingApproveEnrolment}
                  >
                    {t('enrolment.enrolmentDetails.buttonApproveEnrolment')}
                  </Button>
                )}
                {enrolmentIsNotDeclined && (
                  <Button
                    className={classNames(
                      styles.declineButton,
                      styles.actionButton
                    )}
                    onClick={() => setDeclineModalOpen(true)}
                    variant="secondary"
                    iconLeft={<IconCross />}
                    disabled={loadingDeclineEnrolment}
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
                  className={classNames(
                    styles.deleteButton,
                    styles.actionButton
                  )}
                  onClick={() => setDeleteModalOpen(true)}
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
