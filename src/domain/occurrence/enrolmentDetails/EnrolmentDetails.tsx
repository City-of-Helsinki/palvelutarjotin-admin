import { ApolloQueryResult } from '@apollo/client';
import classNames from 'classnames';
import {
  Button,
  IconArrowLeft,
  IconCheck,
  IconCross,
  IconCrossCircle,
  IconPen,
} from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../../common/components/loadingSpinner/LoadingSpinner';
import {
  EnrolmentStatus,
  OccurrenceDocument,
  OccurrenceQuery,
  OccurrenceQueryVariables,
  StudyLevelNodeConnection,
  useApproveEnrolmentMutation,
  useDeclineEnrolmentMutation,
  useDeleteEnrolmentMutation,
  useEnrolmentQuery,
} from '../../../generated/graphql';
import useNavigate from '../../../hooks/useNavigate';
import { formatIntoDateTime } from '../../../utils/time/format';
import { translateValue } from '../../../utils/translateUtils';
import { ROUTES } from '../../app/routes/constants';
import { joinStudyLevelLabels } from '../../studyLevel/utils';
import ApproveEnrolmentModal from '../enrolmentTable/enrolmentModals/ApproveEnrolmentModal';
import DeclineEnrolmentModal from '../enrolmentTable/enrolmentModals/DeclineEnrolmentModal';
import DeleteEnrolmentModal from '../enrolmentTable/enrolmentModals/DeleteEnrolmentModal';
import styles from './enrolmentDetails.module.scss';
import EnrolmentInfoRow from './EnrolmentInfoRow';
import { getNotificationInfoText } from './utils';

interface EnrolmentDetailsProps {
  enrolmentId: string;
  occurrenceId: string;
  eventId: string;
  onGoBackClick: () => void;
  refetchOccurrence: (
    variables?: OccurrenceQueryVariables | undefined
  ) => Promise<ApolloQueryResult<OccurrenceQuery>>;
}

const EnrolmentDetails: React.FC<EnrolmentDetailsProps> = ({
  enrolmentId,
  occurrenceId,
  eventId,
  onGoBackClick,
  refetchOccurrence,
}) => {
  const { pushWithReturnPath } = useNavigate();
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

  const [approveEnrolment, { loading: loadingApproveEnrolment }] =
    useApproveEnrolmentMutation({
      onError: (error) => {
        toast(t('enrolment.approveEnrolmentError'), {
          type: toast.TYPE.ERROR,
        });
      },
      onCompleted: () => setApproveModalOpen(false),
    });

  const [declineEnrolment, { loading: loadingDeclineEnrolment }] =
    useDeclineEnrolmentMutation({
      onError: (error) => {
        toast(t('enrolment.declineEnrolmentError'), {
          type: toast.TYPE.ERROR,
        });
      },
      onCompleted: () => setDeclineModalOpen(false),
    });

  const [deleteEnrolment, { loading: loadingDeleteEnrolment }] =
    useDeleteEnrolmentMutation({
      onError: (error) => {
        toast(t('enrolment.deleteEnrolmentError'), {
          type: toast.TYPE.ERROR,
        });
      },
      onCompleted: () => {
        setDeleteModalOpen(false);
        // refetch occurrence to easily update seatsTaken info
        (async () => await refetchOccurrence())();
        onGoBackClick();
      },
    });

  const handleApproveEnrolment = (message?: string) => {
    (async () =>
      await approveEnrolment({
        variables: { input: { enrolmentId, customMessage: message } },
      }))();
  };

  const handleDeclineEnrolment = (message?: string) => {
    (async () =>
      await declineEnrolment({
        variables: { input: { enrolmentId, customMessage: message } },
      }))();
  };

  const handleDeleteEnrolment = () => {
    if (enrolment) {
      (async () =>
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
        }))();
    }
  };

  const handleEditEnrolment = () => {
    pushWithReturnPath(
      `${ROUTES.EDIT_ENROLMENT.replace(':eventId', eventId).replace(
        ':enrolmentId',
        enrolmentId
      )}`
    );
  };

  const enrollees = enrolment?.person
    ? [{ personName: enrolment.person.name }]
    : [];

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
              {approveModalOpen && (
                <ApproveEnrolmentModal
                  onClose={() => setApproveModalOpen(false)}
                  // TODO: Will there be a way to approve many at the same time?
                  enrollees={enrollees}
                  approveEnrolment={handleApproveEnrolment}
                  loading={loadingApproveEnrolment}
                />
              )}
              {declineModalOpen && (
                <DeclineEnrolmentModal
                  onClose={() => setDeclineModalOpen(false)}
                  // TODO: Will there be a way to decline many at the same time?
                  enrollees={enrollees}
                  declineEnrolment={handleDeclineEnrolment}
                  loading={loadingDeclineEnrolment}
                />
              )}
              {deleteModalOpen && (
                <DeleteEnrolmentModal
                  onClose={() => setDeleteModalOpen(false)}
                  deleteEnrolment={handleDeleteEnrolment}
                  loading={loadingDeleteEnrolment}
                />
              )}
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
                  value={formatIntoDateTime(new Date(enrolment?.enrolmentTime))}
                />
                <EnrolmentInfoRow
                  label={t('enrolment.enrolmentDetails.labelStatus')}
                  value={translateValue(
                    'enrolment.status.',
                    enrolment.status as string,
                    t
                  )}
                />

                <EnrolmentInfoRow
                  label={t('enrolment.enrolmentDetails.labelName')}
                  value={enrolment.studyGroup.person?.name}
                  space
                />
                <EnrolmentInfoRow
                  label={t('enrolment.enrolmentDetails.labelEmail')}
                  value={enrolment.studyGroup.person?.emailAddress}
                />
                <EnrolmentInfoRow
                  label={t('enrolment.enrolmentDetails.labelPhoneNumber')}
                  value={enrolment.studyGroup.person?.phoneNumber}
                />

                <EnrolmentInfoRow
                  label={t('enrolment.enrolmentDetails.labelStudyGroupName')}
                  value={enrolment.studyGroup.unitName}
                  space
                />
                <EnrolmentInfoRow
                  label={t('enrolment.enrolmentDetails.labelGroupName')}
                  value={enrolment.studyGroup.groupName}
                />
                {enrolment.studyGroup.studyLevels && (
                  <EnrolmentInfoRow
                    label={t('enrolment.enrolmentDetails.labelStudyLevel')}
                    value={joinStudyLevelLabels(
                      enrolment.studyGroup
                        .studyLevels as StudyLevelNodeConnection,
                      t
                    )}
                  />
                )}
                <EnrolmentInfoRow
                  label={t('enrolment.enrolmentDetails.labelAdditionalInfo')}
                  value={enrolment.studyGroup.extraNeeds}
                />

                {enrolment.person && (
                  <>
                    <EnrolmentInfoRow
                      label={t(
                        'enrolment.enrolmentDetails.labelResponsiblePerson'
                      )}
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
                  label={t('enrolment.enrolmentDetails.labelNotifications')}
                  value={getNotificationInfoText(enrolment, t)}
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
