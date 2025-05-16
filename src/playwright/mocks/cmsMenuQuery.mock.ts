import type { MenuQuery } from '../../generated/graphql-cms';

export const MOCK_EMPTY_CMS_MENU_QUERY_RESPONSE: MenuQuery = {
  __typename: 'RootQuery',
  menu: {
    __typename: 'Menu',
    id: 'empty-menu-id',
    name: 'Empty Menu',
    slug: 'empty-menu-slug',
    menuId: 1,
    menuItems: {
      __typename: 'MenuToMenuItemConnection',
      nodes: [],
    },
  },
};
