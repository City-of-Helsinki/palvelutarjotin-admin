import * as React from 'react';
import Modal from 'react-modal';

import { tableDropdownTestId } from '../../../../common/components/tableDropdown/TableDropdown';
import { fakeOccurrence } from '../../../../utils/mockDataUtils';
import { render, screen, userEvent } from '../../../../utils/testUtils';
import { ROUTES } from '../../../app/routes/constants';
import { EnrolmentType } from '../../../occurrence/constants';
import ActionsDropdown, { Props } from '../ActionsDropdown';

const eventId = 'testEventId123';
const occurrenceId = 'occurrenceId123';

const mockOccurrence = fakeOccurrence({ id: occurrenceId });

const renderComponent = (props?: Partial<Props>) => {
  return render(
    <ActionsDropdown
      enrolmentType={EnrolmentType.Internal}
      eventId={eventId}
      isEventDraft
      onDelete={jest.fn()}
      onCancel={jest.fn()}
      row={mockOccurrence}
      {...props}
    />
  );
};

it('open menu correctly', () => {
  renderComponent();

  expect(screen.getByRole('menu')).not.toHaveClass('isOpen');

  userEvent.click(screen.getByRole('button', { name: 'Valitse' }));

  expect(screen.getByTestId(tableDropdownTestId)).toHaveClass('isMenuOpen');
});

it('navigates correctly from actions', () => {
  const { history } = renderComponent();

  const historyPush = jest.spyOn(history, 'push');

  userEvent.click(screen.getByRole('button', { name: 'Valitse' }));

  userEvent.click(screen.getByRole('menuitem', { name: 'Ilmoittautuneet' }));

  expect(historyPush).toHaveBeenCalledWith(
    `/fi${ROUTES.OCCURRENCE_DETAILS.replace(':id', eventId).replace(
      ':occurrenceId',
      occurrenceId
    )}`
  );

  userEvent.click(screen.getByRole('menuitem', { name: 'Muokkaa' }));

  expect(historyPush).toHaveBeenCalledWith(
    `/fi${ROUTES.CREATE_OCCURRENCE.replace(':id', eventId).replace(
      ':occurrenceId',
      occurrenceId
    )}`
  );
});

it.each([EnrolmentType.External, EnrolmentType.Unenrollable])(
  'does not render enrollments link when enrolment type is not internal',
  (enrolmentType) => {
    renderComponent({ enrolmentType: enrolmentType });
    expect(
      screen.queryByRole('menuitem', { name: 'Ilmoittautuneet' })
    ).not.toBeInTheDocument();
  }
);

it('renders cancel modal and cancel functionality works', () => {
  const onCancelMock = jest.fn();
  const { container } = renderComponent({ onCancel: onCancelMock });

  Modal.setAppElement(container);

  userEvent.click(screen.getByRole('button', { name: 'Valitse' }));

  userEvent.click(screen.getByRole('menuitem', { name: 'Peruuta' }));

  expect(
    screen.queryByText(
      'Oletko varma, että haluat poistaa valitun tapahtuma-ajan?'
    )
  ).toBeInTheDocument();

  expect(
    screen.queryByText(
      'Tähän tapahtuma-aikaan ilmoittautuneiden ilmoittautumiset perutaan ja heille lähetetään peruutusviesti'
    )
  ).toBeInTheDocument();

  const addMessageCheckbox = screen.queryByLabelText('Lisää viesti');

  expect(addMessageCheckbox).toBeInTheDocument();

  userEvent.click(addMessageCheckbox);

  userEvent.type(
    screen.getByLabelText('Viesti osallistujille'),
    'Viesti osallistujille'
  );

  userEvent.click(screen.getByRole('button', { name: 'Lähetä' }));

  expect(onCancelMock).toHaveBeenCalledWith(
    mockOccurrence,
    'Viesti osallistujille'
  );

  expect(
    screen.queryByText(
      'Oletko varma, että haluat poistaa valitun tapahtuma-ajan?'
    )
  ).not.toBeInTheDocument();
});

it('renders delete modal correctly and delete functionality works', () => {
  const onDeleteMock = jest.fn();
  const { container } = renderComponent({ onDelete: onDeleteMock });

  Modal.setAppElement(container);

  expect(screen.getByRole('menu')).not.toHaveClass('isOpen');

  userEvent.click(screen.getByRole('button', { name: 'Valitse' }));

  userEvent.click(screen.getByRole('menuitem', { name: 'Poista' }));

  expect(
    screen.queryByText('Oletko varma että haluat poistaa tapahtuma-ajan?')
  ).toBeInTheDocument();

  expect(
    screen.queryByText('Poistettua tapahtuma-aikaa ei voi palauttaa.')
  ).toBeInTheDocument();

  userEvent.click(
    screen.getByRole('button', { name: 'Poista tapahtuma-aika' })
  );

  expect(onDeleteMock).toHaveBeenCalledWith(mockOccurrence);

  expect(
    screen.queryByText('Poistettua tapahtuma-aikaa ei voi palauttaa.')
  ).not.toBeInTheDocument();
});
