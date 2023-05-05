import * as React from 'react';
import Modal from 'react-modal';

import { tableDropdownTestId } from '../../../../../common/components/tableDropdown/TableDropdown';
import {
  EventQueueEnrolmentsDocument,
  PickEnrolmentFromQueueDocument,
  UnenrolEventQueueDocument,
} from '../../../../../generated/graphql';
import {
  fakeEventQueueEnrolment,
  fakePerson,
  fakePEvent,
  fakeStudyGroup,
} from '../../../../../utils/mockDataUtils';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../../../utils/testUtils';
import QueueActionsDropdown, { Props } from '../QueueActionsDropdown';

const pEventId = 'testEventId123';
const linkedEventId = 'linkedEventId123';
const queuedEnrolmentId = 'eventQueueEnrolmentId123';
const occurrenceId = 'occurrenceId123';
const person = fakePerson({ name: 'Test Guy' });

const mockPEvent = fakePEvent({ id: pEventId, linkedEventId });
const mockQueueEnrolment = fakeEventQueueEnrolment({
  id: queuedEnrolmentId,
  pEvent: mockPEvent,
  studyGroup: fakeStudyGroup({ person }),
  person,
});

const mocks = [
  {
    request: {
      query: UnenrolEventQueueDocument,
      variables: {
        input: {
          pEventId,
          studyGroupId: mockQueueEnrolment.studyGroup.id,
        },
      },
    },
    result: {
      data: {
        unenrolEventQueue: {
          pEvent: {
            linkedEventId,
          },
          studyGroup: {
            unitName: mockQueueEnrolment.studyGroup.unitName,
          },
        },
      },
    },
  },
  {
    request: {
      query: PickEnrolmentFromQueueDocument,
      variables: {
        input: {
          eventQueueEnrolmentId: mockQueueEnrolment.id,
          occurrenceId,
        },
      },
    },
    result: {
      data: {
        enrolment: {
          id: 'enrolmentId',
          studyGroup: {
            ...mockQueueEnrolment.studyGroup,
          },
          occurrence: {
            pEvent: {
              linkedEventId,
            },
          },
        },
      },
    },
  },
  // Example: eventQueueEnrolments
  // { "pEventId": "local-kultus:agd6cxvpx4", "orderBy": "enrolment_time" }
  // {"data":{"eventQueueEnrolments":{"count":2,"edges":[{"cursor":"YXJyYXljb25uZWN0aW9uOjA=","node":{"id":"RXZlbnRRdWV1ZUVucm9sbWVudE5vZGU6OA==","notificationType":"EMAIL","enrolmentTime":"2023-05-03T11:30:48.136575+00:00","status":"HAS_ENROLMENTS","pEvent":{"id":"UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcz","__typename":"PalvelutarjotinEventNode"},"person":{"id":"UGVyc29uTm9kZTo5NmJiN2IxMS0wYTE3LTRhOWItOWNlOC0zYTgzNDc5ZGI5ZmU=","emailAddress":"lthompson@example.net","name":"Stephanie Brown","phoneNumber":"0394915766","language":"FI","placeIds":["PEcrexpmVhRSZdEimMsr","epmSNwTOtUgrKVKzCiFD","SkbqXrahasfQzRUKzJSy"],"__typename":"PersonNode"},"studyGroup":{"id":"U3R1ZHlHcm91cE5vZGU6NTI=","groupSize":295,"amountOfAdult":0,"unitId":null,"unitName":"Want require total coach. Here evening sound doctor someone eight lawyer.","unit":{"name":{"en":"Want require total coach. Here evening sound doctor someone eight lawyer.","fi":"Want require total coach. Here evening sound doctor someone eight lawyer.","sv":"Want require total coach. Here evening sound doctor someone eight lawyer.","__typename":"LocalisedObject"},"__typename":"ExternalPlace"},"groupName":"Success wind either speech television. Prove view avoid watch natural at not.","studyLevels":{"edges":[],"__typename":"StudyLevelNodeConnection"},"extraNeeds":"Car put federal allow local customer have.","person":{"id":"UGVyc29uTm9kZTphMGYzMzA2Yy05NDA0LTRmNDAtYTZkZS1mNjk3NmYzOGFhZGI=","emailAddress":"samantha13@example.net","name":"Carla Wright","phoneNumber":"001-197-692-0976x1931","language":"FI","placeIds":["wiJvtmrEYlWkTAiImhVB","XCnKegzRWGFkQaODDKvn","EIvxGNusMFlkKRKzeEHD"],"__typename":"PersonNode"},"__typename":"StudyGroupNode"},"__typename":"EventQueueEnrolmentNode"},"__typename":"EventQueueEnrolmentNodeEdge"},{"cursor":"YXJyYXljb25uZWN0aW9uOjE=","node":{"id":"RXZlbnRRdWV1ZUVucm9sbWVudE5vZGU6OQ==","notificationType":"EMAIL","enrolmentTime":"2023-05-03T11:30:48.298920+00:00","status":"HAS_NO_ENROLMENTS","pEvent":{"id":"UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcz","__typename":"PalvelutarjotinEventNode"},"person":{"id":"UGVyc29uTm9kZTo1MzdkN2U2Ni01MWRjLTQ1YjktOWI0Zi04ZWQ4MThhMjc2MTY=","emailAddress":"swilliams@example.org","name":"Kimberly Davis","phoneNumber":"001-258-843-4693x43643","language":"FI","placeIds":["sYvOWupOMeAJcuGDcFYw","SEKqzmKyRzbSzCFQqepv"],"__typename":"PersonNode"},"studyGroup":{"id":"U3R1ZHlHcm91cE5vZGU6NTM=","groupSize":882,"amountOfAdult":0,"unitId":null,"unitName":"Behind adult possible attention in tree. Rich myself nation available yes result.","unit":{"name":{"en":"Behind adult possible attention in tree. Rich myself nation available yes result.","fi":"Behind adult possible attention in tree. Rich myself nation available yes result.","sv":"Behind adult possible attention in tree. Rich myself nation available yes result.","__typename":"LocalisedObject"},"__typename":"ExternalPlace"},"groupName":"Sing Mr attack bad three property place. Wonder medical then research evening.","studyLevels":{"edges":[],"__typename":"StudyLevelNodeConnection"},"extraNeeds":"Measure maintain read concern green newspaper five yeah.\nPartner sell family world.","person":{"id":"UGVyc29uTm9kZTo3OWQ0NjBjNS0xODVhLTQ1NjEtOGEwMy01YWUzYTExMzIyNmU=","emailAddress":"orozcojohn@example.net","name":"Jonathan Rivera","phoneNumber":"(139)902-9709x70182","language":"FI","placeIds":["YFHcXZAlPdaPLhjvAzOj","ZtaxTptFFdiRWEmFukPr","sgXiAeJNjsBOqrHByJYb"],"__typename":"PersonNode"},"__typename":"StudyGroupNode"},"__typename":"EventQueueEnrolmentNode"},"__typename":"EventQueueEnrolmentNodeEdge"}],"__typename":"EventQueueEnrolmentNodeConnection"}}}
  // FIXME: Not working - throwing a warning.
  // There are multiple complaints about the refetch mocking in the Google:
  // E.g. https://github.com/apollographql/react-apollo/issues/2783
  // E.g. https://stackoverflow.com/questions/58981274/is-there-a-way-to-mock-refetch-in-mockedprovider-apollo-client
  {
    request: {
      query: EventQueueEnrolmentsDocument,
      variables: {
        pEventId,
        orderBy: 'enrolment_time',
      },
    },
    result: {
      data: {
        count: 0,
        eventQueueEnrolments: {
          edges: [{ node: mockQueueEnrolment }],
        },
        __typename: 'EventQueueEnrolmentNodeConnection',
      },
    },
    newData: jest.fn(() => ({
      data: {
        count: 0,
        eventQueueEnrolments: {
          edges: [],
        },
        __typename: 'EventQueueEnrolmentNodeConnection',
      },
    })),
  },
];

