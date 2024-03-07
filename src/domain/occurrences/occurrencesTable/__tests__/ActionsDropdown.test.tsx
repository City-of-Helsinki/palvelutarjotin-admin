import * as React from 'react';
import Modal from 'react-modal';
import * as Router from 'react-router-dom';
import { vi } from 'vitest';

import { tableDropdownTestId } from '../../../../common/components/tableDropdown/TableDropdown';
import { fakeOccurrence } from '../../../../utils/mockDataUtils';
import { render, screen, userEvent } from '../../../../utils/testUtils';
import { ROUTES } from '../../../app/routes/constants';
import { EnrolmentType } from '../../../occurrence/constants';
import ActionsDropdown, { Props } from '../ActionsDropdown';

const navigate = vi.fn();
vi.mock('react-router-dom', () => {
  return {
    __esModule: true,
    ...vi.importActual('react-router-dom'),
  };
});
const eventId = 'testEventId123';
const occurrenceId = 'occurrenceId123';

const mockOccurrence = fakeOccurrence({ id: occurrenceId });

const renderComponent = (props?: Partial<Props>) => {
  return render(
    <ActionsDropdown
      enrolmentType={EnrolmentType.Internal}
      eventId={eventId}
      isEventDraft
      onDelete={vi.fn()}
      onCancel={vi.fn()}
      row={mockOccurrence}
      {...props}
    />
  );
};

it('open menu correctly', async () => {
  renderComponent();

  expect(screen.getByRole('menu')).not.toHaveClass('isOpen');

  await userEvent.click(screen.getByRole('button', { name: 'Valitse' }));

  expect(screen.getByTestId(tableDropdownTestId)).toHaveClass('isMenuOpen');
});

it('navigates correctly from actions', async () => {
  vi.spyOn(Router, 'useNavigate').mockImplementation(() => navigate);
  renderComponent();

  await userEvent.click(screen.getByRole('button', { name: 'Valitse' }));

  await userEvent.click(
    screen.getByRole('menuitem', { name: 'Ilmoittautuneet' })
  );

  expect(navigate).toHaveBeenCalledWith(
    '/fi/events/testEventId123/occurrences/occurrenceId123?returnPath=%2F',
    expect.anything()
  );

  await userEvent.click(screen.getByRole('menuitem', { name: 'Muokkaa' }));

  expect(navigate).toHaveBeenCalledWith(
    `/fi${ROUTES.CREATE_OCCURRENCE.replace(':id', eventId).replace(
      ':occurrenceId',
      occurrenceId
    )}`,
    expect.anything()
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

it('renders cancel modal and cancel functionality works', async () => {
  const onCancelMock = vi.fn();
  const { container } = renderComponent({ onCancel: onCancelMock });

  Modal.setAppElement(container);

  await userEvent.click(screen.getByRole('button', { name: 'Valitse' }));

  await userEvent.click(screen.getByRole('menuitem', { name: 'Peruuta' }));

  expect(
    screen.getByText(
      'Oletko varma, että haluat peruuttaa valitun tapahtuma-ajan?'
    )
  ).toBeInTheDocument();

  expect(
    screen.getByText(
      'Tähän tapahtuma-aikaan ilmoittautuneiden ilmoittautumiset perutaan ja heille lähetetään peruutusviesti'
    )
  ).toBeInTheDocument();

  const addMessageCheckbox = screen.queryByLabelText('Lisää viesti');

  expect(addMessageCheckbox).toBeInTheDocument();

  await userEvent.click(addMessageCheckbox!);

  await userEvent.type(
    screen.getByLabelText('Viesti osallistujille'),
    'Viesti osallistujille'
  );

  await userEvent.click(screen.getByRole('button', { name: 'Lähetä' }));

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

it('renders delete modal correctly and delete functionality works', async () => {
  const onDeleteMock = vi.fn();
  const { container } = renderComponent({ onDelete: onDeleteMock });

  Modal.setAppElement(container);

  expect(screen.getByRole('menu')).not.toHaveClass('isOpen');

  await userEvent.click(screen.getByRole('button', { name: 'Valitse' }));

  await userEvent.click(screen.getByRole('menuitem', { name: 'Poista' }));

  expect(
    screen.getByText('Oletko varma että haluat poistaa tapahtuma-ajan?')
  ).toBeInTheDocument();

  expect(
    screen.getByText('Poistettua tapahtuma-aikaa ei voi palauttaa.')
  ).toBeInTheDocument();

  await userEvent.click(
    screen.getByRole('button', { name: 'Poista tapahtuma-aika' })
  );

  expect(onDeleteMock).toHaveBeenCalledWith(mockOccurrence);

  expect(
    screen.queryByText('Poistettua tapahtuma-aikaa ei voi palauttaa.')
  ).not.toBeInTheDocument();
});
