import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import DropdownMultiselect, {
  DropdownMultiselectProps,
} from '../DropdownMultiselect';

const defaultIds = {
  getItemId: (index: number) => `test_id-item-${index}`,
};

const labelText = 'Test label';

const renderSelect = (props: DropdownMultiselectProps) => {
  const ui = <DropdownMultiselect {...props} />;

  render(ui);

  const label = screen.getByText(props.labelText || '');
  const menu = screen.getByRole('listbox');
  const toggleButton = screen.getByLabelText(labelText, { selector: 'button' });

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
    ...screen,
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

const defaultProps: DropdownMultiselectProps = {
  id,
  labelText,
  options,
  onBlur,
  onChange,
  value: [],
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
  test('should not close menu by clicking an option', () => {
    const { clickOnItemAtIndex, clickOnToggleButton, menu } = renderSelect(
      defaultProps
    );

    clickOnToggleButton();
    expect(menu).toHaveClass('isOpen');
    clickOnItemAtIndex(1);
    expect(menu).toHaveClass('isOpen');
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
