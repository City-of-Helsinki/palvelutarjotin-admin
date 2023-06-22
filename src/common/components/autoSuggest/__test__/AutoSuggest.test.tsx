import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import AutoSuggest, { AutoSuggestProps } from '../AutoSuggest';

const options = [
  { label: 'option1', value: 'option1' },
  { label: 'option2', value: 'option2' },
  { label: 'option3', value: 'option3' },
];

function keyDown(key: string) {
  // eslint-disable-next-line testing-library/no-node-access
  fireEvent.keyDown(document.activeElement || document.body, {
    key,
  });
}

function renderAutoSuggest(props?: Partial<AutoSuggestProps>) {
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const setInputValue = jest.fn();

  const defaultProps: AutoSuggestProps = {
    id: 'id',
    value: null,
    inputValue: '',
    labelText: 'AutoSuggest',
    onBlur,
    onChange,
    options: [],
    setInputValue,
    ...props,
  };

  const { rerender } = render(<AutoSuggest {...defaultProps} />);

  return {
    ...defaultProps,
    onChange,
    onBlur,
    setInputValue,
    rerender: (newProps: Partial<AutoSuggestProps>) =>
      rerender(<AutoSuggest {...defaultProps} {...newProps} />),
  };
}

describe('<AutoSuggest />', () => {
  it('renders without crashing', () => {
    renderAutoSuggest();
  });

  it('show correct value in input', () => {
    const value = 'hakusana';
    const { labelText } = renderAutoSuggest({ inputValue: value });

    expect(screen.getByLabelText(labelText)).toHaveValue(value);
    expect(screen.getByText(/ei tuloksia/i)).toBeInTheDocument();
  });

  it('calls setInputValue correctly when user types to input', async () => {
    const { labelText, setInputValue } = renderAutoSuggest();

    const input = screen.getByLabelText(labelText);

    await userEvent.type(input, 'testi');

    expect(setInputValue.mock.calls).toEqual([
      ['t'],
      ['e'],
      ['s'],
      ['t'],
      ['i'],
    ]);
  });

  it('shows autocomplete list when using arrow key', async () => {
    renderAutoSuggest({ options });

    await userEvent.tab();
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.keyDown(document.activeElement || document.body, {
      key: 'ArrowDown',
    });

    options.forEach((option) => {
      expect(
        screen.getByRole('option', { name: option.label })
      ).toBeInTheDocument();
    });
  });

  it('show focused autocomplete item correctly and calls onChange when item selected', async () => {
    const { onChange } = renderAutoSuggest({ options });

    await userEvent.tab();

    keyDown('ArrowDown');

    expect(
      screen.queryByRole('option', { name: options[0].label })
    ).toHaveClass('isFocused');

    keyDown('ArrowDown');

    expect(
      screen.queryByRole('option', { name: options[1].label })
    ).toHaveClass('isFocused');

    keyDown('ArrowDown');

    expect(
      screen.queryByRole('option', { name: options[2].label })
    ).toHaveClass('isFocused');

    keyDown('ArrowUp');

    expect(
      screen.queryByRole('option', { name: options[1].label })
    ).toHaveClass('isFocused');

    keyDown('Enter');

    expect(onChange).toHaveBeenCalledWith(options[1]);

    // suggestion list should be closed
    options.forEach((option) => {
      expect(
        screen.queryByRole('option', { name: option.label })
      ).not.toBeInTheDocument();
    });
  });

  it('calls onChange when clicking one of the options', async () => {
    const { labelText, onChange } = renderAutoSuggest({
      options,
      inputValue: 'test',
    });

    const input = screen.getByLabelText(labelText);

    await userEvent.click(input);

    const selectedOption = screen.getByRole('option', {
      name: options[2].label,
    });

    fireEvent.click(selectedOption);

    expect(onChange).toHaveBeenCalledWith(options[2]);
  });
});
