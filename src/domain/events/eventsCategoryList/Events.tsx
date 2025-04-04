import React from 'react';

import styles from './eventsCategoryList.module.scss';
import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import EventCard from '../../event/eventCard/EventCard';
import { getEventFields } from '../../event/utils';
import { getEnrolmentType } from '../../occurrence/utils';

export type EventsProps = {
  events: EventFieldsFragment[];
  goToEventSummaryPage: (id: string) => void;
};

function Events({
  events,
  goToEventSummaryPage,
}: Readonly<EventsProps>): React.ReactElement<EventsProps> {
  const locale = useLocale();

  const cards = events?.map((event) => {
    const {
      shortDescription,
      eventName = '',
      id,
      imageUrl,
      occurrences,
      totalSeatsTakes = 0,
      publicationStatus,
    } = getEventFields(event, locale);
    const enrolmentType = getEnrolmentType(event);
    return (
      <EventCard
        key={id || ''}
        description={shortDescription}
        enrolmentsCount={totalSeatsTakes}
        id={id || ''}
        image={imageUrl}
        name={eventName}
        occurrencesCount={occurrences?.length || 0}
        publicationStatus={publicationStatus}
        enrolmentType={enrolmentType}
        onClick={goToEventSummaryPage}
      />
    );
  });

  return <div className={styles.eventsContainer}>{cards}</div>;
}

export default Events;
