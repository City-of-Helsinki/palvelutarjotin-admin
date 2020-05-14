import { number, text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../../app/i18n/i18nInit';
import EventCard from './EventCard';

const getKnobs = () => ({
  id: text('id', '123'),
  description: text('description', 'Event description'),
  enrolledCount: number('enrolledcount', 2),
  image: text('image', ''),
  name: text('name', 'Event name'),
  occurrencesCount: number('occurrencesCount', 2),
});

export default {
  title: 'EventCard',
  component: EventCard,
  decorators: [withKnobs],
};

const Container: React.FC = ({ children }) => (
  <div style={{ backgroundColor: '#eee', padding: '1rem' }}>{children}</div>
);

export const Default = () => {
  return (
    <Container>
      <EventCard {...getKnobs()} />
    </Container>
  );
};
