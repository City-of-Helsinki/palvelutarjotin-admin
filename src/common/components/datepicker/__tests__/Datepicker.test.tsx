import {
  configure,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import formatDate from 'date-fns/format';
import { fi } from 'date-fns/locale';
import { advanceTo } from 'jest-date-mock';
import * as React from 'react';

import { DATE_FORMAT } from '../../../../utils/time/format';
import Datepicker, { DatepickerProps } from '../Datepicker';

configure({ defaultHidden: true });

function getTestDate(daysFromToday = 0): Date {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  date.setHours(0, 0, 0, 0);
  return date;
}

function renderDatepicker(props?: Partial<DatepickerProps>) {
  const defaultProps: DatepickerProps = {
    id: 'datepicker',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    value: new Date(2020, 5, 5),
    labelText: 'Datepicker',
  };

  const { rerender } = render(<Datepicker {...defaultProps} {...props} />);

  return {
    ...defaultProps,
    rerender: (newProps: Partial<DatepickerProps>) =>
      rerender(<Datepicker {...defaultProps} {...props} {...newProps} />),
  };
}

function pressKey(
  { key, keyCode }: { key: string; keyCode?: number },
  times = 1
) {
  for (let i = 0; i < times; i += 1) {
    fireEvent.keyDown(document.activeElement || document.body, {
      key,
      keyCode,
    });
  }
}

advanceTo(new Date(2020, 7, 10));

describe('<Datepicker />', () => {
  it('Datepicker opens when user focuses with tab', () => {
    renderDatepicker({ value: new Date(2020, 6, 5) });
    userEvent.tab();
    expect(screen.queryByText(/heinäkuu 2020/)).toBeInTheDocument();
  });

  it('show correct day as selected day', () => {
    renderDatepicker({ value: new Date(2020, 6, 5) });
    userEvent.tab();

    const selectedDateButton = screen.getByRole('button', {
      name: /valitse 5\.7\.2020/i,
    });
    expect(selectedDateButton).toHaveAttribute('tabIndex', '0');
    expect(selectedDateButton).toHaveClass('daySelected');
  });

  it('shows current date correctly when user navigates calendar with keyboard', async () => {
    renderDatepicker({ value: new Date(2020, 6, 5) });
    userEvent.tab();

    const currentDayButton = screen.getByRole('button', {
      name: /valitse 5\.7\.2020/i,
    });

    // selected date receives focus asynchronously, lets wait it to happen
    await waitFor(() => expect(currentDayButton).toHaveFocus());

    pressKey({ key: 'ArrowDown' });

    await waitFor(() =>
      expect(
        screen.queryByRole('button', { name: 'Valitse 12.7.2020' })
      ).toHaveFocus()
    );

    // 3 arrrow down presses should change to next month
    pressKey({ key: 'ArrowDown' }, 3);

    expect(screen.queryByText(/elokuu 2020/i)).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Valitse 2\.8\.2020/i })
    ).toHaveFocus();
  });

  it.skip('calls onBlur when user hits escape button', async () => {
    const { onBlur } = renderDatepicker();

    userEvent.tab();

    expect(onBlur).not.toHaveBeenCalled();

    await waitFor(() =>
      expect(screen.queryByText(/kesäkuu 2020/i)).toBeInTheDocument()
    );

    pressKey({ key: 'Escape' });

    expect(onBlur).toHaveBeenCalled();
    expect(screen.queryByText(/kesäkuu 2020/i)).not.toBeInTheDocument();
  });

  it('calls onChange handler correctly when user selects a date', async () => {
    const date = getTestDate(10);
    const { onChange } = renderDatepicker({ value: date });

    const monthRegex = new RegExp(
      formatDate(date, 'LLLL yyyy', { locale: fi }),
      'i'
    );
    const dateSelectRegex = new RegExp(
      `Valitse ${formatDate(date, DATE_FORMAT)}`,
      'i'
    );

    userEvent.tab();

    await waitFor(() =>
      expect(screen.queryByText(monthRegex)).toBeInTheDocument()
    );

    userEvent.click(
      screen.getByRole('button', {
        name: dateSelectRegex,
      })
    );

    expect(onChange).toHaveBeenCalledWith(date);
  });

  it('changes month when next or previous month button is clicked', () => {
    const { labelText } = renderDatepicker();

    userEvent.click(screen.getByLabelText(labelText || ''));

    expect(screen.queryByText(/kesäkuu 2020/i)).toBeInTheDocument();

    userEvent.click(
      screen.getByRole('button', { name: /edellinen kuukausi/i })
    );

    expect(screen.queryByText(/toukokuu 2020/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /seuraava kuukausi/i }));
    expect(screen.queryByText(/kesäkuu 2020/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /seuraava kuukausi/i }));
    expect(screen.queryByText(/heinäkuu 2020/i)).toBeInTheDocument();
  });
});

