import classNames from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './enrolmentStatusBadge.module.scss';
import {
  EnrolmentStatus,
  EventQueueEnrolmentStatus,
} from '../../../generated/graphql';
import { translateValue } from '../../../utils/translateUtils';

interface Props {
  status: EnrolmentStatus | EventQueueEnrolmentStatus;
}

const EnrolmentStatusBadge: React.FC<Props> = ({ status }) => {
  const { t } = useTranslation();
  return (
    <div
      className={classNames(
        styles.enrolmentStatusBadge,
        styles[status.toLocaleLowerCase()]
      )}
    >
      {translateValue('enrolment.status.', status, t)}
    </div>
  );
};

export default EnrolmentStatusBadge;
