import {
  Button,
  ButtonPresetTheme,
  ButtonVariant,
  Checkbox,
  Dialog,
  DialogVariant,
  IconAlertCircle,
  IconInfoCircle,
  Notification,
  TextArea,
} from 'hds-react';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import EnrolleesList from './EnrolleesList';
import styles from './enrolmentModals.module.scss';

export type EnrolleeProps = {
  personName?: string;
  studyGroupName?: string | null;
  studyLevel?: string | null;
  groupSize?: number | null;
  amountOfAdult?: number | null;
};

interface EnrolmentModalProps {
  onClose: () => void;
  title: string;
  enrollees?: EnrolleeProps[];
  noteText?: string | ReactNode;
  noteType?: 'error' | 'success';
  noteSection?: boolean;
  submitButtonText: string;
  handleSubmit: () => void;
  preview?: ReactNode | null;
  onMessageTextChange?: (message: string) => void;
  messageText?: string;
  submitting?: boolean;
  children?: React.ReactNode;
  variant?: DialogVariant;
}

const EnrolmentModal: React.FC<EnrolmentModalProps> = ({
  children,
  title,
  enrollees,
  noteText,
  noteType = 'success',
  noteSection,
  submitButtonText,
  preview,
  messageText,
  submitting = false,
  handleSubmit,
  onMessageTextChange,
  onClose,
  variant,
}) => {
  const { t } = useTranslation();
  const [showMessageTextArea, setShowMessageTextArea] = React.useState(false);
  const hasEnrollees = enrollees && enrollees.length > 0;

  const renderModalContent = () => {
    return (
      <>
        {noteText && <Notification type={noteType}>{noteText}</Notification>}
        {hasEnrollees && <EnrolleesList enrollees={enrollees} />}
        {noteSection && (
          <div className={styles.addNoteSection}>
            <Checkbox
              className={styles.noteCheckbox}
              onChange={() => setShowMessageTextArea(!showMessageTextArea)}
              checked={showMessageTextArea}
              id="add-note"
              label={t('enrolment.enrolmentModal.addMessage')}
            />
            {noteType === 'success' && (
              <div className={styles.formRow}>
                <Notification
                  label={t('eventOccurrenceForm.infoTitleAutoAcceptance')}
                >
                  {t('eventOccurrenceForm.infoContentAutoAcceptance')}
                </Notification>
              </div>
            )}
            {showMessageTextArea && (
              <div>
                <TextArea
                  className={styles.noteTextArea}
                  value={messageText}
                  id="note-text-area"
                  label={t('enrolment.enrolmentModal.messageToParticipants')}
                  onChange={(e) => onMessageTextChange?.(e.target.value)}
                />
              </div>
            )}
          </div>
        )}
      </>
    );
  };

  const id = 'alert-modal';
  const titleId = `${id}-title`;
  const descriptionId = `${id}-content`;

  return (
    <Dialog
      id={id}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className={styles.modal}
      isOpen={true}
      variant={variant}
      title={title}
      close={onClose}
      closeButtonLabelText={t('common.close')}
      style={{ width: 660 }}
    >
      <Dialog.Header
        id={titleId}
        title={title}
        iconStart={
          variant === 'danger' ? <IconAlertCircle /> : <IconInfoCircle />
        }
      />
      <Dialog.Content id={descriptionId}>
        {preview ? preview : renderModalContent()}
        {children}
      </Dialog.Content>
      <Dialog.ActionButtons>
        <Button
          theme={variant === 'danger' ? ButtonPresetTheme.Black : undefined}
          variant={ButtonVariant.Secondary}
          onClick={onClose}
        >
          {t('enrolment.enrolmentModal.cancelEnrolment')}
        </Button>
        <Button
          variant={
            variant === 'danger' ? ButtonVariant.Danger : ButtonVariant.Primary
          }
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitButtonText}
        </Button>
      </Dialog.ActionButtons>
    </Dialog>
  );
};

export default EnrolmentModal;
