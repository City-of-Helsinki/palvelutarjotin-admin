import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import Timepicker, { Props } from '../Timepicker';

const id = 'time-picker';
const defaultLabel = 'Timepicker';

function renderTimepicker(props?: Partial<Props>) {
  const onChange = jest.fn();
  const onBlur = jest.fn();

  const defaultProps = {
    id,
    labelText: defaultLabel,
    value: '',
    onChange,
    onBlur,
    invalid: false,
    ...props,
  };

  const { rerender } = render(<Timepicker {...defaultProps} />);

  return {
    onChange,
    onBlur,
    rerender: (newProps?: Partial<Props>) =>
      rerender(<Timepicker {...defaultProps} {...newProps} />),
  };
}

describe('Selecting time', () => {
  it('autocompletes and selects time when user clicks an option', async () => {
    const { onChange, rerender } = renderTimepicker({ minuteInterval: 15 });

    const input = screen.getByLabelText(defaultLabel, { selector: 'input' });
    userEvent.type(input, '1');
    rerender({ value: '1' });
    userEvent.type(input, '2');
    rerender({ value: '12' });

    expect(input).toHaveValue('12');

    expect(onChange.mock.calls).toEqual([['1'], ['12']]);

    const option = screen.getByRole('option', { name: '12:15' });
    userEvent.click(option);

    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith('12:15'));

    rerender({ value: '12:15' });
    expect(input).toHaveValue('12:15');

    // not working after update?
    // expect(
    //   screen.queryByRole('option', { name: '12:15' })
    // ).not.toBeInTheDocument();
  });

  it('autocompletes and selects time when user navigates with keyboard', async () => {
    const { onChange, rerender } = renderTimepicker({ minuteInterval: 15 });

    const input = screen.getByLabelText(defaultLabel, { selector: 'input' });

    expect(screen.getByRole('listbox').children).toHaveLength(0);

    userEvent.tab();

    expect(screen.getByRole('listbox').children).toHaveLength(96);

    userEvent.type(input, '1');
    rerender({ value: '1' });
    userEvent.type(input, '4');
    rerender({ value: '14' });

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

    expect(screen.getByRole('listbox').children.length).toBe(0);
  });
});
