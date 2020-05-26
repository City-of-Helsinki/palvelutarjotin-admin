import classNames from 'classnames';
import { IconAngleDown, IconFill, IconPerson } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import AlertModal from '../../../common/components/modal/AlertModal';
import useKeyboardNavigation from '../../../hooks/useDropdownKeyboardNavigation';
import useLocale from '../../../hooks/useLocale';
import IconDelete from '../../../icons/IconDelete';
import { ROUTES } from '../../app/routes/constants';
import { OccurrenceInTable } from '../types';
import styles from './actionsDropdown.module.scss';

const MenuItem: React.FC<{
  isFocused: boolean;
  onClick: () => void;
}> = ({ children, isFocused, onClick }) => {
  const component = React.useRef<HTMLLIElement>(null);

  const onKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter') {
      onClick();
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
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="menuitem"
      tabIndex={0}
    >
      {children}
    </li>
  );
};

interface Props {
  eventId: string;
  onDelete: (row: OccurrenceInTable) => void;
  row: OccurrenceInTable;
}

const ActionsDropdown: React.FC<Props> = ({ eventId, onDelete, row }) => {
  const container = React.useRef<HTMLDivElement>(null);
  const toggleButton = React.useRef<HTMLButtonElement>(null);

  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const {
    focusedIndex,
    setup: setupKeyboardNav,
    teardown: teardownKeyboardNav,
  } = useKeyboardNavigation({
    container: container,
    listLength: 3,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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

    return active instanceof Node && container.current?.contains(active);
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

  const onKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (!isComponentFocused()) return;

      switch (event.key) {
        case 'ArrowUp':
          ensureMenuIsOpen();
          break;
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
    [ensureMenuIsOpen, isComponentFocused, isMenuOpen, toggleMenu]
  );

  React.useEffect(() => {
    setupKeyboardNav();
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('focusin', onDocumentFocusin);
    document.addEventListener('keydown', onKeyDown);

    // Clean up event listener to prevent memory leaks
    return () => {
      teardownKeyboardNav();
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('focusin', onDocumentFocusin);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onDocumentFocusin, onKeyDown, setupKeyboardNav, teardownKeyboardNav]);

  const goToEnrolmentsPage = () => {
    history.push(
      `/${locale}${ROUTES.ENROLMENTS.replace(':id', eventId).replace(
        ':occurrenceId',
        row.id
      )}`
    );
  };

  const goToEditOccurrencePage = () => {
    history.push(
      `/${locale}${ROUTES.EDIT_OCCURRENCE.replace(':id', eventId).replace(
        ':occurrenceId',
        row.id
      )}`
    );
  };

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    onDelete(row);
    toggleModal();
  };

  return (
    <div
      className={classNames(styles.actionsDropdown, {
        [styles.isMenuOpen]: isMenuOpen,
      })}
      ref={container}
    >
      <AlertModal
        confirmButtonText={t('occurrences.deleteModal.buttonDelete')}
        onConfirm={handleDelete}
        isOpen={isModalOpen}
        title={t('occurrences.deleteModal.title')}
        toggleModal={toggleModal}
      >
        <p>{t('occurrences.deleteModal.text1')}</p>
        <p>{t('occurrences.deleteModal.text2')}</p>
      </AlertModal>
      <button
        ref={toggleButton}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        className={styles.toggleButton}
        onClick={toggleMenu}
        type="button"
      >
        <span>{t('occurrences.actionsDropdown.toggleButton')}</span>
        <IconAngleDown className={styles.iconAngleDown} />
      </button>

      <ul role="menu" className={styles.dropdownMenu}>
        <MenuItem isFocused={focusedIndex === 0} onClick={goToEnrolmentsPage}>
          <IconPerson />
          {t('occurrences.actionsDropdown.menuItemEnrolments')}
        </MenuItem>
        <MenuItem
          isFocused={focusedIndex === 1}
          onClick={goToEditOccurrencePage}
        >
          <IconFill />
          {t('occurrences.actionsDropdown.menuItemEdit')}
        </MenuItem>
        <MenuItem isFocused={focusedIndex === 2} onClick={openDeleteModal}>
          <IconDelete className={styles.iconDelete} />
          {t('occurrences.actionsDropdown.menuItemDelete')}
        </MenuItem>
      </ul>
    </div>
  );
};

export default ActionsDropdown;
