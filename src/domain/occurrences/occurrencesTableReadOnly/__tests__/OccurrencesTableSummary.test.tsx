import * as React from 'react';

import { PalvelutarjotinEventNode } from '../../../../generated/graphql';
import formatDate from '../../../../utils/formatDate';
import formatTimeRange from '../../../../utils/formatTimeRange';
import {
  fakeEvent,
  fakeOccurrence,
  fakePEvent,
} from '../../../../utils/mockDataUtils';
import { render, screen } from '../../../../utils/testUtils';
import OccurrencesTableSummary, { Props } from '../OccurrencesTableSummary';

const locale = 'fi';
const startTime = new Date(2020, 11, 11).toISOString();
const endTime = new Date(2020, 11, 11).toISOString();
const timeRange = formatTimeRange(
  new Date(startTime),
  new Date(endTime),
  locale
);

const mockOccurrence = fakeOccurrence({
  id: 'occurrenceId1',
  startTime: startTime,
  endTime: endTime,
  amountOfSeats: 240,
  placeId: null,
  pEvent: fakePEvent({
    id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
    enrolmentStart: new Date(),
  }),
});

const renderComponent = (props?: Partial<Props>) => {
  return render(
    <OccurrencesTableSummary occurrences={[mockOccurrence]} {...props} />
  );
};

it('show occurrence data in the table in correct format', () => {
  renderComponent();
  //date
  expect(screen.getByText(formatDate(new Date(startTime)))).toBeInTheDocument();
  //time
  expect(screen.getByText(timeRange)).toBeInTheDocument();
  //place
  expect(screen.getByText(/-/i)).toBeInTheDocument();
  //amount of sits
  expect(screen.getByText(/240/i)).toBeInTheDocument();

  // row text to check the order of columns
  const occurrenceRowText =
    '11.12.2020 00:00 – 00:00 - 240 0 hyväksytty 0 hyväksymättä Valitse';
  const occurrenceRow = screen.getByRole('row', {
    name: occurrenceRowText,
  });
  expect(occurrenceRow).toBeInTheDocument();
});

it('show occurrence data in the table in correct format when enrolments are not done internally', () => {
  renderComponent({
    eventData: {
      event: fakeEvent({
        pEvent: fakePEvent({
          enrolmentStart: null,
          externalEnrolmentUrl: null,
        }),
      }),
    },
  });
  expect(screen.getByText(/Tapahtumapaikka/i)).toBeInTheDocument();
  expect(screen.getByText(/Toiminnot/i)).toBeInTheDocument();
  expect(screen.queryByText(/Ilm. alkaa/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Ilmoittautuneita/i)).not.toBeInTheDocument();
});
