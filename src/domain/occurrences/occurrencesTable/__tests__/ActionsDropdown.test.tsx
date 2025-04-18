import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import * as React from 'react';
import Modal from 'react-modal';
import * as Router from 'react-router';
import { vi } from 'vitest';

import { tableDropdownTestId } from '../../../../common/components/tableDropdown/TableDropdown';
import {
  OccurrenceDocument,
  PlaceDocument,
} from '../../../../generated/graphql';
import {
  fakeLocalizedObject,
  fakeOccurrence,
  fakePlace,
  pageInfoMock,
} from '../../../../utils/mockDataUtils';
import { customRender } from '../../../../utils/testUtils';
import { ROUTES } from '../../../app/routes/constants';
import { EnrolmentType } from '../../../occurrence/constants';
import ActionsDropdown, { Props } from '../ActionsDropdown';

const navigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return { ...actual };
});
const eventId = 'testEventId123';
const occurrenceId = 'occurrenceId123';
const placeId = 'testPlaceId123';

const mockPlace = fakePlace({
  id: placeId,
  name: fakeLocalizedObject('Test place'),
});

const mockOccurrence = fakeOccurrence({
  id: occurrenceId,
  placeId,
  enrolments: {
    edges: [],
    pageInfo: pageInfoMock,
  },
});

const mocks = [
  {
    request: {
      query: PlaceDocument,
      variables: {
        id: placeId,
      },
    },
    result: {
      data: {
        place: mockPlace,
      },
    },
  },
  {
    request: {
      query: OccurrenceDocument,
      variables: {
        id: occurrenceId,
      },
    },
    result: {
      data: {
        occurrence: mockOccurrence,
      },
    },
  },
];

const renderComponent = (props?: Partial<Props>) => {
  return customRender(
    <ActionsDropdown
      enrolmentType={EnrolmentType.Internal}
      eventId={eventId}
      isEventDraft
      onDelete={vi.fn()}
      onCancel={vi.fn()}
      row={mockOccurrence}
      {...props}
    />,
    { mocks }
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
