import { MockedResponse } from '@apollo/react-testing';

import {
  KeywordSet,
  KeywordSetDocument,
  KeywordSetQueryVariables,
  KeywordSetType,
} from '../../generated/graphql';
import {
  fakeKeyword,
  fakeKeywordSet,
  fakeLocalizedObject,
} from '../../utils/mockDataUtils';

const getKeywordSetMockResponse = ({
  variables = { setType: KeywordSetType.Category },
  keywordSet = fakeKeywordSet(),
}: {
  variables: Partial<KeywordSetQueryVariables>;
  keywordSet: KeywordSet;
}): MockedResponse => ({
  request: {
    query: KeywordSetDocument,
    variables,
  },
  result: {
    data: { keywordSet },
  },
});

const getKeywordSetsMockResponses = (
  keywordSetMocks: {
    setType: KeywordSetType;
    keywords: { id: string; name: string }[];
  }[]
): MockedResponse[] => {
  return keywordSetMocks.map(({ setType, keywords }) =>
    getKeywordSetMockResponse({
      variables: { setType },
      keywordSet: fakeKeywordSet({
        keywords: keywords.map((k) =>
          fakeKeyword({ id: k.id, name: fakeLocalizedObject(k.name) })
        ),
      }),
    })
  );
};

export { getKeywordSetsMockResponses };
