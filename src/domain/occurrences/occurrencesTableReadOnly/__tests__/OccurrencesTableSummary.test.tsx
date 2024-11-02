import * as React from 'react';
import { waitFor } from '@testing-library/react';

import formatTimeRange from '../../../../utils/formatTimeRange';
import {
  fakeEvent,
  fakeOccurrence,
  fakePEvent,
  fakePlace,
} from '../../../../utils/mockDataUtils';
import { render, screen } from '../../../../utils/testUtils';
import { formatLocalizedDate } from '../../../../utils/time/format';
import OccurrencesTableSummary, { Props } from '../OccurrencesTableSummary';
import { PlaceDocument } from '../../../../generated/graphql';
import { createNotFoundPlaceQueryMock } from '../../../../test/apollo-mocks/placeMocks';

const startTime = new Date(2020, 11, 11).toISOString();
const endTime = new Date(2020, 11, 11).toISOString();
const timeRange = formatTimeRange(new Date(startTime), new Date(endTime));

const placeId = 'test-place-1';
const place = fakePlace({ id: placeId });

const mocks = [
  {
    request: {
      query: PlaceDocument,
      variables: {
        id: placeId,
      },
    },
    result: {
      data: {
        place,
      },
    },
  },
  createNotFoundPlaceQueryMock(''),
];

const mockOccurrence = fakeOccurrence({
  id: 'occurrenceId1',
  startTime: startTime,
  endTime: endTime,
  amountOfSeats: 240,
  placeId: undefined,
  pEvent: fakePEvent({
    id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
    enrolmentStart: new Date(),
  }),
});

const renderComponent = (props?: Partial<Props>) => {
  return render(
    <OccurrencesTableSummary
      loadingOccurrences={[]}
      occurrences={[mockOccurrence]}
      {...props}
    />,
    { mocks }
  );
};

it('show occurrence data in the table in correct format', () => {
  renderComponent();
  //date
  expect(
    screen.getByText(formatLocalizedDate(new Date(startTime)))
  ).toBeInTheDocument();
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

it('does not render enrolment info when enrolments are not done internally', async () => {
  renderComponent({
    eventData: {
      event: fakeEvent({
        location: place,
        pEvent: fakePEvent({
          enrolmentStart: null,
          externalEnrolmentUrl: null,
        }),
      }),
    },
  });
  expect(await screen.findByText(/Tapahtumapaikka/i)).toBeInTheDocument();
  expect(await screen.findByText(/Toiminnot/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByText(/Ilm. alkaa/i)).not.toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.queryByText(/Ilmoittautuneita/i)).not.toBeInTheDocument();
  });
});
