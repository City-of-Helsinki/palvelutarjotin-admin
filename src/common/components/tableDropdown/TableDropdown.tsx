import classNames from 'classnames';
import { IconAngleDown } from 'hds-react';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import useKeyboardNavigation from '../../../hooks/useDropdownKeyboardNavigation';
import styles from './tableDropdown.module.scss';

export type MenuItemProps = {
  children: ReactElement;
  onClick: (row: Record<string, unknown>) => void;
};

type InternalMenuItemProps = MenuItemProps & {
  isFocused: boolean;
  row: Record<string, unknown>;
  toggleMenu: () => void;
};

const MenuItem: React.FC<InternalMenuItemProps> = ({
  children,
  isFocused,
  onClick,
  row,
  toggleMenu,
}) => {
  const component = React.useRef<HTMLLIElement>(null);

  const handleClick = () => {
    onClick(row);
    toggleMenu();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      component.current?.focus();
    }
  }, [isFocused]);

  return (
    <li
      ref={component}
      className={classNames({
        [styles.isFocused]: isFocused,
      })}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      role="menuitem"
      tabIndex={0}
    >
      {children}
    </li>
  );
};

interface Props {
  items: MenuItemProps[];
  row: Record<string, unknown>;
}

const TableDropdown: React.FC<Props> = ({ row, items }) => {
  const container = React.useRef<HTMLDivElement>(null);
  const toggleButton = React.useRef<HTMLButtonElement>(null);

  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {
    focusedIndex,
    setup: setupKeyboardNav,
    teardown: teardownKeyboardNav,
  } = useKeyboardNavigation({
    container: container,
    listLength: items.length,
    onKeyDown: (event) => {
      if (!isComponentFocused()) return;

      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
          ensureMenuIsOpen();
          break;
        case 'Enter':
          if (isMenuOpen) {
            toggleMenu();
            setFocusToButton();
            event.preventDefault();
          }
          break;
        case 'Escape':
          if (isMenuOpen) {
            setIsMenuOpen(false);
            setFocusToButton();
          }
          break;
        case 'Tab':
          setIsMenuOpen(false);
      }
    },
  });

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const ensureMenuIsOpen = React.useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen]);

  const isComponentFocused = React.useCallback(() => {
    const active = document.activeElement;

    return container.current?.contains(active);
  }, []);

  const onDocumentClick = (event: MouseEvent) => {
    const target = event.target;

    // Close menu when clicking outside of the component
    if (!(target instanceof Node && container.current?.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  const onDocumentFocusin = React.useCallback((event: FocusEvent) => {
    const target = event.target;

    if (!(target instanceof Node && container.current?.contains(target))) {
      setIsMenuOpen(false);
    }
  }, []);

  const setFocusToButton = () => {
    toggleButton.current?.focus();
  };

  React.useEffect(() => {
    setupKeyboardNav();
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('focusin', onDocumentFocusin);

    // Clean up event listener to prevent memory leaks
    return () => {
      teardownKeyboardNav();
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('focusin', onDocumentFocusin);
    };
  }, [onDocumentFocusin, setupKeyboardNav, teardownKeyboardNav]);

  return (
    <div
      className={classNames(styles.tableDropdown, {
        [styles.isMenuOpen]: isMenuOpen,
      })}
      ref={container}
    >
      <button
        ref={toggleButton}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        className={styles.toggleButton}
        onClick={toggleMenu}
        type="button"
      >
        <span>{t('common.tableDropdown.toggleButton')}</span>
        <IconAngleDown className={styles.iconAngleDown} />
      </button>

      <ul role="menu" className={styles.dropdownMenu}>
        {items.map((item, index) => (
          <MenuItem
            key={index}
            isFocused={focusedIndex === index}
            onClick={item.onClick}
            row={row}
            toggleMenu={toggleMenu}
          >
            {item.children}
          </MenuItem>
        ))}
      </ul>
    </div>
  );
};

export default TableDropdown;
