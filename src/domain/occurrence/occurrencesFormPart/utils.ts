import { DataProxy } from '@apollo/client/cache';
import { isBefore } from 'date-fns';
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
  OccurrenceFieldsFragment,
  OccurrencesOccurrenceSeatTypeChoices,
} from '../../../generated/graphql';
import { pageInfoMock } from '../../../utils/mockDataUtils';
import sortFavorably from '../../../utils/sortFavorably';
import { parseDateTimeString } from '../../../utils/time/utils';
import { OccurrenceSectionFormFields } from '../types';
import { getDateFromDateAndTimeString, getPlaceId } from '../utils';

export const getOrderedLanguageOptions = (t: TFunction) => {
  const languagesOrder = sortFavorably(
    Object.values(EVENT_LANGUAGES).map((language) =>
      t(`common.languages.${language.toLowerCase()}`)
    ),
    [EVENT_LANGUAGES.FI, EVENT_LANGUAGES.SV, EVENT_LANGUAGES.EN].map(
      (language) => t(`common.languages.${language.toLowerCase()}`)
    )
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

// fakeLanguages is copy pasted here from mockDataUtils so we don't need to include faker in prod build.
const fakeLanguages = (
  languages?: Partial<LanguageNode>[]
): LanguageNodeConnection => {
  const fakeLanguage = (overrides?: Partial<LanguageNode>): LanguageNode => ({
    id: 'fi',
    name: 'Finnish',
    __typename: 'LanguageNode',
    ...overrides,
  });

  const fakeLanguageNodeEdge = (
    overrides?: Partial<LanguageNode>
  ): LanguageNodeEdge => ({
    cursor: '',
    node: fakeLanguage(overrides),
    __typename: 'LanguageNodeEdge',
  });

  return {
    edges: languages?.map((language) => fakeLanguageNodeEdge(language)) || [],
    pageInfo: pageInfoMock,
    __typename: 'LanguageNodeConnection',
  };
};

export const getOptimisticCreateOccurrenceResponse = ({
  values,
  isVirtual = false,
  isBookable = false,
}: {
  values: OccurrenceSectionFormFields;
  isVirtual?: boolean;
  isBookable?: boolean;
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
        startTime: getDateFromDateAndTimeString(
          values.startDate,
          values.startTime
        ).toISOString(),
        endTime: getDateFromDateAndTimeString(
          values.endDate || values.startDate,
          values.endTime
        ).toISOString(),
        languages: fakeLanguages(
          orderBy(values.languages, undefined, 'asc').map((lang) => ({
            name: lang,
            id: lang,
          }))
        ),
        placeId: getPlaceId({ values, isVirtual, isBookable }),
        remainingSeats: Number(values.amountOfSeats) || 0,
        seatType: values.oneGroupFills
          ? OccurrencesOccurrenceSeatTypeChoices.EnrolmentCount
          : OccurrencesOccurrenceSeatTypeChoices.ChildrenCount,
        seatsApproved: 0,
        seatsTaken: 0,
        maxGroupSize: Number(values.maxGroupSize) || null,
        minGroupSize: Number(values.minGroupSize) || null,
        pEvent: {
          __typename: 'PalvelutarjotinEventNode',
          id: uniqueId(),
        },
      },
    },
  };
};

export const getOptimisticDeleteOccurrenceResponse =
  (): DeleteOccurrenceMutation => {
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
    const index = cachedEvent.event?.pEvent.occurrences?.edges.findIndex(
      (o) => {
        const occurrenceStartTime = new Date(o?.node?.startTime);
        const startTime = new Date(data.addOccurrence?.occurrence?.startTime);
        return isBefore(startTime, occurrenceStartTime);
      }
    );

    const newOccurrences =
      index != null && index > -1
        ? [
            ...(cachedEvent.event?.pEvent.occurrences?.edges ?? []).slice(
              0,
              index
            ),
            {
              __typename: 'OccurrenceNodeEdge',
              node: addOccurrence.occurrence,
            },
            ...(cachedEvent.event?.pEvent.occurrences?.edges ?? []).slice(
              index
            ),
          ]
        : [
            ...(cachedEvent.event?.pEvent.occurrences?.edges ?? []),
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
              ...(cachedEvent.event?.pEvent.occurrences?.edges ?? []).filter(
                (e) => e?.node?.id !== occurrenceId
              ),
            ],
          },
        },
      },
    },
  });
};

export const getOccurrencerWithSameDateAlreadyExists = (
  formValues: OccurrenceSectionFormFields,
  occurrences: OccurrenceFieldsFragment[]
) => {
  return occurrences.some((occurrence) => {
    const formStartDateTime = parseDateTimeString(
      `${formValues.startDate} ${formValues.startTime}`
    );
    // use endDate is it is filled
    const formEndDateTime = parseDateTimeString(
      `${formValues.endDate || formValues.startDate} ${formValues.endTime}`
    );
    const occurrenceStartTime = new Date(occurrence.startTime);
    const occurrenceEndTime = new Date(occurrence.endTime);

    return (
      formStartDateTime.getTime() === occurrenceStartTime.getTime() &&
      formEndDateTime.getTime() === occurrenceEndTime.getTime()
    );
  });
};
