import classNames from 'classnames';
import { Button, RadioButton } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import ConfirmationModal from '../../../common/components/modal/ConfirmationModal';
import {
  EventFieldsFragment,
  usePublishSingleEventMutation,
} from '../../../generated/graphql';
import { PUBLICATION_STATUS } from '../../events/constants';
import { getEventPublishedTime } from '../../occurrences/utils';
import { getPublishEventPayload } from '../utils';
import styles from './eventPublish.module.scss';

interface Props {
  event: EventFieldsFragment;
}

const EventPublish: React.FC<Props> = ({ event }) => {
  //temporary accessibility change pt-598
  const IS_ADVANCED_PUBLISH = false;

  const organisationId = event?.pEvent?.organisation?.id || '';

  const { t } = useTranslation();
  const [publishEvent] = usePublishSingleEventMutation();

  const [showPublishModal, setShowPublishModal] = React.useState(false);

  const isEventPublished =
    event?.publicationStatus === PUBLICATION_STATUS.PUBLIC;

  const handlePublishEvent = async () => {
    try {
      if (event) {
        await publishEvent({
          variables: {
            event: getPublishEventPayload({
              event: event,
              organisationId,
            }),
          },
        });
      }
      toast.success(t('eventSummary.eventHasBeenPublished'));
    } catch (error) {
      toast.error(t('occurrences.errorEventPublicationFailed'));
      // eslint-disable-next-line no-console
      console.error('Failed to publish event', { error });
    }
    setShowPublishModal(false);
  };

  const handlePublishEventClick = async () => {
    setShowPublishModal(true);
  };

  return (
    <div>
      {IS_ADVANCED_PUBLISH && (
        <div className={styles.sectionTitleRow}>
          <h2>{t('occurrences.titleEventPublishment')}</h2>
        </div>
      )}
      <div
        className={classNames(
          styles.publishSection,
          !IS_ADVANCED_PUBLISH && !isEventPublished && styles.publishButtonOnly
        )}
      >
        {isEventPublished ? (
          <>
            <div>
              {t('occurrences.publishSection.textPublishedTime')}{' '}
              {getEventPublishedTime(event)}
            </div>
            {/*TODO: Implement unpublish*/}
            {/* <Button
              className={styles.publishButton}
              onClick={() => alert('TODO: implement unpublish')}
            >
              {t('occurrences.publishSection.buttonCancelPublishment')}
            </Button> */}
          </>
        ) : (
          <>
            {IS_ADVANCED_PUBLISH && (
              <>
                <div>{t('occurrences.titleEventPublishment')}: </div>
                <RadioButton
                  label={t('occurrences.publishSection.optionNow')}
                  id="publish-now"
                  checked
                />
              </>
            )}
            <Button
              className={styles.publishButton}
              onClick={handlePublishEventClick}
            >
              {IS_ADVANCED_PUBLISH
                ? t('occurrences.publishSection.buttonSetPublishedAdvanced')
                : t('occurrences.publishSection.buttonSetPublished')}
            </Button>
          </>
        )}
      </div>
      <ConfirmationModal
        isOpen={showPublishModal}
        onConfirm={handlePublishEvent}
        confirmButtonText={t(
          'occurrences.publishSection.confirmPublicationButton'
        )}
        title={t('occurrences.publishSection.confirmModalTitle')}
        toggleModal={() => setShowPublishModal(false)}
      >
        <p>{t('occurrences.publishSection.confirmText1')}</p>
        <p>{t('occurrences.publishSection.confirmText2')}</p>
      </ConfirmationModal>
    </div>
  );
};

export default EventPublish;
