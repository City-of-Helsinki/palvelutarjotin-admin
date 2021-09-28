import { graphql } from 'msw';

import { MenuQuery } from '../generated/graphql-cms';
import { fakePage } from '../utils/cmsMockDataUtils';
import { server } from './msw/server';

export const initCmsMenuItemsMocks = () => {
  const menuItems = Array.from({ length: 5 }).map((item, index) => ({
    id: (index + 1).toString(),
    uri: `/test/${index + 1}`,
    slug: `test${index + 1}`,
    title: `Testi${index + 1}`,
  }));

  server.use(
    graphql.query('Menu', (req, res, ctx) => {
      return res(
        ctx.data({
          menu: {
            id: 'menu',
            name: 'test',
            slug: 'test',
            menuId: 1,
            databaseId: 1,
            menuItems: {
              nodes: menuItems.map((menuItem) => ({
                __typename: 'MenuItem',
                connectedNode: {
                  __typename: 'MenuItemToMenuItemLinkableConnectionEdge',
                  node: fakePage(menuItem),
                },
              })),
              __typename: 'MenuToMenuItemConnection',
            },
            __typename: 'Menu',
          } as MenuQuery['menu'],
        })
      );
    })
  );

  return { menuItems };
};
