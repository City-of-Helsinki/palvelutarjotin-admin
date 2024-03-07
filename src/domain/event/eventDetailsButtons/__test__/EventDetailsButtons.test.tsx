import userEvent from '@testing-library/user-event';
import * as React from 'react';
import * as Router from 'react-router-dom';

import { fakeEvent } from '../../../../utils/mockDataUtils';
import { render, screen } from '../../../../utils/testUtils';
import EventDetailsButtons from '../EventDetailsButtons';
const navigate = vi.fn();
vi.mock('react-router-dom', () => {
  return {
    __esModule: true,
    ...vi.importActual('react-router-dom'),
  };
});
const eventId = 'palvelutarjotin:afzunowba4';

const event = fakeEvent({
  id: eventId,
});

afterAll(() => {
  vi.useRealTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
});

// test('is accessible and matches snapshot', async () => {
//   const { container } = render(
//     <EventDetailsButtons
//       eventData={{ event }}
//       onClickLanguage={vi.fn()}
//       selectedLanguage="fi"
//     />
//   );

//   const result = await axe(container);

//   expect(result).toHaveNoViolations();
//   expect(container).toMatchSnapshot();
// });

test('it renders correct texts and click events work', async () => {
  vi.spyOn(Router, 'useNavigate').mockImplementation(() => navigate);
  vi.setSystemTime(new Date(2020, 6, 10));

  render(
    <EventDetailsButtons
      eventData={{ event }}
      onClickLanguage={vi.fn()}
      selectedLanguage="fi"
    />
  );

  const backButton = screen.getByRole('button', { name: 'Takaisin' });
  await userEvent.click(backButton);

  expect(navigate).toHaveBeenCalledTimes(1);
  expect(navigate).toHaveBeenCalledWith(
    {
      pathname: '/fi',
      search: '',
    },
    expect.anything()
  );

  const editButton = screen.getByRole('button', { name: 'Muokkaa tapahtumaa' });
  await userEvent.click(editButton);

  expect(navigate).toHaveBeenCalledTimes(2);
  expect(navigate).toHaveBeenCalledWith(
    {
      pathname: '/fi',
      search: '',
    },
    expect.anything()
  );

  expect(screen.queryByText('Takaisin')).toBeVisible();
  expect(screen.queryByText('suomi')).toBeVisible();
  expect(screen.queryByText('englanti')).toBeVisible();
  expect(screen.queryByText('ruotsi')).toBeVisible();
});
