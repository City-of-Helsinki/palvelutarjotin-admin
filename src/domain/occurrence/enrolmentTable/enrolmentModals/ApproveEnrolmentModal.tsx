import { Button, Checkbox, TextArea } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import EmailPreview from '../../../../common/components/emailPreview/EmailPreview';
import { PersonFieldsFragment } from '../../../../generated/graphql';
import { TEMPLATE_TYPE } from '../../../enrolment/types';
import EnrolleesList from './EnrolleesList';
import EnrolmentModal from './EnrolmentModal';
import styles from './enrolmentModals.module.scss';

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  approveEnrolment: (message: string) => void;
  enrollees?: PersonFieldsFragment[];
  // for testing purposes
  appElement?: HTMLElement;
  loading?: boolean;
}

const ApproveEnrolmentModal: React.FC<ApproveModalProps> = ({
  isOpen,
  onClose,
  approveEnrolment,
  enrollees,
  loading = false,
  appElement,
}) => {
  const { t } = useTranslation();
  const [messageText, setMessageText] = React.useState('');
  const [showPreview, setShowPreview] = React.useState(false);
  const [showMessageTextArea, setShowMessageTextArea] = React.useState(false);

  const handleShowPreviewClick = () => {
    setShowPreview(true);
  };

  return (
    <EnrolmentModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('enrolment.enrolmentModal.approveEnrolment')}
      appElement={appElement}
    >
      {showPreview ? (
        <EmailPreview
          templateType={TEMPLATE_TYPE.ENROLMENT_APPROVED}
          onClose={() => setShowPreview(false)}
        />
      ) : (
        <>
          <div className={styles.infoNoteSuccess}>
            {t('enrolment.enrolmentModal.approveEnrolmentNote')}
          </div>
          <EnrolleesList enrollees={enrollees} />
          <div className={styles.addNoteSection}>
            <Checkbox
              className={styles.noteCheckbox}
              onChange={() => setShowMessageTextArea(!showMessageTextArea)}
              checked={showMessageTextArea}
              id="add-note"
              label={t('enrolment.enrolmentModal.addMessage')}
            />
            {showMessageTextArea && (
              <TextArea
                className={styles.noteTextArea}
                value={messageText}
                id="note-text-area"
                label={t('enrolment.enrolmentModal.messageToParticipants')}
                onChange={(e) => setMessageText(e.target.value)}
              />
            )}
          </div>
          <div className={styles.buttonsContainer}>
            <Button variant="secondary" onClick={onClose}>
              {t('enrolment.enrolmentModal.cancelEnrolment')}
            </Button>
            <div className={styles.buttonsRight}>
              {/* TODO: preview functionality */}
              <Button variant="supplementary" onClick={handleShowPreviewClick}>
                {t('enrolment.enrolmentModal.preview')}
              </Button>
              <Button
                variant="primary"
                onClick={() => approveEnrolment(messageText)}
                disabled={loading}
              >
                {t('enrolment.enrolmentModal.sendConfirmationMessage')}
              </Button>
            </div>
          </div>
        </>
      )}
    </EnrolmentModal>
  );
};

export default ApproveEnrolmentModal;
