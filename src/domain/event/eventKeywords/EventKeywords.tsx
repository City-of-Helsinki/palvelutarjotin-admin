import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getLocalisedString from '../../../utils/getLocalizedString';
import { isEventFree } from '../utils';
import styles from './eventKeywords.module.scss';

interface Props {
  event: EventFieldsFragment;
}

const EventKeywords = ({ event }: Props): ReactElement => {
  const { t } = useTranslation();
  const locale = useLocale();

  const keywords = [
    isEventFree(event) && t('events.eventCard.free'),
    ...event.keywords.map((keyword) =>
      getLocalisedString(keyword.name || {}, locale)
    ),
  ].filter((k) => k);

  return (
    <div className={styles.eventKeywords}>
      {keywords.map((keyword, index) => {
        return (
          <div key={index} className={styles.keyword}>
            {keyword}
          </div>
        );
      })}
    </div>
  );
};

export default EventKeywords;
