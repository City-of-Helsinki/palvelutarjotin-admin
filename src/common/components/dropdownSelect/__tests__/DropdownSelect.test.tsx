import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import DropdownSelect, { DropdownSelectProps } from '../DropdownSelect';

const defaultIds = {
  getItemId: (index: number) => `test_id-item-${index}`,
};

const labelText = 'Test label';

const renderSelect = (props: DropdownSelectProps) => {
  const ui = <DropdownSelect {...props} />;

  render(ui);

  const label = screen.getByText(props.labelText || '', { selector: 'label' });
  const menu = screen.getByRole('listbox');
  const toggleButton = screen.getByLabelText(props.labelText || labelText, {
    selector: 'button',
  });

  const getItems = () => screen.getAllByRole('option');

  const getItemAtIndex = (index: number) => getItems()[index];

  const clickOnToggleButton = () => {
    userEvent.click(toggleButton);
  };

  const clickOnItemAtIndex = (index: number) => {
    userEvent.click(getItemAtIndex(index));
  };

  const keyDownOnToggleButton = (key: string, options = {}) => {
    fireEvent.keyDown(toggleButton, { key, ...options });
  };

  const keyDownOnMenu = (key: string, options = {}) => {
    fireEvent.keyDown(menu, { key, ...options });
  };

  return {
    label,
    menu,
    toggleButton,
    getItemAtIndex,
    getItems,
    keyDownOnToggleButton,
    clickOnItemAtIndex,
    clickOnToggleButton,
    keyDownOnMenu,
  };
};

const id = 'test_id';

const onBlur = jest.fn();
const onChange = jest.fn();

const options = [
  {
    label: 'Option 1',
    value: 'option1',
  },
  {
    label: 'Option 1',
    value: 'option1',
  },
  {
    label: 'Option 1',
    value: 'option1',
  },
];

const defaultProps: DropdownSelectProps = {
  id,
  labelText,
  options,
  onBlur,
  onChange,
};

describe('ToggleButton', () => {
  test('menu should be opened/closed by clicking toggle button', async () => {
    const { clickOnToggleButton, menu } = renderSelect(defaultProps);

    clickOnToggleButton();
    expect(menu).toHaveClass('isOpen');

    clickOnToggleButton();
    expect(menu).not.toHaveClass('isOpen');
  });
});
describe('ArrowUp, ArrowDown', () => {
  test('should allow navigation with up and down arrows', async () => {
    const { clickOnToggleButton, getItemAtIndex, keyDownOnMenu } = renderSelect(
      defaultProps
    );

    clickOnToggleButton();
    keyDownOnMenu('ArrowDown');
    keyDownOnMenu('ArrowDown');

    expect(getItemAtIndex(1)).toHaveClass('isHighlighted');

    keyDownOnMenu('ArrowUp');

    expect(getItemAtIndex(0)).toHaveClass('isHighlighted');
  });
});
describe('ArrowUp', () => {
  test('it highlights the last option number if none is highlighted', () => {
    const {
      clickOnToggleButton,
      getItemAtIndex,
      keyDownOnMenu,
      menu,
    } = renderSelect(defaultProps);

    clickOnToggleButton();
    keyDownOnMenu('ArrowUp');

    expect(menu).toHaveAttribute(
      'aria-activedescendant',
      defaultIds.getItemId(options.length - 1)
    );
    expect(getItemAtIndex(options.length - 1)).toHaveClass('isHighlighted');
  });

  test('it highlights the previous item', () => {
    const {
      clickOnToggleButton,
      getItemAtIndex,
      keyDownOnMenu,
      menu,
    } = renderSelect(defaultProps);

    clickOnToggleButton();
    keyDownOnMenu('ArrowUp');
    keyDownOnMenu('ArrowUp');

    expect(menu).toHaveAttribute(
      'aria-activedescendant',
      defaultIds.getItemId(options.length - 2)
    );
    expect(getItemAtIndex(options.length - 2)).toHaveClass('isHighlighted');
  });
});

