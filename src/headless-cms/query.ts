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
                translation(language: $language) {
                  ...pageFields
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const PAGE_QUERY = gql`
  query Page(
    $id: ID!, 
    $idType: PageIdType, 
    $language: LanguageCodeEnum! 
  ) {
    page(id: $id, idType: $idType) {
      translation(language: $language) {
        ...pageFields
      }
      parent {
        node {
          ... on Page {
            translation(language: $language) {
              ...pageFields
            }
          }
        }
      }
      children {
        nodes {
          ... on Page {
            translation(language: $language) {
              ...pageFields
            }
          }
        }
      }
    }
  }

  fragment pageFields on Page {
    id
    content
    slug
    title
    uri
    language {
      code
      slug
      locale
      name
    }
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
