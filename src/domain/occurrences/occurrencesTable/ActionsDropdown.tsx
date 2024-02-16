import { saveAs } from 'file-saver';
import {
  IconCalendarPlus,
  IconCross,
  IconCrossCircle,
  IconPenLine,
  IconUser,
} from 'hds-react';
import { createEvent, EventAttributes } from 'ics';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import AlertModal from '../../../common/components/modal/AlertModal';
import TableDropdown, {
  MenuItemProps,
} from '../../../common/components/tableDropdown/TableDropdown';
import {
  EventFieldsFragment,
  OccurrenceFieldsFragment,
  usePlaceQuery,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import useNavigate from '../../../hooks/useNavigate';
import getDateArray from '../../../utils/getDateArray';
import { getDomain } from '../../../utils/getDomain';
import getLocalisedString from '../../../utils/getLocalizedString';
import { ROUTES } from '../../app/routes/constants';
import { EnrolmentType } from '../../occurrence/constants';
import { getPlaceFields } from '../../place/utils';
import styles from './actionsDropdown.module.scss';
import CancelOccurrenceModal from './CancelOccurrenceModal';

export interface Props {
  eventId: string;
  isEventDraft?: boolean;
  onDelete?: (row: OccurrenceFieldsFragment) => void;
  onCancel?: (row: OccurrenceFieldsFragment, message?: string) => void;
  row: OccurrenceFieldsFragment;
  event?: EventFieldsFragment | null;
  enrolmentType: EnrolmentType;
}

const ActionsDropdown: React.FC<Props> = ({
  eventId,
  event,
  onDelete,
  onCancel,
  isEventDraft,
  enrolmentType,
  row,
}) => {
  const { t } = useTranslation();
  const { pushWithReturnPath, pushWithLocale } = useNavigate();
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = React.useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const placeId = row.placeId || event?.location?.id || '';
  const { data, loading: loadingPlace } = usePlaceQuery({
    variables: { id: placeId },
  });

  const {
    streetAddress,
    addressLocality,
    name: locationName,
  } = getPlaceFields(data?.place, locale);

  const downloadIcsFile = (occurrence: OccurrenceFieldsFragment) => {
    if (event?.id && occurrence.startTime) {
      const domain = getDomain();
      const icsEvent: EventAttributes = {
        title: getLocalisedString(event?.name || {}, locale),
        description: getLocalisedString(event.shortDescription ?? {}, locale),
        start: getDateArray(occurrence.startTime),
        end: occurrence.endTime
          ? getDateArray(occurrence.endTime)
          : getDateArray(occurrence.startTime),
        location: [locationName, streetAddress, addressLocality]
          .filter((e) => e)
          .join(', '),
        productId: domain,
        startOutputType: 'local',
      };
      createEvent(icsEvent, (error: Error | undefined, value: string) => {
        if (error) {
          toast.error(t('occurrences.downloadCalendarError'));
        } else {
          const blob = new Blob([value], { type: 'text/calendar' });
          saveAs(blob, `event_${event.id?.replace(/:/g, '')}.ics`);
        }
      });
    }
  };

  const goToOccurrenceDetailsPage = () => {
    pushWithReturnPath(
      ROUTES.OCCURRENCE_DETAILS.replace(':id', eventId).replace(
        ':occurrenceId',
        row.id
      )
    );
  };

  const goToEditOccurrencePage = () => {
    pushWithLocale(
      ROUTES.CREATE_OCCURRENCE.replace(':id', eventId).replace(
        ':occurrenceId',
        row.id
      )
    );
  };

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const openCancelModal = () => {
    setIsCancelModalOpen(true);
  };

  const handleDelete = () => {
    onDelete?.(row);
    toggleModal();
  };

  const handleCancel = (row: OccurrenceFieldsFragment, message?: string) => {
    onCancel?.(row, message);
    setIsCancelModalOpen(false);
  };

  const showCancelAction = !row.cancelled && onCancel;
  const canDelete = isEventDraft || row.cancelled;

  const items = [
    enrolmentType === EnrolmentType.Internal && {
      children: (
        <>
          <IconUser />
          {t('occurrences.actionsDropdown.menuItemEnrolments')}
        </>
      ),
      onClick: goToOccurrenceDetailsPage,
    },
    isEventDraft && {
      children: (
        <>
          <IconPenLine />
          {t('occurrences.actionsDropdown.menuItemEdit')}
        </>
      ),
      onClick: goToEditOccurrencePage,
    },
    !loadingPlace && {
      onClick: downloadIcsFile,
      children: (
        <>
          <IconCalendarPlus />
          {t('occurrences.actionsDropdown.menuItemAddToCalendar')}
        </>
      ),
    },
    showCancelAction && {
      onClick: openCancelModal,
      children: (
        <>
          <IconCross className={styles.iconDelete} />
          {t('occurrences.actionsDropdown.menuItemCancel')}
        </>
      ),
    },
    canDelete && {
      onClick: openDeleteModal,
      children: (
        <>
          <IconCrossCircle className={styles.iconDelete} />
          {t('occurrences.actionsDropdown.menuItemDelete')}
        </>
      ),
    },
  ].filter((i) => i) as MenuItemProps[];

  return (
    <div className={styles.actionsDropdown}>
      <AlertModal
        confirmButtonText={t('occurrences.deleteModal.buttonDelete')}
        onConfirm={handleDelete}
        isOpen={isModalOpen}
        title={t('occurrences.deleteModal.title')}
        toggleModal={toggleModal}
      >
        <p>{t('occurrences.deleteModal.text1')}</p>
        <p>{t('occurrences.deleteModal.text2')}</p>
      </AlertModal>
      {isCancelModalOpen && (
        <CancelOccurrenceModal
          occurrenceId={row.id}
          onClose={() => setIsCancelModalOpen(false)}
          cancelOccurrence={(message) => handleCancel(row, message)}
        />
      )}

      <TableDropdown items={items} row={row} />
    </div>
  );
};

export default ActionsDropdown;
