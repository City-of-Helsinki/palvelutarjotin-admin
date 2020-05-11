import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import DropdownSelect, {
  dataTestIds,
  DropdownSelectProps,
} from '../DropdownSelect';

const defaultIds = {
  getItemId: (index: number) => `test_id-item-${index}`,
};

const renderSelect = (props: DropdownSelectProps) => {
  const ui = <DropdownSelect {...props} />;

  render(ui);

  const label = screen.getByText(props.labelText || '');
  const menu = screen.getByRole('listbox');
  const toggleButton = screen.getByTestId(dataTestIds.toggleButton);

  const getItemAtIndex = (index: number) =>
    screen.getByTestId(dataTestIds.item(index));

  const getItems = () => screen.queryAllByRole('option');

  const clickOnToggleButton = () => {
    fireEvent.click(toggleButton);
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
    clickOnToggleButton,
    keyDownOnMenu,
  };
};

const id = 'test_id';
const labelText = 'Test label';
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

describe('when dropdown has been closed, it should reopen with', () => {
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
