import { dequal } from 'dequal';
import { graphql } from 'msw';

import {
  PageIdType,
  PageQuery,
  PageQueryVariables,
} from '../../generated/graphql-cms';
import { server } from '../../test/msw/server';
import { fakePage } from '../../utils/cmsMockDataUtils';
import { queryPageWithUri } from '../services';
import { initializeCMSApolloClient } from '../apollo/apolloClient';

describe('queryPageWithUri', () => {
  it('fetches page with uri', async () => {
    const cmsApolloClient = initializeCMSApolloClient();
    const uri = '/fi/test-page/nested-page/';
    const idType = PageIdType.Uri;
    const page = fakePage();
    server.use(
      graphql.query<PageQuery, PageQueryVariables>('Page', (req, res, ctx) => {
        if (dequal(req.variables, { id: 'test-page/nested-page', idType })) {
          return res(
            ctx.data({
              page,
            })
          );
        } else {
          return res(ctx.errors([{ message: "Variables didn't match" }]));
        }
      })
    );

    const { data: pageResponse } = await queryPageWithUri(cmsApolloClient, uri);
    expect(page.id).toEqual(pageResponse?.page?.id);
  });
});
