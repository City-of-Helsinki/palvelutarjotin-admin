import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';

import { useEventQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import CreateEventPage from './CreateEventPage';
import { createEventInitialValues } from './eventForm/EventForm';
import { CreateEventFormFields } from './types';
import {
  getEventFormValues,
  getEventLanguageFromUrl,
  getFirstAvailableLanguage,
} from './utils';

const CopyEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const locale = useLocale();
  const language = getEventLanguageFromUrl(location.search);

  const [selectedLanguage, setSelectedLanguage] = useState(language || locale);
  console.info('selectedLanguage', selectedLanguage);
  const [initialValues, setInitialValues] = useState<CreateEventFormFields>({
    ...createEventInitialValues,
    occurrenceDate: null,
    occurrenceStartsAt: '',
    occurrenceEndsAt: '',
  });

  const { data: eventData, loading } = useEventQuery({
    fetchPolicy: 'network-only',
    variables: {
      id,
      include: ['audience', 'in_language', 'keywords', 'location'],
    },
  });
  useEffect(() => {
    if (eventData) {
      setSelectedLanguage(language || getFirstAvailableLanguage(eventData));
    }
  }, [eventData, language]);

  useEffect(() => {
    console.log('eventData', eventData, 'selectedLanguage', selectedLanguage);
    if (eventData && selectedLanguage) {
      console.log('eventData', eventData, 'selectedLanguage', selectedLanguage);
      setInitialValues({
        ...createEventInitialValues,
        ...getEventFormValues(eventData, selectedLanguage),
      });
    }
  }, [eventData, selectedLanguage]);
  console.log('initialValues', initialValues, 'eventData', eventData);
  return <CreateEventPage initialValues={initialValues} loading={loading} />;
};

export default CopyEventPage;
