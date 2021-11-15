import { MockedResponse } from '@apollo/client/testing';

import {
  Place,
  SchoolsAndKindergartensListDocument,
} from '../../generated/graphql';
import { fakePlaces } from '../../utils/mockDataUtils';

export const createSchoolsAndKindergartensListQueryMock = (
  count = 1,
  places?: Partial<Place>[]
): MockedResponse => ({
  request: {
    query: SchoolsAndKindergartensListDocument,
    variables: {},
  },
  result: {
    data: {
      schoolsAndKindergartensList: fakePlaces(count, places),
    },
  },
});
