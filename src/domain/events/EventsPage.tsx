import { Button, TextInput } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import useNavigate from '../../hooks/useNavigate';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import styles from './eventsPage.module.scss';
import useEventsPageContext from './hooks/useEventsPageContext';
import PlaceSelector from './PlaceSelector';
import EventsSearchResults from './search/EventsSearchResults';

const EventsPage: React.FC = () => {
  const { t } = useTranslation();
  const { pushWithLocale } = useNavigate();
  const eventsContext = useEventsPageContext();
  const { inputValue, setInputValue, placesValue, setPlacesValue } =
    eventsContext;

  const goToCreateEventPage = () => {
    pushWithLocale(ROUTES.CREATE_EVENT);
  };

  const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <PageWrapper>
      <Container>
        <div className={styles.eventsPage}>
          <ActiveOrganisationInfo as="h1" />
          <div className={styles.comingEventsTitleWrapper}>
            <div className={styles.searchWrapper}>
              <div>
                <TextInput
                  id="search"
                  placeholder={t('events.search.placeholderSearch')}
                  onChange={handleSearchFieldChange}
                  value={inputValue}
                  label={t('events.search.labelSearch')}
                />
              </div>
              <div>
                <PlaceSelector
                  onChange={(places) => setPlacesValue(places)}
                  value={placesValue}
                />
              </div>
              <div style={{ marginLeft: 'auto', marginTop: '28px' }}>
                <Button fullWidth={true} onClick={goToCreateEventPage}>
                  {t('events.buttonNewEvent')}
                </Button>
              </div>
            </div>
          </div>
          <EventsSearchResults eventsContext={eventsContext} />
        </div>
      </Container>
    </PageWrapper>
  );
};

export default EventsPage;
