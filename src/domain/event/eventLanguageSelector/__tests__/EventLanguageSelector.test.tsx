import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { screen } from '@testing-library/react';

import { Language } from '../../../../types';
import { customRender } from '../../../../utils/testUtils';
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

// test('test for accessibility violations', async () => {
//   const { container } = render(
//     <EventLanguageSelector
//       selectedLanguage="fi"
//       languages={languagesProp}
//       onClick={vi.fn()}
//     />
//   );

//   const result = await axe(container);
//   expect(result).toHaveNoViolations();
// });

test('language selector button are rendered correctly', async () => {
  const onClickMock = vi.fn();
  customRender(
    <EventLanguageSelector
      selectedLanguage="fi"
      languages={languagesProp}
      onClick={onClickMock}
    />
  );

  const finButton = screen.getByRole('button', { name: 'Suomi' });
  const enButton = screen.getByRole('button', { name: 'Englanti' });
  const svButton = screen.getByRole('button', { name: 'Ruotsi' });

  await userEvent.click(finButton);

  expect(onClickMock).toHaveBeenCalledWith('fi');
  expect(onClickMock).toHaveBeenCalledTimes(1);

  await userEvent.click(enButton);

  expect(onClickMock).toHaveBeenCalledWith('en');
  expect(onClickMock).toHaveBeenCalledTimes(2);

  await userEvent.click(svButton);

  expect(onClickMock).toHaveBeenCalledWith('sv');
  expect(onClickMock).toHaveBeenCalledTimes(3);
});
