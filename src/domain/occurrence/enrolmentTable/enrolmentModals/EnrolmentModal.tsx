import classNames from 'classnames';
import { Button, Checkbox, IconCross, Notification, TextArea } from 'hds-react';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';

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
  appElement?: HTMLElement;
  enrollees?: EnrolleeProps[];
  noteText?: string | ReactNode;
  noteType?: 'success' | 'decline';
  noteSection?: boolean;
  submitButtonText: string;
  handleSubmit: () => void;
  preview?: ReactNode | null;
  handlePreviewClick?: () => void;
  onMessageTextChange?: (message: string) => void;
  showPreviewButton?: boolean;
  messageText?: string;
  submitting?: boolean;
}

const EnrolmentModal: React.FC<EnrolmentModalProps> = ({
  children,
  title,
  appElement,
  enrollees,
  noteText,
  noteType = 'success',
  noteSection,
  submitButtonText,
  preview,
  messageText,
  showPreviewButton,
  submitting = false,
  handleSubmit,
  handlePreviewClick,
  onMessageTextChange,
  onClose,
}) => {
  const { t } = useTranslation();
  const [showMessageTextArea, setShowMessageTextArea] = React.useState(false);
  const hasEnrollees = enrollees && enrollees.length > 0;

  const renderModalContent = () => {
    return (
      <>
        {noteText && (
          <div
            className={classNames({
              [styles.infoNoteSuccess]: noteType === 'success',
              [styles.infoNoteDecline]: noteType === 'decline',
            })}
          >
            {noteText}
          </div>
        )}
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
        <div className={styles.buttonsContainer}>
          <Button variant="secondary" onClick={onClose}>
            {t('enrolment.enrolmentModal.cancelEnrolment')}
          </Button>
          <div className={styles.buttonsRight}>
            {/* TODO: preview functionality */}
            {showPreviewButton && (
              <Button
                iconLeft={<div></div>}
                variant="supplementary"
                onClick={handlePreviewClick}
              >
                {t('enrolment.enrolmentModal.preview')}
              </Button>
            )}
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitButtonText}
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <ReactModal
      isOpen
      bodyOpenClassName={styles.bodyOpen}
      className={classNames(styles.modal)}
      overlayClassName={styles.overlay}
      appElement={appElement}
    >
      <div className={styles.titleRow}>
        <p>{title}</p>
        <button className={styles.closeButton} onClick={onClose}>
          <IconCross />
          {t('common.buttonClose')}
        </button>
      </div>
      {preview ? preview : renderModalContent()}
      {children}
    </ReactModal>
  );
};

export default EnrolmentModal;
