import classNames from 'classnames';
import { Button, Checkbox, TextArea } from 'hds-react';
import React from 'react';

import { PersonFieldsFragment } from '../../../../generated/graphql';
import EnrolleesList from './EnrolleesList';
import EnrolmentModal from './EnrolmentModal';
import styles from './modal.module.scss';

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  approveEnrolment: () => void;
  enrollees?: PersonFieldsFragment[];
}

const ApproveEnrolmentModal: React.FC<ApproveModalProps> = ({
  isOpen,
  onClose,
  approveEnrolment,
  enrollees,
}) => {
  const [messageText, setMessageText] = React.useState('');
  const [showMessageTextArea, setShowMessageTextArea] = React.useState(false);

  return (
    <EnrolmentModal
      isOpen={isOpen}
      onClose={onClose}
      title="Vahvista ilmoittautuminen"
    >
      <div className={styles.infoNoteSuccess}>
        Valittujien ilmoittautujien osallistumista ei vahvisteta. Heille
        lähetetään tieto jäämisestä ilman paikkaa.
      </div>
    </EnrolmentModal>
  );
};

export default ApproveEnrolmentModal;
