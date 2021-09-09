import { gql } from '@apollo/client/core';

export const MENU_QUERY = gql`
  query Menu($id: ID!, $idType: MenuNodeIdTypeEnum) {
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
                ...pageFields
                translations {
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
  query Page($id: ID!, $idType: PageIdType) {
    page(id: $id, idType: $idType) {
      ...pageFields
      parent {
        node {
          ... on Page {
            ...pageFields
            translations {
              ...pageFields
            }
          }
        }
      }
      children {
        nodes {
          ... on Page {
            ...pageFields
            translations {
              ...pageFields
            }
          }
        }
      }
      translations {
        ...pageFields
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
