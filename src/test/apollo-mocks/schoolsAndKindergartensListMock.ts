import { MockedResponse } from '@apollo/client/testing';

import {
  Place,
  SchoolsAndKindergartensListDocument,
} from '../../generated/graphql';
import { fakePlaces } from '../../utils/mockDataUtils';

export const createSchoolsAndKindergartensListQueryMock = (
  count = 1,
  places?: Partial<Place>[],
  search?: string
): MockedResponse => ({
  request: {
    query: SchoolsAndKindergartensListDocument,
    variables: { search },
  },
  result: {
    data: {
      schoolsAndKindergartensList: fakePlaces(count, places),
    },
  },
});
