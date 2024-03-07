/* eslint-disable max-len */
import { MenuDocument } from 'react-helsinki-headless-cms/apollo';
import { MockedResponse } from '@apollo/client/testing';

import type { MenuQueryResponse } from './types';
import { HEADER_MENU_NAME } from '../../headless-cms/constants';

/**
 * This is a mock of the response from the header menu query.
 * Data taken from production CMS query response.
 */
export const headerMenuQueryResponse = {
  data: {
    menu: {
      id: 'dGVybTo1NA==',
      menuItems: {
        nodes: [
          {
            id: 'cG9zdDo0MDk=',
            parentId: null,
            order: 1,
            target: null,
            title: null,
            path: '/mika-kultus-2/',
            label: 'Mikä kultus?',
            connectedNode: {
              node: {
                id: 'cG9zdDoxMjY=',
                uri: '/mika-kultus-2/',
                slug: 'mika-kultus-2',
                parentId: null,
                title: 'Mikä kultus?',
                __typename: 'Page',
                translations: [
                  {
                    id: 'cG9zdDoxNzA=',
                    uri: '/en/what-is-kultus/',
                    slug: 'what-is-kultus',
                    parentId: null,
                    title: 'What is Kultus?',
                    __typename: 'Page',
                  },
                  {
                    id: 'cG9zdDoxNzM=',
                    uri: '/sv/vad-ar-kultus/',
                    slug: 'vad-ar-kultus',
                    parentId: null,
                    title: 'Vad är Kultus?',
                    __typename: 'Page',
                  },
                ],
                children: {
                  nodes: [
                    {
                      id: 'cG9zdDoyMTI=',
                      uri: '/mika-kultus-2/katrin-testisivu/',
                      slug: 'katrin-testisivu',
                      parentId: 'cG9zdDoxMjY=',
                      title: 'Katrin testisivu',
                      __typename: 'Page',
                      translations: [],
                    },
                  ],
                  __typename:
                    'HierarchicalContentNodeToContentNodeChildrenConnection',
                },
              },
              __typename: 'MenuItemToMenuItemLinkableConnectionEdge',
            },
            __typename: 'MenuItem',
          },
          {
            id: 'cG9zdDo0MTE=',
            parentId: 'cG9zdDo0MDk=',
            order: 2,
            target: null,
            title: null,
            path: '/mika-kultus-2/katrin-testisivu/',
            label: 'Katrin testisivu',
            connectedNode: {
              node: {
                id: 'cG9zdDoyMTI=',
                uri: '/mika-kultus-2/katrin-testisivu/',
                slug: 'katrin-testisivu',
                parentId: 'cG9zdDoxMjY=',
                title: 'Katrin testisivu',
                __typename: 'Page',
                translations: [],
                children: {
                  nodes: [],
                  __typename:
                    'HierarchicalContentNodeToContentNodeChildrenConnection',
                },
              },
              __typename: 'MenuItemToMenuItemLinkableConnectionEdge',
            },
            __typename: 'MenuItem',
          },
          {
            id: 'cG9zdDo0MTI=',
            parentId: null,
            order: 3,
            target: null,
            title: null,
            path: '/kulttuurikasvatus/',
            label: 'Kulttuurikasvatus',
            connectedNode: {
              node: {
                id: 'cG9zdDoxMzA=',
                uri: '/kulttuurikasvatus/',
                slug: 'kulttuurikasvatus',
                parentId: null,
                title: 'Kulttuurikasvatus',
                __typename: 'Page',
                translations: [],
                children: {
                  nodes: [
                    {
                      id: 'cG9zdDoxMzc=',
                      uri: '/kulttuurikasvatus/kulttuuripolulla-kulttuuria-kaikille/',
                      slug: 'kulttuuripolulla-kulttuuria-kaikille',
                      parentId: 'cG9zdDoxMzA=',
                      title: 'Kulttuuripolulla kulttuuria kaikille',
                      __typename: 'Page',
                      translations: [],
                    },
                    {
                      id: 'cG9zdDoxMzU=',
                      uri: '/kulttuurikasvatus/kulttuurikoordinaattori-olet-meille-tarkea/',
                      slug: 'kulttuurikoordinaattori-olet-meille-tarkea',
                      parentId: 'cG9zdDoxMzA=',
                      title: 'Kulttuurikoordinaattori, olet meille tärkeä!',
                      __typename: 'Page',
                      translations: [],
                    },
                    {
                      id: 'cG9zdDoxMzM=',
                      uri: '/kulttuurikasvatus/kulttuurikasvatuksen-kasitteita/',
                      slug: 'kulttuurikasvatuksen-kasitteita',
                      parentId: 'cG9zdDoxMzA=',
                      title: 'Kulttuurikasvatuksen käsitteitä',
                      __typename: 'Page',
                      translations: [],
                    },
                  ],
                  __typename:
                    'HierarchicalContentNodeToContentNodeChildrenConnection',
                },
              },
              __typename: 'MenuItemToMenuItemLinkableConnectionEdge',
            },
            __typename: 'MenuItem',
          },
          {
            id: 'cG9zdDo0MTQ=',
            parentId: 'cG9zdDo0MTI=',
            order: 4,
            target: null,
            title: null,
            path: '/kulttuurikasvatus/kulttuuripolulla-kulttuuria-kaikille/',
            label: 'Kulttuuripolulla kulttuuria kaikille',
            connectedNode: {
              node: {
                id: 'cG9zdDoxMzc=',
                uri: '/kulttuurikasvatus/kulttuuripolulla-kulttuuria-kaikille/',
                slug: 'kulttuuripolulla-kulttuuria-kaikille',
                parentId: 'cG9zdDoxMzA=',
                title: 'Kulttuuripolulla kulttuuria kaikille',
                __typename: 'Page',
                translations: [],
                children: {
                  nodes: [],
                  __typename:
                    'HierarchicalContentNodeToContentNodeChildrenConnection',
                },
              },
              __typename: 'MenuItemToMenuItemLinkableConnectionEdge',
            },
            __typename: 'MenuItem',
          },
          {
            id: 'cG9zdDo0MTU=',
            parentId: 'cG9zdDo0MTI=',
            order: 5,
            target: null,
            title: null,
            path: '/kulttuurikasvatus/kulttuurikoordinaattori-olet-meille-tarkea/',
            label: 'Kulttuurikoordinaattori, olet meille tärkeä!',
            connectedNode: {
              node: {
                id: 'cG9zdDoxMzU=',
                uri: '/kulttuurikasvatus/kulttuurikoordinaattori-olet-meille-tarkea/',
                slug: 'kulttuurikoordinaattori-olet-meille-tarkea',
                parentId: 'cG9zdDoxMzA=',
                title: 'Kulttuurikoordinaattori, olet meille tärkeä!',
                __typename: 'Page',
                translations: [],
                children: {
                  nodes: [],
                  __typename:
                    'HierarchicalContentNodeToContentNodeChildrenConnection',
                },
              },
              __typename: 'MenuItemToMenuItemLinkableConnectionEdge',
            },
            __typename: 'MenuItem',
          },
          {
            id: 'cG9zdDo0MTY=',
            parentId: 'cG9zdDo0MTI=',
            order: 6,
            target: null,
            title: null,
            path: '/kulttuurikasvatus/kulttuurikasvatuksen-kasitteita/',
            label: 'Kulttuurikasvatuksen käsitteitä',
            connectedNode: {
              node: {
                id: 'cG9zdDoxMzM=',
                uri: '/kulttuurikasvatus/kulttuurikasvatuksen-kasitteita/',
                slug: 'kulttuurikasvatuksen-kasitteita',
                parentId: 'cG9zdDoxMzA=',
                title: 'Kulttuurikasvatuksen käsitteitä',
                __typename: 'Page',
                translations: [],
                children: {
                  nodes: [],
                  __typename:
                    'HierarchicalContentNodeToContentNodeChildrenConnection',
                },
              },
              __typename: 'MenuItemToMenuItemLinkableConnectionEdge',
            },
            __typename: 'MenuItem',
          },
          {
            id: 'cG9zdDo0MTc=',
            parentId: null,
            order: 7,
            target: null,
            title: null,
            path: '/oppimateriaalit-2/',
            label: 'Oppimateriaalit',
            connectedNode: {
              node: {
                id: 'cG9zdDoxMDk=',
                uri: '/oppimateriaalit-2/',
                slug: 'oppimateriaalit-2',
                parentId: null,
                title: 'Oppimateriaalit',
                __typename: 'Page',
                translations: [
                  {
                    id: 'cG9zdDoxNDE=',
                    uri: '/en/learning-materials/',
                    slug: 'learning-materials',
                    parentId: null,
                    title: 'Learning materials',
                    __typename: 'Page',
                  },
                  {
                    id: 'cG9zdDoxNDM=',
                    uri: '/sv/inlarningsmaterial/',
                    slug: 'inlarningsmaterial',
                    parentId: null,
                    title: 'Inlärningsmaterial',
                    __typename: 'Page',
                  },
                ],
                children: {
                  nodes: [
                    {
                      id: 'cG9zdDoxMTk=',
                      uri: '/oppimateriaalit-2/ylakoulu-ja-toinen-aste/',
                      slug: 'ylakoulu-ja-toinen-aste',
                      parentId: 'cG9zdDoxMDk=',
                      title: 'Yläkoulu ja toinen aste',
                      __typename: 'Page',
                      translations: [
                        {
                          id: 'cG9zdDoxNTM=',
                          uri: '/en/learning-materials/high-school/',
                          slug: 'high-school',
                          parentId: 'cG9zdDoxNDE=',
                          title: 'High school',
                          __typename: 'Page',
                        },
                        {
                          id: 'cG9zdDoxNTU=',
                          uri: '/sv/inlarningsmaterial/gymnasium/',
                          slug: 'gymnasium',
                          parentId: 'cG9zdDoxNDM=',
                          title: 'Gymnasium',
                          __typename: 'Page',
                        },
                      ],
                    },
                    {
                      id: 'cG9zdDoxMTY=',
                      uri: '/oppimateriaalit-2/varhaiskasvatus-ja-esiopetus/',
                      slug: 'varhaiskasvatus-ja-esiopetus',
                      parentId: 'cG9zdDoxMDk=',
                      title: 'Varhaiskasvatus ja esiopetus',
                      __typename: 'Page',
                      translations: [
                        {
                          id: 'cG9zdDoxNDk=',
                          uri: '/en/learning-materials/early-childhood-education/',
                          slug: 'early-childhood-education',
                          parentId: 'cG9zdDoxNDE=',
                          title: 'Early childhood education',
                          __typename: 'Page',
                        },
                        {
                          id: 'cG9zdDoxNTE=',
                          uri: '/sv/inlarningsmaterial/tidig-barndom/',
                          slug: 'tidig-barndom',
                          parentId: 'cG9zdDoxNDM=',
                          title: 'Tidig barndom',
                          __typename: 'Page',
                        },
                      ],
                    },
                    {
                      id: 'cG9zdDoxMTE=',
                      uri: '/oppimateriaalit-2/alakoulu/',
                      slug: 'alakoulu',
                      parentId: 'cG9zdDoxMDk=',
                      title: 'Alakoulu',
                      __typename: 'Page',
                      translations: [
                        {
                          id: 'cG9zdDoxNDU=',
                          uri: '/en/learning-materials/elementary-school/',
                          slug: 'elementary-school',
                          parentId: 'cG9zdDoxNDE=',
                          title: 'Elementary school',
                          __typename: 'Page',
                        },
                        {
                          id: 'cG9zdDoxNDc=',
                          uri: '/sv/inlarningsmaterial/grundskola/',
                          slug: 'grundskola',
                          parentId: 'cG9zdDoxNDM=',
                          title: 'Grundskola',
                          __typename: 'Page',
                        },
                      ],
                    },
                  ],
                  __typename:
                    'HierarchicalContentNodeToContentNodeChildrenConnection',
                },
              },
              __typename: 'MenuItemToMenuItemLinkableConnectionEdge',
            },
            __typename: 'MenuItem',
          },
          {
            id: 'cG9zdDo0MTk=',
            parentId: 'cG9zdDo0MTc=',
            order: 8,
            target: null,
            title: null,
            path: '/oppimateriaalit-2/ylakoulu-ja-toinen-aste/',
            label: 'Yläkoulu ja toinen aste',
            connectedNode: {
              node: {
                id: 'cG9zdDoxMTk=',
                uri: '/oppimateriaalit-2/ylakoulu-ja-toinen-aste/',
                slug: 'ylakoulu-ja-toinen-aste',
                parentId: 'cG9zdDoxMDk=',
                title: 'Yläkoulu ja toinen aste',
                __typename: 'Page',
                translations: [
                  {
                    id: 'cG9zdDoxNTM=',
                    uri: '/en/learning-materials/high-school/',
                    slug: 'high-school',
                    parentId: 'cG9zdDoxNDE=',
                    title: 'High school',
                    __typename: 'Page',
                  },
                  {
                    id: 'cG9zdDoxNTU=',
                    uri: '/sv/inlarningsmaterial/gymnasium/',
                    slug: 'gymnasium',
                    parentId: 'cG9zdDoxNDM=',
                    title: 'Gymnasium',
                    __typename: 'Page',
                  },
                ],
                children: {
                  nodes: [],
                  __typename:
                    'HierarchicalContentNodeToContentNodeChildrenConnection',
                },
              },
              __typename: 'MenuItemToMenuItemLinkableConnectionEdge',
            },
            __typename: 'MenuItem',
          },
          {
            id: 'cG9zdDo0MjA=',
            parentId: 'cG9zdDo0MTc=',
            order: 9,
            target: null,
            title: null,
            path: '/oppimateriaalit-2/varhaiskasvatus-ja-esiopetus/',
            label: 'Varhaiskasvatus ja esiopetus',
            connectedNode: {
              node: {
                id: 'cG9zdDoxMTY=',
                uri: '/oppimateriaalit-2/varhaiskasvatus-ja-esiopetus/',
                slug: 'varhaiskasvatus-ja-esiopetus',
                parentId: 'cG9zdDoxMDk=',
                title: 'Varhaiskasvatus ja esiopetus',
                __typename: 'Page',
                translations: [
                  {
                    id: 'cG9zdDoxNDk=',
                    uri: '/en/learning-materials/early-childhood-education/',
                    slug: 'early-childhood-education',
                    parentId: 'cG9zdDoxNDE=',
                    title: 'Early childhood education',
                    __typename: 'Page',
                  },
                  {
                    id: 'cG9zdDoxNTE=',
                    uri: '/sv/inlarningsmaterial/tidig-barndom/',
                    slug: 'tidig-barndom',
                    parentId: 'cG9zdDoxNDM=',
                    title: 'Tidig barndom',
                    __typename: 'Page',
                  },
                ],
                children: {
                  nodes: [
                    {
                      id: 'cG9zdDoxNzc=',
                      uri: '/oppimateriaalit-2/varhaiskasvatus-ja-esiopetus/annantalo-taiteillen-tulevaisuuksiin-2-luovia-menetelmia-esi-ja-alkuopetukseen/',
                      slug: 'annantalo-taiteillen-tulevaisuuksiin-2-luovia-menetelmia-esi-ja-alkuopetukseen',
                      parentId: 'cG9zdDoxMTY=',
                      title:
                        'Annantalo: Taiteillen tulevaisuuksiin 2 – luovia menetelmiä esi- ja alkuopetukseen',
                      __typename: 'Page',
                      translations: [],
                    },
                  ],
                  __typename:
                    'HierarchicalContentNodeToContentNodeChildrenConnection',
                },
              },
              __typename: 'MenuItemToMenuItemLinkableConnectionEdge',
            },
            __typename: 'MenuItem',
          },
          {
            id: 'cG9zdDo0MjE=',
            parentId: 'cG9zdDo0MTc=',
            order: 10,
            target: null,
            title: null,
            path: '/oppimateriaalit-2/alakoulu/',
            label: 'Alakoulu',
            connectedNode: {
              node: {
                id: 'cG9zdDoxMTE=',
                uri: '/oppimateriaalit-2/alakoulu/',
                slug: 'alakoulu',
                parentId: 'cG9zdDoxMDk=',
                title: 'Alakoulu',
                __typename: 'Page',
                translations: [
                  {
                    id: 'cG9zdDoxNDU=',
                    uri: '/en/learning-materials/elementary-school/',
                    slug: 'elementary-school',
                    parentId: 'cG9zdDoxNDE=',
                    title: 'Elementary school',
                    __typename: 'Page',
                  },
                  {
                    id: 'cG9zdDoxNDc=',
                    uri: '/sv/inlarningsmaterial/grundskola/',
                    slug: 'grundskola',
                    parentId: 'cG9zdDoxNDM=',
                    title: 'Grundskola',
                    __typename: 'Page',
                  },
                ],
                children: {
                  nodes: [
                    {
                      id: 'cG9zdDoxODg=',
                      uri: '/oppimateriaalit-2/alakoulu/av-arkki-milta-tuntuu-taide-tunnekasvatuksen-tukena/',
                      slug: 'av-arkki-milta-tuntuu-taide-tunnekasvatuksen-tukena',
                      parentId: 'cG9zdDoxMTE=',
                      title:
                        'AV-arkki: Miltä tuntuu? – Taide tunnekasvatuksen tukena',
                      __typename: 'Page',
                      translations: [],
                    },
                    {
                      id: 'cG9zdDoxODI=',
                      uri: '/oppimateriaalit-2/alakoulu/muotoilupolku/',
                      slug: 'muotoilupolku',
                      parentId: 'cG9zdDoxMTE=',
                      title: 'Muotoilupolku',
                      __typename: 'Page',
                      translations: [],
                    },
                  ],
                  __typename:
                    'HierarchicalContentNodeToContentNodeChildrenConnection',
                },
              },
              __typename: 'MenuItemToMenuItemLinkableConnectionEdge',
            },
            __typename: 'MenuItem',
          },
        ],
        __typename: 'MenuToMenuItemConnection',
      },
      __typename: 'Menu',
    },
  },
} as const satisfies MenuQueryResponse;

export const headerMenuMock: MockedResponse = {
  request: {
    query: MenuDocument,
    variables: {
      id: HEADER_MENU_NAME['fi'],
      menuIdentifiersOnly: true,
    },
  },
  result: headerMenuQueryResponse,
};

export const emptyHeaderMenuQueryResponse = {
  data: {
    menu: {
      id: 'empty-header-menu',
      menuItems: {
        nodes: [],
      },
    },
  },
} as const satisfies MenuQueryResponse;