describe('Escape', () => {
  test('should close suggestions with escape', () => {
    const { clickOnToggleButton, keyDownOnMenu, menu } = renderSelect(
      defaultProps
    );

    clickOnToggleButton();
    expect(menu).toHaveClass('isOpen');
    keyDownOnMenu('Escape');
    expect(menu).not.toHaveClass('isOpen');
  });
});

describe('Clicking option', () => {
  test('should close menu by clicking an option', () => {
    const { clickOnItemAtIndex, clickOnToggleButton, menu } = renderSelect(
      defaultProps
    );

    clickOnToggleButton();
    expect(menu).toHaveClass('isOpen');
    clickOnItemAtIndex(1);
    expect(menu).not.toHaveClass('isOpen');
  });

  test('it should keep highlighted index after click an option', () => {
    const index = 2;
    const {
      clickOnItemAtIndex,
      clickOnToggleButton,
      menu,
      getItemAtIndex,
    } = renderSelect(defaultProps);

    clickOnToggleButton();
    clickOnItemAtIndex(index);
    expect(menu).not.toHaveClass('isOpen');

    clickOnToggleButton();
    expect(getItemAtIndex(index)).toHaveClass('isHighlighted');
  });
});

describe('When dropdown has been closed, it should reopen with', () => {
  const getClosedInput = () => {
    const helpers = renderSelect(defaultProps);
    const { clickOnToggleButton, keyDownOnMenu, menu } = helpers;

    clickOnToggleButton();
    expect(menu).toHaveClass('isOpen');
    keyDownOnMenu('Escape');
    expect(menu).not.toHaveClass('isOpen');

    return helpers;
  };

  test('ArrowUp', () => {
    const { keyDownOnToggleButton, menu } = getClosedInput();

    keyDownOnToggleButton('ArrowUp');
    expect(menu).toHaveClass('isOpen');
  });

  test('ArrowDown', () => {
    const { keyDownOnToggleButton, menu } = getClosedInput();

    keyDownOnToggleButton('ArrowDown');
    expect(menu).toHaveClass('isOpen');
  });
});

describe('Dropdown selection', () => {
  const dropdownOptions = [
    {
      label: 'Option 1',
      value: 'option1',
    },
    {
      label: 'Option 2',
      value: 'option2',
    },
    {
      label: 'Option 3',
      value: 'option3',
    },
  ];
  const labelText = 'Valitse...';

  it('shows and selects items correctly', () => {
    const { toggleButton } = renderSelect({
      ...defaultProps,
      options: dropdownOptions,
      labelText,
    });

    toggleButton.click();
    const option = screen.queryByRole('option', {
      name: dropdownOptions[0].label,
    });
    expect(option).toBeVisible();
    toggleButton.click();
    expect(option).not.toBeInTheDocument();

    dropdownOptions.forEach((option) => {
      toggleButton.click();

      dropdownOptions.forEach(({ label }) => {
        const option = screen.queryByRole('option', { name: label });
        expect(option).toBeVisible();
      });

      screen.getByRole('option', { name: option.label }).click();

      dropdownOptions.forEach(({ label }) => {
        const option = screen.queryByRole('option', { name: label });
        expect(option).not.toBeInTheDocument();
      });

      expect(toggleButton).toHaveTextContent(option.label);
    });
  });

  it('calls onChange callback correctly', async () => {
    const onChangeMock = jest.fn();
    const { toggleButton } = renderSelect({
      ...defaultProps,
      options: dropdownOptions,
      labelText,
      onChange: onChangeMock,
    });

    for (const option of dropdownOptions) {
      toggleButton.click();
      screen.getByRole('option', { name: option.label }).click();

      await waitFor(() => expect(onChangeMock).toHaveBeenCalledTimes(1));
      expect(onChangeMock).toHaveBeenCalledWith(option);
      onChangeMock.mockClear();
    }
  });
});
