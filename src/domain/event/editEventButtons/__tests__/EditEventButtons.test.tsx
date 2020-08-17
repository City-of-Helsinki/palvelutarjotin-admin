import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Router, { MemoryRouter } from 'react-router';

import { SUPPORT_LANGUAGES } from '../../../../constants';
import messages from '../../../app/i18n/fi.json';
import { ROUTES } from '../../../app/routes/constants';
import EditEventButtons from '../EditEventButtons';

it('matches snapshot', () => {
  const { container } = render(
    <MemoryRouter>
      <EditEventButtons
        dirty
        onClickLanguage={jest.fn()}
        selectedLanguage="fi"
      />
    </MemoryRouter>
  );

  expect(container).toMatchSnapshot();
});

it('renders texts correctly', () => {
  const { rerender } = render(
    <MemoryRouter>
      <EditEventButtons
        dirty
        onClickLanguage={jest.fn()}
        selectedLanguage="fi"
      />
    </MemoryRouter>
  );

  expect(
    screen.queryByRole('button', {
      name: messages.editEvent.buttons.buttonBack,
    })
  ).toBeVisible();

  expect(
    screen.queryByText(messages.editEvent.buttons.textDirty)
  ).toBeVisible();

  rerender(
    <MemoryRouter>
      <EditEventButtons
        dirty={false}
        onClickLanguage={jest.fn()}
        selectedLanguage="fi"
      />
    </MemoryRouter>
  );

  expect(
    screen.queryByText(messages.editEvent.buttons.textDirty)
  ).not.toBeInTheDocument();

  Object.values(SUPPORT_LANGUAGES).forEach((lang) => {
    const langButton = screen.queryByRole('button', {
      name: messages.common.languages[lang],
    });
    expect(langButton).toBeVisible();
    expect(langButton).not.toBeDisabled();
  });
});

it('calls callback correctly when clicked', () => {
  const pushMock = jest.fn();
  jest.spyOn(Router, 'useHistory').mockReturnValue({ push: pushMock });
  const languageClickMock = jest.fn();
  render(
    <EditEventButtons
      dirty
      onClickLanguage={languageClickMock}
      selectedLanguage="fi"
    />
  );

  userEvent.click(
    screen.getByRole('button', {
      name: messages.editEvent.buttons.buttonBack,
    })
  );

  expect(pushMock).toHaveBeenCalledWith(ROUTES.HOME);

  Object.values(SUPPORT_LANGUAGES).forEach((lang, i) => {
    const langButton = screen.getByRole('button', {
      name: messages.common.languages[lang],
    });
    userEvent.click(langButton);
    expect(languageClickMock).toHaveBeenCalledTimes(i + 1);
    expect(languageClickMock).toHaveBeenCalledWith(lang);
  });
});
