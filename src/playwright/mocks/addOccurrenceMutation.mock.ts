import {
  type AddOccurrenceMutation,
  OccurrencesOccurrenceSeatTypeChoices,
} from '../../generated/graphql';

export const MOCK_ADD_OCCURRENCE_MUTATION_RESPONSE: AddOccurrenceMutation = {
  addOccurrence: {
    occurrence: {
      id: 'T2NjdXJyZW5jZU5vZGU6MzIzNQ==',
      pEvent: {
        id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjE1NjY=',
        __typename: 'PalvelutarjotinEventNode',
      },
      amountOfSeats: 80,
      minGroupSize: 2,
      maxGroupSize: 10,
      seatsTaken: 0,
      seatsApproved: 0,
      seatType: OccurrencesOccurrenceSeatTypeChoices.ChildrenCount,
      remainingSeats: 80,
      languages: {
        edges: [
          {
            node: {
              id: 'en',
              name: 'English',
              __typename: 'LanguageNode',
            },
            __typename: 'LanguageNodeEdge',
          },
          {
            node: {
              id: 'fi',
              name: 'Finnish',
              __typename: 'LanguageNode',
            },
            __typename: 'LanguageNodeEdge',
          },
          {
            node: {
              id: 'sv',
              name: 'Swedish',
              __typename: 'LanguageNode',
            },
            __typename: 'LanguageNodeEdge',
          },
        ],
        __typename: 'LanguageNodeConnection',
      },
      startTime: '2200-06-21T05:30:00+00:00',
      endTime: '2200-06-21T06:00:00+00:00',
      placeId: 'tprek:7254',
      cancelled: false,
      __typename: 'OccurrenceNode',
    },
    __typename: 'AddOccurrenceMutationPayload',
  },
};
