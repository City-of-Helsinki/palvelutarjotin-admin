import { DataProxy } from '@apollo/client/cache';
import isBefore from 'date-fns/isBefore';
import { TFunction } from 'i18next';
import orderBy from 'lodash/orderBy';
import uniqueId from 'lodash/uniqueId';

import { EVENT_LANGUAGES } from '../../../constants';
import {
  AddOccurrenceMutation,
  DeleteOccurrenceMutation,
  EventDocument,
  EventQuery,
  EventQueryVariables,
  LanguageNode,
  LanguageNodeConnection,
  LanguageNodeEdge,
  OccurrenceSeatType,
  PageInfo,
} from '../../../generated/graphql';
import sortFavorably from '../../../utils/sortFavorably';
import { VIRTUAL_EVENT_LOCATION_ID } from '../../event/constants';
import { OccurrenceSectionFormFields } from '../types';

export const getOrderedLanguageOptions = (t: TFunction) => {
  const languagesOrder = sortFavorably(
    Object.values(EVENT_LANGUAGES).map((language) =>
      t(`common.languages.${language.toLowerCase()}`)
    ),
    [
      EVENT_LANGUAGES.FI,
      EVENT_LANGUAGES.SV,
      EVENT_LANGUAGES.EN,
    ].map((language) => t(`common.languages.${language.toLowerCase()}`))
  );

  return Object.values(EVENT_LANGUAGES)
    .map((language) => ({
      label: t(`common.languages.${language.toLowerCase()}`),
      value: language,
    }))
    .sort(
      (a, b) =>
        languagesOrder.indexOf(a.label) - languagesOrder.indexOf(b.label)
    );
};

export const getOptimisticCreateOccurrenceResponse = ({
  values,
  isVirtual,
}: {
  values: OccurrenceSectionFormFields;
  isVirtual?: boolean;
}): AddOccurrenceMutation => {
  return {
    __typename: 'Mutation',
    addOccurrence: {
      __typename: 'AddOccurrenceMutationPayload',
      occurrence: {
        __typename: 'OccurrenceNode',
        id: uniqueId(),
        amountOfSeats: Number(values.amountOfSeats) || 0,
        cancelled: false,
        startTime: values.startTime?.toISOString(),
        endTime: values.endTime?.toISOString(),
        languages: fakeLanguages(
          orderBy(values.languages, undefined, 'asc').map((lang) => ({
            name: lang,
            id: lang,
          }))
        ),
        placeId: isVirtual
          ? VIRTUAL_EVENT_LOCATION_ID
          : values.occurrenceLocation,
        remainingSeats: Number(values.amountOfSeats) || 0,
        seatType: values.oneGroupFills
          ? OccurrenceSeatType.EnrolmentCount
          : OccurrenceSeatType.ChildrenCount,
        seatsApproved: 0,
        seatsTaken: 0,
        maxGroupSize: Number(values.maxGroupSize) || 0,
        minGroupSize: Number(values.minGroupSize) || 0,
        pEvent: {
          __typename: 'PalvelutarjotinEventNode',
          id: uniqueId(),
        },
      },
    },
  };
};

export const getOptimisticDeleteOccurrenceResponse = (): DeleteOccurrenceMutation => {
  return {
    __typename: 'Mutation',
    deleteOccurrence: {
      __typename: 'DeleteOccurrenceMutationPayload',
      clientMutationId: null,
    },
  };
};

export const addOccurrencesToCache = ({
  data,
  proxy,
  eventVariables,
}: {
  eventVariables: EventQueryVariables;
  proxy: DataProxy;
  data: AddOccurrenceMutation | null | undefined;
}) => {
  if (data?.addOccurrence) {
    const { addOccurrence } = data;
    const cachedEvent = proxy.readQuery({
      query: EventDocument,
      variables: eventVariables,
    }) as EventQuery;

    // Find index where to insert new occurrence in the cache array
    const index = cachedEvent.event?.pEvent.occurrences.edges.findIndex((o) => {
      const occurrenceStartTime = new Date(o?.node?.startTime);
      const startTime = new Date(data.addOccurrence?.occurrence?.startTime);
      return isBefore(startTime, occurrenceStartTime);
    });

    const newOccurrences =
      index != null && index > -1
        ? [
            ...(cachedEvent.event?.pEvent.occurrences.edges ?? []).slice(
              0,
              index
            ),
            {
              __typename: 'OccurrenceNodeEdge',
              node: addOccurrence.occurrence,
            },
            ...(cachedEvent.event?.pEvent.occurrences.edges ?? []).slice(index),
          ]
        : [
            ...(cachedEvent.event?.pEvent.occurrences.edges ?? []),
            {
              __typename: 'OccurrenceNodeEdge',
              node: addOccurrence.occurrence,
            },
          ];

    proxy.writeQuery({
      query: EventDocument,
      data: {
        event: {
          ...cachedEvent.event,
          pEvent: {
            ...cachedEvent.event?.pEvent,
            occurrences: {
              ...cachedEvent.event?.pEvent.occurrences,
              edges: newOccurrences,
            },
          },
        },
      },
    });
  }
};

export const deleteOccurrenceFromCache = ({
  eventVariables,
  occurrenceId,
  proxy,
}: {
  eventVariables: EventQueryVariables;
  proxy: DataProxy;
  occurrenceId: string;
}) => {
  const cachedEvent = proxy.readQuery({
    query: EventDocument,
    variables: eventVariables,
  }) as EventQuery;

  proxy.writeQuery({
    query: EventDocument,
    data: {
      event: {
        ...cachedEvent.event,
        pEvent: {
          ...cachedEvent.event?.pEvent,
          occurrences: {
            ...cachedEvent.event?.pEvent.occurrences,
            edges: [
              // Filter out deleted occurrence
              ...(cachedEvent.event?.pEvent.occurrences.edges ?? []).filter(
                (e) => e?.node?.id !== occurrenceId
              ),
            ],
          },
        },
      },
    },
  });
};

// fakeLanguages is copy pasted here from mockDataUtils so we don't need to include faker in prod build.
const fakeLanguages = (
  languages?: Partial<LanguageNode>[]
): LanguageNodeConnection => {
  const PageInfoMock: PageInfo = {
    hasNextPage: false,
    hasPreviousPage: false,
    __typename: 'PageInfo',
    startCursor: '',
    endCursor: '',
  };

  const fakeLanguageNodeEdge = (
    overrides?: Partial<LanguageNode>
  ): LanguageNodeEdge => ({
    cursor: '',
    node: fakeLanguage(overrides),
    __typename: 'LanguageNodeEdge',
  });

  const fakeLanguage = (overrides?: Partial<LanguageNode>): LanguageNode => ({
    id: 'fi',
    name: 'Finnish',
    __typename: 'LanguageNode',
    ...overrides,
  });

  return {
    edges: languages?.map((language) => fakeLanguageNodeEdge(language)) || [],
    pageInfo: PageInfoMock,
    __typename: 'LanguageNodeConnection',
  };
};
