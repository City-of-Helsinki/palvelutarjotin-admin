import { gql } from '@apollo/client/core';

export const MENU_QUERY = gql`
  query Menu(
    $id: ID!
    $idType: MenuNodeIdTypeEnum
    $language: LanguageCodeEnum!
  ) {
    menu(id: $id, idType: $idType) {
      id
      name
      slug
      menuId
      menuItems {
        nodes {
          connectedNode {
            node {
              ... on Page {
                id
                translation(language: $language) {
                  title
                  uri
                  link
                  id
                  guid
                  pageId
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const MENUS_QUERY = gql`
  query Menus {
    menus {
      nodes {
        id
        name
        slug
        menuId
      }
    }
  }
`;

export const PAGE_QUERY = gql`
  query Page($id: ID!, $idType: PageIdType) {
    page(id: $id, idType: $idType) {
      ...pageFields
    }
  }
  fragment pageFields on Page {
    id
    content
  }
`;

export const PAGES_QUERY = gql`
  query Pages {
    pages {
      edges {
        node {
          ...pageFields
        }
      }
    }
  }
`;
