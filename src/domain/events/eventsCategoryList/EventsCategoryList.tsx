import { EventFieldsFragment } from '../../../generated/graphql';
import Events from './Events';
import EventsTitle from './EventsTitle';
import ShowMoreButton from './ShowMoreButton';

export interface EventsCategoryListProps {
  eventsCount: number;
  title: string;
  events: EventFieldsFragment[];
  onGoToEventSummaryPage: (id: string) => void;
  isLoadingMoreEvents: boolean;
  onFetchMoreEvents: () => Promise<void>;
  hasNextPage: boolean;
  notFoundText?: string;
}

const EventsCategoryList: React.FC<EventsCategoryListProps> = ({
  eventsCount,
  title,
  events,
  onGoToEventSummaryPage,
  isLoadingMoreEvents,
  onFetchMoreEvents,
  hasNextPage,
  notFoundText,
}) => {
  if (!!events.length) {
    return (
      <>
        <EventsTitle count={eventsCount} title={title} />
        <Events events={events} goToEventSummaryPage={onGoToEventSummaryPage} />
        {hasNextPage && (
          <ShowMoreButton
            loading={isLoadingMoreEvents}
            onClick={onFetchMoreEvents}
          />
        )}
      </>
    );
  }

  if (notFoundText) {
    return (
      <>
        <EventsTitle count={eventsCount} title={title} />
        <p>{notFoundText}</p>
      </>
    );
  }

  return null;
};

export default EventsCategoryList;
