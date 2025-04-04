// FIXME: Make MenuDropdown component accessible and remove this eslint-disable comment:
/* eslint-disable jsx-a11y/click-events-have-key-events */
// "Visible, non-interactive elements with click handlers must have at least one
// keyboard listener. (jsx-a11y/click-events-have-key-events)"

import classNames from 'classnames';
import { IconAngleDown } from 'hds-react';
import * as React from 'react';

import styles from './menuDropdown.module.scss';
import useKeyboardNavigation from '../../../hooks/useDropdownKeyboardNavigation';
import type { Language } from '../../../types';

export type MenuItem = {
  className?: string;
  icon?: React.ReactElement;
  language?: Language;
  onClick?: (value: string) => void;
  text: string;
  value: string;
};

const MenuItemComponent: React.FC<{
  item: MenuItem;
  isFocused: boolean;
  isSelected: boolean;
  onClick: (item: MenuItem) => void;
}> = ({ item, isFocused, isSelected, onClick }) => {
  const selfRef = React.useRef<HTMLLIElement>(null);

  const handleClick = () => {
    onClick(item);
  };

  React.useEffect(() => {
    if (isFocused && selfRef.current) {
      selfRef.current.focus();
    }
  }, [isFocused]);

  return (
    <li
      ref={selfRef}
      key={item.value}
      lang={item.language || undefined}
      className={classNames(
        styles.menuItem,
        {
          [styles.isFocused]: isFocused,
          [styles.isSelected]: isSelected,
        },
        item.className
      )}
      onClick={handleClick}
      role="menuitem"
      tabIndex={0}
    >
      {item.icon && (
        <div className={styles.menuItemIconWrapper}>{item.icon}</div>
      )}
      {item.text}
    </li>
  );
};

export interface MenuDropdownProps {
  buttonAriaLabel?: string;
  buttonText: string;
  icon?: React.ReactElement;
  items: MenuItem[];
  onMenuItemClick?: (item: MenuItem) => void;
  value?: string;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({
  buttonAriaLabel,
  buttonText,
  icon,
  items,
  onMenuItemClick,
  value,
}) => {
  const container = React.useRef<HTMLDivElement>(null);
  const toggleButton = React.useRef<HTMLButtonElement>(null);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const ensureMenuIsClosed = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const ensureMenuIsOpen = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  };

  const isComponentFocused = () =>
    !!container.current?.contains(document.activeElement);

  const setFocusToButton = () => {
    toggleButton.current?.focus();
  };

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick(item.value);
    } else if (onMenuItemClick) {
      onMenuItemClick(item);
    }

    ensureMenuIsClosed();
  };

  const {
    focusedIndex,
    setup: setupKeyboardNav,
    teardown: teardownKeyboardNav,
  } = useKeyboardNavigation({
    container: container,
    initialFocusedIndex: 0,
    listLength: items.length,
    onKeyDown: (event) => {
      if (!isComponentFocused()) return;

      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
          ensureMenuIsOpen();
          break;
        case 'Escape':
          if (isMenuOpen) {
            ensureMenuIsClosed();
            setFocusToButton();
          }
          break;
        case 'Enter':
        case 'Space':
          {
            const item = items[focusedIndex];
            if (isMenuOpen && item) {
              handleMenuItemClick(item);
              setFocusToButton();
              event.preventDefault();
            }
          }
          break;
        case 'Tab':
          setIsMenuOpen(false);
      }
    },
  });

  const onDocumentClick = (event: MouseEvent) => {
    const target = event.target;
    const current = container && container.current;

    if (!(target instanceof Node && current?.contains(target))) {
      ensureMenuIsClosed();
    }
  };

  const onDocumentFocusin = (event: FocusEvent) => {
    const target = event.target;
    const current = container && container.current;

    if (!(target instanceof Node && current?.contains(target))) {
      ensureMenuIsClosed();
    }
  };

  React.useEffect(() => {
    setupKeyboardNav();
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('focusin', onDocumentFocusin);

    return () => {
      teardownKeyboardNav();
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('focusin', onDocumentFocusin);
    };
  });

  return (
    <div className={styles.menuDropdown} ref={container}>
      <button
        ref={toggleButton}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        aria-label={buttonAriaLabel}
        className={styles.dropdownButton}
        onClick={toggleMenu}
        type="button"
      >
        {icon && <div className={styles.iconWrapper}>{icon}</div>}
        <div className={styles.textWrapper}>
          {buttonText}
          <IconAngleDown
            className={classNames(styles.iconAngle, {
              [styles.iconAngleUp]: isMenuOpen,
            })}
          />
        </div>
      </button>
      <ul
        role="menu"
        className={classNames(styles.dropdownMenu, {
          [styles.isOpen]: isMenuOpen,
        })}
      >
        {items.map((item, index) => {
          return (
            <MenuItemComponent
              key={item.value}
              item={item}
              isFocused={focusedIndex === index}
              isSelected={item.value === value}
              onClick={handleMenuItemClick}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default MenuDropdown;
