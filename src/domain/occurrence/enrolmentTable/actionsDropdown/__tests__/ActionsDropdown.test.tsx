import * as React from 'react';
import Modal from 'react-modal';

import { tableDropdownTestId } from '../../../../../common/components/tableDropdown/TableDropdown';
import { DeclineEnrolmentDocument } from '../../../../../generated/graphql';
import { fakeEnrolment } from '../../../../../utils/mockDataUtils';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../../../utils/testUtils';
import ActionsDropdown, { Props } from '../ActionsDropdown';

const eventId = 'testEventId123';
const enrolmentId = 'enrolmentId123';

const mockEnrolment = fakeEnrolment({ id: enrolmentId });

const mocks = [
  {
    request: {
      query: DeclineEnrolmentDocument,
      variables: {
        input: {
          enrolmentId,
          customMessage: 'Tapahtuma peruttu',
        },
      },
    },
    result: {
      data: {
        declineEnrolment: {
          enrolment: fakeEnrolment(),
          clientMutationId: '',
          __typename: '__EnrolmentNode',
        },
      },
    },
  },
];

const renderComponent = (props?: Partial<Props>) => {
  return render(
    <ActionsDropdown
      eventId={eventId}
      row={mockEnrolment}
      onEnrolmentsModified={jest.fn()}
      {...props}
    />,
    { mocks }
  );
};

it('open menu correctly', () => {
  renderComponent();

  expect(screen.getByRole('menu')).not.toHaveClass('isOpen');

  userEvent.click(screen.getByRole('button', { name: 'Valitse' }));

  expect(screen.getByTestId(tableDropdownTestId)).toHaveClass('isMenuOpen');
});

it('canceling enrolment works from dropdown', async () => {
  const { container } = renderComponent();

  Modal.setAppElement(container);

  userEvent.click(screen.getByRole('button', { name: 'Valitse' }));

  userEvent.click(screen.getByRole('menuitem', { name: 'Jätä ilman paikkaa' }));

  expect(
    screen.queryByText(
      'Valittujien ilmoittautujien osallistumista ei vahvisteta. Heille lähetetään tieto jäämisestä ilman paikkaa.'
    )
  ).toBeInTheDocument();

  userEvent.click(screen.getByLabelText('Lisää viesti'));

  userEvent.type(
    screen.getByLabelText('Viesti osallistujille'),
    'Tapahtuma peruttu'
  );

  userEvent.click(screen.getByRole('button', { name: 'Lähetä' }));

  await waitFor(() => {
    expect(
      screen.queryByText(
        'Valittujien ilmoittautujien osallistumista ei vahvisteta. Heille lähetetään tieto jäämisestä ilman paikkaa.'
      )
    ).not.toBeInTheDocument();
  });
});
