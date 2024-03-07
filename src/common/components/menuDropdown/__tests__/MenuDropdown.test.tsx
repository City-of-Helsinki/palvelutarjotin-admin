import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { vi } from 'vitest';

import MenuDropdown, { MenuDropdownProps, MenuItem } from '../MenuDropdown';

const renderMenuDropdown = async (props: MenuDropdownProps) => {
  const ui = <MenuDropdown {...props} />;

  // FIXME: Remove act() wrapping workaround, see if warning can be fixed better:
  const { container } = await act(() => render(ui));

  const toggleButton = await screen.findByLabelText(props.buttonText, {
    selector: 'button',
  });

  const getItemAtIndex = async (index: number) =>
    (await screen.findAllByRole('menuitem'))[index];

  const arrowDown = () => {
    fireEvent.keyDown(container, { key: 'ArrowDown' });
  };

  const arrowUp = () => {
    fireEvent.keyDown(container, { key: 'ArrowUp' });
  };

  return {
    toggleButton,
    getItemAtIndex,
    arrowDown,
    arrowUp,
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
    const { arrowDown, arrowUp, toggleButton, getItemAtIndex } =
      await renderMenuDropdown(defaultProps);

    await userEvent.click(toggleButton);

    arrowDown();

    expect(await getItemAtIndex(0)).toHaveClass('isFocused');

    arrowDown();
    arrowDown();

    expect(await getItemAtIndex(2)).toHaveClass('isFocused');

    arrowDown();

    expect(await getItemAtIndex(3)).toHaveClass('isFocused');

    arrowDown();

    expect(await getItemAtIndex(0)).toHaveClass('isFocused');

    arrowUp();

    expect(await getItemAtIndex(3)).toHaveClass('isFocused');
  });

  it('calls onChange callback correctly', async () => {
    const { getItemAtIndex, toggleButton } =
      await renderMenuDropdown(defaultProps);

    await userEvent.click(toggleButton);

    for (const [index, item] of items.entries()) {
      await userEvent.click(await getItemAtIndex(index));
      await waitFor(() => expect(onClickMock).toHaveBeenCalledTimes(index + 1));
      await waitFor(() => expect(onClickMock).toHaveBeenCalledWith(item.value));
    }
  });
});
