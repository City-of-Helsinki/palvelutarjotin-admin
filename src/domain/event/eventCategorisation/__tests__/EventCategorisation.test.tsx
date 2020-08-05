import { render, screen } from '@testing-library/react';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';

import eventData from '../__mocks__/eventData.json';
import { EventQuery } from '../../../../generated/graphql';
import EventCategorisation from '../EventCategorisation';

test('matches snapshot', () => {
  const { container } = render(
    <EventCategorisation eventData={eventData as EventQuery} language="fi" />
  );

  expect(container).toMatchSnapshot();
});

test('renders ands display information correctly', () => {
  render(
    <EventCategorisation eventData={eventData as EventQuery} language="fi" />
  );

  // titles
  expect(screen.queryByText('Tapahtuma on ilmainen')).toBeVisible();
  expect(
    screen.queryByRole('heading', { name: 'Tapahtuman luokittelut' })
  ).toBeVisible();
  expect(screen.queryByText('Tapahtuman kielet')).toBeVisible();
  expect(screen.queryByText('Tapahtuman avainsanat')).toBeVisible();
  expect(screen.queryByText('Hinta, €')).toBeVisible();
  expect(screen.queryByText('Tarvittavat käyntikerrat')).toBeVisible();

  // data
  expect(screen.queryByText('englanti, suomi')).toBeVisible();
  expect(screen.queryByText('maahanmuuttajat, perheet')).toBeVisible();
  expect(screen.queryByText('Tapahtuma on ilmainen')).toBeVisible();
  expect(screen.queryByText('3')).toBeVisible();
  expect(screen.queryByText('-')).toBeInTheDocument();
});

test('show correct texts with different data', () => {
  const newEventData = cloneDeep(eventData);
  newEventData.event.keywords.push({
    name: {
      fi: 'eläkeläiset',
    },
  } as any);
  newEventData.event.pEvent.neededOccurrences = 4;
  newEventData.event.inLanguage.push({
    name: {
      fi: 'ruotsi',
    },
  } as any);
  (newEventData.event.audience as any).push({
    name: {
      fi: 'eläkeläiset',
    },
  } as any);
  render(
    <EventCategorisation eventData={newEventData as EventQuery} language="fi" />
  );

  expect(
    screen.queryByText('eläkeläiset, maahanmuuttajat, perheet')
  ).toBeVisible();
  expect(screen.queryByText('4')).toBeVisible();
  expect(screen.queryByText('englanti, ruotsi, suomi')).toBeVisible();
  expect(screen.queryByText('eläkeläiset')).toBeVisible();
  expect(screen.queryByText('-')).not.toBeInTheDocument();
});
