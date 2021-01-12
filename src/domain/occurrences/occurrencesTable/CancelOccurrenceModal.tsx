import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useOccurrenceQuery } from '../../../generated/graphql';
import EnrolmentModal from '../../occurrence/enrolmentTable/enrolmentModals/EnrolmentModal';

interface CancelOccurrenceModalProps {
  onClose: () => void;
  cancelOccurrence: (message?: string) => void;
  appElement?: HTMLElement;
  loading?: boolean;
  occurrenceId: string;
}

const CancelOccurrenceModal: React.FC<CancelOccurrenceModalProps> = ({
  onClose,
  cancelOccurrence,
  appElement,
  loading = false,
  occurrenceId,
}) => {
  const { t } = useTranslation();
  const [messageText, setMessageText] = React.useState('');
  const { data } = useOccurrenceQuery({
    variables: { id: occurrenceId },
  });

  const enrollees =
    data?.occurrence?.enrolments.edges.map((e) => ({
      personName: e?.node?.person?.name,
      studyGroupName: e?.node?.studyGroup.name,
      studyLevel: e?.node?.studyGroup.studyLevel,
      groupSize: e?.node?.studyGroup.groupSize,
      amountOfAdult: e?.node?.studyGroup.amountOfAdult,
    })) || [];

  return (
    <EnrolmentModal
      onClose={onClose}
      title={t('occurrences.cancelModal.title')}
      appElement={appElement}
      noteSection
      enrollees={enrollees}
      noteType="decline"
      noteText={
        <>
          <span>{t('occurrences.cancelModal.note1')}</span>
          <br />
          <br />
          <span>{t('occurrences.cancelModal.note2')}</span>
        </>
      }
      submitButtonText={t('enrolment.enrolmentModal.sendCancelMessage')}
      handleSubmit={() => cancelOccurrence(messageText)}
      submitting={loading}
      onMessageTextChange={(message) => setMessageText(message)}
      messageText={messageText}
    />
  );
};

export default CancelOccurrenceModal;
