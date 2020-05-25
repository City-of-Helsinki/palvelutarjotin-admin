import { OccurrenceNode } from '../../generated/graphql';

export type OccurrenceInTable = Pick<
  OccurrenceNode,
  'id' | 'maxGroupSize' | 'minGroupSize' | 'startTime' | 'endTime' | 'placeId'
>;
