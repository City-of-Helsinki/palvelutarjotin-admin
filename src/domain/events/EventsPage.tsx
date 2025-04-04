import { EventsSearchProvider } from './contextProviders/EventsSearchProvider';
import styles from './eventsPage.module.scss';
import EventsSearchForm from './search/EventsSearchForm';
import EventsSearchResults from './search/EventsSearchResults';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';

export default function EventsPage() {
  return (
    <PageWrapper>
      <Container>
        <div className={styles.eventsPage}>
          <ActiveOrganisationInfo as="h1" />
          <EventsSearchProvider>
            <EventsSearchForm />
            <EventsSearchResults />
          </EventsSearchProvider>
        </div>
      </Container>
    </PageWrapper>
  );
}
