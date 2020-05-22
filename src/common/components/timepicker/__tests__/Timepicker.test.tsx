import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Timepicker, { Props } from '../Timepicker';

const id = 'time-picker';
const defaultLabel = 'Timepicker';

function renderTimepicker(props?: Partial<Props>) {
  const onChange = jest.fn();
  const onBlur = jest.fn();
  render(
    <Timepicker
      id={id}
      labelText={defaultLabel}
      value=""
      onChange={onChange}
      onBlur={onBlur}
      invalid={false}
      {...props}
    />
  );

  return { onChange, onBlur };
}

describe('Selecting time', () => {
  it('autocompletes and selects time when user clicks an option', async () => {
    const { onChange } = renderTimepicker();

    const input = screen.getByLabelText(defaultLabel);
    userEvent.type(input, '12');

    expect(onChange.mock.calls).toEqual([['1'], ['12']]);

    const option = screen.getByRole('option', { name: '12:15' });
    userEvent.click(option);

    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith('12:15'));
    expect(input).toHaveValue('12:15');

    expect(
      screen.queryByRole('option', { name: '12:15' })
    ).not.toBeInTheDocument();
  });

  it('autocompletes and selects time when user navigates with keyboar', async () => {
    const { onChange } = renderTimepicker();

    const input = screen.getByLabelText(defaultLabel);

    fireEvent.focus(input);

    userEvent.type(input, '14');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(screen.getByRole('option', { name: '14:15' })).toHaveAttribute(
      'aria-selected',
      'true'
    );

    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith('14:15'));
    expect(
      screen.queryByRole('option', { name: '14:15' })
    ).not.toBeInTheDocument();
  });
});
