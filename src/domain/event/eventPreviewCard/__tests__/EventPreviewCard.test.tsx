import { screen } from '@testing-library/react';
import * as React from 'react';

import { PlaceDocument } from '../../../../generated/graphql';
import {
  fakeEvent,
  fakeKeyword,
  fakeLocalizedObject,
  fakeOccurrences,
  fakePEvent,
  fakePlace,
} from '../../../../utils/mockDataUtils';
import { customRender } from '../../../../utils/testUtils';
import EventPreviewCard from '../EventPreviewCard';

const placeId = 'test-place-id';
const place = fakePlace({
  id: placeId,
  name: fakeLocalizedObject('Testipaikka'),
});

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
];

it('renders event information correctly and matches snapshot', () => {
  vi.setSystemTime(new Date(2021, 9, 20));
  const eventName = 'Testinimi';
  const description = 'Testikuvaus';
  const keywords = ['avainsana1', 'avainsana2'];
  const href = '/test-link';
  const event = fakeEvent({
    name: fakeLocalizedObject(eventName),
    shortDescription: fakeLocalizedObject(description),
    keywords: keywords.map((keyword) =>
      fakeKeyword({ name: fakeLocalizedObject(keyword) })
    ),
    location: place,
    pEvent: fakePEvent({
      occurrences: fakeOccurrences(2, [
        {
          startTime: '2021-09-10T13:17:09Z',
          endTime: '2021-09-10T13:17:09Z',
          placeId,
        },
        // this is the next occurrence in the future (should be rendered)
        {
          startTime: '2021-10-22T13:17:09Z',
          endTime: '2021-10-22T14:17:09Z',
          placeId,
        },
      ]),
    }),
  });

  const { container } = customRender(
    <EventPreviewCard event={event} link={href} />,
    {
      mocks,
    }
  );
  const link = screen.getByRole('link', {
    name: /testinimi/i,
  });
  expect(link).toHaveAttribute('href', href);
  screen.getByText(eventName);
  screen.getByText(description);
  screen.getByText('Maksuton');
  keywords.forEach((k) => screen.getByText(k));

  // render next occurrence time
  screen.getByText('perjantaina 22.10 klo 16:17');
  expect(container).toMatchSnapshot();
});

it('render multiday occurrence dates correctly', () => {
  vi.setSystemTime(new Date(2021, 9, 20));

  customRender(
    <EventPreviewCard
      event={fakeEvent({
        location: place,
        pEvent: fakePEvent({
          occurrences: fakeOccurrences(2, [
            {
              startTime: '2021-09-10T13:17:09Z',
              endTime: '2021-09-10T13:17:09Z',
              placeId,
            },
            // this is the next occurrence in the future (should be rendered)
            {
              startTime: '2021-10-22T13:17:09Z',
              endTime: '2021-10-28T14:17:09Z',
              placeId,
            },
          ]),
        }),
      })}
      link="/"
    />,
    { mocks }
  );
  screen.getByText('22.10.2021 – 28.10.2021');
});