const renderComponent = (props?: Partial<Props>) => {
  return render(
    <QueueActionsDropdown
      occurrenceId={occurrenceId}
      eventId={linkedEventId}
      row={mockQueueEnrolment}
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

it('add to the enrolments list works from dropdown', async () => {
  const { container } = renderComponent();

  Modal.setAppElement(container);

  userEvent.click(screen.getByRole('button', { name: 'Valitse' }));

  userEvent.click(
    screen.getByRole('menuitem', { name: 'Lisää ilmoittautumislistalle' })
  );

  expect(screen.getByText(/valitut osallistujat:/i)).toBeInTheDocument();
  expect(screen.queryByText(person.name)).toBeInTheDocument();

  userEvent.click(
    screen.getByRole('button', { name: 'Lisää ilmoittautumislistalle' })
  );

  await waitFor(() => {
    expect(
      screen.queryByText(/valitut osallistujat:/i)
    ).not.toBeInTheDocument();
  });
});

it('removing queued enrolment works from dropdown', async () => {
  const { container } = renderComponent();

  Modal.setAppElement(container);

  userEvent.click(screen.getByRole('button', { name: 'Valitse' }));

  userEvent.click(screen.getByRole('menuitem', { name: 'Poista jonosta' }));

  expect(screen.getByText(/valitut osallistujat:/i)).toBeInTheDocument();
  expect(screen.queryByText(person.name)).toBeInTheDocument();

  userEvent.click(
    screen.getByRole('button', { name: 'Poista ilmoittautuminen' })
  );

  await waitFor(() => {
    expect(
      screen.queryByText(/valitut osallistujat:/i)
    ).not.toBeInTheDocument();
  });
});
