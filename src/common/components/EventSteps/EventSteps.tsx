import classNames from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import SrOnly from '../SrOnly/SrOnly';
import styles from './EventSteps.module.scss';

interface EventStepsProps {
  step: 1 | 2 | 3;
}

const EventSteps: React.FC<EventStepsProps> = ({ step }) => {
  const { t } = useTranslation();
  const stepTitles = [
    t('createEvent.stepTitles.titleBasicInfo'),
    t('createEvent.stepTitles.titleOccurrences'),
    t('createEvent.stepTitles.titlePublish'),
  ];

  return (
    <>
      <div className={styles.formSteps} aria-hidden="true">
        {stepTitles.map((title, i) => (
          <div
            key={title}
            className={classNames({ [styles.active]: i + 1 === step })}
          >
            {`${i + 1}. ${title}`}
          </div>
        ))}
      </div>
      <SrOnly>
        <p>{`${step}. ${stepTitles[step - 1]}`}</p>
      </SrOnly>
    </>
  );
};

export default EventSteps;