describe('<Datepicker timeSelector /> with time selector', () => {
  it('focuses times list with tab', async () => {
    renderDatepicker({ timeSelector: true });

    userEvent.tab();

    await waitFor(() =>
      expect(screen.queryByText(/kesäkuu 2020/i)).toBeInTheDocument()
    );

    userEvent.tab();

    expect(
      screen.queryByLabelText(/Valitse kellonaika nuolinäppäimillä/i)
    ).toHaveFocus();
  });

  it('focuses correct time from time list when user hits down or up arrows', async () => {
    const value = new Date(2020, 5, 20);
    const { onChange } = renderDatepicker({
      timeSelector: true,
      minuteInterval: 15,
      value,
    });

    userEvent.tab();

    await waitFor(() =>
      expect(screen.queryByText(/kesäkuu 2020/i)).toBeInTheDocument()
    );

    userEvent.tab();

    pressKey({ key: 'ArrowDown' });

    expect(
      screen.getByRole('button', { name: /Valitse kellonajaksi 00:00/i })
    ).toHaveFocus();

    pressKey({ key: 'ArrowDown' });

    expect(
      screen.getByRole('button', { name: /Valitse kellonajaksi 00:15/i })
    ).toHaveFocus();

    pressKey({ key: 'ArrowUp' });

    expect(
      screen.getByRole('button', { name: /Valitse kellonajaksi 00:00/i })
    ).toHaveFocus();

    pressKey({ key: 'ArrowUp' });

    expect(
      screen.getByRole('button', { name: /Valitse kellonajaksi 23:45/i })
    ).toHaveFocus();

    // couldn't get enter key working here
    // maybe related: https://github.com/testing-library/react-testing-library/issues/269
    fireEvent.click(
      screen.getByRole('button', { name: /Valitse kellonajaksi 23:45/i })
    );

    const expectedDateValue = new Date(value);
    expectedDateValue.setHours(23);
    expectedDateValue.setMinutes(45);

    expect(onChange).toHaveBeenCalledWith(expectedDateValue);
  });

  it('calls onChange correctly when selecting date with time', async () => {
    const value = getTestDate(1);
    const { labelText, onChange, rerender } = renderDatepicker({
      timeSelector: true,
      minuteInterval: 15,
      value,
    });

    const testDate = getTestDate(5);

    const dateSelectRegex = new RegExp(
      `Valitse ${formatDate(testDate, DATE_FORMAT)}`,
      'i'
    );

    userEvent.click(screen.getByLabelText(labelText || ''));

    userEvent.click(screen.getByRole('button', { name: dateSelectRegex }));

    expect(onChange).toHaveBeenCalledWith(testDate);

    rerender({ value: testDate });

    userEvent.click(
      screen.getByRole('button', { name: /Valitse kellonajaksi 12:15/i })
    );

    const expectedDateValue = testDate;
    expectedDateValue.setHours(12);
    expectedDateValue.setMinutes(15);

    expect(onChange).toHaveBeenCalledWith(expectedDateValue);
  });
});
