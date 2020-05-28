import React, { useCallback } from 'react';

interface Props {
  container: React.MutableRefObject<HTMLDivElement | null>;
  listLength: number;
  initialFocusedIndex?: number;
}

interface DropdownKeyboardNavigationState {
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  setup: Function;
  teardown: Function;
}

const useDropdownKeyboardNavigation = ({
  container,
  listLength,
  initialFocusedIndex,
}: Props): DropdownKeyboardNavigationState => {
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
  const [isInitialNavigation, setIsInitialNavigation] = React.useState(true);
  const isStartingPosition = focusedIndex === -1;

  const focusOption = React.useCallback(
    (direction: 'down' | 'up', index: number) => {
      switch (direction) {
        case 'down':
          setFocusedIndex(index < listLength - 1 ? index + 1 : 0);
          break;
        case 'up':
          setFocusedIndex(index > 0 ? index - 1 : listLength - 1);
          break;
      }
      setIsInitialNavigation(false);
    },
    [listLength]
  );

  const isComponentFocused = useCallback(() => {
    const active = document.activeElement;
    const current = container && container.current;

    if (current && active instanceof Node && current.contains(active)) {
      return true;
    }
    return false;
  }, [container]);

  const onKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      // Handle keyboard events only if current element is focused
      if (!isComponentFocused()) return;

      switch (event.key) {
        case 'ArrowUp':
          if (isInitialNavigation && typeof initialFocusedIndex === 'number') {
            focusOption('up', initialFocusedIndex);
          } else if (isStartingPosition) {
            setFocusedIndex(listLength - 1);
          } else {
            focusOption('up', focusedIndex);
          }
          event.preventDefault();
          break;
        case 'ArrowDown':
          if (isInitialNavigation && typeof initialFocusedIndex === 'number') {
            focusOption('down', initialFocusedIndex);
          } else if (isStartingPosition) {
            setFocusedIndex(listLength + 1);
          } else {
            focusOption('down', focusedIndex);
          }
          event.preventDefault();
          break;
        case 'Escape':
          setFocusedIndex(-1);
          event.preventDefault();
          break;
      }
    },
    [
      focusOption,
      focusedIndex,
      initialFocusedIndex,
      isComponentFocused,
      isInitialNavigation,
      isStartingPosition,
      listLength,
    ]
  );

  const setup = React.useCallback(() => {
    document.addEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  const teardown = React.useCallback(() => {
    document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  React.useEffect(() => {
    setIsInitialNavigation(true);
  }, [initialFocusedIndex]);

  React.useEffect(() => {
    // Whenever the list changes, reset focused index
    setFocusedIndex(-1);
  }, [listLength]);

  return { focusedIndex, setFocusedIndex, setup, teardown };
};

export default useDropdownKeyboardNavigation;
