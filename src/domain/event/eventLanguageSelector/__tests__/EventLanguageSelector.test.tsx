import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';
import Router from 'react-router';

import { Language } from '../../../../types';
import { render, screen } from '../../../../utils/testUtils';
import EventLanguageSelector from '../EventLanguageSelector';

const languagesProp = [
  {
    isCompleted: true,
    isDisabled: false,
    label: 'Suomi',
    value: 'fi' as Language,
  },
  {
    isCompleted: true,
    isDisabled: false,
    label: 'Ruotsi',
    value: 'sv' as Language,
  },
  {
    isCompleted: true,
    isDisabled: false,
    label: 'Englanti',
    value: 'en' as Language,
  },
];

test('test for accessibility violations', async () => {
  const { container } = render(
    <EventLanguageSelector
      selectedLanguage="fi"
      languages={languagesProp}
      onClick={jest.fn()}
    />
  );

  const result = await axe(container);
  expect(result).toHaveNoViolations();
});

test('language selector button are rendered correctly', () => {
  const onClickMock = jest.fn();
  render(
    <EventLanguageSelector
      selectedLanguage="fi"
      languages={languagesProp}
      onClick={onClickMock}
    />
  );

  const finButton = screen.getByRole('button', { name: 'Suomi' });
  const enButton = screen.getByRole('button', { name: 'Englanti' });
  const svButton = screen.getByRole('button', { name: 'Ruotsi' });

  userEvent.click(finButton);

  expect(onClickMock).toHaveBeenCalledWith('fi');
  expect(onClickMock).toHaveBeenCalledTimes(1);

  userEvent.click(enButton);

  expect(onClickMock).toHaveBeenCalledWith('en');
  expect(onClickMock).toHaveBeenCalledTimes(2);

  userEvent.click(svButton);

  expect(onClickMock).toHaveBeenCalledWith('sv');
  expect(onClickMock).toHaveBeenCalledTimes(3);
});
