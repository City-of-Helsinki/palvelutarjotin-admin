import { Button, TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';

import useNavigate from '../../../hooks/useNavigate';
import { ROUTES } from '../../app/routes/constants';
import styles from '../eventsPage.module.scss';
import PlaceSelector from './PlaceSelector';
import { useEventsSearchFormContext } from '../hooks/useEventsSearchFormContext';

export default function EventsSearchForm() {
  const { t } = useTranslation();
  const { pushWithLocale } = useNavigate();
  const { inputValue, setInputValue, placesValue, setPlacesValue } =
    useEventsSearchFormContext();

  const goToCreateEventPage = () => {
    pushWithLocale(ROUTES.CREATE_EVENT);
  };

  const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
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
  );
}
