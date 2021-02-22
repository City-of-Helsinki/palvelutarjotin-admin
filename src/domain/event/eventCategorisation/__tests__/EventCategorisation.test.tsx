import { render, screen } from '@testing-library/react';
import cloneDeep from 'lodash/cloneDeep';
import * as React from 'react';

import {
  fakeEvent,
  fakeInLanguage,
  fakeKeyword,
  fakeLocalizedObject,
} from '../../../../utils/mockDataUtils';
import EventCategorisation from '../EventCategorisation';

const event = fakeEvent({
  keywords: [
    fakeKeyword({ name: fakeLocalizedObject('perheet') }),
    fakeKeyword({ name: fakeLocalizedObject('maahanmuuttajat') }),
    fakeKeyword({
      name: fakeLocalizedObject('maahanmuuttajat'),
      id: 'teatteri',
    }),
    fakeKeyword({ name: fakeLocalizedObject('Työpaja'), id: 'työpaja' }),
  ],
  categories: [
    fakeKeyword({ name: fakeLocalizedObject('Musiikki') }),
    fakeKeyword({ name: fakeLocalizedObject('Teatteri'), id: 'teatteri' }),
  ],
  additionalCriteria: [
    fakeKeyword({ name: fakeLocalizedObject('Luontokoulu') }),
    fakeKeyword({ name: fakeLocalizedObject('Työpaja'), id: 'työpaja' }),
  ],
  inLanguage: [
    fakeInLanguage({ name: fakeLocalizedObject('englanti') }),
    fakeInLanguage({ name: fakeLocalizedObject('suomi') }),
  ],
});

test('matches snapshot', () => {
  const { container } = render(
    <EventCategorisation eventData={{ event }} language="fi" />
  );

  expect(container).toMatchSnapshot();
});

test('renders and displays information correctly', () => {
  render(<EventCategorisation eventData={{ event }} language="fi" />);

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
  expect(screen.queryByText('Luontokoulu, Työpaja')).toBeVisible();
  expect(screen.queryByText('Musiikki, Teatteri')).toBeVisible();
  expect(screen.queryByText('Tapahtuma on ilmainen')).toBeVisible();
  expect(screen.queryByText('3')).toBeVisible();
  expect(screen.queryByText('-')).toBeInTheDocument();
});

test('show correct texts with different data', () => {
  const newEventData = cloneDeep(event);
  newEventData.keywords.push({
    name: {
      fi: 'eläkeläiset',
    },
  } as any);
  newEventData.pEvent.neededOccurrences = 4;
  newEventData.inLanguage.push({
    name: {
      fi: 'ruotsi',
    },
  } as any);
  (newEventData.audience as any).push({
    name: {
      fi: 'eläkeläiset',
    },
  } as any);
  render(
    <EventCategorisation eventData={{ event: newEventData }} language="fi" />
  );

  expect(
    screen.queryByText('eläkeläiset, maahanmuuttajat, perheet')
  ).toBeVisible();
  expect(screen.queryByText('4')).toBeVisible();
  expect(screen.queryByText('englanti, ruotsi, suomi')).toBeVisible();
  expect(screen.queryByText('eläkeläiset')).toBeVisible();
  expect(screen.queryByText('-')).not.toBeInTheDocument();
});
