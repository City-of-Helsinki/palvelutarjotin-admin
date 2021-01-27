import { format } from 'date-fns';
import parseDate from 'date-fns/parse';
import { axe } from 'jest-axe';
import { advanceTo, clear } from 'jest-date-mock';
import * as React from 'react';
import wait from 'waait';

import {
  DATE_FORMAT,
  DATETIME_FORMAT,
} from '../../../../common/components/datepicker/contants';
import { runCommonEventFormTests } from '../../../../utils/CommonEventFormTests';
import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../../utils/testUtils';
import EventForm, { defaultInitialValues } from '../EventForm';

afterAll(() => {
  clear();
});

it('test for accessibility violations', async () => {
  const { container } = renderForm();

  await act(wait);

  const result = await axe(container);
  expect(result).toHaveNoViolations();
});

const renderForm = () =>
  render(
    <EventForm
      title="Testilomake"
      persons={[]}
      initialValues={defaultInitialValues}
      onCancel={jest.fn()}
      selectedLanguage="fi"
      onSubmit={jest.fn()}
      setSelectedLanguage={jest.fn()}
    />
  );

describe('eventForm Tests', () => {
  runCommonEventFormTests(renderForm);

  it('enrolment must start in the future', async () => {
    const currentDay = '08.08.2008';
    const currentTime = '15:00'; // actual time is 12:00 in helsinki timezone

    // prettier-ignore
    const currentDate = parseDate(`${currentDay} ${currentTime}`, DATETIME_FORMAT, new Date());
    advanceTo(currentDate);
    renderForm();

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    const enrolmentStartInput = screen.getByRole('textbox', {
      name: /Ilmoittautuminen alkaa/g,
    });
    userEvent.click(enrolmentStartInput);
    userEvent.type(enrolmentStartInput, `${currentDay} 09:00`);
    fireEvent.blur(enrolmentStartInput);
    await waitFor(() => {
      expect(enrolmentStartInput).toBeInvalid();
    });
    expect(enrolmentStartInput).toHaveAttribute('aria-describedby');
    expect(
      screen.queryByText('Päivämäärä ei voi olla menneisyydessä')
    ).toBeInTheDocument();

    userEvent.click(enrolmentStartInput);
    userEvent.clear(enrolmentStartInput);
    userEvent.type(enrolmentStartInput, `${currentDay} 21:00`);
    fireEvent.blur(enrolmentStartInput);

    await waitFor(() => {
      expect(enrolmentStartInput).toBeValid();
    });
    expect(enrolmentStartInput).not.toHaveAttribute('aria-describedby');
    expect(
      screen.queryByText('Päivämäärä ei voi olla menneisyydessä')
    ).not.toBeInTheDocument();
  });

  it.only('enrolment must start after event date', async () => {
    const currentDate = new Date(2020, 7, 2);
    advanceTo(currentDate);
    renderForm();

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    const eventStartDateInput = screen.getByRole('textbox', {
      name: 'Päivämäärä',
    });
    const eventTimeStartInput = screen.getByRole('textbox', {
      name: 'Alkaa klo',
    });
    const enrolmentStartInput = screen.getByRole('textbox', {
      name: /Ilmoittautuminen alkaa/g,
    });
    const currentDateFormatted = format(currentDate, DATE_FORMAT);
    userEvent.click(eventStartDateInput);
    userEvent.type(eventStartDateInput, currentDateFormatted);
    fireEvent.blur(eventStartDateInput);

    await waitFor(() => {
      expect(eventStartDateInput).toBeValid();
    });

    userEvent.click(eventTimeStartInput);
    userEvent.type(eventTimeStartInput, '15:00');
    fireEvent.blur(eventTimeStartInput);

    await waitFor(() => {
      expect(eventTimeStartInput).toBeValid();
    });

    userEvent.click(enrolmentStartInput);
    userEvent.type(enrolmentStartInput, `${currentDateFormatted} 15:30`);
    fireEvent.blur(enrolmentStartInput);
    await waitFor(() => {
      expect(enrolmentStartInput).toBeInvalid();
    });
    expect(enrolmentStartInput).toHaveAttribute('aria-describedby');
    expect(
      screen.queryByText(
        `Päivämäärän on oltava ennen ${currentDateFormatted} 15:00`
      )
    ).toBeInTheDocument();
    userEvent.click(enrolmentStartInput);
    userEvent.clear(enrolmentStartInput);
    userEvent.type(enrolmentStartInput, `${currentDateFormatted} 14:30`);
    fireEvent.blur(enrolmentStartInput);
    await waitFor(() => {
      expect(enrolmentStartInput).toBeValid();
    });
    expect(enrolmentStartInput).not.toHaveAttribute('aria-describedby');
  });
});
