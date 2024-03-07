import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { vi } from 'vitest';

import MenuDropdown, { MenuDropdownProps, MenuItem } from '../MenuDropdown';

const renderMenuDropdown = (props: MenuDropdownProps) => {
  const ui = <MenuDropdown {...props} />;

  const { container } = render(ui);

  const menu = screen.getByRole('menu');

  const toggleButton = screen.getByLabelText(props.buttonText, {
    selector: 'button',
  });

  const clickOnToggleButton = async () => {
    await userEvent.click(toggleButton);
  };

  const getItems = () => screen.getAllByRole('menuitem');

  const getItemAtIndex = (index: number) => getItems()[index];

  const clickOnItemAtIndex = async (index: number) => {
    await userEvent.click(getItemAtIndex(index));
  };

  const keyDown = (key: string) => {
    fireEvent.keyDown(container, { key });
  };

  const arrowDown = () => {
    keyDown('ArrowDown');
  };

  const arrowUp = () => {
    keyDown('ArrowUp');
  };

  return {
    menu,
    toggleButton,
    getItemAtIndex,
    getItems,
    keyDown,
    arrowDown,
    arrowUp,
    escape,
    clickOnItemAtIndex,
    clickOnToggleButton,
  };
};

const onClickMock = vi.fn();

const items: MenuItem[] = [1, 2, 3, 4].map((item) => ({
  onClick: onClickMock,
  text: `Item ${item}`,
  value: `item_${item}`,
}));

const buttonText = 'Select item';

const defaultProps: MenuDropdownProps = {
  buttonAriaLabel: buttonText,
  buttonText,
  items,
};

describe('MenuDropdown component', () => {
  it('changes focused item correctly', async () => {
    const { arrowDown, arrowUp, clickOnToggleButton, getItemAtIndex } =
      renderMenuDropdown(defaultProps);

    await clickOnToggleButton();

    arrowDown();

    expect(getItemAtIndex(0)).toHaveClass('isFocused');

    arrowDown();
    arrowDown();

    expect(getItemAtIndex(2)).toHaveClass('isFocused');

    arrowDown();

    expect(getItemAtIndex(3)).toHaveClass('isFocused');

    arrowDown();

    expect(getItemAtIndex(0)).toHaveClass('isFocused');

    arrowUp();

    expect(getItemAtIndex(3)).toHaveClass('isFocused');
  });

  it('calls onChange callback correctly', () => {
    const { getItemAtIndex, clickOnToggleButton } =
      renderMenuDropdown(defaultProps);

    clickOnToggleButton();

    items.forEach(async (item, index) => {
      getItemAtIndex(index).click();
      expect(onClickMock).toHaveBeenCalledTimes(index + 1);
      expect(onClickMock).toHaveBeenCalledWith(item.value);
    });
  });
});
