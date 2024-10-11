import { graphql } from 'msw';

import { MenuQuery } from '../generated/graphql-cms';
import { fakePage } from '../utils/cmsMockDataUtils';
import { server } from './msw/server';
import { pageInfoMock } from '../utils/mockDataUtils';

const route1 = '/helsinki-liikkuu/';
const route2 = '/helsinki-liikkuu/alisivu/';
const title1 = 'Mikä Kultus?';
const subTitle1 = 'Mikä Kultus alisivu1';
const subTitle2 = 'Mikä Kultus alisivu2';
const mainMenu = [
  {
    title: title1,
    uri: route1,
    children: [
      {
        title: subTitle1,
        uri: route2,
        slug: route2,
      },
      {
        title: subTitle2,
        uri: route2,
        slug: route2,
      },
    ],
  },
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
                      edges: [],
                      // child node are rendered under dropdown
                      nodes:
                        menuItem?.children?.map((childItem) =>
                          fakePage({
                            title: childItem.title,
                            uri: childItem.uri,
                            slug: childItem.slug,
                          })
                        ) ?? [],
                      pageInfo: {
                        ...pageInfoMock,
                        __typename:
                          'HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo',
                      },
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
