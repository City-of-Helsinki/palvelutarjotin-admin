import { MockedResponse } from '@apollo/client/testing';
import { MenuDocument } from 'react-helsinki-headless-cms/apollo';

import type { MenuQueryResponse } from './types';
import { FOOTER_MENU_NAME } from '../../headless-cms/constants';

/**
 * This is a mock of the response from the footer menu query.
 * Data taken from production CMS query response.
 */
export const footerMenuQueryResponse = {
  data: {
    menu: {
      id: 'dGVybTo1Nw==',
      menuItems: {
        nodes: [
          {
            id: 'cG9zdDo0MjY=',
            parentId: null,
            order: 1,
            target: null,
            title: null,
            path: 'https://kultus.hel.fi/fi',
            label: 'Kouluille ja päiväkodeille',
            connectedNode: null,
            __typename: 'MenuItem',
          },
          {
            id: 'cG9zdDo0Mjc=',
            parentId: null,
            order: 2,
            target: null,
            title: null,
            path: 'https://hkih.production.geniem.io/uploads/sites/5/2022/11/739f5edc-rekisteriseloste-kultus.fi_.pdf',
            label: 'Rekisteriseloste',
            connectedNode: null,
            __typename: 'MenuItem',
          },
        ],
        __typename: 'MenuToMenuItemConnection',
      },
      __typename: 'Menu',
    },
  },
} as const satisfies MenuQueryResponse;

export const footerMenuMock: MockedResponse = {
  request: {
    query: MenuDocument,
    variables: {
      id: FOOTER_MENU_NAME['fi'],
      menuIdentifiersOnly: true,
    },
  },
  result: footerMenuQueryResponse,
};

export const emptyFooterMenuQueryResponse = {
  data: {
    menu: {
      id: 'empty-footer-menu',
      menuItems: {
        nodes: [],
      },
    },
  },
} as const satisfies MenuQueryResponse;
