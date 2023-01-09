import { graphql } from 'msw';

import { MenuQuery } from '../generated/graphql-cms';
import { fakePage } from '../utils/cmsMockDataUtils';
import { server } from './msw/server';

const mainMenu = [
  { title: 'Helsinki liikkuu', uri: '/test1', slug: 'test1' },
  { title: 'Kulttuurikasvatus', uri: '/test2', slug: 'test2' },
  { title: 'Oppimateriaalit', uri: '/test3', slug: 'test3' },
  { title: 'Kultus sivu', uri: '/test4', slug: 'test4' },
];

export const initCmsMenuItemsMocks = () => {
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
              nodes: mainMenu.map((menuItem) => ({
                __typename: 'MenuItem',
                connectedNode: {
                  __typename: 'MenuItemToMenuItemLinkableConnectionEdge',
                  node: fakePage({
                    uri: menuItem.uri,
                    title: menuItem.title,
                    slug: menuItem.slug,
                    children: {
                      __typename:
                        'HierarchicalContentNodeToContentNodeChildrenConnection',
                      // child node are rendered under dropdown
                      nodes: menuItem?.children?.map((childItem) =>
                        fakePage({
                          title: childItem.title,
                          uri: childItem.uri,
                          slug: childItem.slug,
                        })
                      ),
                    },
                  }),
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

  return { menuItems: mainMenu };
};
