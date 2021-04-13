import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';

import { useEventQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import CreateEventPage from './CreateEventPage';
import {
  createEventAlwaysEmptyInitialValues,
  createEventInitialValues,
} from './eventForm/EventForm';
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

  const [initialValues, setInitialValues] = useState<CreateEventFormFields>(
    createEventInitialValues
  );

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
    if (eventData && selectedLanguage) {
      setInitialValues({
        ...createEventInitialValues,
        ...getEventFormValues(eventData, selectedLanguage),
        ...createEventAlwaysEmptyInitialValues,
      });
    }
  }, [eventData, selectedLanguage]);

  return (
    <CreateEventPage
      initialValues={initialValues}
      loading={loading}
      selectedLanguage={selectedLanguage}
      setSelectedLanguage={setSelectedLanguage}
    />
  );
};

export default CopyEventPage;
